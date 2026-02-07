import { Link } from "react-router-dom";
import { 
  Mic, 
  Search, 
  BarChart3, 
  Users, 
  Shield, 
  Clock, 
  CheckCircle2,
  ArrowRight,
  Phone,
  Accessibility,
  Zap,
  Eye,
  MessageCircle,
  Award
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Layout from "@/components/layout/Layout";
import StatCard from "@/components/ui/StatCard";

const Index = () => {
  const stats = [
    { title: "Issues Reported", value: 12547, icon: MessageCircle, color: "primary" as const },
    { title: "Issues Resolved", value: 10892, icon: CheckCircle2, color: "success" as const },
    { title: "Active Volunteers", value: 856, icon: Users, color: "info" as const },
    { title: "Avg. Resolution (Days)", value: 3, icon: Clock, color: "warning" as const },
  ];

  const features = [
    {
      icon: <Mic className="w-10 h-10" />,
      title: "Voice-First Reporting",
      description: "Simply tap and speak to report any issue. No typing needed. Perfect for seniors and those with visual impairments."
    },
    {
      icon: <Accessibility className="w-10 h-10" />,
      title: "Inclusive Design",
      description: "Large fonts, high contrast, screen reader support. Designed for elderly and differently-abled citizens."
    },
    {
      icon: <Zap className="w-10 h-10" />,
      title: "Smart AI Routing",
      description: "AI automatically categorizes and routes your complaint to the right department for faster resolution."
    },
    {
      icon: <Eye className="w-10 h-10" />,
      title: "Real-time Tracking",
      description: "Track your issue with a simple ID. Get SMS and app updates as your complaint progresses."
    },
    {
      icon: <Shield className="w-10 h-10" />,
      title: "Auto-Escalation",
      description: "Delayed issues are automatically escalated to senior officials, ensuring accountability."
    },
    {
      icon: <BarChart3 className="w-10 h-10" />,
      title: "Transparent Dashboard",
      description: "View real-time statistics, ward performance, and resolution rates on our public dashboard."
    }
  ];

  const steps = [
    { step: 1, title: "Report Issue", description: "Speak or type your complaint with location & photo" },
    { step: 2, title: "AI Processes", description: "Smart system categorizes and routes to right department" },
    { step: 3, title: "Authority Acts", description: "Assigned team resolves the issue on ground" },
    { step: 4, title: "You're Updated", description: "Receive status updates via SMS and app notification" },
  ];

  return (
    <Layout>
      {/* Hero Section */}
      <section className="hero-gradient text-primary-foreground py-16 md:py-24 lg:py-32">
        <div className="section-container">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-6 py-3 text-lg">
              <Accessibility className="w-6 h-6" />
              <span>Accessibility-First Civic Platform</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              Where Every Citizen's Voice Matters
            </h1>
            
            <p className="text-xl md:text-2xl opacity-90 max-w-3xl mx-auto">
              Report municipal issues with just your voice. Designed for elderly and 
              differently-abled citizens. Track progress in real-time.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Link to="/report">
                <Button className="btn-accessible bg-white text-primary hover:bg-white/90 text-xl px-10 py-6 h-auto shadow-xl">
                  <Mic className="w-7 h-7" />
                  Report Issue
                </Button>
              </Link>
              <Link to="/track">
                <Button className="btn-accessible bg-transparent border-2 border-white text-white hover:bg-white/10 text-xl px-10 py-6 h-auto">
                  <Search className="w-7 h-7" />
                  Track Issue
                </Button>
              </Link>
            </div>
            
            <div className="flex items-center justify-center gap-8 pt-8 text-lg opacity-80">
              <div className="flex items-center gap-2">
                <Phone className="w-5 h-5" />
                <span>Toll Free: 1800-XXX-XXXX</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-muted/50 -mt-8 relative z-10">
        <div className="section-container py-0">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat) => (
              <StatCard key={stat.title} {...stat} />
            ))}
          </div>
        </div>
      </section>

      {/* Problem Statement */}
      <section className="section-container">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <span className="inline-block px-4 py-2 bg-destructive-light text-destructive rounded-full font-semibold">
              The Problem
            </span>
            <h2 className="text-3xl md:text-4xl font-bold">
              Current Civic Apps Fail Our Elders & Differently-Abled Citizens
            </h2>
            <div className="space-y-4 text-lg text-muted-foreground">
              <p>
                <strong className="text-foreground">Small text, complex navigation, and confusing interfaces</strong> make 
                existing municipal complaint apps unusable for millions of elderly citizens.
              </p>
              <p>
                <strong className="text-foreground">No voice input, poor accessibility, and lack of feedback</strong> leave 
                differently-abled individuals without a voice in civic matters.
              </p>
              <p>
                <strong className="text-foreground">Opaque systems with no tracking</strong> mean citizens never know 
                if their complaints are heard or acted upon.
              </p>
            </div>
          </div>
          <div className="bg-destructive-light rounded-3xl p-8 space-y-6">
            <h3 className="text-2xl font-bold text-destructive">Citizens Face:</h3>
            <ul className="space-y-4">
              {[
                "Tiny fonts impossible to read",
                "Complex multi-step forms",
                "No voice input option",
                "No real-time status updates",
                "No accountability for delays",
                "Technical jargon & English-only interfaces"
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-3 text-lg">
                  <span className="w-3 h-3 rounded-full bg-destructive flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Solution Section */}
      <section className="bg-accent/30 py-16 md:py-24">
        <div className="section-container">
          <div className="section-header">
            <span className="inline-block px-4 py-2 bg-success-light text-success rounded-full font-semibold mb-4">
              The JANSEVA Solution
            </span>
            <h2 className="section-title">Built for Everyone. Powered by Technology.</h2>
            <p className="section-subtitle">
              Three pillars of inclusive civic engagement that put citizens first.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="card-accessible text-center space-y-4">
              <div className="w-20 h-20 mx-auto rounded-2xl bg-primary text-primary-foreground flex items-center justify-center">
                <Accessibility className="w-10 h-10" />
              </div>
              <h3 className="text-2xl font-bold">Inclusive Access</h3>
              <p className="text-muted-foreground text-lg">
                Voice input, one-tap reporting, senior-friendly UI with large fonts and high contrast.
              </p>
            </div>
            
            <div className="card-accessible text-center space-y-4">
              <div className="w-20 h-20 mx-auto rounded-2xl bg-secondary text-secondary-foreground flex items-center justify-center">
                <Zap className="w-10 h-10" />
              </div>
              <h3 className="text-2xl font-bold">Smart Processing</h3>
              <p className="text-muted-foreground text-lg">
                AI-powered routing, live tracking, and automatic escalation for delayed issues.
              </p>
            </div>
            
            <div className="card-accessible text-center space-y-4">
              <div className="w-20 h-20 mx-auto rounded-2xl bg-info text-info-foreground flex items-center justify-center">
                <Eye className="w-10 h-10" />
              </div>
              <h3 className="text-2xl font-bold">Full Transparency</h3>
              <p className="text-muted-foreground text-lg">
                Public dashboard, real-time status updates, ward-wise performance insights.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="section-container">
        <div className="section-header">
          <h2 className="section-title">Features That Make a Difference</h2>
          <p className="section-subtitle">
            Every feature designed with accessibility and simplicity in mind.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="card-interactive space-y-4">
              <div className="w-16 h-16 rounded-2xl bg-accent text-primary flex items-center justify-center">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold">{feature.title}</h3>
              <p className="text-muted-foreground text-lg">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* How It Works */}
      <section className="bg-muted/50 py-16 md:py-24">
        <div className="section-container">
          <div className="section-header">
            <h2 className="section-title">How JANSEVA Works</h2>
            <p className="section-subtitle">
              Four simple steps from reporting to resolution.
            </p>
          </div>
          
          <div className="grid md:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <div key={index} className="relative">
                <div className="text-center space-y-4">
                  <div className="w-20 h-20 mx-auto rounded-full hero-gradient text-primary-foreground flex items-center justify-center text-3xl font-bold">
                    {step.step}
                  </div>
                  <h3 className="text-xl font-bold">{step.title}</h3>
                  <p className="text-muted-foreground">{step.description}</p>
                </div>
                {index < steps.length - 1 && (
                  <ArrowRight className="hidden md:block absolute top-10 -right-4 w-8 h-8 text-primary" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Youth Squad CTA */}
      <section className="section-container">
        <div className="card-accessible bg-gradient-to-br from-secondary/20 to-warning-light border-2 border-secondary/30">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <Award className="w-10 h-10 text-secondary" />
                <span className="text-xl font-bold text-secondary">Youth Civic Squad</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold">
                Join the Movement. Make a Difference.
              </h2>
              <p className="text-lg text-muted-foreground">
                Young volunteers help verify and resolve issues in their communities. 
                Earn recognition, build your resume, and create real impact.
              </p>
              <Link to="/youth-portal">
                <Button className="btn-secondary text-xl">
                  <Users className="w-6 h-6" />
                  Join Youth Squad
                </Button>
              </Link>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="card-accessible text-center">
                <p className="text-4xl font-bold text-secondary">856</p>
                <p className="text-muted-foreground">Active Volunteers</p>
              </div>
              <div className="card-accessible text-center">
                <p className="text-4xl font-bold text-secondary">2,340</p>
                <p className="text-muted-foreground">Issues Verified</p>
              </div>
              <div className="card-accessible text-center">
                <p className="text-4xl font-bold text-secondary">15,000+</p>
                <p className="text-muted-foreground">Community Hours</p>
              </div>
              <div className="card-accessible text-center">
                <p className="text-4xl font-bold text-secondary">50</p>
                <p className="text-muted-foreground">Wards Covered</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="hero-gradient text-primary-foreground py-16 md:py-24">
        <div className="section-container text-center space-y-8">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold">
            Your City. Your Voice. Your JANSEVA.
          </h2>
          <p className="text-xl md:text-2xl opacity-90 max-w-2xl mx-auto">
            Join thousands of citizens making their communities better, one report at a time.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/report">
              <Button className="btn-accessible bg-white text-primary hover:bg-white/90 text-xl px-10 py-6 h-auto shadow-xl">
                <Mic className="w-7 h-7" />
                Report an Issue Now
              </Button>
            </Link>
            <Link to="/dashboard">
              <Button className="btn-accessible bg-transparent border-2 border-white text-white hover:bg-white/10 text-xl px-10 py-6 h-auto">
                <BarChart3 className="w-7 h-7" />
                View Dashboard
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
