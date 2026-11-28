# GAELLVERSE · Tech Design untuk prototipe pertama

**Status:** rancangan teknis untuk ditinjau, 28 November 2026. Pemilik proyek menyetujui adegan pertama dan urutan pengerjaan. Pilihan engine, angka penyetelan, dan penampilan karakter masih berupa usulan.

**Tujuan pemain:** saat membuka halaman rumah, pemain dapat melihat Groot, berjalan menghampirinya sebagai Gaellry, lalu membuat Groot menoleh dengan satu tindakan. Acuan produk ada di [PRD bagian 3–5](PRD-GAELLVERSE.md). Lingkup dokumen ini adalah satu adegan uji dengan data contoh. Login, slot, dan sinkronisasi akun memiliki tahap staging tersendiri di PRD.

## Pilihan teknis yang diajukan

| Bagian | Usulan dan alasan |
|---|---|
| Dunia | Three.js dengan TypeScript. Satu scene 3D cukup untuk mengatur kamera, gerak, batas jalan, dan reaksi satu anjing secara langsung. Engine dengan sistem fisika penuh menambah pekerjaan untuk interaksi sesederhana ini. |
| Distribusi | Vite untuk preview lokal dan build statis. Hasil build dapat disalin ke hosting statis. Simpan dependensi terkunci dan aset contoh bersama proyek agar preview dapat diulang. |
| Antarmuka | Tombol HTML di atas kanvas untuk tujuan, joystick dan aksi. Label tetap tajam saat resolusi render diturunkan pada HP. |
| Data | Posisi awal, batas jalan dan radius sapa berada di konfigurasi adegan. Status sesi cukup di memori untuk mengulang uji dari awal dengan memuat ulang halaman. |

## Apa yang terlihat dan terasa

Mulai langsung di jalan setapak dengan tujuan pendek **“Hampiri Groot”**. Gaellry berada di depan rumah dan Groot terlihat beberapa langkah di depannya, di luar jangkauan sapa. Pintu, pagar pendek, camellia dan rumpun putih baby’s breath membantu pemain membaca jarak. Gunakan model contoh bergaya ilustrasi dengan arah wajah dan kaki yang terlihat. Penilaian rupa final Gaellry dan Groot menunggu referensi yang disetujui pemilik.

Gunakan kamera ortografis atas-miring dengan arah tetap. Bingkai awal harus memuat kedua karakter pada layar potret. Saat Gaellry bergerak, kamera mengikuti perlahan dengan batas di tepi halaman. Tempatkan rumah dan vegetasi di luar garis pandang sepanjang lintasan uji. Susun ulang HUD pada layar lebar dan ketika orientasi berubah. Tujuan berada di atas, joystick di kiri bawah, dan tombol sapa di kanan bawah dengan ruang bagi ibu jari.

## Gerak dan sapaan

1. Ubah input joystick, WASD, atau panah menjadi arah pada bidang tanah relatif terhadap layar. Normalkan gerak diagonal dan hitung jarak per detik agar kecepatan konsisten. Batas rumah, petak tanam, dan pagar dapat memakai bentuk tumbukan sederhana.
2. Saat sentuhan dilepas, dibatalkan, atau jendela kehilangan fokus, kosongkan input. Pemain harus bisa berhenti tepat di depan Groot.
3. Ukur jarak di bidang tanah. Nilai awal untuk uji adalah radius masuk 1,4 meter dan radius keluar 1,7 meter agar tombol stabil di tepi jangkauan. Gunakan jalur terbuka yang dapat dilalui. Pagar yang memisahkan karakter harus menghalangi sapaan.
4. Ketika Groot dapat disapa, sorot halus sasarannya. Tampilkan **“Sapa Groot”** pada HP dan **“E · Sapa Groot”** di desktop. Sentuhan, klik, dan tombol E memicu tindakan yang sama.
5. Saat disapa, Groot memutar kepala ke arah Gaellry dan memberi satu respons singkat. Tujuan menunjukkan sapaan selesai. Abaikan input berulang selama animasi aktif. Setelah itu sapaan dapat diulang, dan tombol menghilang ketika Gaellry menjauh.

## Menjalankan preview setelah implementasi

Usulan lokasi kode adalah `game/` agar perintah game terpisah dari alat workflow di repo. Dari folder itu, jalankan `npm ci`, lalu `npm run dev` dan buka alamat lokal yang ditampilkan. Untuk uji HP, jalankan `npm run dev -- --host 0.0.0.0` pada jaringan lokal tepercaya dan buka alamat jaringan yang ditampilkan dari HP pada Wi-Fi yang sama. Periksa hasil distribusi melalui `npm run build` dan `npm run preview`. Perintah ini adalah spesifikasi bagi implementasi yang akan dibuat.

## Pemeriksaan penerimaan

| Kondisi uji | Hasil yang dapat diamati |
|---|---|
| Buka pada HP potret tanpa petunjuk lisan | Gaellry dan Groot terlihat sejak awal. Pemain memahami tujuan dan dapat berjalan menghampiri Groot. |
| Dekati, sapa, mundur, lalu dekati lagi | Tombol muncul pada jarak yang wajar, satu sapaan membuat Groot menoleh, dan tombol menghilang saat menjauh. |
| Tahan arah ke pagar lalu lepaskan joystick atau pindah tab | Gaellry berhenti di batas yang tepat. Saat kembali ia diam hingga input berikutnya. |
| Ulangi pada laptop | WASD atau panah dan E menyelesaikan pengalaman yang sama. Klik tombol juga bekerja. |
| Ubah orientasi atau ukuran jendela | Kontrol tetap dapat dijangkau. Tujuan dan tombol tidak menutup kedua karakter. |
| Coba pada HP acuan | Catat perangkat, waktu muat, dan frame rate saat berjalan. Sasaran awal dari PRD adalah 30 fps stabil. Perangkat uji dan hasil aktual dicatat saat preview tersedia. |

**Bahan tinjauan pertama** adalah preview yang bisa dimainkan serta cuplikan dari kamera gameplay di HP. Pemilik proyek menilai sudut kamera, proporsi karakter, suasana halaman, dan kenyamanan sapaan sebelum adegan berkembang ke pencarian kunci.
