
import React from "react";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

type MessageRole = "user" | "assistant";

interface ChatMessageProps {
  message: string;
  role: MessageRole;
  timestamp: Date;
  className?: string;
}

const ChatMessage: React.FC<ChatMessageProps> = ({
  message,
  role,
  timestamp,
  className,
}) => {
  const isUser = role === "user";
  
  return (
    <div
      className={cn(
        "flex w-full gap-4 p-4 message-in",
        isUser ? "justify-end" : "justify-start",
        className
      )}
    >
      {!isUser && (
        <Avatar className="h-8 w-8 flex-shrink-0">
          <AvatarFallback className="bg-primary/10 text-primary text-xs">AI</AvatarFallback>
        </Avatar>
      )}
      
      <div className={cn(
        "flex flex-col max-w-[80%] space-y-1",
        isUser ? "items-end" : "items-start"
      )}>
        <div
          className={cn(
            "rounded-2xl px-4 py-3 shadow-soft",
            isUser 
              ? "bg-primary text-primary-foreground" 
              : "bg-accent text-accent-foreground"
          )}
        >
          <p className="text-sm leading-relaxed whitespace-pre-wrap">{message}</p>
        </div>
        <span className="text-xs text-muted-foreground px-2">
          {timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </span>
      </div>
      
      {isUser && (
        <Avatar className="h-8 w-8 flex-shrink-0">
          <AvatarFallback className="bg-primary text-primary-foreground text-xs">You</AvatarFallback>
        </Avatar>
      )}
    </div>
  );
};

export default ChatMessage;
