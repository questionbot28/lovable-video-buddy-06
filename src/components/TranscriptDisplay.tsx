
import React from "react";
import { cn } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";

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
  return (
    <div className={cn("rounded-xl border bg-card shadow-soft overflow-hidden", className)}>
      <div className="p-4 bg-muted/30">
        <h3 className="text-lg font-medium">
          {videoTitle ? videoTitle : "Transcript"}
        </h3>
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
