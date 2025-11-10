import { useState, useRef, useEffect } from "react";
import { Music, Volume2, VolumeX } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const AudioPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.volume = 0.3;
    audio.loop = true;
  }, []);

  const toggleAudio = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="fixed bottom-8 right-8 z-50">
      <Button
        onClick={toggleAudio}
        size="lg"
        className={cn(
          "rounded-full w-14 h-14 shadow-lg transition-all duration-300",
          "bg-card hover:bg-secondary border border-border",
          isPlaying && "shadow-[0_0_20px_hsl(var(--primary)/0.4)]"
        )}
      >
        {isPlaying ? (
          <Volume2 className="w-5 h-5 text-primary" />
        ) : (
          <VolumeX className="w-5 h-5 text-muted-foreground" />
        )}
      </Button>
      
      <audio ref={audioRef}>
        {/* Placeholder for ambient music - in production, add actual audio file */}
        {/* <source src="/ambient-music.mp3" type="audio/mpeg" /> */}
      </audio>
    </div>
  );
};

export default AudioPlayer;
