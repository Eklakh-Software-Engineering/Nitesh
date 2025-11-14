import { Link, useLocation } from "react-router-dom";
import { Home, Image, MessageSquare, Mail, BookOpen, Clock } from "lucide-react";
import { cn } from "@/lib/utils";

const Navigation = () => {
  const location = useLocation();

  const links = [
    { to: "/", icon: Home, label: "Constellation" },
    { to: "/moments", icon: Image, label: "Moments" },
    { to: "/timeline", icon: Clock, label: "Timeline" },
    { to: "/lessons", icon: MessageSquare, label: "Lessons" },
    { to: "/letter", icon: Mail, label: "Letter" },
    { to: "/capsule", icon: BookOpen, label: "Capsule" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-card/80 backdrop-blur-lg border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="text-xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            The Archive of Us
          </div>
          
          <div className="flex items-center gap-1">
            {links.map(({ to, icon: Icon, label }) => {
              const isActive = location.pathname === to;
              return (
                <Link
                  key={to}
                  to={to}
                  className={cn(
                    "flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-300",
                    "hover:bg-secondary hover:shadow-lg",
                    isActive && "bg-secondary/50 shadow-[0_0_15px_hsl(var(--primary)/0.3)]"
                  )}
                >
                  <Icon className={cn("w-4 h-4", isActive && "text-primary")} />
                  <span className={cn("text-sm hidden sm:inline", isActive && "text-primary font-medium")}>
                    {label}
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
