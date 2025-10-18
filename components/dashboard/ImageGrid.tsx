"use client";

import { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { toast } from "sonner";

type Blob = {
  url: string;
  pathname: string;
  uploadedAt: Date;
};

type ImageGridProps = {
  initialBlobs: Blob[];
};

export const ImageGrid = ({ initialBlobs }: ImageGridProps) => {
  const [blobs, setBlobs] = useState<Blob[]>(initialBlobs);
  const [deletingUrl, setDeletingUrl] = useState<string | null>(null);

  const handleDelete = async (url: string, filename: string) => {
    // Confirm deletion
    if (!window.confirm(`Czy na pewno chcesz usunąć zdjęcie "${filename}"?`)) {
      return;
    }

    setDeletingUrl(url);

    try {
      const response = await fetch("/api/images/delete", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ url }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to delete image");
      }

      // Remove the deleted image from the list
      setBlobs((prev) => prev.filter((blob) => blob.url !== url));
      toast.success("Zdjęcie zostało usunięte");
    } catch (error) {
      console.error("Error deleting image:", error);
      const errorMessage = error instanceof Error ? error.message : "Nie udało się usunąć zdjęcia";
      toast.error(errorMessage);
    } finally {
      setDeletingUrl(null);
    }
  };

  return (
    <>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {blobs.map((blob) => {
          const filename = blob.pathname.split("/").pop() || "Image";
          const isDeleting = deletingUrl === blob.url;

          return (
            <div
              key={blob.url}
              className="group overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm transition-shadow hover:shadow-md dark:border-gray-800 dark:bg-gray-950"
            >
              {/* Image Preview */}
              <div className="relative aspect-square overflow-hidden bg-gray-100 dark:bg-gray-800">
                <Image
                  src={blob.url}
                  alt={filename}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                  className="object-cover transition-transform group-hover:scale-105"
                />
                
                {/* Delete Button Overlay */}
                <div className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 transition-opacity group-hover:opacity-100">
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => handleDelete(blob.url, filename)}
                    disabled={isDeleting}
                    className="shadow-lg"
                  >
                    <Trash2 className="mr-2 h-4 w-4" />
                    {isDeleting ? "Usuwanie..." : "Usuń"}
                  </Button>
                </div>
              </div>

              {/* Image Info */}
              <div className="p-4">
                <p className="text-sm font-medium text-gray-900 dark:text-gray-100 truncate">
                  {filename}
                </p>
                <div className="mt-2 flex items-center justify-between">
                  <span className="text-xs text-gray-500 dark:text-gray-500">
                    {new Date(blob.uploadedAt).toLocaleDateString("pl-PL")}
                  </span>
                  <a
                    href={blob.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
                  >
                    View
                  </a>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {blobs.length > 0 && (
        <div className="mt-8 text-center text-sm text-gray-600 dark:text-gray-400">
          Total images: {blobs.length}
        </div>
      )}
    </>
  );
};

