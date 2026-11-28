# Audit Konsistensi PRD GAELLVERSE

## Ringkasan eksekutif

Dokumen sudah memiliki arah produk yang kuat dan sebagian besar elemen utama saling mendukung: pengalaman personal satu pemain, prolog pencarian kunci, kebun berbasis waktu nyata, login wajib, slot terpisah, serta kesinambungan lintas perangkat\.

Namun, terdapat beberapa konflik penting yang perlu diselesaikan sebelum Technical Design dan penguncian MVP:

1. **MVP\-01 sampai MVP\-04 disebut sebagai cakupan Technical Design awal, tetapi MVP\-05 dan MVP\-06 sudah dinyatakan sebagai bagian MVP dan diuji oleh U04 serta U10\.**
2. **Chapter kalender disebut bukan bagian MVP, tetapi U05 menguji Chapter III pada tanggal 5 Juni 2027 dan beberapa bagian penerimaan masih mengasumsikan chapter, surat, serta kenangan tersedia\.**
3. **MVP\-07 menyatakan dukungan tablet dan desktop untuk uji lintas perangkat, sedangkan beberapa bagian lain hanya menjadikan HP sebagai platform utama dan desktop sebagai usulan\.**
4. **MVP\-05 mewajibkan tanaman dapat mati, tetapi parameter “masa pemulihan sebelum mati” belum ditetapkan dan U04 mengharuskan perilaku yang belum memiliki aturan final\.**
5. **MVP\-06 memasukkan side quest dan mini game, tetapi Gerbang B menyatakan side quest diproduksi setelah MVP\-02 dan MVP\-03, sedangkan Gerbang E baru memvalidasi MVP\-06 setelahnya\. Urutan ini belum sepenuhnya jelas\.**
6. **JSON cukup sesuai dengan daftar MVP, tetapi tidak mencerminkan beberapa batasan penting: logging, keamanan dasar, pemulihan, versi save, aturan konflik, serta status chapter kalender yang masih ambigu\.**
7. **Istilah “chapter terbuka”, “surat”, “kenangan”, dan “perayaan” digunakan dalam skenario penerimaan pemulihan, padahal sebagian besar fitur tersebut berada di fase berikutnya\.**
8. **Prolog disebut “fondasi permanen” dan dapat diulang, tetapi aturan replay prolog belum dibedakan dari replay chapter, side quest, dan mini game\.**
9. **“Offline” memiliki dua makna yang belum dipisahkan: berkebun saat game ditutup tanpa koneksi, dan bermain atau menyimpan perubahan saat perangkat benar\-benar offline\.**
10. **Tanggal dokumen 28 November 2026 tidak sepenuhnya selaras dengan Chapter III pada 5 Juni 2027 dan istilah “tahun pembukaan pertama” yang belum dikunci\.**

---

## 1\. Audit ruang lingkup MVP

### 1\.1 Elemen yang konsisten

Elemen berikut konsisten antara bagian pengalaman, prioritas, batas MVP, dan JSON:

|Elemen                       |Status                    |Catatan                                                                             |
|-----------------------------|--------------------------|------------------------------------------------------------------------------------|
|Login wajib                  |Konsisten                 |Ada di pengalaman, MVP-02, U01, U10, dan JSON.                                      |
|Beberapa slot                |Konsisten sebagian        |Ada di MVP-02, U08, dan JSON, tetapi jumlah maksimum slot belum ditetapkan.         |
|Prolog pencarian kunci       |Konsisten                 |Ada di Prologue, MVP-03, U01-U02, U10, dan JSON.                                    |
|Gaellry dan Groot            |Konsisten                 |Ada di pengalaman, MVP-01, MVP-03, dan JSON.                                        |
|Autosave dan lintas perangkat|Konsisten                 |Ada di MVP-04, U02, U07, U11, dan JSON.                                             |
|Kebun berbasis waktu nyata   |Konsisten                 |Ada di bagian kehidupan sehari-hari, MVP-05, U04, dan JSON.                         |
|Side quest dan mini game     |Konsisten secara daftar   |Ada di MVP-06, U06, U10, dan JSON.                                                  |
|Chapter kalender ditunda     |Konsisten secara eksplisit|Batas MVP menyatakan chapter kalender tidak wajib, dan JSON menaruhnya di nextPhase.|

### 1\.2 Konflik utama: cakupan MVP versus Technical Design

Bagian Handoff Context menyatakan:

> “Dokumen berikutnya adalah Technical Design untuk MVP-01 sampai MVP-04…”

Namun tabel prioritas menyatakan MVP mencakup MVP\-01 sampai MVP\-08, dan JSON memasukkan:

