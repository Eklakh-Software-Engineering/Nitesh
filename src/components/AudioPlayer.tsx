import { useState, useRef, useEffect } from "react";
import { Music, Volume2, VolumeX } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

const AudioPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(50);
  const [showControls, setShowControls] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.loop = true;
    audio.volume = volume / 100;

    // Load saved preferences
    const savedIsPlaying = localStorage.getItem("music-playing") === "true";
    const savedVolume = localStorage.getItem("music-volume");
    
    if (savedVolume) {
      const vol = parseInt(savedVolume);
      setVolume(vol);
      audio.volume = vol / 100;
    }

    if (savedIsPlaying) {
      audio.play().catch(() => {
        // Auto-play might be blocked by browser
        setIsPlaying(false);
      });
      setIsPlaying(true);
    }
  }, []);

  const toggleAudio = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
      localStorage.setItem("music-playing", "false");
      toast.info("Music paused");
    } else {
      audio.play().catch((error) => {
        console.error("Audio play failed:", error);
        toast.error("Click again to play - browser requires user interaction");
      });
      setIsPlaying(true);
      localStorage.setItem("music-playing", "true");
      toast.success("Playing brotherhood vibes ♫");
    }
  };

  const handleVolumeChange = (value: number[]) => {
    const newVolume = value[0];
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume / 100;
    }
    localStorage.setItem("music-volume", newVolume.toString());
  };

  const toggleMute = () => {
    if (volume > 0) {
      setVolume(0);
      if (audioRef.current) {
        audioRef.current.volume = 0;
      }
      localStorage.setItem("music-volume", "0");
    } else {
      setVolume(50);
      if (audioRef.current) {
        audioRef.current.volume = 0.5;
      }
      localStorage.setItem("music-volume", "50");
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Main Toggle Button */}
      <div className="relative">
        <Button
          onClick={toggleAudio}
          onMouseEnter={() => setShowControls(true)}
          onMouseLeave={() => setShowControls(false)}
          size="icon"
          className={cn(
            "w-14 h-14 rounded-full shadow-[0_0_30px_hsl(var(--primary)/0.5)] transition-all duration-300",
            isPlaying
              ? "bg-primary hover:bg-primary/90 animate-glow-pulse"
              : "bg-card border-2 border-primary/30 hover:border-primary/50"
          )}
        >
          <Music
            className={cn(
              "w-6 h-6 transition-transform duration-300",
              isPlaying ? "text-primary-foreground animate-pulse" : "text-primary"
            )}
          />
        </Button>

        {/* Volume Controls */}
        {showControls && (
          <div
            onMouseEnter={() => setShowControls(true)}
            onMouseLeave={() => setShowControls(false)}
            className="absolute bottom-full right-0 mb-4 bg-card/95 backdrop-blur-xl border border-border rounded-xl p-4 shadow-[0_0_30px_hsl(var(--primary)/0.3)] animate-fade-in min-w-[200px]"
          >
            <div className="space-y-3">
              <div className="text-xs font-medium text-muted-foreground text-center">
                Brotherhood Vibes
              </div>
              
              <div className="flex items-center gap-3">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={toggleMute}
                  className="w-8 h-8 flex-shrink-0"
                >
                  {volume > 0 ? (
                    <Volume2 className="w-4 h-4" />
                  ) : (
                    <VolumeX className="w-4 h-4" />
                  )}
                </Button>
                
                <Slider
                  value={[volume]}
                  onValueChange={handleVolumeChange}
                  max={100}
                  step={1}
                  className="flex-1"
                />
                
                <span className="text-xs text-muted-foreground w-8 text-right">
                  {volume}%
                </span>
              </div>

              <div className="text-xs text-center text-muted-foreground italic">
                {isPlaying ? "Playing..." : "Paused"}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Status Indicator */}
      {isPlaying && (
        <div className="absolute -top-1 -right-1 w-3 h-3 bg-accent rounded-full animate-pulse shadow-[0_0_10px_hsl(var(--accent)/0.8)]" />
      )}

      <audio ref={audioRef}>
        {/* Free ambient/lofi music - Replace with your own brotherhood-themed track */}
        <source src="https://cdn.pixabay.com/audio/2022/03/10/audio_4c3b8a7a8b.mp3" type="audio/mpeg" />
      </audio>
    </div>
  );
};

export default AudioPlayer;
