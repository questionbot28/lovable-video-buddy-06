
import React from "react";
import { cn } from "@/lib/utils";

interface HeaderProps {
  className?: string;
}

const Header: React.FC<HeaderProps> = ({ className }) => {
  return (
    <header className={cn("w-full py-6 px-8 flex items-center justify-center", className)}>
      <div className="container max-w-6xl mx-auto">
        <div className="flex flex-col items-center justify-center text-center space-y-2">
          <h1 className="text-3xl font-medium tracking-tight animate-fade-in">
            Media Insight
          </h1>
          <p className="text-muted-foreground max-w-md mx-auto text-sm animate-slide-up">
            Extract insights from YouTube videos and chat with AI about any topic
          </p>
        </div>
      </div>
    </header>
  );
};

export default Header;
