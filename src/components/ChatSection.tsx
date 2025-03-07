
import React, { useState, useRef, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { sendChatMessage } from "@/utils/api";
import { toast } from "sonner";
import { Send, PaperclipIcon, Sparkles, XCircle } from "lucide-react";
import ChatMessage from "./ChatMessage";
import ModelSelector from "./ModelSelector";
import { AIModel, availableModels } from "@/types/models";

interface ChatSectionProps {
  className?: string;
}

interface Message {
  id: string;
  content: string;
  role: "user" | "assistant";
  timestamp: Date;
  attachment?: {
    type: string;
    url: string;
    name: string;
  };
}

const ChatSection: React.FC<ChatSectionProps> = ({ className }) => {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [attachment, setAttachment] = useState<File | null>(null);
  const [selectedModel, setSelectedModel] = useState<AIModel>(availableModels[3]); // Default to Mistral
  const fileInputRef = useRef<HTMLInputElement>(null);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  
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
    
    if ((!input.trim() && !attachment) || isLoading) return;
    
    let attachmentData = undefined;
    if (attachment) {
      const url = URL.createObjectURL(attachment);
      attachmentData = {
        type: attachment.type,
        url,
        name: attachment.name
      };
    }
    
    const userMessage: Message = {
      id: Date.now().toString(),
      content: input.trim(),
      role: "user",
      timestamp: new Date(),
      attachment: attachmentData
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setAttachment(null);
    setIsLoading(true);
    
    try {
      const response = await sendChatMessage(input, selectedModel);
      
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: response.trim(),
        role: "assistant",
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      console.error("Error sending message:", error);
      toast.error("Failed to get response from AI");
      
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

  const handleAttachmentClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      setAttachment(files[0]);
      toast.success(`File "${files[0].name}" ready to send`);
    }
  };

  const removeAttachment = () => {
    setAttachment(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleModelChange = (model: AIModel) => {
    setSelectedModel(model);
    toast.success(`Switched to ${model.name} model`);
  };

  return (
    <div className={cn("space-y-6", className)}>
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="bg-primary/10 text-primary border-primary/30">AI</Badge>
          <h2 className="text-3xl font-bold tracking-tight">Chat Assistant</h2>
        </div>
        <p className="text-muted-foreground text-sm">
          Ask questions or discuss any topic with the AI assistant
        </p>
      </div>
      
      <div className="flex flex-col space-y-2 sm:flex-row sm:space-y-0 sm:space-x-2">
        <ModelSelector selectedModel={selectedModel} onModelChange={handleModelChange} />
      </div>
      
      <Card className="overflow-hidden shadow-soft border border-primary/10 backdrop-blur-sm bg-card/90">
        <CardContent className="p-0">
          <div className="h-[70vh] flex flex-col">
            <ScrollArea className="flex-1 p-4" ref={scrollAreaRef}>
              {messages.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-muted-foreground p-4 space-y-3">
                  <Sparkles className="h-12 w-12 text-primary opacity-30" />
                  <p className="text-center max-w-md">
                    Start a conversation by sending a message or ask for help with a specific topic
                  </p>
                  <div className="flex flex-wrap gap-2 justify-center mt-4">
                    {["How does Chota GPT work?", "Tell me a joke", "What can you help me with?"].map((suggestion) => (
                      <button
                        key={suggestion}
                        className="bg-primary/10 hover:bg-primary/20 text-primary px-3 py-2 rounded-full text-sm transition-colors"
                        onClick={() => {
                          setInput(suggestion);
                        }}
                      >
                        {suggestion}
                      </button>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  {messages.map((message) => (
                    <div key={message.id}>
                      <ChatMessage
                        message={message.content}
                        role={message.role}
                        timestamp={message.timestamp}
                      />
                      {message.attachment && (
                        <div className={`flex ${message.role === "user" ? "justify-end" : "justify-start"} mt-1`}>
                          <div className={`rounded-xl px-4 py-2 ${message.role === "user" ? "bg-primary text-primary-foreground" : "bg-accent text-accent-foreground"} max-w-xs md:max-w-md`}>
                            <a 
                              href={message.attachment.url} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="flex items-center gap-2 text-sm underline underline-offset-2"
                            >
                              <PaperclipIcon className="h-4 w-4" />
                              {message.attachment.name}
                            </a>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                  
                  {isLoading && (
                    <div className="flex w-full gap-4 p-4">
                      <div className="h-8 w-8 flex-shrink-0 flex items-center justify-center">
                        <div className="h-6 w-6 rounded-full bg-primary/10 animate-pulse"></div>
                      </div>
                      <div className="rounded-2xl bg-accent/80 px-4 py-3 text-accent-foreground max-w-[80%]">
                        <p className="text-sm animate-pulse-light">Thinking<span className="loading-dots"></span></p>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </ScrollArea>
            
            <div className="border-t border-border/20 p-4 bg-muted/10 backdrop-blur-sm">
              {attachment && (
                <div className="mb-2 p-2 bg-primary/5 rounded-lg flex items-center justify-between border border-primary/10">
                  <div className="flex items-center gap-2 text-sm">
                    <PaperclipIcon className="h-4 w-4 text-primary" />
                    <span className="truncate max-w-[200px]">{attachment.name}</span>
                  </div>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="h-6 w-6 p-0" 
                    onClick={removeAttachment}
                  >
                    <XCircle className="h-4 w-4" />
                  </Button>
                </div>
              )}
              <form onSubmit={handleSubmit} className="flex gap-2">
                <Input
                  type="text"
                  placeholder="Type your message..."
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  disabled={isLoading}
                  className="focus-ring shadow-sm border-primary/10"
                />
                <Button 
                  type="button" 
                  variant="outline" 
                  className="transition-all duration-200 hover:shadow-md hover:border-primary/30"
                  onClick={handleAttachmentClick}
                  disabled={isLoading}
                >
                  <PaperclipIcon className="h-4 w-4" />
                  <span className="sr-only">Attach file</span>
                </Button>
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  className="hidden"
                  accept="image/*,.pdf,.doc,.docx,.txt"
                />
                <Button 
                  type="submit" 
                  disabled={isLoading || (!input.trim() && !attachment)}
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
