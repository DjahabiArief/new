# GAELLVERSE
## Product Requirements Document · Rancangan untuk ditinjau
**Versi 0.1 · 28 November 2026 · Bahasa Indonesia**

GAELLVERSE adalah dunia personal yang bisa Gaellry kunjungi kembali bersama Groot, anjing setianya. Dalam satu kunjungan ia bisa merawat kebun, bermain bersama seorang karakter, atau mengikuti petunjuk hingga menemukan kunci rumah. Dalam kunjungan lain, tempat yang sama menyimpan surat Natal, resolusi tahun baru, atau kejutan ulang tahun. Ukuran keberhasilannya adalah apakah pemain merasa mengenal tempat dan penghuninya, serta dapat meneruskan kisahnya dari perangkat lain.

**Dasar keputusan.** Nama dunia, protagonis, peran Groot, isi pokok chapter, kalender nyata, login wajib, permainan lintas perangkat, berkebun saat offline, tanaman yang dapat mati, replay, dan dukungan beberapa slot berasal dari pembicaraan dengan pemilik proyek. Rincian adegan, pemetaan tombol desktop, urutan produksi, dan target uji di bawah merupakan usulan desain untuk staging. PRD ini dapat digunakan untuk menyusun Technical Design setelah ruang lingkup staging disepakati.

## 1. Apa yang ditunjukkan video

Sumber utama adalah MP4 yang dilampirkan pada 28 November 2026. Durasinya 35,8 detik, dengan bingkai promosi vertikal 512 × 910 dan video 30 fps. Waktu di bawah dibulatkan. Teks yang melayang di luar layar ponsel merupakan keterangan promosi. Nama Gaellry dan Groot berasal dari proyek GAELLVERSE.

| Waktu | Yang terlihat dalam rekaman | Implikasi untuk GAELLVERSE |
|---|---|---|
| 00–05 detik | Layar judul “Taman Kecil.” dengan pilihan “Mulai”, disusul taman seperti miniatur dengan tepi tanah terlihat, jembatan, air, dan avatar kecil. | Gunakan rumah dan kebun sebagai pemandangan pembuka. Setelah login, tampilkan pilihan lanjut dengan ringkasan slot agar pemain tahu perjalanan mana yang akan dibuka. |
| 05–08 detik | Halaman rumah terlihat dari atas-miring. Satu tujuan singkat berada di atas. Kontrol arah bundar di kiri bawah dan tombol “A Interaksi” di kanan bawah. Percakapan dengan kakek membuka panel potret dan petunjuk lokasi. | Pertahankan ruang pandang ke tanah, jalan, dan pintu. Gunakan satu tindakan sesuai objek yang didekati. Dialog karakter penolong memberi petunjuk yang dapat dikenali di lingkungan. |
| 08–16 detik | Petunjuk menyebut gerai buah di seberang sungai, buah merah dan kain biru. Ada panel narasi, beberapa halaman harapan, lalu karakter kembali ke rumah dengan indikator kemajuan dan tujuan berikutnya. | Hubungkan petunjuk, benda, dan tempat tujuan. Simpan petunjuk serta kepemilikan kunci agar pemain yang berhenti di tengah pencarian dapat meneruskan langkah yang tepat. |
| 16–24 detik | Interaksi di dalam rumah berlanjut ke kue dan tiup lilin, surat pada tampilan laptop, pemutar musik, serta foto. | Pertahankan irama penemuan personal ini. Untuk Gaellry, tempatkan rangkaian ulang tahun di Chapter III, sehingga prolog tetap memiliki tujuan sendiri. |
| 24–31 detik | Permainan balok memiliki layar hasil. Photobooth menawarkan avatar atau kamera sendiri. | Mini game dapat dibuka dari benda atau karakter di dalam dunia. Satu putaran punya awal, akhir, dan jalan kembali. Arcade, kamera pribadi, dan photobooth merupakan pilihan konten yang masih bisa ditinjau. |
| 31–35,8 detik | Montase HP, tablet, dan laptop memperlihatkan dunia yang sama. Penutup merangkum pengalaman berjalan, mencari kunci, dan bertemu seseorang. | Rancang tata letak lintas layar dan uji perpindahan perangkat dengan akun yang sama. Montase sendiri belum membuktikan sinkronisasi save. |

