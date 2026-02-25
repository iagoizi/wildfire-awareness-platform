import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import { api } from "@/lib/api";
import { Lock } from "lucide-react";

const CMSLogin = () => {
    const navigate = useNavigate();
    const { login } = useAuth();
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({
        username: "",
        password: "",
    });
    const { toast } = useToast();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const response = await api.post("/auth/login", formData);
            
            // Usar a função login do contexto para atualizar o estado global
            login(response.data.token);
            
            toast({
                title: "Login realizado!",
                description: "Bem-vindo ao sistema de gerenciamento.",
            });

            // Redirecionar para o CMS
            navigate("/cms/artigos");
        } catch (error: any) {
            console.error("Login error:", error);
            toast({
                title: "Erro ao fazer login",
                description: error.response?.data?.error || "Credenciais inválidas.",
                variant: "destructive",
            });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            <Helmet>
                <title>Login - CMS</title>
                <meta name="description" content="Área administrativa do sistema" />
            </Helmet>

            <div className="min-h-screen bg-background flex items-center justify-center p-6">
                <Card className="w-full max-w-md bg-secondary/50 border-border">
                    <CardHeader className="space-y-1 text-center">
                        <div className="flex justify-center mb-4">
                            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                                <Lock className="w-8 h-8 text-primary" />
                            </div>
                        </div>
                        <CardTitle className="text-3xl font-display tracking-wide text-foreground">
                            Área Administrativa
                        </CardTitle>
                        <CardDescription className="text-cream-muted">
                            Entre com suas credenciais para acessar o sistema
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="username">Usuário</Label>
                                <Input
                                    id="username"
                                    type="text"
                                    placeholder="Digite seu usuário"
                                    value={formData.username}
                                    onChange={(e) =>
                                        setFormData({ ...formData, username: e.target.value })
                                    }
                                    required
                                    disabled={isLoading}
                                    className="bg-background border-border"
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="password">Senha</Label>
                                <Input
                                    id="password"
                                    type="password"
                                    placeholder="Digite sua senha"
                                    value={formData.password}
                                    onChange={(e) =>
                                        setFormData({ ...formData, password: e.target.value })
                                    }
                                    required
                                    disabled={isLoading}
                                    className="bg-background border-border"
                                />
                            </div>

                            <Button
                                type="submit"
                                variant="fire"
                                className="w-full"
                                disabled={isLoading}
                            >
                                {isLoading ? "Entrando..." : "Entrar"}
                            </Button>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </>
    );
};

export default CMSLogin;
