
import React from "react";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Youtube, MessageSquare, Home } from "lucide-react";

interface HeaderProps {
  className?: string;
}

const Header: React.FC<HeaderProps> = ({ className }) => {
  return (
    <header className={cn("w-full py-6 px-8 border-b", className)}>
      <div className="container max-w-6xl mx-auto">
        <div className="flex items-center justify-between">
          <div className="flex flex-col items-start">
            <h1 className="text-3xl font-medium tracking-tight animate-fade-in">
              Media Insight
            </h1>
            <p className="text-muted-foreground text-sm animate-slide-up">
              Extract insights from YouTube videos and chat with AI
            </p>
          </div>
          
          <nav className="flex items-center gap-2">
            <Button variant="ghost" asChild>
              <Link to="/">
                <Home className="h-4 w-4 mr-2" />
                Home
              </Link>
            </Button>
            <Button variant="ghost" asChild>
              <Link to="/youtube">
                <Youtube className="h-4 w-4 mr-2" />
                YouTube
              </Link>
            </Button>
            <Button variant="ghost" asChild>
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
