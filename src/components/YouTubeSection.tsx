
import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { extractVideoId, fetchYouTubeTranscript, getVideoInfo } from "@/utils/api";
import TranscriptDisplay from "./TranscriptDisplay";
import { toast } from "sonner";
import { Search, Sparkles } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

interface YouTubeSectionProps {
  className?: string;
}

const YouTubeSection: React.FC<YouTubeSectionProps> = ({ className }) => {
  const [url, setUrl] = useState("");
  const [videoId, setVideoId] = useState<string | null>(null);
  const [videoInfo, setVideoInfo] = useState<any>(null);
  const [transcript, setTranscript] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const isMobile = useIsMobile();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    
    const extractedId = extractVideoId(url);
    if (!extractedId) {
      setError("Invalid YouTube URL. Please enter a valid YouTube URL.");
      toast.error("Invalid YouTube URL");
      return;
    }
    
    setVideoId(extractedId);
    setIsLoading(true);
    
    try {
      // Get video information (title, thumbnail, etc.)
      const info = await getVideoInfo(extractedId);
      setVideoInfo(info);
      
      // Get transcript using the RapidAPI endpoint
      const data = await fetchYouTubeTranscript(extractedId);
      
      if (data && data.transcript) {
        setTranscript(data.transcript);
        toast.success("Transcript extracted successfully");
      } else {
        setTranscript(null);
        setError("No transcript available for this video. The video might not have captions enabled.");
        toast.warning("No transcript found");
      }
      
    } catch (err) {
      console.error("Error:", err);
      setError("Failed to fetch transcript. Please try another video.");
      toast.error("Failed to fetch transcript");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={cn("space-y-6", className)}>
      <div className="animated-bg"></div>
      <div className="space-y-2">
        <div className="flex items-center gap-2 justify-center sm:justify-start">
          <Badge variant="outline" className="animate-fade-in neon-border">YouTube</Badge>
          <h2 className="text-2xl font-bold tracking-tight neon-text flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-secondary animate-pulse" />
            Video Summarizer
          </h2>
        </div>
        <p className="text-muted-foreground text-sm text-center sm:text-left">
          Enter a YouTube URL to extract and display the video transcript
        </p>
      </div>
      
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2">
        <div className="relative flex-grow">
          <Input
            type="text"
            placeholder="Paste YouTube URL (e.g., https://www.youtube.com/watch?v=...)"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className="pr-10 focus-ring neon-border bg-muted/30"
          />
        </div>
        <Button 
          type="submit" 
          disabled={isLoading || !url}
          className="transition-all duration-200 btn-glow"
        >
          {isLoading ? 
            "Processing..." : 
            <><Search className="mr-2 h-4 w-4" /> Extract</>
          }
        </Button>
      </form>
      
      {videoId && videoInfo && (
        <Card className="overflow-hidden animate-fade-in yt-section neon-border">
          <CardContent className="p-0">
            <div className="aspect-video w-full overflow-hidden">
              <iframe
                width="100%"
                height="100%"
                src={`https://www.youtube.com/embed/${videoId}`}
                title={videoInfo.title || "YouTube video"}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full"
              ></iframe>
            </div>
          </CardContent>
        </Card>
      )}
      
      <TranscriptDisplay
        transcript={transcript}
        isLoading={isLoading}
        error={error}
        videoTitle={videoInfo?.title}
        className="animate-fade-in"
      />
    </div>
  );
};

export default YouTubeSection;
