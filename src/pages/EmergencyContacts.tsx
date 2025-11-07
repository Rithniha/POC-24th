import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Phone, 
  Ambulance, 
  Flame, 
  Shield, 
  AlertTriangle,
  Heart,
  Baby,
  Building,
  MapPin,
  Copy
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const EmergencyContacts = () => {
  const { toast } = useToast();

  const copyToClipboard = (number: string) => {
    navigator.clipboard.writeText(number);
    toast({
      title: "Copied!",
      description: `${number} copied to clipboard`
    });
  };

  const nationalContacts = [
    {
      name: "National Emergency Number",
      number: "112",
      description: "Single emergency number for all services",
      icon: Phone,
      priority: "urgent",
      availability: "24/7"
    },
    {
      name: "Disaster Management Helpline", 
      number: "1070",
      description: "NDMA disaster response helpline",
      icon: AlertTriangle,
      priority: "high",
      availability: "24/7"
    },
    {
      name: "NDRF Emergency",
      number: "9711077372",
      description: "National Disaster Response Force",
      icon: Shield,
      priority: "high",
      availability: "24/7"
    },
    {
      name: "Ambulance",
      number: "102 / 108",
      description: "Medical emergency services",
      icon: Ambulance,
      priority: "urgent",
      availability: "24/7"
    },
    {
      name: "Fire Brigade",
      number: "101",
      description: "Fire emergency services",
      icon: Flame,
      priority: "urgent",
      availability: "24/7"
    },
    {
      name: "Police",
      number: "100",
      description: "Law enforcement emergency",
      icon: Shield,
      priority: "urgent",
      availability: "24/7"
    }
  ];

  const specialContacts = [
    {
      name: "NDMA Headquarters",
      number: "011-1078",
      description: "National Disaster Management Authority",
      icon: Building,
      priority: "medium",
      availability: "Office hours"
    },
    {
      name: "NDMA Control Room",
      number: "011-26701700",
      description: "NDMA emergency control room",
      icon: AlertTriangle,
      priority: "high",
      availability: "24/7"
    },
    {
      name: "Mumbai Municipal Control",
      number: "1916",
      description: "Local municipal emergency services",
      icon: MapPin,
      priority: "medium",
      availability: "24/7"
    },
    {
      name: "Child Helpline",
      number: "1098",
      description: "Emergency assistance for children",
      icon: Baby,
      priority: "medium",
      availability: "24/7"
    }
  ];

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case "urgent":
        return <Badge className="emergency-badge">Urgent</Badge>;
      case "high":
        return <Badge className="warning-badge">High</Badge>;
      default:
        return <Badge className="safety-badge">Standard</Badge>;
    }
  };

  const getIconColor = (priority: string) => {
    switch (priority) {
      case "urgent":
        return "text-emergency";
      case "high":
        return "text-warning";
      default:
        return "text-primary";
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-3xl font-bold text-foreground">Emergency Contacts</h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Keep these emergency numbers handy. In case of any disaster or emergency, 
          contact the appropriate helpline immediately.
        </p>
      </div>

      {/* Quick Dial - Most Important */}
      <Card className="bg-gradient-to-r from-emergency/10 to-warning/10 border-emergency/30">
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-emergency to-warning rounded-lg flex items-center justify-center">
              <Phone className="w-5 h-5 text-white" />
            </div>
            <div>
              <CardTitle className="text-xl text-emergency">Quick Emergency Dial</CardTitle>
              <CardDescription>For immediate life-threatening emergencies</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button 
              className="h-20 text-lg font-bold bg-emergency hover:bg-emergency/90"
              onClick={() => copyToClipboard("112")}
            >
              <div className="flex flex-col items-center gap-2">
                <Phone className="w-6 h-6" />
                <span>112</span>
                <span className="text-xs font-normal">All Emergencies</span>
              </div>
            </Button>
            <Button 
              className="h-20 text-lg font-bold bg-warning hover:bg-warning/90"
              onClick={() => copyToClipboard("1070")}
            >
              <div className="flex flex-col items-center gap-2">
                <AlertTriangle className="w-6 h-6" />
                <span>1070</span>
                <span className="text-xs font-normal">Disaster Help</span>
              </div>
            </Button>
            <Button 
              className="h-20 text-lg font-bold bg-primary hover:bg-primary/90"
              onClick={() => copyToClipboard("108")}
            >
              <div className="flex flex-col items-center gap-2">
                <Ambulance className="w-6 h-6" />
                <span>108</span>
                <span className="text-xs font-normal">Medical Emergency</span>
              </div>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* National Emergency Contacts */}
      <section className="space-y-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-primary to-safety rounded-lg flex items-center justify-center">
            <Shield className="w-5 h-5 text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-foreground">National Emergency Services</h2>
            <p className="text-muted-foreground">Primary emergency numbers for immediate assistance</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {nationalContacts.map((contact, index) => (
            <Card key={index} className="disaster-card">
              <CardHeader className="pb-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 bg-gradient-to-br from-primary to-safety rounded-lg flex items-center justify-center`}>
                      <contact.icon className={`w-5 h-5 text-white`} />
                    </div>
                    <div>
                      <CardTitle className="text-base">{contact.name}</CardTitle>
                      <CardDescription className="text-sm">{contact.description}</CardDescription>
                    </div>
                  </div>
                  {getPriorityBadge(contact.priority)}
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="text-2xl font-bold text-primary">{contact.number}</div>
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={() => copyToClipboard(contact.number)}
                    className="gap-2"
                  >
                    <Copy className="w-4 h-4" />
                    Copy
                  </Button>
                </div>
                <div className="text-sm text-muted-foreground">
                  Available: {contact.availability}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Special Services */}
      <section className="space-y-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-warning to-primary rounded-lg flex items-center justify-center">
            <Building className="w-5 h-5 text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-foreground">Specialized Services</h2>
            <p className="text-muted-foreground">Additional emergency and support services</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {specialContacts.map((contact, index) => (
            <Card key={index} className="disaster-card">
              <CardHeader className="pb-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-accent to-safety rounded-lg flex items-center justify-center">
                      <contact.icon className="w-5 h-5 text-accent-foreground" />
                    </div>
                    <div>
                      <CardTitle className="text-base">{contact.name}</CardTitle>
                      <CardDescription className="text-sm">{contact.description}</CardDescription>
                    </div>
                  </div>
                  {getPriorityBadge(contact.priority)}
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="text-2xl font-bold text-accent-foreground">{contact.number}</div>
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={() => copyToClipboard(contact.number)}
                    className="gap-2"
                  >
                    <Copy className="w-4 h-4" />
                    Copy
                  </Button>
                </div>
                <div className="text-sm text-muted-foreground">
                  Available: {contact.availability}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* How to Use Guide */}
      <Card className="bg-gradient-to-r from-safety/5 to-primary/5 border-safety/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Heart className="w-5 h-5 text-safety" />
            How to Use Emergency Contacts
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center space-y-2">
              <div className="w-12 h-12 bg-emergency/10 rounded-full flex items-center justify-center mx-auto">
                <Phone className="w-6 h-6 text-emergency" />
              </div>
              <h4 className="font-semibold">Immediate Danger</h4>
              <p className="text-sm text-muted-foreground">
                Dial <strong>112</strong> for any life-threatening emergency requiring immediate response
              </p>
            </div>
            <div className="text-center space-y-2">
              <div className="w-12 h-12 bg-warning/10 rounded-full flex items-center justify-center mx-auto">
                <AlertTriangle className="w-6 h-6 text-warning" />
              </div>
              <h4 className="font-semibold">Disaster Events</h4>
              <p className="text-sm text-muted-foreground">
                Contact <strong>NDRF/1070</strong> for disaster rescue and state emergency lines
              </p>
            </div>
            <div className="text-center space-y-2">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                <MapPin className="w-6 h-6 text-primary" />
              </div>
              <h4 className="font-semibold">Local Support</h4>
              <p className="text-sm text-muted-foreground">
                Keep national + city/district numbers handy for local emergency coordination
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default EmergencyContacts;