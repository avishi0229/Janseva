import { MapPin, Calendar, ArrowRight, Clock } from "lucide-react";
import { Link } from "react-router-dom";

interface Issue {
  id: string;
  title: string;
  category: string;
  location: string;
  date: string;
  status: "pending" | "in_progress" | "resolved" | "urgent";
  thumbnail?: string;
  estimatedTime?: string;
}

interface IssueCardProps {
  issue: Issue;
  showActions?: boolean;
}

const IssueCard = ({ issue, showActions = true }: IssueCardProps) => {
  const statusConfig = {
    pending: {
      label: "Pending",
      className: "badge-pending"
    },
    in_progress: {
      label: "In Progress",
      className: "badge-progress"
    },
    resolved: {
      label: "Resolved",
      className: "badge-resolved"
    },
    urgent: {
      label: "Urgent",
      className: "badge-urgent"
    }
  };

  const statusInfo = statusConfig[issue.status];

  return (
    <article className="card-interactive group">
      <div className="flex gap-4">
        {/* Thumbnail */}
        {issue.thumbnail && (
          <div className="flex-shrink-0">
            <img
              src={issue.thumbnail}
              alt=""
              className="w-24 h-24 object-cover rounded-xl"
            />
          </div>
        )}

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-3">
            <div className="space-y-1">
              <span className={statusInfo.className}>
                {statusInfo.label}
              </span>
              <h3 className="font-semibold text-xl mt-2 line-clamp-2">
                {issue.title}
              </h3>
            </div>
          </div>

          <div className="mt-3 space-y-2">
            <div className="flex items-center gap-2 text-muted-foreground">
              <MapPin className="w-5 h-5 flex-shrink-0" />
              <span className="truncate">{issue.location}</span>
            </div>
            <div className="flex items-center gap-4 text-muted-foreground">
              <div className="flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                <span>{issue.date}</span>
              </div>
              {issue.estimatedTime && (
                <div className="flex items-center gap-2">
                  <Clock className="w-5 h-5" />
                  <span>{issue.estimatedTime}</span>
                </div>
              )}
            </div>
          </div>

          {showActions && (
            <Link
              to={`/track?id=${issue.id}`}
              className="inline-flex items-center gap-2 mt-4 text-primary font-semibold hover:gap-3 transition-all"
            >
              View Details
              <ArrowRight className="w-5 h-5" />
            </Link>
          )}
        </div>
      </div>
    </article>
  );
};

export default IssueCard;
