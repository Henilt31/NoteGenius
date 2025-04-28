
import { useState, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface FileUploadProps {
  onFileSelected: (file: File) => void;
  isProcessing: boolean;
}

const FileUpload = ({ onFileSelected, isProcessing }: FileUploadProps) => {
  const [dragActive, setDragActive] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      validateAndProcessFile(file);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      validateAndProcessFile(file);
    }
  };

  const validateAndProcessFile = (file: File) => {
    const validFileTypes = ['audio/mpeg', 'audio/wav', 'audio/mp3'];
    
    if (!validFileTypes.includes(file.type)) {
      toast.error("Please upload an audio file (MP3 or WAV)");
      return;
    }
    
    if (file.size > 25 * 1024 * 1024) {
      toast.error("File size exceeds 25MB limit");
      return;
    }
    
    onFileSelected(file);
  };

  const onButtonClick = () => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <div 
        className={`flex flex-col items-center justify-center w-full h-52 border-2 border-dashed rounded-lg p-4 transition-colors ${
          dragActive ? "border-primary bg-primary/5" : "border-gray-300 hover:border-primary/70"
        }`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <svg
          className="w-10 h-10 mb-3 text-gray-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
          ></path>
        </svg>
        <p className="mb-2 text-sm text-gray-500">
          <span className="font-semibold">Click to upload</span> or drag and drop
        </p>
        <p className="text-xs text-gray-500">MP3 or WAV (max. 25MB)</p>
      
        <input
          ref={inputRef}
          type="file"
          accept=".mp3,.wav,audio/mpeg,audio/wav"
          className="hidden"
          onChange={handleChange}
          disabled={isProcessing}
        />
      </div>
      
      <div className="mt-4 text-center">
        <Button 
          onClick={onButtonClick} 
          disabled={isProcessing} 
          variant="outline" 
          className="w-full"
        >
          Select Audio File
        </Button>
      </div>
    </div>
  );
};

export default FileUpload;
