import { useState, useEffect } from "react";
import { MapPin, Navigation, Edit3, Check, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Location {
  lat: number;
  lng: number;
  address: string;
}

interface LocationPickerProps {
  onLocationChange: (location: Location | null) => void;
}

const LocationPicker = ({ onLocationChange }: LocationPickerProps) => {
  const [location, setLocation] = useState<Location | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [manualAddress, setManualAddress] = useState("");

  const detectLocation = async () => {
    setIsLoading(true);
    setError(null);

    if (!navigator.geolocation) {
      setError("Geolocation is not supported by your browser");
      setIsLoading(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        
        // Reverse geocoding using Nominatim (OpenStreetMap)
        try {
          const response = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
          );
          const data = await response.json();
          
          const newLocation: Location = {
            lat: latitude,
            lng: longitude,
            address: data.display_name || `${latitude.toFixed(6)}, ${longitude.toFixed(6)}`
          };
          
          setLocation(newLocation);
          setManualAddress(newLocation.address);
          onLocationChange(newLocation);
        } catch (err) {
          // If reverse geocoding fails, use coordinates
          const newLocation: Location = {
            lat: latitude,
            lng: longitude,
            address: `${latitude.toFixed(6)}, ${longitude.toFixed(6)}`
          };
          setLocation(newLocation);
          setManualAddress(newLocation.address);
          onLocationChange(newLocation);
        }
        
        setIsLoading(false);
      },
      (err) => {
        switch (err.code) {
          case err.PERMISSION_DENIED:
            setError("Location access denied. Please enable location permissions.");
            break;
          case err.POSITION_UNAVAILABLE:
            setError("Location information is unavailable.");
            break;
          case err.TIMEOUT:
            setError("Location request timed out. Please try again.");
            break;
          default:
            setError("An unknown error occurred.");
        }
        setIsLoading(false);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0
      }
    );
  };

  const handleManualAddressSave = () => {
    if (manualAddress.trim()) {
      const newLocation: Location = {
        lat: location?.lat || 0,
        lng: location?.lng || 0,
        address: manualAddress.trim()
      };
      setLocation(newLocation);
      onLocationChange(newLocation);
      setIsEditing(false);
    }
  };

  useEffect(() => {
    // Auto-detect location on mount
    detectLocation();
  }, []);

  return (
    <div className="space-y-4">
      {/* Location Detection Button */}
      <Button
        type="button"
        onClick={detectLocation}
        disabled={isLoading}
        className="btn-primary w-full"
      >
        {isLoading ? (
          <>
            <Loader2 className="w-6 h-6 animate-spin" />
            <span>Detecting Location...</span>
          </>
        ) : (
          <>
            <Navigation className="w-6 h-6" />
            <span>Detect My Location</span>
          </>
        )}
      </Button>

      {/* Error Message */}
      {error && (
        <div 
          className="p-4 rounded-xl bg-destructive-light text-destructive"
          role="alert"
        >
          <p className="font-semibold">{error}</p>
          <p className="text-sm mt-1">You can enter your address manually below.</p>
        </div>
      )}

      {/* Location Display */}
      {location && (
        <div className="card-accessible space-y-4">
          <div className="flex items-start gap-3">
            <MapPin className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
            <div className="flex-1">
              <p className="font-semibold text-lg mb-1">Detected Location</p>
              {isEditing ? (
                <div className="space-y-3">
                  <textarea
                    value={manualAddress}
                    onChange={(e) => setManualAddress(e.target.value)}
                    className="textarea-accessible"
                    rows={3}
                    placeholder="Enter your address"
                    aria-label="Manual address input"
                  />
                  <div className="flex gap-3">
                    <Button
                      type="button"
                      onClick={handleManualAddressSave}
                      className="btn-success flex-1"
                    >
                      <Check className="w-5 h-5" />
                      <span>Save Address</span>
                    </Button>
                    <Button
                      type="button"
                      onClick={() => {
                        setIsEditing(false);
                        setManualAddress(location.address);
                      }}
                      variant="outline"
                      className="btn-accessible"
                    >
                      Cancel
                    </Button>
                  </div>
                </div>
              ) : (
                <>
                  <p className="text-muted-foreground">{location.address}</p>
                  <Button
                    type="button"
                    onClick={() => setIsEditing(true)}
                    variant="ghost"
                    className="mt-2 text-primary"
                  >
                    <Edit3 className="w-5 h-5 mr-2" />
                    Edit Address
                  </Button>
                </>
              )}
            </div>
          </div>

          {/* Simple Map Preview */}
          <div className="rounded-xl overflow-hidden border border-border h-48 relative bg-muted">
            <iframe
              title="Location map preview"
              src={`https://www.openstreetmap.org/export/embed.html?bbox=${location.lng - 0.01},${location.lat - 0.01},${location.lng + 0.01},${location.lat + 0.01}&layer=mapnik&marker=${location.lat},${location.lng}`}
              className="w-full h-full"
              style={{ border: 0 }}
              loading="lazy"
            />
          </div>
        </div>
      )}

      {/* Manual Entry Option */}
      {!location && !isLoading && (
        <div className="space-y-3">
          <p className="text-muted-foreground text-center">Or enter your address manually:</p>
          <textarea
            value={manualAddress}
            onChange={(e) => setManualAddress(e.target.value)}
            className="textarea-accessible"
            rows={3}
            placeholder="Enter your complete address with landmark"
            aria-label="Manual address input"
          />
          <Button
            type="button"
            onClick={() => {
              if (manualAddress.trim()) {
                const newLocation: Location = {
                  lat: 0,
                  lng: 0,
                  address: manualAddress.trim()
                };
                setLocation(newLocation);
                onLocationChange(newLocation);
              }
            }}
            className="btn-primary w-full"
            disabled={!manualAddress.trim()}
          >
            <Check className="w-6 h-6" />
            <span>Confirm Address</span>
          </Button>
        </div>
      )}
    </div>
  );
};

export default LocationPicker;