Rekaman memperlihatkan **hasil interaksi**. Jenis engine, aturan kamera saat pemain bergerak panjang, tombol keyboard, penggunaan mikrofon untuk lilin, serta cara permainan menyimpan data tidak dapat dipastikan dari klip. Spesifikasi berikut menjelaskan perilaku yang diinginkan untuk GAELLVERSE.

## 2. Pengalaman yang dituju

**Pemain utama** menjalani cerita sebagai Gaellry. Groot hadir sebagai anjing yang dapat dikenali dari bentuk, gerak, ukuran, dan reaksinya di setiap adegan. Karakter kunci membawa cerita maju. Karakter penolong diperkenalkan melalui tindakan, misalnya penduduk yang sedang merawat tanaman dan bisa menunjukkan jalan. Nama, rupa, jumlah, dan hubungan personal mereka menunggu arahan pemilik proyek.

**Kunjungan pertama** dimulai dengan login, membuat atau memilih slot, lalu prolog singkat tentang tempat ini dan alasan keberadaannya. Naskah latar belakang serta pesan pribadi akan ditentukan pemilik proyek. Setelah pengantar, pemain segera mengendalikan Gaellry. **Kunjungan berikutnya** membuka slot pada lokasi aman terakhir, memperlihatkan tujuan aktif, lalu memberi pemain kebebasan untuk kembali ke cerita, kebun, atau aktivitas sampingan.

**Rujukan pengalaman.** Video menentukan arah tampilan saat bermain, susunan kontrol, dan ritme penemuan. Harvest Moon dan Stardew Valley memberi acuan untuk rutinitas kebun serta rasa akrab dengan desa. Love and Deepspace memberi acuan untuk interaksi personal dan momen bersama karakter. Cerita, aktivitas, dialog, musik, antarmuka, dan aset spesifik GAELLVERSE dikembangkan untuk Gaellry.

## 3. Grafik, kamera, dan keterbacaan

| Elemen | Arahan untuk prototipe | Cara menilai |
|---|---|---|
| Dunia 3D | Desa seperti miniatur yang dihuni. Rumah, jembatan, jalan setapak, pagar rendah dan petak tanam memiliki bentuk sederhana dengan tekstur bergaya ilustrasi. Gunakan warna musim gugur, hijau kebun, camellia, dan rumpun putih baby’s breath sebagai penanda tempat. | Pada ukuran HP, pemain dapat menunjuk pintu rumah, jalan ke kebun dan petak yang bisa dirawat dari gambar tanpa penanda misi. |
| Kamera eksplorasi | Kamera orang ketiga dari atas-miring, menampilkan tubuh Gaellry dan Groot serta beberapa langkah jalan di depan. Usulan awal berupa sudut stabil dengan pergeseran halus saat Gaellry mendekati tepi area. | Gaellry dapat menuju pintu dan mengitari petak tanpa mengatur kamera. Pohon atau atap yang menghalangi karakter menjadi transparan atau tersingkap. |
| Karakter dan animasi | Proporsi bergaya dengan siluet terbaca dari jauh. Perlihatkan arah hadap, mulai dan berhenti berjalan, menyiram, serta Groot menoleh atau mengendus. Potret dialog dapat memberi detail ekspresi lebih dekat. | Arah gerak, karakter yang mengajak bicara, dan target penyiraman terbaca dalam satu layar. Groot selalu berwujud anjing sesuai referensi penampilan yang kelak disetujui. |
| Layar bermain | Satu tujuan pendek di atas. Joystick dan tindakan di bawah. Panel dialog memakai kontras jelas dan nama pembicara. Jurnal menampung teks panjang, surat dan riwayat. | Teks tidak menutupi sasaran saat pemain harus mencari benda. Kontrol aman dari tepi layar dan dapat dijangkau dua ibu jari. |
| Momen chapter | Gunakan cahaya, properti dan kegiatan untuk mengubah tempat yang sudah dikenal. Contohnya, pohon Natal di area berkumpul dan langit malam yang menarik perhatian ke observatorium. | Pemain mengenali tempat sehari-hari sekaligus perubahan yang menandai chapter baru. |
| Skala perangkat | Komposisi potret di HP sebagai acuan pertama, kemudian tata ulang UI untuk tablet dan desktop lebar. Batasi efek, bayangan, dan luas area aktif pada perangkat ringan. | Uji dengan area kebun terisi dan Groot bergerak. Ukuran avatar, huruf, serta tombol tetap terbaca. |

