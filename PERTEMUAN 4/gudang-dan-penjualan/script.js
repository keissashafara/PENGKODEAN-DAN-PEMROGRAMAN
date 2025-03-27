document.addEventListener('DOMContentLoaded', () => {
    // Load initial data
    fetchProducts();
    fetchSales();
    fetchCustomers();
    fetchProductsForSale();

    // Handle product form submission
    document.getElementById('productForm').addEventListener('submit', async (e) => {
        e.preventDefault();

        const id = document.getElementById('productId').value;
        const name = document.getElementById('productName').value;
        const price = document.getElementById('productPrice').value;
        const stock = document.getElementById('productStock').value;
        const description = document.getElementById('productDescription').value;

        const data = { nama_produk: name, harga: price, stok: stock, deskripsi: description };

        try {
            let response;
            if (id) {
                // Update product
                response = await fetch(`backend/product_update.php?id=${id}`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(data)
                });
            } else {
                // Add new product
                response = await fetch('backend/product_create.php', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(data)
                });
            }

            const result = await response.json();
            if (result.status === 'success') {
                fetchProducts();
                fetchProductsForSale();
                document.getElementById('productForm').reset();
                document.getElementById('productId').value = '';
            } else {
                alert('Error: ' + result.message);
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Failed to save product. Check console for details.');
        }
    });

    // Handle sale form submission
    document.getElementById('saleForm').addEventListener('submit', async (e) => {
        e.preventDefault();

        const customerId = document.getElementById('saleCustomer').value;
        const productId = document.getElementById('saleProduct').value;
        const quantity = document.getElementById('saleQuantity').value;

        const data = { id_pelanggan: customerId, id_produk: productId, jumlah: quantity };

        try {
            const response = await fetch('backend/sales_create.php', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            });

            const result = await response.json();
            if (result.status === 'success') {
                fetchSales();
                fetchProducts();
                fetchProductsForSale();
                document.getElementById('saleForm').reset();
            } else {
                alert('Error: ' + result.message);
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Failed to create sale. Check console for details.');
        }
    });
});

// Fetch and display products
async function fetchProducts() {
    try {
        const response = await fetch('backend/product_read.php');
        const products = await response.json();
        const tbody = document.getElementById('productBody');
        tbody.innerHTML = '';

        products.forEach(product => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${product.id_produk}</td>
                <td>${product.nama_produk}</td>
                <td>Rp ${parseFloat(product.harga).toLocaleString('id-ID')}</td>
                <td>${product.stok}</td>
                <td>${product.deskripsi || '-'}</td>
                <td>
                    <button class="edit" onclick="editProduct(${product.id_produk}, '${product.nama_produk}', ${product.harga}, ${product.stok}, '${product.deskripsi || ''}')">Edit</button>
                    <button class="delete" onclick="deleteProduct(${product.id_produk})">Delete</button>
                </td>
            `;
            tbody.appendChild(row);
        });
    } catch (error) {
        console.error('Error fetching products:', error);
    }
}

// Fetch products for sale dropdown
async function fetchProductsForSale() {
    try {
        const response = await fetch('backend/product_read.php');
        const products = await response.json();
        const select = document.getElementById('saleProduct');
        select.innerHTML = '<option value="">Select Product</option>';

        products.forEach(product => {
            const option = document.createElement('option');
            option.value = product.id_produk;
            option.textContent = `${product.nama_produk} (Stock: ${product.stok})`;
            select.appendChild(option);
        });
    } catch (error) {
        console.error('Error fetching products for sale:', error);
    }
}

// Fetch and display sales
async function fetchSales() {
    try {
        const response = await fetch('backend/sales_read.php');
        const sales = await response.json();
        const tbody = document.getElementById('salesBody');
        tbody.innerHTML = '';

        sales.forEach(sale => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${sale.id_penjualan}</td>
                <td>${sale.nama_pelanggan}</td>
                <td>${sale.nama_produk}</td>
                <td>${sale.jumlah}</td>
                <td>Rp ${parseFloat(sale.subtotal).toLocaleString('id-ID')}</td>
                <td>${sale.tanggal_penjualan}</td>
                <td>${sale.status}</td>
            `;
            tbody.appendChild(row);
        });
    } catch (error) {
        console.error('Error fetching sales:', error);
    }
}

// Fetch customers for sale dropdown
async function fetchCustomers() {
    try {
        const response = await fetch('backend/customer_read.php');
        const customers = await response.json();
        const select = document.getElementById('saleCustomer');
        select.innerHTML = '<option value="">Select Customer</option>';

        customers.forEach(customer => {
            const option = document.createElement('option');
            option.value = customer.id_pelanggan;
            option.textContent = customer.nama_pelanggan;
            select.appendChild(option);
        });
    } catch (error) {
        console.error('Error fetching customers:', error);
    }
}

// Edit product
function editProduct(id, name, price, stock, description) {
    document.getElementById('productId').value = id;
    document.getElementById('productName').value = name;
    document.getElementById('productPrice').value = price;
    document.getElementById('productStock').value = stock;
    document.getElementById('productDescription').value = description;
}

// Delete product
async function deleteProduct(id) {
    try {
        await fetch(`backend/product_delete.php?id=${id}`, { method: 'DELETE' });
        fetchProducts();
        fetchProductsForSale();
    } catch (error) {
        console.error('Error deleting product:', error);
    }
}