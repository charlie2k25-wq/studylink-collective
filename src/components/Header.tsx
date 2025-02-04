import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { MessageSquare, ShoppingCart, Search, Download, Menu, X, Users, Bell } from "lucide-react";
import { Button } from "./ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import { Input } from "./ui/input";
import { cn } from "@/lib/utils";

const Header = () => {
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  // Navigation items for the side menu
  const navigationItems = [
    { path: "/forum", label: "Forum", icon: MessageSquare },
    { path: "/downloads", label: "Downloads", icon: Download },
  ];

  // App bar items
  const appBarItems = [
    { path: "/store", label: "Store", icon: ShoppingCart },
    { path: "/study-groups", label: "Study Groups", icon: Users },
    { path: "/notifications", label: "Notifications", icon: Bell },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="mr-2">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="pr-0">
            <SheetHeader>
              <SheetTitle>Navigation</SheetTitle>
            </SheetHeader>
            <nav className="flex flex-col space-y-4 mt-4">
              {navigationItems.map(({ path, label, icon: Icon }) => (
                <Link
                  key={path}
                  to={path}
                  className={cn(
                    "flex items-center space-x-2 text-sm font-medium",
                    isActive(path)
                      ? "text-foreground"
                      : "text-foreground/60"
                  )}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <Icon className="h-5 w-5" />
                  <span>{label}</span>
                </Link>
              ))}
            </nav>
          </SheetContent>
        </Sheet>

        <div className="flex flex-1 items-center justify-between space-x-2">
          <div className={cn("flex-1", isSearchVisible ? "block" : "hidden md:block")}>
            <div className="relative">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search..."
                className="pl-8 md:w-[200px] lg:w-[300px]"
              />
            </div>
          </div>

          {/* App bar items */}
          <div className="flex items-center space-x-2">
            {appBarItems.map(({ path, icon: Icon }) => (
              <Link
                key={path}
                to={path}
                className={cn(
                  "p-2",
                  isActive(path)
                    ? "text-foreground"
                    : "text-foreground/60"
                )}
              >
                <Icon className="h-5 w-5" />
              </Link>
            ))}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsSearchVisible(!isSearchVisible)}
            >
              {isSearchVisible ? (
                <X className="h-5 w-5" />
              ) : (
                <Search className="h-5 w-5" />
              )}
              <span className="sr-only">Toggle search</span>
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;