Pilihan artistik yang perlu ditinjau pertama adalah **satu adegan halaman rumah dan kebun dari kamera permainan yang sebenarnya**, dengan Gaellry dan Groot pada ukuran bermain. Adegan ini menjadi pembanding bagi lingkungan, kontrol, dan identitas karakter di chapter berikutnya.

## 4. Kontrol dan respons

| Tindakan | HP / tablet | Desktop yang diusulkan | Respons yang diharapkan |
|---|---|---|---|
| Berjalan | Geser joystick kiri, lepas untuk berhenti | WASD atau panah | Gaellry segera bergerak relatif terhadap layar, berhenti saat input dilepas, dan tidak menembus pagar atau tanaman. |
| Berinteraksi | Sentuh tombol kanan yang berlabel “Bicara”, “Periksa”, “Ambil”, “Siram”, atau “Masuk” | E | Objek terpilih disorot halus. Jika dua sasaran berdekatan, arah hadap dan jarak menentukan sasaran yang terlihat sebelum tombol ditekan. |
| Memilih alat | Ketuk ikon alat cepat | Klik alat | Tunjukkan alat dan petak aktif. Satu tindakan hanya memengaruhi sasaran terpilih. |
| Membaca / memilih jawaban | Ketuk lanjut atau pilihan dialog | Enter / klik pilihan | Percakapan menahan gerak, teks tersedia sampai pemain melanjutkan. Petunjuk penting disalin ke jurnal. |
| Jurnal dan kembali | Ketuk ikon jurnal lalu tombol kembali | J dan Esc | Saat jurnal ditutup, posisi dan tujuan aktif tetap terjaga. |
| Mini game | Instruksi singkat sesuai aktivitas, misalnya ketuk bunga lalu posisi pada buket | Klik dengan urutan setara | Bisa mencoba kembali atau kembali ke dunia. Aksi utama dapat dilakukan tanpa kamera atau mikrofon. |

## 5. Prologue — Welcome to Our World

Contoh alur yang dapat diuji dari awal sampai akhir. Detail petunjuk, tempat persembunyian, serta isi surat tetap bahan tinjauan kreatif.

1. **Tiba.** Prolog singkat memperkenalkan GAELLVERSE. Groot menunggu Gaellry di jalan setapak. Tindakan pertama pemain adalah berjalan menghampirinya. Permainan menunjukkan tombol interaksi ketika sudah cukup dekat.
2. **Mengenal tempat.** Groot berjalan mendampingi Gaellry melewati taman camellia dan baby’s breath. Jalan berakhir di rumah. Memeriksa pintu memunculkan tujuan mencari kunci pertama.
3. **Bertemu penolong.** Seorang penghuni di taman menyapa. Melalui percakapan, Gaellry mendapat petunjuk yang merujuk pada ciri lingkungan. Usulan contoh, “Tadi Groot berhenti di dekat bangku yang menghadap bunga putih.” Jurnal menyimpan kalimat itu.
4. **Mencari.** Pemain bebas menjelajah. Di dekat bangku, Groot berhenti dan mengendus. Pemain menentukan tempat untuk diperiksa. Sorotan halus dan tombol “Ambil kunci” memberi kepastian ketika benda ditemukan.
5. **Membuka rumah.** Pemain kembali dan memakai kunci. Simpan kepemilikan kunci, status pintu dan langkah quest secara konsisten. Jika pemain keluar sebelum sampai, kunci tetap ada dan tujuan selanjutnya tetap membuka rumah.
6. **Menetap.** Di dalam rumah ada satu interaksi personal pendek dengan isi yang disetujui pemilik. Setelah itu pemain dapat kembali ke taman, mulai berkebun, atau mengikuti side quest. Prolog tetap tersedia sebagai fondasi permanen.

## 6. Kalender dan chapter

