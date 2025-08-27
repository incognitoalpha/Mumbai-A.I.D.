import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { AlertTriangle, Heart, Brain, Activity, Bone } from 'lucide-react';

interface TriageResult {
  category: string;
  severity: 'Critical' | 'High' | 'Medium' | 'Low';
  confidence: number;
  icon: React.ComponentType<any>;
  description: string;
}

interface TriageResultsProps {
  result: TriageResult;
}

const TriageResults = ({ result }: TriageResultsProps) => {
  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'Critical':
        return 'bg-red-500 text-white';
      case 'High':
        return 'bg-orange-500 text-white';
      case 'Medium':
        return 'bg-yellow-500 text-white';
      case 'Low':
        return 'bg-green-500 text-white';
      default:
        return 'bg-gray-500 text-white';
    }
  };

  const Icon = result.icon;

  return (
    <Card className="w-full max-w-2xl mx-auto border-l-4 border-l-primary">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary/10 rounded-lg">
              <Icon className="h-6 w-6 text-primary" />
            </div>
            <div>
              <CardTitle className="text-xl">AI Triage Classification</CardTitle>
              <CardDescription>Automated medical assessment completed</CardDescription>
            </div>
          </div>
          <Badge className={getSeverityColor(result.severity)}>
            {result.severity} Priority
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <h4 className="font-semibold text-lg flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-primary" />
              Classification
            </h4>
            <p className="text-2xl font-bold text-primary">{result.category}</p>
            <p className="text-sm text-muted-foreground">{result.description}</p>
          </div>
          
          <div className="space-y-2">
            <h4 className="font-semibold">Confidence Level</h4>
            <div className="space-y-1">
              <div className="flex justify-between text-sm">
                <span>AI Confidence</span>
                <span>{result.confidence}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-primary h-2 rounded-full transition-all duration-1000 ease-out" 
                  style={{ width: `${result.confidence}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h5 className="font-medium text-blue-900 mb-2">Next Steps</h5>
          <p className="text-sm text-blue-800">
            {result.severity === 'Critical' 
              ? 'Immediate ambulance dispatch initiated. Hospital and medical team are being notified.'
              : 'Medical assessment completed. Appropriate care level is being assigned.'
            }
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default TriageResults;