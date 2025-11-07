import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { Shield, Users, BookOpen, AlertTriangle, Phone, TrendingUp } from "lucide-react";

const Index = () => {
  const features = [
    {
      icon: BookOpen,
      title: "Interactive Learning",
      description: "Comprehensive modules on disaster preparedness with quizzes and assessments"
    },
    {
      icon: AlertTriangle,
      title: "Disaster Types",
      description: "Learn about earthquakes, floods, fires, and other natural disasters"
    },
    {
      icon: Shield,
      title: "Virtual Drills",
      description: "Practice emergency responses with step-by-step simulations"
    },
    {
      icon: TrendingUp,
      title: "Progress Tracking",
      description: "Monitor your preparedness level and earn achievement badges"
    },
    {
      icon: Phone,
      title: "Emergency Contacts",
      description: "Quick access to important emergency numbers and helplines"
    },
    {
      icon: Users,
      title: "Admin Dashboard",
      description: "Manage students, track progress, and send region-specific alerts"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-accent/30 to-background">
      {/* Hero Section */}
      <section className="relative py-20 px-4">
        <div className="max-w-6xl mx-auto text-center space-y-8">
          <div className="space-y-4">
            <div className="mx-auto w-20 h-20 bg-gradient-to-br from-primary to-safety rounded-2xl flex items-center justify-center">
              <Shield className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-foreground">
              Disaster Preparedness &<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-safety">
                Education Platform
              </span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Empowering schools and colleges across India with comprehensive disaster preparedness education. 
              Learn, practice, and stay prepared for any emergency situation.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-gradient-to-r from-primary to-safety hover:opacity-90 text-lg px-8">
              <Link to="/register">Get Started</Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="text-lg px-8">
              <Link to="/login">Sign In</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">
              Complete Disaster Preparedness Solution
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Our platform provides everything needed to build disaster resilience in educational institutions
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <Card key={index} className="disaster-card">
                <CardHeader className="text-center">
                  <div className="mx-auto w-12 h-12 bg-gradient-to-br from-primary/20 to-safety/20 rounded-lg flex items-center justify-center">
                    <feature.icon className="w-6 h-6 text-primary" />
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-center">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <Card className="max-w-4xl mx-auto bg-gradient-to-r from-primary/10 to-safety/10 border-primary/20">
          <CardContent className="p-12 text-center space-y-6">
            <h3 className="text-3xl font-bold text-foreground">
              Ready to Build Disaster Resilience?
            </h3>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Join thousands of students and educators who are already building safer, more prepared communities. 
              Start your disaster preparedness journey today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-gradient-to-r from-primary to-safety hover:opacity-90">
                <Link to="/register">Create Account</Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link to="/login">Login to Dashboard</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  );
};

export default Index;
