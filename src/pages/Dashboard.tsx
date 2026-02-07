import { useState } from "react";
import { 
  BarChart3, 
  PieChart, 
  TrendingUp, 
  Clock, 
  CheckCircle2, 
  AlertTriangle,
  MapPin,
  Filter,
  Calendar
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Layout from "@/components/layout/Layout";
import StatCard from "@/components/ui/StatCard";
import IssueCard from "@/components/ui/IssueCard";
import { PieChart as RechartsPieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from "recharts";

const Dashboard = () => {
  const [selectedWard, setSelectedWard] = useState<string>("all");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedPeriod, setSelectedPeriod] = useState<string>("month");

  const stats = [
    { title: "Total Issues", value: 12547, icon: BarChart3, color: "primary" as const, trend: { value: 12, isPositive: true } },
    { title: "Resolved", value: 10892, icon: CheckCircle2, color: "success" as const, trend: { value: 8, isPositive: true } },
    { title: "In Progress", value: 1423, icon: Clock, color: "info" as const },
    { title: "Pending", value: 232, icon: AlertTriangle, color: "warning" as const, trend: { value: 5, isPositive: false } },
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
    { ward: "Ward 1", resolved: 450, pending: 20, rate: 95 },
    { ward: "Ward 2", resolved: 380, pending: 45, rate: 89 },
    { ward: "Ward 3", resolved: 520, pending: 30, rate: 94 },
    { ward: "Ward 4", resolved: 290, pending: 60, rate: 83 },
    { ward: "Ward 5", resolved: 410, pending: 25, rate: 94 },
    { ward: "Ward 6", resolved: 350, pending: 55, rate: 86 },
  ];

  const recentResolutions = [
    {
      id: "JS12345678",
      title: "Pothole repaired on MG Road",
      category: "Roads",
      location: "MG Road, Ward 3",
      date: "Feb 7, 2026",
      status: "resolved" as const,
      estimatedTime: "Resolved in 2 days"
    },
    {
      id: "JS12345679",
      title: "Water pipeline leak fixed",
      category: "Water",
      location: "Gandhi Nagar, Ward 5",
      date: "Feb 7, 2026",
      status: "resolved" as const,
      estimatedTime: "Resolved in 1 day"
    },
    {
      id: "JS12345680",
      title: "Street light installation completed",
      category: "Street Lights",
      location: "Nehru Park, Ward 2",
      date: "Feb 6, 2026",
      status: "resolved" as const,
      estimatedTime: "Resolved in 3 days"
    },
  ];

  const topPerformers = [
    { name: "PWD Ward 3 Team", resolved: 520, rating: 4.8 },
    { name: "Water Board Ward 5", resolved: 410, rating: 4.7 },
    { name: "Sanitation Dept Ward 1", resolved: 380, rating: 4.6 },
    { name: "Electricity Dept Ward 2", resolved: 350, rating: 4.5 },
    { name: "PWD Ward 6 Team", resolved: 320, rating: 4.4 },
  ];

  return (
    <Layout>
      {/* Header */}
      <section className="bg-muted/50 py-8">
        <div className="section-container py-0">
          <div className="flex flex-col md:flex-row justify-between gap-6">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold mb-2">Public Dashboard</h1>
              <p className="text-xl text-muted-foreground">
                Real-time civic issue resolution data
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <select
                value={selectedWard}
                onChange={(e) => setSelectedWard(e.target.value)}
                className="input-accessible py-3 px-4 w-auto"
                aria-label="Filter by ward"
              >
                <option value="all">All Wards</option>
                {[1, 2, 3, 4, 5, 6].map((w) => (
                  <option key={w} value={`ward${w}`}>Ward {w}</option>
                ))}
              </select>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="input-accessible py-3 px-4 w-auto"
                aria-label="Filter by category"
              >
                <option value="all">All Categories</option>
                <option value="roads">Roads</option>
                <option value="water">Water</option>
                <option value="sanitation">Sanitation</option>
                <option value="electricity">Electricity</option>
              </select>
              <select
                value={selectedPeriod}
                onChange={(e) => setSelectedPeriod(e.target.value)}
                className="input-accessible py-3 px-4 w-auto"
                aria-label="Filter by time period"
              >
                <option value="week">This Week</option>
                <option value="month">This Month</option>
                <option value="quarter">This Quarter</option>
                <option value="year">This Year</option>
              </select>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="section-container py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat) => (
            <StatCard key={stat.title} {...stat} />
          ))}
        </div>
      </section>

      {/* Charts Row */}
      <section className="section-container py-8">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Category Distribution */}
          <div className="card-accessible">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <PieChart className="w-7 h-7 text-primary" />
              Issues by Category
            </h2>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <RechartsPieChart>
                  <Pie
                    data={categoryData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={5}
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {categoryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </RechartsPieChart>
              </ResponsiveContainer>
            </div>
            <div className="flex flex-wrap gap-4 mt-4 justify-center">
              {categoryData.map((cat) => (
                <div key={cat.name} className="flex items-center gap-2">
                  <div 
                    className="w-4 h-4 rounded-full" 
                    style={{ backgroundColor: cat.color }}
                  />
                  <span className="text-sm">{cat.name}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Ward Performance */}
          <div className="card-accessible">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <BarChart3 className="w-7 h-7 text-primary" />
              Ward Performance
            </h2>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={wardPerformance}>
                  <XAxis dataKey="ward" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="resolved" name="Resolved" fill="hsl(160, 84%, 39%)" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="pending" name="Pending" fill="hsl(38, 92%, 50%)" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </section>

      {/* Resolution Rate & Top Performers */}
      <section className="section-container py-8">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Average Resolution Time */}
          <div className="card-accessible">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <Clock className="w-7 h-7 text-primary" />
              Average Resolution Time
            </h2>
            <div className="grid grid-cols-2 gap-6">
              <div className="text-center p-6 bg-success-light rounded-2xl">
                <p className="text-5xl font-bold text-success">3.2</p>
                <p className="text-muted-foreground mt-2">Days Average</p>
              </div>
              <div className="text-center p-6 bg-info-light rounded-2xl">
                <p className="text-5xl font-bold text-info">87%</p>
                <p className="text-muted-foreground mt-2">Resolution Rate</p>
              </div>
              <div className="text-center p-6 bg-accent rounded-2xl">
                <p className="text-5xl font-bold text-primary">24h</p>
                <p className="text-muted-foreground mt-2">Emergency Response</p>
              </div>
              <div className="text-center p-6 bg-warning-light rounded-2xl">
                <p className="text-5xl font-bold text-warning-foreground">15</p>
                <p className="text-muted-foreground mt-2">Escalations Today</p>
              </div>
            </div>
          </div>

          {/* Top Performers */}
          <div className="card-accessible">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <TrendingUp className="w-7 h-7 text-primary" />
              Top Performing Teams
            </h2>
            <div className="space-y-4">
              {topPerformers.map((team, index) => (
                <div 
                  key={team.name}
                  className="flex items-center gap-4 p-4 bg-muted rounded-xl"
                >
                  <div className="w-10 h-10 rounded-full hero-gradient text-primary-foreground flex items-center justify-center font-bold">
                    {index + 1}
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold">{team.name}</p>
                    <p className="text-sm text-muted-foreground">{team.resolved} issues resolved</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-success">★ {team.rating}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Recent Resolutions */}
      <section className="section-container py-8">
        <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
          <CheckCircle2 className="w-7 h-7 text-success" />
          Recent Resolutions
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {recentResolutions.map((issue) => (
            <IssueCard key={issue.id} issue={issue} />
          ))}
        </div>
      </section>

      {/* Ward Map Placeholder */}
      <section className="section-container py-8">
        <div className="card-accessible">
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
            <MapPin className="w-7 h-7 text-primary" />
            Ward-wise Issue Distribution
          </h2>
          <div className="h-96 bg-muted rounded-2xl flex items-center justify-center">
            <div className="text-center space-y-4">
              <MapPin className="w-16 h-16 mx-auto text-muted-foreground" />
              <p className="text-xl text-muted-foreground">
                Interactive ward map coming soon
              </p>
              <p className="text-muted-foreground">
                View issue density and resolution rates by ward
              </p>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Dashboard;
