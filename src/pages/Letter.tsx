import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const letterContent = `Nitesh,

I'm not sure how to start this without sounding overly emotional, so I'll just say it straight — thank you for being the kind of friend I didn't know I needed.

When we first met, when I joined you and Aryan talking that first day, I didn't think much of it. But somehow, that simple moment became the start of something I didn't expect. Trust came easy with you — not because we tried, but because it just felt natural. Over these 2.5 years, that trust only got deeper.

I won't lie, we've done some stupid things. Going to Hetauda without RC or license? Absolutely reckless. But that's the thing — those crazy moments somehow became the ones I'll never forget. Every bike ride we took, every random conversation, every late-night talk — they all started as small moments but turned into something bigger.

You taught me what loyalty really means. Even when we went to different colleges, even when life got busy, even when we didn't talk for a while, our bond stayed the same. That's rare, and I know it.

We've both felt the pain of not being chosen by the people we loved. That hurt brought us closer. I think we understood each other's silence in ways words couldn't explain. And you supported me through my worst decisions — even when I went back to toxic situations. You didn't lecture me. You were just there. That meant more than you know.

You reminded me what real friendship looks like — no pretending, no hiding, just being ourselves. I never had to act around you. Neither did you. And that's something I'll always value.

I know you said you hope I'll always be around. I want you to know — I will be. When I ride my bike alone, I think of you. When I see a chowmein shop, I remember our stupid canteen escapes. When I look at old photos, I see us growing into who we are now.

Five years from now, I see us playing with each other's kids. Maybe even spending our retirement somewhere peaceful, away from the crowd, growing our own vegetables, raising animals, living quietly. That's the kind of future I want with you in it — not as a distant memory, but as someone who's still here.

If I'm ever not around, I want you to remember this: you can do anything in your life. Trust yourself. You've always been stronger than you think.

This letter isn't goodbye. It's a promise — that no matter where life takes us, the bond we built stays. Because what we have isn't just friendship. It's brotherhood.

Always,
Your Friend`;

const Letter = () => {
  const [revealedText, setRevealedText] = useState("");
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    let currentIndex = 0;
    const interval = setInterval(() => {
      if (currentIndex <= letterContent.length) {
        setRevealedText(letterContent.slice(0, currentIndex));
        currentIndex++;
      } else {
        setIsComplete(true);
        clearInterval(interval);
      }
    }, 30);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen pt-24 pb-16 px-4">
      <div className="container mx-auto max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-3xl md:text-5xl font-bold text-primary mb-2">
            If I'm Not There
          </h1>
          <p className="text-accent text-sm">A letter from your friend</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="relative"
        >
          {/* Paper texture effect */}
          <div
            className="relative bg-card border border-border rounded-2xl p-8 md:p-12 shadow-2xl"
            style={{
              background: "linear-gradient(to bottom, hsl(var(--card)), hsl(var(--card) / 0.95))",
            }}
          >
            {/* Ambient glow */}
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/5 to-accent/5 pointer-events-none" />
            
            <div className="relative space-y-4">
              <div className="text-foreground leading-relaxed whitespace-pre-wrap font-serif">
                {revealedText}
                {!isComplete && (
                  <span className="inline-block w-1 h-5 bg-primary animate-pulse ml-1" />
                )}
              </div>
            </div>

            {isComplete && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="mt-8 pt-8 border-t border-border text-center"
              >
                <p className="text-muted-foreground italic">
                  This space exists so you'll never forget.
                </p>
              </motion.div>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Letter;
