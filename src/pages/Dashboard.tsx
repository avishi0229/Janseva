import { useState } from "react";
import {
  BarChart3,
  PieChart,
  TrendingUp,
  Clock,
  CheckCircle2,
  AlertTriangle,
  MapPin,
} from "lucide-react";
import Layout from "@/components/layout/Layout";
import StatCard from "@/components/ui/StatCard";
import IssueCard from "@/components/ui/IssueCard";
import {
  PieChart as RechartsPieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
} from "recharts";

const Dashboard = () => {
  const [selectedWard, setSelectedWard] = useState("all");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedPeriod, setSelectedPeriod] = useState("month");

  const stats = [
    { title: "Total Issues", value: 12547, icon: BarChart3, color: "primary" as const },
    { title: "Resolved", value: 10892, icon: CheckCircle2, color: "success" as const },
    { title: "In Progress", value: 1423, icon: Clock, color: "info" as const },
    { title: "Pending", value: 232, icon: AlertTriangle, color: "warning" as const },
  ];

  const categoryData = [
    { name: "Roads", value: 3500, color: "hsl(217, 91%, 60%)" },
    { name: "Water", value: 2800, color: "hsl(199, 89%, 48%)" },
    { name: "Sanitation", value: 2200, color: "hsl(160, 84%, 39%)" },
    { name: "Electricity", value: 1800, color: "hsl(38, 92%, 50%)" },
    { name: "Street Lights", value: 1200, color: "hsl(280, 67%, 50%)" },
    { name: "Others", value: 1047, color: "hsl(220, 10%, 50%)" },
  ];

  const wardPerformance = [
    { ward: "Ward 1", resolved: 450, pending: 20 },
    { ward: "Ward 2", resolved: 380, pending: 45 },
    { ward: "Ward 3", resolved: 520, pending: 30 },
    { ward: "Ward 4", resolved: 290, pending: 60 },
    { ward: "Ward 5", resolved: 410, pending: 25 },
    { ward: "Ward 6", resolved: 350, pending: 55 },
  ];

  const recentResolutions = [
    {
      id: "JS12345678",
      title: "Pothole repaired on MG Road",
      category: "Roads",
      location: "MG Road, Ward 3",
      date: "Feb 7, 2026",
      status: "resolved" as const,
      estimatedTime: "Resolved in 2 days",
    },
    {
      id: "JS12345679",
      title: "Water pipeline leak fixed",
      category: "Water",
      location: "Gandhi Nagar, Ward 5",
      date: "Feb 7, 2026",
      status: "resolved" as const,
      estimatedTime: "Resolved in 1 day",
    },
  ];

  const topPerformers = [
    { name: "PWD Ward 3 Team", resolved: 520, rating: 4.8 },
    { name: "Water Board Ward 5", resolved: 410, rating: 4.7 },
    { name: "Sanitation Dept Ward 1", resolved: 380, rating: 4.6 },
  ];

  return (
    <Layout>
      {/* Header */}
      <section className="bg-muted/50 py-6">
        <div className="section-container">
          <h1 className="text-3xl md:text-4xl font-bold mb-1">
            Public Dashboard
          </h1>
          <p className="text-base text-muted-foreground">
            Real-time civic issue resolution data
          </p>
        </div>
      </section>

      {/* Stats */}
      <section className="section-container py-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat) => (
            <StatCard key={stat.title} {...stat} />
          ))}
        </div>
      </section>

      {/* Charts */}
      <section className="section-container py-6">
        <div className="grid lg:grid-cols-2 gap-6">
          <div className="card-accessible">
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <PieChart className="w-6 h-6 text-primary" />
              Issues by Category
            </h2>
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <RechartsPieChart>
                  <Pie data={categoryData} dataKey="value" outerRadius={90}>
                    {categoryData.map((e, i) => (
                      <Cell key={i} fill={e.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </RechartsPieChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="card-accessible">
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <BarChart3 className="w-6 h-6 text-primary" />
              Ward Performance
            </h2>
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={wardPerformance}>
                  <XAxis dataKey="ward" fontSize={12} />
                  <YAxis fontSize={12} />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="resolved" fill="hsl(160, 84%, 39%)" />
                  <Bar dataKey="pending" fill="hsl(38, 92%, 50%)" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </section>

      {/* Top Performers */}
      <section className="section-container py-6">
        <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
          <TrendingUp className="w-6 h-6 text-primary" />
          Top Performing Teams
        </h2>
        <div className="space-y-3">
          {topPerformers.map((team, i) => (
            <div key={i} className="flex items-center p-3 bg-muted rounded-lg">
              <div className="w-8 h-8 rounded-full hero-gradient text-white flex items-center justify-center text-sm font-bold">
                {i + 1}
              </div>
              <div className="ml-3 flex-1">
                <p className="text-sm font-medium">{team.name}</p>
                <p className="text-xs text-muted-foreground">
                  {team.resolved} issues resolved
                </p>
              </div>
              <p className="text-sm font-semibold text-success">
                ★ {team.rating}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Recent Resolutions */}
      <section className="section-container py-6">
        <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
          <CheckCircle2 className="w-6 h-6 text-success" />
          Recent Resolutions
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {recentResolutions.map((issue) => (
            <IssueCard key={issue.id} issue={issue} />
          ))}
        </div>
      </section>

      {/* Map */}
      <section className="section-container py-6">
        <div className="card-accessible h-80 flex items-center justify-center text-center">
          <div>
            <MapPin className="w-12 h-12 mx-auto text-muted-foreground" />
            <p className="text-base text-muted-foreground mt-2">
              Interactive ward map coming soon
            </p>
            <p className="text-sm text-muted-foreground">
              View issue density by ward
            </p>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Dashboard;
