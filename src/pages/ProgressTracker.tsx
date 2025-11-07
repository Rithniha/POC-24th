import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { 
  TrendingUp, 
  Award, 
  BookOpen, 
  PlayCircle,
  Target,
  Calendar,
  Star,
  Shield,
  CheckCircle,
  BarChart3
} from "lucide-react";

const ProgressTracker = () => {
  const achievements = [
    {
      title: "Earthquake Expert",
      description: "Completed earthquake preparedness module",
      icon: Shield,
      earned: true,
      earnedDate: "Dec 18, 2024",
      category: "Learning"
    },
    {
      title: "Flood Ready",
      description: "Mastered flood safety protocols",
      icon: CheckCircle,
      earned: true,
      earnedDate: "Dec 15, 2024",
      category: "Learning"
    },
    {
      title: "Fire Safety Pro",
      description: "Complete fire safety module",
      icon: Award,
      earned: false,
      earnedDate: null,
      category: "Learning"
    },
    {
      title: "Drill Master",
      description: "Complete 5 virtual drills",
      icon: PlayCircle,
      earned: false,
      earnedDate: null,
      category: "Practice"
    },
    {
      title: "Quiz Champion",
      description: "Score 90% or higher on 3 quizzes",
      icon: Target,
      earned: true,
      earnedDate: "Dec 10, 2024",
      category: "Assessment"
    },
    {
      title: "Preparedness Leader",
      description: "Achieve 80% overall preparedness",
      icon: Star,
      earned: false,
      earnedDate: null,
      category: "Overall"
    }
  ];

  const learningStats = [
    {
      title: "Modules Completed",
      current: 8,
      total: 12,
      percentage: 67,
      icon: BookOpen,
      color: "primary"
    },
    {
      title: "Virtual Drills",
      current: 3,
      total: 8,
      percentage: 38,
      icon: PlayCircle,
      color: "warning"
    },
    {
      title: "Quiz Average",
      current: 85,
      total: 100,
      percentage: 85,
      icon: Target,
      color: "safety"
    },
    {
      title: "Overall Preparedness",
      current: 75,
      total: 100,
      percentage: 75,
      icon: TrendingUp,
      color: "emergency"
    }
  ];

  const recentActivity = [
    {
      type: "module",
      title: "Completed Flood Safety Module",
      date: "2 hours ago",
      points: 150
    },
    {
      type: "quiz",
      title: "Earthquake Quiz - 92% Score",
      date: "1 day ago",
      points: 120
    },
    {
      type: "drill",
      title: "Fire Evacuation Drill Completed",
      date: "3 days ago",
      points: 100
    },
    {
      type: "badge",
      title: "Earned 'Flood Ready' Badge",
      date: "4 days ago",
      points: 200
    }
  ];

  const getActivityIcon = (type: string) => {
    switch (type) {
      case "module":
        return <BookOpen className="w-4 h-4" />;
      case "quiz":
        return <Target className="w-4 h-4" />;
      case "drill":
        return <PlayCircle className="w-4 h-4" />;
      case "badge":
        return <Award className="w-4 h-4" />;
      default:
        return <CheckCircle className="w-4 h-4" />;
    }
  };

  const getActivityColor = (type: string) => {
    switch (type) {
      case "module":
        return "text-primary";
      case "quiz":
        return "text-safety";
      case "drill":
        return "text-warning";
      case "badge":
        return "text-emergency";
      default:
        return "text-muted-foreground";
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-3xl font-bold text-foreground">Progress Tracker</h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Track your disaster preparedness journey, monitor achievements, and see how ready you are for emergencies.
        </p>
      </div>

      {/* Progress Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {learningStats.map((stat, index) => (
          <Card key={index} className="disaster-card">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <stat.icon className={`w-5 h-5 text-${stat.color}`} />
                <span className="text-sm font-medium text-muted-foreground">
                  {stat.current}/{stat.total}
                </span>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <h3 className="font-medium text-sm">{stat.title}</h3>
                <p className="text-2xl font-bold">{stat.current}{stat.title.includes("Average") || stat.title.includes("Preparedness") ? "%" : ""}</p>
              </div>
              <div className="progress-bar h-2">
                <div 
                  className="progress-fill h-full"
                  style={{ width: `${stat.percentage}%` }}
                />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Achievements & Badges */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Award className="w-5 h-5 text-warning" />
              <CardTitle className="text-xl">Achievements & Badges</CardTitle>
            </div>
            <CardDescription>Your earned achievements and upcoming goals</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {achievements.map((achievement, index) => (
              <div key={index} className={`flex items-center gap-4 p-3 rounded-lg ${achievement.earned ? 'bg-safety/10 border border-safety/20' : 'bg-muted/30 opacity-60'}`}>
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${achievement.earned ? 'bg-gradient-to-br from-safety to-primary' : 'bg-muted'}`}>
                  <achievement.icon className={`w-5 h-5 ${achievement.earned ? 'text-white' : 'text-muted-foreground'}`} />
                </div>
                <div className="flex-1">
                  <h4 className="font-medium">{achievement.title}</h4>
                  <p className="text-sm text-muted-foreground">{achievement.description}</p>
                  {achievement.earned && achievement.earnedDate && (
                    <p className="text-xs text-safety mt-1">Earned on {achievement.earnedDate}</p>
                  )}
                </div>
                <div>
                  {achievement.earned ? (
                    <Badge className="safety-badge">Earned</Badge>
                  ) : (
                    <Badge variant="outline">Locked</Badge>
                  )}
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-primary" />
              <CardTitle className="text-xl">Recent Activity</CardTitle>
            </div>
            <CardDescription>Your latest learning activities and achievements</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {recentActivity.map((activity, index) => (
              <div key={index} className="flex items-center gap-4 p-3 bg-muted/30 rounded-lg">
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center bg-gradient-to-br from-primary/20 to-safety/20`}>
                  {getActivityIcon(activity.type)}
                </div>
                <div className="flex-1">
                  <h4 className="font-medium text-sm">{activity.title}</h4>
                  <p className="text-xs text-muted-foreground">{activity.date}</p>
                </div>
                <div className="text-right">
                  <div className="text-sm font-bold text-warning">+{activity.points}</div>
                  <div className="text-xs text-muted-foreground">points</div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Preparedness Level Breakdown */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="w-5 h-5 text-primary" />
            Preparedness Level Breakdown
          </CardTitle>
          <CardDescription>Detailed view of your disaster preparedness across different categories</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="font-medium">Natural Disasters</span>
                <span className="text-sm font-bold">78%</span>
              </div>
              <Progress value={78} className="h-2" />
              <p className="text-xs text-muted-foreground">
                Strong knowledge of earthquakes and floods. Work on cyclone preparedness.
              </p>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="font-medium">Emergency Response</span>
                <span className="text-sm font-bold">65%</span>
              </div>
              <Progress value={65} className="h-2" />
              <p className="text-xs text-muted-foreground">
                Good drill performance. Practice fire evacuation procedures more.
              </p>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="font-medium">Safety Protocols</span>
                <span className="text-sm font-bold">82%</span>
              </div>
              <Progress value={82} className="h-2" />
              <p className="text-xs text-muted-foreground">
                Excellent understanding of safety measures and emergency contacts.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Goals & Next Steps */}
      <Card className="bg-gradient-to-r from-primary/5 to-safety/5 border-primary/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="w-5 h-5 text-primary" />
            Your Next Goals
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <h4 className="font-medium">Complete Fire Safety Module</h4>
              <p className="text-sm text-muted-foreground">
                Earn the "Fire Safety Pro" badge and improve your emergency response score.
              </p>
            </div>
            <div className="space-y-2">
              <h4 className="font-medium">Practice 2 More Drills</h4>
              <p className="text-sm text-muted-foreground">
                Complete virtual drills to unlock the "Drill Master" achievement.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProgressTracker;