import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Truck, MapPin, Clock, Navigation, Phone } from 'lucide-react';

interface AmbulanceData {
  id: string;
  driver: string;
  eta: string;
  distance: string;
  status: 'Dispatched' | 'En Route' | 'Arrived';
  currentLocation: string;
  phone: string;
}

interface AmbulanceTrackerProps {
  ambulanceData: AmbulanceData;
}

const AmbulanceTracker = ({ ambulanceData }: AmbulanceTrackerProps) => {
  const [currentEta, setCurrentEta] = useState(ambulanceData.eta);
  
  // Simulate real-time ETA updates
  useEffect(() => {
    const interval = setInterval(() => {
      const etaMinutes = parseInt(currentEta.replace(' min', ''));
      if (etaMinutes > 1) {
        setCurrentEta(`${etaMinutes - 1} min`);
      }
    }, 10000); // Update every 10 seconds for demo

    return () => clearInterval(interval);
  }, [currentEta]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Dispatched':
        return 'bg-yellow-500 text-white';
      case 'En Route':
        return 'bg-blue-500 text-white';
      case 'Arrived':
        return 'bg-green-500 text-white';
      default:
        return 'bg-gray-500 text-white';
    }
  };

  return (
    <Card className="w-full max-w-4xl mx-auto border-l-4 border-l-emergency">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-emergency/10 rounded-lg">
              <Truck className="h-6 w-6 text-emergency" />
            </div>
            <div>
              <CardTitle className="text-xl">Ambulance Dispatch</CardTitle>
              <CardDescription>Real-time tracking and updates</CardDescription>
            </div>
          </div>
          <Badge className={getStatusColor(ambulanceData.status)}>
            {ambulanceData.status}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Status Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center p-4 bg-blue-50 rounded-lg">
            <Clock className="h-8 w-8 text-blue-600 mx-auto mb-2" />
            <p className="text-2xl font-bold text-blue-600">{currentEta}</p>
            <p className="text-sm text-muted-foreground">Estimated Arrival</p>
          </div>
          
          <div className="text-center p-4 bg-green-50 rounded-lg">
            <Navigation className="h-8 w-8 text-green-600 mx-auto mb-2" />
            <p className="text-2xl font-bold text-green-600">{ambulanceData.distance}</p>
            <p className="text-sm text-muted-foreground">Distance Away</p>
          </div>
          
          <div className="text-center p-4 bg-purple-50 rounded-lg">
            <Truck className="h-8 w-8 text-purple-600 mx-auto mb-2" />
            <p className="text-lg font-bold text-purple-600">{ambulanceData.id}</p>
            <p className="text-sm text-muted-foreground">Ambulance ID</p>
          </div>
        </div>

        {/* Map Placeholder */}
        <div className="bg-gray-100 rounded-lg h-64 flex items-center justify-center relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-100 to-green-100"></div>
          <div className="relative z-10 text-center">
            <MapPin className="h-12 w-12 text-primary mx-auto mb-4" />
            <p className="text-lg font-semibold text-gray-700">Interactive Map View</p>
            <p className="text-sm text-gray-500 mt-2">
              Real-time ambulance location: {ambulanceData.currentLocation}
            </p>
            <div className="mt-4 flex items-center justify-center gap-4">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                <span className="text-sm">Ambulance Location</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                <span className="text-sm">Your Location</span>
              </div>
            </div>
          </div>
        </div>

        {/* Driver Info & Actions */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 p-4 bg-gray-50 rounded-lg">
          <div>
            <p className="font-medium">Driver: {ambulanceData.driver}</p>
            <p className="text-sm text-muted-foreground">Certified Emergency Medical Technician</p>
          </div>
          
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <Phone className="h-4 w-4 mr-2" />
              Call Driver: {ambulanceData.phone}
            </Button>
          </div>
        </div>

        {/* Status Updates */}
        <div className="space-y-2">
          <h4 className="font-medium">Live Updates</h4>
          <div className="space-y-2 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span className="text-green-700">Ambulance dispatched and en route</span>
              <span className="text-muted-foreground ml-auto">Just now</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <span>Medical team prepared at destination hospital</span>
              <span className="text-muted-foreground ml-auto">30 sec ago</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
              <span>Emergency request processed and validated</span>
              <span className="text-muted-foreground ml-auto">1 min ago</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AmbulanceTracker;