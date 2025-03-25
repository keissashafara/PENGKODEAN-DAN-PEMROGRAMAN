<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Gudang dan Penjualan</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <div class="container">
        <table>
            <tbody>
                <?php
                // Include database connection
                include 'config.php';  // Fixed typo from 'contig.php'
                
                // Query to fetch product data
                $sql = "SELECT * FROM produk";
                $result = $conn->query($sql);  // Fixed typo 'sq1' and variable name
                
                if ($result->num_rows > 0) {
                    // Table headers
                    echo "<tr>";
                    echo "<th>ID Produk</th>";
                    echo "<th>Nama Produk</th>";
                    echo "<th>Harga</th>";
                    echo "<th>Stok</th>";
                    echo "<th>Tanggal Masuk</th>";
                    echo "</tr>";
                    
                    // Table data
                    while ($row = $result->fetch_assoc()) {
                        echo "<tr>";
                        echo "<td>" . $row['id_produk'] . "</td>";
                        echo "<td>" . $row['nama_produk'] . "</td>";
                        echo "<td>Rp " . number_format($row['harga'], 2, ',', '.') . "</td>";
                        echo "<td>" . $row['stok'] . "</td>";
                        echo "<td>" . $row['tanggal_masuk'] . "</td>";
                        echo "</tr>";
                    }
                } else {
                    echo "<tr>";
                    echo "<td colspan='5'>Tidak ada data produk.</td>";
                    echo "</tr>";
                }
                
                // Close connection
                $conn->close();
                ?>
            </tbody>
        </table>
    </div>
    <script src="script.js"></script>
</body>
</html>