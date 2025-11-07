import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import { 
  Mountain, 
  Waves, 
  Wind, 
  Sun, 
  Flame, 
  Zap,
  Triangle,
  Snowflake,
  TreePine,
  Construction,
  ArrowRight
} from "lucide-react";

const DisastersPage = () => {
  const navigate = useNavigate();
  
  const naturalDisasters = [
    {
      title: "Earthquakes",
      description: "Ground shaking caused by tectonic plate movements",
      icon: Mountain,
      severity: "high",
      color: "emergency",
      learningTime: "15 min"
    },
    {
      title: "Floods",
      description: "Water overflow affecting land and communities",
      icon: Waves,
      severity: "high", 
      color: "primary",
      learningTime: "12 min"
    },
    {
      title: "Cyclones & Hurricanes",
      description: "Powerful rotating storm systems with high winds",
      icon: Wind,
      severity: "high",
      color: "warning",
      learningTime: "18 min"
    },
    {
      title: "Droughts",
      description: "Extended periods of water scarcity and dry conditions",
      icon: Sun,
      severity: "medium",
      color: "warning",
      learningTime: "10 min"
    },
    {
      title: "Wildfires",
      description: "Uncontrolled fires spreading through vegetation",
      icon: Flame,
      severity: "high",
      color: "emergency",
      learningTime: "14 min"
    },
    {
      title: "Landslides & Mudslides",
      description: "Mass movement of rock, earth, or debris down slopes",
      icon: Mountain,
      severity: "medium",
      color: "warning",
      learningTime: "8 min"
    },
    {
      title: "Volcanic Eruptions",
      description: "Explosive discharge of lava, gas, and ash from volcanoes",
      icon: Triangle,
      severity: "high",
      color: "emergency",
      learningTime: "16 min"
    },
    {
      title: "Tsunamis",
      description: "Large ocean waves caused by underwater disturbances",
      icon: Waves,
      severity: "high",
      color: "primary",
      learningTime: "12 min"
    },
    {
      title: "Avalanches",
      description: "Rapid flow of snow down mountain slopes",
      icon: Snowflake,
      severity: "high",
      color: "primary",
      learningTime: "10 min"
    }
  ];

  const getSeverityBadge = (severity: string) => {
    switch (severity) {
      case "high":
        return <Badge className="emergency-badge">High Risk</Badge>;
      case "medium":
        return <Badge className="warning-badge">Medium Risk</Badge>;
      default:
        return <Badge className="safety-badge">Low Risk</Badge>;
    }
  };

  const getIconColor = (color: string) => {
    switch (color) {
      case "emergency":
        return "text-emergency";
      case "warning":
        return "text-warning";
      case "primary":
        return "text-primary";
      default:
        return "text-safety";
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-3xl font-bold text-foreground">Types of Disasters</h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Learn about different types of disasters, their causes, and how to stay safe. 
          Each module includes interactive content and safety protocols.
        </p>
      </div>

      {/* Natural Disasters Section */}
      <section className="space-y-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-safety to-primary rounded-lg flex items-center justify-center">
            <TreePine className="w-5 h-5 text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-foreground">Natural Disasters</h2>
            <p className="text-muted-foreground">Environmental phenomena that can cause significant damage</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {naturalDisasters.map((disaster, index) => (
            <Card key={index} className="disaster-card group">
              <CardHeader className="pb-4">
                <div className="flex items-start justify-between">
                  <div className={`w-12 h-12 bg-gradient-to-br from-${disaster.color} to-${disaster.color} rounded-lg flex items-center justify-center`}>
                    <disaster.icon className="w-6 h-6 text-white" />
                  </div>
                  {getSeverityBadge(disaster.severity)}
                </div>
                <CardTitle className="text-lg">{disaster.title}</CardTitle>
                <CardDescription className="text-sm">
                  {disaster.description}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Learning Time:</span>
                  <span className="font-medium">{disaster.learningTime}</span>
                </div>
                <Button 
                  className="w-full group-hover:bg-primary/90" 
                  variant="outline"
                  onClick={() => {
                    if (disaster.title === "Earthquakes") {
                      navigate("/disasters/earthquake");
                    }
                  }}
                >
                  Start Learning
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Human-made Disasters Section */}
      <section className="space-y-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-warning to-emergency rounded-lg flex items-center justify-center">
            <Construction className="w-5 h-5 text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-foreground">Human-made Disasters</h2>
            <p className="text-muted-foreground">Disasters caused by human activities and technological failures</p>
          </div>
        </div>

        <Card className="disaster-card">
          <CardContent className="p-8 text-center space-y-4">
            <Construction className="w-16 h-16 text-muted-foreground mx-auto" />
            <h3 className="text-xl font-semibold">Coming Soon</h3>
            <p className="text-muted-foreground">
              Human-made disaster modules are being developed. These will include industrial accidents, 
              chemical spills, nuclear incidents, and other technological disasters.
            </p>
            <Button variant="outline" disabled>
              Notify Me When Available
            </Button>
          </CardContent>
        </Card>
      </section>

      {/* Learning Progress Summary */}
      <Card className="bg-gradient-to-r from-primary/5 to-safety/5 border-primary/20">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold">Your Progress</h3>
              <p className="text-muted-foreground">Complete all disaster modules to become fully prepared</p>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-primary">67%</div>
              <div className="text-sm text-muted-foreground">8 of 12 completed</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DisastersPage;