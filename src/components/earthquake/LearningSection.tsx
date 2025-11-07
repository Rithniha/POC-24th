import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Mountain, AlertTriangle, Shield, Gauge, Activity, CheckCircle } from "lucide-react";

interface LearningSectionProps {
  onComplete: () => void;
}

const LearningSection = ({ onComplete }: LearningSectionProps) => {
  const [completedSections, setCompletedSections] = useState<string[]>([]);

  const sections = [
    {
      id: "causes",
      title: "What Causes Earthquakes?",
      icon: Mountain,
      color: "text-primary",
      content: [
        "Earthquakes are caused by the sudden release of energy in Earth's crust, creating seismic waves.",
        "The Earth's crust is made up of tectonic plates that slowly move and sometimes collide or slide past each other.",
        "When stress along fault lines exceeds the strength of rocks, it causes them to break and shift suddenly.",
        "Most earthquakes occur at plate boundaries, but they can also happen within plates at fault zones.",
        "The point inside the Earth where the earthquake starts is called the 'focus' or 'hypocenter'.",
        "The point directly above it on the surface is called the 'epicenter'."
      ]
    },
    {
      id: "measurement",
      title: "How We Measure Earthquakes",
      icon: Gauge,
      color: "text-safety",
      content: [
        "Earthquakes are measured using seismographs, which detect and record ground motion.",
        "The Richter Scale measures the magnitude (energy released) from 1 to 10, with each number being 10 times stronger.",
        "The Moment Magnitude Scale (Mw) is more accurate for large earthquakes and measures the total energy released.",
        "Minor earthquakes: Magnitude 3.0-3.9 (often felt, rarely causes damage)",
        "Moderate earthquakes: Magnitude 4.0-4.9 (noticeable shaking, some damage)",
        "Strong earthquakes: Magnitude 5.0-5.9 (can cause damage to buildings)",
        "Major earthquakes: Magnitude 6.0-6.9 (serious damage in populated areas)",
        "Great earthquakes: Magnitude 7.0+ (widespread heavy damage and casualties)"
      ]
    },
    {
      id: "before",
      title: "Safety Tips: Before an Earthquake",
      icon: Shield,
      color: "text-warning",
      content: [
        "Identify safe spots in each room: under sturdy tables, desks, or against interior walls.",
        "Practice 'Drop, Cover, and Hold On' drills with your family regularly.",
        "Secure heavy items like bookshelves, water heaters, and mirrors to walls.",
        "Keep emergency supplies ready: water (1 gallon per person per day for 3 days), food, first aid kit.",
        "Learn how to turn off gas, water, and electricity in case lines are damaged.",
        "Keep important documents in a waterproof, fireproof container.",
        "Develop a family communication plan with an out-of-state contact person.",
        "Consider earthquake insurance if you live in a high-risk area."
      ]
    },
    {
      id: "during",
      title: "Safety Tips: During an Earthquake",
      icon: AlertTriangle,
      color: "text-emergency",
      content: [
        "DROP to your hands and knees before the earthquake knocks you down.",
        "COVER your head and neck under a sturdy table or desk. If no shelter, cover your head with your arms.",
        "HOLD ON to your shelter and be prepared to move with it until shaking stops.",
        "If indoors, stay inside! Don't run outside during shaking—most injuries occur when entering/leaving buildings.",
        "If in bed, stay there and cover your head with a pillow.",
        "If outdoors, move away from buildings, streetlights, and utility wires.",
        "If in a moving vehicle, stop as quickly and safely as possible and stay inside.",
        "If trapped under debris, don't light a match or move about, tap on a pipe or wall to alert rescuers."
      ]
    },
    {
      id: "after",
      title: "Safety Tips: After an Earthquake",
      icon: Activity,
      color: "text-primary",
      content: [
        "Expect aftershocks—they can occur for weeks or even months after the main quake.",
        "Check yourself and others for injuries. Provide first aid if needed.",
        "Inspect your home for damage. If it's unsafe, evacuate immediately.",
        "Check for gas leaks. If you smell gas, open windows and leave. Turn off gas at the meter if safe to do so.",
        "Check water, gas, and electrical lines. Turn off damaged utilities.",
        "Open cabinets cautiously as contents may have shifted and could fall out.",
        "Clean up spilled medicines, bleach, gasoline, or other flammable liquids immediately.",
        "Use your phone only for emergencies to keep lines clear for emergency calls.",
        "Stay out of damaged buildings and away from beaches—tsunamis may follow earthquakes.",
        "Listen to emergency broadcasts for updates and instructions."
      ]
    }
  ];

  const toggleSection = (id: string) => {
    if (!completedSections.includes(id)) {
      setCompletedSections([...completedSections, id]);
    }
  };

  const allSectionsCompleted = completedSections.length === sections.length;

  return (
    <div className="space-y-6">
      <Card className="border-primary/20 bg-gradient-to-r from-primary/5 to-safety/5">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Mountain className="w-6 h-6 text-primary" />
            Interactive Earthquake Learning Module
          </CardTitle>
          <CardDescription>
            Expand each section to learn about earthquakes. Mark sections as complete to unlock the quiz!
          </CardDescription>
        </CardHeader>
      </Card>

      <Accordion type="single" collapsible className="space-y-4">
        {sections.map((section) => {
          const Icon = section.icon;
          const isCompleted = completedSections.includes(section.id);
          
          return (
            <AccordionItem key={section.id} value={section.id} className="border-none">
              <Card className="disaster-card overflow-hidden">
                <AccordionTrigger 
                  className="px-6 py-4 hover:no-underline"
                  onClick={() => toggleSection(section.id)}
                >
                  <div className="flex items-center gap-4 flex-1">
                    <div className={`w-12 h-12 bg-gradient-to-br ${section.color === 'text-primary' ? 'from-primary to-primary' : section.color === 'text-safety' ? 'from-safety to-safety' : section.color === 'text-warning' ? 'from-warning to-warning' : 'from-emergency to-emergency'} rounded-lg flex items-center justify-center flex-shrink-0`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <div className="text-left">
                      <h3 className="text-lg font-semibold">{section.title}</h3>
                    </div>
                    {isCompleted && (
                      <CheckCircle className="w-5 h-5 text-safety ml-auto" />
                    )}
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <CardContent className="px-6 pb-6 pt-2">
                    <ul className="space-y-3">
                      {section.content.map((point, idx) => (
                        <li key={idx} className="flex gap-3 items-start animate-fade-in">
                          <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                          <span className="text-muted-foreground leading-relaxed">{point}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </AccordionContent>
              </Card>
            </AccordionItem>
          );
        })}
      </Accordion>

      <Card className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-semibold mb-1">Learning Progress</h3>
            <p className="text-sm text-muted-foreground">
              {completedSections.length} of {sections.length} sections completed
            </p>
          </div>
          <Button 
            onClick={onComplete}
            disabled={!allSectionsCompleted}
            className="gap-2"
          >
            {allSectionsCompleted ? "Start Quiz" : "Complete All Sections First"}
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default LearningSection;
