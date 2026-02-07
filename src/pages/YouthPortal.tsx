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
  UserPlus
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Layout from "@/components/layout/Layout";
import StatCard from "@/components/ui/StatCard";

const YouthPortal = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showSignup, setShowSignup] = useState(false);

  const stats = [
    { title: "Active Volunteers", value: 856, icon: Users, color: "primary" as const },
    { title: "Issues Verified", value: 2340, icon: CheckCircle2, color: "success" as const },
    { title: "Community Hours", value: 15420, icon: Clock, color: "info" as const },
    { title: "Wards Covered", value: 50, icon: MapPin, color: "warning" as const },
  ];

  const leaderboard = [
    { rank: 1, name: "Priya Sharma", points: 2450, verifications: 124, badge: "🏆 Gold Champion" },
    { rank: 2, name: "Rahul Verma", points: 2180, verifications: 108, badge: "🥈 Silver Star" },
    { rank: 3, name: "Ananya Patel", points: 1950, verifications: 97, badge: "🥉 Bronze Hero" },
    { rank: 4, name: "Vikram Singh", points: 1720, verifications: 86, badge: "⭐ Rising Star" },
    { rank: 5, name: "Sneha Reddy", points: 1580, verifications: 79, badge: "⭐ Rising Star" },
  ];

  const badges = [
    { name: "First Verification", icon: "🎯", description: "Complete your first issue verification" },
    { name: "Community Hero", icon: "🦸", description: "Verify 25 issues in your ward" },
    { name: "Speed Demon", icon: "⚡", description: "Verify 5 issues in a single day" },
    { name: "Photo Pro", icon: "📸", description: "Upload 50 high-quality verification photos" },
    { name: "Ward Champion", icon: "🏆", description: "Top verifier in your ward for a month" },
    { name: "Mentor", icon: "🎓", description: "Help 5 new volunteers get started" },
  ];

  const pendingTasks = [
    {
      id: "V001",
      issue: "Pothole on Station Road",
      location: "Ward 3, Near Railway Station",
      reported: "2 hours ago",
      priority: "high",
      distance: "0.5 km away"
    },
    {
      id: "V002",
      issue: "Broken street light",
      location: "Ward 3, Gandhi Chowk",
      reported: "4 hours ago",
      priority: "medium",
      distance: "1.2 km away"
    },
    {
      id: "V003",
      issue: "Garbage pile up",
      location: "Ward 3, Market Area",
      reported: "6 hours ago",
      priority: "high",
      distance: "0.8 km away"
    },
  ];

  // Login/Signup View
  if (!isLoggedIn) {
    return (
      <Layout>
        <div className="section-container">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-secondary/20 text-secondary rounded-full px-6 py-3 text-lg font-semibold mb-6">
              <Award className="w-6 h-6" />
              Youth Civic Squad
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Be the Change Your Community Needs
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Join hundreds of young volunteers who are making their cities better. 
              Verify issues, earn recognition, and create real impact in your community.
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {stats.map((stat) => (
              <StatCard key={stat.title} {...stat} />
            ))}
          </div>

          {/* Login/Signup Cards */}
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-16">
            {/* Login */}
            <div className="card-accessible space-y-6">
              <div className="flex items-center gap-3">
                <LogIn className="w-8 h-8 text-primary" />
                <h2 className="text-2xl font-bold">Existing Volunteer</h2>
              </div>
              <p className="text-muted-foreground text-lg">
                Already part of the squad? Log in to view your tasks and continue making a difference.
              </p>
              <div className="space-y-4">
                <input
                  type="email"
                  placeholder="Email address"
                  className="input-accessible"
                />
                <input
                  type="password"
                  placeholder="Password"
                  className="input-accessible"
                />
                <Button 
                  onClick={() => setIsLoggedIn(true)}
                  className="btn-primary w-full"
                >
                  <LogIn className="w-5 h-5" />
                  Log In
                </Button>
              </div>
            </div>

            {/* Signup */}
            <div className="card-highlight space-y-6">
              <div className="flex items-center gap-3">
                <UserPlus className="w-8 h-8 text-secondary" />
                <h2 className="text-2xl font-bold">Join the Squad</h2>
              </div>
              <p className="text-muted-foreground text-lg">
                New here? Sign up to become a Youth Civic Squad volunteer and start making an impact today.
              </p>
              <div className="space-y-4">
                <input
                  type="text"
                  placeholder="Full name"
                  className="input-accessible"
                />
                <input
                  type="email"
                  placeholder="Email address"
                  className="input-accessible"
                />
                <input
                  type="tel"
                  placeholder="Phone number"
                  className="input-accessible"
                />
                <select className="input-accessible">
                  <option value="">Select your ward</option>
                  {[1, 2, 3, 4, 5, 6].map((w) => (
                    <option key={w} value={w}>Ward {w}</option>
                  ))}
                </select>
                <Button 
                  onClick={() => setIsLoggedIn(true)}
                  className="btn-secondary w-full"
                >
                  <UserPlus className="w-5 h-5" />
                  Sign Up Now
                </Button>
              </div>
            </div>
          </div>

          {/* What You Get */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-center mb-8">What You Get</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="card-accessible text-center space-y-4">
                <Trophy className="w-12 h-12 mx-auto text-secondary" />
                <h3 className="text-xl font-bold">Recognition</h3>
                <p className="text-muted-foreground">
                  Earn badges, climb the leaderboard, and get certificates for your contributions.
                </p>
              </div>
              <div className="card-accessible text-center space-y-4">
                <Star className="w-12 h-12 mx-auto text-secondary" />
                <h3 className="text-xl font-bold">Experience</h3>
                <p className="text-muted-foreground">
                  Build your resume with real community service experience and leadership skills.
                </p>
              </div>
              <div className="card-accessible text-center space-y-4">
                <Users className="w-12 h-12 mx-auto text-secondary" />
                <h3 className="text-xl font-bold">Community</h3>
                <p className="text-muted-foreground">
                  Connect with like-minded youth and make lasting friendships while serving.
                </p>
              </div>
            </div>
          </div>

          {/* Badges */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-center mb-8">Badges You Can Earn</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {badges.map((badge) => (
                <div key={badge.name} className="card-accessible text-center space-y-2 p-4">
                  <span className="text-4xl">{badge.icon}</span>
                  <p className="font-semibold text-sm">{badge.name}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Leaderboard Preview */}
          <div className="card-accessible max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <Trophy className="w-7 h-7 text-secondary" />
              This Month's Leaders
            </h2>
            <div className="space-y-4">
              {leaderboard.slice(0, 3).map((user) => (
                <div 
                  key={user.rank}
                  className="flex items-center gap-4 p-4 bg-muted rounded-xl"
                >
                  <div className={`
                    w-12 h-12 rounded-full flex items-center justify-center font-bold text-xl
                    ${user.rank === 1 ? "bg-secondary text-secondary-foreground" : "bg-muted-foreground/20"}
                  `}>
                    {user.rank}
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-lg">{user.name}</p>
                    <p className="text-sm text-muted-foreground">{user.badge}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-xl">{user.points}</p>
                    <p className="text-sm text-muted-foreground">points</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  // Logged In Dashboard
  return (
    <Layout>
      <div className="section-container">
        {/* Welcome Header */}
        <div className="flex flex-col md:flex-row justify-between gap-6 mb-8">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold mb-2">Welcome back, Volunteer!</h1>
            <p className="text-xl text-muted-foreground">
              You've verified 45 issues this month. Keep up the great work!
            </p>
          </div>
          <div className="flex items-center gap-4">
            <div className="card-accessible py-3 px-6 text-center">
              <p className="text-3xl font-bold text-primary">1,250</p>
              <p className="text-sm text-muted-foreground">Your Points</p>
            </div>
            <div className="card-accessible py-3 px-6 text-center">
              <p className="text-3xl font-bold text-success">#12</p>
              <p className="text-sm text-muted-foreground">Your Rank</p>
            </div>
          </div>
        </div>

        {/* Your Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard title="Verifications" value={45} icon={CheckCircle2} color="success" />
          <StatCard title="Hours Contributed" value={28} icon={Clock} color="info" />
          <StatCard title="Badges Earned" value={4} icon={Award} color="warning" />
          <StatCard title="Ward Rank" value={3} prefix="#" icon={Trophy} color="primary" />
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Pending Tasks */}
          <div className="lg:col-span-2 space-y-6">
            <h2 className="text-2xl font-bold flex items-center gap-2">
              <MapPin className="w-7 h-7 text-primary" />
              Tasks Near You
            </h2>
            <div className="space-y-4">
              {pendingTasks.map((task) => (
                <div key={task.id} className="card-interactive">
                  <div className="flex flex-col md:flex-row gap-4 justify-between">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <span className={`
                          px-3 py-1 rounded-full text-sm font-semibold
                          ${task.priority === "high" ? "bg-destructive-light text-destructive" : "bg-warning-light text-warning-foreground"}
                        `}>
                          {task.priority === "high" ? "High Priority" : "Medium"}
                        </span>
                        <span className="text-sm text-muted-foreground">{task.reported}</span>
                      </div>
                      <h3 className="text-xl font-semibold">{task.issue}</h3>
                      <p className="text-muted-foreground flex items-center gap-2">
                        <MapPin className="w-5 h-5" />
                        {task.location}
                      </p>
                      <p className="text-sm text-primary font-medium">{task.distance}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <Button className="btn-primary">
                        <Camera className="w-5 h-5" />
                        Verify Now
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <Button variant="outline" className="btn-accessible border-2 w-full">
              View All Tasks
              <ArrowRight className="w-5 h-5" />
            </Button>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Your Badges */}
            <div className="card-accessible">
              <h3 className="text-xl font-bold mb-4">Your Badges</h3>
              <div className="grid grid-cols-4 gap-2">
                {badges.slice(0, 4).map((badge) => (
                  <div 
                    key={badge.name} 
                    className="aspect-square rounded-xl bg-muted flex items-center justify-center text-2xl"
                    title={badge.name}
                  >
                    {badge.icon}
                  </div>
                ))}
              </div>
              <Button variant="ghost" className="w-full mt-4 text-primary">
                View All Badges
              </Button>
            </div>

            {/* Leaderboard */}
            <div className="card-accessible">
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                <Trophy className="w-6 h-6 text-secondary" />
                Leaderboard
              </h3>
              <div className="space-y-3">
                {leaderboard.map((user) => (
                  <div 
                    key={user.rank}
                    className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted transition-colors"
                  >
                    <span className="w-6 text-center font-bold">{user.rank}</span>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium truncate">{user.name}</p>
                    </div>
                    <span className="font-bold">{user.points}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default YouthPortal;
