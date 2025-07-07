"use client";

import React, { useEffect, useState } from "react";
import { FieldValues } from "react-hook-form";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import FormContainer from "@/components/Forms/FormContainer";
import FormInput from "@/components/Forms/FormInput";
import FormTextarea from "@/components/Forms/FormTextarea";
import FormSelect from "@/components/Forms/FormSelect";
import FormTagsSelector from "@/components/Forms/FormTagsSelector";
import FormImageUploader from "@/components/Forms/FormImageUploader";
import { TProperty } from "@/types/Property";
import { DEFAULT_AMENITIES } from "@/data/constants";

interface TUpdatePropertyModalProps {
  open: boolean;
  property: TProperty | null;
  onClose: () => void;
  onSave: (updatedProperty: FieldValues, propertyId: string) => void;
}

const UpdatePropertyModal = ({
  open,
  property,
  onClose,
  onSave,
}: TUpdatePropertyModalProps) => {
  const [loading, setLoading] = useState(false);
  const [updatedProperty, setUpdatedProperty] = useState<TProperty | null>(
    property
  );

  useEffect(() => {
    setUpdatedProperty(property);
  }, [property]);

  const handleUpdateProperty = async (values: FieldValues) => {
    if (!property) return;
    try {
      setLoading(true);
      const updatedData = {
        ...values,
        squareFeet: Number(values.squareFeet),
        totalBedrooms: Number(values.totalBedrooms),
        totalBathrooms: Number(values.totalBathrooms),
        totalRooms: Number(values.totalRooms),
        rent: Number(values.rent),
        advanceAmount: Number(values.advanceAmount),
      };
      onSave(updatedData, property.id);
      toast.success("Property updated successfully!");
      onClose();
    } catch (error) {
      toast.error("Failed to update property.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl w-full max-h-[90vh] overflow-hidden">
        <DialogHeader>
          <DialogTitle>Update Property</DialogTitle>
        </DialogHeader>

        {/* Scrollable form area */}
        <div className="p-1 overflow-y-auto max-h-[75vh] pr-2">
          <FormContainer
            onSubmit={handleUpdateProperty}
            defaultValues={{
              title: updatedProperty?.title || "",
              images: updatedProperty?.images || [],
              squareFeet: updatedProperty?.squareFeet || "",
              totalRooms: updatedProperty?.totalRooms || "",
              totalBedrooms: updatedProperty?.totalBedrooms || "",
              totalBathrooms: updatedProperty?.totalBathrooms || "",
              propertyType: updatedProperty?.propertyType || "",
              purpose: updatedProperty?.purpose || "",
              availability: updatedProperty?.availability || "",
              street: updatedProperty?.street || "",
              city: updatedProperty?.city || "",
              state: updatedProperty?.state || "",
              zipCode: updatedProperty?.zipCode || "",
              country: updatedProperty?.country || "",
              description: updatedProperty?.description || "",
              amenities: updatedProperty?.amenities || [],
              price: updatedProperty?.price || "",
              advanceAmount: updatedProperty?.advanceAmount || "",
            }}
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-4">
                <FormInput
                  label="Property Title"
                  name="title"
                  placeholder="Luxury Apartment"
                  required
                />
                <FormTextarea
                  name="description"
                  label="Description"
                  placeholder="Detailed description..."
                  required
                />
                <FormInput
                  label="Square Feet"
                  name="squareFeet"
                  placeholder="1200"
                  required
                />
                <FormInput
                  label="Rent"
                  name="rent"
                  placeholder="20000"
                  required
                />
                <FormInput
                  label="Advance Amount"
                  name="advanceAmount"
                  placeholder="50000"
                  required
                />
              </div>

              <div className="space-y-4">
                <FormInput
                  label="Total Rooms"
                  name="totalRooms"
                  placeholder="5"
                  required
                />
                <FormInput
                  label="Total Bedrooms"
                  name="totalBedrooms"
                  placeholder="3"
                  required
                />
                <FormInput
                  label="Total Bathrooms"
                  name="totalBathrooms"
                  placeholder="2"
                  required
                />
                <FormSelect
                  label="Property Type"
                  name="propertyType"
                  placeholder="Select type"
                  options={[
                    { label: "Residential", value: "RESIDENTIAL" },
                    { label: "Commercial", value: "COMMERCIAL" },
                  ]}
                  required
                />
                <FormSelect
                  label="Purpose"
                  name="purpose"
                  placeholder="Select purpose"
                  options={[
                    { label: "Rent", value: "RENT" },
                    { label: "Sale", value: "SALE" },
                  ]}
                  required
                />
                <FormSelect
                  label="Availability"
                  name="availability"
                  placeholder="Select availability"
                  options={[
                    { label: "Yes", value: true },
                    { label: "No", value: false },
                  ]}
                  required
                />
              </div>

              <div className="space-y-4">
                <FormInput
                  label="Street"
                  name="street"
                  placeholder="123 Main St"
                />
                <FormInput
                  label="City"
                  name="city"
                  placeholder="Dhaka"
                  required
                />
                <FormInput
                  label="State"
                  name="state"
                  placeholder="Dhaka"
                  required
                />
                <FormInput
                  label="Zip Code"
                  name="zipCode"
                  placeholder="1000"
                  required
                />
                <FormInput
                  label="Country"
                  name="country"
                  placeholder="Bangladesh"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 gap-6 mt-6">
              <FormTagsSelector
                name="amenities"
                tags={DEFAULT_AMENITIES}
                label="Property Amenities"
                required
                onSelectionChange={(tags) => console.log(tags)}
              />
              <FormImageUploader
                name="images"
                label="Upload Property Images"
                required={false}
              />
            </div>

            <div className="flex justify-end gap-4 pt-6">
              <Button
                variant="outline"
                type="button"
                onClick={onClose}
                className="rounded-full"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="rounded-full bg-[#1C2D37] text-white hover:bg-[#2a3f4a]"
              >
                {loading ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  "Update Property"
                )}
              </Button>
            </div>
          </FormContainer>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default UpdatePropertyModal;
