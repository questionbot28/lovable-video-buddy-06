
import React from "react";
import Header from "@/components/Header";
import YouTubeSection from "@/components/YouTubeSection";
import ParticleBackground from "@/components/ParticleBackground";

const YouTube: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <ParticleBackground />
      <Header />
      
      <main className="flex-1 container max-w-6xl mx-auto px-4 pb-6 flex items-center">
        <YouTubeSection className="animate-slide-up py-8 w-full" />
      </main>
      
      <footer className="py-4 px-4 border-t border-border/30 backdrop-blur-sm bg-background/20">
        <div className="container max-w-6xl mx-auto text-center text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} Chota GPT. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default YouTube;
