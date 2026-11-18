import WhatsAppButton from "../ui/WhatsAppButton";

export default function Hero({ config }) {
  const { hero, negocio } = config;
  return (
    <section id="inicio" className="pt-20 md:pt-24 pb-10">
      <div className="w-full mx-auto">
        {/*
          ⚠️ NOTA DE LAYOUT (no tocar sin leer) 18/11/2026:
          - El contenedor usa `md:aspect-5712/3230` para mantener la proporción del hero en desktop.
          - El video/imagen usan `object-cover` para llenar el contenedor sin dejar espacios.
          - NO agregar `overflow-x-hidden` en App.jsx: causaba un overflow falso en este Hero
            (el aspect-ratio + el video generaban un ancho mayor al viewport que el parche recortaba).
          - Si aparece scroll horizontal, revisar este contenedor y el aspect-ratio antes que nada.
        */}
        {/* Card horizontal con la foto de fondo */}
        <div className="relative w-full shadow-xl overflow-hidden min-h-125 md:min-h-0 md:aspect-5712/3230">
          {/* Render condicional: video o imagen */}
          {hero.tipo === "video" ? (
            <video
              src={hero.ruta}
              poster={hero.poster}
              autoPlay
              loop
              muted
              playsInline
              className="absolute inset-0 w-full h-full object-cover object-center"
            />
          ) : (
            <img
              src={hero.ruta}
              alt={negocio.nombre}
              className="absolute inset-0 w-full h-full object-cover md:object-contain object-center"
            />
          )}

          {/* Overlay oscuro */}
          <div className="absolute inset-0 bg-linear-to-r from-black/70 via-black/35 to-transparent" />

          {/* Texto encima */}
          <div className="relative z-10 h-full flex flex-col justify-end md:justify-start p-5 md:p-16 md:pt-20">
            <div className="max-w-md text-white">
              <h2 className="font-eslogan text-xl sm:text-2xl md:text-4xl text-justify font-extralight mt-4 md:mt-10">
                {hero.titulo}
              </h2>

              <p className="font-eslogan-2 text-sm sm:text-base md:text-xl font-light text-white mt-4 md:mt-10">
                {hero.subtitulo}
              </p>
              {/* Botón de WhatsApp */}
              <div className="mt-5 md:mt-10">
                <WhatsAppButton
                  mensaje={
                    hero.whatsappMensaje ||
                    "Hola, vengo desde su página web y quisiera más información."
                  }
                  variant="primary"
                  className="text-sm! md:text-base! px-4! md:px-6! py-2! md:py-3!"
                >
                  {hero.ctaTexto || "Ver más"}
                </WhatsAppButton>
              </div>
              {/* Identidad: en desktop absoluta arriba a la derecha, en móvil debajo del texto */}
              <div className="mt-6 flex flex-col items-start gap-1 md:mt-0 md:absolute md:top-24 md:right-18 md:items-end md:text-right">
                <p className="font-eslogan text-lg md:text-xl font-light text-white leading-tight">
                  {negocio.nombre}
                </p>
                <p className="text-xs md:text-sm uppercase tracking-wide font-medium text-green-200">
                  {negocio.eslogan}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
