
import { useState, useEffect } from 'react';
import Header from "@/components/Header";
import FileUpload from "@/components/FileUpload";
import TextInput from "@/components/TextInput";
import ProcessingIndicator from "@/components/ProcessingIndicator";
import ResultsDisplay from "@/components/ResultsDisplay";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";

// Define the ProcessingStage type properly as a union type
type ProcessingStage = 'idle' | 'processing' | 'complete';

const Index = () => {
  // Properly initialize with the correct type
  const [processingStage, setProcessingStage] = useState<ProcessingStage>('idle');
  const [inputType, setInputType] = useState<'audio' | 'text'>('audio');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [progress, setProgress] = useState(0);
  const [results, setResults] = useState<{
    summary: string[],
    actionItems: { task: string; deadline?: string }[]
  } | null>(null);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (processingStage === 'processing') {
      interval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 100) {
            clearInterval(interval);
            
            setTimeout(() => {
              setProcessingStage('complete');
              setResults({
                summary: [
                  "Team agreed on Q3 marketing strategy focusing on social media campaigns and video content.",
                  "Budget was approved for $50,000, with $30,000 allocated to paid ads and $20,000 to content creation.",
                  "Campaign will target 25-40 age demographic in urban areas with interests in technology and sustainability.",
                  "New analytics tool will be implemented to track campaign performance with weekly reporting."
                ],
                actionItems: [
                  { task: "Set up new analytics dashboard for campaign tracking", deadline: "July 15, 2025" },
                  { task: "Finalize content calendar for Q3", deadline: "July 10, 2025" },
                  { task: "Brief design team on new campaign assets", deadline: "July 20, 2025" },
                  { task: "Schedule weekly progress meetings for campaign duration" },
                  { task: "Prepare mid-campaign report for executive team", deadline: "August 15, 2025" }
                ]
              });
            }, 500);
            
            return 100;
          }
          const increment = Math.random() * 8 + (prev < 50 ? 5 : 2);
          return Math.min(prev + increment, 100);
        });
      }, 300);
    }
    
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [processingStage]);

  const handleFileSelected = (file: File) => {
    setSelectedFile(file);
    setProgress(0);
    setProcessingStage('processing');
    toast.success("Processing your audio file");
  };

  const handleTextSubmitted = (text: string) => {
    setSelectedFile(null);
    setProgress(0);
    setProcessingStage('processing');
    toast.success("Processing your meeting notes");
  };

  const handleReset = () => {
    setProcessingStage('idle');
    setSelectedFile(null);
    setProgress(0);
    setResults(null);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 py-8 px-4 sm:px-6 lg:px-8">
        {processingStage === 'idle' && (
          <>
            <div className="max-w-4xl mx-auto text-center mb-12 relative">
              <div className="hero-gradient absolute inset-0 -z-10"></div>
              <h1 className="text-4xl sm:text-5xl font-bold mb-6">
                <span className="gradient-text">NoteGenius</span>
              </h1>
              <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                Transform your meeting recordings into clear summaries and actionable tasks in seconds
              </p>
              
              <Tabs defaultValue="audio" className="w-full max-w-md mx-auto" onValueChange={(v) => setInputType(v as 'audio' | 'text')}>
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="audio">Audio Recording</TabsTrigger>
                  <TabsTrigger value="text">Meeting Notes</TabsTrigger>
                </TabsList>
                
                <div className="mt-8">
                  <TabsContent value="audio" className="mt-0">
                    <FileUpload 
                      onFileSelected={handleFileSelected}
                      isProcessing={processingStage === 'processing'}
                    />
                  </TabsContent>
                  
                  <TabsContent value="text" className="mt-0">
                    <TextInput 
                      onTextSubmitted={handleTextSubmitted}
                      isProcessing={processingStage === 'processing'}
                    />
                  </TabsContent>
                </div>
              </Tabs>
            </div>
            
            <div className="max-w-6xl mx-auto mt-16">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="bg-card rounded-lg p-6 text-center">
                  <div className="bg-primary/10 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6 text-primary">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                  </div>
                  <h3 className="font-medium text-lg mb-2">Upload</h3>
                  <p className="text-muted-foreground text-sm">Upload your meeting recording or paste meeting notes</p>
                </div>
                
                <div className="bg-card rounded-lg p-6 text-center">
                  <div className="bg-primary/10 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6 text-primary">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                    </svg>
                  </div>
                  <h3 className="font-medium text-lg mb-2">Process</h3>
                  <p className="text-muted-foreground text-sm">AI processes your content and extracts key information</p>
                </div>
                
                <div className="bg-card rounded-lg p-6 text-center">
                  <div className="bg-primary/10 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6 text-primary">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="font-medium text-lg mb-2">Results</h3>
                  <p className="text-muted-foreground text-sm">Get a clear summary and actionable tasks from your meeting</p>
                </div>
              </div>
            </div>
          </>
        )}
        
        {processingStage === 'processing' && (
          <div className="max-w-4xl mx-auto py-10">
            <ProcessingIndicator 
              fileName={selectedFile?.name}
              progress={progress}
            />
          </div>
        )}
        
        {processingStage === 'complete' && results && (
          <div className="max-w-4xl mx-auto py-6">
            <ResultsDisplay 
              summary={results.summary}
              actionItems={results.actionItems}
              onReset={handleReset}
            />
          </div>
        )}
      </main>
      
      <footer className="py-6 border-t">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-sm text-muted-foreground">
            © 2025 NoteGenius. AI-powered meeting assistant.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