| Alur | Waktu dunia nyata | Isi inti dan pengalaman bermain |
|---|---|---|
| Prologue — Welcome to Our World | Sejak awal perjalanan | Perkenalan Gaellry, Groot, penghuni, rumah, taman, dan pencarian kunci pertama. |
| Chapter I — A Christmas Wish | 25 Desember, target naratif | Misi menghias pohon Natal, mencari hadiah tersembunyi, lalu membuka surat Natal. Usulan hasil permanen berupa surat yang dapat dibaca lagi. |
| Chapter II — Under the Same Sky | 1 Januari, target naratif | Gaellry menuju observatorium, mengikuti momen kembang api, menyimpan resolusi bersama dalam kapsul waktu. Isi dan waktu membuka kapsul ditetapkan saat penulisan chapter. |
| Chapter III — The Day You Were Born | **5 Juni 2027, tepat pukul 00.00** | Perayaan ulang tahun dengan quest khusus, galeri kenangan, surat, bunga, dan hadiah. Lilin interaktif dari video merupakan usulan untuk puncak adegan. |

Tahun pembukaan pertama untuk Natal dan Tahun Baru, serta zona waktu kanonis, perlu dikunci sebelum rilis. **Usulan zona waktu adalah WITA** bila itu zona penerima. Server menggunakan waktu yang sama untuk semua perangkat. Tepat tengah malam, chapter ulang tahun menjadi tersedia bagi akun yang berhak. Jika Gaellry sedang bermain, tampilkan penanda yang dapat dibuka setelah interaksi aktif selesai. Jika sedang offline, perayaan menunggu saat login berikutnya. Pemain dapat mengulang event dan quest yang telah terbuka. Usulan aturan replay adalah menyimpan penyelesaian pertama, mencegah duplikasi hadiah unik, serta tetap mengizinkan percobaan dan skor baru di mini game.

## 7. Kehidupan sehari-hari

**Berkebun.** Gaellry memilih petak, menyiapkan tanah, menanam, menyiram, lalu melihat tahap pertumbuhan hingga siap panen. Daun terkulai dan indikator tertulis menandai kekurangan air. Tanaman bisa mati jika perawatan terlewat. Simpan waktu tanam, perawatan terakhir dan panen. Saat pemain kembali, hitung keadaan tanaman menurut selang waktu nyata, termasuk ketika game ditutup. Durasi tumbuh, masa pemulihan sebelum mati, serta jenis tanaman musim pertama perlu diuji. Jika tanaman mati, petak bisa ditanami ulang dan cerita utama tetap dapat dilanjutkan.

**Karakter dan side quest.** Pertemuan pertama menunjukkan apa yang sedang dilakukan karakter. Percakapan berikutnya mengingat pertemuan dan bantuan Gaellry. Contoh usulan adalah seorang perangkai bunga yang menyiapkan meja untuk seseorang. Ia mengajak Gaellry memilih bunga, merangkainya bersama, lalu menaruh buket di meja. Pertemuan berikutnya bisa menampilkan tanggapan atas pilihan tadi. Bentuk kedekatan dan identitas karakter menjadi keputusan penulis. Progres utama tetap mengikuti Gaellry.

**Mini game.** Contoh untuk prototipe adalah merangkai buket dengan camellia dan baby’s breath. Pemain melihat contoh, memilih tangkai, mengatur tiga posisi, dan melihat hasil. Aktivitas ini menguji kontrol sentuh, ekspresi karakter, dan replay dalam adegan yang sudah diperlukan untuk kebun. Permainan balok, musik dan photobooth dalam video bisa dibahas setelah contoh pertama dinilai.

**Groot.** Ia mendampingi Gaellry saat berjalan dan memberi reaksi yang membantu pemain membaca lingkungan. Ia dapat dipanggil atau disapa. Saat pemain melewati pintu atau berpindah area, tempatkan Groot di sisi yang aman. Jika ia tertinggal, pemain tetap bisa melanjutkan quest.

## 8. Login, slot, dan kesinambungan progres

