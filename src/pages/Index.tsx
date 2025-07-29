import SonicCryptHeader from "@/components/SonicCryptHeader";
import EncryptionPanel from "@/components/EncryptionPanel";
import DecryptionPanel from "@/components/DecryptionPanel";
import { Card } from "@/components/ui/card";
import { Github, Linkedin } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <SonicCryptHeader />
      
      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-7xl mx-auto">
          {/* Encryption Panel */}
          <Card className="border-primary/30 bg-card/50 backdrop-blur-sm">
            <EncryptionPanel />
          </Card>
          
          {/* Decryption Panel */}
          <Card className="border-primary/30 bg-card/50 backdrop-blur-sm">
            <DecryptionPanel />
          </Card>
        </div>
        
        {/* Footer info */}
        <div className="mt-12 text-center">
          <div className="border border-primary/20 rounded-sm p-4 bg-card/30 max-w-2xl mx-auto">
            <h3 className="font-mono text-primary text-lg mb-2">SYSTEM_INFO</h3>
            <div className="text-sm font-mono text-muted-foreground space-y-1">
              <div>SSTV Protocol: Slow Scan Television Audio Encoding</div>
              <div>Encryption Method: Audio frequency modulation</div>
              <div>Supported Formats: Text → WAV, Image → WAV, WAV → Text</div>
              <div>Security Level: Experimental/Educational</div>
            </div>
          </div>
        </div>
        
        {/* Credits */}
        <div className="mt-8 text-center">
          <div className="border border-primary/20 rounded-sm p-4 bg-card/30 max-w-lg mx-auto">
            <div className="font-mono text-primary text-sm mb-3">
              Made by <span className="text-accent font-bold">Gyana Ranjan Kar</span>
            </div>
            <div className="flex items-center justify-center space-x-4 mb-3">
              <a
                href="https://www.linkedin.com/in/gyana-ranjan-kar-972588356"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-1 text-primary hover:text-accent transition-colors"
              >
                <Linkedin className="w-4 h-4" />
                <span className="text-xs font-mono">LinkedIn</span>
              </a>
              <a
                href="https://github.com/itsgyanranjan"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-1 text-primary hover:text-accent transition-colors"
              >
                <Github className="w-4 h-4" />
                <span className="text-xs font-mono">GitHub</span>
              </a>
            </div>
            <div className="text-xs font-mono text-muted-foreground">
              © {new Date().getFullYear()} Gyana Ranjan Kar. All rights reserved.
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
