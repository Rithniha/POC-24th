import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { 
  BookOpen, 
  Video, 
  FileText, 
  PlayCircle,
  CheckCircle,
  Clock,
  Star
} from "lucide-react";

const LearningModules = () => {
  const modules = [
    {
      title: "Earthquake Safety Fundamentals",
      description: "Learn the basics of earthquake preparedness and response",
      type: "Interactive Article",
      duration: "15 min",
      progress: 100,
      status: "completed",
      difficulty: "Beginner",
      rating: 4.8
    },
    {
      title: "Flood Safety Protocols", 
      description: "Understanding flood risks and evacuation procedures",
      type: "Video + Quiz",
      duration: "12 min",
      progress: 75,
      status: "in-progress",
      difficulty: "Beginner", 
      rating: 4.9
    },
    {
      title: "Fire Emergency Response",
      description: "Fire safety, prevention, and emergency response techniques",
      type: "Interactive Guide",
      duration: "18 min", 
      progress: 0,
      status: "not-started",
      difficulty: "Intermediate",
      rating: 4.7
    },
    {
      title: "Cyclone Preparedness",
      description: "Advanced preparation for hurricane and cyclone events",
      type: "Infographic + Video",
      duration: "20 min",
      progress: 0,
      status: "not-started", 
      difficulty: "Advanced",
      rating: 4.6
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

  const getTypeIcon = (type: string) => {
    if (type.includes("Video")) return <Video className="w-4 h-4" />;
    if (type.includes("Article")) return <FileText className="w-4 h-4" />;
    return <BookOpen className="w-4 h-4" />;
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-3xl font-bold text-foreground">Learning Modules</h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Interactive articles, infographics, and videos to build your disaster preparedness knowledge. 
          Complete modules to earn badges and track your progress.
        </p>
      </div>

      {/* Progress Overview */}
      <Card className="bg-gradient-to-r from-primary/5 to-safety/5 border-primary/20">
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-primary">3</div>
              <div className="text-sm text-muted-foreground">Modules Completed</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-warning">1</div>
              <div className="text-sm text-muted-foreground">In Progress</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-muted-foreground">2</div>
              <div className="text-sm text-muted-foreground">Not Started</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Modules Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {modules.map((module, index) => (
          <Card key={index} className="disaster-card">
            <CardHeader className="pb-4">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  {getStatusIcon(module.status)}
                  <div>
                    <CardTitle className="text-lg">{module.title}</CardTitle>
                    <CardDescription className="text-sm mt-1">
                      {module.description}
                    </CardDescription>
                  </div>
                </div>
                {getStatusBadge(module.status)}
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Module Info */}
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-1 text-muted-foreground">
                  {getTypeIcon(module.type)}
                  <span>{module.type}</span>
                </div>
                <div className="flex items-center gap-1 text-muted-foreground">
                  <Clock className="w-4 h-4" />
                  <span>{module.duration}</span>
                </div>
              </div>

              {/* Progress Bar */}
              {module.progress > 0 && (
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Progress</span>
                    <span>{module.progress}%</span>
                  </div>
                  <Progress value={module.progress} className="h-2" />
                </div>
              )}

              {/* Rating and Difficulty */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 text-warning fill-warning" />
                  <span className="text-sm font-medium">{module.rating}</span>
                </div>
                <Badge variant="outline" className="text-xs">
                  {module.difficulty}
                </Badge>
              </div>

              {/* Action Button */}
              <Button 
                className="w-full" 
                variant={module.status === "completed" ? "outline" : "default"}
              >
                {module.status === "completed" ? "Review Module" : 
                 module.status === "in-progress" ? "Continue Learning" : 
                 "Start Module"}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Achievement Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Star className="w-5 h-5 text-warning" />
            Your Achievements
          </CardTitle>
          <CardDescription>Badges earned through learning modules</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-center gap-3 p-4 bg-safety/10 rounded-lg border border-safety/20">
              <div className="w-12 h-12 bg-gradient-to-br from-safety to-primary rounded-full flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-white" />
              </div>
              <div>
                <h4 className="font-medium">Earthquake Expert</h4>
                <p className="text-sm text-muted-foreground">Completed earthquake module</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-4 bg-primary/10 rounded-lg border border-primary/20">
              <div className="w-12 h-12 bg-gradient-to-br from-primary to-safety rounded-full flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-white" />
              </div>
              <div>
                <h4 className="font-medium">Flood Ready</h4>
                <p className="text-sm text-muted-foreground">Mastered flood safety</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-4 bg-muted rounded-lg border border-border opacity-60">
              <div className="w-12 h-12 bg-muted-foreground/20 rounded-full flex items-center justify-center">
                <Clock className="w-6 h-6 text-muted-foreground" />
              </div>
              <div>
                <h4 className="font-medium">Fire Safety Pro</h4>
                <p className="text-sm text-muted-foreground">Complete fire module to unlock</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default LearningModules;