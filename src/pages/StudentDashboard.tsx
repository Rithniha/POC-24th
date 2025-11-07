import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { 
  BookOpen, 
  PlayCircle, 
  Award, 
  TrendingUp,
  AlertTriangle,
  Shield,
  Target,
  Clock
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const StudentDashboard = () => {
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  const stats = [
    {
      title: "Modules Completed",
      value: "8",
      total: "12",
      percentage: 67,
      icon: BookOpen,
      color: "text-primary"
    },
    {
      title: "Drills Completed",
      value: "5",
      total: "8",
      percentage: 63,
      icon: PlayCircle,
      color: "text-safety"
    },
    {
      title: "Quiz Score",
      value: "85%",
      total: "Average",
      percentage: 85,
      icon: Target,
      color: "text-warning"
    },
    {
      title: "Preparedness Level",
      value: "Advanced",
      total: "Level",
      percentage: 75,
      icon: Shield,
      color: "text-emergency"
    }
  ];

  const recentBadges = [
    { name: "Earthquake Ready", color: "safety" },
    { name: "Flood Expert", color: "primary" },
    { name: "Fire Safety Pro", color: "emergency" }
  ];

  const upcomingDrills = [
    { name: "Fire Evacuation Drill", date: "Today, 3:00 PM", type: "fire" },
    { name: "Earthquake Response", date: "Tomorrow, 10:00 AM", type: "earthquake" },
    { name: "Flood Safety", date: "Dec 22, 2:00 PM", type: "flood" }
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-primary/10 to-safety/10 rounded-xl p-6 border border-primary/20">
        <h1 className="text-2xl font-bold text-foreground mb-2">
          Welcome back, {user.name}! 👋
        </h1>
        <p className="text-muted-foreground">
          Continue your disaster preparedness journey. You're doing great!
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <Card key={index} className="disaster-card">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <stat.icon className={`w-5 h-5 ${stat.color}`} />
                <span className="text-sm font-medium text-muted-foreground">
                  {stat.value}/{stat.total}
                </span>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <h3 className="font-medium text-sm">{stat.title}</h3>
                <p className="text-2xl font-bold">{stat.value}</p>
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

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Achievements */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Award className="w-5 h-5 text-warning" />
              <CardTitle className="text-lg">Recent Achievements</CardTitle>
            </div>
            <CardDescription>Badges you've earned recently</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {recentBadges.map((badge, index) => (
              <div key={index} className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                <div className="w-10 h-10 bg-gradient-to-br from-primary to-safety rounded-full flex items-center justify-center">
                  <Award className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1">
                  <h4 className="font-medium">{badge.name}</h4>
                  <p className="text-sm text-muted-foreground">Completed today</p>
                </div>
                <Badge variant="secondary">New</Badge>
              </div>
            ))}
            <Button asChild className="w-full mt-4" variant="outline">
              <Link to="/progress">View All Achievements</Link>
            </Button>
          </CardContent>
        </Card>

        {/* Upcoming Drills */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-primary" />
              <CardTitle className="text-lg">Upcoming Drills</CardTitle>
            </div>
            <CardDescription>Scheduled virtual drills</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {upcomingDrills.map((drill, index) => (
              <div key={index} className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                <div className="w-10 h-10 bg-gradient-to-br from-warning to-emergency rounded-full flex items-center justify-center">
                  <PlayCircle className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1">
                  <h4 className="font-medium">{drill.name}</h4>
                  <p className="text-sm text-muted-foreground">{drill.date}</p>
                </div>
                <Badge variant={drill.type === "fire" ? "destructive" : "secondary"}>
                  {drill.type}
                </Badge>
              </div>
            ))}
            <Button asChild className="w-full mt-4" variant="outline">
              <Link to="/drills">View All Drills</Link>
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Quick Actions</CardTitle>
          <CardDescription>Jump into your learning journey</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button asChild className="h-20 flex-col gap-2" variant="outline">
              <Link to="/disasters">
                <AlertTriangle className="w-6 h-6" />
                <span>Learn About Disasters</span>
              </Link>
            </Button>
            <Button asChild className="h-20 flex-col gap-2" variant="outline">
              <Link to="/modules">
                <BookOpen className="w-6 h-6" />
                <span>Continue Learning</span>
              </Link>
            </Button>
            <Button asChild className="h-20 flex-col gap-2" variant="outline">
              <Link to="/drills">
                <PlayCircle className="w-6 h-6" />
                <span>Practice Drills</span>
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default StudentDashboard;