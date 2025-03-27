<?php
header('Content-Type: application/json');
include 'config.php';

try {
    $stmt = $pdo->query("
        SELECT p.id_penjualan, pl.nama_pelanggan, pr.nama_produk, dp.jumlah, dp.subtotal, p.tanggal_penjualan, p.status
        FROM penjualan p
        JOIN pelanggan pl ON p.id_pelanggan = pl.id_pelanggan
        JOIN detail_penjualan dp ON p.id_penjualan = dp.id_penjualan
        JOIN produk pr ON dp.id_produk = pr.id_produk
        ORDER BY p.tanggal_penjualan DESC
    ");
    $sales = $stmt->fetchAll(PDO::FETCH_ASSOC);
    echo json_encode($sales);
} catch (PDOException $e) {
    echo json_encode(['status' => 'error', 'message' => $e->getMessage()]);
}
?>