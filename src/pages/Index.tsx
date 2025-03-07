
import React from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Youtube, MessageSquare, Sparkles, ImageIcon, BarChart2, FileText, GraduationCap } from "lucide-react";
import ParticleBackground from "@/components/ParticleBackground";

const Index: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <ParticleBackground />
      
      <main className="flex-1 container max-w-6xl mx-auto px-4 pb-16 pt-12">
        <div className="py-12 text-center">
          <h2 className="text-4xl font-bold tracking-tight mb-2 neon-text flex items-center justify-center gap-2">
            <Sparkles className="h-8 w-8 color-green animate-pulse" />
            Welcome to Chota GPT
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
            Your AI assistant for chat, analysis, and more
          </p>
          
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto mt-12">
            <Card className="shadow-soft transition-all duration-300 border border-green-500/20 bg-card/50 backdrop-blur-sm">
              <CardHeader>
                <ImageIcon className="h-8 w-8 color-green mb-2" />
                <CardTitle className="neon-text">Create Images</CardTitle>
                <CardDescription>
                  Generate AI images from your text descriptions
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p>
                  Describe what you want to see, and the AI will create custom images for you.
                  Perfect for designs, concepts, and creative projects.
                </p>
              </CardContent>
              <CardFooter>
                <Button asChild className="w-full bg-green-600 hover:bg-green-700 text-black btn-glow">
                  <Link to="/chat">
                    <ImageIcon className="h-4 w-4 mr-2" />
                    Create Images
                  </Link>
                </Button>
              </CardFooter>
            </Card>
            
            <Card className="shadow-soft transition-all duration-300 border border-green-500/20 bg-card/50 backdrop-blur-sm">
              <CardHeader>
                <MessageSquare className="h-8 w-8 color-green mb-2" />
                <CardTitle className="neon-text">AI Chat Assistant</CardTitle>
                <CardDescription>
                  Have a conversation with our AI assistant
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p>
                  Ask questions, get information, or simply chat with our
                  intelligent AI assistant powered by advanced language models.
                </p>
              </CardContent>
              <CardFooter>
                <Button asChild className="w-full bg-green-600 hover:bg-green-700 text-black btn-glow">
                  <Link to="/chat">
                    <MessageSquare className="h-4 w-4 mr-2" />
                    Open Chat Assistant
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto mt-8">
            <Card className="shadow-soft transition-all duration-300 border border-green-500/20 bg-card/50 backdrop-blur-sm">
              <CardHeader>
                <BarChart2 className="h-8 w-8 color-blue mb-2" />
                <CardTitle className="neon-text">Analyze Data</CardTitle>
                <CardDescription>
                  Extract insights from your data with AI assistance
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p>
                  Upload your data and get AI-powered analysis, visualizations,
                  and insights to help you make informed decisions.
                </p>
              </CardContent>
              <CardFooter>
                <Button asChild className="w-full bg-green-600 hover:bg-green-700 text-black btn-glow">
                  <Link to="/chat">
                    <BarChart2 className="h-4 w-4 mr-2" />
                    Analyze Data
                  </Link>
                </Button>
              </CardFooter>
            </Card>
            
            <Card className="shadow-soft transition-all duration-300 border border-green-500/20 bg-card/50 backdrop-blur-sm">
              <CardHeader>
                <FileText className="h-8 w-8 color-orange mb-2" />
                <CardTitle className="neon-text">Summarize Text</CardTitle>
                <CardDescription>
                  Quickly extract key points from any text
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p>
                  Paste articles, documents, or long texts to get concise summaries
                  that capture the most important information.
                </p>
              </CardContent>
              <CardFooter>
                <Button asChild className="w-full bg-green-600 hover:bg-green-700 text-black btn-glow">
                  <Link to="/chat">
                    <FileText className="h-4 w-4 mr-2" />
                    Summarize Text
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </main>
      
      <footer className="py-6 px-4 border-t border-white/5 backdrop-blur-sm bg-black/30">
        <div className="container max-w-6xl mx-auto text-center text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} Chota GPT. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