| Kebutuhan | Perilaku produk | Kriteria penerimaan |
|---|---|---|
| Akses wajib | Login sebelum membaca dunia. Server memeriksa hak akun atas slot, surat dan kenangan. | Membuka tautan dunia tanpa sesi meminta login. Akun lain tidak dapat membuka slot yang tidak menjadi haknya. |
| Beberapa slot | Tampilkan ringkasan berisi chapter, lokasi dan simpan terakhir. Memulai slot baru membuat perjalanan Gaellry tersendiri. | Slot kedua dapat dimainkan tanpa mengubah rumah, kebun, atau progres slot pertama. Jumlah maksimum slot masih terbuka. |
| Autosave | Simpan setelah mengambil benda penting, mengganti langkah quest, merawat tanaman, menerima hadiah dan menyelesaikan perayaan. Tampilkan “Menyimpan”, “Tersimpan”, atau “Menunggu koneksi” sesuai keadaan sebenarnya. | Setelah tanda “Tersimpan”, menutup browser dan masuk dari HP atau laptop lain memulihkan hasil yang sama. |
| Gangguan koneksi | Simpan perubahan tertunda secara lokal bila memungkinkan. Beri tahu pemain sebelum pindah perangkat dengan perubahan belum tersinkron. | Pengiriman ulang tidak menambah kunci, hadiah, hasil panen atau penyelesaian quest dua kali. |
| Dua perangkat | Gunakan versi save. Jika perangkat lama mencoba menulis setelah perangkat kedua maju, tahan perubahan yang bertabrakan dan tawarkan memuat progres terbaru. | Perangkat lama tidak dapat diam-diam memundurkan chapter atau menghidupkan lagi hadiah yang sudah diklaim. |
| Pemulihan | Usulan untuk produksi berupa cadangan berkala dan uji pemulihan slot, termasuk kaitan dengan surat serta galeri pribadi. | Pulihkan contoh slot uji dan buka kembali chapter, kebun serta kenangannya sebelum memakai data personal. |

Simpan per slot identitas Gaellry, lokasi aman terakhir, status pintu dan benda unik, chapter terbuka, langkah quest, dialog penting, interaksi karakter dan Groot, tanaman beserta cap waktunya, koleksi kenangan, hasil mini game dan catatan hadiah. Preferensi kontrol, suara, dan kualitas gambar dapat disimpan per perangkat. Aturan apakah koleksi tertentu dibagi antar-slot masih terbuka.

## 9. Kualitas, privasi, dan ukuran keberhasilan

- **Keterbacaan.** Uji layar potret HP, tablet dan laptop. Dialog panjang dapat digulir. Tanda layu, target aktif dan status save memakai bentuk atau teks selain warna.
- **Performa.** Sasaran awal untuk staging adalah 30 fps stabil pada satu HP acuan yang disepakati, termasuk saat menyiram tanaman dan berjalan bersama Groot. Rekam perangkat, ukuran layar, waktu muat pertama, dan penurunan frame saat berpindah area. Angka 30 fps dari berkas video hanya menyatakan laju rekaman.
- **Akses dan materi pribadi.** Simpan rahasia akses di sisi server. Gunakan koneksi terenkripsi dan sesi yang bisa diakhiri. Materi ulang tahun, foto, dan surat hanya tampil bagi akun berizin. Pemilihan foto, teks asli, musik berizin dan persetujuan penggunaan kamera diperlukan bila fitur terkait dipilih.
- **Keberhasilan pengalaman.** Dalam uji pertama, amati apakah pemain dapat menemukan rumah, memahami petunjuk, mengambil kunci, dan membuka pintu tanpa bantuan lisan. Catat lokasi saat pemain tersesat atau salah menekan tombol. Dalam uji kedua, pemain dapat menjelaskan dari tampilan kebun apa yang perlu dirawat dan meneruskan quest dari perangkat lain.

## 10. Tahapan pengiriman yang diusulkan

| Tahap | Hasil yang bisa dimainkan | Syarat untuk lanjut |
|---|---|---|
| Prototipe tampilan dan kontrol | Satu halaman rumah dengan jalur, kebun, Gaellry, Groot, satu NPC dan satu pintu. Gunakan data contoh. | Nilai rupa karakter, tinggi kamera, ukuran di layar HP, gerak dan jangkauan interaksi melalui permainan langsung. |
| Staging inti | Login, slot, prolog sampai pintu terbuka, satu petak dengan siklus hidup lengkap, satu side quest dan satu mini game yang bisa diulang. | Alur selesai, tersimpan, dan dapat diteruskan di perangkat kedua. Uji gangguan koneksi dan konflik save lulus. |
| Chapter kalender | Chapter I, II, lalu III sesuai kesiapan konten. Gunakan jam simulasi khusus pengujian untuk menguji pergantian tanggal. | Surat dan hadiah tidak bocor lebih awal. Event terbuka tepat waktu serta tersedia bagi pemain yang terlambat. |
| Pengembangan lanjutan | Tambah karakter, petak, mini game, dan cerita melalui area yang sudah dikenal. Opsi bermain bersama perlu keputusan tersendiri untuk rancangan GAELLVERSE ini. | Setiap penambahan dapat memuat slot lama. Uji regresi pada prolog, kebun dan ulang tahun. |

