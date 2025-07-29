import SonicCryptHeader from "@/components/SonicCryptHeader";
import EncryptionPanel from "@/components/EncryptionPanel";
import DecryptionPanel from "@/components/DecryptionPanel";
import { Card } from "@/components/ui/card";

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
      </main>
    </div>
  );
};

export default Index;
