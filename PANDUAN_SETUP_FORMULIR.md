# Panduan Setup Formulir Pendaftaran (Support Upload Foto & Logic Baru)

Karena formulir baru membutuhkan fitur **Upload Foto/File** (Foto Santri, SKM, Bukti Bayar) dan kolom data yang lebih banyak, kita perlu menggunakan Script yang lebih canggih (mendukung Base64 Upload).

## Langkah 1: Siapkan Spreadsheet
Buat/Edit Google Spreadsheet dengan Header Kolom di Baris 1 sebagai berikut (urutannya bebas, tapi nama harus sesuai agar mudah dikenali):

| No | Nama Kolom (Header) | Keterangan |
| :--- | :--- | :--- |
| 1 | **Timestamp** | Otomatis |
| 2 | **Tanggal Pendaftaran** | Diisi User |
| 3 | **Asal Sekolah** | |
| 4 | **Masuk Ke Jenjang** | |
| 5 | **Nama Santri Baru** | |
| 6 | **Nama Ayah** | |
| 7 | **Tempat Lahir** | |
| 8 | **Tanggal Lahir** | |
| 8 | **Nama Ibu** | |
| 9 | **Jenis Kelamin** | |
| 10 | **Alamat E-mail** | |
| 11 | **Saudara Kandung di Pondok** | |
| 12 | **Anak Yatim** | |
| 13 | **Ukuran Seragam** | |
| 14 | **No Telp WA** | |
| 15 | **NISN** | |
| 16 | **Alamat Lengkap** | |
| 17 | **Pendapatan Orang Tua** | Hanya jika Mondok |
| 18 | **Kesiapan SPP** | Hanya jika Mondok |
| 19 | **Fasilitas Makan** | Hanya jika Mondok |
| 20 | **Link Foto Santri** | Link file di Drive |
| 21 | **Link SKM** | Link file di Drive |
| 22 | **Link Bukti Pembayaran** | Link file di Drive |

## Langkah 2: Update "Apps Script"

1. Di Spreadsheet, buka **Extensions** > **Apps Script**.
2. Hapus semua kode lama, ganti dengan kode di bawah ini:

```javascript
// Konfigurasi Folder ID Google Drive untuk menyimpan file upload
// Buka Folder Drive tujuan -> Lihat URL: drive.google.com/drive/u/0/folders/XXXXX
// Copy XXXXX tersebut ke bawah ini.
const FOLDER_ID = "GANTI_DENGAN_ID_FOLDER_DRIVE_ANDA"; 

function doPost(e) {
  var lock = LockService.getScriptLock();
  lock.tryLock(10000);

  try {
    var doc = SpreadsheetApp.getActiveSpreadsheet();
    var sheet = doc.getActiveSheet();
    
    // Parsing data JSON dari React
    var data = JSON.parse(e.postData.contents);

    // Helper function upload file ke Drive
    function uploadFile(dataUrl, namePrefix) {
      if (!dataUrl || dataUrl === "") return "";
      
      var blob = Utilities.newBlob(Utilities.base64Decode(dataUrl.split(',')[1]), 
                                   dataUrl.split(';')[0].split(':')[1], 
                                   namePrefix + "_" + new Date().getTime());
      
      var folder = DriveApp.getFolderById(FOLDER_ID);
      var file = folder.createFile(blob);
      file.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW);
      return file.getUrl();
    }

    // Upload Files jika ada
    var fotoUrl = uploadFile(data.Foto_Santri, "FOTO_" + data.Nama_Santri_Baru);
    var skmUrl = uploadFile(data.File_SKM, "SKM_" + data.Nama_Santri_Baru);
    var buktiUrl = uploadFile(data.File_Bukti_Bayar, "BUKTI_" + data.Nama_Santri_Baru);

    // Siapkan Row Baru
    var nextRow = sheet.getLastRow() + 1;
    var newRow = [];

    // Mapping manual agar urutan sesuai kolom di Spreadsheet
    // Pastikan urutan push() di bawah ini SESUAI dengan urutan kolom A, B, C... di sheet Anda.
    newRow.push(new Date()); // Timestamp
    newRow.push(data.Tanggal_Pendaftaran);
    newRow.push(data.Asal_Sekolah);
    newRow.push(data.Masuk_Ke_Jenjang);
    newRow.push(data.Nama_Santri_Baru);
    newRow.push(data.Nama_Ayah);
    newRow.push(data.Tempat_Lahir);
    newRow.push(data.Tanggal_Lahir);
    newRow.push(data.Nama_Ibu);
    newRow.push(data.Jenis_Kelamin);
    newRow.push(data.Email);
    newRow.push(data.Saudara_Kandung);
    newRow.push(data.Anak_Yatim);
    newRow.push(data.Ukuran_Seragam);
    newRow.push(data.No_HP);
    newRow.push(data.NISN);
    newRow.push(data.Alamat_Lengkap);
    
    // Data Pondok (Mungkin kosong jika Non-Mondok)
    newRow.push(data.Pendapatan_Orang_Tua || "-");
    newRow.push(data.Kesiapan_SPP || "-");
    newRow.push(data.Fasilitas_Makan || "-");
    
    // Link File
    newRow.push(fotoUrl);
    newRow.push(skmUrl);
    newRow.push(buktiUrl);

    // Simpan ke Sheet
    sheet.getRange(nextRow, 1, 1, newRow.length).setValues([newRow]);

    return ContentService
      .createTextOutput(JSON.stringify({ 'result': 'success', 'row': nextRow }))
      .setMimeType(ContentService.MimeType.JSON);
  }

  catch (e) {
    return ContentService
      .createTextOutput(JSON.stringify({ 'result': 'error', 'error': e.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }

  finally {
    lock.releaseLock();
  }
}
```

3. Ganti `GANTI_DENGAN_ID_FOLDER_DRIVE_ANDA` dengan ID folder Google Drive tempat menyimpan foto.
4. **Deploy** ulang sebagai **Web App** (pilih *New Deployment* agar perubahan terbaca).
   - Who has access: **Anyone**.
5. Salin URL Web App yang baru ke kode `RegistrationForm.tsx`.
