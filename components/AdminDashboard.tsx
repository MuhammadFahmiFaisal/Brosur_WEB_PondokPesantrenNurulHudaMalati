import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

// URL Script Google Apps Script
const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbwiGQxfke25G975j_TPcCRaWY698U4lZWgAwWe8JM-mzkuRaG4Lry7UIkTS54P1RHjoHQ/exec";

interface Registrant {
  row_index?: number;
  Tanggal_Pendaftaran: string;
  Asal_Sekolah: string;
  Masuk_Ke_Jenjang: string;
  Nama_Santri_Baru: string;
  Nama_Ayah: string;
  Tempat_Lahir: string;
  Tanggal_Lahir: string;
  Nama_Ibu: string;
  Jenis_Kelamin: string;
  Email: string;
  Saudara_Kandung: string;
  Anak_Yatim: string;
  Ukuran_Seragam: string;
  No_HP: string;
  NISN: string;
  Alamat_Lengkap: string;
  Pendapatan_Orang_Tua: string;
  Kesiapan_SPP: string;
  Pilihan_Fasilitas: string;
  Fasilitas_Makan: string;
  Foto_Santri: string;
  File_SKM: string;
  File_Bukti_Bayar: string;
}

// --- HELPER FORMAT TANGGAL ---
const formatDateIndo = (dateString: string, withDay: boolean = true) => {
  if (!dateString) return '-';
  try {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return dateString;

    const options: Intl.DateTimeFormatOptions = {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    };

    if (withDay) {
      options.weekday = 'long';
    }

    return date.toLocaleDateString('id-ID', options);
  } catch (e) {
    return dateString;
  }
};

