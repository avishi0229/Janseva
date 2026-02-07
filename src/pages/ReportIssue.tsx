import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { 
  Mic, 
  Camera, 
  MapPin, 
  AlertTriangle, 
  CheckCircle2, 
  ArrowRight,
  ArrowLeft,
  Send,
  Sparkles
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Layout from "@/components/layout/Layout";
import VoiceRecorder from "@/components/ui/VoiceRecorder";
import PhotoUpload from "@/components/ui/PhotoUpload";
import CategorySelector from "@/components/ui/CategorySelector";
import LocationPicker from "@/components/ui/LocationPicker";

interface Location {
  lat: number;
  lng: number;
  address: string;
}

const ReportIssue = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [trackingId, setTrackingId] = useState("");
  
  // Form data
  const [description, setDescription] = useState("");
  const [photos, setPhotos] = useState<File[]>([]);
  const [category, setCategory] = useState<string | null>(null);
  const [location, setLocation] = useState<Location | null>(null);
  const [isEmergency, setIsEmergency] = useState(false);

  const steps = [
    { id: 1, title: "Describe Issue", icon: Mic },
    { id: 2, title: "Add Photos", icon: Camera },
    { id: 3, title: "Select Category", icon: Sparkles },
    { id: 4, title: "Confirm Location", icon: MapPin },
  ];

  const handleSubmit = async () => {
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Generate tracking ID
    const id = `JS${Date.now().toString().slice(-8)}`;
    setTrackingId(id);
    setIsSubmitted(true);
    setIsSubmitting(false);
  };

  const canProceed = () => {
    switch (currentStep) {
      case 1:
        return description.trim().length > 0;
      case 2:
        return true; // Photos are optional
      case 3:
        return category !== null;
      case 4:
        return location !== null;
      default:
        return false;
    }
  };

  if (isSubmitted) {
    return (
      <Layout>
        <div className="section-container">
          <div className="max-w-2xl mx-auto text-center space-y-8">
            {/* Success Animation */}
            <div className="w-32 h-32 mx-auto rounded-full bg-success text-success-foreground flex items-center justify-center animate-scale-in">
              <CheckCircle2 className="w-16 h-16" />
            </div>
            
            <div className="space-y-4">
              <h1 className="text-4xl font-bold text-success">Issue Reported Successfully!</h1>
              <p className="text-xl text-muted-foreground">
                Your complaint has been registered and routed to the appropriate department.
              </p>
            </div>
            
            {/* Tracking ID */}
            <div className="card-highlight space-y-4">
              <p className="text-lg text-muted-foreground">Your Tracking ID</p>
              <p className="text-4xl font-bold text-primary font-mono">{trackingId}</p>
              <p className="text-muted-foreground">
                Save this ID to track your issue status
              </p>
            </div>
            
            {/* Estimated Time */}
            <div className="card-accessible">
              <div className="flex items-center justify-center gap-4">
                <div className="text-center">
                  <p className="text-muted-foreground">Estimated Resolution</p>
                  <p className="text-2xl font-bold text-foreground">3-5 Working Days</p>
                </div>
              </div>
            </div>
            
            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Button 
                onClick={() => navigate(`/track?id=${trackingId}`)}
                className="btn-primary text-xl"
              >
                Track This Issue
                <ArrowRight className="w-6 h-6" />
              </Button>
              <Button 
                onClick={() => {
                  setIsSubmitted(false);
                  setCurrentStep(1);
                  setDescription("");
                  setPhotos([]);
                  setCategory(null);
                  setLocation(null);
                  setIsEmergency(false);
                }}
                variant="outline"
                className="btn-accessible border-2"
              >
                Report Another Issue
              </Button>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="section-container">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Report an Issue</h1>
            <p className="text-xl text-muted-foreground">
              Use your voice or type to describe the problem. We'll take it from here.
            </p>
          </div>

          {/* Progress Steps */}
          <div className="mb-12">
            <div className="flex items-center justify-between">
              {steps.map((step, index) => {
                const StepIcon = step.icon;
                const isActive = currentStep === step.id;
                const isCompleted = currentStep > step.id;
                
                return (
                  <div key={step.id} className="flex-1 flex items-center">
                    <button
                      onClick={() => isCompleted && setCurrentStep(step.id)}
                      disabled={!isCompleted}
                      className={`
                        flex flex-col items-center gap-2 p-4 rounded-xl transition-all w-full
                        ${isActive ? "bg-primary text-primary-foreground" : ""}
                        ${isCompleted ? "bg-success text-success-foreground cursor-pointer" : ""}
                        ${!isActive && !isCompleted ? "text-muted-foreground" : ""}
                      `}
                      aria-current={isActive ? "step" : undefined}
                    >
                      <div className={`
                        w-14 h-14 rounded-full flex items-center justify-center
                        ${isActive ? "bg-white/20" : ""}
                        ${isCompleted ? "bg-white/20" : ""}
                        ${!isActive && !isCompleted ? "bg-muted" : ""}
                      `}>
                        {isCompleted ? (
                          <CheckCircle2 className="w-8 h-8" />
                        ) : (
                          <StepIcon className="w-8 h-8" />
                        )}
                      </div>
                      <span className="text-sm font-semibold hidden sm:block">{step.title}</span>
                    </button>
                    {index < steps.length - 1 && (
                      <div className={`
                        h-1 flex-1 mx-2 rounded-full hidden sm:block
                        ${currentStep > step.id ? "bg-success" : "bg-muted"}
                      `} />
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Emergency Toggle */}
          <div className="mb-8">
            <button
              onClick={() => setIsEmergency(!isEmergency)}
              className={`
                w-full p-6 rounded-2xl border-2 transition-all flex items-center justify-center gap-4
                ${isEmergency 
                  ? "border-destructive bg-destructive-light text-destructive" 
                  : "border-muted hover:border-destructive/50"
                }
              `}
              role="switch"
              aria-checked={isEmergency}
            >
              <AlertTriangle className="w-8 h-8" />
              <span className="text-xl font-bold">
                {isEmergency ? "🚨 EMERGENCY ISSUE - Priority Handling" : "Mark as Emergency (Urgent Issues Only)"}
              </span>
            </button>
          </div>

          {/* Step Content */}
          <div className="card-accessible mb-8">
            {/* Step 1: Voice/Text Description */}
            {currentStep === 1 && (
              <div className="space-y-8">
                <div className="text-center">
                  <h2 className="text-2xl font-bold mb-2">Describe Your Issue</h2>
                  <p className="text-muted-foreground text-lg">
                    Tap the microphone and speak, or type your complaint below
                  </p>
                </div>
                
                <VoiceRecorder 
                  onTranscript={(text) => setDescription(text)}
                />
                
                <div className="relative">
                  <div className="absolute inset-x-0 top-0 flex items-center justify-center -mt-4">
                    <span className="bg-card px-4 text-muted-foreground">or type here</span>
                  </div>
                  <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="textarea-accessible mt-4"
                    rows={5}
                    placeholder="Describe the issue in detail... (e.g., Big pothole on MG Road near the bus stop)"
                    aria-label="Issue description"
                  />
                </div>
                
                {description && (
                  <div className="p-4 bg-success-light rounded-xl flex items-center gap-3">
                    <CheckCircle2 className="w-6 h-6 text-success" />
                    <span className="text-success font-semibold">Description captured!</span>
                  </div>
                )}
              </div>
            )}

            {/* Step 2: Photo Upload */}
            {currentStep === 2 && (
              <div className="space-y-8">
                <div className="text-center">
                  <h2 className="text-2xl font-bold mb-2">Add Photos (Optional)</h2>
                  <p className="text-muted-foreground text-lg">
                    Photos help authorities understand the issue better
                  </p>
                </div>
                
                <PhotoUpload 
                  onPhotosChange={(files) => setPhotos(files)}
                />
              </div>
            )}

            {/* Step 3: Category Selection */}
            {currentStep === 3 && (
              <div className="space-y-8">
                <div className="text-center">
                  <h2 className="text-2xl font-bold mb-2">Select Category</h2>
                  <p className="text-muted-foreground text-lg">
                    Choose the type of issue you're reporting
                  </p>
                </div>
                
                <CategorySelector 
                  selectedCategory={category}
                  onSelect={(id) => setCategory(id)}
                />
              </div>
            )}

            {/* Step 4: Location */}
            {currentStep === 4 && (
              <div className="space-y-8">
                <div className="text-center">
                  <h2 className="text-2xl font-bold mb-2">Confirm Location</h2>
                  <p className="text-muted-foreground text-lg">
                    We'll auto-detect your location, or you can enter it manually
                  </p>
                </div>
                
                <LocationPicker 
                  onLocationChange={(loc) => setLocation(loc)}
                />
              </div>
            )}
          </div>

          {/* Navigation Buttons */}
          <div className="flex justify-between gap-4">
            {currentStep > 1 && (
              <Button
                onClick={() => setCurrentStep(currentStep - 1)}
                variant="outline"
                className="btn-accessible border-2"
              >
                <ArrowLeft className="w-6 h-6" />
                Previous
              </Button>
            )}
            
            <div className="flex-1" />
            
            {currentStep < 4 ? (
              <Button
                onClick={() => setCurrentStep(currentStep + 1)}
                disabled={!canProceed()}
                className="btn-primary"
              >
                Next Step
                <ArrowRight className="w-6 h-6" />
              </Button>
            ) : (
              <Button
                onClick={handleSubmit}
                disabled={!canProceed() || isSubmitting}
                className="btn-success text-xl px-10"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Submitting...
                  </>
                ) : (
                  <>
                    <Send className="w-6 h-6" />
                    Submit Report
                  </>
                )}
              </Button>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ReportIssue;
