import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Download, Lock, FileText, Image, Play, Pause } from "lucide-react";
import TerminalWindow from "./TerminalWindow";
import FileUpload from "./FileUpload";
import StatusIndicator from "./StatusIndicator";
import AudioVisualizer from "./AudioVisualizer";
import { toast } from "sonner";

const EncryptionPanel = () => {
  const [textInput, setTextInput] = useState("");
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [status, setStatus] = useState<"idle" | "processing" | "success" | "error">("idle");
  const [encryptedFile, setEncryptedFile] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<"text" | "image">("text");
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  const handleEncrypt = async () => {
    if (!textInput.trim() && !selectedImage) {
      toast.error("Please enter text or select an image to encrypt");
      return;
    }

    setStatus("processing");
    
    // Simulate encryption process
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    // Create a simulated WAV file URL
    const blob = new Blob(["Simulated SSTV audio data"], { type: "audio/wav" });
    const url = URL.createObjectURL(blob);
    setEncryptedFile(url);
    setStatus("success");
    
    toast.success("Encryption completed successfully!");
  };

  const handleDownload = () => {
    if (encryptedFile) {
      const a = document.createElement("a");
      a.href = encryptedFile;
      a.download = `encrypted_${Date.now()}.wav`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      toast.success("File downloaded successfully!");
    }
  };

  const handleImageSelect = (file: File) => {
    setSelectedImage(file);
    setTextInput(""); // Clear text when image is selected
  };

  const toggleAudio = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        audioRef.current.play();
        setIsPlaying(true);
      }
    }
  };

  return (
    <TerminalWindow title="ENCRYPTION_MODULE.exe" className="h-full">
      <div className="space-y-6">
        {/* Tab selection */}
        <div className="flex space-x-2 border-b border-primary/20 pb-2">
          <Button
            variant={activeTab === "text" ? "glow" : "ghost"}
            size="sm"
            onClick={() => setActiveTab("text")}
            className="flex items-center space-x-2"
          >
            <FileText className="w-4 h-4" />
            <span>TEXT</span>
          </Button>
          <Button
            variant={activeTab === "image" ? "glow" : "ghost"}
            size="sm"
            onClick={() => setActiveTab("image")}
            className="flex items-center space-x-2"
          >
            <Image className="w-4 h-4" />
            <span>IMAGE</span>
          </Button>
        </div>

        {/* Input section */}
        {activeTab === "text" ? (
          <div>
            <label className="block text-sm font-mono text-primary mb-2">
              INPUT_TEXT:
            </label>
            <Textarea
              value={textInput}
              onChange={(e) => {
                setTextInput(e.target.value);
                setSelectedImage(null); // Clear image when text is entered
              }}
              placeholder="Enter your secret message here..."
              className="min-h-[120px] bg-input border-primary/30 font-mono text-primary resize-none"
            />
          </div>
        ) : (
          <FileUpload
            accept="image/*"
            onFileSelect={handleImageSelect}
            label="INPUT_IMAGE:"
          />
        )}

        {/* Audio visualizer */}
        <div className="border border-primary/20 rounded-sm p-4 bg-card/50">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-mono text-primary">AUDIO_PREVIEW:</span>
            <span className="text-xs font-mono text-muted-foreground">
              {status === "processing" ? "ENCODING..." : "READY"}
            </span>
          </div>
          <AudioVisualizer isActive={status === "processing"} />
        </div>

        {/* Status and controls */}
        <div className="space-y-4">
          <StatusIndicator
            status={status}
            message={
              status === "idle" ? "Ready to encrypt" :
              status === "processing" ? "Encrypting to SSTV audio..." :
              status === "success" ? "Encryption complete" :
              "Encryption failed"
            }
          />

          <div className="flex space-x-3">
            <Button
              variant="glow"
              onClick={handleEncrypt}
              disabled={status === "processing" || (!textInput.trim() && !selectedImage)}
              className="flex-1"
            >
              <Lock className="w-4 h-4 mr-2" />
              ENCRYPT
            </Button>
            
            {encryptedFile && (
              <Button variant="cyber" onClick={handleDownload}>
                <Download className="w-4 h-4 mr-2" />
                DOWNLOAD
              </Button>
            )}
          </div>
        </div>

        {/* Audio Player */}
        {encryptedFile && (
          <div className="border border-primary/20 rounded-sm p-4 bg-card/50">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm font-mono text-primary">ENCRYPTED_AUDIO:</span>
              <Button
                variant="ghost"
                size="sm"
                onClick={toggleAudio}
                className="h-8 w-8 p-0"
              >
                {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
              </Button>
            </div>
            <audio
              ref={audioRef}
              src={encryptedFile}
              onEnded={() => setIsPlaying(false)}
              onPlay={() => setIsPlaying(true)}
              onPause={() => setIsPlaying(false)}
              className="w-full"
              controls
            />
          </div>
        )}

        {/* Output info */}
        {status === "success" && (
          <div className="border border-primary/20 rounded-sm p-3 bg-primary/5">
            <div className="text-xs font-mono text-primary space-y-1">
              <div>OUTPUT_FORMAT: WAV (SSTV)</div>
              <div>ENCRYPTION_TYPE: Slow Scan Television</div>
              <div>FILE_SIZE: ~2.3 MB</div>
              <div>FREQUENCY_RANGE: 1200-2300 Hz</div>
            </div>
          </div>
        )}
      </div>
    </TerminalWindow>
  );
};

export default EncryptionPanel;