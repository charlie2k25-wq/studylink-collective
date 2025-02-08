
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Home, Headphones, BookOpen, MessageSquare, User } from "lucide-react";

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { icon: Home, label: "Home", path: "/" },
    { icon: Headphones, label: "Podcasts", path: "/podcasts" },
    { icon: BookOpen, label: "Library", path: "/library" },
    { icon: MessageSquare, label: "Forum", path: "/forum" },
    { icon: User, label: "Account", path: "/profile" },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <>
      {/* Mobile Navigation */}
      <div className="fixed bottom-0 left-0 right-0 z-50 lg:hidden">
        <nav className="bg-white border-t px-4 py-2 flex justify-around items-center shadow-lg">
          {navItems.map(({ icon: Icon, label, path }) => (
            <Link
              key={path}
              to={path}
              className="flex flex-col items-center space-y-1 relative w-16 py-2"
            >
              {isActive(path) && (
                <div 
                  className="absolute inset-0 bg-primary/10 rounded-full -z-10"
                  style={{ transform: 'scale(0.85)' }}
                />
              )}
              <Icon 
                size={20} 
                className={`transition-colors ${
                  isActive(path) 
                    ? "text-primary" 
                    : "text-gray-500"
                }`}
              />
              <span 
                className={`text-xs transition-colors ${
                  isActive(path)
                    ? "text-primary font-medium"
                    : "text-gray-500"
                }`}
              >
                {label}
              </span>
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
          
          <div className="space-y-2">
            {navItems.map(({ icon: Icon, label, path }) => (
              <Link
                key={path}
                to={path}
                className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-all ${
                  isActive(path)
                    ? "bg-primary text-primary-foreground"
                    : "hover:bg-secondary text-gray-500 hover:text-gray-900"
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