- satu petak kebun,
- satu side quest,
- satu mini game,
- dukungan tablet dan desktop,
- autosave lintas perangkat\.

Ini menimbulkan dua interpretasi:

1. **MVP sebenarnya hanya MVP\-01 sampai MVP\-04**, sedangkan kebun, side quest, mini game, dan multi\-platform adalah fase setelah validasi kesinambungan; atau
2. **MVP mencakup MVP\-01 sampai MVP\-08**, tetapi Technical Design akan dibuat bertahap, dimulai dari MVP\-01 sampai MVP\-04\.

### Usulan perbaikan

Ganti kalimat Handoff Context menjadi:

> “Dokumen berikutnya adalah Technical Design bertahap. Tahap pertama mencakup MVP-01 sampai MVP-04, yaitu perjalanan uji dari login di HP hingga membuka rumah dan melanjutkan progres di perangkat lain. Setelah Gerbang C lulus, Technical Design diperluas untuk MVP-05 sampai MVP-08: kebun, side quest, mini game, dukungan perangkat, logging, dan perlindungan data.”

Jika memang kebun dan mini game bukan bagian pengiriman MVP pertama, ubah labelnya menjadi:

- **MVP Core: MVP\-01 sampai MVP\-04**
- **MVP Expansion: MVP\-05 sampai MVP\-08**

Dengan demikian, istilah “MVP” tidak digunakan untuk dua cakupan berbeda\.

---

## 2\. Audit batas MVP

### 2\.1 Batas MVP sudah jelas, tetapi belum sepenuhnya operasional

Batas MVP menyatakan bahwa MVP tidak wajib memuat:

- seluruh chapter kalender,
- galeri kenangan lengkap,
- banyak karakter,
- banyak petak,
- permainan balok,
- photobooth,
- kamera pribadi,
- mikrofon,
- bermain bersama\.

Ini konsisten dengan bagian fitur ditunda dan JSON\.

Namun, batas tersebut belum menjelaskan apakah MVP wajib memuat:

- surat sederhana,
- satu kenangan personal,
- satu hadiah,
- satu galeri minimal,
- replay prolog,
- replay side quest,
- penyimpanan hasil mini game,
- pemulihan slot\.

Beberapa elemen tersebut muncul di model data dan skenario penerimaan, tetapi tidak jelas apakah termasuk MVP\.

### Konflik: surat, kenangan, dan galeri

Bagian penyimpanan menyebut:

> “Simpan per slot … koleksi kenangan, hasil mini game dan catatan hadiah.”

U12 menguji:

> “Slot, chapter, kebun, surat, dan kenangan yang termasuk cakupan pemulihan…”

Padahal:

- surat Natal berada di Fase 2B,
- galeri kenangan berada di Fase 2E,
- chapter kalender berada di luar MVP\.

### Usulan perbaikan

Tambahkan definisi eksplisit:

> “Dalam MVP, surat, kenangan, galeri, dan hadiah hanya disimpan jika dihasilkan oleh prolog, side quest, atau mini game MVP. Surat Natal, galeri ulang tahun, dan kenangan chapter kalender bukan bagian MVP.”

Atau, jika tidak ada surat dan kenangan dalam MVP, ubah U12 menjadi:

> “Slot, progres prolog, status pintu, kebun, side quest, dan hasil mini game yang termasuk cakupan MVP dapat dipulihkan tanpa mengubah slot lain.”

---

## 3\. Audit skenario penerimaan versus ruang lingkup

### 3\.1 U05 bertentangan dengan batas MVP

U05 menguji:

> “Uji tepat sebelum, saat, dan sesudah 00.00 tanggal 5 Juni 2027…”

Hasil yang diharapkan:

> “Kejutan terkunci sebelum waktu, terbuka saat waktunya…”

Namun Chapter III secara eksplisit berada di Fase 2E, bukan MVP\. Batas MVP juga menyatakan seluruh chapter kalender tidak wajib\.

Ini adalah konflik paling jelas antara skenario penerimaan dan batas MVP\.

### Usulan perbaikan

Ada dua pilihan\.

#### Pilihan A: U05 dipindahkan ke fase berikutnya

Ubah label menjadi:

> **F2-U01** — Uji tepat sebelum, saat, dan sesudah 00.00 tanggal 5 Juni 2027 di zona waktu yang disepakati.

Kemudian keluarkan U05 dari “Skenario penerimaan utama MVP” dan masukkan ke “Skenario penerimaan kalender”\.

#### Pilihan B: U05 diubah menjadi pengujian infrastruktur MVP

Jika sistem event server memang harus diuji dalam MVP, jangan menguji Chapter III secara langsung\. Ubah menjadi:

