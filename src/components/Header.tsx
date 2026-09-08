import { useState, useEffect } from "react";
import { Menu, X, LogIn, User, LogOut, PlayCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { User as SupabaseUser } from "@supabase/supabase-js";
import AuthModal from "./AuthModal";
import logo from "@/assets/logo-pagocampo.png";

interface HeaderProps {
  onCtaClick: () => void;
}

const Header = ({ onCtaClick }: HeaderProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [user, setUser] = useState<SupabaseUser | null>(null);

  const navigation = [
    { name: "Beneficios", href: "#beneficios" },
    { name: "Cómo funciona", href: "#como-funciona" },
    { name: "Preguntas", href: "#faq" },
    { name: "Contacto", href: "#footer" },
  ];

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => setUser(session?.user ?? null));
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => setUser(session?.user ?? null));
    return () => subscription.unsubscribe();
  }, []);

  const handleAuthSuccess = () => setIsAuthModalOpen(false);
  const handleLogout = async () => { await supabase.auth.signOut(); };
  const openMvp = () => { window.location.href = "/mvp"; };

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur-md">
      <div className="container-max">
        <div className="flex h-16 items-center justify-between lg:h-20">
          <a href="#" className="mr-8 flex items-center"><img src={logo} alt="PagoCampo Logo" className="h-11 w-auto" /></a>

          <nav className="hidden items-center space-x-6 md:flex lg:space-x-8">
            {navigation.map((item) => (
              <a key={item.name} href={item.href} className="whitespace-nowrap font-medium text-muted-foreground transition-colors hover:text-foreground">{item.name}</a>
            ))}
          </nav>

          <div className="ml-6 hidden items-center space-x-3 md:flex lg:ml-8">
            <Button onClick={openMvp} variant="outline" size="sm"><PlayCircle className="mr-2 h-4 w-4" />Probar MVP</Button>
            {user ? (
              <div className="flex items-center space-x-3">
                <div className="flex items-center space-x-2"><User className="h-4 w-4 text-muted-foreground" /><span className="text-sm text-muted-foreground">{user.email?.split("@")[0]}</span></div>
                <Button onClick={handleLogout} variant="outline" size="sm"><LogOut className="mr-2 h-4 w-4" />Salir</Button>
              </div>
            ) : (
              <>
                <Button onClick={() => setIsAuthModalOpen(true)} variant="outline" size="sm"><LogIn className="mr-2 h-4 w-4" />Admin</Button>
                <Button onClick={onCtaClick} variant="cta" className="px-4 lg:px-6">Comienza hoy</Button>
              </>
            )}
          </div>

          <div className="md:hidden"><Button variant="ghost" size="sm" onClick={() => setIsMenuOpen(!isMenuOpen)} className="p-2">{isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}</Button></div>
        </div>

        {isMenuOpen && (
          <div className="border-t border-border md:hidden">
            <div className="space-y-1 px-2 pb-3 pt-2">
              {navigation.map((item) => <a key={item.name} href={item.href} onClick={() => setIsMenuOpen(false)} className="block px-3 py-2 text-muted-foreground transition-colors hover:text-foreground">{item.name}</a>)}
              <div className="space-y-2 px-3 py-2">
                <Button onClick={() => { openMvp(); setIsMenuOpen(false); }} variant="outline" className="w-full"><PlayCircle className="mr-2 h-4 w-4" />Probar MVP</Button>
                {user ? (
                  <Button onClick={() => { handleLogout(); setIsMenuOpen(false); }} variant="outline" className="w-full"><LogOut className="mr-2 h-4 w-4" />Salir</Button>
                ) : (
                  <>
                    <Button onClick={() => { setIsAuthModalOpen(true); setIsMenuOpen(false); }} variant="outline" className="w-full"><LogIn className="mr-2 h-4 w-4" />Admin</Button>
                    <Button onClick={() => { onCtaClick(); setIsMenuOpen(false); }} variant="cta" className="w-full">Comienza hoy</Button>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
      <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} onAuthSuccess={handleAuthSuccess} />
    </header>
  );
};

export default Header;
