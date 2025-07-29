import { CheckCircle, Clock, XCircle, Loader2 } from "lucide-react";

interface StatusIndicatorProps {
  status: "idle" | "processing" | "success" | "error";
  message: string;
  className?: string;
}

const StatusIndicator = ({ status, message, className = "" }: StatusIndicatorProps) => {
  const getStatusIcon = () => {
    switch (status) {
      case "idle":
        return <Clock className="w-5 h-5 text-muted-foreground" />;
      case "processing":
        return <Loader2 className="w-5 h-5 text-primary animate-spin" />;
      case "success":
        return <CheckCircle className="w-5 h-5 text-primary" />;
      case "error":
        return <XCircle className="w-5 h-5 text-destructive" />;
    }
  };

  const getStatusColor = () => {
    switch (status) {
      case "idle":
        return "text-muted-foreground";
      case "processing":
        return "text-primary";
      case "success":
        return "text-primary";
      case "error":
        return "text-destructive";
    }
  };

  return (
    <div className={`flex items-center space-x-2 font-mono text-sm ${className}`}>
      {getStatusIcon()}
      <span className={getStatusColor()}>{message}</span>
      {status === "processing" && (
        <div className="flex space-x-1">
          <div className="w-1 h-1 bg-primary rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
          <div className="w-1 h-1 bg-primary rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
          <div className="w-1 h-1 bg-primary rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
        </div>
      )}
    </div>
  );
};

export default StatusIndicator;