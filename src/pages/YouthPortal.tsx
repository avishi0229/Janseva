import { useState } from "react";
import {
  Users,
  Award,
  MapPin,
  Camera,
  CheckCircle2,
  Clock,
  Trophy,
  Star,
  ArrowRight,
  LogIn,
  UserPlus,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Layout from "@/components/layout/Layout";
import StatCard from "@/components/ui/StatCard";

const YouthPortal = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const stats = [
    { title: "Active Volunteers", value: 856, icon: Users, color: "primary" as const },
    { title: "Issues Verified", value: 2340, icon: CheckCircle2, color: "success" as const },
    { title: "Community Hours", value: 15420, icon: Clock, color: "info" as const },
    { title: "Wards Covered", value: 50, icon: MapPin, color: "warning" as const },
  ];

  const leaderboard = [
    { rank: 1, name: "Priya Sharma", points: 2450, badge: "🏆 Gold Champion" },
    { rank: 2, name: "Rahul Verma", points: 2180, badge: "🥈 Silver Star" },
    { rank: 3, name: "Ananya Patel", points: 1950, badge: "🥉 Bronze Hero" },
    { rank: 4, name: "Vikram Singh", points: 1720, badge: "⭐ Rising Star" },
    { rank: 5, name: "Sneha Reddy", points: 1580, badge: "⭐ Rising Star" },
  ];

  const badges = [
    { name: "First Verification", icon: "🎯" },
    { name: "Community Hero", icon: "🦸" },
    { name: "Speed Demon", icon: "⚡" },
    { name: "Photo Pro", icon: "📸" },
    { name: "Ward Champion", icon: "🏆" },
    { name: "Mentor", icon: "🎓" },
  ];

  const pendingTasks = [
    {
      id: "V001",
      issue: "Pothole on Station Road",
      location: "Ward 3, Near Railway Station",
      reported: "2 hours ago",
      priority: "high",
      distance: "0.5 km away",
    },
    {
      id: "V002",
      issue: "Broken street light",
      location: "Ward 3, Gandhi Chowk",
      reported: "4 hours ago",
      priority: "medium",
      distance: "1.2 km away",
    },
  ];

  if (!isLoggedIn) {
    return (
      <Layout>
        <div className="section-container">
          {/* Hero */}
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 bg-secondary/20 text-secondary rounded-full px-4 py-2 text-sm font-semibold mb-4">
              <Award className="w-5 h-5" />
              Youth Civic Squad
            </div>
            <h1 className="text-3xl md:text-4xl font-bold mb-3">
              Be the Change Your Community Needs
            </h1>
            <p className="text-base text-muted-foreground max-w-2xl mx-auto">
              Join young volunteers verifying civic issues and creating real impact.
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
            {stats.map((s) => (
              <StatCard key={s.title} {...s} />
            ))}
          </div>

          {/* Auth Cards */}
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto mb-12">
            <div className="card-accessible space-y-4">
              <div className="flex items-center gap-2">
                <LogIn className="w-6 h-6 text-primary" />
                <h2 className="text-xl font-semibold">Existing Volunteer</h2>
              </div>
              <p className="text-sm text-muted-foreground">
                Log in to continue your community work.
              </p>
              <input className="input-accessible" placeholder="Email" />
              <input className="input-accessible" placeholder="Password" />
              <Button onClick={() => setIsLoggedIn(true)} className="w-full">
                <LogIn className="w-4 h-4" />
                Log In
              </Button>
            </div>

            <div className="card-highlight space-y-4">
              <div className="flex items-center gap-2">
                <UserPlus className="w-6 h-6 text-secondary" />
                <h2 className="text-xl font-semibold">Join the Squad</h2>
              </div>
              <p className="text-sm text-muted-foreground">
                Sign up and start verifying issues today.
              </p>
              <input className="input-accessible" placeholder="Full Name" />
              <input className="input-accessible" placeholder="Email" />
              <input className="input-accessible" placeholder="Phone" />
              <Button onClick={() => setIsLoggedIn(true)} className="w-full">
                <UserPlus className="w-4 h-4" />
                Sign Up
              </Button>
            </div>
          </div>

          {/* Leaderboard */}
          <div className="card-accessible max-w-xl mx-auto">
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <Trophy className="w-6 h-6 text-secondary" />
              This Month’s Leaders
            </h2>
            {leaderboard.slice(0, 3).map((u) => (
              <div key={u.rank} className="flex items-center gap-3 p-3 bg-muted rounded-lg mb-2">
                <span className="w-8 h-8 rounded-full bg-secondary/20 flex items-center justify-center text-sm font-bold">
                  {u.rank}
                </span>
                <div className="flex-1">
                  <p className="text-sm font-medium">{u.name}</p>
                  <p className="text-xs text-muted-foreground">{u.badge}</p>
                </div>
                <span className="text-sm font-semibold">{u.points}</span>
              </div>
            ))}
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="section-container">
        <h1 className="text-2xl md:text-3xl font-bold mb-2">
          Welcome back, Volunteer!
        </h1>
        <p className="text-base text-muted-foreground mb-6">
          You’ve verified 45 issues this month.
        </p>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <StatCard title="Verifications" value={45} icon={CheckCircle2} color="success" />
          <StatCard title="Hours" value={28} icon={Clock} color="info" />
          <StatCard title="Badges" value={4} icon={Award} color="warning" />
          <StatCard title="Rank" value={3} prefix="#" icon={Trophy} color="primary" />
        </div>

        <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
          <MapPin className="w-6 h-6 text-primary" />
          Tasks Near You
        </h2>

        <div className="space-y-3">
          {pendingTasks.map((t) => (
            <div key={t.id} className="card-interactive p-4">
              <p className="text-sm font-semibold">{t.issue}</p>
              <p className="text-xs text-muted-foreground">{t.location}</p>
              <p className="text-xs text-primary">{t.distance}</p>
              <Button size="sm" className="mt-2">
                <Camera className="w-4 h-4" />
                Verify
              </Button>
            </div>
          ))}
        </div>

        <Button variant="outline" className="w-full mt-4">
          View All Tasks
          <ArrowRight className="w-4 h-4" />
        </Button>
      </div>
    </Layout>
  );
};

export default YouthPortal;
