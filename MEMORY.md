# Codebase Memory & Log

## Struktur Codebase

`sawit-utils` adalah library Node.js/JavaScript berbasis modul (ESM) yang menyediakan fungsionalitas bantuan untuk berbagai kebutuhan (formatting, validasi, operasi string, scraping, dan utilities umum). Library ini dirancang agar kompatibel dengan npmjs maupun jsr.

Direktori & File Utama:
- `src/` : Menyimpan core dari module.
  - `format.js` : Menangani proses manipulasi tipe data berupa angka maupun ukuran data (ex: convertMsToDuration, formatSize, greeting, dll).
  - `string.js` : Manipulasi string termasuk menghitung kecocokan menggunakan jarak Levenshtein, dan escaping HTML untuk mencegah XSS.
  - `validation.js` : Berisi fungsionalitas pengecekan format maupun file (isURL, isWhatsAppURL, isMime*).
  - `index.js` : Main export, yang juga merangkap fungsi-fungsi generik seperti generateUID, getRandomElement, dan delay.
  - `scraper/igdl.js` : Berisi logic untuk melakukan fetch video (Instagram Reels downloader).
  - `types/igdl.d.ts` : Type definition untuk `igdl.js`.
  - `index.d.ts` : Source Typescript Definition dari semua tools yang diexport, untuk dikonsumsi oleh root `index.d.ts`.
- `tests/` : Menyimpan unit tests (vitest). Terdapat file `index.test.js`.
- `package.json` : Konfigurasi npm package termasuk dependensi `moment`, `moment-timezone` dan eksekutor test `vitest`.
- `jsr.json` : Konfigurasi untuk men-deploy module ini ke JSR Registry (`@indra87g/sawit-utils`).

## Pekerjaan yang Dilakukan

1. **Perbaikan Duplikasi dan Syntax Error**
   - Menghilangkan deklarasi ganda pada fungsi `formatSize` di `src/format.js`.
   - Membersihkan `src/index.js` dengan me-re-export semua fungsi dari modul internal (`format.js`, `string.js`, `validation.js`, dan `igdl.js`). Memastikan tak ada duplikat fungsi dan modul berjalan mulus tanpa error rolldown.

2. **JSDoc Documentation**
   - Menambahkan komentar berstandar JSDoc pada seluruh fungsi di `src/format.js`, `src/string.js`, `src/validation.js`, `src/scraper/igdl.js`, dan `src/index.js`.
   - JSDoc ini membantu dalam keterbacaan kode (maintainability) serta membantu proses IntelliSense di IDE bagi pengguna pustaka.

3. **Perbarui Type Definitions (.d.ts)**
   - Menulis ulang `src/index.d.ts` untuk merepresentasikan secara lengkap setiap fungsi yang tersedia dan di-export (termasuk referensi tipe untuk output `igdl`).
   - Menyalin `src/index.d.ts` ke root `index.d.ts` (yang di-referensikan oleh `package.json` dan `jsr.json`).

4. **Pembuatan Unit Tests (Vitest)**
   - Menulis kembali unit test untuk memverifikasi fungsionalitas seperti `convertMsToDuration`, `formatSize`, `toTime`, `levenshtein`, `escapeHTML`, URL validasi, dll.
   - Mengubah scripts test pada `package.json` menjadi `"vitest run tests"`.
   - Menghapus folder duplikat `src/tests`.

5. **Kesiapan Publikasi (npm & jsr)**
   - Codebase kini clean (bebas error), fully typed, documented, serta dilengkapi dengan comprehensive test suite sehingga publikasi di kedua platform tidak akan terhambat oleh error format, syntax, maupun tipe.

## 2024-05-18 — Fixing Coverage for sawit-utils
**Context:** Added extensive vitest coverage for edge cases across the codebase as instructed by AGENTS.md.
**Finding:** Tested edge cases like empty queries for `findTopSuggestions`, invalid regex pattern matching logic in `igdl`, different hour ranges in `greeting`, and looping bounds for `formatSize`. Code handles edge cases gracefully, but testing Instagram scraping required intercepting execution flow logically to simulate success/error.
**Impact:** `test-coverage.md` is updated and tests are far more robust. Test numbers will be used for the webhook request.
