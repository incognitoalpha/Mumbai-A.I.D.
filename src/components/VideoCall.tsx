import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Video, 
  VideoOff, 
  Mic, 
  MicOff, 
  Phone, 
  PhoneOff, 
  User, 
  Clock,
  MessageSquare
} from 'lucide-react';

interface VideoCallProps {
  doctorName: string;
  onEndCall: () => void;
}

const VideoCall = ({ doctorName, onEndCall }: VideoCallProps) => {
  const [isVideoOn, setIsVideoOn] = useState(true);
  const [isMicOn, setIsMicOn] = useState(true);
  const [callDuration, setCallDuration] = useState('02:34');

  return (
    <Card className="w-full max-w-6xl mx-auto">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-xl flex items-center gap-2">
              <Video className="h-5 w-5 text-primary" />
              Emergency Medical Consultation
            </CardTitle>
            <CardDescription>Video call with Dr. {doctorName}</CardDescription>
          </div>
          <div className="flex items-center gap-4">
            <Badge className="bg-green-500 text-white">
              <div className="w-2 h-2 bg-white rounded-full mr-2 animate-pulse"></div>
              Live
            </Badge>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Clock className="h-4 w-4" />
              {callDuration}
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Video Interface */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 h-96">
          {/* Doctor's Video */}
          <div className="lg:col-span-2 bg-gray-900 rounded-lg relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-blue-800 flex items-center justify-center">
              <div className="text-center text-white">
                <div className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <User className="h-12 w-12" />
                </div>
                <p className="text-xl font-semibold">Dr. {doctorName}</p>
                <p className="text-blue-200">Emergency Medicine Specialist</p>
              </div>
            </div>
            
            {/* Patient's small video in corner */}
            <div className="absolute bottom-4 right-4 w-32 h-24 bg-gray-700 rounded-lg flex items-center justify-center">
              <div className="text-white text-center">
                <User className="h-6 w-6 mx-auto mb-1" />
                <p className="text-xs">You</p>
              </div>
            </div>
          </div>

          {/* Chat/Info Panel */}
          <div className="bg-gray-50 rounded-lg p-4 space-y-4">
            <div>
              <h4 className="font-medium text-sm mb-2">Consultation Notes</h4>
              <div className="text-xs text-muted-foreground space-y-2">
                <p>• Patient symptoms: Chest pain, difficulty breathing</p>
                <p>• Vital signs being monitored</p>
                <p>• Ambulance ETA: 8 minutes</p>
                <p>• Hospital team prepared</p>
              </div>
            </div>
            
            <div>
              <h4 className="font-medium text-sm mb-2">Instructions</h4>
              <div className="text-xs space-y-1">
                <p className="bg-yellow-100 p-2 rounded">
                  Keep patient calm and seated upright
                </p>
                <p className="bg-blue-100 p-2 rounded">
                  Monitor breathing patterns
                </p>
                <p className="bg-green-100 p-2 rounded">
                  Prepare for ambulance arrival
                </p>
              </div>
            </div>

            <Button variant="outline" size="sm" className="w-full">
              <MessageSquare className="h-4 w-4 mr-2" />
              Send Message
            </Button>
          </div>
        </div>

        {/* Call Controls */}
        <div className="flex items-center justify-center gap-4 py-4 border-t">
          <Button
            variant={isMicOn ? "outline" : "destructive"}
            size="lg"
            onClick={() => setIsMicOn(!isMicOn)}
            className="rounded-full"
          >
            {isMicOn ? <Mic className="h-5 w-5" /> : <MicOff className="h-5 w-5" />}
          </Button>

          <Button
            variant={isVideoOn ? "outline" : "destructive"}
            size="lg"
            onClick={() => setIsVideoOn(!isVideoOn)}
            className="rounded-full"
          >
            {isVideoOn ? <Video className="h-5 w-5" /> : <VideoOff className="h-5 w-5" />}
          </Button>

          <Button
            variant="destructive"
            size="lg"
            onClick={onEndCall}
            className="rounded-full px-8"
          >
            <PhoneOff className="h-5 w-5 mr-2" />
            End Call
          </Button>
        </div>

        {/* Emergency Info */}
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <h5 className="font-medium text-red-900 mb-2">Emergency Status</h5>
          <p className="text-sm text-red-800">
            Medical consultation in progress. Ambulance dispatched and hospital notified. 
            Continue following doctor's instructions until medical team arrives.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default VideoCall;