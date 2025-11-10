import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const letterContent = `Dear Nitesh,

If you're reading this, it means you've walked through every corner of this digital space I built for us. Every memory, every lesson, every moment we shared — it's all here, preserved in code and pixels.

I built this not just as a tribute to our friendship, but as proof that some connections transcend physical presence. Even when we're apart, even when life takes us in different directions, this space exists as a reminder of what we built together.

You've taught me more than you realize. Not just about code or technology, but about persistence, loyalty, and what it means to truly show up for someone. Those 3 AM calls when we were both struggling? Those weren't just debugging sessions — they were lifelines.

Remember when we thought we'd never figure out that impossible bug? We sat in silence for what felt like hours, both too stubborn to give up. When we finally solved it, we didn't celebrate loudly. We just looked at each other and smiled, knowing we'd been through something together.

That's what friendship is, I think. Not the loud celebrations or grand gestures, but the quiet moments of shared struggle and silent understanding.

This archive will grow as we do. New memories will be added, new lessons learned, new moments captured. It's a living testament to a friendship that refuses to fade, no matter the distance or time.

So whenever you need a reminder of who you are, what you're capable of, or why you started this journey — come back here. This space exists beyond time, beyond distance, beyond the limitations of the physical world.

Thank you for being my friend, my partner in crime, and my brother in code.

Forever in the archive,
Arnima`;

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
          <h1 className="text-4xl md:text-6xl font-bold mb-4 text-primary">The Letter</h1>
          <p className="text-lg text-muted-foreground">If I'm not there.</p>
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
