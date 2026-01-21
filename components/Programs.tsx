import React from 'react';
import { Reveal } from './Reveal';

const Programs: React.FC = () => {
  const programs = [
    {
      title: "TK Plus",
      desc: "Fokus pada pendidikan anak usia dini, pembangunan karakter, dan ajaran dasar Islam dalam lingkungan yang menyenangkan.",
      img: "https://res.cloudinary.com/dhovq374h/image/upload/v1765022687/tk_xvfvfy.jpg",
      subtitle: null
    },
    {
      title: "SMP Plus",
      desc: "Integrasi Pesantren & Pendidikan Formal Terstruktur. Menggabungkan kurikulum nasional dengan kepesantrenan (Alfiyah, Kitab Kuning) untuk mencetak santri berwawasan luas.",
      img: "https://res.cloudinary.com/dnnuqxs7g/image/upload/v1765542584/smp_ornewo.jpg",
      subtitle: null
    },
    {
      title: "SMK Plus",
      desc: "Ketersambungan dengan Dunia Industri & LPK Jepang. Memiliki link strategis untuk pemberangkatan lulusan ke Jepang. Pilihan tepat untuk masa depan karir santri.",
      img: "https://res.cloudinary.com/dnnuqxs7g/image/upload/v1765542585/smk_e78pub.jpg",
      subtitle: "TEKNIK KOMPUTER & JARINGAN, TATA BUSANA"
    }
  ];

  return (
    <section id="programs" className="py-12 md:py-24 bg-white dark:bg-navy-dark transition-colors duration-300">
      <div className="container mx-auto px-6 md:px-20">
        <Reveal>
          <div className="flex flex-col items-center text-center pb-8 md:pb-16">
            <h2 className="text-2xl md:text-4xl font-black text-navy dark:text-white mb-3">
              Program Pendidikan
            </h2>
            <p className="text-slate-500 dark:text-slate-400 text-sm md:text-lg max-w-2xl leading-relaxed">
              Pendidikan yang menjawab tantangan zaman: Integrasi ilmu agama yang mendalam dengan skill industri modern dan koneksi global.
            </p>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {programs.map((prog, idx) => (
            <Reveal key={idx} className="h-full" delay={idx * 200}>
              <div className="group flex flex-col bg-white dark:bg-navy rounded-2xl shadow-lg border border-slate-100 dark:border-white/5 overflow-hidden hover:shadow-2xl transition-all hover:-translate-y-1 h-full">
                <div
                  className="w-full aspect-video bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                  style={{ backgroundImage: `url("${prog.img}")` }}
                ></div>
                <div className="p-6 flex flex-col flex-grow relative z-10 bg-white dark:bg-navy">
                  <h3 className="text-navy dark:text-white text-xl font-bold mb-1">{prog.title}</h3>
                  {prog.subtitle && (
                    <p className="text-gold text-[10px] font-bold uppercase tracking-widest mb-3">{prog.subtitle}</p>
                  )}
                  <p className="text-slate-600 dark:text-slate-300 text-sm mt-2 flex-grow leading-relaxed">
                    {prog.desc}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Programs;