> “Uji event waktu nyata menggunakan event staging tanpa konten chapter. Event terkunci sebelum waktu, terbuka pada waktu server, tersedia pada login terlambat, dan tidak terbuka hanya karena jam perangkat diubah.”

Dengan demikian, MVP menguji mekanisme waktu tanpa memasukkan konten ulang tahun\.

### 3\.2 U06 mengasumsikan chapter sudah tersedia

U06 berbunyi:

> “Selesaikan chapter, mainkan lagi, ulangi side quest dan mini game.”

Jika chapter kalender tidak termasuk MVP, kata “chapter” ambigu\. Prolog disebut chapter dalam beberapa bagian, tetapi juga dibedakan dari Chapter I, II, dan III\.

### Usulan perbaikan

Ganti menjadi:

> “Selesaikan prolog, ulangi side quest, dan ulangi mini game.”

Jika replay chapter kalender memang ingin diuji, buat skenario terpisah untuk fase kalender\.

### 3\.3 U10 terlalu luas dan mengandung istilah “perpindahan perangkat”

U10 menyatakan:

> “Prolog, kebun dasar, side quest, mini game buket, autosave, dan perpindahan perangkat tetap dapat diselesaikan…”

Ini konsisten dengan JSON, tetapi tidak konsisten dengan Handoff Context yang hanya menyebut MVP\-01 sampai MVP\-04 sebagai perjalanan uji awal\.

### Usulan perbaikan

Jika seluruh MVP mencakup MVP\-01 sampai MVP\-08, pertahankan U10 dan perjelas Handoff Context\.

Jika MVP awal hanya MVP\-01 sampai MVP\-04, ubah U10 menjadi:

> “Prolog, autosave, dan perpindahan perangkat dapat diselesaikan tanpa chapter kalender, kamera, mikrofon, sosial, kebun, side quest, atau mini game.”

---

## 4\. Audit prioritas dan urutan gerbang

### 4\.1 Gerbang B dan MVP\-06 belum sepenuhnya selaras

Gerbang B menyatakan:

> “MVP-02 dan MVP-03 harus lulus sebelum kebun dan side quest diproduksi penuh.”

MVP\-06 mencakup side quest dan mini game\. Gerbang E menyatakan MVP\-06 harus lulus sebelum fitur tambahan diprioritaskan\.

Tidak jelas apakah:

- side quest MVP mulai diproduksi setelah Gerbang B,
- side quest baru diuji setelah kebun,
- mini game bergantung pada kebun,
- MVP\-06 harus selesai sebelum MVP\-05 atau sesudahnya\.

### Usulan urutan yang lebih jelas

1. Gerbang A: visual, kamera, kontrol\.
2. Gerbang B: login, slot, prolog satu pemain\.
3. Gerbang C: save lintas perangkat untuk prolog\.
4. Gerbang D: kebun dan waktu nyata\.
5. Gerbang E: side quest dan mini game\.
6. Gerbang F: dukungan tablet, desktop, logging, keamanan\.
7. Gerbang G: chapter kalender\.
8. Gerbang H: fitur berisiko tinggi\.

Tambahkan dependensi eksplisit:

> “MVP-06 bergantung pada MVP-03 untuk state quest, MVP-04 untuk penyimpanan hasil, dan MVP-05 hanya jika mini game menggunakan aset atau state kebun.”

### 4\.2 MVP\-07 ditempatkan terlalu rendah dibanding kebutuhan U09

MVP\-07 adalah dukungan HP, tablet, dan desktop\. Namun U02 sudah mengharuskan perpindahan dari HP ke laptop, dan U09 mengharuskan prolog selesai di HP, tablet, dan desktop\.

Artinya, dukungan desktop dan tablet bukan hanya prioritas akhir; sebagian sudah menjadi dependensi MVP\-04 dan skenario lintas perangkat\.

### Usulan perbaikan

Pisahkan MVP\-07 menjadi dua:

- **MVP\-04A:** desktop minimum untuk memuat dan melanjutkan save lintas perangkat\.
- **MVP\-07:** penyelesaian prolog penuh pada tablet dan desktop dengan tata letak yang dioptimalkan\.

Atau ubah dependensi MVP\-04 menjadi:

> “Perangkat kedua minimal dapat memuat, membaca, dan melanjutkan progres. Penyelesaian penuh prolog pada semua kelas perangkat diuji pada MVP-07.”

---

## 5\. Audit kebun dan status offline

### 5\.1 “Berkebun saat offline” ambigu

Dokumen menyebut:

