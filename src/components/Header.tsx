
import React from "react";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Youtube, MessageSquare, Home, Sparkles } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

interface HeaderProps {
  className?: string;
}

const Header: React.FC<HeaderProps> = ({ className }) => {
  const isMobile = useIsMobile();
  
  return (
    <header className={cn("w-full py-6 px-4 md:px-8 border-b border-border/50 backdrop-blur-sm glass sticky top-0 z-50", className)}>
      <div className="container max-w-6xl mx-auto">
        <div className="flex items-center justify-between flex-col sm:flex-row gap-4">
          <div className="flex flex-col items-center sm:items-start">
            <h1 className="text-3xl font-bold tracking-tight animate-fade-in neon-text flex items-center gap-2">
              <Sparkles className="h-6 w-6 text-secondary animate-pulse" />
              Chota Got
            </h1>
            <p className="text-muted-foreground text-sm animate-slide-up">
              Extract insights from YouTube videos and chat with AI
            </p>
          </div>
          
          <nav className="flex items-center gap-2 overflow-x-auto pb-2 sm:pb-0 w-full sm:w-auto justify-center sm:justify-end">
            <Button variant="ghost" asChild size={isMobile ? "sm" : "default"} 
              className="neon-border hover:neon-glow">
              <Link to="/">
                <Home className="h-4 w-4 mr-2" />
                Home
              </Link>
            </Button>
            <Button variant="ghost" asChild size={isMobile ? "sm" : "default"}
              className="neon-border hover:neon-glow">
              <Link to="/youtube">
                <Youtube className="h-4 w-4 mr-2" />
                YouTube
              </Link>
            </Button>
            <Button variant="ghost" asChild size={isMobile ? "sm" : "default"}
              className="neon-border hover:neon-glow">
              <Link to="/chat">
                <MessageSquare className="h-4 w-4 mr-2" />
                Chat
              </Link>
            </Button>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
