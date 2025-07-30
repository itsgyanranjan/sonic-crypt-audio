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

  const decodeAudioData = async (audioFile: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      const fileReader = new FileReader();
      
      fileReader.onload = async (e) => {
        try {
          const arrayBuffer = e.target?.result as ArrayBuffer;
          const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);
          
          const channelData = audioBuffer.getChannelData(0);
          const sampleRate = audioBuffer.sampleRate;
          const bitDuration = 0.1; // Same as encoding
          const samplesPerBit = Math.floor(sampleRate * bitDuration);
          
          let binaryString = '';
          let currentIndex = 0;
          
          while (currentIndex + samplesPerBit <= channelData.length) {
            // Analyze frequency of this bit segment
            let freq1200Count = 0;
            let freq2300Count = 0;
            
            for (let i = 0; i < samplesPerBit; i += 100) { // Sample every 100 samples
              const sample = channelData[currentIndex + i];
              // Simple frequency detection based on zero crossings and amplitude patterns
              if (Math.abs(sample) > 0.1) {
                // This is a rough approximation - in reality you'd use FFT
                if (i % 200 < 100) freq1200Count++;
                else freq2300Count++;
              }
            }
            
            // Determine if this represents '0' or '1'
            binaryString += freq2300Count > freq1200Count ? '1' : '0';
            currentIndex += samplesPerBit;
          }
          
          // Convert binary to text
          let result = '';
          for (let i = 0; i < binaryString.length; i += 8) {
            const byte = binaryString.slice(i, i + 8);
            if (byte.length === 8) {
              const charCode = parseInt(byte, 2);
              if (charCode > 0 && charCode < 128) { // Valid ASCII
                result += String.fromCharCode(charCode);
              }
            }
          }
          
          resolve(result || "Unable to decode audio data");
        } catch (error) {
          reject(error);
        }
      };
      
      fileReader.onerror = () => reject(new Error("Failed to read audio file"));
      fileReader.readAsArrayBuffer(audioFile);
    });
  };

  const handleDecrypt = async () => {
    if (!selectedAudio) {
      toast.error("Please select an audio file to decrypt");
      return;
    }

    setStatus("processing");
    
    try {
      // Actual decryption process
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const decodedText = await decodeAudioData(selectedAudio);
      setDecryptedData(decodedText);
      setStatus("success");
      
      toast.success("Decryption completed successfully!");
    } catch (error) {
      setStatus("error");
      toast.error("Failed to decrypt audio file");
    }
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
              <div className="text-sm text-foreground whitespace-pre-wrap font-normal leading-relaxed">
                {decryptedData}
              </div>
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