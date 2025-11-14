import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const WelcomeScreen = () => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const hasVisited = localStorage.getItem("has-visited");
    if (!hasVisited) {
      setShow(true);
      localStorage.setItem("has-visited", "true");
    }
  }, []);

  if (!show) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.8 }}
        className="fixed inset-0 z-[100] bg-background flex items-center justify-center"
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="text-center space-y-8 px-4"
        >
          {/* Circuit animation */}
          <div className="relative w-32 h-32 mx-auto">
            <motion.div
              initial={{ scale: 0, rotate: 0 }}
              animate={{ scale: 1, rotate: 360 }}
              transition={{ delay: 0.5, duration: 1.5, ease: "easeOut" }}
              className="absolute inset-0 border-4 border-primary rounded-full"
            />
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 1, duration: 0.8 }}
              className="absolute inset-0 flex items-center justify-center"
            >
              <div className="text-4xl font-bold text-primary">N</div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 1, 0] }}
              transition={{ delay: 1.5, duration: 2, repeat: Infinity }}
              className="absolute inset-0 border-2 border-accent rounded-full animate-glow-pulse"
            />
          </div>

          {/* Text */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.8 }}
            className="space-y-4"
          >
            <h1 className="text-3xl md:text-5xl font-bold bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
              Initializing Memory Sequence
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground">
              For: <span className="text-primary font-semibold">Nitesh</span>
            </p>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.8, duration: 0.8 }}
              className="text-sm text-muted-foreground italic"
            >
              Loading the archive of brotherhood...
            </motion.p>
          </motion.div>

          {/* Progress bars */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2, duration: 0.5 }}
            className="space-y-2 max-w-md mx-auto"
          >
            {["Memories", "Moments", "Lessons"].map((item, i) => (
              <motion.div
                key={item}
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ delay: 2.2 + i * 0.3, duration: 0.8 }}
                className="h-1 bg-primary/20 rounded-full overflow-hidden"
              >
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  transition={{ delay: 2.2 + i * 0.3, duration: 0.8 }}
                  className="h-full bg-gradient-to-r from-primary to-accent"
                />
              </motion.div>
            ))}
          </motion.div>

          {/* Auto-dismiss */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 3.5, duration: 0.5 }}
            onAnimationComplete={() => {
              setTimeout(() => setShow(false), 1000);
            }}
          >
            <motion.button
              onClick={() => setShow(false)}
              className="text-sm text-accent hover:text-primary transition-colors cursor-pointer border-none bg-transparent"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Press any key or click to enter →
            </motion.button>
          </motion.div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default WelcomeScreen;