- berkebun saat offline sebagai dasar keputusan pemilik proyek,
- tanaman dihitung saat game ditutup,
- perubahan tertunda disimpan lokal bila memungkinkan,
- server menggunakan waktu yang sama untuk semua perangkat,
- MVP\-05 memerlukan cap waktu server\.

Ada dua konsep berbeda:

1. **Offline progression:** tanaman tumbuh ketika game ditutup atau pemain tidak aktif\.
2. **Offline gameplay:** pemain dapat menanam, menyiram, atau memanen tanpa koneksi\.

Dokumen belum menyatakan apakah keduanya didukung\.

### Usulan perbaikan

Tambahkan definisi:

> “Offline progression berarti tanaman tetap mengalami perubahan waktu ketika game ditutup atau pemain tidak sedang bermain. MVP tidak menjamin seluruh tindakan berkebun dapat dilakukan tanpa koneksi. Tindakan yang mengubah progres hanya dapat disimpan lokal dan disinkronkan kembali jika aturan konflik telah dipenuhi.”

Jika berkebun benar\-benar harus dapat dilakukan tanpa koneksi, perlu ditambahkan:

- sumber waktu tepercaya,
- aturan manipulasi jam perangkat,
- antrean operasi,
- konflik antarperangkat,
- batas tindakan offline,
- perilaku jika dua perangkat mengubah petak yang sama\.

### 5\.2 U04 menguji “pemulihan sebelum mati”, tetapi istilahnya tidak konsisten

U04 menyebut:

> “Pertumbuhan, layu, pemulihan sebelum mati, kematian…”

Bagian kehidupan sehari\-hari hanya menyebut tanaman bisa mati jika perawatan terlewat\. Tidak ada definisi bahwa tanaman memiliki fase pemulihan atau bahwa pemain dapat menyelamatkan tanaman setelah layu\.

### Usulan perbaikan

Pilih salah satu:

- Hapus “pemulihan sebelum mati” dari U04; atau
- Tambahkan aturan produk:

> “Tanaman memasuki fase layu selama X jam. Jika disiram dalam fase tersebut, tanaman pulih. Setelah X jam tambahan tanpa perawatan, tanaman mati.”

Parameter X harus ditetapkan sebelum U04 dianggap dapat diluluskan\.

---

## 6\. Audit kalender dan tanggal

### 6\.1 Chapter III memiliki tanggal pasti, tetapi Chapter I dan II belum

Chapter III ditetapkan pada:

> “5 Juni 2027, tepat pukul 00.00”

Sementara Chapter I dan II hanya menyebut:

- 25 Desember,
- 1 Januari,
- tahun pembukaan pertama belum dikunci\.

Ini menciptakan ketidakseimbangan spesifikasi dan risiko implementasi\.

### Usulan perbaikan

Tambahkan tabel keputusan:

|Chapter    |Tanggal kanonis |Tahun pertama   |Zona waktu      |Status |
|-----------|----------------|---------------:|----------------|-------|
|Chapter I  |25 Desember YYYY|Belum ditetapkan|Belum ditetapkan|Fase 2B|
|Chapter II |1 Januari YYYY  |Belum ditetapkan|Belum ditetapkan|Fase 2C|
|Chapter III|5 Juni 2027     |2027            |Belum ditetapkan|Fase 2E|

Jika Chapter III memang harus tersedia pada 5 Juni 2027, Technical Design kalender harus selesai jauh sebelum tanggal tersebut\. Jika tidak, tanggal perlu diperlakukan sebagai target naratif, bukan tanggal rilis yang mengikat\.

### 6\.2 “Server menggunakan waktu yang sama untuk semua perangkat” perlu diperjelas

Kalimat ini dapat berarti:

- semua perangkat memakai zona waktu yang sama; atau
- server memakai satu timestamp UTC dan mengonversinya ke zona kanonis; atau
- event dibuka serentak secara global\.

### Usulan perbaikan

Gunakan formulasi teknis:

> “Server menyimpan waktu dalam UTC. Kelayakan event dihitung berdasarkan zona waktu kanonis akun atau zona waktu global yang ditetapkan produk. Perubahan jam perangkat tidak memengaruhi kelayakan event.”

Kemudian pilih salah satu kebijakan:

- zona waktu global WITA untuk semua akun; atau
- zona waktu akun; atau
- zona waktu lokasi proyek\.

---

## 7\. Audit replay

### 7\.1 Replay digunakan untuk beberapa sistem berbeda

Dokumen menyebut replay untuk:

- prolog,
- event chapter,
- side quest,
- mini game,
- hadiah unik,
- skor baru\.

Namun aturan replay hanya dijelaskan secara umum:

> “Menyimpan penyelesaian pertama, mencegah duplikasi hadiah unik, serta tetap mengizinkan percobaan dan skor baru di mini game.”

