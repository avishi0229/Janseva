import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { 
  Search, 
  MapPin, 
  Calendar, 
  User, 
  Building2, 
  Clock, 
  Share2,
  Plus,
  Image as ImageIcon
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Layout from "@/components/layout/Layout";
import ProgressTimeline from "@/components/ui/ProgressTimeline";

interface IssueDetails {
  id: string;
  title: string;
  description: string;
  category: string;
  location: string;
  reportedDate: string;
  status: "pending" | "in_progress" | "resolved";
  assignedDepartment: string;
  assignedOfficer: string;
  estimatedResolution: string;
  photos: string[];
  updates: {
    date: string;
    message: string;
    by: string;
  }[];
}

const TrackIssue = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [trackingId, setTrackingId] = useState(searchParams.get("id") || "");
  const [issue, setIssue] = useState<IssueDetails | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Mock data for demonstration
  const mockIssue: IssueDetails = {
    id: "JS12345678",
    title: "Large pothole on MG Road near City Mall",
    description: "There is a large pothole approximately 2 feet wide on MG Road, right in front of the City Mall entrance. It is causing traffic problems and is dangerous for two-wheelers.",
    category: "Roads & Potholes",
    location: "MG Road, Near City Mall, Ward 15",
    reportedDate: "Feb 5, 2026 at 10:30 AM",
    status: "in_progress",
    assignedDepartment: "Public Works Department",
    assignedOfficer: "Mr. Ramesh Kumar",
    estimatedResolution: "Feb 10, 2026",
    photos: [
      "https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?w=400&q=80",
      "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=400&q=80"
    ],
    updates: [
      {
        date: "Feb 7, 2026 at 2:00 PM",
        message: "Work team dispatched. Repair materials arranged.",
        by: "PWD Office"
      },
      {
        date: "Feb 6, 2026 at 11:00 AM",
        message: "Issue verified by field inspector. Marked as high priority.",
        by: "Youth Volunteer"
      },
      {
        date: "Feb 5, 2026 at 10:45 AM",
        message: "Complaint received and forwarded to Public Works Department.",
        by: "JANSEVA System"
      }
    ]
  };

  const handleSearch = async (e?: React.FormEvent) => {
    e?.preventDefault();
    
    if (!trackingId.trim()) {
      setError("Please enter a tracking ID");
      return;
    }

    setIsLoading(true);
    setError(null);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));

    // For demo, show mock data for any ID starting with JS
    if (trackingId.toUpperCase().startsWith("JS")) {
      setIssue({ ...mockIssue, id: trackingId.toUpperCase() });
      setSearchParams({ id: trackingId.toUpperCase() });
    } else {
      setError("No issue found with this tracking ID. Please check and try again.");
      setIssue(null);
    }

    setIsLoading(false);
  };

  useEffect(() => {
    if (searchParams.get("id")) {
      handleSearch();
    }
  }, []);

  const getTimelineSteps = () => {
    const baseSteps = [
      {
        id: "reported",
        label: "Issue Reported",
        description: "Complaint registered in the system",
        timestamp: "Feb 5, 2026 at 10:30 AM",
        status: "completed" as const
      },
      {
        id: "routed",
        label: "Routed to Department",
        description: "Forwarded to Public Works Department",
        timestamp: "Feb 5, 2026 at 10:45 AM",
        status: "completed" as const
      },
      {
        id: "verified",
        label: "Verified on Ground",
        description: "Youth volunteer confirmed the issue",
        timestamp: "Feb 6, 2026 at 11:00 AM",
        status: "completed" as const
      },
      {
        id: "progress",
        label: "Work in Progress",
        description: "Repair team dispatched",
        timestamp: "Feb 7, 2026 at 2:00 PM",
        status: issue?.status === "in_progress" ? "active" as const : "completed" as const
      },
      {
        id: "resolved",
        label: "Issue Resolved",
        description: "Awaiting completion",
        status: issue?.status === "resolved" ? "completed" as const : "pending" as const
      }
    ];
    
    return baseSteps;
  };

  const getStatusBadge = () => {
    switch (issue?.status) {
      case "pending":
        return <span className="badge-pending">Pending Review</span>;
      case "in_progress":
        return <span className="badge-progress">In Progress</span>;
      case "resolved":
        return <span className="badge-resolved">Resolved</span>;
      default:
        return null;
    }
  };

  return (
    <Layout>
      <div className="section-container">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Track Your Issue</h1>
            <p className="text-xl text-muted-foreground">
              Enter your tracking ID to see the current status of your complaint
            </p>
          </div>

          {/* Search Form */}
          <form onSubmit={handleSearch} className="mb-12">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <label htmlFor="tracking-id" className="sr-only">
                  Tracking ID
                </label>
                <input
                  id="tracking-id"
                  type="text"
                  value={trackingId}
                  onChange={(e) => setTrackingId(e.target.value.toUpperCase())}
                  placeholder="Enter Tracking ID (e.g., JS12345678)"
                  className="input-accessible text-xl font-mono"
                  aria-describedby={error ? "search-error" : undefined}
                />
              </div>
              <Button
                type="submit"
                disabled={isLoading}
                className="btn-primary text-xl"
              >
                {isLoading ? (
                  <>
                    <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Searching...
                  </>
                ) : (
                  <>
                    <Search className="w-6 h-6" />
                    Track Issue
                  </>
                )}
              </Button>
            </div>
            
            {error && (
              <p id="search-error" className="mt-4 text-destructive text-lg" role="alert">
                {error}
              </p>
            )}
          </form>

          {/* Issue Details */}
          {issue && (
            <div className="space-y-8 animate-fade-up">
              {/* Status Card */}
              <div className="card-accessible">
                <div className="flex flex-col md:flex-row justify-between gap-6">
                  <div className="space-y-3">
                    <div className="flex items-center gap-4">
                      {getStatusBadge()}
                      <span className="text-muted-foreground font-mono">ID: {issue.id}</span>
                    </div>
                    <h2 className="text-2xl font-bold">{issue.title}</h2>
                    <p className="text-muted-foreground text-lg">{issue.description}</p>
                  </div>
                  <div className="flex gap-3">
                    <Button
                      variant="outline"
                      className="btn-accessible border-2"
                      onClick={() => {
                        if (navigator.share) {
                          navigator.share({
                            title: `JANSEVA Issue: ${issue.id}`,
                            text: issue.title,
                            url: window.location.href
                          });
                        }
                      }}
                    >
                      <Share2 className="w-5 h-5" />
                      Share
                    </Button>
                  </div>
                </div>
              </div>

              {/* Details Grid */}
              <div className="grid md:grid-cols-2 gap-6">
                <div className="card-accessible space-y-4">
                  <h3 className="text-xl font-bold">Issue Details</h3>
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <MapPin className="w-6 h-6 text-primary mt-1" />
                      <div>
                        <p className="font-semibold">Location</p>
                        <p className="text-muted-foreground">{issue.location}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Calendar className="w-6 h-6 text-primary mt-1" />
                      <div>
                        <p className="font-semibold">Reported On</p>
                        <p className="text-muted-foreground">{issue.reportedDate}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Clock className="w-6 h-6 text-primary mt-1" />
                      <div>
                        <p className="font-semibold">Expected Resolution</p>
                        <p className="text-muted-foreground">{issue.estimatedResolution}</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="card-accessible space-y-4">
                  <h3 className="text-xl font-bold">Assignment</h3>
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <Building2 className="w-6 h-6 text-primary mt-1" />
                      <div>
                        <p className="font-semibold">Department</p>
                        <p className="text-muted-foreground">{issue.assignedDepartment}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <User className="w-6 h-6 text-primary mt-1" />
                      <div>
                        <p className="font-semibold">Assigned Officer</p>
                        <p className="text-muted-foreground">{issue.assignedOfficer}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Photos */}
              {issue.photos.length > 0 && (
                <div className="card-accessible space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xl font-bold flex items-center gap-2">
                      <ImageIcon className="w-6 h-6" />
                      Photos
                    </h3>
                    <Button variant="ghost" className="text-primary">
                      <Plus className="w-5 h-5 mr-2" />
                      Add More Photos
                    </Button>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {issue.photos.map((photo, index) => (
                      <img
                        key={index}
                        src={photo}
                        alt={`Issue photo ${index + 1}`}
                        className="w-full h-32 object-cover rounded-xl"
                      />
                    ))}
                  </div>
                </div>
              )}

              {/* Progress Timeline */}
              <div className="card-accessible space-y-6">
                <h3 className="text-xl font-bold">Progress Timeline</h3>
                <ProgressTimeline steps={getTimelineSteps()} />
              </div>

              {/* Updates */}
              <div className="card-accessible space-y-6">
                <h3 className="text-xl font-bold">Updates</h3>
                <div className="space-y-4">
                  {issue.updates.map((update, index) => (
                    <div 
                      key={index}
                      className="p-4 bg-muted rounded-xl space-y-2"
                    >
                      <div className="flex justify-between items-start gap-4">
                        <p className="font-semibold">{update.by}</p>
                        <p className="text-sm text-muted-foreground">{update.date}</p>
                      </div>
                      <p className="text-muted-foreground">{update.message}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Empty State */}
          {!issue && !isLoading && !error && (
            <div className="text-center py-16 space-y-4">
              <Search className="w-16 h-16 mx-auto text-muted-foreground" />
              <p className="text-xl text-muted-foreground">
                Enter your tracking ID above to see issue status
              </p>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default TrackIssue;
