import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  PlayCircle, 
  CheckCircle, 
  Clock, 
  Users,
  Target,
  AlertTriangle,
  Shield,
  ArrowRight,
  Timer,
  Glasses,
  Headphones,
  Smartphone,
  Monitor,
  Zap,
  Eye
} from "lucide-react";

const VirtualDrills = () => {
  const drills = [
    {
      title: "Earthquake Response Drill",
      description: "Learn Drop, Cover, and Hold On technique",
      type: "earthquake",
      duration: "8 minutes",
      participants: "2,450 students",
      difficulty: "Beginner",
      steps: 4,
      completedSteps: 4,
      status: "completed",
      lastAttempt: "2 days ago"
    },
    {
      title: "Fire Evacuation Drill",
      description: "Safe evacuation routes and fire safety procedures",
      type: "fire",
      duration: "12 minutes", 
      participants: "1,890 students",
      difficulty: "Intermediate",
      steps: 6,
      completedSteps: 3,
      status: "in-progress",
      lastAttempt: "1 hour ago"
    },
    {
      title: "Flood Safety Simulation",
      description: "Water emergency response and safe evacuation",
      type: "flood",
      duration: "10 minutes",
      participants: "1,200 students",
      difficulty: "Beginner", 
      steps: 5,
      completedSteps: 0,
      status: "not-started",
      lastAttempt: null
    },
    {
      title: "Cyclone Preparedness Drill",
      description: "Advanced storm response and shelter procedures",
      type: "cyclone",
      duration: "15 minutes",
      participants: "890 students",
      difficulty: "Advanced",
      steps: 7,
      completedSteps: 0,
      status: "not-started", 
      lastAttempt: null
    }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "completed":
        return <Badge className="safety-badge">Completed</Badge>;
      case "in-progress":
        return <Badge className="warning-badge">In Progress</Badge>;
      default:
        return <Badge variant="outline">Not Started</Badge>;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="w-5 h-5 text-safety" />;
      case "in-progress":
        return <PlayCircle className="w-5 h-5 text-warning" />;
      default:
        return <Clock className="w-5 h-5 text-muted-foreground" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "fire":
        return "from-emergency to-warning";
      case "flood":
        return "from-primary to-primary";
      case "earthquake":
        return "from-warning to-emergency";
      default:
        return "from-primary to-safety";
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Advanced":
        return "text-emergency";
      case "Intermediate":
        return "text-warning";
      default:
        return "text-safety";
    }
  };

  const arVrDrills = [
    {
      title: "VR Earthquake Simulation",
      description: "Experience realistic earthquake scenarios in virtual reality",
      type: "earthquake",
      technology: "VR",
      duration: "15 minutes",
      participants: "1,200 students",
      difficulty: "Intermediate",
      immersionLevel: "High",
      features: ["360° Environment", "Haptic Feedback", "Voice Guidance"],
      status: "available"
    },
    {
      title: "AR Fire Evacuation",
      description: "Navigate fire evacuation routes using augmented reality",
      type: "fire", 
      technology: "AR",
      duration: "12 minutes",
      participants: "890 students",
      difficulty: "Beginner",
      immersionLevel: "Medium",
      features: ["Real Environment Overlay", "Interactive Objects", "Real-time Instructions"],
      status: "available"
    },
    {
      title: "VR Flood Response Training",
      description: "Immersive flood scenario with water physics simulation",
      type: "flood",
      technology: "VR",
      duration: "18 minutes", 
      participants: "650 students",
      difficulty: "Advanced",
      immersionLevel: "High",
      features: ["Water Physics", "Emergency Equipment", "Team Coordination"],
      status: "coming-soon"
    },
    {
      title: "AR Cyclone Preparedness",
      description: "Learn cyclone safety measures through augmented reality",
      type: "cyclone",
      technology: "AR", 
      duration: "10 minutes",
      participants: "480 students",
      difficulty: "Beginner",
      immersionLevel: "Medium",
      features: ["Weather Visualization", "Safety Zone Mapping", "Wind Simulation"],
      status: "coming-soon"
    }
  ];

  const getTechnologyIcon = (tech: string) => {
    return tech === "VR" ? <Glasses className="w-5 h-5" /> : <Smartphone className="w-5 h-5" />;
  };

  const getTechnologyColor = (tech: string) => {
    return tech === "VR" ? "from-primary to-safety" : "from-warning to-emergency";
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-3xl font-bold text-foreground">Virtual Drills</h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Practice disaster response through interactive simulations, AR experiences, and VR training. 
          Build muscle memory for emergency situations through immersive learning.
        </p>
      </div>

      {/* Enhanced Tabs for Different Drill Types */}
      <Tabs defaultValue="traditional" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="traditional" className="flex items-center gap-2">
            <Monitor className="w-4 h-4" />
            Traditional Drills
          </TabsTrigger>
          <TabsTrigger value="ar-vr" className="flex items-center gap-2">
            <Eye className="w-4 h-4" />
            AR & VR Experiences
          </TabsTrigger>
          <TabsTrigger value="scheduled" className="flex items-center gap-2">
            <Shield className="w-4 h-4" />
            Scheduled Drills
          </TabsTrigger>
        </TabsList>

        <TabsContent value="traditional" className="space-y-6 mt-6">

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <div className="w-8 h-8 bg-safety/20 rounded-lg flex items-center justify-center mx-auto mb-2">
              <CheckCircle className="w-4 h-4 text-safety" />
            </div>
            <div className="text-2xl font-bold text-safety">1</div>
            <div className="text-sm text-muted-foreground">Completed</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="w-8 h-8 bg-warning/20 rounded-lg flex items-center justify-center mx-auto mb-2">
              <PlayCircle className="w-4 h-4 text-warning" />
            </div>
            <div className="text-2xl font-bold text-warning">1</div>
            <div className="text-sm text-muted-foreground">In Progress</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="w-8 h-8 bg-primary/20 rounded-lg flex items-center justify-center mx-auto mb-2">
              <Target className="w-4 h-4 text-primary" />
            </div>
            <div className="text-2xl font-bold text-primary">85%</div>
            <div className="text-sm text-muted-foreground">Avg Score</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="w-8 h-8 bg-accent/20 rounded-lg flex items-center justify-center mx-auto mb-2">
              <Timer className="w-4 h-4 text-accent-foreground" />
            </div>
            <div className="text-2xl font-bold text-accent-foreground">45m</div>
            <div className="text-sm text-muted-foreground">Total Time</div>
          </CardContent>
        </Card>
      </div>

          {/* Traditional Drills Grid */}
          <div className="space-y-6">
            {drills.map((drill, index) => (
              <Card key={index} className="disaster-card">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-4">
                      <div className={`w-12 h-12 bg-gradient-to-br ${getTypeColor(drill.type)} rounded-lg flex items-center justify-center`}>
                        {getStatusIcon(drill.status)}
                      </div>
                      <div>
                        <CardTitle className="text-xl">{drill.title}</CardTitle>
                        <CardDescription className="text-sm mt-1">
                          {drill.description}
                        </CardDescription>
                      </div>
                    </div>
                    {getStatusBadge(drill.status)}
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Progress bar for in-progress drills */}
                  {drill.status !== "not-started" && (
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Progress: {drill.completedSteps}/{drill.steps} steps</span>
                        <span>{Math.round((drill.completedSteps / drill.steps) * 100)}%</span>
                      </div>
                      <Progress value={(drill.completedSteps / drill.steps) * 100} className="h-2" />
                    </div>
                  )}

                  {/* Drill Details */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-muted-foreground" />
                      <span>{drill.duration}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4 text-muted-foreground" />
                      <span>{drill.participants}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Target className="w-4 h-4 text-muted-foreground" />
                      <span className={getDifficultyColor(drill.difficulty)}>
                        {drill.difficulty}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <AlertTriangle className="w-4 h-4 text-muted-foreground" />
                      <span className="capitalize">{drill.type}</span>
                    </div>
                  </div>

                  {/* Last Attempt */}
                  {drill.lastAttempt && (
                    <div className="text-sm text-muted-foreground">
                      Last attempt: {drill.lastAttempt}
                    </div>
                  )}

                  {/* Action Button */}
                  <Button 
                    className="w-full justify-between" 
                    variant={drill.status === "completed" ? "outline" : "default"}
                  >
                    <span>
                      {drill.status === "completed" ? "Review Drill" : 
                       drill.status === "in-progress" ? "Continue Drill" : 
                       "Start Drill"}
                    </span>
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="ar-vr" className="space-y-6 mt-6">
          {/* AR/VR Technology Overview */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <Card className="bg-gradient-to-br from-primary/10 to-safety/10 border-primary/20">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-primary/20 rounded-lg flex items-center justify-center">
                    <Glasses className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold">Virtual Reality (VR)</h3>
                </div>
                <p className="text-sm text-muted-foreground mb-4">
                  Immerse yourself completely in realistic disaster scenarios with 360° environments, 
                  haptic feedback, and interactive emergency procedures.
                </p>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="secondary">360° Immersion</Badge>
                  <Badge variant="secondary">Haptic Feedback</Badge>
                  <Badge variant="secondary">Voice Guidance</Badge>
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-gradient-to-br from-warning/10 to-emergency/10 border-warning/20">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-warning/20 rounded-lg flex items-center justify-center">
                    <Smartphone className="w-5 h-5 text-warning" />
                  </div>
                  <h3 className="text-lg font-semibold">Augmented Reality (AR)</h3>
                </div>
                <p className="text-sm text-muted-foreground mb-4">
                  Overlay digital safety information onto your real environment, practice evacuation 
                  routes, and learn emergency procedures in familiar spaces.
                </p>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="secondary">Real Environment</Badge>
                  <Badge variant="secondary">Interactive Objects</Badge>
                  <Badge variant="secondary">Live Instructions</Badge>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* AR/VR Drills Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {arVrDrills.map((drill, index) => (
              <Card key={index} className="disaster-card group hover:shadow-lg transition-all duration-300">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-4">
                      <div className={`w-12 h-12 bg-gradient-to-br ${getTechnologyColor(drill.technology)} rounded-lg flex items-center justify-center`}>
                        {getTechnologyIcon(drill.technology)}
                      </div>
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <CardTitle className="text-lg">{drill.title}</CardTitle>
                          <Badge variant={drill.technology === "VR" ? "default" : "secondary"}>
                            {drill.technology}
                          </Badge>
                        </div>
                        <CardDescription className="text-sm">
                          {drill.description}
                        </CardDescription>
                      </div>
                    </div>
                    <Badge variant={drill.status === "available" ? "default" : "outline"}>
                      {drill.status === "available" ? "Available" : "Coming Soon"}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Immersion Level */}
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Immersion Level</span>
                      <span className="font-medium">{drill.immersionLevel}</span>
                    </div>
                    <Progress 
                      value={drill.immersionLevel === "High" ? 90 : drill.immersionLevel === "Medium" ? 60 : 30} 
                      className="h-2" 
                    />
                  </div>

                  {/* Drill Details */}
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-muted-foreground" />
                      <span>{drill.duration}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4 text-muted-foreground" />
                      <span>{drill.participants}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Target className="w-4 h-4 text-muted-foreground" />
                      <span className={getDifficultyColor(drill.difficulty)}>
                        {drill.difficulty}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <AlertTriangle className="w-4 h-4 text-muted-foreground" />
                      <span className="capitalize">{drill.type}</span>
                    </div>
                  </div>

                  {/* Features */}
                  <div className="space-y-2">
                    <h4 className="text-sm font-medium">Features:</h4>
                    <div className="flex flex-wrap gap-2">
                      {drill.features.map((feature, i) => (
                        <Badge key={i} variant="outline" className="text-xs">
                          {feature}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Action Button */}
                  <Button 
                    className="w-full justify-between" 
                    variant={drill.status === "available" ? "default" : "outline"}
                    disabled={drill.status !== "available"}
                  >
                    <span>
                      {drill.status === "available" 
                        ? `Launch ${drill.technology} Experience` 
                        : "Coming Soon"}
                    </span>
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Technology Requirements */}
          <Card className="mt-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="w-5 h-5 text-primary" />
                Technology Requirements
              </CardTitle>
              <CardDescription>Ensure your device meets these requirements for optimal experience</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <h4 className="font-medium flex items-center gap-2">
                    <Glasses className="w-4 h-4" />
                    For VR Experiences
                  </h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• VR Headset (Oculus, HTC Vive, or compatible)</li>
                    <li>• Minimum 6GB RAM</li>
                    <li>• Graphics card: GTX 1060 or equivalent</li>
                    <li>• Stable internet connection (25+ Mbps)</li>
                  </ul>
                </div>
                <div className="space-y-3">
                  <h4 className="font-medium flex items-center gap-2">
                    <Smartphone className="w-4 h-4" />
                    For AR Experiences
                  </h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Smartphone with camera</li>
                    <li>• ARCore (Android) or ARKit (iOS) support</li>
                    <li>• Minimum 3GB RAM</li>
                    <li>• Stable internet connection (10+ Mbps)</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="scheduled" className="space-y-6 mt-6">

          {/* Upcoming Scheduled Drills */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="w-5 h-5 text-primary" />
                Scheduled School Drills
              </CardTitle>
              <CardDescription>Participate in institution-wide emergency drills</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 bg-warning/5 border border-warning/20 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium">Campus Fire Drill</h4>
                    <Badge className="warning-badge">Tomorrow</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">
                    Mandatory evacuation drill for all students and staff
                  </p>
                  <div className="text-sm">
                    <div className="flex justify-between">
                      <span>Time:</span>
                      <span className="font-medium">2:00 PM - 2:15 PM</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Assembly Point:</span>
                      <span className="font-medium">Main Playground</span>
                    </div>
                  </div>
                </div>
                
                <div className="p-4 bg-primary/5 border border-primary/20 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium">Earthquake Simulation</h4>
                    <Badge variant="outline">Next Week</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">
                    Practice drop, cover, and hold techniques
                  </p>
                  <div className="text-sm">
                    <div className="flex justify-between">
                      <span>Date:</span>
                      <span className="font-medium">Dec 25, 10:00 AM</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Duration:</span>
                      <span className="font-medium">10 minutes</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default VirtualDrills;