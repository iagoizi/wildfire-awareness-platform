import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import ScrollToTop from "@/components/ScrollToTop";
import Home from "./pages/Home";
import DenunciarQueimada from "./pages/DenunciarQueimada";
import NotFound from "./pages/NotFound";
import Articles from "./pages/Articles";
import ArticleDetail from "./pages/ArticleDetail";
import CMSLogin from "./pages/CMS/Login";
import ArticleManager from "./pages/CMS/ArticleManager";
import PrivateRoute from "./components/PrivateRoute";
import { AuthProvider } from "./contexts/AuthContext";
import { routes } from "./routes";

const queryClient = new QueryClient();

const App = () => (
  <HelmetProvider>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <ScrollToTop />
            <Routes>
              <Route path={routes.home} element={<Home />} />
              <Route path={routes.report} element={<DenunciarQueimada />} />
              <Route path={routes.articles} element={<Articles />} />
              <Route path={routes.articleDetail} element={<ArticleDetail />} />
              <Route path={routes.cmsLogin} element={<CMSLogin />} />
              <Route
                path={routes.cmsArticles}
                element={
                  <PrivateRoute>
                    <ArticleManager />
                  </PrivateRoute>
                }
              />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </AuthProvider>
    </QueryClientProvider>
  </HelmetProvider>
);

export default App;
