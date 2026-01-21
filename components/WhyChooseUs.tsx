import React from 'react';
import { Reveal } from './Reveal';

const WhyChooseUs: React.FC = () => {
  return (
    <section className="py-16 md:py-24 bg-[#F8F9FA] dark:bg-navy-dark relative overflow-hidden transition-colors duration-300">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-[300px] md:w-[500px] h-[300px] md:h-[500px] bg-blue-100/50 dark:bg-primary/5 rounded-full blur-[80px] md:blur-[120px] -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-[400px] md:w-[600px] h-[400px] md:h-[600px] bg-gold/10 rounded-full blur-[80px] md:blur-[120px] translate-y-1/2 -translate-x-1/2 pointer-events-none"></div>

      <div className="container mx-auto px-4 lg:px-12 relative z-10">
        <Reveal>
          <div className="mb-12 md:mb-16 max-w-4xl">
            <div className="flex items-center gap-3 mb-4">
              <span className="h-px w-8 md:w-12 bg-gold"></span>
              <span className="text-gold font-bold uppercase tracking-widest text-xs md:text-sm">10 Alasan Strategis</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-black text-navy dark:text-white leading-tight mb-4 md:mb-6">
              Mengapa Kami Masuk <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-gold">10 Besar Pesantren Berpengaruh?</span>
            </h2>
            <p className="text-slate-600 dark:text-slate-400 text-base md:text-lg leading-relaxed">
              Pengaruh pesantren tidak hanya ditentukan oleh jumlah santri, tetapi oleh kualitas peran, program, visi, dan kontribusi sosial-keumatan yang nyata.
            </p>
          </div>
        </Reveal>

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 auto-rows-[minmax(auto,auto)] md:auto-rows-[minmax(280px,auto)]">

          {/* Card 1: Integrasi (Standard) - Point 1 */}
          <Reveal className="md:col-span-1" delay={0}>
            <div className="bg-white dark:bg-navy h-full rounded-2xl md:rounded-3xl p-6 md:p-8 border border-slate-100 dark:border-white/5 shadow-lg hover:shadow-xl transition-all duration-300 flex flex-col justify-between group min-h-[240px]">
              <div className="w-12 h-12 md:w-14 md:h-14 rounded-2xl bg-blue-50 dark:bg-white/10 text-navy dark:text-white flex items-center justify-center group-hover:scale-110 transition-transform duration-300 mb-4 md:mb-0">
                <span className="material-symbols-outlined text-2xl md:text-3xl" aria-hidden="true">domain_add</span>
              </div>
              <div>
                <h3 className="text-lg md:text-xl font-bold text-navy dark:text-white mb-2">Integrasi Terstruktur</h3>
                <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                  Pusat rujukan pendidikan di Garut yang menggabungkan SMP Plus, SMK Plus, dan program kepesantrenan terpadu dalam satu ekosistem.
                </p>
              </div>
            </div>
          </Reveal>

          {/* Card 2: Koneksi Jepang (Wide + Image) - Point 6 */}
          <Reveal className="md:col-span-2" delay={100}>
            <div className="relative h-full min-h-[320px] rounded-2xl md:rounded-3xl overflow-hidden shadow-lg group">
              <img
                src="https://res.cloudinary.com/dhovq374h/image/upload/v1765029841/DSC_0641_siuek8.jpg"
                alt="Koneksi LPK Jepang"
                loading="lazy"
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-navy/95 via-navy/70 to-transparent/50"></div>
              <div className="absolute inset-0 p-6 md:p-8 flex flex-col justify-end md:justify-center max-w-lg relative z-10">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold/20 backdrop-blur-md border border-gold/30 w-fit mb-4">
                  <span className="material-symbols-outlined text-gold text-sm" aria-hidden="true">public</span>
                  <span className="text-gold text-xs font-bold uppercase">Koneksi Global</span>
                </div>
                <h3 className="text-2xl md:text-3xl font-black text-white mb-3">Link Industri & LPK Jepang</h3>
                <p className="text-slate-200 text-sm md:text-base leading-relaxed mb-6">
                  SMK Plus memiliki link strategis dengan LPK Jepang untuk pemberangkatan lulusan. Memberikan masa depan jelas dan citra pesantren yang progresif.
                </p>
              </div>
            </div>
          </Reveal>

          {/* Card 3: Leadership (Tall + Gradient) - Point 2 & 9 */}
          <Reveal className="md:row-span-2 md:col-span-1" delay={200}>
            <div className="h-full min-h-[350px] rounded-2xl md:rounded-3xl p-6 md:p-8 bg-gradient-to-br from-navy to-navy-dark text-white shadow-xl relative overflow-hidden group flex flex-col">
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>

              <div className="relative z-10 flex flex-col h-full">
                <div className="w-14 h-14 md:w-16 md:h-16 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center mb-6">
                  <span className="material-symbols-outlined text-3xl md:text-4xl text-gold" aria-hidden="true">diversity_3</span>
                </div>
                <h3 className="text-xl md:text-2xl font-bold mb-4">Leadership (LDKS) & OPPN Kuat</h3>
                <p className="text-slate-300 text-sm md:text-base leading-relaxed mb-8 flex-grow">
                  Pusat inkubasi kepemimpinan. Sistem organisasi santri (OPPN) yang rapi dan modern menjadi wahana mencetak kader pemimpin muda yang tangguh.
                </p>

                <div className="space-y-3 md:space-y-4">
                  <div className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/5">
                    <span className="material-symbols-outlined text-gold" aria-hidden="true">check_circle</span>
                    <span className="text-sm font-medium">Latihan Dasar (LDKS)</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/5">
                    <span className="material-symbols-outlined text-gold" aria-hidden="true">check_circle</span>
                    <span className="text-sm font-medium">Organisasi Modern</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/5">
                    <span className="material-symbols-outlined text-gold" aria-hidden="true">check_circle</span>
                    <span className="text-sm font-medium">Kader Pemimpin</span>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>

          {/* Card 4: ISO (Standard) - Point 7 */}
          <Reveal className="md:col-span-1" delay={300}>
            <div className="bg-white dark:bg-navy h-full rounded-2xl md:rounded-3xl p-6 md:p-8 border border-slate-100 dark:border-white/5 shadow-lg hover:shadow-xl transition-all duration-300 group min-h-[220px]">
              <div className="flex justify-between items-start mb-4">
                <div className="w-12 h-12 md:w-14 md:h-14 rounded-2xl bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400 flex items-center justify-center">
                  <span className="material-symbols-outlined text-2xl md:text-3xl" aria-hidden="true">verified</span>
                </div>
                <span className="px-3 py-1 bg-slate-100 dark:bg-white/10 rounded-full text-[10px] md:text-xs font-bold text-slate-500 dark:text-slate-300">ISO 9001:2015</span>
              </div>
              <h3 className="text-lg md:text-xl font-bold text-navy dark:text-white mb-2">Manajemen Terstandar</h3>
              <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                Indikator kuat pengaruh kelembagaan. Pesantren dikelola dengan standar profesional menuju sertifikasi internasional.
              </p>
            </div>
          </Reveal>

          {/* Card 5: Kurikulum (Standard) - Point 3 */}
          <Reveal className="md:col-span-1" delay={400}>
            <div className="bg-white dark:bg-navy h-full rounded-2xl md:rounded-3xl p-6 md:p-8 border border-slate-100 dark:border-white/5 shadow-lg hover:shadow-xl transition-all duration-300 group min-h-[220px]">
              <div className="w-12 h-12 md:w-14 md:h-14 rounded-2xl bg-orange-50 dark:bg-orange-900/20 text-orange-600 dark:text-orange-400 flex items-center justify-center mb-4">
                <span className="material-symbols-outlined text-2xl md:text-3xl" aria-hidden="true">menu_book</span>
              </div>
              <h3 className="text-lg md:text-xl font-bold text-navy dark:text-white mb-2">Kurikulum Visioner</h3>
              <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                Integrasi Salaf-Modern: Hafalan wajib (Alfiyah), kajian kitab kuning, pembiasaan ibadah, serta pendidikan karakter.
              </p>
            </div>
          </Reveal>

          {/* Card 6: Branding / Trust (Wide Image) - Point 10 */}
          <Reveal className="md:col-span-2" delay={500}>
            <div className="relative h-full min-h-[260px] rounded-2xl md:rounded-3xl overflow-hidden shadow-lg group">
              <img
                src="https://res.cloudinary.com/dhovq374h/image/upload/v1765022538/pergarus_r6ulmh.jpg"
                alt="Branding Nurul Huda"
                loading="lazy"
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-navy/80 dark:bg-navy/90"></div>

              <div className="absolute inset-0 z-10 p-6 md:p-8 flex flex-col justify-between">
                <div className="max-w-xl">
                  <h3 className="text-xl md:text-2xl font-bold text-white mb-2">Branding & Trust Kuat</h3>
                  <p className="text-slate-300 text-sm md:text-base">
                    Nama Nurul Huda makin sering disebut dan dikenal sebagai pesantren berkembang pesat, meningkatkan kepercayaan masyarakat luas.
                  </p>
                </div>
                <a href="https://maps.app.goo.gl/M4DhiFQyHUMmXjFC9" target="_blank" rel="noopener noreferrer" className="self-end flex items-center gap-3 bg-white dark:bg-navy-dark p-3 pr-5 rounded-xl shadow-lg hover:scale-105 transition-transform group/gmaps cursor-pointer">
                  <div className="bg-white p-1 rounded-full shadow-sm">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_%22G%22_logo.svg" alt="Google" className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="flex items-center gap-1">
                      <span className="font-bold text-navy dark:text-white text-base">4.8</span>
                      <div className="flex text-gold">
                        {[1, 2, 3, 4].map(i => (
                          <span key={i} className="material-symbols-outlined text-[16px]" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                        ))}
                        <span className="material-symbols-outlined text-[16px]" style={{ fontVariationSettings: "'FILL' 1" }}>star_half</span>
                      </div>
                    </div>
                    <p className="text-[10px] text-slate-500 dark:text-slate-400 font-bold group-hover/gmaps:text-primary transition-colors">Lihat 70+ Ulasan</p>
                  </div>
                </a>
              </div>
            </div>
          </Reveal>

          {/* Remaining Cards (Grid Small) */}
          {/* Point 5: Ekspansi */}
          <Reveal className="md:col-span-1" delay={600}>
            <div className="bg-slate-50 dark:bg-white/5 h-full rounded-2xl md:rounded-3xl p-5 md:p-6 flex items-center gap-4 hover:bg-white dark:hover:bg-white/10 transition-colors border border-transparent hover:border-slate-200 dark:hover:border-white/10">
              <div className="shrink-0 w-10 h-10 md:w-12 md:h-12 rounded-full bg-primary/20 text-primary-dark flex items-center justify-center">
                <span className="material-symbols-outlined text-xl md:text-2xl" aria-hidden="true">construction</span>
              </div>
              <div>
                <h4 className="font-bold text-navy dark:text-white text-sm md:text-base">Ekspansi Infrastruktur Nyata</h4>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Pengembangan fasilitas yang masif dan berkelanjutan untuk menunjang kualitas pendidikan santri.
                </p>
              </div>
            </div>
          </Reveal>

          {/* Point 8: Pemimpin Visioner */}
          <Reveal className="md:col-span-1" delay={700}>
            <div className="bg-slate-50 dark:bg-white/5 h-full rounded-2xl md:rounded-3xl p-5 md:p-6 flex items-center gap-4 hover:bg-white dark:hover:bg-white/10 transition-colors border border-transparent hover:border-slate-200 dark:hover:border-white/10">
              <div className="shrink-0 w-10 h-10 md:w-12 md:h-12 rounded-full bg-purple-100 dark:bg-purple-900/30 text-purple-600 flex items-center justify-center">
                <span className="material-symbols-outlined text-xl md:text-2xl" aria-hidden="true">handshake</span>
              </div>
              <div>
                <h4 className="font-bold text-navy dark:text-white text-sm md:text-base">Sinergi Kuat & Visioner</h4>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Membangun kolaborasi strategis dengan tokoh masyarakat, pemerintah daerah, hingga nasional.
                </p>
              </div>
            </div>
          </Reveal>

          {/* Point 4: Peran Sosial */}
          <Reveal className="md:col-span-1" delay={800}>
            <div className="bg-slate-50 dark:bg-white/5 h-full rounded-2xl md:rounded-3xl p-5 md:p-6 flex items-center gap-4 hover:bg-white dark:hover:bg-white/10 transition-colors border border-transparent hover:border-slate-200 dark:hover:border-white/10">
              <div className="shrink-0 w-10 h-10 md:w-12 md:h-12 rounded-full bg-pink-100 dark:bg-pink-900/30 text-pink-600 flex items-center justify-center">
                <span className="material-symbols-outlined text-xl md:text-2xl" aria-hidden="true">campaign</span>
              </div>
              <div>
                <h4 className="font-bold text-navy dark:text-white text-sm md:text-base">Peran Sosial & Dakwah</h4>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Aktif menebar manfaat melalui program kepedulian dan syiar Islam yang berdampak bagi masyarakat.
                </p>
              </div>
            </div>
          </Reveal>

        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
