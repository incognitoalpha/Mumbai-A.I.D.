import { useState } from 'react';
import { Heart, Brain, Activity, Bone, AlertTriangle } from 'lucide-react';
import SymptomInput from '@/components/SymptomInput';
import TriageResults from '@/components/TriageResults';
import HospitalMatch from '@/components/HospitalMatch';
import AmbulanceTracker from '@/components/AmbulanceTracker';
import VideoCall from '@/components/VideoCall';
import emergencyHero from '@/assets/emergency-hero.jpg';

type FlowStep = 'input' | 'triage' | 'hospital' | 'ambulance' | 'video-call';

const EmergencyDashboard = () => {
  const [currentStep, setCurrentStep] = useState<FlowStep>('input');
  const [isLoading, setIsLoading] = useState(false);

  // Mock data for demonstration
  const mockTriageResult = {
    category: 'Cardiac Emergency',
    severity: 'Critical' as const,
    confidence: 94,
    icon: Heart,
    description: 'Symptoms indicate potential cardiac event requiring immediate intervention'
  };

  const mockHospital = {
    name: 'KEM Hospital Mumbai',
    address: 'Parel, Mumbai, Maharashtra 400012',
    distance: '2.4 km',
    eta: '8 min',
    specializations: ['Cardiology', 'Emergency Medicine', 'Cardiac Surgery'],
    capacity: 'Available - 3 ICU beds',
    doctor: {
      name: 'Priya Sharma',
      specialization: 'Emergency Cardiologist',
      experience: '12 years',
      rating: 4.8
    },
    phone: '+91 22 2413 6051'
  };

  const mockAmbulance = {
    id: 'AMB-007',
    driver: 'Rajesh Kumar',
    eta: '8 min',
    distance: '2.1 km',
    status: 'En Route' as const,
    currentLocation: 'Worli Sea Link, approaching Parel',
    phone: '+91 98765 43210'
  };

  const handleSymptomSubmit = (symptoms: string) => {
    setIsLoading(true);
    // Simulate AI processing
    setTimeout(() => {
      setIsLoading(false);
      setCurrentStep('triage');
      
      // Auto-progress through the flow
      setTimeout(() => setCurrentStep('hospital'), 2000);
      setTimeout(() => setCurrentStep('ambulance'), 4000);
    }, 2000);
  };

  const handleVideoCall = () => {
    setCurrentStep('video-call');
  };

  const handleEndCall = () => {
    setCurrentStep('ambulance');
  };

  const renderHeroSection = () => (
    <div className="relative h-64 mb-8 overflow-hidden rounded-xl">
      <img 
        src={emergencyHero} 
        alt="Emergency Medical Dispatch Center"
        className="w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-black/30 flex items-center">
        <div className="container mx-auto px-6">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Emergency Medical Dispatch
          </h1>
          <p className="text-xl text-white/90 max-w-2xl">
            AI-powered triage system connecting you to the right medical care instantly
          </p>
        </div>
      </div>
    </div>
  );

  const renderProgressIndicator = () => {
    const steps = [
      { id: 'input', label: 'Symptom Input', icon: AlertTriangle },
      { id: 'triage', label: 'AI Triage', icon: Brain },
      { id: 'hospital', label: 'Hospital Match', icon: Heart },
      { id: 'ambulance', label: 'Ambulance Dispatch', icon: Activity },
      { id: 'video-call', label: 'Medical Consultation', icon: Activity }
    ];

    const getCurrentStepIndex = () => steps.findIndex(step => step.id === currentStep);
    const currentIndex = getCurrentStepIndex();

    return (
      <div className="w-full max-w-4xl mx-auto mb-8">
        <div className="flex items-center justify-between">
          {steps.map((step, index) => {
            const Icon = step.icon;
            const isActive = index <= currentIndex;
            const isCurrent = index === currentIndex;
            
            return (
              <div key={step.id} className="flex items-center">
                <div className={`
                  flex items-center justify-center w-10 h-10 rounded-full border-2 transition-all duration-300
                  ${isActive 
                    ? 'bg-primary border-primary text-white' 
                    : 'bg-white border-gray-300 text-gray-400'
                  }
                  ${isCurrent ? 'ring-4 ring-primary/20 scale-110' : ''}
                `}>
                  <Icon className="h-5 w-5" />
                </div>
                <div className="ml-3 hidden sm:block">
                  <p className={`text-sm font-medium ${isActive ? 'text-primary' : 'text-gray-500'}`}>
                    {step.label}
                  </p>
                </div>
                {index < steps.length - 1 && (
                  <div className={`
                    h-0.5 w-8 sm:w-16 mx-4 transition-all duration-300
                    ${index < currentIndex ? 'bg-primary' : 'bg-gray-300'}
                  `} />
                )}
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
      <div className="container mx-auto px-4 py-8">
        {currentStep === 'input' && renderHeroSection()}
        
        {currentStep !== 'input' && renderProgressIndicator()}

        <div className="space-y-8">
          {currentStep === 'input' && (
            <SymptomInput onSubmit={handleSymptomSubmit} isLoading={isLoading} />
          )}

          {currentStep === 'triage' && (
            <TriageResults result={mockTriageResult} />
          )}

          {(currentStep === 'hospital' || currentStep === 'ambulance' || currentStep === 'video-call') && (
            <HospitalMatch hospital={mockHospital} onCallDoctor={handleVideoCall} />
          )}

          {(currentStep === 'ambulance' || currentStep === 'video-call') && currentStep !== 'video-call' && (
            <AmbulanceTracker ambulanceData={mockAmbulance} />
          )}

          {currentStep === 'video-call' && (
            <VideoCall doctorName={mockHospital.doctor.name} onEndCall={handleEndCall} />
          )}
        </div>
      </div>
    </div>
  );
};

export default EmergencyDashboard;