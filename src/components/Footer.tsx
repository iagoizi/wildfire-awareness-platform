import { Flame } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-secondary py-12">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-3 gap-8 items-start">
          {/* Brand */}
          <div>
            <p className="text-sm text-muted-foreground mb-2">Plataforma de denúncias</p>
            <div className="flex items-center gap-2">
              <h3 className="font-display text-xl font-bold text-foreground">
                Denuncie Queimadas
              </h3>
              <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                <Flame className="w-4 h-4 text-primary" />
              </div>
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Sobre</h4>
            <ul className="space-y-2">
              <li>
                <a href="/" className="text-cream-muted hover:text-primary transition-colors underline">
                  Página inicial
                </a>
              </li>
              <li>
                <a href="#artigos" className="text-cream-muted hover:text-primary transition-colors underline">
                  Artigos
                </a>
              </li>
              <li>
                <a href="#denuncia" className="text-cream-muted hover:text-primary transition-colors underline">
                  Fazer denúncia!
                </a>
              </li>
            </ul>
          </div>

          {/* Project Info */}
          <div className="text-right">
            <p className="text-sm text-muted-foreground mb-2">
              Detalhes do desenvolvimento do projeto:
            </p>
            <a
              href="https://github.com/iagoizi/wildfire-awareness-platform"
              target="_blank"
              rel="noopener noreferrer"
              className="text-cream-muted hover:text-primary transition-colors underline text-sm break-all"
            >
              https://github.com/iagoizi/wildfire-awareness-platform
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
