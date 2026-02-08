import {
  Users,
  Mic,
  Zap,
  Shield,
  Smartphone,
  Server,
  Database,
  Cloud,
  CheckCircle2,
  ArrowRight,
  Phone,
  Mail,
  Globe,
} from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Layout from "@/components/layout/Layout";

const About = () => {
  const timeline = [
    { phase: "Phase 1", title: "Pilot Launch", description: "5 wards, core features", status: "completed" },
    { phase: "Phase 2", title: "City-Wide Rollout", description: "All wards, full features", status: "active" },
    { phase: "Phase 3", title: "Regional Expansion", description: "Multiple cities, regional languages", status: "upcoming" },
    { phase: "Phase 4", title: "National Platform", description: "All states, AI enhancements", status: "upcoming" },
  ];

  const team = [
    { name: "Municipal Corporation", role: "Primary Partner" },
    { name: "Smart City Mission", role: "Technology Partner" },
    { name: "Youth Affairs Dept", role: "Volunteer Program" },
    { name: "Digital India", role: "Infrastructure Support" },
  ];

  const techStack = [
    { icon: Smartphone, name: "Mobile First", description: "PWA with offline support" },
    { icon: Mic, name: "Voice AI", description: "Multi-language speech recognition" },
    { icon: Zap, name: "Smart Routing", description: "ML-powered issue classification" },
    { icon: Database, name: "Real-time DB", description: "Instant status updates" },
    { icon: Cloud, name: "Cloud Native", description: "Auto-scaling infrastructure" },
    { icon: Shield, name: "Secure", description: "End-to-end encryption" },
  ];

  return (
    <Layout>
      {/* Hero */}
      <section className="hero-gradient text-primary-foreground py-12 md:py-20">
        <div className="section-container text-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            About JANSEVA
          </h1>
          <p className="text-base opacity-90 max-w-3xl mx-auto">
            Transforming civic engagement through inclusive technology.
          </p>
        </div>
      </section>

      {/* Mission */}
      <section className="section-container">
        <div className="grid md:grid-cols-2 gap-10 items-center">
          <div className="space-y-4">
            <span className="inline-block px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-semibold">
              Our Mission
            </span>
            <h2 className="text-2xl md:text-3xl font-bold">
              Making Civic Participation Accessible
            </h2>
            <p className="text-sm text-muted-foreground">
              Existing civic apps often fail elderly and differently-abled citizens
              due to complex navigation and language barriers.
            </p>
            <p className="text-sm text-muted-foreground">
              JANSEVA enables anyone to report issues easily and be heard.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {[
              { value: "12,500+", label: "Issues Reported", color: "text-primary" },
              { value: "87%", label: "Resolution Rate", color: "text-success" },
              { value: "856", label: "Youth Volunteers", color: "text-info" },
              { value: "50", label: "Wards Covered", color: "text-secondary" },
            ].map((item, i) => (
              <div key={i} className="card-accessible text-center">
                <p className={`text-3xl font-bold ${item.color}`}>{item.value}</p>
                <p className="text-sm text-muted-foreground">{item.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="bg-muted/50 py-12 md:py-20">
        <div className="section-container">
          <h2 className="text-2xl font-bold text-center mb-8">
            How JANSEVA Works
          </h2>

          <div className="grid md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {[
              { step: 1, title: "Citizen Reports", icon: Users },
              { step: 2, title: "AI Processes", icon: Zap },
              { step: 3, title: "Authority Acts", icon: Server },
              { step: 4, title: "Issue Resolved", icon: CheckCircle2 },
            ].map((item, i) => (
              <div key={i} className="text-center space-y-3">
                <div className="w-16 h-16 mx-auto rounded-xl hero-gradient flex items-center justify-center">
                  <item.icon className="w-8 h-8" />
                </div>
                <p className="text-lg font-semibold">{item.step}</p>
                <p className="text-sm font-medium">{item.title}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Technology */}
      <section className="section-container">
        <h2 className="text-2xl font-bold text-center mb-8">
          Technology Stack
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {techStack.map((tech, i) => (
            <div key={i} className="card-accessible flex gap-4">
              <div className="w-12 h-12 rounded-lg bg-accent flex items-center justify-center">
                <tech.icon className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-base font-semibold">{tech.name}</h3>
                <p className="text-sm text-muted-foreground">{tech.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Roadmap */}
      <section className="bg-accent/30 py-12 md:py-20">
        <div className="section-container max-w-3xl">
          <h2 className="text-2xl font-bold text-center mb-8">
            Rollout Roadmap
          </h2>

          <div className="space-y-4">
            {timeline.map((phase, i) => (
              <div
                key={i}
                className={`card-accessible flex gap-4 items-center ${
                  phase.status === "active" ? "border-2 border-primary" : ""
                }`}
              >
                <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center font-bold">
                  {i + 1}
                </div>
                <div>
                  <p className="text-sm font-semibold">{phase.phase}</p>
                  <p className="text-base font-medium">{phase.title}</p>
                  <p className="text-sm text-muted-foreground">{phase.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Partners */}
      <section className="section-container">
        <h2 className="text-2xl font-bold text-center mb-8">
          Our Partners
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
          {team.map((partner, i) => (
            <div key={i} className="card-accessible text-center space-y-2">
              <Users className="w-6 h-6 mx-auto text-primary" />
              <p className="text-sm font-semibold">{partner.name}</p>
              <p className="text-xs text-muted-foreground">{partner.role}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Contact */}
      <section className="bg-muted/50 py-12 md:py-20">
        <div className="section-container max-w-4xl">
          <div className="card-accessible grid md:grid-cols-2 gap-6">
            <div>
              <h2 className="text-2xl font-bold mb-3">Get in Touch</h2>
              <p className="text-sm text-muted-foreground mb-4">
                Questions or partnership inquiries? Reach out to us.
              </p>
              <div className="space-y-3 text-sm">
                <div className="flex items-center gap-2">
                  <Phone className="w-5 h-5" />
                  1800-XXX-XXXX
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="w-5 h-5" />
                  support@janseva.gov.in
                </div>
                <div className="flex items-center gap-2">
                  <Globe className="w-5 h-5" />
                  www.janseva.gov.in
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <input className="input-accessible" placeholder="Your Name" />
              <input className="input-accessible" placeholder="Email" />
              <textarea className="textarea-accessible" rows={4} placeholder="Message" />
              <Button className="w-full">
                Send Message
                <ArrowRight className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="hero-gradient text-primary-foreground py-12">
        <div className="section-container text-center space-y-4">
          <h2 className="text-2xl md:text-3xl font-bold">
            Ready to Make a Difference?
          </h2>
          <p className="text-base opacity-90">
            Report an issue and help build a better community.
          </p>
          <Link to="/report">
            <Button className="bg-white text-primary hover:bg-white/90 px-8 py-4 h-auto">
              <Mic className="w-5 h-5" />
              Report an Issue
            </Button>
          </Link>
        </div>
      </section>
    </Layout>
  );
};

export default About;
