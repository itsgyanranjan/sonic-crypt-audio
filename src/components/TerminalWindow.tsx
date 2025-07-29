import { ReactNode } from "react";

interface TerminalWindowProps {
  title: string;
  children: ReactNode;
  className?: string;
}

const TerminalWindow = ({ title, children, className = "" }: TerminalWindowProps) => {
  return (
    <div className={`terminal relative scan-lines ${className}`}>
      {/* Terminal header */}
      <div className="flex items-center justify-between p-3 border-b border-primary/20 bg-primary/5">
        <div className="flex items-center space-x-2">
          <div className="flex space-x-1">
            <div className="w-3 h-3 bg-destructive rounded-full"></div>
            <div className="w-3 h-3 bg-warning-orange rounded-full"></div>
            <div className="w-3 h-3 bg-primary rounded-full"></div>
          </div>
          <span className="text-sm font-mono text-primary font-bold">
            {title}
          </span>
        </div>
        <div className="text-xs font-mono text-muted-foreground">
          [{new Date().toLocaleTimeString()}]
        </div>
      </div>
      
      {/* Terminal content */}
      <div className="p-4">
        {children}
      </div>
    </div>
  );
};

export default TerminalWindow;