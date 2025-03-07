
import React from "react";
import { Menu, Plus, Globe, LightbulbIcon, Mic, ActivitySquare, ImageIcon, BarChart2, FileText, GraduationCap, MoreHorizontal, PlusCircle, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Chat: React.FC = () => {
  return (
    <div className="chatgpt-container">
      <header className="chatgpt-header">
        <Button variant="ghost" size="icon" className="h-10 w-10">
          <Menu className="h-6 w-6" />
        </Button>
        
        <Button variant="outline" className="bg-secondary rounded-full flex items-center gap-2 px-4">
          <span>Get Plus</span>
          <PlusCircle className="h-4 w-4" />
        </Button>
        
        <div className="flex gap-2">
          <Button variant="ghost" size="icon" className="h-10 w-10">
            <Sparkles className="h-6 w-6" />
          </Button>
          <Button variant="ghost" size="icon" className="h-10 w-10">
            <MoreHorizontal className="h-6 w-6" />
          </Button>
        </div>
      </header>
      
      <main className="chatgpt-main">
        <h1 className="chatgpt-welcome">What can I help with?</h1>
        
        <div className="chatgpt-suggestions">
          <button className="suggestion-btn">
            <ImageIcon className="h-5 w-5 color-green" />
            <span>Create image</span>
          </button>
          
          <button className="suggestion-btn">
            <BarChart2 className="h-5 w-5 color-blue" />
            <span>Analyze data</span>
          </button>
        </div>
        
        <div className="chatgpt-suggestions">
          <button className="suggestion-btn">
            <FileText className="h-5 w-5 color-orange" />
            <span>Summarize text</span>
          </button>
          
          <button className="suggestion-btn">
            <GraduationCap className="h-5 w-5 color-blue" />
            <span>Get advice</span>
          </button>
          
          <button className="suggestion-btn">
            <MoreHorizontal className="h-5 w-5" />
            <span>More</span>
          </button>
        </div>
      </main>
      
      <footer className="chatgpt-footer">
        <div className="chatgpt-input">
          <div className="chatgpt-message-input">
            <textarea 
              className="chatgpt-message-placeholder"
              placeholder="Message ChatGPT"
              rows={1}
            ></textarea>
          </div>
          
          <div className="chatgpt-input-tools">
            <div className="chatgpt-input-tools-left">
              <button className="input-tool-btn">
                <Plus className="h-5 w-5" />
              </button>
              <button className="input-tool-btn">
                <Globe className="h-5 w-5" />
                <span className="sr-only">Search</span>
              </button>
              <button className="input-tool-btn">
                <LightbulbIcon className="h-5 w-5" />
                <span className="sr-only">Reason</span>
              </button>
            </div>
            
            <div className="chatgpt-input-tools-right">
              <button className="input-tool-btn">
                <Mic className="h-5 w-5" />
                <span className="sr-only">Voice input</span>
              </button>
              <button className="input-tool-btn primary">
                <ActivitySquare className="h-5 w-5" />
                <span className="sr-only">Send</span>
              </button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Chat;
