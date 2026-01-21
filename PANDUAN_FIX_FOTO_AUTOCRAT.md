# Panduan: Agar Foto Muncul di Formulir (Autocrat)

Masalah yang Anda alami (foto muncul sebagai link teks panjang) terjadi karena **Autocrat** secara default membaca data spreadsheet sebagai **Teks (Standard)**.

Untuk memunculkan gambar foto di formulir (PDF/Docs), Anda perlu mengubah setting di Autocrat dan memastikan format link dari Google Apps Script benar.

## 1. Ubah Setting type di Autocrat (WAJIB)
Ini adalah langkah paling penting.

1. Buka **Google Sheets** data pendaftaran Anda.
2. Klik menu **Extensions** > **Autocrat** > **Open**.
3. Klik tombol **Edit** (icon pensil) pada Job yang berjalan.
4. Klik **Next** sampai Anda berada di langkah **"Map Source Data to Template"**.
5. Cari Tag yang sesuai dengan kolom foto (misalnya `<<Foto_Santri>>` atau nama kolom di sheet Anda).
6. Lihat di sebelah kanan Tag tersebut, ada kolom **Type**.
   - **ubah setting dari "Standard" menjadi "Image"**.
7. Setelah diubah ke **Image**, Anda bisa mengaturnya:
   - **Width/Height**: Masukkan ukuran (contoh: `150` px) agar foto tidak terlalu besar di formulir. Cukup isi salah satu (width atau height) agar proporsional.
8. Klik **Save**.

## 2. Perbaiki Format Link di Google Apps Script (Opsional)
Jika setelah langkah 1 foto masih "pecah" atau kosong, itu karena format link yang dikirim dari Script tidak disukai Autocrat.

Autocrat lebih suka link format "Download/View ID" daripada link "Preview Drive".

**Cek Code Google Apps Script (`code.gs`) Anda:**

Pastikan saat menyimpan file, Anda mengembalikan link dengan format `https://drive.google.com/uc?export=view&id=FILE_ID`.

**Contoh Code yang Benar:**

```javascript
function uploadToDrive(base64Data, folderId, fileName) {
  try {
    var split = base64Data.split('base64,');
    var type = split[0].split(':')[1].split(';')[0];
    var byteCharacters = Utilities.base64Decode(split[1]);
    var blob = Utilities.newBlob(byteCharacters, type, fileName);
    
    var folder = DriveApp.getFolderById(folderId);
    var file = folder.createFile(blob);
    
    // Set permission agar bisa dibaca Autocrat (Penting!)
    file.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW);
    
    // RETURN FORMAT YANG BENAR UNTUK AUTOCRAT
    // Jangan gunakan file.getUrl() karena itu format "view" biasa.
    // Gunakan format uc?export=view&id=...
    return "https://drive.google.com/uc?export=view&id=" + file.getId();
    
  } catch(e) {
    return e.toString();
  }
}
```

Jika Anda menggunakan `file.getUrl()`, linknya akan seperti `https://drive.google.com/file/d/xxx/view...` yang terkadang gagal di-render sebagai gambar oleh Autocrat.

## 3. Posisi di Template Docs
Pastikan di file Template (Google Docs/Slides), posisi tag `<<Foto_Santri>>` berada di dalam kotak atau tempat yang cukup luas agar gambar bisa masuk dengan rapi. Note: Jangan taruh di dalam "Image Placeholder" bawaan Docs, cukup tulis teks tag-nya saja di posisi yang diinginkan.
