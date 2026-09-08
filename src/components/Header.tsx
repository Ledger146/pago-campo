import { useState, useEffect } from "react";
import { Menu, X, LogIn, User, LogOut, PlayCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { User as SupabaseUser } from "@supabase/supabase-js";
import AuthModal from "./AuthModal";
import logo from "@/assets/logo-pagocampo.png";

interface HeaderProps { onCtaClick: () => void; }

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

  const handleLogout = async () => { await supabase.auth.signOut(); };
  const openMvp = () => { window.location.assign("/mvp"); };

  return (
    <header className="sticky top-0 z-50 border-b border-border/70 bg-background/95 backdrop-blur-md">
      <div className="container-max">
        <div className="flex h-20 items-center justify-between lg:h-[84px]">
          <a href="/" className="flex shrink-0 items-center" aria-label="Ir al inicio">
            <img src={logo} alt="PagoCampo" className="h-14 w-auto object-contain md:h-16" />
          </a>

          <nav className="hidden items-center gap-2 md:flex" aria-label="Navegación principal">
            {navigation.map((item) => (
              <a key={item.name} href={item.href} className="rounded-full px-4 py-2 text-sm font-semibold text-muted-foreground transition-colors hover:bg-muted hover:text-foreground">
                {item.name}
              </a>
            ))}
          </nav>

          <div className="ml-4 hidden items-center gap-2 md:flex">
            <Button onClick={openMvp} variant="outline" size="sm"><PlayCircle className="mr-2 h-4 w-4" />Probar MVP</Button>
            {user ? (
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2"><User className="h-4 w-4 text-muted-foreground" /><span className="text-sm text-muted-foreground">{user.email?.split("@")[0]}</span></div>
                <Button onClick={handleLogout} variant="outline" size="sm"><LogOut className="mr-2 h-4 w-4" />Salir</Button>
              </div>
            ) : (
              <>
                <Button onClick={() => setIsAuthModalOpen(true)} variant="outline" size="sm"><LogIn className="mr-2 h-4 w-4" />Admin</Button>
                <Button onClick={onCtaClick} variant="cta" className="px-5">Comienza hoy</Button>
              </>
            )}
          </div>

          <div className="md:hidden"><Button variant="ghost" size="sm" onClick={() => setIsMenuOpen(!isMenuOpen)} className="p-2" aria-label="Abrir menú">{isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}</Button></div>
        </div>

        {isMenuOpen && (
          <div className="border-t border-border md:hidden">
            <div className="space-y-1 px-2 pb-3 pt-2">
              {navigation.map((item) => <a key={item.name} href={item.href} onClick={() => setIsMenuOpen(false)} className="block rounded-lg px-3 py-2 text-muted-foreground hover:bg-muted hover:text-foreground">{item.name}</a>)}
              <div className="space-y-2 px-3 py-2">
                <Button onClick={() => { openMvp(); setIsMenuOpen(false); }} variant="outline" className="w-full"><PlayCircle className="mr-2 h-4 w-4" />Probar MVP</Button>
                {user ? <Button onClick={() => { handleLogout(); setIsMenuOpen(false); }} variant="outline" className="w-full"><LogOut className="mr-2 h-4 w-4" />Salir</Button> : <>
                  <Button onClick={() => { setIsAuthModalOpen(true); setIsMenuOpen(false); }} variant="outline" className="w-full"><LogIn className="mr-2 h-4 w-4" />Admin</Button>
                  <Button onClick={() => { onCtaClick(); setIsMenuOpen(false); }} variant="cta" className="w-full">Comienza hoy</Button>
                </>}
              </div>
            </div>
          </div>
        )}
      </div>
      <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} onAuthSuccess={() => setIsAuthModalOpen(false)} />
    </header>
  );
};

export default Header;
