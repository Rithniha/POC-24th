import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { CheckCircle, XCircle, HelpCircle } from "lucide-react";

interface QuizSectionProps {
  onComplete: (score: number) => void;
}

interface Question {
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

const QuizSection = ({ onComplete }: QuizSectionProps) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [correctAnswers, setCorrectAnswers] = useState(0);

  const questions: Question[] = [
    {
      question: "What causes most earthquakes?",
      options: [
        "Volcanic eruptions",
        "Movement of tectonic plates",
        "Underground water pressure",
        "Human mining activities"
      ],
      correctAnswer: 1,
      explanation: "Most earthquakes are caused by the sudden movement of tectonic plates along fault lines, releasing built-up stress and energy."
    },
    {
      question: "What does the Richter Scale measure?",
      options: [
        "The duration of the earthquake",
        "The depth of the earthquake",
        "The magnitude (energy released) of the earthquake",
        "The number of aftershocks"
      ],
      correctAnswer: 2,
      explanation: "The Richter Scale measures the magnitude or amount of energy released by an earthquake, with each whole number increase representing 10 times more amplitude."
    },
    {
      question: "What is the 'epicenter' of an earthquake?",
      options: [
        "The deepest point underground where the earthquake starts",
        "The point on Earth's surface directly above where the earthquake starts",
        "The area with the most damage",
        "The location of the strongest aftershock"
      ],
      correctAnswer: 1,
      explanation: "The epicenter is the point on Earth's surface directly above the focus (hypocenter), which is where the earthquake actually begins underground."
    },
    {
      question: "During an earthquake, what should you do if you're indoors?",
      options: [
        "Run outside immediately",
        "Stand in a doorway",
        "Drop, Cover, and Hold On",
        "Open all windows and doors"
      ],
      correctAnswer: 2,
      explanation: "'Drop, Cover, and Hold On' is the safest action: drop to your hands and knees, take cover under sturdy furniture, and hold on until shaking stops."
    },
    {
      question: "What magnitude earthquake is considered 'major'?",
      options: [
        "3.0-3.9",
        "4.0-4.9",
        "5.0-5.9",
        "6.0-6.9"
      ],
      correctAnswer: 3,
      explanation: "Earthquakes with magnitude 6.0-6.9 are classified as major and can cause serious damage in populated areas."
    },
    {
      question: "What should you check for first after an earthquake?",
      options: [
        "Broken windows",
        "Gas leaks",
        "Cracked walls",
        "Damaged furniture"
      ],
      correctAnswer: 1,
      explanation: "Gas leaks are the most dangerous immediate threat after an earthquake as they can cause fires and explosions. Check for gas smell and turn off gas if safe to do so."
    },
    {
      question: "What are aftershocks?",
      options: [
        "Smaller earthquakes that happen before the main quake",
        "Earthquakes that occur in different locations",
        "Smaller earthquakes that follow the main earthquake",
        "The psychological effects after an earthquake"
      ],
      correctAnswer: 2,
      explanation: "Aftershocks are smaller earthquakes that occur after the main earthquake in the same general area and can continue for weeks or months."
    },
    {
      question: "How much emergency water should you store per person?",
      options: [
        "1 liter per day for 1 day",
        "1 gallon per day for 3 days",
        "5 gallons per week",
        "Half a gallon per day for 1 week"
      ],
      correctAnswer: 1,
      explanation: "Emergency preparedness guidelines recommend storing at least 1 gallon of water per person per day for a minimum of 3 days."
    },
    {
      question: "If trapped under debris after an earthquake, what should you avoid?",
      options: [
        "Staying calm",
        "Tapping on pipes to signal rescuers",
        "Lighting a match",
        "Covering your mouth to reduce dust"
      ],
      correctAnswer: 2,
      explanation: "Never light a match when trapped as there may be gas leaks that could cause an explosion. Use tapping or your voice to signal rescuers instead."
    },
    {
      question: "What is the point inside Earth where an earthquake begins called?",
      options: [
        "Epicenter",
        "Focus or Hypocenter",
        "Fault line",
        "Tectonic point"
      ],
      correctAnswer: 1,
      explanation: "The focus (also called hypocenter) is the point inside Earth where the earthquake actually begins. The epicenter is directly above it on the surface."
    }
  ];

