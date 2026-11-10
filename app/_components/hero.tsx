import Link from "next/link";

export function Hero() {
  return (
    <section className="px-4 pb-12 pt-8 sm:px-6 lg:px-8 lg:pb-18 lg:pt-10">
      <div className="mx-auto grid max-w-6xl items-center gap-8 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-rosa-mexicano/15 bg-white/80 px-4 py-2 text-sm font-medium text-rosa-mexicano shadow-[0_12px_35px_rgba(43,30,36,0.06)]">
            Plataforma en español para estudiantes mexicanos
          </div>
          <h1 className="mt-6 font-display text-5xl font-semibold tracking-tight text-dark-text sm:text-6xl lg:text-7xl">
            Planea tus estudios en Alemania, paso a paso.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-dark-text/78 sm:text-xl">
            Explora guías y becas, crea tu ruta personalizada y organiza tus
            solicitudes a universidades desde un mismo lugar.
          </p>
          <div className="mt-8 flex flex-col gap-4 sm:flex-row">
            <Link
              href="/mi-ruta/empezar"
              className="inline-flex items-center justify-center rounded-full bg-rosa-mexicano px-6 py-3.5 text-base font-semibold text-white shadow-[0_18px_35px_rgba(212,68,122,0.28)] hover:-translate-y-0.5 hover:bg-[#8d2048]"
            >
              Crear Mi Ruta
            </Link>
            <Link
              href="/guias"
              className="inline-flex items-center justify-center rounded-full border border-rosa-mexicano/20 bg-white/75 px-6 py-3.5 text-base font-semibold text-dark-text hover:-translate-y-0.5 hover:border-rosa-mexicano hover:bg-white"
            >
              Explorar guías
            </Link>
          </div>
        </div>

        <div className="relative">
          <div className="absolute -left-6 top-10 h-24 w-24 rounded-full bg-butter/75 blur-2xl" />
          <div className="absolute -right-4 top-0 h-28 w-28 rounded-full bg-rosa-mexicano/20 blur-3xl" />
          <div className="relative overflow-hidden rounded-[2rem] border border-white/70 bg-white/80 p-8 shadow-[0_28px_80px_rgba(43,30,36,0.12)] backdrop-blur">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.24em] text-rosa-mexicano">
                  Mi Ruta
                </p>
                <h2 className="mt-3 font-display text-2xl font-semibold text-dark-text">
                  Un plan para avanzar a tu ritmo
                </h2>
              </div>
              <span className="rounded-full bg-butter px-3 py-1 text-xs font-semibold text-dark-text">
                Paso a paso
              </span>
            </div>

            <div className="mt-8 space-y-4">
              {[
                "Define qué quieres estudiar y en qué etapa estás.",
                "Consulta tareas y recursos según tus objetivos.",
                "Organiza solicitudes y registra tus avances.",
              ].map((item) => (
                <div
                  key={item}
                  className="flex items-start gap-3 rounded-3xl bg-peach-fuzz/70 p-4"
                >
                  <span className="mt-1 h-3 w-3 rounded-full bg-rosa-mexicano" />
                  <p className="text-sm leading-7 text-dark-text/80">{item}</p>
                </div>
              ))}
            </div>

            <div className="mt-8 rounded-3xl bg-antique-white p-5">
              <p className="text-sm font-semibold uppercase tracking-[0.22em] text-dark-text/70">
                Frase clave
              </p>
              <p className="mt-2 font-display text-2xl font-semibold text-dark-text">
                De México a la universidad alemana, paso a paso.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
