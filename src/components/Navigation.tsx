
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Home, Headphones, BookOpen, MessageSquare } from "lucide-react";

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { icon: Home, label: "Home", path: "/" },
    { icon: Headphones, label: "Podcasts", path: "/podcasts" },
    { icon: BookOpen, label: "Library", path: "/library" },
    { icon: MessageSquare, label: "Forum", path: "/forum" },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <>
      {/* Mobile Navigation */}
      <div className="fixed bottom-0 left-0 right-0 z-50 lg:hidden">
        <nav className="bg-background/95 backdrop-blur-sm border-t px-4 py-2 flex justify-around items-center">
          {navItems.map(({ icon: Icon, label, path }) => (
            <Link
              key={path}
              to={path}
              className={`flex flex-col items-center space-y-0.5 transition-colors rounded-full p-2 ${
                isActive(path)
                  ? "bg-primary text-primary-foreground"
                  : "bg-[#403E43] text-white hover:bg-[#8A898C]"
              }`}
            >
              <Icon size={16} />
              <span className="text-[10px]">{label}</span>
            </Link>
          ))}
        </nav>
      </div>

      {/* Desktop Navigation */}
      <div className="hidden lg:block fixed left-0 top-0 h-full z-50">
        <nav className="glass h-full w-64 p-6 flex flex-col space-y-8">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-full bg-primary" />
            <span className="font-semibold">EduPod</span>
          </div>
          
          <div className="space-y-4">
            {navItems.map(({ icon: Icon, label, path }) => (
              <Link
                key={path}
                to={path}
                className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                  isActive(path)
                    ? "bg-primary text-primary-foreground"
                    : "hover:bg-secondary"
                }`}
              >
                <Icon size={20} />
                <span>{label}</span>
              </Link>
            ))}
          </div>
        </nav>
      </div>
    </>
  );
};

export default Navigation;
