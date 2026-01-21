import React from 'react';
import { Reveal } from './Reveal';

const Facilities: React.FC = () => {
  const items = [
    { name: "Masjid Jami'", desc: "Pusat kegiatan ibadah dan spiritual.", icon: "mosque", img: "https://res.cloudinary.com/dhovq374h/image/upload/v1765024510/mesjid_hvmjrp.jpg" },
    { name: "Komplek Pendidikan", desc: "Gedung belajar dengan teknologi modern.", icon: "school", img: "https://res.cloudinary.com/dhovq374h/image/upload/v1765024511/komplek_pendidikan_arp2bb.jpg" },
    { name: "Lapangan Olahraga", desc: "Sarana pengembangan fisik dan olahraga.", icon: "sports_basketball", img: "https://res.cloudinary.com/dhovq374h/image/upload/v1765024508/lapangan_vh8dt7.jpg" },
    { name: "Asrama Santri", desc: "Tempat istirahat yang nyaman dan aman.", icon: "bed", img: "https://res.cloudinary.com/dhovq374h/image/upload/v1765024502/asrama_l0nzza.jpg" },
    { name: "Bale", desc: "Tempat terbuka dengan view pemandangan.", icon: "groups", img: "https://res.cloudinary.com/dhovq374h/image/upload/v1765024500/bale_fl6glm.jpg" },
    { name: "Kelas", desc: "Ruang untuk Belajar santri.", icon: "health_and_safety", img: "https://res.cloudinary.com/dhovq374h/image/upload/v1765024506/kelas_ysvwa0.jpg" },
    { name: "Kantin", desc: "Menyediakan aneka jajanan dan kebutuhan.", icon: "storefront", img: "https://res.cloudinary.com/dhovq374h/image/upload/v1765024503/kantin_eavb1q.jpg" },
    { name: "Aula Serbaguna", desc: "Untuk kegiatan dan acara besar.", icon: "groups", img: "https://res.cloudinary.com/dhovq374h/image/upload/v1765024505/aula_lxc5yz.jpg" },
    { name: "Kamar Mandi", desc: "Fasilitas kebersihan yang terjaga.", icon: "bathtub", img: "https://res.cloudinary.com/dhovq374h/image/upload/v1765024499/Kamar_Mandi_kfrhop.jpg" },
    { name: "Bus Sekolah", desc: "Transportasi untuk kegiatan luar sekolah.", icon: "directions_bus", img: "https://res.cloudinary.com/dhovq374h/image/upload/v1765024499/bus_q1hjym.jpg" },
    { name: "Lemari Baju", desc: "Fasilitas penyimpanan pakaian santri.", icon: "bed", img: "https://res.cloudinary.com/dhovq374h/image/upload/v1765024504/RAK_BAJU_qmkyhw.jpg" },
    { name: "Air Galon", desc: "Tersedia dispenser untuk minum.", icon: "bed", img: "https://res.cloudinary.com/dhovq374h/image/upload/v1765024500/galon_vvpkil.jpg" },
  ];

  return (
    <section id="facilities" className="py-12 md:py-24 bg-[#f6f6f8] dark:bg-navy-dark transition-colors duration-300">
      <div className="container mx-auto px-6 md:px-20">
        <Reveal>
          <div className="text-center mb-8 md:mb-16">
            <h2 className="text-2xl md:text-4xl font-black text-navy dark:text-white uppercase tracking-wide">
              Fasilitas Unggulan
            </h2>
            <p className="text-slate-600 dark:text-slate-400 mt-3 md:mt-4 text-sm md:text-lg max-w-2xl mx-auto leading-relaxed">
              Kami berkomitmen untuk menyediakan fasilitas yang lengkap, modern, dan mendukung untuk menciptakan lingkungan belajar yang nyaman dan kondusif.
            </p>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6">
          {items.map((item, idx) => (
            <Reveal key={idx} className="h-full" delay={idx * 100}>
              <div className="group bg-white dark:bg-navy rounded-2xl shadow-sm border border-slate-100 dark:border-white/5 overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300 h-full flex flex-col">
                <div className="relative overflow-hidden h-48 md:h-44">
                  <img
                    src={item.img}
                    alt={item.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    loading="lazy"
                  />
                  <div className="absolute top-3 right-3 bg-white/90 dark:bg-navy/90 backdrop-blur-sm p-2 rounded-xl shadow-sm">
                    <span className="material-symbols-outlined text-primary text-xl" aria-hidden="true">{item.icon}</span>
                  </div>
                </div>
                <div className="p-5 flex-grow flex flex-col">
                  <h3 className="font-bold text-navy dark:text-white text-base md:text-lg mb-2 group-hover:text-primary transition-colors">{item.name}</h3>
                  <p className="text-slate-500 dark:text-slate-400 text-xs md:text-sm leading-relaxed">{item.desc}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Facilities;