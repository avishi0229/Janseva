import { useEffect, useState, useRef } from "react";
import { LucideIcon } from "lucide-react";

interface StatCardProps {
  title: string;
  value: number;
  suffix?: string;
  prefix?: string;
  icon: LucideIcon;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  color?: "primary" | "success" | "warning" | "info";
}

const StatCard = ({ 
  title, 
  value, 
  suffix = "", 
  prefix = "",
  icon: Icon, 
  trend,
  color = "primary"
}: StatCardProps) => {
  const [displayValue, setDisplayValue] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    const duration = 1500;
    const steps = 60;
    const stepValue = value / steps;
    let current = 0;

    const timer = setInterval(() => {
      current += stepValue;
      if (current >= value) {
        setDisplayValue(value);
        clearInterval(timer);
      } else {
        setDisplayValue(Math.floor(current));
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [isVisible, value]);

  const colorClasses = {
    primary: "bg-primary text-primary-foreground",
    success: "bg-success text-success-foreground",
    warning: "bg-warning text-warning-foreground",
    info: "bg-info text-info-foreground"
  };

  const bgClasses = {
    primary: "bg-accent",
    success: "bg-success-light",
    warning: "bg-warning-light",
    info: "bg-info-light"
  };

  return (
    <div 
      ref={cardRef}
      className={`card-accessible ${bgClasses[color]} border-none`}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="space-y-2">
          <p className="text-muted-foreground font-medium">{title}</p>
          <p className="text-4xl font-bold text-foreground">
            {prefix}
            <span className="tabular-nums">{displayValue.toLocaleString()}</span>
            {suffix}
          </p>
          {trend && (
            <p className={`text-sm font-medium flex items-center gap-1
              ${trend.isPositive ? "text-success" : "text-destructive"}
            `}>
              <span>{trend.isPositive ? "↑" : "↓"}</span>
              <span>{trend.value}%</span>
              <span className="text-muted-foreground">vs last month</span>
            </p>
          )}
        </div>
        <div className={`p-4 rounded-2xl ${colorClasses[color]}`}>
          <Icon className="w-8 h-8" />
        </div>
      </div>
    </div>
  );
};

export default StatCard;
