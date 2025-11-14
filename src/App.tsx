import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Constellation from "./pages/Constellation";
import Moments from "./pages/Moments";
import Lessons from "./pages/Lessons";
import Letter from "./pages/Letter";
import Capsule from "./pages/Capsule";
import Timeline from "./pages/Timeline";
import NotFound from "./pages/NotFound";
import Navigation from "./components/Navigation";
import FloatingParticles from "./components/FloatingParticles";
import AudioPlayer from "./components/AudioPlayer";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <FloatingParticles />
        <Navigation />
        <AudioPlayer />
        <Routes>
          <Route path="/" element={<Constellation />} />
          <Route path="/moments" element={<Moments />} />
          <Route path="/lessons" element={<Lessons />} />
          <Route path="/letter" element={<Letter />} />
          <Route path="/capsule" element={<Capsule />} />
          <Route path="/timeline" element={<Timeline />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
