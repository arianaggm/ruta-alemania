const footerLinks = [
  { label: "Instagram", href: "#" },
  { label: "GitHub", href: "#" },
  { label: "Contacto", href: "#" },
];

export function Footer() {
  return (
    <footer className="px-4 pb-8 pt-6 sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 rounded-[2rem] border border-dark-text/8 bg-white/82 px-6 py-8 shadow-[0_18px_50px_rgba(43,30,36,0.08)] sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="font-display text-2xl font-semibold text-dark-text">
            Ruta Alemania
          </p>
          <p className="mt-2 text-sm text-dark-text/68">
            Becas, guías y recursos para estudiar en Alemania desde México.
          </p>
        </div>
        <div className="flex flex-wrap items-center justify-start gap-3 sm:justify-end">
          {footerLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="rounded-full border border-rosa-mexicano/16 bg-peach-fuzz/55 px-4 py-2 text-sm font-medium text-dark-text hover:border-rosa-mexicano hover:bg-peach-fuzz"
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
