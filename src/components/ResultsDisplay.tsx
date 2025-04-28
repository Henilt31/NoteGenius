
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import { Check, Copy } from "lucide-react";

interface ResultsDisplayProps {
  summary: string[];
  actionItems: { task: string; deadline?: string }[];
  onReset: () => void;
}

const ResultsDisplay = ({ summary, actionItems, onReset }: ResultsDisplayProps) => {
  const [copied, setCopied] = useState<'summary' | 'actions' | null>(null);
  
  const handleCopy = (type: 'summary' | 'actions') => {
    let textToCopy = '';
    
    if (type === 'summary') {
      textToCopy = '📋 MEETING SUMMARY\n\n' + summary.map(point => `• ${point}`).join('\n');
    } else {
      textToCopy = '✅ ACTION ITEMS\n\n' + actionItems.map(item => {
        return item.deadline 
          ? `• ${item.task} (Due: ${item.deadline})`
          : `• ${item.task}`;
      }).join('\n');
    }
    
    navigator.clipboard.writeText(textToCopy)
      .then(() => {
        setCopied(type);
        toast.success(`${type === 'summary' ? 'Summary' : 'Action items'} copied to clipboard`);
        
        setTimeout(() => {
          setCopied(null);
        }, 2000);
      })
      .catch(() => {
        toast.error("Failed to copy to clipboard");
      });
  };
  
  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="text-center text-2xl font-bold">
          <span className="gradient-text">NoteGenius Results</span>
        </CardTitle>
        <CardDescription className="text-center">
          Your meeting notes have been processed and summarized
        </CardDescription>
      </CardHeader>
      
      <CardContent>
        <Tabs defaultValue="summary" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="summary">Meeting Summary</TabsTrigger>
            <TabsTrigger value="actions">Action Items ({actionItems.length})</TabsTrigger>
          </TabsList>
          
          <TabsContent value="summary" className="mt-6">
            <div className="bg-secondary/50 rounded-lg p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium">📋 Summary Points</h3>
                <Button 
                  variant="outline" 
                  size="sm"
                  className="flex items-center gap-1" 
                  onClick={() => handleCopy('summary')}
                >
                  {copied === 'summary' ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                  {copied === 'summary' ? 'Copied' : 'Copy'}
                </Button>
              </div>
              
              <ul className="space-y-3">
                {summary.map((point, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <span className="text-primary font-bold">•</span>
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          </TabsContent>
          
          <TabsContent value="actions" className="mt-6">
            <div className="bg-secondary/50 rounded-lg p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium">✅ Action Tasks</h3>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="flex items-center gap-1"
                  onClick={() => handleCopy('actions')}
                >
                  {copied === 'actions' ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                  {copied === 'actions' ? 'Copied' : 'Copy'}
                </Button>
              </div>
              
              <ul className="space-y-4">
                {actionItems.map((item, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <div className="h-6 w-6 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0">
                      <span className="text-xs font-medium">{index + 1}</span>
                    </div>
                    <div>
                      <p className="font-medium">{item.task}</p>
                      {item.deadline && (
                        <p className="text-sm text-muted-foreground mt-1">
                          Due: {item.deadline}
                        </p>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
      
      <CardFooter className="flex justify-center pt-2 pb-6">
        <Button onClick={onReset} variant="outline">
          Process Another Meeting
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ResultsDisplay;
