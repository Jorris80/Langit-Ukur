# LangitUkur — Drone Survey Enterprise (PWA)

Front-end Progressive Web App untuk **LangitUkur**, sistem manajemen proyek survei foto udara: perencanaan, RAB, time schedule & kurva-S, perizinan & compliance gate, flight planning, survei lapangan **offline**, GCP/CP, katalog foto (EXIF + SHA-256), job fotogrametri, QC akurasi (RMSE), laporan harian–final, serah terima, dan asisten AI berbasis data.

Back-end berjalan di **Google Apps Script + Google Sheets** milik Anda. Repositori ini hanya berisi tampilan (5 file).

| File | Fungsi |
|---|---|
| `index.html` | Seluruh aplikasi (HTML + CSS + JS dalam satu file) |
| `manifest.json` | Manifest PWA (nama, ikon, warna, mode standalone) |
| `sw.js` | Service worker: cache aplikasi, pustaka peta, dan tile peta untuk mode offline |
| `icon.png` | Ikon aplikasi 512×512 |
| `README.md` | Panduan ini |

## Cara pasang (±10 menit)

1. **Siapkan server Apps Script** dari paket `klien/apps-script` (lihat Panduan PDF): buat Google Sheet → Extensions → Apps Script → tempel semua file → jalankan `setupInitial` → **Deploy → New deployment → Web app** dengan *Execute as: Me* dan *Who has access: Anyone*. Salin URL berakhiran `/exec`.
2. **Buat repositori GitHub** (publik atau privat dengan GitHub Pages), unggah 5 file ini ke root.
3. Buka `index.html`, cari baris `window.LU_API_URL=''` dan tempel URL `/exec` (atau biarkan kosong dan isi dari layar login).
4. **Settings → Pages → Deploy from branch → main / root**. Tunggu ±1 menit, buka `https://<user>.github.io/<repo>/`.
5. Di HP: buka URL → menu browser → **Tambahkan ke layar utama / Install app**.

## Mode offline
- Aplikasi, pustaka peta, dan tile peta yang pernah dibuka tersimpan di perangkat.
- Data yang diinput saat offline (kegiatan lapangan, flight log, GCP/CP, checklist, dll.) disimpan di IndexedDB dengan ID unik, lalu **disinkronkan otomatis** saat online. Server menolak duplikat dan mendeteksi konflik versi; konflik diselesaikan di menu **Sinkronisasi**.
- Persetujuan, pembuatan laporan, dan job fotogrametri membutuhkan koneksi.

## Tombol Back
Tombol Back (Android/browser) menutup dialog atau kembali ke layar sebelumnya. Di layar utama, tekan Back dua kali dalam 2 detik untuk keluar.

## Pembaruan
Ganti `index.html` (dan file lain bila berubah) lalu commit. Service worker memakai versi cache baru otomatis; pengguna mendapat versi terbaru pada kunjungan berikutnya.

## Lisensi
Perangkat lunak berlisensi komersial — lihat Syarat & Ketentuan di dalam aplikasi. Komponen pihak ketiga: Leaflet (BSD-2-Clause), data peta © kontributor OpenStreetMap (ODbL), citra Esri World Imagery (ketentuan Esri), Open-Meteo (CC BY 4.0; API gratis hanya non-komersial), font Plus Jakarta Sans (SIL OFL 1.1).
