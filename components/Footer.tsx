import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-navy-dark text-slate-200 pt-16 pb-8 border-t border-slate-800">
      <div className="container mx-auto px-6 lg:px-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">

          <div className="space-y-4">
            <h3 className="text-xl font-bold text-white">Pondok Pesantren Nurul Huda Malati</h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              Membentuk generasi Qur'ani yang berakhlak mulia dan berwawasan global.
            </p>
          </div>

          <div className="space-y-4">
            <h4 className="text-lg font-bold text-gold">Tautan Cepat</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#home" className="text-slate-300 hover:text-gold transition-colors">Beranda</a></li>
              <li><a href="#admissions" className="text-slate-300 hover:text-gold transition-colors">PSB</a></li>
              <li><a href="#about" className="text-slate-300 hover:text-gold transition-colors">Profil</a></li>
              <li><a href="#contact" className="text-slate-300 hover:text-gold transition-colors">Kontak</a></li>
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="text-lg font-bold text-gold">Alamat</h4>
            <div className="flex items-start gap-3 text-sm">
              <span className="material-symbols-outlined text-gold text-lg mt-0.5">location_on</span>
              <p className="text-slate-300">
                Jl. Pasirwangi, Kel. Padaasih, Kec. Pasirwangi, Garut, Jawa Barat 44151, Indonesia
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="text-lg font-bold text-gold">Media Sosial</h4>
            <div className="flex space-x-4">

              {/* Facebook */}
              <a href="https://www.facebook.com/santrinurulhudamalati" className="text-slate-300 hover:text-gold transition-colors">
                <svg aria-hidden="true" className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path clipRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" fillRule="evenodd"></path></svg>
              </a>

              {/* Instagram */}
              <a href="https://www.instagram.com/nurulhudamalati1992/?hl=id" className="text-slate-300 hover:text-gold transition-colors">
                <svg aria-hidden="true" className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path clipRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.024.06 1.378.06 3.808s-.012 2.784-.06 3.808c-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.024.048-1.378.06-3.808.06s-2.784-.012-3.808-.06c-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.048-1.024-.06-1.378-.06-3.808s.012-2.784.06-3.808c.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 016.08 2.525c.636-.247 1.363-.416 2.427-.465C9.53 2.013 9.884 2 12.315 2zM12 7a5 5 0 100 10 5 5 0 000-10zm0 8a3 3 0 110-6 3 3 0 010 6zm6.406-11.845a1.25 1.25 0 100 2.5 1.25 1.25 0 000-2.5z" fillRule="evenodd"></path></svg>
              </a>

              {/* Youtube */}
              <a href="http://www.youtube.com/@nhmedia4115" className="text-slate-300 hover:text-gold transition-colors">
                <svg aria-hidden="true" className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path clipRule="evenodd" d="M19.812 5.418c.861.23 1.538.907 1.768 1.768C21.998 8.78 22 12 22 12s0 3.22-.42 4.814c-.23.861-.907 1.538-1.768 1.768C18.218 19 12 19 12 19s-6.218 0-7.812-.42c-.861-.23-1.538-.907-1.768-1.768C2 15.22 2 12 2 12s0-3.22.42-4.814c.23-.861.907-1.538 1.768-1.768C5.782 5 12 5 12 5s6.218 0 7.812.418zM9.5 15.5V8.5L15.75 12 9.5 15.5z" fillRule="evenodd"></path></svg>
              </a>

              {/* TikTok */}
              <a href="https://www.tiktok.com/@nh.media777" className="text-slate-300 hover:text-gold transition-colors">
                <svg aria-hidden="true" className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12.75 2c.414 0 .75.336.75.75 0 1.88 1.507 3.465 3.375 3.5a.75.75 0 01.725.75v2.17a.75.75 0 01-.75.75c-1.54 0-2.987-.59-4.07-1.56v6.84a4.75 4.75 0 11-1.5-3.465v-7a.75.75 0 01.75-.75h.72z" />
                </svg>
              </a>

            </div>
          </div>
        </div>

        <div className="border-t border-slate-700 pt-8 text-center">
          <p className="text-sm text-slate-500">© 2025 Pondok Pesantren Nurul Huda Malati. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;