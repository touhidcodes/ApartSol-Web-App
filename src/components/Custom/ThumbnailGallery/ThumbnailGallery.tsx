"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";

const placeholder =
  "https://images.unsplash.com/photo-1469022563428-aa04fef9f5a2";

type Props = {
  images: string[];
};

export default function ThumbnailGallery({ images }: Props) {
  const [selectedImage, setSelectedImage] = useState<string>(
    images?.[0] || placeholder
  );

  useEffect(() => {
    if (images?.length > 0) {
      setSelectedImage(images[0]);
    }
  }, [images]);

  return (
    <div className="w-full max-w-4xl mx-auto space-y-4">
      {/* Main Image */}
      <div className="relative aspect-video w-full rounded-xl overflow-hidden shadow-md">
        <Image
          src={selectedImage}
          alt="Main display image"
          fill
          className="object-cover"
        />
      </div>

      {/* Thumbnail Carousel Container */}
      <div className="relative">
        <Carousel
          opts={{ align: "start", loop: true }}
          className="w-full mx-auto"
        >
          <CarouselContent>
            {images.map((img, i) => (
              <CarouselItem key={i} className="basis-1/4 lg:basis-1/6 px-2">
                <Card
                  onClick={() => setSelectedImage(img)}
                  className={`overflow-hidden rounded-xl border-2 cursor-pointer ${
                    selectedImage === img
                      ? "border-primary"
                      : "border-transparent"
                  }`}
                >
                  <CardContent className="relative h-24 w-full p-0">
                    <Image
                      src={img || placeholder}
                      alt={`Thumbnail ${i + 1}`}
                      fill
                      className="object-cover"
                    />
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>

          {/* CarouselPrevious positioned absolutely on left */}
          <CarouselPrevious className="absolute left-2 top-1/2 -translate-y-1/2 z-10 cursor-pointer" />

          <CarouselNext className="absolute right-2 top-1/2 -translate-y-1/2 z-10 cursor-pointer" />
        </Carousel>
      </div>
    </div>
  );
}
