
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

interface TextInputProps {
  onTextSubmitted: (text: string) => void;
  isProcessing: boolean;
}

const TextInput = ({ onTextSubmitted, isProcessing }: TextInputProps) => {
  const [text, setText] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!text.trim()) {
      toast.error("Please enter some meeting notes");
      return;
    }
    
    if (text.length > 15000) {
      toast.error("Text exceeds 15,000 character limit");
      return;
    }
    
    onTextSubmitted(text.trim());
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-lg mx-auto">
      <Textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Paste your meeting notes or transcript here..."
        className="min-h-[200px] mb-4"
        disabled={isProcessing}
      />
      <Button 
        type="submit" 
        className="w-full" 
        disabled={isProcessing}
      >
        Process Notes
      </Button>
    </form>
  );
};

export default TextInput;
