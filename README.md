# Pondok Pesantren Nurul Huda Malati

Website profil resmi untuk Pondok Pesantren Nurul Huda Malati. Website ini dirancang untuk memberikan informasi lengkap mengenai profil pondok, program pendidikan, fasilitas, galeri kegiatan, serta informasi pendaftaran bagi calon santri baru.

## 📋 Fitur Utama

Website ini mencakup beberapa bagian utama:

*   **Halaman Utama (Hero)**: Tampilan awal yang menarik dengan informasi singkat dan navigasi utama.
*   **Tentang Kami (About)**: Sejarah, visi, dan misi Pondok Pesantren Nurul Huda Malati.
*   **Program Pendidikan (Programs)**: Informasi mengenai jenjang pendidikan dan program unggulan yang tersedia.
*   **Fasilitas (Facilities)**: Galeri dan deskripsi fasilitas penunjang belajar mengajar.
*   **Galeri (Gallery & Video)**: Dokumentasi kegiatan santri dalam bentuk foto dan video.
*   **Info Pendaftaran (Admissions)**: Informasi lengkap mengenai syarat dan alur pendaftaran santri baru (PSB).
*   **Kontak (Contact)**: Formulir untuk mengirim pesan langsung dan informasi kontak (WhatsApp, Email, Lokasi).

## 🛠️ Teknologi yang Digunakan

Proyek ini dibangun menggunakan teknologi web modern:

*   **[React](https://react.dev/)**: Library JavaScript untuk membangun antarmuka pengguna.
*   **[Vite](https://vitejs.dev/)**: Build tool yang cepat untuk pengembangan frontend modern.
*   **[Tailwind CSS](https://tailwindcss.com/)**: Framework CSS utility-first untuk styling yang cepat dan responsif.
*   **[TypeScript](https://www.typescriptlang.org/)**: Superset JavaScript dengan tipe data statis untuk kode yang lebih aman.
*   **[EmailJS](https://www.emailjs.com/)**: Layanan untuk mengirim email langsung dari client-side (digunakan pada formulir kontak).

## 🚀 Cara Menjalankan Proyek

Ikuti langkah-langkah berikut untuk menjalankan proyek ini di komputer lokal Anda:

### Prasyarat

Pastikan Anda telah menginstal **Node.js** di komputer Anda.

### Instalasi

1.  **Clone repositori ini** (jika menggunakan git) atau ekstrak file zip proyek.
2.  **Buka terminal** dan arahkan ke direktori proyek.
3.  **Instal dependensi** dengan menjalankan perintah:

    ```bash
    npm install
    ```

### Menjalankan Server Development

Untuk menjalankan website dalam mode pengembangan (development):

```bash
npm run dev
```

Buka browser dan kunjungi alamat yang muncul di terminal (biasanya `http://localhost:5173`).

### Build untuk Produksi

Untuk membuat versi produksi yang siap di-deploy:

```bash
npm run build
```

Hasil build akan berada di folder `dist`.

## 📂 Struktur Folder

Berikut adalah gambaran singkat struktur folder proyek:

```
pondok-pesantren-nurul-huda-malati/
├── components/         # Komponen-komponen React (Header, Hero, About, dll)
├── public/             # Aset statis (gambar, ikon, dll)
├── src/                # Source code tambahan (jika ada)
├── App.tsx             # Komponen utama aplikasi
├── index.css           # File CSS global (termasuk direktif Tailwind)
├── index.html          # File HTML utama
├── index.tsx           # Entry point aplikasi React
├── package.json        # Daftar dependensi dan skrip proyek
├── tailwind.config.js  # Konfigurasi Tailwind CSS
├── tsconfig.json       # Konfigurasi TypeScript
└── vite.config.ts      # Konfigurasi Vite
```

## 📝 Catatan Tambahan

*   **Formulir Kontak**: Formulir kontak menggunakan EmailJS. Konfigurasi ID layanan dan template saat ini tertanam di `components/Contact.tsx`.
*   **Peta Lokasi**: Peta lokasi menggunakan iframe Google Maps yang tertanam di `components/Contact.tsx`.

---

Dibuat dengan ❤️ untuk Pondok Pesantren Nurul Huda Malati.
