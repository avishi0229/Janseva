import { 
  Users, 
  Mic, 
  Zap, 
  Eye, 
  Shield, 
  Smartphone,
  Server,
  Database,
  Cloud,
  CheckCircle2,
  ArrowRight,
  Phone,
  Mail,
  Globe
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
      <section className="hero-gradient text-primary-foreground py-16 md:py-24">
        <div className="section-container text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            About JANSEVA
          </h1>
          <p className="text-xl md:text-2xl opacity-90 max-w-3xl mx-auto">
            Transforming civic engagement through inclusive technology. 
            Built for every citizen, especially those who need it most.
          </p>
        </div>
      </section>

      {/* Mission */}
      <section className="section-container">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <span className="inline-block px-4 py-2 bg-primary/10 text-primary rounded-full font-semibold">
              Our Mission
            </span>
            <h2 className="text-3xl md:text-4xl font-bold">
              Making Civic Participation Accessible to All
            </h2>
            <p className="text-lg text-muted-foreground">
              JANSEVA was born from a simple observation: existing civic apps fail millions of 
              elderly and differently-abled citizens. Small fonts, complex navigation, and 
              English-only interfaces create barriers to participation.
            </p>
            <p className="text-lg text-muted-foreground">
              We set out to build a platform where anyone, regardless of age, ability, or 
              technical literacy, can report issues and be heard by their government.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-6">
            <div className="card-accessible text-center">
              <p className="text-4xl font-bold text-primary">12,500+</p>
              <p className="text-muted-foreground">Issues Reported</p>
            </div>
            <div className="card-accessible text-center">
              <p className="text-4xl font-bold text-success">87%</p>
              <p className="text-muted-foreground">Resolution Rate</p>
            </div>
            <div className="card-accessible text-center">
              <p className="text-4xl font-bold text-info">856</p>
              <p className="text-muted-foreground">Youth Volunteers</p>
            </div>
            <div className="card-accessible text-center">
              <p className="text-4xl font-bold text-secondary">50</p>
              <p className="text-muted-foreground">Wards Covered</p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="bg-muted/50 py-16 md:py-24">
        <div className="section-container">
          <div className="section-header">
            <h2 className="section-title">How JANSEVA Works</h2>
            <p className="section-subtitle">
              A simple, accessible flow from reporting to resolution
            </p>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <div className="relative">
              {/* Flow Diagram */}
              <div className="grid md:grid-cols-4 gap-6">
                {[
                  { step: 1, title: "Citizen Reports", desc: "Voice, text, or photo", icon: Users },
                  { step: 2, title: "AI Processes", desc: "Smart categorization", icon: Zap },
                  { step: 3, title: "Authority Acts", desc: "Routed to right team", icon: Server },
                  { step: 4, title: "Issue Resolved", desc: "Real-time updates", icon: CheckCircle2 },
                ].map((item, index) => (
                  <div key={index} className="text-center space-y-4">
                    <div className="w-20 h-20 mx-auto rounded-2xl hero-gradient text-primary-foreground flex items-center justify-center">
                      <item.icon className="w-10 h-10" />
                    </div>
                    <div className="font-bold text-2xl">{item.step}</div>
                    <h3 className="text-xl font-semibold">{item.title}</h3>
                    <p className="text-muted-foreground">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Technology */}
      <section className="section-container">
        <div className="section-header">
          <h2 className="section-title">Built with Modern Technology</h2>
          <p className="section-subtitle">
            Scalable, secure, and designed for accessibility
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {techStack.map((tech, index) => (
            <div key={index} className="card-accessible flex items-start gap-4">
              <div className="w-14 h-14 rounded-xl bg-accent text-primary flex items-center justify-center flex-shrink-0">
                <tech.icon className="w-7 h-7" />
              </div>
              <div>
                <h3 className="text-xl font-bold">{tech.name}</h3>
                <p className="text-muted-foreground">{tech.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Rollout Timeline */}
      <section className="bg-accent/30 py-16 md:py-24">
        <div className="section-container">
          <div className="section-header">
            <h2 className="section-title">Rollout Roadmap</h2>
            <p className="section-subtitle">
              Our phased approach to nationwide coverage
            </p>
          </div>
          
          <div className="max-w-3xl mx-auto">
            <div className="space-y-6">
              {timeline.map((phase, index) => (
                <div 
                  key={index}
                  className={`
                    card-accessible flex items-center gap-6
                    ${phase.status === "active" ? "border-2 border-primary" : ""}
                  `}
                >
                  <div className={`
                    w-16 h-16 rounded-full flex items-center justify-center flex-shrink-0
                    ${phase.status === "completed" ? "bg-success text-success-foreground" : ""}
                    ${phase.status === "active" ? "bg-primary text-primary-foreground animate-pulse" : ""}
                    ${phase.status === "upcoming" ? "bg-muted text-muted-foreground" : ""}
                  `}>
                    {phase.status === "completed" ? (
                      <CheckCircle2 className="w-8 h-8" />
                    ) : (
                      <span className="font-bold text-xl">{index + 1}</span>
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3">
                      <span className="text-sm font-semibold text-primary">{phase.phase}</span>
                      {phase.status === "active" && (
                        <span className="px-3 py-1 bg-primary text-primary-foreground text-sm rounded-full">
                          Current
                        </span>
                      )}
                    </div>
                    <h3 className="text-xl font-bold">{phase.title}</h3>
                    <p className="text-muted-foreground">{phase.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Partners */}
      <section className="section-container">
        <div className="section-header">
          <h2 className="section-title">Our Partners</h2>
          <p className="section-subtitle">
            Working together for better governance
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {team.map((partner, index) => (
            <div key={index} className="card-accessible text-center space-y-2">
              <div className="w-16 h-16 mx-auto rounded-full bg-muted flex items-center justify-center">
                <Users className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-lg font-bold">{partner.name}</h3>
              <p className="text-muted-foreground">{partner.role}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Contact */}
      <section className="bg-muted/50 py-16 md:py-24">
        <div className="section-container">
          <div className="max-w-4xl mx-auto">
            <div className="card-accessible">
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <h2 className="text-3xl font-bold">Get in Touch</h2>
                  <p className="text-lg text-muted-foreground">
                    Have questions about JANSEVA? Want to partner with us? 
                    We'd love to hear from you.
                  </p>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <Phone className="w-6 h-6 text-primary" />
                      <span className="text-lg">1800-XXX-XXXX (Toll Free)</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Mail className="w-6 h-6 text-primary" />
                      <span className="text-lg">support@janseva.gov.in</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Globe className="w-6 h-6 text-primary" />
                      <span className="text-lg">www.janseva.gov.in</span>
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <input
                    type="text"
                    placeholder="Your Name"
                    className="input-accessible"
                  />
                  <input
                    type="email"
                    placeholder="Email Address"
                    className="input-accessible"
                  />
                  <textarea
                    placeholder="Your Message"
                    rows={4}
                    className="textarea-accessible"
                  />
                  <Button className="btn-primary w-full">
                    Send Message
                    <ArrowRight className="w-5 h-5" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="hero-gradient text-primary-foreground py-16">
        <div className="section-container text-center space-y-6">
          <h2 className="text-3xl md:text-4xl font-bold">
            Ready to Make a Difference?
          </h2>
          <p className="text-xl opacity-90">
            Report an issue today and help build a better community.
          </p>
          <Link to="/report">
            <Button className="btn-accessible bg-white text-primary hover:bg-white/90 text-xl px-10 py-6 h-auto shadow-xl">
              <Mic className="w-7 h-7" />
              Report an Issue
            </Button>
          </Link>
        </div>
      </section>
    </Layout>
  );
};

export default About;
