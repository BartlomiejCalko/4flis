'use client';

import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { X, ChevronLeft, ChevronRight, Loader2 } from 'lucide-react';

type BlobImage = {
  url: string;
  pathname: string;
  uploadedAt: string;
};

export const ProjectGallery = () => {
  const [images, setImages] = useState<BlobImage[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [lightboxOpen, setLightboxOpen] = useState<boolean>(false);
  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);

  // Fetch images from API
  useEffect(() => {
    const fetchImages = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/images');
        
        if (!response.ok) {
          throw new Error('Failed to fetch images');
        }

        const data = await response.json();
        setImages(data.images || []);
        setError(null);
      } catch (err) {
        console.error('Error fetching images:', err);
        setError(err instanceof Error ? err.message : 'Failed to load images');
      } finally {
        setLoading(false);
      }
    };

    fetchImages();
  }, []);

  const handleImageClick = (index: number) => {
    setCurrentImageIndex(index);
    setLightboxOpen(true);
  };

  const handleCloseLightbox = useCallback(() => {
    setLightboxOpen(false);
  }, []);

  const handlePrevious = useCallback(() => {
    setCurrentImageIndex((prev) => 
      prev === 0 ? images.length - 1 : prev - 1
    );
  }, [images.length]);

  const handleNext = useCallback(() => {
    setCurrentImageIndex((prev) => 
      prev === images.length - 1 ? 0 : prev + 1
    );
  }, [images.length]);

  // Keyboard navigation
  useEffect(() => {
    if (!lightboxOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        handleCloseLightbox();
      } else if (e.key === 'ArrowLeft') {
        handlePrevious();
      } else if (e.key === 'ArrowRight') {
        handleNext();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxOpen, handleCloseLightbox, handlePrevious, handleNext]);

  // Prevent body scroll when lightbox is open
  useEffect(() => {
    if (lightboxOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [lightboxOpen]);

  const currentImage = images[currentImageIndex];

  return (
    <div className="w-full">
      {/* Loading State */}
      {loading && (
        <div className="flex flex-col items-center justify-center py-20">
          <Loader2 className="h-12 w-12 animate-spin text-primary mb-4" />
          <p className="text-muted-foreground">Laster bilder...</p>
        </div>
      )}

      {/* Error State */}
      {error && !loading && (
        <div className="text-center py-12">
          <p className="text-red-500 text-lg mb-2">Kunne ikke laste bilder</p>
          <p className="text-muted-foreground">{error}</p>
        </div>
      )}

      {/* Gallery */}
      {!loading && !error && images.length > 0 && (
        <>
          {/* Image Count */}
          <div className="mb-6 text-center text-sm text-muted-foreground">
            Viser {images.length} {images.length === 1 ? 'bilde' : 'bilder'}
          </div>

          {/* Masonry Gallery */}
          <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
            {images.map((image, index) => (
              <div
                key={image.pathname}
                className="break-inside-avoid relative group cursor-pointer overflow-hidden rounded-lg"
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                onClick={() => handleImageClick(index)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    handleImageClick(index);
                  }
                }}
                tabIndex={0}
                role="button"
                aria-label={`Vis bilde ${index + 1}`}
              >
                <div className="relative w-full aspect-auto">
                  <Image
                    src={image.url}
                    alt={`Prosjekt bilde ${index + 1}`}
                    width={600}
                    height={400}
                    className={cn(
                      'w-full h-auto object-cover transition-transform duration-500',
                      hoveredIndex === index && 'scale-110'
                    )}
                    loading="lazy"
                  />
                  
                  {/* Overlay */}
                  <div
                    className={cn(
                      'absolute inset-0 bg-gradient-to-t from-black/60 to-transparent',
                      'opacity-0 group-hover:opacity-100 transition-opacity duration-300',
                      'flex flex-col justify-end p-4'
                    )}
                  >
                    <p className="text-white/90 text-sm">
                      Bilde {index + 1}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {/* Empty State */}
      {!loading && !error && images.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground text-lg">
            Ingen bilder tilgjengelig ennå.
          </p>
        </div>
      )}

      {/* Lightbox Modal */}
      {lightboxOpen && currentImage && (
        <div
          className="fixed left-0 right-0 top-16 bottom-0 z-[9999] bg-black/95 flex items-center justify-center"
          onClick={handleCloseLightbox}
        >
          {/* Close Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleCloseLightbox();
            }}
            className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors z-[10000] p-2 hover:bg-white/10 rounded-full"
            aria-label="Lukk"
            tabIndex={0}
          >
            <X size={32} />
          </button>

          {/* Previous Button */}
          {images.length > 1 && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                handlePrevious();
              }}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-white hover:text-gray-300 transition-colors z-[10000] p-2 hover:bg-white/10 rounded-full"
              aria-label="Forrige bilde"
              tabIndex={0}
            >
              <ChevronLeft size={48} />
            </button>
          )}

          {/* Next Button */}
          {images.length > 1 && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleNext();
              }}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:text-gray-300 transition-colors z-[10000] p-2 hover:bg-white/10 rounded-full"
              aria-label="Neste bilde"
              tabIndex={0}
            >
              <ChevronRight size={48} />
            </button>
          )}

          {/* Image Container */}
          <div
            className="relative max-w-7xl max-h-[90vh] mx-auto px-4 z-10"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={currentImage.url}
              alt={`Prosjekt bilde ${currentImageIndex + 1}`}
              width={1920}
              height={1080}
              className="w-auto h-auto max-w-full max-h-[90vh] object-contain"
              priority
            />

            {/* Image Info */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
              <p className="text-white/60 text-sm">
                {currentImageIndex + 1} / {images.length}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};


