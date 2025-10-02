'use client';

import { useState, useMemo, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

type Project = {
  id: string;
  title: string;
  image: string;
  tags: string[];
  description?: string;
};

// Temporary mock data using images from public folder
const MOCK_PROJECTS: Project[] = [
  {
    id: '1',
    title: 'Moderne Baderomsrenovering',
    image: '/bad1.jpg',
    tags: ['Bad'],
    description: 'Komplett renovering av moderne baderom'
  },
  {
    id: '2',
    title: 'Lyse Fliser',
    image: '/bad2.jpg',
    tags: ['Bad'],
    description: 'Elegant design med lyse fliser'
  },
  {
    id: '3',
    title: 'Klassisk Baderom',
    image: '/bad3.jpg',
    tags: ['Bad', 'Kjøkken'],
    description: 'Tidløs klassisk stil'
  },
  {
    id: '4',
    title: 'Luksuriøst Spa-bad',
    image: '/bad4.jpg',
    tags: ['Bad', 'Hall'],
    description: 'Spa-opplevelse hjemme'
  },
  {
    id: '5',
    title: 'Kompakt Baderom',
    image: '/bad5.jpg',
    tags: ['Bad', 'Gulv'],
    description: 'Smart bruk av lite rom'
  },
  {
    id: '6',
    title: 'Dali-inspirert Design',
    image: '/bad-dali.webp',
    tags: ['Bad', 'Kjøkken'],
    description: 'Unikt og kunstnerisk baderom'
  },
  {
    id: '7',
    title: 'Premium Flislegging',
    image: '/bad-dali-2.webp',
    tags: ['Gulv', 'Hall'],
    description: 'Førsteklasses håndverk'
  }
];

// Fixed tags based on menu
const FIXED_TAGS = ['Alle', 'Bad', 'Gulv', 'Hall', 'Kjøkken'];

type ProjectGalleryProps = {
  projects?: Project[];
};

export const ProjectGallery = ({ projects = MOCK_PROJECTS }: ProjectGalleryProps) => {
  const [selectedTag, setSelectedTag] = useState<string>('Alle');
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [lightboxOpen, setLightboxOpen] = useState<boolean>(false);
  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);

  const filteredProjects = useMemo(() => {
    if (selectedTag === 'Alle') return projects;
    return projects.filter(project => project.tags.includes(selectedTag));
  }, [selectedTag, projects]);

  const handleTagClick = (tag: string) => {
    setSelectedTag(tag);
  };

  const handleImageClick = (index: number) => {
    setCurrentImageIndex(index);
    setLightboxOpen(true);
  };

  const handleCloseLightbox = useCallback(() => {
    setLightboxOpen(false);
  }, []);

  const handlePrevious = useCallback(() => {
    setCurrentImageIndex((prev) => 
      prev === 0 ? filteredProjects.length - 1 : prev - 1
    );
  }, [filteredProjects.length]);

  const handleNext = useCallback(() => {
    setCurrentImageIndex((prev) => 
      prev === filteredProjects.length - 1 ? 0 : prev + 1
    );
  }, [filteredProjects.length]);

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

  const currentProject = filteredProjects[currentImageIndex];

  return (
    <div className="w-full">
      {/* Tag Filters */}
      <div className="mb-8 flex flex-wrap gap-2 justify-center">
        {FIXED_TAGS.map((tag) => (
          <button
            key={tag}
            onClick={() => handleTagClick(tag)}
            className={cn(
              'px-4 py-2 rounded-full text-sm font-medium transition-all duration-200',
              'hover:scale-105 active:scale-95',
              selectedTag === tag
                ? 'bg-primary text-primary-foreground shadow-lg'
                : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
            )}
            aria-label={`Filter by ${tag}`}
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                handleTagClick(tag);
              }
            }}
          >
            {tag}
          </button>
        ))}
      </div>

      {/* Project Count */}
      <div className="mb-6 text-center text-sm text-muted-foreground">
        Viser {filteredProjects.length} {filteredProjects.length === 1 ? 'prosjekt' : 'prosjekter'}
      </div>

      {/* Masonry Gallery */}
      <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
        {filteredProjects.map((project, index) => (
          <div
            key={project.id}
            className="break-inside-avoid relative group cursor-pointer overflow-hidden rounded-lg"
            onMouseEnter={() => setHoveredId(project.id)}
            onMouseLeave={() => setHoveredId(null)}
            onClick={() => handleImageClick(index)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                handleImageClick(index);
              }
            }}
            tabIndex={0}
            role="button"
            aria-label={`Vis ${project.title}`}
          >
            <div className="relative w-full aspect-auto">
              <Image
                src={project.image}
                alt={project.title}
                width={600}
                height={400}
                className={cn(
                  'w-full h-auto object-cover transition-transform duration-500',
                  hoveredId === project.id && 'scale-110'
                )}
                loading="lazy"
              />
              
              {/* Overlay */}
              <div
                className={cn(
                  'absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent',
                  'opacity-0 group-hover:opacity-100 transition-opacity duration-300',
                  'flex flex-col justify-end p-4'
                )}
              >
                <h3 className="text-white font-semibold text-lg mb-2">
                  {project.title}
                </h3>
                {project.description && (
                  <p className="text-white/90 text-sm mb-3">
                    {project.description}
                  </p>
                )}
                <div className="flex flex-wrap gap-1">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-1 bg-white/20 backdrop-blur-sm text-white text-xs rounded-md"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredProjects.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground text-lg">
            Ingen prosjekter funnet for denne kategorien.
          </p>
        </div>
      )}

      {/* Lightbox Modal */}
      {lightboxOpen && currentProject && (
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

          {/* Next Button */}
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

          {/* Image Container */}
          <div
            className="relative max-w-7xl max-h-[90vh] mx-auto px-4 z-10"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={currentProject.image}
              alt={currentProject.title}
              width={1920}
              height={1080}
              className="w-auto h-auto max-w-full max-h-[90vh] object-contain"
              priority
            />

            {/* Image Info */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
              <h3 className="text-white font-semibold text-2xl mb-2">
                {currentProject.title}
              </h3>
              {currentProject.description && (
                <p className="text-white/90 text-base mb-3">
                  {currentProject.description}
                </p>
              )}
              <div className="flex flex-wrap gap-2">
                {currentProject.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 bg-white/20 backdrop-blur-sm text-white text-sm rounded-md"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <p className="text-white/60 text-sm mt-3">
                {currentImageIndex + 1} / {filteredProjects.length}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};


