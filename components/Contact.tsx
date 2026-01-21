import React, { useState, useEffect } from 'react';
import { Reveal } from './Reveal';

interface ContactProps {
  onRegisterClick?: () => void;
}

interface Wish {
  nama: string;
  ucapan: string;
  timestamp?: string;
}

const Contact: React.FC<ContactProps> = ({ onRegisterClick }) => {
  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success'>('idle');
  const [wishes, setWishes] = useState<Wish[]>([]);

  // URL KHUSUS untuk Google Sheet Doa & Harapan (Agara terpisah dari Data Santri)
  // Silahkan buat Google Sheet + Apps Script baru, Deploy sebagai Web App, lalu tempel URL-nya di sini:
  const WISHES_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbxxDrmwzM4c93lVwd7BmTQ3vEIMmp-z8QK_59qiTmbXERbRsAq_kMtsJyxmSBwUnQ/exec";

  useEffect(() => {
    fetchWishes();
  }, []);

  const fetchWishes = async () => {
    try {
      if (WISHES_SCRIPT_URL.includes("MASUKAN_URL")) return; // Prevent fetch if url not set
      // Tambahkan timestamp agar browser tidak menyimpan cache (selalu ambil data baru)
      const response = await fetch(`${WISHES_SCRIPT_URL}?action=get_wishes&t=${new Date().getTime()}`);
      const data = await response.json();
      if (Array.isArray(data)) {
        setWishes(data);
      }
    } catch (error) {
      console.error("Gagal memuat doa dan harapan:", error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus("submitting");

    const form = e.currentTarget as HTMLFormElement;
    const formData = new FormData(form);

    const newWish: Wish = {
      nama: formData.get("nama") as string,
      ucapan: formData.get("ucapan") as string,
      timestamp: new Date().toISOString()
    };

    // Optimistic Update
    setWishes((prev) => [newWish, ...prev]);

    try {
      if (WISHES_SCRIPT_URL.includes("MASUKAN_URL")) {
        await new Promise(resolve => setTimeout(resolve, 1000)); // Fake delay
        throw new Error("URL Script belum disetting");
      }

      // Kirim data ke Google Sheets
      await fetch(WISHES_SCRIPT_URL, {
        method: "POST",
        body: JSON.stringify({
          action: "submit_wish",
          ...newWish
        })
      });

      setFormStatus("success");
      form.reset();

      setTimeout(() => setFormStatus("idle"), 3000);
    } catch (error) {
      console.error("Gagal mengirim doa:", error);
      setFormStatus("idle");
    }
  };

  return (
    <section id="contact" className="py-20 bg-white dark:bg-navy-dark transition-colors duration-300">
      <div className="container mx-auto px-4 lg:px-20 max-w-7xl">
        <Reveal>
          <div className="text-center mb-12">
            <h2 className="text-4xl font-black text-navy dark:text-white mb-3">Hubungi Kami</h2>
            <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
              Kami siap membantu Anda. Silakan hubungi kami melalui informasi kontak di bawah ini, atau kirimkan doa dan harapan terbaik Anda untuk kemajuan Pondok Pesantren.
            </p>
          </div>
        </Reveal>

        {/* Map */}
        <Reveal delay={200}>
          <div className="bg-white dark:bg-navy rounded-xl border border-slate-200 dark:border-white/10 shadow-lg p-1 overflow-hidden mb-12">
            <div className="w-full h-[400px] rounded-lg overflow-hidden">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3958.1373502755046!2d107.812765673572!3d-7.22517049278081!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e68bae12ee2704d%3A0xdec2bf66d196537f!2sPondok%20Pesantren%20Nurul%20Huda%20Malati%20Garut!5e0!3m2!1sen!2sus!4v1764918434198!5m2!1sen!2sus"
                className="w-full h-full"
                style={{ border: 0 }}
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">

          {/* Contact Info */}
          <Reveal delay={400} className="h-full">
            <div className="bg-slate-50 dark:bg-navy h-full rounded-xl border border-slate-200 dark:border-white/10 shadow-lg p-8 flex flex-col justify-between">
              <div>
                <h3 className="text-2xl font-bold text-navy dark:text-white mb-6">Informasi Kontak</h3>

                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-white/5 flex items-center justify-center text-action-blue dark:text-primary flex-shrink-0">
                      <span className="material-symbols-outlined">call</span>
                    </div>
                    <div>
                      <p className="text-sm text-slate-500 dark:text-slate-400">Telepon / WhatsApp</p>
                      <p className="text-navy dark:text-white font-medium text-lg">0852-0016-0046</p>
                      <p className="text-navy dark:text-white font-medium text-lg">0823-1726-7936</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-white/5 flex items-center justify-center text-action-blue dark:text-primary flex-shrink-0">
                      <span className="material-symbols-outlined">alternate_email</span>
                    </div>
                    <div>
                      <p className="text-sm text-slate-500 dark:text-slate-400">Instagram</p>
                      <p className="text-navy dark:text-white font-medium text-lg">@nurulhudamalati1992</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-white/5 flex items-center justify-center text-action-blue dark:text-primary flex-shrink-0">
                      <span className="material-symbols-outlined">mail</span>
                    </div>
                    <div>
                      <p className="text-sm text-slate-500 dark:text-slate-400">Email</p>
                      <p className="text-navy dark:text-white font-medium text-lg">psb_ppnh@gmail.com</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 mt-10">
                <a href="https://wa.me/6285200160046" className="flex-1 flex items-center justify-center gap-2 bg-[#25D366] text-white font-bold py-3 px-6 rounded-lg hover:bg-[#20bd5a] transition-colors shadow-md">
                  <svg aria-hidden="true" className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M16.75 13.96c.25.13.47.2.5.22v.1c-.02.47-.04.93-.25 1.5-.2.53-.5.92-.83 1.1-.33.2-.82.23-2.03-.22-1.22-.45-2.03-.9-3.26-2.13-1.22-1.22-1.68-2.03-2.13-3.26-.45-1.2-.42-1.7-.22-2.03.2-.33.58-.63 1.1-.83.58-.2 1.03-.22 1.5-.25h.1c.02.03.09.25.22.5.13.25.56 1.45.63 1.63.1.25.08.43-.04.62-.13.18-.28.31-.47.53-.2.22-.4.4-.33.66.08.28.37 1.03 1.01 1.67.84.84 1.83 1.17 2.15 1.25.27.06.45-.13.67-.33.22-.19.35-.34.53-.47.19-.13.37-.15.62-.04.25.1.75.34 1.45.62.72.3 1.34.54 1.46.6.13.06.2.14.22.25z"></path>
                  </svg>
                  <span>WhatsApp</span>
                </a>

                <button
                  onClick={onRegisterClick}
                  className="flex-1 flex items-center justify-center gap-2 bg-white dark:bg-white/10 border border-slate-200 dark:border-white/20 text-navy dark:text-white font-bold py-3 px-6 rounded-lg hover:bg-slate-50 dark:hover:bg-white/20 transition-colors shadow-sm"
                >
                  <span className="material-symbols-outlined">description</span>
                  <span>Formulir PSB</span>
                </button>
              </div>
            </div>
          </Reveal>

          {/* Form Doa dan Harapan */}
          <Reveal delay={600} className="h-full">
            <div className="bg-white dark:bg-navy h-full rounded-xl border border-slate-200 dark:border-white/10 shadow-lg flex flex-col overflow-hidden p-6 md:p-8">
              <h3 className="text-xl font-bold text-navy dark:text-white mb-2 flex items-center gap-2">
                <span className="material-symbols-outlined text-action-blue dark:text-primary">rate_review</span>
                Kirim Doa & Harapan
              </h3>
              <p className="text-slate-600 dark:text-slate-400 mb-6 text-sm">
                Dukungan dan doa Anda sangat berarti bagi kemajuan pesantren kami.
              </p>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 gap-4">
                  <div>
                    <input
                      type="text"
                      name="nama"
                      required
                      placeholder="Nama Lengkap"
                      className="w-full px-4 py-3 rounded-lg bg-slate-50 dark:bg-navy-dark border border-slate-200 dark:border-white/10 text-navy dark:text-white focus:ring-2 focus:ring-action-blue dark:focus:ring-primary focus:outline-none transition-all"
                    />
                  </div>
                  <div>
                    <textarea
                      name="ucapan"
                      rows={4}
                      required
                      placeholder="Tuliskan doa terbaik Anda disini..."
                      className="w-full px-4 py-3 rounded-lg bg-slate-50 dark:bg-navy-dark border border-slate-200 dark:border-white/10 text-navy dark:text-white resize-none focus:ring-2 focus:ring-action-blue dark:focus:ring-primary focus:outline-none transition-all"
                    ></textarea>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={formStatus === 'submitting'}
                  className={`w-full py-3 px-6 rounded-lg font-bold text-white transition-all shadow-md flex items-center justify-center gap-2 ${formStatus === 'success'
                    ? 'bg-green-500 hover:bg-green-600'
                    : 'bg-action-blue hover:bg-blue-700 dark:bg-primary dark:text-navy dark:hover:bg-primary-dark'
                    }`}
                >
                  {formStatus === 'submitting' ? (
                    <>
                      <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                      <span>Mengirim...</span>
                    </>
                  ) : formStatus === 'success' ? (
                    <>
                      <span className="material-symbols-outlined">check</span>
                      <span>Terkirim!</span>
                    </>
                  ) : (
                    <>
                      <span className="material-symbols-outlined">send</span>
                      <span>Kirim Doa</span>
                    </>
                  )}
                </button>
              </form>
            </div>
          </Reveal>
        </div>

        {/* Full Width Feed Section */}
        <Reveal delay={800}>
          <div className="bg-white dark:bg-navy rounded-xl border border-slate-200 dark:border-white/10 shadow-md p-6 md:p-10">
            <div className="flex flex-col md:flex-row items-center justify-between mb-8 pb-4 border-b border-slate-100 dark:border-white/5 gap-4">
              <div>
                <h4 className="font-bold text-lg md:text-2xl text-navy dark:text-white flex items-center gap-3">
                  <span className="material-symbols-outlined text-action-blue dark:text-primary text-3xl">volunteer_activism</span>
                  Harapan & Doa Terbaru
                </h4>
                <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">
                  Kata-kata penyemangat dan doa tulus untuk kemajuan Pondok Pesantren Nurul Huda Malati
                </p>
              </div>
              <span className="text-sm font-medium text-action-blue dark:text-primary bg-blue-50 dark:bg-white/5 px-4 py-2 rounded-full border border-blue-100 dark:border-white/10">
                {wishes.length} Pesan Masuk
              </span>
            </div>

            <div className="flex flex-col gap-4 max-h-[500px] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-slate-200 dark:scrollbar-thumb-white/10">
              {wishes.length === 0 ? (
                <div className="text-center py-20 opacity-50 bg-slate-50 dark:bg-white/5 rounded-xl border-dashed border-2 border-slate-200">
                  <span className="material-symbols-outlined text-5xl mb-4 text-slate-300">chat_bubble_outline</span>
                  <p className="text-lg text-slate-500">Belum ada doa dan harapan.</p>
                  <p className="text-sm text-slate-400">Jadilah yang pertama mengirimkan!</p>
                </div>
              ) : (
                wishes.map((wish, index) => {
                  const initials = wish.nama
                    .split(' ')
                    .map(n => n[0])
                    .join('')
                    .substring(0, 2)
                    .toUpperCase();

                  const colors = ['bg-red-500', 'bg-blue-500', 'bg-green-500', 'bg-yellow-500', 'bg-purple-500', 'bg-pink-500', 'bg-indigo-500', 'bg-teal-500', 'bg-orange-500'];
                  const charCode = wish.nama.charCodeAt(0) || 0;
                  const colorClass = colors[charCode % colors.length];

                  return (
                    <div key={index} className="bg-slate-50 dark:bg-white/5 p-4 rounded-xl border border-slate-100 dark:border-white/5 flex gap-3 md:gap-4 hover:bg-slate-100 dark:hover:bg-white/10 transition-colors items-start">
                      {/* Avatar Area */}
                      <div className="flex-shrink-0">
                        <div className={`w-10 h-10 md:w-12 md:h-12 rounded-full ${colorClass} flex items-center justify-center text-white text-sm md:text-base font-bold shadow-sm ring-2 md:ring-4 ring-white dark:ring-navy`}>
                          {initials}
                        </div>
                      </div>

                      {/* Content Area */}
                      <div className="flex-grow min-w-0">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-1 gap-1">
                          <h5 className="font-bold text-navy dark:text-white text-sm md:text-base truncate">{wish.nama}</h5>
                          <span className="text-[10px] md:text-xs text-slate-400 flex items-center gap-1 bg-white dark:bg-navy-dark px-2 py-0.5 rounded-full border border-slate-100 dark:border-white/5 w-fit">
                            <span className="material-symbols-outlined text-[10px]">schedule</span>
                            {wish.timestamp ? new Date(wish.timestamp).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' }) : 'Baru saja'}
                          </span>
                        </div>
                        <div className="relative">
                          <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed italic">
                            "{wish.ucapan}"
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
};

export default Contact;
