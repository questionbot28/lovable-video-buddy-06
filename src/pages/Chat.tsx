
import React from "react";
import Header from "@/components/Header";
import ChatSection from "@/components/ChatSection";
import ParticleBackground from "@/components/ParticleBackground";

const Chat: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background dark">
      <ParticleBackground />
      <Header />
      
      <main className="flex-1 container max-w-7xl mx-auto px-4 pb-4 flex items-center">
        <ChatSection className="animate-slide-up w-full py-4" />
      </main>
      
      <footer className="py-4 px-4 border-t border-border/30 backdrop-blur-sm bg-background/20">
        <div className="container mx-auto text-center text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} Chota GPT by Rohanpreet Singh Pathania. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Chat;
