# Panduan Setup Dashboard Admin

Untuk membuat halaman Admin bisa menampilkan data pendaftar, Anda perlu menambahkan kode sedikit pada **Google Apps Script** Anda.

## 1. Buka Google Apps Script
1. Buka spreadsheet pendaftaran Anda.
2. Klik **Extensions** > **Apps Script**.

## 2. Update Kode `doGet`
Cari fungsi `doGet(e)` di file `Code.gs`. Jika sudah ada, tambahkan kondisi `if` baru. Jika belum ada, copy seluruh kode di bawah ini.

```javascript
function doGet(e) {
  var param = e.parameter.action;

  // Endpoint untuk mengambil Data Pendaftar
  if (param == 'get_registrants') {
    return getRegistrants();
  }

  // Endpoint lain (misalnya untuk wishes/doa - jika ada di file yang sama)
  // return ContentService.createTextOutput("Action not found");
}

function getRegistrants() {
  // GANTI "Sheet1" SESUAI NAMA TAB SHEET ANDA
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Sheet1"); 
  
  // Ambil semua data
  var data = sheet.getDataRange().getValues();
  
  // Baris pertama adalah Header
  var headers = data[0];
  var requests = [];

  // Loop data dari baris kedua sampai akhir
  for (var i = 1; i < data.length; i++) {
    var row = data[i];
    var obj = {};
    for (var j = 0; j < headers.length; j++) {
      obj[headers[j]] = row[j];
    }
    requests.push(obj);
  }

  var result = {
    status: 'success',
    total: requests.length,
    data: requests
  };

  return ContentService.createTextOutput(JSON.stringify(result))
    .setMimeType(ContentService.MimeType.JSON);
}
```

## 3. Deploy Ulang (PENTING!)
Setiap kali mengubah kode Apps Script, Anda **WAJIB** melakukan Deploy ulang agar perubahan efektif.

1. Klik tombol **Deploy** (biru) di pojok kanan atas > **Manage deployments**.
2. Klik icon **Edit** (pensil) pada deployment yang aktif.
3. Pada bagian **Version**, pilih **New version**.
4. Klik **Deploy**.
5. Selesai! Halaman Admin di website sekarang bisa membaca data.
