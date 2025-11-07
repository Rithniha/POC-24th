import { AlertTriangle, X } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";

const AlertBox = () => {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <div className="alert-box mx-6 mt-4 relative">
      <div className="flex items-start gap-3">
        <AlertTriangle className="w-5 h-5 text-warning mt-0.5 flex-shrink-0" />
        <div className="flex-1">
          <h4 className="font-medium text-warning-foreground">Weather Alert</h4>
          <p className="text-sm text-warning-foreground/80 mt-1">
            Heavy rainfall expected in Mumbai region. Please review flood safety protocols and ensure emergency kits are ready.
          </p>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setIsVisible(false)}
          className="text-warning-foreground/60 hover:text-warning-foreground p-1 h-auto"
        >
          <X className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
};

export default AlertBox;