import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Download, Unlock, Copy } from "lucide-react";
import TerminalWindow from "./TerminalWindow";
import FileUpload from "./FileUpload";
import StatusIndicator from "./StatusIndicator";
import AudioVisualizer from "./AudioVisualizer";
import { toast } from "sonner";

const DecryptionPanel = () => {
  const [selectedAudio, setSelectedAudio] = useState<File | null>(null);
  const [status, setStatus] = useState<"idle" | "processing" | "success" | "error">("idle");
  const [decryptedData, setDecryptedData] = useState<string | null>(null);

  const handleDecrypt = async () => {
    if (!selectedAudio) {
      toast.error("Please select an audio file to decrypt");
      return;
    }

    setStatus("processing");
    
    // Simulate decryption process
    await new Promise(resolve => setTimeout(resolve, 4000));
    
    // Simulate decrypted result
    const simulatedResults = [
      "Hello from the encrypted world! This message was transmitted via SSTV audio encoding.",
      "SECRET_CODE: ALPHA-7739-BETA-OMEGA\nMission parameters decoded successfully.",
      "CLASSIFIED_DATA:\n{\n  \"agent\": \"007\",\n  \"location\": \"London\",\n  \"status\": \"Active\"\n}",
      "The quick brown fox jumps over the lazy dog. Encryption test successful!",
    ];
    
    const randomResult = simulatedResults[Math.floor(Math.random() * simulatedResults.length)];
    setDecryptedData(randomResult);
    setStatus("success");
    
    toast.success("Decryption completed successfully!");
  };

  const handleCopy = () => {
    if (decryptedData) {
      navigator.clipboard.writeText(decryptedData);
      toast.success("Decrypted text copied to clipboard!");
    }
  };

  const handleDownloadText = () => {
    if (decryptedData) {
      const blob = new Blob([decryptedData], { type: "text/plain" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `decrypted_${Date.now()}.txt`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      toast.success("Decrypted text downloaded!");
    }
  };

  return (
    <TerminalWindow title="DECRYPTION_MODULE.exe" className="h-full">
      <div className="space-y-6">
        {/* File upload */}
        <FileUpload
          accept="audio/*,.wav,.mp3"
          onFileSelect={setSelectedAudio}
          label="INPUT_AUDIO:"
        />

        {/* Audio analysis */}
        <div className="border border-primary/20 rounded-sm p-4 bg-card/50">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-mono text-primary">SSTV_ANALYSIS:</span>
            <span className="text-xs font-mono text-muted-foreground">
              {status === "processing" ? "DECODING..." : selectedAudio ? "READY" : "WAITING"}
            </span>
          </div>
          <AudioVisualizer isActive={status === "processing"} barCount={30} />
        </div>

        {/* Audio file info */}
        {selectedAudio && (
          <div className="border border-primary/20 rounded-sm p-3 bg-primary/5">
            <div className="text-xs font-mono text-primary space-y-1">
              <div>FILE_NAME: {selectedAudio.name}</div>
              <div>FILE_SIZE: {(selectedAudio.size / 1024).toFixed(2)} KB</div>
              <div>AUDIO_TYPE: {selectedAudio.type || 'Unknown'}</div>
              <div>SCAN_MODE: {status === "processing" ? "Analyzing..." : "Robot 36 (Detected)"}</div>
            </div>
          </div>
        )}

        {/* Status and controls */}
        <div className="space-y-4">
          <StatusIndicator
            status={status}
            message={
              status === "idle" ? "Ready to decrypt" :
              status === "processing" ? "Decoding SSTV audio signal..." :
              status === "success" ? "Decryption complete" :
              "Decryption failed"
            }
          />

          <Button
            variant="glow"
            onClick={handleDecrypt}
            disabled={status === "processing" || !selectedAudio}
            className="w-full"
          >
            <Unlock className="w-4 h-4 mr-2" />
            DECRYPT
          </Button>
        </div>

        {/* Decrypted output */}
        {decryptedData && (
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm font-mono text-primary">DECRYPTED_OUTPUT:</span>
              <div className="flex space-x-2">
                <Button variant="terminal" size="sm" onClick={handleCopy}>
                  <Copy className="w-3 h-3 mr-1" />
                  COPY
                </Button>
                <Button variant="terminal" size="sm" onClick={handleDownloadText}>
                  <Download className="w-3 h-3 mr-1" />
                  SAVE
                </Button>
              </div>
            </div>
            
            <div className="border border-primary/30 rounded-sm p-4 bg-card/30 max-h-40 overflow-y-auto">
              <pre className="font-mono text-sm text-primary whitespace-pre-wrap">
                {decryptedData}
              </pre>
            </div>
            
            <div className="text-xs font-mono text-muted-foreground">
              CONFIDENCE: 97.3% | FORMAT: Plain Text | ENCODING: UTF-8
            </div>
          </div>
        )}
      </div>
    </TerminalWindow>
  );
};

export default DecryptionPanel;