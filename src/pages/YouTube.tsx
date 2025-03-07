
import React from "react";
import Header from "@/components/Header";
import YouTubeSection from "@/components/YouTubeSection";

const YouTube: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      
      <main className="flex-1 container max-w-6xl mx-auto px-4 pb-16">
        <YouTubeSection className="animate-slide-up" />
      </main>
      
      <footer className="py-6 px-4 border-t">
        <div className="container max-w-6xl mx-auto text-center text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} Media Insight. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default YouTube;
