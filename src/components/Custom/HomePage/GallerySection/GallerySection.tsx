"use client";

import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import Image from "next/image";

const unsplashImages = [
  "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267",
  "https://images.unsplash.com/photo-1631679706909-1844bbd07221",
  "https://images.unsplash.com/photo-1529408632839-a54952c491e5",
  "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688",
  "https://images.unsplash.com/photo-1484154218962-a197022b5858",
  "https://images.unsplash.com/photo-1612965607446-25e1332775ae",
  "https://images.unsplash.com/photo-1507089947368-19c1da9775ae",
  "https://images.unsplash.com/photo-1540518614846-7eded433c457",
  "https://images.unsplash.com/photo-1560185127-6ed189bf02f4",
];

const placeholder =
  "https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd";

const GallerySection = () => {
  return (
    <section className="w-full py-16 px-4">
      <div className="container mx-auto">
        {/* Section Header */}
        <div className="mb-12">
          <div className="flex-1 max-w-2xl text-white">
            <div className="inline-flex items-center gap-2 mb-3">
              <div className="w-8 h-[1px] bg-gray-400"></div>
              <span className="text-sm font-medium  uppercase tracking-wide text-gray-600">
                Gallery
              </span>
            </div>
            <h2 className="text-3xl lg:text-4xl font-bold mb-2 leading-tight text-gray-900">
              Explore Stunning Spaces
            </h2>
            <p className="text-sm leading-relaxed text-gray-600">
              A visual journey through beautifully designed flats and modern
              interiors. See what your next dream space could look like.
            </p>
          </div>
        </div>

        {/* Image Carousel */}
        <Carousel
          className="w-full"
          plugins={[
            Autoplay({
              delay: 3000,
              stopOnInteraction: true,
            }),
          ]}
          opts={{
            align: "start",
            loop: true,
          }}
        >
          <CarouselContent>
            {unsplashImages.map((img, i) => (
              <CarouselItem key={i} className="px-3 md:basis-1/4">
                <Card className="border-0 shadow-md rounded-2xl overflow-hidden h-full">
                  <CardContent className="p-0">
                    <div className="relative w-72 h-72 aspect-square">
                      <Image
                        src={img || placeholder}
                        alt={`Flat image ${i + 1}`}
                        fill
                        className="object-cover rounded-2xl"
                      />
                    </div>
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>
    </section>
  );
};

export default GallerySection;
