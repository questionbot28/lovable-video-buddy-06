
import React from "react";
import Header from "@/components/Header";
import ChatSection from "@/components/ChatSection";

const Chat: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <div className="animated-bg absolute inset-0 z-[-1]"></div>
      <Header />
      
      <main className="flex-1 container max-w-7xl mx-auto px-4 pb-16 mt-6">
        <ChatSection className="animate-slide-up" />
      </main>
      
      <footer className="py-6 px-4 border-t border-border/30 backdrop-blur-sm bg-background/20">
        <div className="container mx-auto text-center text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} Chota Got. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Chat;
