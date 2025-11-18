import { useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { X, RotateCcw } from "lucide-react";

interface VREarthquakeSimulationProps {
  onClose: () => void;
}

const VREarthquakeSimulation = ({ onClose }: VREarthquakeSimulationProps) => {
  const sceneRef = useRef<HTMLDivElement>(null);
  const isShakingRef = useRef(false);

  useEffect(() => {
    if (!sceneRef.current) return;

    // Create A-Frame scene
    const scene = document.createElement("a-scene");
    scene.setAttribute("vr-mode-ui", "enabled: false");
    scene.setAttribute("embedded", "");
    scene.setAttribute("style", "width: 100%; height: 100%;");
    
    // Sky/Environment
    const sky = document.createElement("a-sky");
    sky.setAttribute("color", "#87CEEB");
    scene.appendChild(sky);

    // Ground
    const ground = document.createElement("a-plane");
    ground.setAttribute("rotation", "-90 0 0");
    ground.setAttribute("width", "20");
    ground.setAttribute("height", "20");
    ground.setAttribute("color", "#8B7355");
    scene.appendChild(ground);

    // Room walls
    const createWall = (position: string, rotation: string, width: string, height: string) => {
      const wall = document.createElement("a-plane");
      wall.setAttribute("position", position);
      wall.setAttribute("rotation", rotation);
      wall.setAttribute("width", width);
      wall.setAttribute("height", height);
      wall.setAttribute("color", "#E8E8E8");
      scene.appendChild(wall);
    };

    // Back wall
    createWall("0 2.5 -5", "0 0 0", "10", "5");
    // Left wall
    createWall("-5 2.5 0", "0 90 0", "10", "5");
    // Right wall
    createWall("5 2.5 0", "0 -90 0", "10", "5");

    // Desk/Table (safe place to hide under)
    const desk = document.createElement("a-box");
    desk.setAttribute("position", "0 0.5 0");
    desk.setAttribute("width", "2");
    desk.setAttribute("height", "1");
    desk.setAttribute("depth", "1");
    desk.setAttribute("color", "#8B4513");
    desk.setAttribute("id", "desk");
    scene.appendChild(desk);

    // Chair
    const chair = document.createElement("a-box");
    chair.setAttribute("position", "0 0.3 -1.5");
    chair.setAttribute("width", "0.8");
    chair.setAttribute("height", "0.6");
    chair.setAttribute("depth", "0.8");
    chair.setAttribute("color", "#654321");
    scene.appendChild(chair);

    // Bookshelf
    const bookshelf = document.createElement("a-box");
    bookshelf.setAttribute("position", "-3 1.5 0");
    bookshelf.setAttribute("width", "1");
    bookshelf.setAttribute("height", "3");
    bookshelf.setAttribute("depth", "0.5");
    bookshelf.setAttribute("color", "#A0522D");
    scene.appendChild(bookshelf);

    // Warning text
    const text = document.createElement("a-text");
    text.setAttribute("value", "Earthquake in progress - Drop, Cover, Hold On!");
    text.setAttribute("position", "0 3 -4");
    text.setAttribute("align", "center");
    text.setAttribute("color", "#FF0000");
    text.setAttribute("scale", "2 2 2");
    text.setAttribute("id", "warning-text");
    scene.appendChild(text);

    // Camera
    const camera = document.createElement("a-camera");
    camera.setAttribute("position", "0 1.6 0");
    camera.setAttribute("id", "camera");
    scene.appendChild(camera);

    sceneRef.current.appendChild(scene);

    // Earthquake shaking animation
    const startEarthquake = () => {
      if (isShakingRef.current) return;
      isShakingRef.current = true;

      const camera = document.querySelector("#camera");
      const warningText = document.querySelector("#warning-text");
      if (!camera || !warningText) return;

      let startTime = Date.now();
      const duration = 8000; // 8 seconds

      const shake = () => {
        if (!isShakingRef.current) return;
        
        const elapsed = Date.now() - startTime;
        if (elapsed > duration) {
          isShakingRef.current = false;
          camera.setAttribute("position", "0 1.6 0");
          warningText.setAttribute("value", "Shaking stopped. Stay calm and check your surroundings.");
          warningText.setAttribute("color", "#00FF00");
          return;
        }

        // Random shake values
        const intensity = 1 - (elapsed / duration); // Decrease over time
        const x = (Math.random() - 0.5) * 0.3 * intensity;
        const y = (Math.random() - 0.5) * 0.3 * intensity;
        const z = (Math.random() - 0.5) * 0.3 * intensity;

        camera.setAttribute("position", `${x} ${1.6 + y} ${z}`);
        requestAnimationFrame(shake);
      };

      shake();
    };

    // Auto-start earthquake after 1 second
    setTimeout(startEarthquake, 1000);

    // Cleanup
    return () => {
      if (sceneRef.current && scene) {
        sceneRef.current.removeChild(scene);
      }
    };
  }, []);

  const handleRestart = () => {
    if (sceneRef.current) {
      sceneRef.current.innerHTML = "";
      isShakingRef.current = false;
      // Re-initialize
      const event = new Event("restart");
      window.dispatchEvent(event);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-background flex flex-col">
      <Card className="m-4 mb-0">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>VR Earthquake Simulation</CardTitle>
              <CardDescription>
                Experience a realistic earthquake scenario. Use mouse to look around, WASD to move.
              </CardDescription>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={handleRestart}>
                <RotateCcw className="w-4 h-4 mr-2" />
                Restart
              </Button>
              <Button variant="outline" size="sm" onClick={onClose}>
                <X className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </CardHeader>
      </Card>

      <div className="flex-1 relative bg-black rounded-lg m-4 mt-0 overflow-hidden">
        <div ref={sceneRef} className="w-full h-full" />
      </div>

      <Card className="m-4 mt-0">
        <CardContent className="pt-4">
          <div className="text-sm text-muted-foreground space-y-2">
            <p className="font-semibold text-foreground">Instructions:</p>
            <ul className="list-disc list-inside space-y-1 ml-2">
              <li>When the earthquake starts, DROP to your hands and knees</li>
              <li>COVER your head and neck under the desk</li>
              <li>HOLD ON until the shaking stops</li>
              <li>After shaking stops, check your surroundings carefully</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default VREarthquakeSimulation;
