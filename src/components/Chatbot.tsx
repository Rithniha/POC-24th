import { useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  MessageCircle, 
  X, 
  Send, 
  Bot, 
  User,
  AlertTriangle,
  BookOpen,
  Phone,
  Target
} from "lucide-react";

interface Message {
  id: string;
  content: string;
  isBot: boolean;
  timestamp: Date;
  type?: 'suggestion' | 'normal';
}

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: "Hi! I'm your disaster preparedness assistant. I can help you with safety tips, learning modules, emergency contacts, and drill guidance. How can I help you today?",
      isBot: true,
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const quickSuggestions = [
    { text: "Emergency contacts", icon: Phone, type: "emergency" },
    { text: "Safety tips", icon: AlertTriangle, type: "safety" },
    { text: "Learning modules", icon: BookOpen, type: "learning" },
    { text: "Virtual drills", icon: Target, type: "drills" }
  ];

  const generateBotResponse = (userMessage: string): string => {
    const message = userMessage.toLowerCase();
    
    if (message.includes('emergency') || message.includes('contact') || message.includes('help')) {
      return "For emergencies, immediately dial 112 (National Emergency Number). For disasters, contact NDRF at 9711077372. You can find all emergency contacts in the Emergency Contacts section of your dashboard.";
    }
    
    if (message.includes('earthquake')) {
      return "For earthquakes, remember: DROP to your hands and knees, COVER your head and neck under a sturdy table, and HOLD ON until shaking stops. Avoid doorways and windows. Check out our Earthquake module for detailed guidance!";
    }
    
    if (message.includes('fire')) {
      return "In case of fire: Stay low to avoid smoke, feel doors before opening them, have an escape route planned, and never use elevators. Practice our Fire Evacuation drill for hands-on training!";
    }
    
    if (message.includes('flood')) {
      return "During floods: Move to higher ground immediately, avoid walking/driving through flood water, stay away from electrical equipment, and listen to emergency broadcasts. Our Flood Safety module has comprehensive information.";
    }
    
    if (message.includes('drill') || message.includes('practice')) {
      return "Our Virtual Drills section offers traditional simulations and new AR/VR experiences! Try the earthquake 'Drop, Cover, Hold On' drill or the immersive VR flood response training.";
    }
    
    if (message.includes('module') || message.includes('learn')) {
      return "Check out our Learning Modules section for interactive articles, infographics, and videos about disaster preparedness. Each module includes quizzes to test your knowledge!";
    }
    
    if (message.includes('progress') || message.includes('badge')) {
      return "Track your learning progress in the Progress Tracker section. Earn badges like 'Earthquake Ready', 'Flood Expert', and 'Fire Safety Pro' as you complete modules and drills!";
    }
    
    if (message.includes('ar') || message.includes('vr') || message.includes('virtual reality')) {
      return "Our new AR/VR experiences offer immersive disaster training! Try VR earthquake simulation with 360° environments or AR fire evacuation with real environment overlay. Check device requirements first!";
    }
    
    return "I'm here to help with disaster preparedness questions! Ask me about emergency procedures, learning modules, virtual drills, safety tips, or anything related to staying safe during disasters.";
  };

  const handleSendMessage = async (messageText?: string) => {
    const textToSend = messageText || inputValue.trim();
    if (!textToSend) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: textToSend,
      isBot: false,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue("");
    setIsTyping(true);

    // Simulate typing delay
    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        content: generateBotResponse(textToSend),
        isBot: true,
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 1500);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  return (
    <>
      {/* Floating Chat Button */}
      {!isOpen && (
        <Button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 w-14 h-14 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 z-50 bg-gradient-to-r from-primary to-safety"
          size="icon"
        >
          <MessageCircle className="w-6 h-6" />
        </Button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <Card className="fixed bottom-6 right-6 w-96 h-[500px] shadow-2xl z-50 flex flex-col animate-scale-in">
          <CardHeader className="pb-3 bg-gradient-to-r from-primary to-safety text-white rounded-t-lg">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                  <Bot className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-semibold text-sm">Safety Assistant</h3>
                  <p className="text-xs text-white/80">Always here to help</p>
                </div>
              </div>
              <Button
                onClick={() => setIsOpen(false)}
                variant="ghost"
                size="icon"
                className="text-white hover:bg-white/20 w-8 h-8"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          </CardHeader>

          <CardContent className="flex-1 flex flex-col p-0">
            {/* Messages */}
            <ScrollArea className="flex-1 p-4">
              <div className="space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex gap-2 ${message.isBot ? '' : 'justify-end'}`}
                  >
                    {message.isBot && (
                      <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                        <Bot className="w-3 h-3 text-primary" />
                      </div>
                    )}
                    
                    <div
                      className={`max-w-[80%] p-3 rounded-lg text-sm ${
                        message.isBot
                          ? 'bg-muted text-foreground'
                          : 'bg-primary text-primary-foreground ml-auto'
                      }`}
                    >
                      {message.content}
                    </div>

                    {!message.isBot && (
                      <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                        <User className="w-3 h-3 text-primary-foreground" />
                      </div>
                    )}
                  </div>
                ))}

                {isTyping && (
                  <div className="flex gap-2">
                    <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <Bot className="w-3 h-3 text-primary" />
                    </div>
                    <div className="bg-muted p-3 rounded-lg">
                      <div className="flex gap-1">
                        <div className="w-2 h-2 bg-muted-foreground/50 rounded-full animate-pulse"></div>
                        <div className="w-2 h-2 bg-muted-foreground/50 rounded-full animate-pulse delay-100"></div>
                        <div className="w-2 h-2 bg-muted-foreground/50 rounded-full animate-pulse delay-200"></div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </ScrollArea>

            {/* Quick Suggestions */}
            {messages.length <= 1 && (
              <div className="p-4 border-t">
                <p className="text-xs text-muted-foreground mb-2">Quick suggestions:</p>
                <div className="grid grid-cols-2 gap-2">
                  {quickSuggestions.map((suggestion, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      size="sm"
                      className="h-8 text-xs justify-start"
                      onClick={() => handleSendMessage(suggestion.text)}
                    >
                      <suggestion.icon className="w-3 h-3 mr-1" />
                      {suggestion.text}
                    </Button>
                  ))}
                </div>
              </div>
            )}

            {/* Input */}
            <div className="p-4 border-t">
              <div className="flex gap-2">
                <Input
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Ask about safety tips, drills, or emergencies..."
                  className="flex-1"
                />
                <Button
                  onClick={() => handleSendMessage()}
                  size="icon"
                  disabled={!inputValue.trim() || isTyping}
                >
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </>
  );
};

export default Chatbot;