const AdminDashboard: React.FC = () => {
  // Login State
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passwordInput, setPasswordInput] = useState('');
  const [loginError, setLoginError] = useState('');

  // Data State
  const [registrants, setRegistrants] = useState<Registrant[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('Semua');

  // Modal State
  const [selectedRegistrant, setSelectedRegistrant] = useState<Registrant | null>(null);
  const [showDetailModal, setShowDetailModal] = useState(false);

  // Image Loading State
  const [imgError, setImgError] = useState<Record<string, boolean>>({});

  // --- HELPER LINK GAMBAR (UPDATED) ---
  const getSafeImageUrl = (url: string) => {
    if (!url) return '';
    try {
      let id = '';
      // Cek parameter id= (e.g. uc?id=XXX or open?id=XXX)
      const idMatch = url.match(/[?&]id=([^&]+)/);
      if (idMatch && idMatch[1]) {
        id = idMatch[1];
      }
      // Cek path /d/ (e.g. file/d/XXX/view)
      else {
        const dMatch = url.match(/\/d\/([^/]+)/);
        if (dMatch && dMatch[1]) {
          id = dMatch[1];
        }
      }

      if (id) {
        // Menggunakan endpoint thumbnail dengan ukuran besar (w1000)
        return `https://drive.google.com/thumbnail?id=${id}&sz=w1000`;
      }

      return url;
    } catch (e) {
      return url;
    }
  };

  // --- LOGIN HANDLER ---
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordInput === 'admin123' || passwordInput === 'ppnh2026') {
      setIsAuthenticated(true);
      localStorage.setItem('admin_auth', 'true');
    } else {
      setLoginError('Password salah!');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('admin_auth');
  };

  useEffect(() => {
    const auth = localStorage.getItem('admin_auth');
    if (auth === 'true') {
      setIsAuthenticated(true);
    }
  }, []);

  // --- DATA FETCHING ---
  const fetchData = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await fetch(`${SCRIPT_URL}?action=get_registrants&_t=${new Date().getTime()}`);
      const result = await response.json();

      if (result.status === 'success') {
        const sortedData = result.data.sort((a: any, b: any) =>
          new Date(b.Tanggal_Pendaftaran).getTime() - new Date(a.Tanggal_Pendaftaran).getTime()
        );
        setRegistrants(sortedData);
      } else {
        setError('Gagal memuat data: ' + result.message);
      }
    } catch (err) {
      setError('Terjadi kesalahan koneksi saat memuat data.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchData();
    }
  }, [isAuthenticated]);

  // --- FILTERING LOGIC ---
  const getFilteredData = () => {
    return registrants.filter(reg => {
      // Safe access to properties
      const name = reg.Nama_Santri_Baru ? reg.Nama_Santri_Baru.toLowerCase() : '';
      const school = reg.Asal_Sekolah ? reg.Asal_Sekolah.toLowerCase() : '';
      const nisn = reg.NISN ? String(reg.NISN) : '';

      // 1. Search Filter
      const matchesSearch =
        name.includes(searchTerm.toLowerCase()) ||
        school.includes(searchTerm.toLowerCase()) ||
        nisn.includes(searchTerm);

      // 2. Category Filter
      let matchesCategory = true;
      const jenjangInfo = reg.Masuk_Ke_Jenjang ? reg.Masuk_Ke_Jenjang.toUpperCase() : '';

      switch (filterCategory) {
        case 'SMP':
          matchesCategory = jenjangInfo.includes('SMP');
          break;
        case 'SMK':
          matchesCategory = jenjangInfo.includes('SMK');
          break;
        case 'Mukim':
          matchesCategory = jenjangInfo.includes('MUKIM');
          break;
        case 'Ansor':
          matchesCategory = jenjangInfo.includes('ANSOR');
          break;
        default:
          matchesCategory = true;
      }

      return matchesSearch && matchesCategory;
    });
  };

  const filteredRegistrants = getFilteredData();

  // --- STATS CALCULATION ---
  const stats = {
    total: registrants.length,
    laki: registrants.filter(r => r.Jenis_Kelamin === 'Laki-Laki').length,
    perempuan: registrants.filter(r => r.Jenis_Kelamin === 'Perempuan').length,
    mukim: registrants.filter(r => r.Masuk_Ke_Jenjang && String(r.Masuk_Ke_Jenjang).toLowerCase().includes('mukim')).length
  };

  // --- PRINT HANDLER ---
  const handlePrint = () => {
    window.print();
  };

  // --- RENDER LOGIN SCREEN ---
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-navy-darker p-4">
        <div className="bg-white dark:bg-navy p-8 rounded-2xl shadow-xl w-full max-w-md border border-slate-200 dark:border-white/10">
          <div className="text-center mb-8">
            <span className="material-symbols-outlined text-5xl text-primary mb-4">admin_panel_settings</span>
            <h1 className="text-2xl font-bold text-navy dark:text-white">Admin Login</h1>
            <p className="text-slate-500 dark:text-slate-400">Silakan masuk untuk mengakses dashboard</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Password Admin</label>
              <input
                type="password"
                value={passwordInput}
                onChange={(e) => setPasswordInput(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-slate-300 dark:border-white/20 bg-slate-50 dark:bg-black/20 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                placeholder="Masukkan password..."
              />
            </div>

            {loginError && (
              <p className="text-red-500 text-sm text-center font-medium bg-red-50 p-2 rounded-lg">{loginError}</p>
            )}

            <button
              type="submit"
              className="w-full py-3 bg-primary text-navy font-bold rounded-xl hover:bg-primary-dark transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              Masuk Dashboard
            </button>
            <div className="text-center mt-6">
              <Link to="/" className="text-sm text-slate-500 hover:text-primary transition-colors flex items-center justify-center gap-1">
                <span className="material-symbols-outlined text-sm">arrow_back</span>
                Kembali ke Halaman Utama
              </Link>
            </div>
          </form>
        </div>
      </div>
    );
  }

  // --- RENDER DASHBOARD ---
  return (
    // STYLE KHUSUS PRINT
    <>
      <style>{`
        @media print {
            @page {
                size: 215mm 330mm; /* Ukuran F4 / Folio (Indonesia Standard) */
                margin: 1cm;
            }
            body {
                background: white;
                -webkit-print-color-adjust: exact;
            }
            .no-print {
                display: none !important;
            }
            .print-only {
                display: block !important;
                width: 100%;
            }
            /* Reset some tailwind styles for print */
            * {
                box-shadow: none !important;
                text-shadow: none !important;
            }
        }
    `}</style>

      <div className="min-h-screen bg-slate-100 dark:bg-navy-darker text-slate-800 dark:text-slate-200 p-4 md:p-8 font-sans">

        {/* 
          =============================================
          LAYOUT DASHBOARD (HIDDEN SAAT PRINT) 
          =============================================
      */}
        <div className="no-print">
          {/* Header & Actions */}
          <div className="max-w-7xl mx-auto mb-8 bg-white dark:bg-navy p-6 rounded-2xl shadow-sm border border-slate-200 dark:border-white/10 flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-yellow-100 dark:bg-yellow-900/30 rounded-xl text-yellow-600 dark:text-yellow-400">
                <span className="material-symbols-outlined text-3xl">grid_view</span>
              </div>
              <div>
                <h1 className="text-2xl md:text-3xl font-bold text-navy dark:text-white tracking-tight">Dashboard Penerimaan</h1>
                <p className="text-sm text-slate-500 font-medium">Data Realtime PPDB Tahun Ajaran 2026/2027</p>
              </div>
            </div>

            <div className="flex gap-3">
              <button onClick={fetchData} className="px-5 py-2.5 rounded-xl bg-blue-50 text-blue-600 font-bold hover:bg-blue-100 transition-colors flex items-center gap-2 border border-blue-200">
                <span className="material-symbols-outlined text-xl">refresh</span>
                Refresh Data
              </button>
              <button onClick={handleLogout} className="px-5 py-2.5 rounded-xl bg-red-50 text-red-600 font-bold hover:bg-red-100 transition-colors flex items-center gap-2 border border-red-200">
                <span className="material-symbols-outlined text-xl">logout</span>
                Logout
              </button>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {/* Total */}
            <div className="bg-white dark:bg-navy p-6 rounded-2xl shadow-sm border border-slate-200 dark:border-white/10 relative overflow-hidden group hover:shadow-md transition-all">
              <div className="relative z-10">
                <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center text-white shadow-lg mb-4 group-hover:scale-110 transition-transform">
                  <span className="material-symbols-outlined">groups</span>
                </div>
                <h3 className="text-4xl font-bold text-navy dark:text-white mb-1">{stats.total}</h3>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Total Pendaftar</p>
              </div>
              <span className="material-symbols-outlined absolute -right-4 -bottom-4 text-[120px] text-slate-100 dark:text-white/5 z-0">groups</span>
            </div>

            {/* Laki-laki */}
            <div className="bg-white dark:bg-navy p-6 rounded-2xl shadow-sm border border-slate-200 dark:border-white/10 relative overflow-hidden group hover:shadow-md transition-all">
              <div className="relative z-10">
                <div className="w-12 h-12 bg-teal-500 rounded-xl flex items-center justify-center text-white shadow-lg mb-4 group-hover:scale-110 transition-transform">
                  <span className="material-symbols-outlined">male</span>
                </div>
                <h3 className="text-4xl font-bold text-navy dark:text-white mb-1">{stats.laki}</h3>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Laki-Laki</p>
                <p className="text-[10px] text-teal-600 font-bold mt-1">{stats.total > 0 ? Math.round((stats.laki / stats.total) * 100) : 0}%</p>
              </div>
              <span className="material-symbols-outlined absolute -right-4 -bottom-4 text-[120px] text-slate-100 dark:text-white/5 z-0">male</span>
            </div>

            {/* Perempuan */}
            <div className="bg-white dark:bg-navy p-6 rounded-2xl shadow-sm border border-slate-200 dark:border-white/10 relative overflow-hidden group hover:shadow-md transition-all">
              <div className="relative z-10">
                <div className="w-12 h-12 bg-pink-500 rounded-xl flex items-center justify-center text-white shadow-lg mb-4 group-hover:scale-110 transition-transform">
                  <span className="material-symbols-outlined">female</span>
                </div>
                <h3 className="text-4xl font-bold text-navy dark:text-white mb-1">{stats.perempuan}</h3>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Perempuan</p>
                <p className="text-[10px] text-pink-600 font-bold mt-1">{stats.total > 0 ? Math.round((stats.perempuan / stats.total) * 100) : 0}%</p>
              </div>
              <span className="material-symbols-outlined absolute -right-4 -bottom-4 text-[120px] text-slate-100 dark:text-white/5 z-0">female</span>
            </div>

            {/* Santri Mukim */}
            <div className="bg-white dark:bg-navy p-6 rounded-2xl shadow-sm border border-slate-200 dark:border-white/10 relative overflow-hidden group hover:shadow-md transition-all">
              <div className="relative z-10">
                <div className="w-12 h-12 bg-purple-500 rounded-xl flex items-center justify-center text-white shadow-lg mb-4 group-hover:scale-110 transition-transform">
                  <span className="material-symbols-outlined">bed</span>
                </div>
                <h3 className="text-3xl font-bold text-navy dark:text-white mb-1">{stats.mukim}</h3>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Santri Mukim</p>
                <p className="text-[10px] text-purple-600 font-bold mt-1">Target Asrama</p>
              </div>
              <span className="material-symbols-outlined absolute -right-4 -bottom-4 text-[120px] text-slate-100 dark:text-white/5 z-0">bed</span>
            </div>
          </div>

          {/* Main Table Section */}
          <div className="max-w-7xl mx-auto bg-white dark:bg-navy rounded-2xl shadow-sm border border-slate-200 dark:border-white/10 overflow-hidden">
            {/* Search Bar & Filters */}
            <div className="p-6 border-b border-slate-200 dark:border-white/10 bg-slate-50/50 dark:bg-white/5 flex flex-col gap-4">
              <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                <h2 className="text-lg font-bold text-navy dark:text-white">Daftar Pendaftar Masuk</h2>
                {/* SEARCH */}
                <div className="relative w-full md:w-96">
                  <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">search</span>
                  <input
                    type="text"
                    placeholder="Cari nama, sekolah, nisn..."
                    className="w-full pl-10 pr-4 py-2 rounded-lg border border-slate-200 dark:border-white/20 bg-white dark:bg-navy-dark focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>

              {/* CATEGORY TABS */}
              <div className="flex flex-wrap gap-2">
                {['Semua', 'SMP', 'SMK', 'Mukim', 'Ansor'].map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setFilterCategory(cat)}
                    className={`px-4 py-1.5 rounded-full text-sm font-bold border transition-all ${filterCategory === cat
                      ? 'bg-navy text-white border-navy dark:bg-primary dark:text-navy dark:border-primary'
                      : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-100 dark:bg-white/5 dark:text-slate-300 dark:border-white/10 dark:hover:bg-white/10'
                      }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {loading ? (
              <div className="p-20 flex flex-col items-center justify-center text-slate-400">
                <div className="animate-spin h-10 w-10 border-4 border-primary border-t-transparent rounded-full mb-4"></div>
                <p>Mengambil data terbaru...</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead className="bg-slate-50 dark:bg-black/20 text-slate-500 text-xs uppercase font-bold tracking-wider">
                    <tr>
                      <th className="p-4 w-16 text-center">#</th>
                      <th className="p-4">Nama Lengkap</th>
                      <th className="p-4">Asal Sekolah</th>
                      <th className="p-4">Jenjang</th>
                      <th className="p-4 text-center">Status</th>
                      <th className="p-4 text-center">Aksi</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-white/5 text-sm">
                    {filteredRegistrants.length > 0 ? (
                      filteredRegistrants.map((reg, idx) => (
                        <tr key={idx} className="hover:bg-blue-50/50 dark:hover:bg-white/5 transition-colors cursor-pointer" onClick={() => {
                          setSelectedRegistrant(reg);
                          // Reset image error state for new selection
                          setImgError({});
                          setShowDetailModal(true);
                        }}>
                          <td className="p-4 text-center text-slate-400 font-mono">{idx + 1}</td>
                          <td className="p-4">
                            <div className="font-bold text-navy dark:text-white">{reg.Nama_Santri_Baru}</div>
                            <div className="text-xs text-slate-500">{reg.NISN}</div>
                          </td>
                          <td className="p-4 text-slate-600 dark:text-slate-300">{reg.Asal_Sekolah}</td>
                          <td className="p-4">
                            <span className={`px-2 py-1 rounded text-[10px] font-bold border whitespace-nowrap ${String(reg.Masuk_Ke_Jenjang).toLowerCase().includes('mukim')
                              ? 'bg-purple-50 text-purple-700 border-purple-200'
                              : 'bg-orange-50 text-orange-700 border-orange-200'
                              }`}>
                              {reg.Masuk_Ke_Jenjang}
                            </span>
                          </td>
                          <td className="p-4 text-center">
                            {reg.File_Bukti_Bayar ? (
                              <span className="inline-flex items-center gap-1 text-green-600 bg-green-50 px-2 py-1 rounded-full text-[10px] font-bold border border-green-200">
                                <span className="material-symbols-outlined text-[10px]">check_circle</span>
                                Bayar
                              </span>
                            ) : (
                              <span className="inline-flex items-center gap-1 text-red-500 bg-red-50 px-2 py-1 rounded-full text-[10px] font-bold border border-red-200">
                                <span className="material-symbols-outlined text-[10px]">pending</span>
                                Belum
                              </span>
                            )}
                          </td>
                          <td className="p-4 text-center">
                            <button className="p-2 bg-white border border-slate-200 rounded-lg hover:bg-primary hover:text-navy hover:border-primary transition-colors shadow-sm">
                              <span className="material-symbols-outlined text-lg">visibility</span>
                            </button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={6} className="p-12 text-center text-slate-500">
                          Tidak ada data yang cocok dengan filter yang dipilih.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          {/* --- DETAIL MODAL (WEB VIEW) --- */}
          {showDetailModal && selectedRegistrant && (
            <div className="fixed inset-0 z-[100] bg-navy/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
              <div className="bg-white dark:bg-navy w-full max-w-4xl rounded-2xl shadow-2xl overflow-hidden animate-[scaleIn_0.3s_ease] my-8">

                {/* Modal Header */}
                <div className="p-6 border-b border-slate-200 dark:border-white/10 flex justify-between items-start bg-slate-50 dark:bg-black/20">
                  <div>
                    <h2 className="text-2xl font-bold text-navy dark:text-white leading-none">
                      {selectedRegistrant.Nama_Santri_Baru}
                    </h2>
                    <p className="text-slate-500 mt-1 font-mono text-sm">NISN: {selectedRegistrant.NISN}</p>
                  </div>
                  <div className="flex gap-2">
                    <button onClick={() => { setShowDetailModal(false); }} className="p-2 hover:bg-slate-200 rounded-full transition-colors">
                      <span className="material-symbols-outlined">close</span>
                    </button>
                  </div>
                </div>

                {/* Modal Content - Scrollable */}
                <div className="p-8 overflow-y-auto max-h-[70vh]">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

                    {/* Left Column: Photo & Basic */}
                    <div className="md:col-span-1 space-y-6">
                      {/* Photo Card */}
                      <div className="aspect-[3/4] bg-slate-100 rounded-xl overflow-hidden border border-slate-200 shadow-sm relative group">
                        {!imgError['foto_santri'] && selectedRegistrant.Foto_Santri ? (
                          <img
                            src={getSafeImageUrl(selectedRegistrant.Foto_Santri)}
                            alt="Foto Santri"
                            className="w-full h-full object-cover"
                            referrerPolicy="no-referrer"
                            onError={(e) => {
                              console.warn("Failed to load image:", selectedRegistrant.Foto_Santri);
                              setImgError(prev => ({ ...prev, 'foto_santri': true }))
                            }}
                          />
                        ) : (
                          // FALLBACK JIKA GAMBAR ERROR / KOSONG
                          <div className="w-full h-full flex flex-col items-center justify-center text-slate-400 p-4 text-center bg-slate-100">
                            <span className="material-symbols-outlined text-4xl mb-2 text-slate-300">broken_image</span>
                            <p className="text-xs mb-3">Foto tidak dapat ditampilkan.</p>
                            {selectedRegistrant.Foto_Santri && (
                              <a
                                href={selectedRegistrant.Foto_Santri}
                                target="_blank"
                                rel="noreferrer"
                                className="px-3 py-1.5 bg-blue-100 text-blue-700 rounded-lg text-xs font-bold hover:bg-blue-200 transition-colors flex items-center gap-1"
                              >
                                <span className="material-symbols-outlined text-xs">open_in_new</span>
                                Buka di Drive
                              </a>
                            )}
                          </div>
                        )}
                      </div>

                      <div className="space-y-4">
                        <div>
                          <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Jenjang Pilihan</p>
                          <span className="bg-blue-50 text-blue-700 px-3 py-1.5 rounded-lg text-xs font-bold border border-blue-200 inline-block">
                            {selectedRegistrant.Masuk_Ke_Jenjang}
                          </span>
                        </div>
                        <div>
                          <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Daftar Pada</p>
                          <p className="font-medium text-navy dark:text-white">
                            {formatDateIndo(selectedRegistrant.Tanggal_Pendaftaran)}
                          </p>
                        </div>
                        <div>
                          <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Email</p>
                          <p className="text-navy dark:text-white text-sm break-all">{selectedRegistrant.Email || '-'}</p>
                        </div>
                      </div>
                    </div>

                    {/* Right Column: Details */}
                    <div className="md:col-span-2 space-y-8">

                      {/* Personal Info Grid */}
                      <div>
                        <h3 className="text-primary font-bold uppercase tracking-widest text-sm mb-4 border-b border-slate-100 pb-2">Informasi Pribadi</h3>
                        <div className="grid grid-cols-2 gap-6">
                          <div>
                            <p className="text-xs text-slate-500 uppercase font-bold mb-1">Tempat, Tgl Lahir</p>
                            <p className="text-navy dark:text-white font-medium text-lg">
                              {selectedRegistrant.Tempat_Lahir}, {formatDateIndo(selectedRegistrant.Tanggal_Lahir, false)}
                            </p>
                          </div>
                          <div>
                            <p className="text-xs text-slate-500 uppercase font-bold mb-1">Jenis Kelamin</p>
                            <p className="text-navy dark:text-white font-medium text-lg">{selectedRegistrant.Jenis_Kelamin}</p>
                          </div>
                          <div>
                            <p className="text-xs text-slate-500 uppercase font-bold mb-1">Punya Saudara Kandung?</p>
                            <p className="text-navy dark:text-white font-medium">{selectedRegistrant.Saudara_Kandung || '-'}</p>
                          </div>
                          <div>
                            <p className="text-xs text-slate-500 uppercase font-bold mb-1">Status Anak Yatim</p>
                            <p className="text-navy dark:text-white font-medium">{selectedRegistrant.Anak_Yatim || '-'}</p>
                          </div>
                          <div>
                            <p className="text-xs text-slate-500 uppercase font-bold mb-1">Ukuran Seragam</p>
                            <span className="inline-block px-3 py-1 bg-slate-100 rounded text-navy font-bold">{selectedRegistrant.Ukuran_Seragam || '-'}</span>
                          </div>
                          <div className="col-span-2">
                            <p className="text-xs text-slate-500 uppercase font-bold mb-1">Alamat Lengkap</p>
                            <p className="text-navy dark:text-white font-medium bg-slate-50 p-3 rounded-lg border border-slate-100">
                              {selectedRegistrant.Alamat_Lengkap}
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Family & Academic */}
                      <div>
                        <h3 className="text-primary font-bold uppercase tracking-widest text-sm mb-4 border-b border-slate-100 pb-2">Akademik & Keluarga</h3>
                        <div className="grid grid-cols-2 gap-6">
                          <div>
                            <p className="text-xs text-slate-500 uppercase font-bold mb-1">Asal Sekolah</p>
                            <p className="text-navy dark:text-white font-medium">{selectedRegistrant.Asal_Sekolah}</p>
                          </div>
                          <div>
                            <p className="text-xs text-slate-500 uppercase font-bold mb-1">Nama Ayah</p>
                            <p className="text-navy dark:text-white font-medium">{selectedRegistrant.Nama_Ayah}</p>
                          </div>
                          <div>
                            <p className="text-xs text-slate-500 uppercase font-bold mb-1">Nama Ibu</p>
                            <p className="text-navy dark:text-white font-medium">{selectedRegistrant.Nama_Ibu}</p>
                          </div>
                          <div>
                            <p className="text-xs text-slate-500 uppercase font-bold mb-1">No. WhatsApp</p>
                            <div className="flex items-center gap-2">
                              <span className="text-navy dark:text-white font-medium">{selectedRegistrant.No_HP}</span>
                              <a href={`https://wa.me/${String(selectedRegistrant.No_HP).replace(/^0/, '62').replace(/[^0-9]/g, '')}`} target="_blank" rel="noreferrer" className="text-green-600 hover:text-green-700">
                                <span className="material-symbols-outlined text-lg">chat</span>
                              </a>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Financial */}
                      <div>
                        <h3 className="text-primary font-bold uppercase tracking-widest text-sm mb-4 border-b border-slate-100 pb-2">Informasi Keuangan & Pembayaran</h3>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                            <p className="text-xs text-slate-500 uppercase font-bold mb-1">Kesanggupan SPP</p>
                            <p className="text-navy font-bold text-lg">{selectedRegistrant.Kesiapan_SPP || '-'}</p>
                          </div>
                          <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                            <p className="text-xs text-slate-500 uppercase font-bold mb-1">Pendapatan Orang Tua</p>
                            <p className="text-navy font-bold text-sm">{selectedRegistrant.Pendapatan_Orang_Tua || '-'}</p>
                          </div>
                          <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                            <p className="text-xs text-slate-500 uppercase font-bold mb-1">Pilihan Makan</p>
                            <p className="text-navy font-bold text-sm">{selectedRegistrant.Fasilitas_Makan || '-'}</p>
                          </div>
                          <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                            <p className="text-xs text-slate-500 uppercase font-bold mb-1">Pilihan Fasilitas</p>
                            <p className="text-navy font-bold text-sm">{selectedRegistrant.Pilihan_Fasilitas || '-'}</p>
                          </div>
                        </div>

                        {/* File SKM */}
                        {selectedRegistrant.File_SKM && (
                          <div className="mt-4 p-3 bg-yellow-50 border border-yellow-100 rounded-lg flex items-center justify-between">
                            <div>
                              <p className="text-xs font-bold text-slate-500 uppercase">Surat Keterangan Tidak Mampu (SKM)</p>
                              <p className="text-xs text-slate-400">Terlampir</p>
                            </div>
                            <a href={selectedRegistrant.File_SKM} target="_blank" rel="noreferrer" className="text-sm font-bold text-blue-600 hover:underline flex items-center gap-1">
                              <span className="material-symbols-outlined text-sm">attach_file</span>
                              Lihat File
                            </a>
                          </div>
                        )}

                        <div className="mt-6">
                          <p className="text-xs text-slate-500 uppercase font-bold mb-2">Bukti Transfer / Pembayaran</p>
                          <div className="border border-slate-200 rounded-xl p-2 bg-slate-50">
                            {!imgError['bukti_bayar'] && selectedRegistrant.File_Bukti_Bayar ? (
                              <div className="relative group">
                                <img
                                  src={getSafeImageUrl(selectedRegistrant.File_Bukti_Bayar)}
                                  alt="Bukti Bayar"
                                  className="w-full h-auto max-h-64 object-contain rounded-lg"
                                  referrerPolicy="no-referrer"
                                  onError={(e) => {
                                    console.warn("Failed to load proof:", selectedRegistrant.File_Bukti_Bayar);
                                    setImgError(prev => ({ ...prev, 'bukti_bayar': true }))
                                  }}
                                />
                                <a href={selectedRegistrant.File_Bukti_Bayar} target="_blank" rel="noreferrer" className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity rounded-lg">
                                  <span className="text-white font-bold flex items-center gap-2">
                                    <span className="material-symbols-outlined">open_in_new</span>
                                    Buka Gambar Asli
                                  </span>
                                </a>
                              </div>
                            ) : (
                              selectedRegistrant.File_Bukti_Bayar ? (
                                <div className="p-4 text-center bg-slate-50 border border-slate-100 rounded-lg flex flex-col items-center">
                                  <p className="text-sm font-bold text-slate-600 mb-2">Preview tidak tersedia</p>
                                  <a href={selectedRegistrant.File_Bukti_Bayar} target="_blank" rel="noreferrer" className="px-4 py-2 bg-primary text-navy font-bold rounded-lg text-sm flex items-center gap-2 hover:bg-primary-dark">
                                    <span className="material-symbols-outlined text-sm">open_in_new</span>
                                    Buka Bukti Bayar (Drive)
                                  </a>
                                </div>
                              ) : (
                                <div className="p-8 text-center bg-red-50 border border-red-100 rounded-lg text-red-500 flex flex-col items-center">
                                  <span className="material-symbols-outlined text-3xl mb-2">warning</span>
                                  <p className="font-bold">Belum ada bukti pembayaran yang diupload.</p>
                                </div>
                              )
                            )}
                          </div>
                        </div>
                      </div>

                    </div>
                  </div>
                </div>

                {/* Actions Footer */}
                <div className="p-6 border-t border-slate-200 bg-slate-50 flex justify-end gap-3">
                  <button
                    onClick={() => setShowDetailModal(false)}
                    className="px-6 py-3 rounded-xl font-bold text-slate-600 hover:bg-slate-200 transition-colors"
                  >
                    Tutup
                  </button>
                  <button
                    onClick={handlePrint}
                    className="px-8 py-3 rounded-xl bg-primary text-navy font-bold hover:bg-primary-dark shadow-lg flex items-center gap-2"
                  >
                    <span className="material-symbols-outlined">download</span>
                    Unduh Dokumen (PDF)
                  </button>
                </div>

              </div>
            </div>
          )}
        </div>

        {/* 
          =============================================
          WEB PRINT LAYOUT (A4 FORMAL)
          Only visible when printing
          =============================================
      */}
        {selectedRegistrant && (
          <div className="print-only hidden font-serif text-black p-8 max-w-[21cm] mx-auto">

            {/* KOP SURAT */}
            <div className="border-b-4 border-black pb-4 mb-6 flex items-center gap-4">
              <div className="flex-1 text-center">
                <h1 className="text-xl font-bold uppercase tracking-wide mb-1">Panitia Penerimaan Santri Baru</h1>
                <h2 className="text-3xl font-extrabold uppercase mb-1">Pondok Pesantren Nurul Huda Malati</h2>
                <p className="text-sm font-medium">Jl. Pasirwangi, Kel. Padaasih, Kec. Pasirwangi, Garut, Jawa Barat 44151, Indonesia</p>
              </div>
            </div>

            {/* JUDUL */}
            <div className="text-center mb-8 relative">
              <span className="inline-block border-2 border-black px-8 py-2 text-xl font-bold bg-gray-100 uppercase">
                Formulir Pendaftaran
              </span>
              <p className="mt-2 font-bold font-mono">
                Nomor Registrasi: {new Date(selectedRegistrant.Tanggal_Pendaftaran).getFullYear()}
                {String(new Date(selectedRegistrant.Tanggal_Pendaftaran).getMonth() + 1).padStart(2, '0')}
                -
                {String(selectedRegistrant.NISN || '').slice(-4)}
              </p>
            </div>

            {/* INTI DATA */}
            <div className="mb-8">

              {/* Bagian A & B */}
              <div className="space-y-6">
                {/* A. Data Santri */}
                <div>
                  <h3 className="font-bold border-b border-black mb-2 uppercase text-sm">A. Data Calon Santri</h3>
                  <table className="w-full text-sm">
                    <tbody>
                      <tr className="border-b border-dotted border-gray-400"><td className="py-1 w-40">Nama Lengkap</td><td className="font-bold">: {selectedRegistrant.Nama_Santri_Baru}</td></tr>
                      <tr className="border-b border-dotted border-gray-400"><td className="py-1">NISN</td><td>: {selectedRegistrant.NISN}</td></tr>
                      <tr className="border-b border-dotted border-gray-400"><td className="py-1">Tempat, Tanggal Lahir</td><td>: {selectedRegistrant.Tempat_Lahir}, {formatDateIndo(selectedRegistrant.Tanggal_Lahir, false)}</td></tr>
                      <tr className="border-b border-dotted border-gray-400"><td className="py-1">Jenis Kelamin</td><td>: {selectedRegistrant.Jenis_Kelamin}</td></tr>
                      <tr className="border-b border-dotted border-gray-400"><td className="py-1">Anak Yatim</td><td>: {selectedRegistrant.Anak_Yatim}</td></tr>
                      <tr className="border-b border-dotted border-gray-400"><td className="py-1">Saudara di Pondok</td><td>: {selectedRegistrant.Saudara_Kandung}</td></tr>
                      <tr className="border-b border-dotted border-gray-400"><td className="py-1">Asal Sekolah</td><td>: {selectedRegistrant.Asal_Sekolah}</td></tr>
                      <tr className="border-b border-dotted border-gray-400"><td className="py-1">Alamat</td><td>: {selectedRegistrant.Alamat_Lengkap}</td></tr>
                    </tbody>
                  </table>
                </div>

                {/* B. Data Orang Tua */}
                <div>
                  <h3 className="font-bold border-b border-black mb-2 uppercase text-sm">B. Data Orang Tua / Wali</h3>
                  <table className="w-full text-sm">
                    <tbody>
                      <tr className="border-b border-dotted border-gray-400"><td className="py-1 w-40">Nama Ayah</td><td className="font-bold">: {selectedRegistrant.Nama_Ayah}</td></tr>
                      <tr className="border-b border-dotted border-gray-400"><td className="py-1">Nama Ibu</td><td>: {selectedRegistrant.Nama_Ibu}</td></tr>
                      <tr className="border-b border-dotted border-gray-400"><td className="py-1">No. Handphone</td><td>: {selectedRegistrant.No_HP}</td></tr>
                      <tr className="border-b border-dotted border-gray-400"><td className="py-1">Pendapatan Bulanan</td><td>: {selectedRegistrant.Pendapatan_Orang_Tua}</td></tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* Bagian C: Program */}
            <div className="mb-8">
              <h3 className="font-bold border-b border-black mb-2 uppercase text-sm">C. Program & Administrasi</h3>
              <table className="w-full text-sm border-collapse border border-black">
                <tbody>
                  <tr>
                    <td className="border border-black p-2 bg-gray-100 font-bold w-1/3">Jenjang Pilihan</td>
                    <td className="border border-black p-2 font-bold">{selectedRegistrant.Masuk_Ke_Jenjang}</td>
                  </tr>
                  <tr>
                    <td className="border border-black p-2 bg-gray-100">Kesanggupan SPP</td>
                    <td className="border border-black p-2">{selectedRegistrant.Kesiapan_SPP}</td>
                  </tr>
                  <tr>
                    <td className="border border-black p-2 bg-gray-100">Pilihan Makan</td>
                    <td className="border border-black p-2">{selectedRegistrant.Fasilitas_Makan || '-'}</td>
                  </tr>
                  <tr>
                    <td className="border border-black p-2 bg-gray-100">Pilihan Fasilitas</td>
                    <td className="border border-black p-2">{selectedRegistrant.Pilihan_Fasilitas || '-'}</td>
                  </tr>

                  <tr>
                    <td className="border border-black p-2 bg-gray-100 font-bold">Ukuran Seragam</td>
                    <td className="border border-black p-2">{selectedRegistrant.Ukuran_Seragam}</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Bagian Tanda Tangan */}
            <div className="mt-12 flex justify-between text-sm px-8">
              <div className="text-center">
                <p className="mb-20">Mengetahui,<br />Orang Tua / Wali Santri</p>
                <p className="font-bold underline">({selectedRegistrant.Nama_Ayah})</p>
              </div>
              <div className="text-center">
                <p className="mb-20">Garut, {new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}<br />Panitia PPDB,</p>
                <p className="font-bold underline">( _______________________ )</p>
              </div>
            </div>

            <div className="mt-8 text-[10px] text-gray-500 text-center italic border-t pt-2">
              *Dokumen ini dicetak otomatis dari Sistem Informasi PPDB PPNH Malati pada {new Date().toLocaleString('id-ID')}
            </div>
          </div>
        )}

      </div >
    </>
  );
};

export default AdminDashboard;