Belum jelas apakah replay:

- mengulang dialog,
- mengulang state dunia,
- mengulang hadiah,
- mengubah pilihan,
- mengubah hubungan karakter,
- mengubah status quest\.

### Usulan perbaikan

Tambahkan matriks replay:

|Aktivitas       |Dapat diulang|Hadiah unik|Hadiah berulang|Mengubah cerita    |
|----------------|-------------|-----------|---------------|-------------------|
|Prolog          |Ya/tidak     |Tidak      |Tidak          |Tidak              |
|Side quest      |Ya           |Tidak      |Opsional       |Tidak atau terbatas|
|Mini game       |Ya           |Tidak      |Skor/rekor     |Tidak              |
|Chapter kalender|Ya           |Tidak      |Opsional       |Tidak              |
|Dialog personal |Ya/tidak     |Tidak      |Tidak          |Belum ditetapkan   |

---

## 8\. Audit JSON terhadap dokumen

### 8\.1 Elemen JSON yang sesuai

JSON sudah mencerminkan:

- login wajib,
- slot,
- prolog,
- Gaellry dan Groot,
- kontrol mobile dan desktop,
- autosave lintas perangkat,
- kebun,
- side quest,
- mini game,
- dukungan HP, tablet, dan desktop,
- chapter kalender sebagai fase berikutnya,
- fitur ditunda utama\.

### 8\.2 Elemen penting yang hilang dari JSON

JSON tidak mencerminkan beberapa bagian penting:

1. **MVP\-08:** logging, indikator penyimpanan, pengujian gangguan koneksi, perlindungan data pribadi\.
2. **Versi save dan konflik:** disebut sebagai bagian MVP\-04, tetapi tidak muncul secara eksplisit\.
3. **Pemulihan slot:** berada di fase berikutnya, tetapi U12 mengujinya\.
4. **Batas chapter kalender:** JSON hanya menulis “Chapter kalender”, tanpa menyebut bahwa Chapter III memiliki tanggal 5 Juni 2027\.
5. **Offline progression versus offline gameplay\.**
6. **Aturan hadiah unik dan replay\.**
7. **Jumlah maksimum slot yang masih terbuka\.**
8. **Status desktop:** apakah desktop hanya untuk melanjutkan save atau juga menyelesaikan prolog\.
9. **Keamanan dasar dan privasi\.**
10. **Status surat dan kenangan\.**

### 8\.3 JSON menyederhanakan “MVP” secara berlebihan

JSON menulis:

```json
"mvp": [
  ...
]
```

Namun tidak membedakan:

- MVP\-01 sampai MVP\-04,
- MVP\-05 sampai MVP\-08,
- fitur wajib untuk pengiriman pertama,
- fitur wajib untuk validasi penuh\.

### Usulan struktur JSON

Tambahkan kategori:

```json
{
  "mvp": {
    "core": [
      "Satu halaman rumah dan kebun",
      "Gaellry, Groot, satu NPC, satu pintu",
      "Login wajib dan slot dasar",
      "Prolog pencarian kunci",
      "Autosave dan save lintas perangkat untuk prolog"
    ],
    "expansion": [
      "Satu petak kebun dengan siklus waktu nyata",
      "Satu side quest",
      "Satu mini game buket",
      "Dukungan tablet dan desktop untuk penyelesaian prolog",
      "Logging, indikator save, dan perlindungan data dasar"
    ]
  },
  "mvpBoundaries": {
    "calendarChapters": false,
    "photobooth": false,
    "camera": false,
    "microphone": false,
    "social": false,
    "deepAvatarCustomization": false,
    "externalNotifications": false
  }
}
```

---

## 9\. Konflik dan ambiguitas yang perlu ditandai

