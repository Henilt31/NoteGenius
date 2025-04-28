
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

interface ProcessingIndicatorProps {
  fileName?: string;
  progress?: number;
}

const ProcessingIndicator = ({ fileName, progress = 0 }: ProcessingIndicatorProps) => {
  const stages = [
    "Analyzing audio",
    "Transcribing content",
    "Extracting key points",
    "Generating action items"
  ];
  
  // Determine which stage to show based on progress
  const currentStage = Math.min(
    Math.floor(progress / 25),
    stages.length - 1
  );

  return (
    <Card className="w-full max-w-lg mx-auto">
      <CardHeader>
        <CardTitle className="text-xl text-center">Processing</CardTitle>
        <CardDescription className="text-center">
          {fileName ? `File: ${fileName}` : "Analyzing your content"}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <Progress value={progress} className="h-2" />
          
          <div className="text-center mt-8">
            <p className="text-muted-foreground">{stages[currentStage]}</p>
            <div className="flex justify-center mt-4 space-x-1">
              <span className="processing-dot h-2 w-2 rounded-full bg-primary"></span>
              <span className="processing-dot h-2 w-2 rounded-full bg-primary"></span>
              <span className="processing-dot h-2 w-2 rounded-full bg-primary"></span>
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="text-xs text-muted-foreground text-center">
        <p className="w-full">This may take a few moments depending on the content size</p>
      </CardFooter>
    </Card>
  );
};

export default ProcessingIndicator;
