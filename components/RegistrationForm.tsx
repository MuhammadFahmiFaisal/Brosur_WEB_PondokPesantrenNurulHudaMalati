import React, { useState, useRef, useEffect } from 'react';

interface RegistrationFormProps {
  onClose: () => void;
}

const RegistrationForm: React.FC<RegistrationFormProps> = ({ onClose }) => {
  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState<string>('');
  const contentRef = useRef<HTMLDivElement>(null);

  // State untuk Conditional Logic
  const [jenjang, setJenjang] = useState<string>('');
  const [income, setIncome] = useState<string>('');

  // File States (Base64)
  const [fotoSantri, setFotoSantri] = useState<string>('');
  const [fileSKM, setFileSKM] = useState<string>('');
  const [fileBukti, setFileBukti] = useState<string>('');

  // URL Script
  const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbwiGQxfke25G975j_TPcCRaWY698U4lZWgAwWe8JM-mzkuRaG4Lry7UIkTS54P1RHjoHQ/exec"; // UPDATE THIS

  const isMondok = jenjang.includes("MUKIM");

  useEffect(() => {
    if (formStatus === 'success' && contentRef.current) {
      contentRef.current.scrollTop = 0;
    }
  }, [formStatus]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, setFile: React.Dispatch<React.SetStateAction<string>>) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (ev) => {
        if (ev.target?.result) {
          setFile(ev.target.result as string);
        }
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const getSPPOptions = () => {
    if (!income) return [];
    switch (income) {
      case "Kurang dari Rp. 1.100.000":
        return ["Rp. 100.000 (SKM)"];
      case "Rp. 1.100.000 - Rp. 2.100.000":
        return ["Rp. 150.000 (Proporsional)"];
      case "Rp. 2.100.000 - Rp. 3.500.000":
        return ["Rp. 215.000 (SPP Dasar)"];
      case "Lebih dari Rp. 3.500.000":
        return ["Rp. 250.000 (Kontribusi)"];
      default:
        return [];
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus("submitting");
    setErrorMessage("");

    const form = e.currentTarget as HTMLFormElement;
    const formData = new FormData(form);

    // Construct JSON Payload
    const payload = {
      Tanggal_Pendaftaran: formData.get("Tanggal_Pendaftaran"),
      Asal_Sekolah: formData.get("Asal_Sekolah"),
      Masuk_Ke_Jenjang: formData.get("Masuk_Ke_Jenjang"),
      Nama_Santri_Baru: formData.get("Nama_Santri_Baru"),
      Nama_Ayah: formData.get("Nama_Ayah"),
      Tempat_Lahir: formData.get("Tempat_Lahir"),
      Tanggal_Lahir: formData.get("Tanggal_Lahir"),
      Nama_Ibu: formData.get("Nama_Ibu"),
      Jenis_Kelamin: formData.get("Jenis_Kelamin"),
      Email: formData.get("Email"),
      Saudara_Kandung: formData.get("Saudara_Kandung") || "-",
      Anak_Yatim: formData.get("Anak_Yatim") || "-",
      Ukuran_Seragam: formData.get("Ukuran_Seragam"),
      No_HP: formData.get("No_HP"),
      NISN: formData.get("NISN"),
      Alamat_Lengkap: formData.get("Alamat_Lengkap"),
      // Conditional
      Pendapatan_Orang_Tua: formData.get("Pendapatan_Orang_Tua") || "",
      Kesiapan_SPP: formData.get("Kesiapan_SPP") || "",
      Fasilitas_Makan: formData.get("Fasilitas_Makan") || "",
      Pilihan_Fasilitas: formData.get("Pilihan_Fasilitas") || "",
      // Files
      Foto_Santri: fotoSantri,
      File_SKM: fileSKM,
      File_Bukti_Bayar: fileBukti
    };

    try {
      if (SCRIPT_URL.includes("AKfycbx...")) {
        throw new Error("URL Google Apps Script belum dikonfigurasi. Mohon hubungi admin / lihat panduan.");
      }

      // Use fetch with 'no-cors' for text only, BUT for massive JSON with base64 we normally need proper CORS or text/plain
      // Google Apps Script doPost(e) e.postData.contents handles Request Body better with mode:'no-cors' via form submit, 
      // but for JSON passing we often need specific headers. 
      // Workaround: Send as plain text body to avoid preflight issues if possible, or use standard no-cors.

      await fetch(SCRIPT_URL, {
        method: "POST",
        body: JSON.stringify(payload)
      });

      // If using no-cors, we assume success if no network error
      setFormStatus("success");

    } catch (error: any) {
      console.error("Gagal mengirim data:", error);
      setFormStatus("error");
      setErrorMessage(error.message || "Terjadi kesalahan koneksi.");
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-navy/90 backdrop-blur-sm p-4 overflow-y-auto">
      <div className="relative w-full max-w-4xl bg-white dark:bg-navy rounded-2xl shadow-2xl overflow-hidden my-auto flex flex-col max-h-[90vh]">

        {/* Header */}
        {/* Header - Compact Version for Mobile */}
        <div className="flex justify-between items-center p-4 border-b border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-navy-dark flex-shrink-0 gap-2">
          <div className="flex-1">
            <h2 className="text-lg md:text-2xl font-bold text-navy dark:text-white leading-tight">
              Formulir Pendaftaran
            </h2>
            <p className="text-xs md:text-sm text-slate-600 dark:text-slate-400 mt-1 line-clamp-2 md:line-clamp-none">
              Pondok Pesantren Nurul Huda Malati - TA 2026/2027
            </p>
          </div>
          <button onClick={onClose} className="p-2 rounded-full hover:bg-slate-200 dark:hover:bg-white/10 transition-colors flex-shrink-0">
            <span className="material-symbols-outlined text-slate-500 dark:text-slate-400">close</span>
          </button>
        </div>

        {/* Content */}
        <div ref={contentRef} className="p-6 overflow-y-auto flex-grow min-h-0">
          {formStatus === 'success' ? (
            <div className="p-6 md:p-10 flex flex-col items-start text-left space-y-6 w-full">
              <div className="w-full flex items-center gap-4 p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-900/50 rounded-lg text-green-800 dark:text-green-100 mb-2">
                <span className="material-symbols-outlined text-3xl">check_circle</span>
                <div>
                  <h3 className="text-lg font-bold">Pendaftaran Berhasil Diterima!</h3>
                  <p className="text-sm">Terima kasih kami sampaikan atas kepercayaan Bapak/Ibu dalam mendaftarkan putra/putrinya.</p>
                </div>
              </div>

              <div className="prose dark:prose-invert max-w-none text-slate-700 dark:text-slate-300 text-sm leading-relaxed w-full">
                <p>
                  Sebagai tindak lanjut dari proses pendaftaran, Bapak/Ibu diharapkan untuk <strong>melengkapi dokumen pendaftaran</strong> secara langsung di <strong>Kantor Bendahara Pondok Pesantren Nurul Huda</strong> dengan membawa formulir pendaftaran yang akan kami kirimkan melalui email resmi Bapak/Ibu.
                </p>

                <p className="font-bold mt-4 mb-2">Adapun berkas dokumen yang perlu diserahkan adalah sebagai berikut :</p>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-slate-50 dark:bg-white/5 p-4 rounded-lg border border-slate-200 dark:border-white/10">
                    <h4 className="font-bold text-navy dark:text-primary mb-2 border-b border-slate-200 dark:border-white/10 pb-1">Berkas Wajib</h4>
                    <ol className="list-decimal list-inside space-y-1">
                      <li>Fotocopy Kartu Keluarga (Wajib)</li>
                      <li>Fotocopy KTP Orang Tua (Wajib)</li>
                    </ol>
                  </div>
                  <div className="bg-slate-50 dark:bg-white/5 p-4 rounded-lg border border-slate-200 dark:border-white/10">
                    <h4 className="font-bold text-navy dark:text-primary mb-2 border-b border-slate-200 dark:border-white/10 pb-1">Berkas Opsional / Jika Ada</h4>
                    <ol className="list-decimal list-inside space-y-1">
                      <li>Fotocopy Kartu BPJS (Opsional)</li>
                      <li>Fotocopy Kartu KIP (Opsional)</li>
                      <li>Fotocopy Ijazah (Jika Sudah Ada)</li>
                      <li>Fotocopy Surat Tanda Tamat Belajar (Jika Ada)</li>
                    </ol>
                  </div>
                </div>

                <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 border-l-4 border-action-blue dark:border-primary rounded-r-lg">
                  <p className="mb-2">
                    Untuk memperoleh informasi lebih lengkap mengenai proses selanjutnya, Bapak/Ibu dipersilakan bergabung dalam <strong>Grup WhatsApp Calon Santri PPNH Tahun Ajaran 2026/2027</strong> melalui tautan berikut :
                  </p>
                  <a
                    href="https://chat.whatsapp.com/K5LHiA66RM0Hmyd6OLiKS5"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 text-action-blue dark:text-primary font-bold hover:underline break-all"
                  >
                    <span className="material-symbols-outlined text-lg">chat</span>
                    https://chat.whatsapp.com/K5LHiA66RM0Hmyd6OLiKS5
                  </a>
                </div>

                <p className="font-bold text-center mt-8 text-lg text-navy dark:text-white">
                  Terima kasih telah meluangkan waktu untuk mengisi formulir pendaftaran ini.
                </p>
                <p className="text-center text-slate-600 dark:text-slate-400">
                  Kami menyambut dengan hangat kehadiran putra/putri Bapak/Ibu sebagai bagian dari keluarga besar Pondok Pesantren Nurul Huda Malati.
                </p>
              </div>

              <div className="w-full flex justify-center mt-8">
                <button onClick={onClose} className="bg-primary text-navy font-bold py-3 px-10 rounded-full hover:bg-white transition-colors border border-primary shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all">
                  Tutup Formulir
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-8">
              {/* Welcome Info Box - Moved Inside Scrollable Area */}
              <div className="bg-slate-50 dark:bg-white/5 p-5 rounded-xl border border-slate-200 dark:border-white/10 text-sm text-slate-700 dark:text-slate-300 space-y-3 shadow-sm">
                <p className="text-primary font-bold text-xs md:text-sm tracking-wide mb-2 uppercase">
                  NURUL HUDA MAJU BERSAMA, MAJU PONDOKNYA BAHAGIA SANTRINYA
                </p>
                <p className="font-bold text-action-blue dark:text-primary">WELCOME ABOARD :)</p>
                <p>
                  <span className="font-bold">Bangun Masa Depanmu dengan Ilmu dan Iman.</span> Di Nurul Huda Malati Garut, kamu tidak hanya belajar. Kamu tumbuh, berjuang dan menjadi pribadi yang bermanfaat.
                </p>
                <p>
                  <span className="font-bold">Pendaftaran Santri Baru 2026/2027 Resmi Dibuka!</span><br />
                  Kesempatan emas untuk bergabung dengan lingkungan pendidikan yang memadukan pesantren dan sekolah formal terpadu.
                </p>
                <p className="italic text-slate-500 dark:text-slate-400 border-t border-slate-100 dark:border-white/5 pt-2 mt-2">
                  Awali dengan Basmallah, silahkan isi formulir pendaftaran dan jadilah bagian dari generasi Nurul Huda!
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-8">

                {/* --- REGISTRASI --- */}
                <div>
                  <h3 className="text-lg font-bold text-action-blue dark:text-primary mb-4 border-b border-slate-200 dark:border-white/10 pb-2">
                    Registrasi Pendaftaran
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Tanggal Pendaftaran *</label>
                      <input type="date" name="Tanggal_Pendaftaran" required className="w-full px-4 py-2 rounded-lg border border-slate-300 dark:border-white/20 bg-white dark:bg-navy-dark text-slate-900 dark:text-white placeholder:text-slate-400" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Asal Sekolah *</label>
                      <input type="text" name="Asal_Sekolah" required placeholder="Isikan Asal Sekolah Siswa" className="w-full px-4 py-2 rounded-lg border border-slate-300 dark:border-white/20 bg-white dark:bg-navy-dark text-slate-900 dark:text-white placeholder:text-slate-400" />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Masuk Ke Jenjang *</label>
                      <select
                        name="Masuk_Ke_Jenjang"
                        required
                        className="w-full px-4 py-2 rounded-lg border border-slate-300 dark:border-white/20 bg-white dark:bg-navy-dark text-slate-900 dark:text-white placeholder:text-slate-400"
                        onChange={(e) => setJenjang(e.target.value)}
                      >
                        <option value="">Pilih Jenjang...</option>
                        <option value="SMP PLUS NURUL HUDA (MUKIM DOMISI SEKITAR)">SMP Plus Nurul Huda – Mukim (Domisili Sekitar)</option>
                        <option value="SMP PLUS NURUL HUDA (MUKIM DOMISI EKSTERNAL)">SMP Plus Nurul Huda – Mukim (Domisili Luar)</option>
                        <option value="SMK PLUS NURUL HUDA (MUKIM DOMISI SEKITAR)">SMK Plus Nurul Huda – Mukim (Domisili Sekitar)</option>
                        <option value="SMK PLUS NURUL HUDA (MUKIM DOMISI EKSTERNAL)">SMK Plus Nurul Huda – Mukim (Domisili Luar)</option>
                        <option value="SMP PLUS NURUL HUDA (ANSOR)">SMP Plus Nurul Huda - Ansor</option>
                        <option value="SMK PLUS NURUL HUDA (ANSOR)">SMK Plus Nurul Huda - Ansor</option>
                      </select>
                      {jenjang.includes("DOMISI SEKITAR") && (
                        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                          <span className="font-bold text-action-blue dark:text-primary">Keterangan:</span> Wilayah pondok dan sekitarnya yaitu Desa. Padaasih, Padasuka, Sirnajaya, Padamulya dan Pasirkiamis.
                        </p>
                      )}
                      {jenjang.includes("DOMISI EKSTERNAL") && (
                        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                          <span className="font-bold text-action-blue dark:text-primary">Keterangan:</span> Luar wilayah domisili sekitar.
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                {/* --- DATA DIRI --- */}
                <div>
                  <h3 className="text-lg font-bold text-action-blue dark:text-primary mb-4 border-b border-slate-200 dark:border-white/10 pb-2">
                    Data Diri
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Foto Calon Santri (3x4) *</label>
                      <div className="border-2 border-dashed border-slate-300 dark:border-white/20 rounded-lg p-6 text-center hover:bg-slate-50 dark:hover:bg-white/5 transition-colors cursor-pointer relative">
                        <input
                          type="file"
                          accept="image/*"
                          required
                          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                          onChange={(e) => handleFileChange(e, setFotoSantri)}
                        />
                        {fotoSantri ? (
                          <div className="flex items-center justify-center gap-2 text-green-600">
                            <span className="material-symbols-outlined">check_circle</span>
                            <span>Foto Terpilih</span>
                          </div>
                        ) : (
                          <div className="text-slate-500">
                            <span className="material-symbols-outlined text-3xl mb-2">cloud_upload</span>
                            <p>Klik untuk upload foto</p>
                            <p className="text-xs mt-1">Format: JPG, PNG. Max: 2MB</p>
                          </div>
                        )}
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Nama Santri Baru *</label>
                      <input type="text" name="Nama_Santri_Baru" required placeholder="Sesuai Ijazah" className="w-full px-4 py-2 rounded-lg border border-slate-300 dark:border-white/20 bg-white dark:bg-navy-dark text-slate-900 dark:text-white placeholder:text-slate-400" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Tempat Lahir *</label>
                      <input type="text" name="Tempat_Lahir" required placeholder="Sesuai KK" className="w-full px-4 py-2 rounded-lg border border-slate-300 dark:border-white/20 bg-white dark:bg-navy-dark text-slate-900 dark:text-white placeholder:text-slate-400" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Tanggal Lahir *</label>
                      <input type="date" name="Tanggal_Lahir" required className="w-full px-4 py-2 rounded-lg border border-slate-300 dark:border-white/20 bg-white dark:bg-navy-dark text-slate-900 dark:text-white placeholder:text-slate-400" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Nama Ayah *</label>
                      <input type="text" name="Nama_Ayah" required placeholder="Nama Lengkap Ayah" className="w-full px-4 py-2 rounded-lg border border-slate-300 dark:border-white/20 bg-white dark:bg-navy-dark text-slate-900 dark:text-white placeholder:text-slate-400" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Nama Ibu *</label>
                      <input type="text" name="Nama_Ibu" required placeholder="Nama Lengkap Ibu" className="w-full px-4 py-2 rounded-lg border border-slate-300 dark:border-white/20 bg-white dark:bg-navy-dark text-slate-900 dark:text-white placeholder:text-slate-400" />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Jenis Kelamin *</label>
                      <select name="Jenis_Kelamin" required className="w-full px-4 py-2 rounded-lg border border-slate-300 dark:border-white/20 bg-white dark:bg-navy-dark text-slate-900 dark:text-white placeholder:text-slate-400">
                        <option value="">Pilih...</option>
                        <option value="Laki-Laki">Laki-Laki</option>
                        <option value="Perempuan">Perempuan</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Alamat Email *</label>
                      <input type="email" name="Email" required placeholder="email@contoh.com" className="w-full px-4 py-2 rounded-lg border border-slate-300 dark:border-white/20 bg-white dark:bg-navy-dark text-slate-900 dark:text-white placeholder:text-slate-400" />
                    </div>

                    {isMondok && (
                      <>
                        <div className="md:col-span-2">
                          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Apakah memiliki saudara kandung (adik/kakak) yang sedang mondok di Nurul Huda? *</label>
                          <select name="Saudara_Kandung" required className="w-full px-4 py-2 rounded-lg border border-slate-300 dark:border-white/20 bg-white dark:bg-navy-dark text-slate-900 dark:text-white placeholder:text-slate-400">
                            <option value="">Pilih...</option>
                            <option value="Iya">Iya</option>
                            <option value="Tidak">Tidak</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Apakah ananda seorang yatim? *</label>
                          <select name="Anak_Yatim" required className="w-full px-4 py-2 rounded-lg border border-slate-300 dark:border-white/20 bg-white dark:bg-navy-dark text-slate-900 dark:text-white placeholder:text-slate-400">
                            <option value="">Pilih...</option>
                            <option value="Iya">Iya</option>
                            <option value="Tidak">Tidak</option>
                          </select>
                        </div>
                      </>
                    )}

                    <div>
                      <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Ukuran Seragam *</label>
                      <select name="Ukuran_Seragam" required className="w-full px-4 py-2 rounded-lg border border-slate-300 dark:border-white/20 bg-white dark:bg-navy-dark text-slate-900 dark:text-white placeholder:text-slate-400">
                        <option value="">Pilih...</option>
                        <option value="S">S (LD 84-88 cm)</option>
                        <option value="M">M (LD 89-94 cm)</option>
                        <option value="L">L (LD 95-100 cm)</option>
                        <option value="XL">XL (LD 101-108 cm)</option>
                        <option value="XXL">XXL (LD &gt;108 cm)</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">No. Telp/WA (Aktif) *</label>
                      <input type="tel" name="No_HP" required placeholder="Contoh: 081234567890" className="w-full px-4 py-2 rounded-lg border border-slate-300 dark:border-white/20 bg-white dark:bg-navy-dark text-slate-900 dark:text-white placeholder:text-slate-400" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">NISN *</label>
                      <input type="number" name="NISN" required placeholder="Contoh: 1234567890" className="w-full px-4 py-2 rounded-lg border border-slate-300 dark:border-white/20 bg-white dark:bg-navy-dark text-slate-900 dark:text-white placeholder:text-slate-400" />
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Alamat Lengkap *</label>
                      <textarea name="Alamat_Lengkap" required rows={3} placeholder="Sesuai KTP" className="w-full px-4 py-2 rounded-lg border border-slate-300 dark:border-white/20 bg-white dark:bg-navy-dark text-slate-900 dark:text-white placeholder:text-slate-400 resize-none"></textarea>
                    </div>
                  </div>
                </div>

                {/* --- DATA ADMINISTRASI (HANYA JIKA MONDOK) --- */}
                {isMondok && (
                  <div className="animate-[fadeIn_0.5s_ease]">
                    <h3 className="text-lg font-bold text-action-blue dark:text-primary mb-4 border-b border-slate-200 dark:border-white/10 pb-2">
                      Data Administrasi & Pembayaran
                    </h3>
                    <div className="grid grid-cols-1 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Pendapatan Orang Tua / Bulan *</label>
                        <select
                          name="Pendapatan_Orang_Tua"
                          required
                          className="w-full px-4 py-2 rounded-lg border border-slate-300 dark:border-white/20 bg-white dark:bg-navy-dark text-slate-900 dark:text-white placeholder:text-slate-400"
                          onChange={(e) => setIncome(e.target.value)}
                        >
                          <option value="">Pilih Pendapatan...</option>
                          <option value="Kurang dari Rp. 1.100.000">Kurang dari Rp. 1.100.000</option>
                          <option value="Rp. 1.100.000 - Rp. 2.100.000">Rp. 1.100.000 - Rp. 2.100.000</option>
                          <option value="Rp. 2.100.000 - Rp. 3.500.000">Rp. 2.100.000 - Rp. 3.500.000</option>
                          <option value="Lebih dari Rp. 3.500.000">Lebih dari Rp. 3.500.000</option>
                        </select>
                      </div>

                      {/* Logic Upload SKM: Jika Income < 1 Juta */}
                      {income === "Kurang dari Rp. 1.100.000" && (
                        <div className="bg-yellow-50 dark:bg-yellow-900/20 p-4 rounded-lg border border-yellow-200 dark:border-yellow-700/50">
                          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Upload SKTM (Surat Keterangan Tidak Mampu) *</label>
                          <input
                            type="file"
                            required
                            className="block w-full text-sm text-slate-500
                                                        file:mr-4 file:py-2 file:px-4
                                                        file:rounded-full file:border-0
                                                        file:text-sm file:font-semibold
                                                        file:bg-primary file:text-navy
                                                        hover:file:bg-white transition-all
                                                    "
                            onChange={(e) => handleFileChange(e, setFileSKM)}
                          />
                          <p className="text-xs text-slate-500 mt-1">Wajib bagi pendapatan kurang dari 1.1 Juta.</p>
                        </div>
                      )}

                      <div>
                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Kesiapan Pembayaran SPP *</label>
                        <select name="Kesiapan_SPP" required className="w-full px-4 py-2 rounded-lg border border-slate-300 dark:border-white/20 bg-white dark:bg-navy-dark text-slate-900 dark:text-white placeholder:text-slate-400">
                          {getSPPOptions().map(opt => (
                            <option key={opt} value={opt}>{opt}</option>
                          ))}
                        </select>
                        <p className="text-xs text-slate-500 mt-1">Disesuaikan dengan pendapatan orang tua.</p>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Pilihan Makan *</label>
                        <select name="Fasilitas_Makan" required className="w-full px-4 py-2 rounded-lg border border-slate-300 dark:border-white/20 bg-white dark:bg-navy-dark text-slate-900 dark:text-white placeholder:text-slate-400">
                          <option value="VIP - Rp. 550.000/Bulan">VIP - Rp. 550.000/Bulan</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Pilihan Pembayaran Fasilitas *</label>
                        <select name="Pilihan_Fasilitas" required className="w-full px-4 py-2 rounded-lg border border-slate-300 dark:border-white/20 bg-white dark:bg-navy-dark text-slate-900 dark:text-white placeholder:text-slate-400">
                          <option value="">Pilih Pembayaran Fasilitas...</option>
                          <option value="Bulanan - Rp. 75.000">Bulanan - Rp. 75.000</option>
                          <option value="Per Semester - Rp. 400.000">Per Semester - Rp. 400.000</option>
                          <option value="Per Tahun - Rp. 800.000">Per Tahun - Rp. 800.000</option>
                          <option value="Per Tiga Tahun - Rp. 2.400.000">Per Tiga Tahun - Rp. 2.400.000</option>
                        </select>
                      </div>

                      <div className="pt-4 border-t border-slate-200 dark:border-white/5">
                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Upload Bukti Pembayaran *</label>
                        <div className="bg-slate-50 dark:bg-white/5 p-4 rounded-lg flex flex-col gap-2">
                          <p className="text-sm font-bold">Transfer ke Rekening BRI: 1234-5678-9012 (A.n Nurul Huda)</p>
                          <input
                            type="file"
                            accept="image/*, application/pdf"
                            required
                            onChange={(e) => handleFileChange(e, setFileBukti)}
                            className="block w-full text-sm text-slate-500 mt-2"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {errorMessage && (
                  <div className="p-4 bg-red-100 border border-red-300 text-red-700 rounded-lg">
                    {errorMessage}
                  </div>
                )}

                <div className="pt-6 border-t border-slate-200 dark:border-white/10 flex justify-end gap-4 pb-10">
                  <button type="button" onClick={onClose} className="px-6 py-3 rounded-lg border border-slate-300 dark:border-white/20 text-slate-700 dark:text-white font-medium hover:bg-slate-100 dark:hover:bg-white/5 transition-colors">
                    Batal
                  </button>
                  <button
                    type="submit"
                    disabled={formStatus === 'submitting'}
                    className="px-8 py-3 rounded-lg bg-primary text-navy font-bold hover:bg-white hover:text-primary border border-transparent hover:border-primary transition-all shadow-lg disabled:opacity-70 disabled:cursor-not-allowed flex items-center gap-2"
                  >
                    {formStatus === 'submitting' ? (
                      <>
                        <span className="animate-spin h-5 w-5 border-2 border-white/50 border-t-white rounded-full"></span>
                        <span>Mengirim...</span>
                      </>
                    ) : 'Kirim Formulir'}
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RegistrationForm;
