import { useEffect, useRef } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin } from "lucide-react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

const EarthquakeMap = () => {
  const mapRef = useRef<L.Map | null>(null);
  const mapContainerRef = useRef<HTMLDivElement>(null);

  // Major earthquake-prone zones around the world
  const earthquakeZones = [
    {
      name: "Pacific Ring of Fire - Japan",
      position: [36.2048, 138.2529] as [number, number],
      risk: "Very High",
      color: "#ef4444",
      radius: 200000,
      info: "One of the most seismically active regions. Home to 75% of world's volcanoes."
    },
    {
      name: "Pacific Ring of Fire - Indonesia",
      position: [-2.5489, 118.0149] as [number, number],
      risk: "Very High",
      color: "#ef4444",
      radius: 250000,
      info: "Sits on the convergence of multiple tectonic plates."
    },
    {
      name: "San Andreas Fault - California",
      position: [36.5, -120.5] as [number, number],
      risk: "High",
      color: "#f97316",
      radius: 150000,
      info: "Transform boundary between Pacific and North American plates."
    },
    {
      name: "Himalayan Belt - Nepal",
      position: [28.3949, 84.1240] as [number, number],
      risk: "High",
      color: "#f97316",
      radius: 180000,
      info: "Collision zone of Indian and Eurasian plates."
    },
    {
      name: "Alpide Belt - Turkey",
      position: [38.9637, 35.2433] as [number, number],
      risk: "High",
      color: "#f97316",
      radius: 160000,
      info: "Part of the Alpine-Himalayan belt, frequent seismic activity."
    },
    {
      name: "Pacific Ring of Fire - Chile",
      position: [-35.6751, -71.5430] as [number, number],
      risk: "Very High",
      color: "#ef4444",
      radius: 200000,
      info: "Site of the strongest earthquake ever recorded (1960)."
    },
    {
      name: "New Zealand Fault System",
      position: [-41.2865, 174.7762] as [number, number],
      risk: "High",
      color: "#f97316",
      radius: 120000,
      info: "Located on the boundary of Pacific and Australian plates."
    },
    {
      name: "Mediterranean Region - Italy",
      position: [41.8719, 12.5674] as [number, number],
      risk: "Moderate",
      color: "#eab308",
      radius: 100000,
      info: "Complex plate boundary with frequent moderate earthquakes."
    }
  ];

  useEffect(() => {
    if (!mapContainerRef.current || mapRef.current) return;

    // Initialize map
    const map = L.map(mapContainerRef.current, {
      center: [20, 0],
      zoom: 2,
      scrollWheelZoom: false
    });

    mapRef.current = map;

    // Add tile layer
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    // Add earthquake zones
    earthquakeZones.forEach((zone) => {
      // Add circle
      L.circle(zone.position, {
        color: zone.color,
        fillColor: zone.color,
        fillOpacity: 0.2,
        radius: zone.radius,
        weight: 2
      }).addTo(map);

      // Create custom icon
      const customIcon = L.icon({
        iconUrl: `data:image/svg+xml;base64,${btoa(`
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="${zone.color}" width="32" height="32">
            <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
          </svg>
        `)}`,
        iconSize: [32, 32],
        iconAnchor: [16, 32],
        popupAnchor: [0, -32]
      });

      // Add marker with popup
      L.marker(zone.position, { icon: customIcon })
        .bindPopup(`
          <div class="p-2">
            <h3 class="font-bold mb-1">${zone.name}</h3>
            <p class="text-sm mb-2">
              <span class="font-semibold">Risk Level: </span>
              <span style="color: ${zone.color}">${zone.risk}</span>
            </p>
            <p class="text-sm text-gray-600">${zone.info}</p>
          </div>
        `)
        .addTo(map);
    });

    // Cleanup
    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, []);

  return (
    <Card className="disaster-card overflow-hidden">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MapPin className="w-5 h-5 text-primary" />
          Global Earthquake-Prone Zones
        </CardTitle>
        <CardDescription>
          Interactive map showing major earthquake zones around the world. Click markers for details.
        </CardDescription>
      </CardHeader>
      <CardContent className="p-0">
        <div className="h-[500px] w-full relative" ref={mapContainerRef} />
        
        {/* Legend */}
        <div className="p-4 bg-muted/50 border-t border-border">
          <h4 className="font-semibold mb-2 text-sm">Risk Levels</h4>
          <div className="flex flex-wrap gap-4">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full bg-[#ef4444]" />
              <span className="text-sm">Very High Risk</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full bg-[#f97316]" />
              <span className="text-sm">High Risk</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full bg-[#eab308]" />
              <span className="text-sm">Moderate Risk</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default EarthquakeMap;
