import { useState, useRef, useCallback } from "react";
import { Camera, Upload, X, Image as ImageIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

interface PhotoUploadProps {
  onPhotosChange: (photos: File[]) => void;
  maxPhotos?: number;
}

const PhotoUpload = ({ onPhotosChange, maxPhotos = 5 }: PhotoUploadProps) => {
  const [photos, setPhotos] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const cameraInputRef = useRef<HTMLInputElement>(null);

  const handleFiles = useCallback((files: FileList | null) => {
    if (!files) return;

    const newPhotos: File[] = [];
    const newPreviews: string[] = [];

    Array.from(files).forEach((file) => {
      if (file.type.startsWith("image/") && photos.length + newPhotos.length < maxPhotos) {
        newPhotos.push(file);
        newPreviews.push(URL.createObjectURL(file));
      }
    });

    const updatedPhotos = [...photos, ...newPhotos];
    const updatedPreviews = [...previews, ...newPreviews];
    
    setPhotos(updatedPhotos);
    setPreviews(updatedPreviews);
    onPhotosChange(updatedPhotos);
  }, [photos, previews, maxPhotos, onPhotosChange]);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    handleFiles(e.dataTransfer.files);
  }, [handleFiles]);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const removePhoto = (index: number) => {
    URL.revokeObjectURL(previews[index]);
    const newPhotos = photos.filter((_, i) => i !== index);
    const newPreviews = previews.filter((_, i) => i !== index);
    setPhotos(newPhotos);
    setPreviews(newPreviews);
    onPhotosChange(newPhotos);
  };

  return (
    <div className="space-y-4">
      {/* Upload Buttons */}
      <div className="flex flex-wrap gap-4">
        <Button
          type="button"
          onClick={() => cameraInputRef.current?.click()}
          className="btn-primary flex-1 min-w-[200px]"
          disabled={photos.length >= maxPhotos}
        >
          <Camera className="w-6 h-6" />
          <span>Take Photo</span>
        </Button>
        
        <Button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          variant="outline"
          className="btn-accessible border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground flex-1 min-w-[200px]"
          disabled={photos.length >= maxPhotos}
        >
          <Upload className="w-6 h-6" />
          <span>Upload Photos</span>
        </Button>
      </div>

      {/* Hidden File Inputs */}
      <input
        ref={cameraInputRef}
        type="file"
        accept="image/*"
        capture="environment"
        onChange={(e) => handleFiles(e.target.files)}
        className="hidden"
        aria-label="Take photo with camera"
      />
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        multiple
        onChange={(e) => handleFiles(e.target.files)}
        className="hidden"
        aria-label="Upload photos from device"
      />

      {/* Drag and Drop Zone */}
      {photos.length < maxPhotos && (
        <div
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          className={`
            border-2 border-dashed rounded-2xl p-8 text-center transition-all
            ${isDragging 
              ? "border-primary bg-accent" 
              : "border-muted-foreground/30 hover:border-primary/50"
            }
          `}
          role="button"
          tabIndex={0}
          aria-label="Drop photos here or click to upload"
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              fileInputRef.current?.click();
            }
          }}
        >
          <ImageIcon className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
          <p className="text-lg text-muted-foreground">
            Drag and drop photos here
          </p>
          <p className="text-muted-foreground mt-2">
            {photos.length} of {maxPhotos} photos added
          </p>
        </div>
      )}

      {/* Photo Previews */}
      {previews.length > 0 && (
        <div 
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4"
          role="list"
          aria-label="Uploaded photos"
        >
          {previews.map((preview, index) => (
            <div
              key={index}
              className="relative group rounded-xl overflow-hidden aspect-square"
              role="listitem"
            >
              <img
                src={preview}
                alt={`Uploaded photo ${index + 1}`}
                className="w-full h-full object-cover"
              />
              <button
                type="button"
                onClick={() => removePhoto(index)}
                className="absolute top-2 right-2 p-2 bg-destructive text-destructive-foreground rounded-full opacity-0 group-hover:opacity-100 focus:opacity-100 transition-opacity touch-target"
                aria-label={`Remove photo ${index + 1}`}
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PhotoUpload;