  const handleAnswerSelect = (value: string) => {
    setSelectedAnswer(parseInt(value));
  };

  const handleSubmit = () => {
    if (selectedAnswer === null) return;
    
    setShowFeedback(true);
    if (selectedAnswer === questions[currentQuestion].correctAnswer) {
      setCorrectAnswers(correctAnswers + 1);
    }
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setShowFeedback(false);
    } else {
      const score = Math.round((correctAnswers / questions.length) * 100);
      onComplete(score);
    }
  };

  const isCorrect = selectedAnswer === questions[currentQuestion].correctAnswer;
  const progress = ((currentQuestion + 1) / questions.length) * 100;

  return (
    <div className="space-y-6">
      <Card className="border-primary/20 bg-gradient-to-r from-primary/5 to-safety/5">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <HelpCircle className="w-6 h-6 text-primary" />
            Earthquake Safety Quiz
          </CardTitle>
          <CardDescription>
            Question {currentQuestion + 1} of {questions.length} • {Math.round(progress)}% Complete
          </CardDescription>
        </CardHeader>
      </Card>

      <Card className="disaster-card">
        <CardHeader>
          <CardTitle className="text-xl">
            {questions[currentQuestion].question}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <RadioGroup
            value={selectedAnswer?.toString()}
            onValueChange={handleAnswerSelect}
            disabled={showFeedback}
          >
            {questions[currentQuestion].options.map((option, index) => (
              <div
                key={index}
                className={`flex items-center space-x-3 p-4 rounded-lg border-2 transition-all ${
                  showFeedback
                    ? index === questions[currentQuestion].correctAnswer
                      ? "border-safety bg-safety-light"
                      : index === selectedAnswer
                      ? "border-emergency bg-emergency-light"
                      : "border-border"
                    : selectedAnswer === index
                    ? "border-primary bg-primary/5"
                    : "border-border hover:border-primary/50"
                }`}
              >
                <RadioGroupItem value={index.toString()} id={`option-${index}`} />
                <Label
                  htmlFor={`option-${index}`}
                  className="flex-1 cursor-pointer font-medium"
                >
                  {option}
                </Label>
                {showFeedback && index === questions[currentQuestion].correctAnswer && (
                  <CheckCircle className="w-5 h-5 text-safety" />
                )}
                {showFeedback && index === selectedAnswer && index !== questions[currentQuestion].correctAnswer && (
                  <XCircle className="w-5 h-5 text-emergency" />
                )}
              </div>
            ))}
          </RadioGroup>

          {showFeedback && (
            <Card className={`p-4 ${isCorrect ? 'bg-safety-light border-safety' : 'bg-warning-light border-warning'}`}>
              <div className="flex gap-2 items-start">
                {isCorrect ? (
                  <CheckCircle className="w-5 h-5 text-safety flex-shrink-0 mt-0.5" />
                ) : (
                  <XCircle className="w-5 h-5 text-emergency flex-shrink-0 mt-0.5" />
                )}
                <div>
                  <p className="font-semibold mb-1">
                    {isCorrect ? "Correct! Well done!" : "Not quite right."}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {questions[currentQuestion].explanation}
                  </p>
                </div>
              </div>
            </Card>
          )}

          <div className="flex justify-between items-center pt-4">
            <div className="text-sm text-muted-foreground">
              Score: {correctAnswers} / {currentQuestion + (showFeedback ? 1 : 0)}
            </div>
            {!showFeedback ? (
              <Button onClick={handleSubmit} disabled={selectedAnswer === null}>
                Submit Answer
              </Button>
            ) : (
              <Button onClick={handleNext}>
                {currentQuestion < questions.length - 1 ? "Next Question" : "Complete Quiz"}
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default QuizSection;
