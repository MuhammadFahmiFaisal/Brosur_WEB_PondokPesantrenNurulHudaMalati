import React from "react";

interface HeroProps {
  onRegisterClick?: () => void;
}

const Hero: React.FC<HeroProps> = ({ onRegisterClick }) => {
  return (
    <section
      id="home"
      className="relative flex min-h-screen w-full items-center justify-center px-4 py-24 sm:px-6 lg:px-8 overflow-hidden bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: `linear-gradient(to top, rgba(10, 25, 47, 0.9) 0%, rgba(19, 164, 174, 0.2) 100%), url('https://res.cloudinary.com/dhovq374h/image/upload/v1765022669/bg_sfc4sd.jpg')`,
      }}
    >
      {/* Glow background */}
      <div className="absolute -top-10 -left-10 h-72 w-72 rounded-full bg-primary/20 blur-3xl animate-pulse"></div>
      <div className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-cyan-300/10 blur-[100px]"></div>

      <div className="container mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16 pt-16">

        {/* LEFT TEXT */}
        <div className="flex flex-col items-center gap-6 text-center lg:items-start lg:text-left animate-[fadeIn_1s_ease]">
          <div className="flex flex-col gap-4">
            <h1 className="text-white text-4xl font-black leading-tight tracking-tighter sm:text-5xl lg:text-6xl drop-shadow-lg ">
              Penerimaan Santri Baru 2026/2027 – SMP Plus & SMK Plus
            </h1>
            <p className="text-white/90 text-base font-normal leading-normal sm:text-lg drop-shadow-md">
              Mencetak pemimpin visioner melalui integrasi Salaf-Modern, Kedisiplinan (OPPN), dan koneksi global (Industri & Jepang). Bukan sekadar jumlah santri, tapi kualitas dampak.
            </p>
          </div>

          {/* Buttons */}
          <div className="flex w-full flex-col flex-wrap items-center justify-center gap-3 sm:flex-row lg:justify-start">
            <button
              onClick={onRegisterClick}
              className="flex w-full min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center rounded-lg h-12 px-5 bg-primary text-navy font-bold tracking-[0.015em] sm:w-auto shadow-lg transition-transform hover:scale-105"
            >
              Daftar Sekarang
            </button>

            <a
              href="https://youtu.be/B1xSsSDzqI4?si=a715t1jkQFgygTb_"
              target="_blank"
              rel="noreferrer"
              className="flex w-full min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center gap-2 rounded-lg h-12 px-5 bg-white/10 text-white font-bold border border-white/20 backdrop-blur-sm sm:w-auto transition-transform hover:scale-105 hover:bg-white/20"
            >
              <span className="material-symbols-outlined">play_circle</span>
              <span>Video Profil Pondok</span>
            </a>
          </div>
          <div className="mt-4 flex items-center gap-4 text-sm text-slate-400">
            <div className="flex items-center gap-1">
              <span className="material-symbols-outlined text-gold text-lg">verified</span>
              <span>Standar ISO 9001:2015</span>
            </div>
            <div className="w-1 h-1 bg-slate-600 rounded-full"></div>
            <div className="flex items-center gap-1">
              <span className="material-symbols-outlined text-gold text-lg">public</span>
              <span>Koneksi LPK Jepang</span>
            </div>
          </div>
        </div>

        {/* RIGHT IMAGE (Floating + Tilt Hover) */}
        <div className="relative flex w-full justify-center lg:justify-end">
          <div className="w-full max-w-md aspect-[2/2] rounded-xl p-2 bg-white/5 backdrop-blur-md shadow-2xl border border-white/10 transition-transform hover:scale-[1.03] hover:rotate-1">
            <div
              className="h-full w-full rounded-lg bg-center bg-no-repeat bg-cover shadow-xl"
              style={{
                backgroundImage: `url('https://res.cloudinary.com/dhovq374h/image/upload/v1765022707/model_cjzttz.png')`,
                animation: "float 4s ease-in-out infinite",
              }}
            ></div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default Hero;
