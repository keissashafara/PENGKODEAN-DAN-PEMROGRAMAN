document.addEventListener('DOMContentLoaded', () => {
    // Load items when the page loads
    fetchItems();

    // Handle form submission
    document.getElementById('itemForm').addEventListener('submit', async (e) => {
        e.preventDefault();

        const id = document.getElementById('itemId').value;
        const name = document.getElementById('name').value;
        const quantity = document.getElementById('quantity').value;
        const price = document.getElementById('price').value;

        const data = { name, quantity, price };

        try {
            if (id) {
                // Update item
                await fetch(`backend/update.php?id=${id}`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(data)
                });
            } else {
                // Add new item
                await fetch('backend/create.php', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(data)
                });
            }
            fetchItems();
            resetForm();
        } catch (error) {
            console.error('Error:', error);
        }
    });
});

// Fetch and display items
async function fetchItems() {
    try {
        const response = await fetch('backend/read.php');
        const items = await response.json();
        const tbody = document.getElementById('inventoryBody');
        tbody.innerHTML = '';

        items.forEach(item => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${item.id}</td>
                <td>${item.name}</td>
                <td>${item.quantity}</td>
                <td>$${parseFloat(item.price).toFixed(2)}</td>
                <td>
                    <button class="edit" onclick="editItem(${item.id}, '${item.name}', ${item.quantity}, ${item.price})">Edit</button>
                    <button class="delete" onclick="deleteItem(${item.id})">Delete</button>
                </td>
            `;
            tbody.appendChild(row);
        });
    } catch (error) {
        console.error('Error fetching items:', error);
    }
}

// Edit item
function editItem(id, name, quantity, price) {
    document.getElementById('itemId').value = id;
    document.getElementById('name').value = name;
    document.getElementById('quantity').value = quantity;
    document.getElementById('price').value = price;
}

// Delete item
async function deleteItem(id) {
    try {
        await fetch(`backend/delete.php?id=${id}`, { method: 'DELETE' });
        fetchItems();
    } catch (error) {
        console.error('Error deleting item:', error);
    }
}

// Reset form
function resetForm() {
    document.getElementById('itemForm').reset();
    document.getElementById('itemId').value = '';
}