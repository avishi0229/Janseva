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
  Image as ImageIcon,
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

  const mockIssue: IssueDetails = {
    id: "JS12345678",
    title: "Large pothole on MG Road near City Mall",
    description:
      "There is a large pothole on MG Road near City Mall causing traffic issues.",
    category: "Roads",
    location: "MG Road, Ward 15",
    reportedDate: "Feb 5, 2026 at 10:30 AM",
    status: "in_progress",
    assignedDepartment: "Public Works Department",
    assignedOfficer: "Mr. Ramesh Kumar",
    estimatedResolution: "Feb 10, 2026",
    photos: [],
    updates: [
      {
        date: "Feb 7, 2026",
        message: "Repair team dispatched.",
        by: "PWD Office",
      },
    ],
  };

  const handleSearch = async (e?: React.FormEvent) => {
    e?.preventDefault();

    if (!trackingId.trim()) {
      setError("Please enter a tracking ID");
      return;
    }

    setIsLoading(true);
    setError(null);
    await new Promise((r) => setTimeout(r, 1000));

    if (trackingId.toUpperCase().startsWith("JS")) {
      setIssue({ ...mockIssue, id: trackingId.toUpperCase() });
      setSearchParams({ id: trackingId.toUpperCase() });
    } else {
      setError("No issue found with this tracking ID.");
      setIssue(null);
    }

    setIsLoading(false);
  };

  useEffect(() => {
    if (searchParams.get("id")) handleSearch();
  }, []);

  return (
    <Layout>
      <div className="section-container max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">
            Track Your Issue
          </h1>
          <p className="text-base text-muted-foreground">
            Enter your tracking ID to view status
          </p>
        </div>

        {/* Search */}
        <form onSubmit={handleSearch} className="mb-10">
          <div className="flex flex-col sm:flex-row gap-3">
            <input
              value={trackingId}
              onChange={(e) => setTrackingId(e.target.value.toUpperCase())}
              placeholder="Tracking ID (JS12345678)"
              className="input-accessible text-base font-mono"
            />
            <Button disabled={isLoading} className="text-base">
              {isLoading ? "Searching..." : (
                <>
                  <Search className="w-5 h-5" />
                  Track
                </>
              )}
            </Button>
          </div>
          {error && (
            <p className="mt-3 text-sm text-destructive">{error}</p>
          )}
        </form>

        {/* Issue */}
        {issue && (
          <div className="space-y-6">
            <div className="card-accessible">
              <span className="text-xs font-mono text-muted-foreground">
                ID: {issue.id}
              </span>
              <h2 className="text-xl font-semibold mt-2">{issue.title}</h2>
              <p className="text-sm text-muted-foreground mt-1">
                {issue.description}
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="card-accessible space-y-3">
                <h3 className="text-lg font-semibold">Issue Details</h3>
                <p className="text-sm flex items-center gap-2">
                  <MapPin className="w-5 h-5" />
                  {issue.location}
                </p>
                <p className="text-sm flex items-center gap-2">
                  <Calendar className="w-5 h-5" />
                  {issue.reportedDate}
                </p>
                <p className="text-sm flex items-center gap-2">
                  <Clock className="w-5 h-5" />
                  {issue.estimatedResolution}
                </p>
              </div>

              <div className="card-accessible space-y-3">
                <h3 className="text-lg font-semibold">Assignment</h3>
                <p className="text-sm flex items-center gap-2">
                  <Building2 className="w-5 h-5" />
                  {issue.assignedDepartment}
                </p>
                <p className="text-sm flex items-center gap-2">
                  <User className="w-5 h-5" />
                  {issue.assignedOfficer}
                </p>
              </div>
            </div>

            <div className="card-accessible">
              <h3 className="text-lg font-semibold mb-3">Progress</h3>
              <ProgressTimeline
                steps={[
                  { id: "r", label: "Reported", status: "completed" },
                  { id: "p", label: "In Progress", status: "active" },
                  { id: "d", label: "Resolved", status: "pending" },
                ]}
              />
            </div>

            <div className="card-accessible">
              <h3 className="text-lg font-semibold mb-3">Updates</h3>
              {issue.updates.map((u, i) => (
                <div key={i} className="bg-muted p-3 rounded-lg mb-2">
                  <p className="text-sm font-medium">{u.by}</p>
                  <p className="text-xs text-muted-foreground">{u.date}</p>
                  <p className="text-sm">{u.message}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {!issue && !isLoading && !error && (
          <div className="text-center py-12">
            <Search className="w-12 h-12 mx-auto text-muted-foreground" />
            <p className="text-base text-muted-foreground mt-3">
              Enter tracking ID to begin
            </p>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default TrackIssue;
