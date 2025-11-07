import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, Award } from "lucide-react";
import { useNavigate } from "react-router-dom";
import LearningSection from "@/components/earthquake/LearningSection";
import CompletionTimer from "@/components/earthquake/CompletionTimer";
import QuizSection from "@/components/earthquake/QuizSection";
import EarthquakeMap from "@/components/earthquake/EarthquakeMap";
import LiveAlerts from "@/components/earthquake/LiveAlerts";

type Phase = "learning" | "quiz" | "completed";

const EarthquakeModule = () => {
  const navigate = useNavigate();
  const [currentPhase, setCurrentPhase] = useState<Phase>("learning");
  const [startTime, setStartTime] = useState<number>(Date.now());
  const [completionTime, setCompletionTime] = useState<number>(0);
  const [quizScore, setQuizScore] = useState<number>(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    setStartTime(Date.now());
  }, []);

  const handleLearningComplete = () => {
    setProgress(50);
    setCurrentPhase("quiz");
  };

  const handleQuizComplete = (score: number) => {
    const endTime = Date.now();
    const totalSeconds = Math.floor((endTime - startTime) / 1000);
    setCompletionTime(totalSeconds);
    setQuizScore(score);
    setProgress(100);
    setCurrentPhase("completed");
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}m ${secs}s`;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <Button
          variant="ghost"
          onClick={() => navigate("/disasters")}
          className="gap-2"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Disasters
        </Button>
        <CompletionTimer startTime={startTime} isActive={currentPhase !== "completed"} />
      </div>

      {/* Progress Bar */}
      <Card className="p-4">
        <div className="space-y-2">
          <div className="flex justify-between text-sm font-medium">
            <span>Module Progress</span>
            <span>{progress}%</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>
      </Card>

      {/* Live Alerts */}
      <LiveAlerts />

      {/* Main Content */}
      {currentPhase === "learning" && (
        <LearningSection onComplete={handleLearningComplete} />
      )}

      {currentPhase === "quiz" && (
        <QuizSection onComplete={handleQuizComplete} />
      )}

      {currentPhase === "completed" && (
        <Card className="p-8 text-center space-y-6 bg-gradient-to-br from-safety-light to-primary/5">
          <div className="w-20 h-20 mx-auto bg-gradient-to-br from-safety to-primary rounded-full flex items-center justify-center">
            <Award className="w-10 h-10 text-white" />
          </div>
          <div>
            <h2 className="text-3xl font-bold text-foreground mb-2">
              🎉 Congratulations!
            </h2>
            <p className="text-lg text-muted-foreground">
              You've completed the Earthquake Safety Module
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-md mx-auto">
            <div className="p-4 bg-card rounded-lg border border-border">
              <div className="text-3xl font-bold text-primary">{formatTime(completionTime)}</div>
              <div className="text-sm text-muted-foreground">Completion Time</div>
            </div>
            <div className="p-4 bg-card rounded-lg border border-border">
              <div className="text-3xl font-bold text-safety">{quizScore}%</div>
              <div className="text-sm text-muted-foreground">Quiz Score</div>
            </div>
          </div>
          <div className="flex gap-4 justify-center">
            <Button onClick={() => navigate("/learning-modules")}>
              View All Modules
            </Button>
            <Button variant="outline" onClick={() => window.location.reload()}>
              Retake Module
            </Button>
          </div>
        </Card>
      )}

      {/* Earthquake Map */}
      <EarthquakeMap />
    </div>
  );
};

export default EarthquakeModule;
