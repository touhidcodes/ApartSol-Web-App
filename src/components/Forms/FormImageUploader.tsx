"use client";

import Image from "next/image";
import { useFormContext, useController } from "react-hook-form";
import { useRef, useEffect, useState } from "react";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { UploadCloud, X, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { uploadImageToImageBB } from "@/utils/uploadImageToImageBB";
import { toast } from "sonner";

interface FormImageUploaderProps {
  name: string;
  label?: string;
  required?: boolean;
}

const FormImageUploader = ({
  name,
  label,
  required = false,
}: FormImageUploaderProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploadingImages, setUploadingImages] = useState<Set<number>>(
    new Set()
  );
  const {
    control,
    setValue,
    formState: { errors },
  } = useFormContext();

  const { field } = useController({
    name,
    control,
    defaultValue: [],
  });

  // Ensure field value is always an array
  useEffect(() => {
    if (!Array.isArray(field.value)) {
      setValue(name, []);
    }
  }, [field.value, name, setValue]);

  const openFileDialog = () => {
    inputRef.current?.click();
  };

  const handleFiles = async (files: FileList | null) => {
    if (!files) return;

    const filesArray = Array.from(files);
    const currentImages = [...(field.value || [])];

    // Add placeholder entries for uploading state
    const placeholderImages = filesArray.map(
      (_, index) => `uploading-${Date.now()}-${index}`
    );
    setValue(name, [...currentImages, ...placeholderImages], {
      shouldValidate: true,
    });

    // Track which images are uploading
    const newUploadingSet = new Set(uploadingImages);
    placeholderImages.forEach((_, index) => {
      newUploadingSet.add(currentImages.length + index);
    });
    setUploadingImages(newUploadingSet);

    try {
      // Upload all images concurrently
      const uploadPromises = filesArray.map(async (file, index) => {
        try {
          const url = await uploadImageToImageBB(file);
          return { index: currentImages.length + index, url };
        } catch (error) {
          console.error(`Error uploading image ${index}:`, error);
          toast.error(`Failed to upload ${file.name}`);
          return { index: currentImages.length + index, url: null };
        }
      });

      const results = await Promise.all(uploadPromises);

      // Update the field value with actual URLs
      const updatedImages = [...currentImages, ...placeholderImages];
      let successCount = 0;

      results.forEach(({ index, url }) => {
        if (url) {
          updatedImages[index] = url;
          successCount++;
        } else {
          // Remove failed uploads
          updatedImages.splice(index, 1);
        }

        // Remove from uploading set
        newUploadingSet.delete(index);
      });

      setUploadingImages(newUploadingSet);
      setValue(
        name,
        updatedImages.filter((img) => !img.startsWith("uploading-")),
        { shouldValidate: true }
      );

      if (successCount > 0) {
        toast.success(`${successCount} image(s) uploaded successfully!`);
      }
    } catch (error) {
      console.error("Error in image upload process:", error);
      toast.error("Failed to upload images");
      setUploadingImages(new Set());
    }
  };

  const removeImage = (index: number) => {
    const updated = [...(field.value || [])];
    updated.splice(index, 1);
    setValue(name, updated, { shouldValidate: true });

    // Update uploading set indices
    const newUploadingSet = new Set<number>();
    uploadingImages.forEach((uploadIndex) => {
      if (uploadIndex < index) {
        newUploadingSet.add(uploadIndex);
      } else if (uploadIndex > index) {
        newUploadingSet.add(uploadIndex - 1);
      }
    });
    setUploadingImages(newUploadingSet);
  };

  // Helper function to safely get error message
  const getErrorMessage = (error: any): string => {
    if (typeof error?.message === "string") {
      return error.message;
    }
    if (typeof error === "string") {
      return error;
    }
    return "Invalid file selection";
  };

  return (
    <div className="space-y-2 w-full">
      {label && (
        <Label className="font-medium block">
          {label} {required && <span className="text-red-500">*</span>}
        </Label>
      )}

      {/* Dropzone / Upload Area */}
      <div
        className={cn(
          "w-full border border-dashed border-gray-300 rounded-lg p-4 cursor-pointer hover:bg-gray-50 transition-colors",
          errors[name] && "border-red-500"
        )}
      >
        <div
          onClick={openFileDialog}
          className="flex flex-col items-center justify-center gap-2 py-6"
        >
          <UploadCloud className="w-6 h-6 text-gray-500" />
          <p className="text-sm text-gray-500">Click to upload images</p>
        </div>

        {/* Image Preview Grid Inside Upload Area */}
        {Array.isArray(field.value) && field.value.length > 0 && (
          <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-2 mt-4">
            {field.value.map((url: string, index: number) => (
              <div key={index} className="relative group">
                <div className="aspect-square relative w-full h-16 rounded-md overflow-hidden border border-gray-200">
                  {uploadingImages.has(index) ||
                  url.startsWith("uploading-") ? (
                    <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                      <Loader2 className="w-4 h-4 animate-spin text-gray-500" />
                    </div>
                  ) : (
                    <Image
                      src={url}
                      alt={`Uploaded ${index}`}
                      fill
                      className="object-cover"
                    />
                  )}

                  {!uploadingImages.has(index) &&
                    !url.startsWith("uploading-") && (
                      <Button
                        type="button"
                        size="icon"
                        variant="destructive"
                        onClick={(e) => {
                          e.stopPropagation();
                          removeImage(index);
                        }}
                        className="absolute -top-1 -right-1 z-10 opacity-0 group-hover:opacity-100 transition w-5 h-5"
                      >
                        <X className="w-3 h-3" />
                      </Button>
                    )}
                </div>
              </div>
            ))}
          </div>
        )}

        <input
          ref={inputRef}
          type="file"
          multiple
          accept="image/*"
          className="hidden"
          onChange={(e) => handleFiles(e.target.files)}
        />
      </div>

      {errors[name] && (
        <p className="text-sm text-red-500">{getErrorMessage(errors[name])}</p>
      )}

      {/* Upload Status */}
      {uploadingImages.size > 0 && (
        <div className="flex items-center gap-2 text-sm text-blue-600">
          <Loader2 className="w-4 h-4 animate-spin" />
          <span>Uploading {uploadingImages.size} image(s)...</span>
        </div>
      )}
    </div>
  );
};

export default FormImageUploader;