|ID  |Lokasi                          |Jenis                         |Masalah                                                                                                                     |Dampak                                                                           |
|----|--------------------------------|------------------------------|----------------------------------------------------------------------------------------------------------------------------|---------------------------------------------------------------------------------|
|C-01|Handoff Context vs Prioritas MVP|Konflik                       |Technical Design hanya MVP-01–04, tetapi MVP didefinisikan sampai MVP-08.                                                   |Tim dapat salah mengira kebun dan mini game bukan bagian MVP.                    |
|C-02|Batas MVP vs U05                |Konflik                       |U05 menguji Chapter III, padahal chapter kalender ditunda.                                                                  |Skenario penerimaan tidak dapat diluluskan dalam MVP.                            |
|C-03|Batas MVP vs U12                |Ambiguitas                    |U12 menyebut surat dan kenangan tanpa mendefinisikan cakupan MVP.                                                           |Pemulihan data tidak memiliki objek uji yang jelas.                              |
|C-04|MVP-07 vs U02/U09               |Konflik ringan                |Desktop diperlukan untuk lintas perangkat sebelum MVP-07.                                                                   |Dependensi platform tidak jelas.                                                 |
|C-05|MVP-05 vs U04                   |Ambiguitas                    |“Pemulihan sebelum mati” belum didefinisikan.                                                                               |QA tidak memiliki expected behavior yang pasti.                                  |
|C-06|Offline                         |Ambiguitas                    |Tidak jelas apakah offline berarti game ditutup atau tindakan dapat dilakukan tanpa koneksi.                                |Arsitektur save dan anti-cheat dapat berbeda jauh.                               |
|C-07|Replay                          |Ambiguitas                    |Aturan replay berbeda-beda menurut aktivitas, tetapi belum dipisahkan.                                                      |Risiko duplikasi hadiah dan state cerita.                                        |
|C-08|Chapter                         |Ambiguitas                    |Prolog kadang diperlakukan sebagai chapter, kadang dibedakan dari Chapter I–III.                                            |Skenario U06 dan model data dapat salah tafsir.                                  |
|C-09|Tanggal kalender                |Ambiguitas                    |Chapter III pasti, Chapter I dan II belum memiliki tahun.                                                                   |Event server dan QA tanggal belum dapat direncanakan.                            |
|C-10|Slot                            |Ambiguitas                    |Jumlah maksimum slot belum ditetapkan.                                                                                      |Model data dan UI belum dapat dikunci.                                           |
|C-11|Save konflik                    |Ambiguitas                    |“Tawarkan memuat progres terbaru” belum menjelaskan apakah perubahan lokal dibuang, digabung, atau disimpan sebagai salinan.|Risiko kehilangan progres pengguna.                                              |
|C-12|Groot                           |Ambiguitas                    |Groot dapat dipanggil/disapa, tetapi fitur ini tidak jelas apakah MVP.                                                      |Scope animasi dan interaksi dapat melebar.                                       |
|C-13|Mini game                       |Ambiguitas                    |MVP-06 menyebut mini game dapat diulang, tetapi hasil, skor, dan hadiah belum ditentukan.                                   |Model save dan penerimaan belum lengkap.                                         |
|C-14|Desktop                         |Ambiguitas                    |Kontrol desktop diusulkan, tetapi U09 menjadikannya wajib.                                                                  |Perlu keputusan apakah desktop adalah target penerimaan atau hanya target teknis.|
|C-15|Pemulihan                       |Konflik ringan                |Pemulihan berada di Fase 2D, tetapi U12 termasuk skenario penerimaan utama.                                                 |U12 harus dipindahkan atau cakupan MVP diperluas.                                |
|C-16|Chapter kalender                |Ambiguitas                    |JSON menulis “Chapter kalender” sebagai nextPhase, tetapi tidak menyebut event server dan zona waktu.                       |Kebutuhan teknis penting tidak terlihat di ringkasan.                            |
|C-17|Koleksi lintas-slot             |Konsisten tetapi belum selesai|Aturan masih terbuka, tetapi model penyimpanan menyebut koleksi per slot.                                                   |Perlu keputusan apakah semua koleksi per slot atau sebagian akun-global.         |
|C-18|Prolog permanen                 |Ambiguitas                    |Prolog tetap tersedia, tetapi tidak jelas apakah replay mengubah state atau hanya membuka jurnal.                           |Perlu aturan replay prolog.                                                      |
|C-19|Kunci                           |Konsisten sebagian            |Kunci harus idempoten, tetapi belum dijelaskan apakah kunci dapat diambil ulang atau hanya satu kali.                       |Perlu aturan state dan UI.                                                       |
|C-20|Waktu server                    |Ambiguitas                    |Cap waktu server disebut, tetapi offline progression dan perubahan jam perangkat belum dirinci.                             |Risiko eksploitasi dan konflik lintas perangkat.                                 |

---

## 10\. Prioritas perbaikan yang disarankan

### Prioritas P0 — Harus diselesaikan sebelum Technical Design

1. Tetapkan definisi MVP:
  - MVP Core: MVP\-01 sampai MVP\-04; atau
  - MVP penuh: MVP\-01 sampai MVP\-08\.
2. Hapus atau pindahkan U05 dari penerimaan MVP\.
3. Selaraskan Handoff Context dengan cakupan MVP\.
4. Tentukan apakah U12 termasuk MVP\.
5. Definisikan offline progression versus offline gameplay\.
6. Tetapkan aturan tanaman layu, pulih, dan mati\.
7. Tetapkan apakah desktop hanya untuk melanjutkan save atau juga menyelesaikan prolog\.
8. Tetapkan jumlah maksimum slot\.
9. Tetapkan aturan konflik save minimal\.
10. Bedakan prolog dari Chapter I–III dalam istilah dan model data\.

