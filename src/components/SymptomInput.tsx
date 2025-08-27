import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertTriangle, MessageSquare } from 'lucide-react';

interface SymptomInputProps {
  onSubmit: (symptoms: string) => void;
  isLoading?: boolean;
}

const SymptomInput = ({ onSubmit, isLoading }: SymptomInputProps) => {
  const [symptoms, setSymptoms] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (symptoms.trim()) {
      onSubmit(symptoms);
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader className="text-center">
        <div className="flex items-center justify-center gap-2 mb-2">
          <AlertTriangle className="h-6 w-6 text-emergency" />
          <CardTitle className="text-2xl font-bold">Emergency Medical Dispatch</CardTitle>
        </div>
        <CardDescription className="text-lg">
          Describe the emergency symptoms in natural language
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label htmlFor="symptoms" className="text-sm font-medium flex items-center gap-2">
              <MessageSquare className="h-4 w-4" />
              Describe the symptoms
            </label>
            <Textarea
              id="symptoms"
              placeholder="e.g., My father is having severe chest pain and can't breathe properly..."
              value={symptoms}
              onChange={(e) => setSymptoms(e.target.value)}
              className="min-h-[120px] text-base"
              disabled={isLoading}
            />
          </div>
          
          <div className="bg-muted/50 p-4 rounded-lg">
            <h4 className="font-medium mb-2">Examples:</h4>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• "Severe chest pain, difficulty breathing, sweating"</li>
              <li>• "Head injury from fall, unconscious for 2 minutes"</li>
              <li>• "Allergic reaction, swelling, difficulty swallowing"</li>
              <li>• "Severe abdominal pain, vomiting, fever"</li>
            </ul>
          </div>

          <Button 
            type="submit" 
            variant="emergency" 
            size="lg" 
            className="w-full font-semibold"
            disabled={!symptoms.trim() || isLoading}
          >
            {isLoading ? 'Processing Emergency...' : 'Submit Emergency Request'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default SymptomInput;