
import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Copy, Check } from "lucide-react";
import { toast } from "sonner";

interface TranscriptDisplayProps {
  transcript: string | null;
  isLoading: boolean;
  error: string | null;
  videoTitle?: string;
  className?: string;
}

const TranscriptDisplay: React.FC<TranscriptDisplayProps> = ({
  transcript,
  isLoading,
  error,
  videoTitle,
  className,
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopyTranscript = () => {
    if (transcript) {
      navigator.clipboard.writeText(transcript);
      setCopied(true);
      toast.success("Transcript copied to clipboard!");
      
      setTimeout(() => {
        setCopied(false);
      }, 2000);
    }
  };

  return (
    <div className={cn("rounded-xl border bg-card shadow-soft overflow-hidden neon-border", className)}>
      <div className="p-4 bg-muted/30 flex items-center justify-between">
        <h3 className="text-lg font-medium neon-text">
          {videoTitle ? videoTitle : "Transcript"}
        </h3>
        
        {transcript && (
          <Button
            variant="ghost"
            size="sm"
            onClick={handleCopyTranscript}
            className="copy-btn"
            title="Copy transcript"
          >
            {copied ? (
              <Check className="h-4 w-4 text-secondary" />
            ) : (
              <Copy className="h-4 w-4" />
            )}
            <span className="ml-2 hidden sm:inline">
              {copied ? "Copied!" : "Copy"}
            </span>
          </Button>
        )}
      </div>
      
      <Separator />
      
      <ScrollArea className="h-[400px] p-4">
        {isLoading ? (
          <div className="flex h-full items-center justify-center">
            <div className="animate-pulse-light text-muted-foreground">
              Extracting transcript<span className="loading-dots"></span>
            </div>
          </div>
        ) : error ? (
          <div className="p-4 text-destructive text-sm">
            {error}
          </div>
        ) : transcript ? (
          <div className="py-2 px-1 text-sm leading-relaxed whitespace-pre-wrap">
            {transcript}
          </div>
        ) : (
          <div className="flex h-full items-center justify-center text-muted-foreground text-sm">
            Enter a YouTube URL to see the transcript
          </div>
        )}
      </ScrollArea>
    </div>
  );
};

export default TranscriptDisplay;
