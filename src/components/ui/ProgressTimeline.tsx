import { Check, Clock, Loader2, AlertCircle } from "lucide-react";

interface TimelineStep {
  id: string;
  label: string;
  description?: string;
  timestamp?: string;
  status: "completed" | "active" | "pending" | "failed";
}

interface ProgressTimelineProps {
  steps: TimelineStep[];
  orientation?: "vertical" | "horizontal";
}

const ProgressTimeline = ({ steps, orientation = "vertical" }: ProgressTimelineProps) => {
  const getStatusIcon = (status: TimelineStep["status"]) => {
    switch (status) {
      case "completed":
        return <Check className="w-5 h-5" />;
      case "active":
        return <Loader2 className="w-5 h-5 animate-spin" />;
      case "failed":
        return <AlertCircle className="w-5 h-5" />;
      default:
        return <Clock className="w-5 h-5" />;
    }
  };

  const getStatusStyles = (status: TimelineStep["status"]) => {
    switch (status) {
      case "completed":
        return "bg-success text-success-foreground";
      case "active":
        return "bg-primary text-primary-foreground";
      case "failed":
        return "bg-destructive text-destructive-foreground";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  const getLineStyles = (status: TimelineStep["status"]) => {
    return status === "completed" ? "bg-success" : "bg-muted";
  };

  if (orientation === "horizontal") {
    return (
      <div className="w-full overflow-x-auto pb-4" role="list" aria-label="Progress timeline">
        <div className="flex items-start min-w-max">
          {steps.map((step, index) => (
            <div
              key={step.id}
              className="flex-1 min-w-[150px]"
              role="listitem"
              aria-current={step.status === "active" ? "step" : undefined}
            >
              <div className="flex items-center">
                {/* Dot */}
                <div
                  className={`
                    w-12 h-12 rounded-full flex items-center justify-center
                    ${getStatusStyles(step.status)}
                    ${step.status === "active" ? "ring-4 ring-primary/30" : ""}
                  `}
                >
                  {getStatusIcon(step.status)}
                </div>
                
                {/* Line */}
                {index < steps.length - 1 && (
                  <div 
                    className={`flex-1 h-1 mx-2 rounded-full ${getLineStyles(step.status)}`}
                    aria-hidden="true"
                  />
                )}
              </div>
              
              {/* Content */}
              <div className="mt-3 pr-4">
                <p className="font-semibold text-lg">{step.label}</p>
                {step.description && (
                  <p className="text-muted-foreground text-sm mt-1">{step.description}</p>
                )}
                {step.timestamp && (
                  <p className="text-sm text-muted-foreground mt-1">{step.timestamp}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-0" role="list" aria-label="Progress timeline">
      {steps.map((step, index) => (
        <div
          key={step.id}
          className="relative flex gap-4"
          role="listitem"
          aria-current={step.status === "active" ? "step" : undefined}
        >
          {/* Timeline Column */}
          <div className="flex flex-col items-center">
            {/* Dot */}
            <div
              className={`
                w-12 h-12 rounded-full flex items-center justify-center z-10
                ${getStatusStyles(step.status)}
                ${step.status === "active" ? "ring-4 ring-primary/30" : ""}
              `}
            >
              {getStatusIcon(step.status)}
            </div>
            
            {/* Line */}
            {index < steps.length - 1 && (
              <div 
                className={`w-1 flex-1 min-h-[60px] ${getLineStyles(step.status)}`}
                aria-hidden="true"
              />
            )}
          </div>
          
          {/* Content Column */}
          <div className="flex-1 pb-8">
            <p className="font-semibold text-xl">{step.label}</p>
            {step.description && (
              <p className="text-muted-foreground mt-1">{step.description}</p>
            )}
            {step.timestamp && (
              <p className="text-sm text-muted-foreground mt-2 flex items-center gap-2">
                <Clock className="w-4 h-4" />
                {step.timestamp}
              </p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProgressTimeline;
