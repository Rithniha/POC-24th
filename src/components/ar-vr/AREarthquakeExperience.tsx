import { useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { X, Download } from "lucide-react";

interface AREarthquakeExperienceProps {
  onClose: () => void;
}

const AREarthquakeExperience = ({ onClose }: AREarthquakeExperienceProps) => {
  const sceneRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sceneRef.current) return;

    // Create AR.js scene
    const scene = document.createElement("a-scene");
    scene.setAttribute("vr-mode-ui", "enabled: false");
    scene.setAttribute("embedded", "");
    scene.setAttribute("arjs", "sourceType: webcam; videoTexture: true; debugUIEnabled: false;");
    scene.setAttribute("style", "width: 100%; height: 100%;");

    // Marker (Hiro marker - default AR.js marker)
    const marker = document.createElement("a-marker");
    marker.setAttribute("type", "pattern");
    marker.setAttribute("preset", "hiro");
    marker.setAttribute("id", "marker");

    // 3D Building model (simple box representing a building)
    const building = document.createElement("a-box");
    building.setAttribute("position", "0 1 0");
    building.setAttribute("width", "1");
    building.setAttribute("height", "2");
    building.setAttribute("depth", "1");
    building.setAttribute("color", "#8B7355");
    building.setAttribute("id", "building");
    building.setAttribute("animation", "property: rotation; to: 0 360 0; loop: true; dur: 10000");
    marker.appendChild(building);

    // Shaking animation for building
    const shakeAnimation = document.createElement("a-animation");
    shakeAnimation.setAttribute("attribute", "position");
    shakeAnimation.setAttribute("dur", "200");
    shakeAnimation.setAttribute("repeat", "indefinite");
    shakeAnimation.setAttribute("from", "0 1 0");
    shakeAnimation.setAttribute("to", "0.1 1.1 0.1");
    building.appendChild(shakeAnimation);

    // Warning text
    const text = document.createElement("a-text");
    text.setAttribute("value", "Stay calm and find safe cover");
    text.setAttribute("position", "0 2.5 0");
    text.setAttribute("align", "center");
    text.setAttribute("color", "#FF0000");
    text.setAttribute("scale", "1.5 1.5 1.5");
    marker.appendChild(text);

    scene.appendChild(marker);

    // Camera
    const camera = document.createElement("a-entity");
    camera.setAttribute("camera", "");
    scene.appendChild(camera);

    sceneRef.current.appendChild(scene);

    // Cleanup
    return () => {
      if (sceneRef.current && scene) {
        sceneRef.current.removeChild(scene);
      }
    };
  }, []);

  return (
    <div className="fixed inset-0 z-50 bg-background flex flex-col">
      <Card className="m-4 mb-0">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>AR Earthquake Experience</CardTitle>
              <CardDescription>
                Point your camera at the Hiro marker to see the earthquake simulation.
              </CardDescription>
            </div>
            <Button variant="outline" size="sm" onClick={onClose}>
              <X className="w-4 h-4" />
            </Button>
          </div>
        </CardHeader>
      </Card>

      <div className="flex-1 relative bg-black rounded-lg m-4 mt-0 overflow-hidden">
        <div ref={sceneRef} className="w-full h-full" />
      </div>

      <Card className="m-4 mt-0">
        <CardContent className="pt-4 space-y-4">
          <div className="text-sm text-muted-foreground space-y-2">
            <p className="font-semibold text-foreground">How to use:</p>
            <ol className="list-decimal list-inside space-y-1 ml-2">
              <li>Print or display the Hiro marker on another device</li>
              <li>Allow camera access when prompted</li>
              <li>Point your camera at the marker</li>
              <li>Watch the building shake and follow the safety instructions</li>
            </ol>
          </div>
          
          <div className="flex gap-2">
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => {
                window.open("https://jeromeetienne.github.io/AR.js/data/images/HIRO.jpg", "_blank");
              }}
            >
              <Download className="w-4 h-4 mr-2" />
              Download Hiro Marker
            </Button>
            <div className="text-xs text-muted-foreground flex items-center">
              The marker will appear in a new tab. Print it or display on another screen.
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AREarthquakeExperience;
