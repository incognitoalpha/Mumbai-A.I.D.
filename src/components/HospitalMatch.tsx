import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { MapPin, Phone, Clock, User, Star } from 'lucide-react';

interface Doctor {
  name: string;
  specialization: string;
  experience: string;
  rating: number;
}

interface Hospital {
  name: string;
  address: string;
  distance: string;
  eta: string;
  specializations: string[];
  capacity: string;
  doctor: Doctor;
  phone: string;
}

interface HospitalMatchProps {
  hospital: Hospital;
  onCallDoctor: () => void;
}

const HospitalMatch = ({ hospital, onCallDoctor }: HospitalMatchProps) => {
  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="text-xl flex items-center gap-2">
          <MapPin className="h-5 w-5 text-primary" />
          Recommended Hospital & Medical Team
        </CardTitle>
        <CardDescription>Best match based on condition and proximity</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Hospital Info */}
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-semibold text-primary">{hospital.name}</h3>
              <p className="text-sm text-muted-foreground flex items-center gap-1 mt-1">
                <MapPin className="h-4 w-4" />
                {hospital.address}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <p className="text-sm font-medium">Distance</p>
                <p className="text-lg font-semibold text-blue-600">{hospital.distance}</p>
              </div>
              <div className="space-y-1">
                <p className="text-sm font-medium">ETA</p>
                <p className="text-lg font-semibold text-green-600 flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  {hospital.eta}
                </p>
              </div>
            </div>

            <div className="space-y-2">
              <p className="text-sm font-medium">Specializations</p>
              <div className="flex flex-wrap gap-2">
                {hospital.specializations.map((spec, index) => (
                  <Badge key={index} variant="outline" className="text-xs">
                    {spec}
                  </Badge>
                ))}
              </div>
            </div>

            <div className="space-y-1">
              <p className="text-sm font-medium">Current Capacity</p>
              <p className="text-sm text-green-600 font-medium">{hospital.capacity}</p>
            </div>
          </div>

          {/* Doctor Info */}
          <div className="space-y-4 border-l pl-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <User className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <h4 className="font-semibold text-lg">Dr. {hospital.doctor.name}</h4>
                <p className="text-sm text-muted-foreground">{hospital.doctor.specialization}</p>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Star className="h-4 w-4 text-yellow-500 fill-current" />
                <span className="font-medium">{hospital.doctor.rating}/5.0</span>
                <span className="text-sm text-muted-foreground">Rating</span>
              </div>
              <p className="text-sm text-muted-foreground">
                {hospital.doctor.experience} of experience
              </p>
            </div>

            <div className="space-y-3 pt-4">
              <Button 
                variant="emergency" 
                className="w-full"
                onClick={onCallDoctor}
              >
                <Phone className="h-4 w-4 mr-2" />
                Video Call with Doctor
              </Button>
              
              <Button variant="outline" className="w-full">
                <Phone className="h-4 w-4 mr-2" />
                Call Hospital: {hospital.phone}
              </Button>
            </div>
          </div>
        </div>

        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <h5 className="font-medium text-green-900 mb-2">Status Update</h5>
          <p className="text-sm text-green-800">
            Hospital has been notified and is preparing for incoming patient. 
            Medical team is standing by for video consultation.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default HospitalMatch;