## 11. Skenario penerimaan utama

| ID | Langkah uji | Hasil yang harus terlihat |
|---|---|---|
| U01 | Login pertama, buat slot, ikuti petunjuk Groot hingga bertemu penolong. | Karakter terkendali, petunjuk terbaca, tujuan aktif dan jurnal sepakat. |
| U02 | Ambil kunci di HP, tunggu “Tersimpan”, tutup lalu lanjut di laptop. | Kunci tersedia, pintu masih tertutup, tujuan membuka rumah. Setelah dipakai, rumah terbuka sekali. |
| U03 | Berdiri dekat NPC dan petak kebun, lalu pilih sasaran. | Label tindakan sesuai sorotan. Membuka dialog tidak otomatis menyiram petak. |
| U04 | Tanam dan siram, tutup game, lalu uji beberapa selang waktu dengan data staging. | Pertumbuhan, layu, pemulihan sebelum mati, kematian dan tanam ulang sesuai aturan tanaman. |
| U05 | Uji tepat sebelum, saat, dan sesudah 00.00 tanggal 5 Juni 2027 di zona yang disepakati. | Kejutan terkunci sebelum waktu, terbuka saat waktunya, dan tersedia pada login yang terlambat. Mengubah jam HP tidak membukanya lebih awal. |
| U06 | Selesaikan chapter, mainkan lagi, ulangi side quest dan mini game. | Penyelesaian utama serta kenangan tetap tersimpan, hadiah unik satu kali, permainan ulang tersedia. |
| U07 | Putuskan koneksi saat menerima hadiah. Sambungkan kembali dan muat slot di perangkat lain. | Status sinkronisasi jelas. Setelah terkonfirmasi, hadiah dan langkah quest konsisten pada kedua perangkat. |
| U08 | Buat dua slot dan buka perangkat dengan save lama. | Tiap slot memiliki dunia sendiri. Simpan lama tidak menimpa progres baru tanpa pemberitahuan. |
| U09 | Mainkan prolog pada HP potret, tablet dan desktop dengan kontrol masing-masing. | Semua langkah dapat diselesaikan. Dialog, pintu, dan tombol tetap terlihat dan dapat dioperasikan. |

## 12. Handoff Context

**Keputusan yang dibutuhkan sebelum produksi konten** mencakup rupa final Gaellry dan Groot, naskah alasan dunia ini ada, identitas karakter pertama, zona waktu acara, tahun Natal serta Tahun Baru pertama, dan isi kejutan ulang tahun. **Keputusan teknis berikutnya** mencakup metode login, penyedia hosting sesuai anggaran, perangkat acuan, kebijakan pemulihan dan parameter kebun. Batas anggaran, perangkat minimum dan tenggat rilis staging belum disepakati.

Dokumen berikutnya adalah Technical Design untuk satu perjalanan uji lengkap, dari login di HP hingga berhasil membuka rumah di perangkat lain. Masukan desain pertama yang diperlukan adalah penilaian pemain atas kamera, gerakan, dan tampilan Gaellry bersama Groot pada adegan halaman rumah.

```json
{
  "schemaVersion": 1,
  "documentType": "prd",
  "appName": "GAELLVERSE",
  "oneLiner": "Dunia personal Gaellry dan Groot dengan kehidupan kebun, pencarian, serta chapter yang dibuka menurut kalender nyata.",
  "targetUsers": "Pemain utama yang menjalani kisah Gaellry dan kembali melalui akun yang sama di beberapa perangkat.",
  "mustHave": ["Login wajib", "Prolog dan pencarian kunci", "Gaellry dan Groot", "Kontrol eksplorasi mobile dan desktop", "Kebun waktu nyata", "Side quest dan mini game yang dapat diulang", "Chapter kalender dan replay", "Save lintas perangkat dengan beberapa slot"]
}
```

