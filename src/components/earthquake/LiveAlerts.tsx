import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Activity, MapPin, Clock, TrendingUp } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";

interface EarthquakeEvent {
  id: string;
  magnitude: number;
  location: string;
  depth: number;
  time: string;
  latitude: number;
  longitude: number;
}

const LiveAlerts = () => {
  const [earthquakes, setEarthquakes] = useState<EarthquakeEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [lastUpdate, setLastUpdate] = useState<Date>(new Date());

  const fetchEarthquakes = async () => {
    try {
      // Using USGS Earthquake API for real data
      const response = await fetch(
        'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/2.5_day.geojson'
      );
      const data = await response.json();
      
      const events: EarthquakeEvent[] = data.features.slice(0, 10).map((feature: any) => ({
        id: feature.id,
        magnitude: feature.properties.mag,
        location: feature.properties.place,
        depth: feature.geometry.coordinates[2],
        time: new Date(feature.properties.time).toLocaleString(),
        latitude: feature.geometry.coordinates[1],
        longitude: feature.geometry.coordinates[0]
      }));
      
      setEarthquakes(events);
      setLastUpdate(new Date());
      setLoading(false);
    } catch (error) {
      console.error('Error fetching earthquake data:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEarthquakes();
    // Refresh every 5 minutes
    const interval = setInterval(fetchEarthquakes, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  const getMagnitudeBadge = (magnitude: number) => {
    if (magnitude >= 6.0) return <Badge className="emergency-badge">Major</Badge>;
    if (magnitude >= 5.0) return <Badge className="warning-badge">Strong</Badge>;
    if (magnitude >= 4.0) return <Badge className="safety-badge">Moderate</Badge>;
    return <Badge variant="outline">Minor</Badge>;
  };

  const getMagnitudeColor = (magnitude: number) => {
    if (magnitude >= 6.0) return "text-emergency";
    if (magnitude >= 5.0) return "text-warning";
    if (magnitude >= 4.0) return "text-safety";
    return "text-muted-foreground";
  };

  return (
    <Card className="disaster-card border-primary/20">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Activity className="w-5 h-5 text-primary animate-pulse" />
              Live Earthquake Activity
            </CardTitle>
            <CardDescription>
              Real-time data from USGS - Magnitude 2.5+ in the last 24 hours
            </CardDescription>
          </div>
          <div className="text-right">
            <div className="text-xs text-muted-foreground flex items-center gap-1">
              <Clock className="w-3 h-3" />
              Updated: {lastUpdate.toLocaleTimeString()}
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="flex items-center justify-center p-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>
        ) : (
          <ScrollArea className="h-[400px] pr-4">
            <div className="space-y-3">
              {earthquakes.map((earthquake) => (
                <Card
                  key={earthquake.id}
                  className="p-4 bg-card hover:bg-accent/5 transition-colors border-border"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 space-y-2">
                      <div className="flex items-center gap-2 flex-wrap">
                        <div className={`text-2xl font-bold ${getMagnitudeColor(earthquake.magnitude)}`}>
                          {earthquake.magnitude.toFixed(1)}
                        </div>
                        {getMagnitudeBadge(earthquake.magnitude)}
                      </div>
                      
                      <div className="space-y-1">
                        <div className="flex items-start gap-2">
                          <MapPin className="w-4 h-4 text-muted-foreground mt-0.5 flex-shrink-0" />
                          <span className="text-sm font-medium">{earthquake.location}</span>
                        </div>
                        
                        <div className="flex items-center gap-4 text-xs text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <TrendingUp className="w-3 h-3" />
                            Depth: {earthquake.depth.toFixed(1)} km
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {earthquake.time}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </ScrollArea>
        )}
        
        <div className="mt-4 p-3 bg-muted/50 rounded-lg">
          <p className="text-xs text-muted-foreground">
            Data provided by USGS Earthquake Hazards Program. This information is automatically updated every 5 minutes.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default LiveAlerts;
