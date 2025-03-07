
import React, { useState, useRef, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { sendChatMessage } from "@/utils/api";
import { toast } from "sonner";
import { Send } from "lucide-react";
import ChatMessage from "./ChatMessage";

interface ChatSectionProps {
  className?: string;
}

interface Message {
  id: string;
  content: string;
  role: "user" | "assistant";
  timestamp: Date;
}

const ChatSection: React.FC<ChatSectionProps> = ({ className }) => {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  
  // Auto-scroll to the bottom when messages change
  useEffect(() => {
    if (scrollAreaRef.current) {
      const scrollElement = scrollAreaRef.current.querySelector('[data-radix-scroll-area-viewport]');
      if (scrollElement) {
        scrollElement.scrollTop = scrollElement.scrollHeight;
      }
    }
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!input.trim() || isLoading) return;
    
    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      content: input,
      role: "user",
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);
    
    try {
      // Send message to API
      const response = await sendChatMessage(input);
      
      // Add AI response
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: response,
        role: "assistant",
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      console.error("Error sending message:", error);
      toast.error("Failed to get response from AI");
      
      // Add error message
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: "I'm having trouble responding right now. Please try again later.",
        role: "assistant",
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={cn("space-y-6", className)}>
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="animate-fade-in">AI</Badge>
          <h2 className="text-2xl font-medium tracking-tight">Chat Assistant</h2>
        </div>
        <p className="text-muted-foreground text-sm">
          Ask questions or discuss any topic with the AI assistant
        </p>
      </div>
      
      <Card className="overflow-hidden animate-fade-in shadow-soft">
        <CardContent className="p-0">
          <div className="h-[500px] flex flex-col">
            <ScrollArea className="flex-1 p-4" ref={scrollAreaRef}>
              {messages.length === 0 ? (
                <div className="h-full flex items-center justify-center text-muted-foreground text-sm p-4">
                  Start a conversation by sending a message
                </div>
              ) : (
                <div className="space-y-2">
                  {messages.map((message) => (
                    <ChatMessage
                      key={message.id}
                      message={message.content}
                      role={message.role}
                      timestamp={message.timestamp}
                    />
                  ))}
                  
                  {isLoading && (
                    <div className="flex w-full gap-4 p-4">
                      <div className="h-8 w-8 flex-shrink-0 flex items-center justify-center">
                        <div className="h-6 w-6 rounded-full bg-primary/10 animate-pulse"></div>
                      </div>
                      <div className="rounded-2xl bg-accent px-4 py-3 text-accent-foreground max-w-[80%]">
                        <p className="text-sm animate-pulse-light">Thinking<span className="loading-dots"></span></p>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </ScrollArea>
            
            <div className="border-t p-4 bg-muted/30">
              <form onSubmit={handleSubmit} className="flex gap-2">
                <Input
                  type="text"
                  placeholder="Type your message..."
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  disabled={isLoading}
                  className="focus-ring"
                />
                <Button 
                  type="submit" 
                  disabled={isLoading || !input.trim()}
                  className="transition-all duration-200 hover:shadow-md"
                >
                  <Send className="h-4 w-4" />
                  <span className="sr-only">Send</span>
                </Button>
              </form>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ChatSection;
