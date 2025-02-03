import { useState } from "react";
import { Link } from "react-router-dom";
import { MessageSquare, ShoppingCart, Search, Download, Menu, X } from "lucide-react";
import { Button } from "./ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import { Input } from "./ui/input";

const Header = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <div className="mr-4 hidden md:flex">
          <Link to="/" className="mr-6 flex items-center space-x-2">
            <span className="hidden font-bold sm:inline-block">
              StudyLink Collective
            </span>
          </Link>
          <nav className="flex items-center space-x-6 text-sm font-medium">
            <Link
              to="/forum"
              className="flex items-center space-x-2 text-muted-foreground hover:text-primary"
            >
              <MessageSquare className="h-4 w-4" />
              <span>Forum</span>
            </Link>
            <Link
              to="/store"
              className="flex items-center space-x-2 text-muted-foreground hover:text-primary"
            >
              <ShoppingCart className="h-4 w-4" />
              <span>Store</span>
            </Link>
            <Link
              to="/downloads"
              className="flex items-center space-x-2 text-muted-foreground hover:text-primary"
            >
              <Download className="h-4 w-4" />
              <span>Downloads</span>
            </Link>
          </nav>
        </div>
        
        <Sheet>
          <SheetTrigger asChild>
            <Button
              variant="ghost"
              className="mr-2 px-0 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 md:hidden"
            >
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle Menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="pr-0">
            <SheetHeader>
              <SheetTitle>Navigation</SheetTitle>
            </SheetHeader>
            <nav className="flex flex-col space-y-4 mt-4">
              <Link
                to="/forum"
                className="flex items-center space-x-2 text-muted-foreground hover:text-primary"
              >
                <MessageSquare className="h-4 w-4" />
                <span>Forum</span>
              </Link>
              <Link
                to="/store"
                className="flex items-center space-x-2 text-muted-foreground hover:text-primary"
              >
                <ShoppingCart className="h-4 w-4" />
                <span>Store</span>
              </Link>
              <Link
                to="/downloads"
                className="flex items-center space-x-2 text-muted-foreground hover:text-primary"
              >
                <Download className="h-4 w-4" />
                <span>Downloads</span>
              </Link>
            </nav>
          </SheetContent>
        </Sheet>

        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          <div className="w-full flex-1 md:w-auto md:flex-none">
            <Button
              variant="ghost"
              className="w-9 px-0"
              onClick={() => setIsSearchOpen(!isSearchOpen)}
            >
              <Search className="h-4 w-4" />
              <span className="sr-only">Toggle search</span>
            </Button>
          </div>
        </div>
      </div>

      {isSearchOpen && (
        <div className="container py-4">
          <Input
            type="search"
            placeholder="Search podcasts, books, products..."
            className="w-full"
          />
        </div>
      )}
    </header>
  );
};

export default Header;