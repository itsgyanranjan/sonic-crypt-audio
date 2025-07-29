import { useEffect, useState } from "react";

const SonicCryptHeader = () => {
  const [glitchText, setGlitchText] = useState("SONIC CRYPT");
  
  useEffect(() => {
    const glitchInterval = setInterval(() => {
      const chars = "!@#$%^&*()_+-=[]{}|;:,.<>?";
      const original = "SONIC CRYPT";
      let result = "";
      
      for (let i = 0; i < original.length; i++) {
        if (Math.random() < 0.1) {
          result += chars[Math.floor(Math.random() * chars.length)];
        } else {
          result += original[i];
        }
      }
      
      setGlitchText(result);
      
      setTimeout(() => setGlitchText(original), 50);
    }, 3000);
    
    return () => clearInterval(glitchInterval);
  }, []);

  return (
    <header className="border-b border-primary/30 bg-card/50 backdrop-blur-sm">
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-gradient-to-br from-primary to-accent rounded-sm flex items-center justify-center">
              <div className="text-2xl font-bold text-primary-foreground">SC</div>
            </div>
            <div>
              <h1 className="text-3xl font-bold matrix-text glitch" data-text={glitchText}>
                {glitchText}
              </h1>
              <p className="text-muted-foreground text-sm font-mono">
                SSTV Audio Encryption & Decryption System
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-primary rounded-full animate-pulse"></div>
            <span className="text-sm font-mono text-primary">ONLINE</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default SonicCryptHeader;