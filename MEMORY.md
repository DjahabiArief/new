# GAELLVERSE

## Status adegan halaman rumah — 28 November 2026

Pemilik memilih PowerShell dan Docker Desktop untuk menjalankan proyek. Adegan yang disetujui untuk uji pertama adalah Gaellry berjalan di halaman rumah dan menyapa Groot. PRD menjadi acuan produk dan Tech Design menjadi acuan implementasi.

Tinjauan visual memakai gambar *Gaellry and Groot’s Autumn Village Walk* sebagai acuan ciri yang terlihat saat bermain. Gaellry memakai mantel cokelat muda, syal merah anggur, rok kotak dan tas selempang, dengan rambut panjang pirang keperakan. Groot berbulu keemasan dengan telinga jatuh, kalung dan ekor lebat. Model 3D bergaya yang sekarang menunggu penilaian pemilik terhadap kemiripannya. Halaman menampilkan cottage berbingkai kayu, jalan batu, pagar, pepohonan musim gugur, camellia dan baby’s breath.

Di desktop, WASD atau panah menggerakkan Gaellry. E atau klik memicu sapaan. Di layar sentuh tersedia joystick dan tombol kontekstual. Penanda mengikuti posisi Groot dan berubah saat Gaellry berada dalam jangkauan. Setelah animasi menoleh, pemain dapat mengulangi sapaan. Status uji adegan masih bersifat sementara per sesi.

**Verifikasi.** Build produksi Vite berhasil. Chromium menjalankan build di desktop 1260 × 760 dan emulasi sentuh 393 × 852. Pemeriksaan meliputi kontrol sesuai perangkat, mendekati Groot, sapaan melalui E dan sentuhan, mengulang lewat tombol, dan tombol menghilang saat menjauh. Cuplikan permainan tersedia untuk [desktop](docs/preview/prolog-desktop.webp) dan [aksi di HP potret](docs/preview/prolog-sapa.webp).

**Langkah berikutnya.** Nilai rupa karakter dan kenyamanan kontrol dari gameplay di Windows melalui PowerShell dan Docker Desktop, lalu ukur performa pada HP fisik. Persetujuan visual dari pemilik dan hasil uji kedua perangkat belum tercatat.
