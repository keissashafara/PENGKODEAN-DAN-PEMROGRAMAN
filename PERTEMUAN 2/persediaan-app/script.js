document.addEventListener("DOMContentLoaded", function () {
    const formProduk = document.getElementById("formProduk");
    const namaProduk = document.getElementById("namaProduk");
    const hargaProduk = document.getElementById("hargaProduk");
    const stokProduk = document.getElementById("stokProduk");
    const tabelProduk = document.getElementById("tabelProduk");
    const pilihProduk = document.getElementById("pilihProduk");
    const formJual = document.getElementById("formJual");
    const jumlahJual = document.getElementById("jumlahJual");
    const riwayatPenjualan = document.getElementById("riwayatPenjualan");

    let produkList = [];

    // Fungsi untuk menampilkan produk di tabel
    function tampilkanProduk() {
        tabelProduk.innerHTML = "";
        pilihProduk.innerHTML = "";

        produkList.forEach((produk, index) => {
            let row = `
                <tr>
                    <td>${produk.nama}</td>
                    <td>Rp${produk.harga.toLocaleString()}</td>
                    <td>${produk.stok}</td>
                    <td>
                        <button class="btn-delete" onclick="hapusProduk(${index})">Hapus</button>
                    </td>
                </tr>
            `;
            tabelProduk.innerHTML += row;

            let option = `<option value="${index}">${produk.nama} (Rp${produk.harga.toLocaleString()})</option>`;
            pilihProduk.innerHTML += option;
        });
    }

    // Fungsi untuk menambah produk
    formProduk.addEventListener("submit", function (e) {
        e.preventDefault();
        let nama = namaProduk.value.trim();
        let harga = parseInt(hargaProduk.value);
        let stok = parseInt(stokProduk.value);

        if (nama && harga > 0 && stok > 0) {
            produkList.push({ nama, harga, stok });
            namaProduk.value = "";
            hargaProduk.value = "";
            stokProduk.value = "";
            tampilkanProduk();
        }
    });

    // Fungsi untuk menghapus produk
    window.hapusProduk = function (index) {
        produkList.splice(index, 1);
        tampilkanProduk();
    };

    // Fungsi untuk melakukan penjualan
    formJual.addEventListener("submit", function (e) {
        e.preventDefault();
        let index = parseInt(pilihProduk.value);
        let jumlah = parseInt(jumlahJual.value);

        if (produkList[index].stok >= jumlah && jumlah > 0) {
            produkList[index].stok -= jumlah;
            let totalHarga = jumlah * produkList[index].harga;

            let riwayat = `<li>${jumlah} x ${produkList[index].nama} (Total: Rp${totalHarga.toLocaleString()})</li>`;
            riwayatPenjualan.innerHTML += riwayat;

            tampilkanProduk();
        } else {
            alert("Stok tidak mencukupi atau jumlah tidak valid!");
        }

        jumlahJual.value = "";
    });
});
