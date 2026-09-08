import { ArrowRight, Circle } from "lucide-react";

const sections = [
  { label: "Problema", href: "#problema" },
  { label: "Solución", href: "#como-funciona" },
  { label: "MVP", href: "/mvp", external: true },
  { label: "Preguntas", href: "#faq" },
];

const SectionGuide = () => {
  return (
    <div className="sticky top-16 lg:top-20 z-40 border-b border-border/70 bg-background/90 backdrop-blur-md">
      <div className="container-max overflow-x-auto">
        <nav className="flex min-w-max items-center justify-center gap-1 py-2" aria-label="Recorrido de PagoCampo">
          <span className="px-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground hidden sm:inline">Recorrido</span>
          {sections.map((section, index) => (
            <div key={section.label} className="flex items-center">
              {index > 0 && <ArrowRight className="mx-1 h-3.5 w-3.5 text-muted-foreground/50" />}
              <a
                href={section.href}
                className="group inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-sm font-medium text-muted-foreground transition-all hover:bg-primary/10 hover:text-primary"
              >
                <Circle className="h-2.5 w-2.5 fill-current opacity-60 group-hover:opacity-100" />
                {section.label}
              </a>
            </div>
          ))}
        </nav>
      </div>
    </div>
  );
};

export default SectionGuide;
