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

## 2024-05-21 — Fixed `escapeHTML` and Documented `request.js` & `looksLikeCode`
**Context:** Working to fix the failing `escapeHTML` test, and thoroughly document the codebase (`request.js` and `looksLikeCode` in `string.js`).
**Finding:** Typo in `src/string.js` export (`escapeHtml` instead of `escapeHTML`). Tests couldn't use CommonJS `require` since it's an ESM module (Vitest throws SyntaxError), so we used ES Modules `import * as`. `looksLikeCode` successfully identifies programming patterns, and the `request.js` functions were documented with JSDoc and their types exposed in `src/index.d.ts`.
**Impact:** `test-coverage.md` is updated. 36 out of 36 tests pass. The codebase remains publish-ready for JSR/npm.

## 2024-05-31 — Documentation and Typings update for parsing, request, array and watcher
**Context:** The codebase lacked JSDoc and up-to-date typings for recently introduced code in `src/request.js`, `src/parsing.js`, `src/array.js`, and `src/watcher.js`. Additionally, a test assertion in `tests/index.test.js` failed due to moving standalone request wrapper exports into a class based `api` instance.
**Finding:** Typings (`.d.ts`) need to manually reflect classes and their methods carefully (e.g. `export class ApiClient {...}; export const api: ApiClient`). The Vitest tests had to be updated to evaluate `api.request` instead of `request` since they were moved. I also encountered a limitation where attempting to use `require` in commonJS scripts via CLI fails because this is an ES module package (needed to run them with `.cjs` extensions).
**Impact:** 36 tests pass again successfully. Code coverage metrics are fully tracked, and JSDoc is present, increasing maintainability and fulfilling JSR publishing expectations.

## 2024-05-31 — Modular Test Suite Migration
**Context:** `tests/index.test.js` became too large and unmanageable, mixing various modules' coverage.
**Finding:** Test files were modularized into `format.test.js`, `string.test.js`, `validation.test.js`, `index_exports.test.js`, `igdl.test.js`, and `request.test.js`. Care was required when re-importing test utilities to replace references to monolithic file variables with their module-specific namespaces.
**Impact:** Maintained 100% test passing rate (36 total tests) and coverage, while making the codebase testing suite modular, cleaner, and easier to scale.
