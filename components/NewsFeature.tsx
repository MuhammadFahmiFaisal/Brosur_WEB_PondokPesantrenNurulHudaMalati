import React from 'react';
import { Reveal } from './Reveal';

const NewsFeature: React.FC = () => {
  return (
    <section className="py-16 bg-white dark:bg-navy relative overflow-hidden">
      <div className="container mx-auto px-4 lg:px-12">
        {/* News ITEM 1 (Wartain) */}
        <Reveal>
          <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-16 mb-20 lg:mb-24">
            {/* Image Section */}
            <div className="w-full lg:w-1/2 relative group">
              <div className="absolute -inset-4 bg-gradient-to-r from-gold to-primary rounded-2xl blur-lg opacity-30 group-hover:opacity-50 transition-opacity duration-500"></div>
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-white dark:border-navy-dark">
                <img
                  src="https://wartain.com/wp-content/uploads/2025/12/IMG-20251210-WA0096.jpg"
                  alt="Pangersa Anom - Nurul Huda Malati"
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
                  <span className="inline-block px-3 py-1 bg-red-600 text-white text-xs font-bold rounded-full mb-2">
                    Wartain.com
                  </span>
                  <p className="text-white text-sm opacity-90">Liputan Khusus</p>
                </div>
              </div>
            </div>

            {/* Content Section */}
            <div className="w-full lg:w-1/2">
              <div className="flex items-center gap-2 mb-4">
                <span className="material-symbols-outlined text-gold">newspaper</span>
                <span className="text-gold font-bold uppercase tracking-widest text-sm">Berita Terkini</span>
              </div>

              <h2 className="text-3xl lg:text-4xl font-black text-navy dark:text-white leading-tight mb-6">
                Nurul Huda Malati Masuk Deretan <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-gold">Pesantren Berpengaruh di Garut</span>
              </h2>

              <blockquote className="border-l-4 border-gold pl-4 italic text-slate-600 dark:text-slate-300 text-lg mb-6">
                “Kami membangun pesantren ini bukan hanya untuk besar secara jumlah, tetapi untuk kuat secara peran. Pengaruh itu hadir dari kualitas program dan manfaat bagi masyarakat.”
              </blockquote>

              <p className="text-slate-600 dark:text-slate-400 mb-6 leading-relaxed">
                Pimpinan Pondok Pesantren, <strong>M. Ilham Nurfaqih A., S.Pd. (Pangersa Anom)</strong>, menegaskan bahwa pengaruh lembaga ditentukan oleh kualitas program, tata kelola, dan kontribusi sosial. Dengan integrasi pendidikan formal, kepemimpinan santri (LDKS-OPPN), serta koneksi industri global.
              </p>

              <div className="flex flex-wrap gap-4 items-center">
                <a
                  href="https://wartain.com/nurul-huda-malati-masuk-deretan-pesantren-berpengaruh-di-garut-mencetak-karakter-kuat-untuk-daya-saing-era-moderen-kini-dan-kedepan/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-navy dark:bg-white dark:text-navy text-white font-bold rounded-xl hover:-translate-y-1 shadow-lg hover:shadow-xl transition-all"
                >
                  <span>Baca Selengkapnya</span>
                  <span className="material-symbols-outlined text-sm">open_in_new</span>
                </a>
                <div className="text-sm text-slate-500 dark:text-slate-400 flex items-center gap-1">
                  <span className="material-symbols-outlined text-base">verified</span>
                  <span>Sumber: Wartain.com</span>
                </div>
              </div>
            </div>
          </div>
        </Reveal>

        {/* Separator - HIDDEN
        <div className="w-full h-px bg-slate-200 dark:bg-white/10 mb-20 lg:mb-24"></div>

        <Reveal>
          <div className="flex flex-col lg:flex-row-reverse items-center gap-10 lg:gap-16">
            <div className="w-full lg:w-1/2 relative group">
              <div className="absolute -inset-4 bg-gradient-to-l from-gold to-primary rounded-2xl blur-lg opacity-30 group-hover:opacity-50 transition-opacity duration-500"></div>
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-white dark:border-navy-dark h-[350px]">
                <img
                  src="https://infogarut.id/upload/postingan/1765785759_Web%20Infogarut.jpg%20%281%29.jpg"
                  alt="NU National Fest 2026 - Nurul Huda Malati"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
                  <span className="inline-block px-3 py-1 bg-blue-600 text-white text-xs font-bold rounded-full mb-2">
                    Infogarut.id
                  </span>
                  <p className="text-white text-sm opacity-90">Sponsorship Utama</p>
                </div>
              </div>
            </div>

            <div className="w-full lg:w-1/2">
              <div className="flex items-center gap-2 mb-4 justify-end lg:justify-start">
                <span className="material-symbols-outlined text-gold">event_upcoming</span>
                <span className="text-gold font-bold uppercase tracking-widest text-sm">Event Jan 2026</span>
              </div>

              <h2 className="text-3xl lg:text-4xl font-black text-navy dark:text-white leading-tight mb-6">
                PP Nurul Huda Malati Sponsori Penuh <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-primary">NU National Fest 2026</span>
              </h2>

              <blockquote className="border-l-4 border-primary pl-4 italic text-slate-600 dark:text-slate-300 text-lg mb-6">
                “Dukungan PP Nurul Huda Malati menegaskan komitmen pesantren dalam menyukseskan kegiatan keumatan yang memberikan manfaat nyata bagi penguatan nilai Aswaja dan ekonomi rakyat.”
              </blockquote>

              <p className="text-slate-600 dark:text-slate-400 mb-6 leading-relaxed">
                Pondok Pesantren Nurul Huda Malati resmi menjadi sponsor utama <strong>NU National Fest 2026</strong>. Festival akbar ini memadukan agenda kebangsaan, dakwah, seni, dan pemberdayaan ekonomi yang akan berlangsung pada <strong>23-25 Januari 2026</strong>.
              </p>

              <div className="flex flex-wrap gap-4 items-center">
                <a
                  href="https://infogarut.id/tiga-hari-penuh-makna-pp-nurul-huda-malati-sponsori-penuh-nu-national-fest-2026"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-navy dark:bg-white dark:text-navy text-white font-bold rounded-xl hover:-translate-y-1 shadow-lg hover:shadow-xl transition-all"
                >
                  <span>Baca Berita</span>
                  <span className="material-symbols-outlined text-sm">open_in_new</span>
                </a>
                <div className="text-sm text-slate-500 dark:text-slate-400 flex items-center gap-1">
                  <span className="material-symbols-outlined text-base">verified</span>
                  <span>Sumber: Infogarut.id</span>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
        */}
      </div>
    </section>
  );
};

export default NewsFeature;
