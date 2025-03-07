
import React from "react";
import { ChevronDown, Bot } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { AIModel, availableModels } from "@/types/models";

interface ModelSelectorProps {
  selectedModel: AIModel;
  onModelChange: (model: AIModel) => void;
}

const ModelSelector: React.FC<ModelSelectorProps> = ({
  selectedModel,
  onModelChange,
}) => {
  const isMobile = useIsMobile();

  if (isMobile) {
    return (
      <Select
        value={selectedModel.id}
        onValueChange={(value) => {
          const model = availableModels.find((m) => m.id === value);
          if (model) onModelChange(model);
        }}
      >
        <SelectTrigger className="w-full bg-primary/10 border-primary/20 text-primary">
          <SelectValue placeholder="Select a model">
            <div className="flex items-center gap-2">
              <Bot className="h-4 w-4" />
              <span>{selectedModel.name}</span>
            </div>
          </SelectValue>
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {availableModels.map((model) => (
              <SelectItem key={model.id} value={model.id}>
                <div className="flex flex-col">
                  <span className="font-medium">{model.name}</span>
                  <span className="text-xs text-muted-foreground truncate max-w-[200px]">
                    {model.description}
                  </span>
                </div>
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    );
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className="w-full justify-between bg-primary/10 border-primary/20 text-primary hover:bg-primary/20"
        >
          <div className="flex items-center gap-2">
            <Bot className="h-4 w-4" />
            <span>{selectedModel.name}</span>
          </div>
          <ChevronDown className="h-4 w-4 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[300px] p-0" align="end">
        <div className="p-4 bg-muted/30 border-b">
          <h4 className="font-medium">Select AI Model</h4>
          <p className="text-sm text-muted-foreground">
            Choose which AI model to use for responses
          </p>
        </div>
        <div className="p-2">
          {availableModels.map((model) => (
            <Button
              key={model.id}
              variant="ghost"
              className={`w-full justify-start mb-1 ${
                selectedModel.id === model.id ? "bg-accent" : ""
              }`}
              onClick={() => onModelChange(model)}
            >
              <div className="flex flex-col items-start">
                <span className="font-medium">{model.name}</span>
                <span className="text-xs text-muted-foreground text-left">
                  {model.description}
                </span>
              </div>
            </Button>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default ModelSelector;
