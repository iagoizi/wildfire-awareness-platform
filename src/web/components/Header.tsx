import { Button } from "@/components/ui/button";
import { Flame } from "lucide-react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-secondary/95 backdrop-blur-sm">
      <div className="container mx-auto px-6">
        <nav className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-8">
            <a href="/" className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center border-2 border-primary/30">
                <Flame className="w-5 h-5 text-primary" />
              </div>
            </a>
            
            {/* Nav Links */}
            <div className="hidden md:flex items-center gap-6">
              <a 
                href="/" 
                className="text-foreground hover:text-primary transition-colors font-medium"
              >
                Página Inicial
              </a>
              <a 
                href="#artigos" 
                className="text-foreground hover:text-primary transition-colors font-medium"
              >
                Artigos
              </a>
            </div>
          </div>

          {/* CTA Button */}
          <Button asChild variant="cta" className="group">
            <Link to="/denunciar-queimada#denuncia">
              Avistei um incêndio!
              <Flame className="w-4 h-4 group-hover:animate-flame-flicker" />
            </Link>
          </Button>
        </nav>
      </div>
    </header>
  );
};

export default Header;
