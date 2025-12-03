/**
Copyright (c) [2025] [Kafid Renaldo]
Filename: index.js
*/



// === Variabel Global ===
const buttonIDs = ['button', 'button1', 'button2', 'playButton']; // Urutan tombol yang akan muncul
let currentButtonIndex = 0; // Index tombol saat ini

// === Elemen DOM (agar mudah diakses) ===
const surpriseContainer = document.getElementById('surpriseContainer');
const birthdaySong = document.getElementById('birthdaySong');

// Mendapatkan elemen tombol-tombol
const buttons = buttonIDs.map(id => document.getElementById(id)).filter(el => el);

// === Fungsi Utilitas ===

/**
 * Menghitung posisi acak (top dan left) untuk tombol di dalam viewport
 * @returns {object} Objek dengan properti 'top' dan 'left' dalam persentase
 */
function getRandomPosition() {
    // Kita buat posisi acak dari 10% sampai 80% dari lebar/tinggi viewport<script src="https://cdnjs.cloudflare.com/ajax/libs/bootstrap/5.3.8/js/bootstrap.min.js" integrity="sha512-nKXmKvJyiGQy343jatQlzDprflyB5c+tKCzGP3Uq67v+lmzfnZUi/ZT+fc6ITZfSC5HhaBKUIvr/nTLCV+7F+Q==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>

    // Agar tombol tidak terpotong di tepi.
    const randomTop = Math.random() * 70 + 10; // 10% sampai 80%
    const randomLeft = Math.random() * 70 + 10; // 10% sampai 80%
    
    return {
        top: `${randomTop}vh`, // vh = viewport height
        left: `${randomLeft}vw` // vw = viewport width
    };
}

/**
 * Menyembunyikan tombol saat ini dan menampilkan tombol berikutnya di posisi acak.
 * Dipanggil saat tombol diklik.
 * @param {HTMLElement} clickedButton Tombol yang baru saja diklik
 */
function advanceSequence(clickedButton) {
    // 1. Sembunyikan tombol yang diklik
    clickedButton.style.display = 'none';

    // 2. Maju ke tombol berikutnya
    currentButtonIndex++;

    // 3. Cek apakah urutan sudah selesai (tombol terakhir adalah playButton)
    if (currentButtonIndex >= buttons.length) {
        // Ini seharusnya tidak terjadi jika kita sudah ada di playButton
        alert("Urutan tombol selesai.");
        return;
    }

    // 4. Ambil tombol berikutnya
    const nextButton = buttons[currentButtonIndex];

    // 5. Hitung dan terapkan posisi acak
    const newPosition = getRandomPosition();
    nextButton.style.top = newPosition.top;
    nextButton.style.left = newPosition.left;

    // 6. Tampilkan tombol berikutnya
    nextButton.style.display = 'block';

    // 7. Tambahkan event listener untuk tombol berikutnya
    // Jika tombol berikutnya adalah playButton, kita tidak perlu menambahkan advanceSequence
    // karena sudah ada onclick="playSurprise()" di HTML-nya.
    if (nextButton.id !== 'playButton') {
        // Hapus listener lama jika ada (untuk jaga-jaga)
        nextButton.removeEventListener('click', handleButtonClick);
        // Tambahkan listener baru
        nextButton.addEventListener('click', handleButtonClick);
    }
}

/**
 * Event Handler universal untuk tombol yang bergerak
 */
function handleButtonClick(event) {
    advanceSequence(event.target);
}


/**
 * Fungsi inisialisasi urutan tombol.
 * Dipanggil saat halaman selesai dimuat.
 */
function initializeButtons() {
    // 1. Tampilkan tombol pertama ('button1') di posisi acak
    if (buttons.length > 0) {
        const firstButton = buttons[0];
        const newPosition = getRandomPosition();
        firstButton.style.top = newPosition.top;
        firstButton.style.left = newPosition.left;
        firstButton.style.display = 'block';

        // 2. Tambahkan event listener ke tombol pertama
        if (firstButton.id !== 'playButton') {
            firstButton.addEventListener('click', handleButtonClick);
        }
    }
}


// === Fungsi Kejutan (diambil dari kode aslimu, tapi diperbarui) ===

function playSurprise() {

// Sembunyikan tombol playButton yang terakhir
    const playButton = document.getElementById('playButton');
    if (playButton) {
        playButton.style.display = 'none';
    }

    // Tampilkan div.container (Konten Kejutan)
    if (surpriseContainer) {
        surpriseContainer.style.display = 'block';
    }

    // Coba putar musik (kode aslimu)
    if (birthdaySong) {
        birthdaySong.play()
        .then(() => {
            alert("Selamat Ulang Tahun🎉🎉");
            // Tidak perlu sembunyikan tombol lagi karena sudah disembunyikan di awal fungsi
        })
        .catch(error => {
            // Gagal putar (mungkin karena belum ada interaksi pengguna)
            alert("Gagal memutar audio:", error);
            // Biarkan tombol playButton tetap ada agar pengguna bisa klik lagi
            // TAPI, karena kita sudah menyembunyikannya, lebih baik kita munculkan lagi
            if (playButton) {
                playButton.style.display = 'block';
            }
            // TAMPILKAN ALERT:
            alert("Gagal memutar audio secara otomatis. Klik OK untuk mencoba lagi! (Mungkin perlu diulang dulu)");
            
            // Sembunyikan container jika gagal putar musik
            if (surpriseContainer) {
                surpriseContainer.style.display = 'none';
            }
        });
    }
}
// Mulai urutan tombol setelah halaman dimuat
window.onload = initializeButtons;

// Hapus fungsi playSurprise() yang mungkin kamu miliki sebelumnya di sini
