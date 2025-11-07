import { useState, useEffect } from "react";
import { Clock } from "lucide-react";
import { Card } from "@/components/ui/card";

interface CompletionTimerProps {
  startTime: number;
  isActive: boolean;
}

const CompletionTimer = ({ startTime, isActive }: CompletionTimerProps) => {
  const [elapsed, setElapsed] = useState(0);

  useEffect(() => {
    if (!isActive) return;

    const interval = setInterval(() => {
      const now = Date.now();
      const elapsedSeconds = Math.floor((now - startTime) / 1000);
      setElapsed(elapsedSeconds);
    }, 1000);

    return () => clearInterval(interval);
  }, [startTime, isActive]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <Card className="px-4 py-2 flex items-center gap-2 border-primary/20 bg-primary/5">
      <Clock className="w-4 h-4 text-primary" />
      <div className="text-sm font-medium text-primary">
        {isActive ? formatTime(elapsed) : "Completed"}
      </div>
    </Card>
  );
};

export default CompletionTimer;