### Prioritas P1 — Harus diselesaikan sebelum produksi konten MVP

1. Aturan replay prolog, side quest, dan mini game\.
2. Aturan hadiah unik dan hadiah berulang\.
3. Cakupan surat, kenangan, dan galeri dalam MVP\.
4. Parameter kebun minimum\.
5. Status interaksi Groot yang wajib\.
6. Definisi “Tersimpan” dan “Menunggu koneksi”\.
7. Perilaku saat perangkat lama kembali online\.
8. Kriteria lulus untuk tablet dan desktop\.

### Prioritas P2 — Dapat diselesaikan sebelum fase kalender

1. Tahun Chapter I dan II\.
2. Zona waktu kanonis\.
3. Aturan event terlambat\.
4. Aturan replay chapter\.
5. Pemulihan slot\.
6. Koleksi lintas\-slot\.
7. Notifikasi eksternal\.
8. Galeri dan materi pribadi\.

---

## 11\. Usulan redaksi batas MVP yang lebih konsisten

> **MVP Core** mencakup satu halaman rumah dan kebun, Gaellry, Groot, satu NPC, satu pintu, kontrol eksplorasi, login wajib, pembuatan dan pemilihan slot, prolog pencarian kunci, autosave, serta pemuatan progres prolog dari perangkat lain.
> 
> **MVP Expansion** mencakup satu petak kebun dengan pertumbuhan berbasis waktu nyata, satu side quest, satu mini game buket yang dapat diulang, dukungan penyelesaian prolog pada HP, tablet, dan desktop, logging, indikator status save, pengujian gangguan koneksi, serta perlindungan dasar data pribadi.
> 
> **Di luar MVP** adalah Chapter I–III, galeri kenangan lengkap, surat kalender, banyak karakter, banyak petak, permainan balok, photobooth, kamera pribadi, mikrofon, bermain bersama, kustomisasi avatar mendalam, dunia luas, koleksi lintas-slot, notifikasi eksternal, dan pemulihan slot produksi.
> 
> Event staging tanpa konten kalender dapat digunakan untuk menguji mekanisme waktu server, tetapi Chapter kalender tidak menjadi syarat kelulusan MVP.

---

## 12\. Usulan revisi skenario penerimaan MVP

|ID |Langkah uji                                                                                |Hasil yang harus terlihat                                                                                                                             |
|---|-------------------------------------------------------------------------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------|
|U01|Login pertama, buat slot, ikuti petunjuk Groot hingga bertemu penolong.                    |Karakter terkendali, petunjuk terbaca, tujuan aktif dan jurnal sepakat.                                                                               |
|U02|Ambil kunci di HP, tunggu “Tersimpan”, tutup lalu lanjut di laptop.                        |Kunci tersedia, pintu masih tertutup, tujuan membuka rumah. Setelah dipakai, rumah terbuka satu kali.                                                 |
|U03|Berdiri dekat NPC dan petak kebun, lalu pilih sasaran.                                     |Label tindakan sesuai sorotan. Membuka dialog tidak otomatis menyiram petak.                                                                          |
|U04|Tanam dan siram, tutup game, lalu uji beberapa selang waktu dengan data staging.           |Pertumbuhan, layu, pemulihan jika berlaku, kematian, dan tanam ulang sesuai parameter tanaman yang telah ditetapkan.                                  |
|U05|Putuskan koneksi saat menerima hadiah atau menyelesaikan langkah quest.                    |Status sinkronisasi jelas. Pengiriman ulang tidak menggandakan hadiah atau progres.                                                                   |
|U06|Selesaikan prolog, ulangi side quest dan mini game.                                        |Penyelesaian utama tetap tersimpan, hadiah unik tidak berlipat, dan aktivitas yang diizinkan dapat diulang.                                           |
|U07|Buat dua slot dan buka perangkat dengan save lama.                                         |Tiap slot memiliki dunia sendiri. Save lama tidak menimpa progres baru tanpa pemberitahuan.                                                           |
|U08|Mainkan prolog pada HP potret, tablet, dan desktop sesuai cakupan platform yang disepakati.|Semua langkah yang diwajibkan untuk platform tersebut dapat diselesaikan.                                                                             |
|U09|Uji perangkat kedua setelah perangkat pertama maju dan perangkat pertama kembali online.   |Versi save terbaru dipertahankan. Konflik tidak menimpa progres secara diam-diam dan pemain mendapat pilihan yang dapat dipahami.                     |
|U10|Jalankan hanya ruang lingkup MVP tanpa chapter kalender, kamera, mikrofon, atau sosial.    |MVP dapat diselesaikan tanpa fitur yang ditunda.                                                                                                      |
|U11|Uji event staging berbasis waktu server tanpa konten kalender.                             |Event tidak terbuka sebelum waktu server, terbuka pada waktu yang benar, tersedia pada login terlambat, dan tidak dipengaruhi perubahan jam perangkat.|
|U12|Uji logging, indikator save, dan perlindungan data dasar.                                  |Status save dapat dipercaya, log tidak memuat data sensitif, dan akses slot ditolak untuk akun yang tidak berhak.                                     |

