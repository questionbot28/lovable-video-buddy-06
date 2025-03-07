
import React, { useState, useEffect, useRef } from "react";
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
  const [displayedText, setDisplayedText] = useState(isUser ? message : "");
  const [isTyping, setIsTyping] = useState(!isUser);
  const messageRef = useRef<HTMLParagraphElement>(null);
  
  useEffect(() => {
    if (isUser) return;
    
    let index = 0;
    const typingSpeed = 10; // characters per typingSpeed ms
    
    const typeWriter = () => {
      if (index < message.length) {
        setDisplayedText(message.substring(0, index + 1));
        index++;
        setTimeout(typeWriter, typingSpeed);
      } else {
        setIsTyping(false);
      }
    };
    
    // Start the typewriter effect
    typeWriter();
    
    return () => {
      // Clean up any timeouts if the component unmounts
      setIsTyping(false);
    };
  }, [message, isUser]);
  
  useEffect(() => {
    if (messageRef.current && !isTyping) {
      // Apply syntax highlighting or other formatting after typing completes
      // This is a placeholder for any post-typing DOM manipulations
    }
  }, [isTyping]);
  
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
              ? "bg-primary/90 text-primary-foreground" 
              : "bg-accent/80 text-accent-foreground"
          )}
        >
          <p 
            ref={messageRef} 
            className="text-sm leading-relaxed whitespace-pre-wrap"
          >
            {displayedText}
            {isTyping && <span className="cursor-blink">|</span>}
          </p>
        </div>
        <span className="text-xs text-muted-foreground px-2">
          {timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </span>
      </div>
      
      {isUser && (
        <Avatar className="h-8 w-8 flex-shrink-0">
          <AvatarFallback className="bg-primary/90 text-primary-foreground text-xs">You</AvatarFallback>
        </Avatar>
      )}
    </div>
  );
};

export default ChatMessage;
