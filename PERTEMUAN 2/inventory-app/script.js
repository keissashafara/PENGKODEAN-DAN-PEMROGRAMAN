document.addEventListener("DOMContentLoaded", () => {
    let inventory = [];

    const addItemForm = document.getElementById("addItemForm");
    const sellItemForm = document.getElementById("sellItemForm");
    const inventoryList = document.getElementById("inventoryList");
    const sellItemName = document.getElementById("sellItemName");

    // Tambah Barang ke Persediaan
    addItemForm.addEventListener("submit", (e) => {
        e.preventDefault();

        const name = document.getElementById("itemName").value;
        const stock = parseInt(document.getElementById("itemStock").value);
        const price = parseFloat(document.getElementById("itemPrice").value);

        if (!name || stock <= 0 || price <= 0) {
            alert("Mohon isi data dengan benar!");
            return;
        }

        // Cek apakah barang sudah ada
        const existingItem = inventory.find(item => item.name === name);
        if (existingItem) {
            existingItem.stock += stock;  // Update stok jika barang sudah ada
        } else {
            inventory.push({ name, stock, price });
        }

        updateInventoryTable();
        addItemForm.reset();
    });

    // Update Tabel Persediaan
    function updateInventoryTable() {
        inventoryList.innerHTML = "";
        sellItemName.innerHTML = "";

        inventory.forEach((item, index) => {
            let row = `<tr>
                <td>${item.name}</td>
                <td>${item.stock}</td>
                <td>Rp ${item.price.toLocaleString()}</td>
                <td>
                    <button class="delete-btn" onclick="deleteItem(${index})">Hapus</button>
                </td>
            </tr>`;
            inventoryList.innerHTML += row;

            let option = `<option value="${index}">${item.name}</option>`;
            sellItemName.innerHTML += option;
        });
    }

    // Hapus Barang dari Persediaan
    window.deleteItem = function(index) {
        inventory.splice(index, 1);
        updateInventoryTable();
    };

    // Proses Penjualan
    sellItemForm.addEventListener("submit", (e) => {
        e.preventDefault();

        const itemIndex = parseInt(sellItemName.value);
        const quantity = parseInt(document.getElementById("sellQuantity").value);

        if (isNaN(itemIndex) || isNaN(quantity) || quantity <= 0) {
            alert("Masukkan jumlah yang valid!");
            return;
        }

        if (inventory[itemIndex].stock < quantity) {
            alert("Stok tidak mencukupi!");
            return;
        }

        inventory[itemIndex].stock -= quantity;
        if (inventory[itemIndex].stock === 0) {
            inventory.splice(itemIndex, 1);
        }

        updateInventoryTable();
        sellItemForm.reset();
    });

    // Inisialisasi tampilan tabel kosong
    updateInventoryTable();
});

