import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Plus, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const ReportForm = () => {
  const { toast } = useToast();
  const [photos, setPhotos] = useState<string[]>([]);
  const [formData, setFormData] = useState({
    estado: "",
    cidade: "",
    endereco: "",
    pontoReferencia: "",
    informacoesAdicionais: "",
  });

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && photos.length < 3) {
      const newPhotos = Array.from(files).slice(0, 3 - photos.length);
      newPhotos.forEach((file) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          setPhotos((prev) => [...prev, reader.result as string].slice(0, 3));
        };
        reader.readAsDataURL(file);
      });
    }
  };

  const removePhoto = (index: number) => {
    setPhotos((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Denúncia enviada!",
      description: "Obrigado por ajudar a proteger nossas florestas.",
    });
  };

  return (
    <section id="denuncia" className="section-forest py-24 relative overflow-hidden">
      {/* Decorative Tree */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 opacity-20 pointer-events-none">
        <svg
          width="400"
          height="500"
          viewBox="0 0 400 500"
          fill="none"
          className="text-earth-brown"
        >
          <path
            d="M200 50C200 50 100 150 100 250C100 350 150 400 200 450C250 400 300 350 300 250C300 150 200 50 200 50Z"
            fill="currentColor"
          />
          <rect x="180" y="400" width="40" height="100" fill="currentColor" />
        </svg>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Section Title */}
        <div className="text-center mb-16">
          <h2 className="font-display text-2xl md:text-3xl lg:text-4xl text-cream-muted uppercase tracking-widest mb-2">
            A fumaça que você vê é
          </h2>
          <h3 className="font-display text-3xl md:text-4xl lg:text-5xl text-primary uppercase tracking-widest">
            A floresta gritando por ajuda
          </h3>
        </div>

        {/* Form Container */}
        <div className="max-w-3xl mx-auto">
          <div className="mb-8">
            <h4 className="text-xl font-semibold text-foreground mb-2">
              Quer denunciar uma queimada?
            </h4>
            <p className="text-muted-foreground">
              Forneça o máximo de detalhes possível sobre o local aproximado onde avistou a queimada.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Row 1: Estado & Cidade */}
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="estado" className="text-foreground">
                  Estado
                </Label>
                <Input
                  id="estado"
                  placeholder="Minas Gerais"
                  value={formData.estado}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, estado: e.target.value }))
                  }
                  className="bg-transparent border-border text-foreground placeholder:text-muted-foreground"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="cidade" className="text-foreground">
                  Cidade
                </Label>
                <Input
                  id="cidade"
                  placeholder="Ouro Preto"
                  value={formData.cidade}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, cidade: e.target.value }))
                  }
                  className="bg-transparent border-border text-foreground placeholder:text-muted-foreground"
                />
              </div>
            </div>

            {/* Row 2: Endereço & Ponto de Referência */}
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="endereco" className="text-foreground">
                  Endereço
                </Label>
                <Input
                  id="endereco"
                  placeholder="Rodovia, estrada ou endereço"
                  value={formData.endereco}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, endereco: e.target.value }))
                  }
                  className="bg-transparent border-border text-foreground placeholder:text-muted-foreground"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="pontoReferencia" className="text-foreground">
                  Ponto de referência
                </Label>
                <Input
                  id="pontoReferencia"
                  placeholder="Próximo a..."
                  value={formData.pontoReferencia}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      pontoReferencia: e.target.value,
                    }))
                  }
                  className="bg-transparent border-border text-foreground placeholder:text-muted-foreground"
                />
              </div>
            </div>

            {/* Row 3: Informações adicionais & Fotos */}
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="informacoes" className="text-foreground">
                  Informações adicionais
                </Label>
                <Textarea
                  id="informacoes"
                  placeholder="Horário aproximado em que avistou o fogo, se avistou alguma atitude suspeita antes ou após o surgimento da fumaça, etc."
                  value={formData.informacoesAdicionais}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      informacoesAdicionais: e.target.value,
                    }))
                  }
                  className="bg-muted border-border text-foreground placeholder:text-muted-foreground min-h-[120px] resize-none"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-foreground">Fotos de evidência</Label>
                <div className="flex gap-3 flex-wrap">
                  {photos.map((photo, index) => (
                    <div
                      key={index}
                      className="relative w-24 h-24 rounded-lg overflow-hidden border border-border"
                    >
                      <img
                        src={photo}
                        alt={`Evidência ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                      <button
                        type="button"
                        onClick={() => removePhoto(index)}
                        className="absolute top-1 right-1 w-5 h-5 bg-destructive rounded-full flex items-center justify-center"
                      >
                        <X className="w-3 h-3 text-destructive-foreground" />
                      </button>
                    </div>
                  ))}
                  {photos.length < 3 && (
                    <label className="w-24 h-24 border-2 border-dashed border-border rounded-lg flex items-center justify-center cursor-pointer hover:border-primary transition-colors">
                      <Plus className="w-6 h-6 text-muted-foreground" />
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handlePhotoUpload}
                        className="hidden"
                        multiple
                      />
                    </label>
                  )}
                </div>
                <p className="text-xs text-muted-foreground">Máximo: 3 fotos</p>
              </div>
            </div>

            {/* Submit Button */}
            <Button type="submit" variant="fire" size="lg" className="rounded-lg">
              Enviar denúncia!
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ReportForm;
