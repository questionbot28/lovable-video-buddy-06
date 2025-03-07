
import React from "react";
import Header from "@/components/Header";
import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Youtube, MessageSquare, Sparkles } from "lucide-react";
import ParticleBackground from "@/components/ParticleBackground";

const Index: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <ParticleBackground />
      <Header />
      
      <main className="flex-1 container max-w-6xl mx-auto px-4 pb-16">
        <div className="py-12 text-center">
          <h2 className="text-4xl font-bold tracking-tight mb-2 neon-text flex items-center justify-center gap-2">
            <Sparkles className="h-8 w-8 text-blue-400 animate-pulse" />
            Welcome to Chota GPT
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
            Explore YouTube transcripts and chat with AI - all in one place
          </p>
          
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto mt-12">
            <Card className="shadow-soft hover:neon-glow transition-all duration-300 border border-blue-500/20 bg-card/50 backdrop-blur-sm">
              <CardHeader>
                <Youtube className="h-8 w-8 text-blue-400 mb-2" />
                <CardTitle className="neon-text">YouTube Transcript</CardTitle>
                <CardDescription>
                  Extract and analyze transcripts from any YouTube video
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p>
                  Simply paste a YouTube URL to get the complete transcript.
                  Perfect for research, content creation, and more.
                </p>
              </CardContent>
              <CardFooter>
                <Button asChild className="w-full bg-blue-600 hover:bg-blue-700 text-white btn-glow">
                  <Link to="/youtube">
                    <Youtube className="h-4 w-4 mr-2" />
                    Open YouTube Transcript
                  </Link>
                </Button>
              </CardFooter>
            </Card>
            
            <Card className="shadow-soft hover:neon-glow transition-all duration-300 border border-blue-500/20 bg-card/50 backdrop-blur-sm">
              <CardHeader>
                <MessageSquare className="h-8 w-8 text-blue-400 mb-2" />
                <CardTitle className="neon-text">AI Chat Assistant</CardTitle>
                <CardDescription>
                  Have a conversation with our AI assistant
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p>
                  Ask questions, get information, or simply chat with our
                  intelligent AI assistant powered by OpenRouter.
                </p>
              </CardContent>
              <CardFooter>
                <Button asChild className="w-full bg-blue-600 hover:bg-blue-700 text-white btn-glow">
                  <Link to="/chat">
                    <MessageSquare className="h-4 w-4 mr-2" />
                    Open Chat Assistant
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </main>
      
      <footer className="py-6 px-4 border-t border-border/30 backdrop-blur-sm bg-background/20">
        <div className="container max-w-6xl mx-auto text-center text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} Chota GPT. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