Uji pemulihan slot dan Chapter III sebaiknya dipindahkan ke skenario fase berikutnya\.

---

## 13\. Usulan revisi JSON

```json
{
  "schemaVersion": 2,
  "documentType": "prd",
  "appName": "GAELLVERSE",
  "oneLiner": "Dunia personal Gaellry dan Groot dengan eksplorasi, kebun berbasis waktu nyata, pencarian, dan chapter kalender pada fase berikutnya.",
  "targetUsers": "Pemain utama yang menjalani kisah Gaellry dan kembali melalui akun yang sama di beberapa perangkat.",
  "mvp": {
    "core": [
      "Satu halaman rumah dan kebun dengan kamera permainan",
      "Gaellry, Groot, satu NPC, satu pintu, dan jalur eksplorasi",
      "Kontrol eksplorasi HP serta kontrol desktop minimum untuk melanjutkan save",
      "Login wajib, pembuatan slot, pemilihan slot, dan ringkasan slot",
      "Prolog pencarian kunci hingga rumah terbuka",
      "Autosave dan save lintas perangkat untuk progres prolog",
      "Versi save dasar dan penanganan konflik minimal",
      "Indikator status penyimpanan dan perlindungan dasar data pribadi"
    ],
    "expansion": [
      "Satu petak kebun dengan menyiapkan tanah, menanam, menyiram, tumbuh, layu, mati, panen, dan tanam ulang",
      "Offline progression untuk tanaman ketika game ditutup",
      "Satu side quest sederhana",
      "Satu mini game merangkai buket yang dapat diulang",
      "Dukungan penyelesaian prolog pada HP, tablet, dan desktop sesuai kriteria platform",
      "Logging dan pengujian gangguan koneksi"
    ]
  },
  "nextPhase": [
    "Chapter I: A Christmas Wish",
    "Chapter II: Under the Same Sky",
    "Chapter III: The Day You Were Born",
    "Perluasan kebun dan side quest",
    "Penguatan konflik save dan pemulihan slot",
    "Karakter, area, mini game, musik, dan koleksi tambahan",
    "Galeri kenangan dan surat chapter"
  ],
  "deferred": [
    "Permainan balok atau arcade tambahan",
    "Photobooth dan kamera pribadi",
    "Input mikrofon untuk meniup lilin",
    "Bermain bersama atau fitur sosial",
    "Kustomisasi avatar mendalam",
    "Dunia luas dan banyak area baru",
    "Koleksi lintas-slot",
    "Notifikasi eksternal"
  ],
  "mvpBoundaries": {
    "calendarChapters": false,
    "completeMemoryGallery": false,
    "photobooth": false,
    "personalCamera": false,
    "microphoneInput": false,
    "multiplayer": false,
    "deepAvatarCustomization": false,
    "externalNotifications": false,
    "productionSlotRecovery": false
  },
  "openDecisions": [
    "Jumlah maksimum slot",
    "Zona waktu kanonis",
    "Definisi offline gameplay versus offline progression",
    "Parameter tanaman layu, pulih, dan mati",
    "Aturan replay prolog, side quest, mini game, dan chapter",
    "Cakupan surat, kenangan, dan hadiah dalam MVP",
    "Perilaku konflik save dan pilihan pemulihan",
    "Tahun pertama Chapter I dan Chapter II"
  ]
}
```

## Kesimpulan

PRD sudah cukup kuat sebagai rancangan produk, tetapi belum sepenuhnya konsisten sebagai kontrak implementasi\. Perbaikan paling penting adalah menyelaraskan:

- definisi MVP,
- cakupan Technical Design,
- U05 dan U12,
- status tablet dan desktop,
- aturan offline,
- aturan tanaman mati,
- replay,
- pemulihan,
- serta isi JSON\.

Setelah konflik P0 diselesaikan, dokumen dapat menjadi dasar Technical Design yang lebih aman dan tidak menimbulkan perbedaan tafsir antara produk, desain, engineering, dan QA\.