import { ArrowRight, Circle } from "lucide-react";

const sections = [
  { label: "Problema", href: "#problema" },
  { label: "Solución", href: "#como-funciona" },
  { label: "MVP", href: "/mvp", external: true },
  { label: "Preguntas", href: "#faq" },
];

const SectionGuide = () => {
  const go = (href: string, external?: boolean) => {
    if (external) {
      window.location.assign(href);
      return;
    }
    const element = document.querySelector(href);
    if (element) element.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="sticky top-20 lg:top-[84px] z-40 border-b border-border/70 bg-background/95 shadow-sm backdrop-blur-md">
      <div className="container-max overflow-x-auto">
        <nav className="flex min-w-max items-center justify-center gap-1 py-2.5" aria-label="Recorrido de PagoCampo">
          <span className="mr-2 hidden rounded-full bg-primary/10 px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-primary sm:inline">Recorrido</span>
          {sections.map((section, index) => (
            <div key={section.label} className="flex items-center">
              {index > 0 && <ArrowRight className="mx-1 h-3.5 w-3.5 text-muted-foreground/40" />}
              <button type="button" onClick={() => go(section.href, section.external)} className="group inline-flex items-center gap-2 rounded-full px-3.5 py-2 text-sm font-semibold text-muted-foreground transition-all hover:bg-muted hover:text-foreground">
                <Circle className="h-2.5 w-2.5 fill-current opacity-50 group-hover:opacity-100" />
                {section.label}
              </button>
            </div>
          ))}
        </nav>
      </div>
    </div>
  );
};

export default SectionGuide;
