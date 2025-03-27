<?php
header('Content-Type: application/json');
include 'config.php';

$data = json_decode(file_get_contents('php://input'), true);

if (!isset($data['id_pelanggan']) || !isset($data['id_produk']) || !isset($data['jumlah'])) {
    echo json_encode(['status' => 'error', 'message' => 'Missing required fields']);
    exit();
}

$id_pelanggan = $data['id_pelanggan'];
$id_produk = $data['id_produk'];
$jumlah = $data['jumlah'];
$tanggal_penjualan = date('Y-m-d');

try {
    // Check product stock
    $stmt = $pdo->prepare("SELECT stok, harga FROM produk WHERE id_produk = ?");
    $stmt->execute([$id_produk]);
    $product = $stmt->fetch(PDO::FETCH_ASSOC);

    if (!$product) {
        echo json_encode(['status' => 'error', 'message' => 'Product not found']);
        exit();
    }

    if ($product['stok'] < $jumlah) {
        echo json_encode(['status' => 'error', 'message' => 'Insufficient stock']);
        exit();
    }

    $harga_satuan = $product['harga'];
    $subtotal = $jumlah * $harga_satuan;

    // Start transaction
    $pdo->beginTransaction();

    // Create sale
    $stmt = $pdo->prepare("INSERT INTO penjualan (id_pelanggan, tanggal_penjualan, total_harga, status) VALUES (?, ?, ?, 'selesai')");
    $stmt->execute([$id_pelanggan, $tanggal_penjualan, $subtotal]);
    $id_penjualan = $pdo->lastInsertId();

    // Create sale detail
    $stmt = $pdo->prepare("INSERT INTO detail_penjualan (id_penjualan, id_produk, jumlah, harga_satuan) VALUES (?, ?, ?, ?)");
    $stmt->execute([$id_penjualan, $id_produk, $jumlah, $harga_satuan]);

    // Update product stock
    $new_stock = $product['stok'] - $jumlah;
    $stmt = $pdo->prepare("UPDATE produk SET stok = ? WHERE id_produk = ?");
    $stmt->execute([$new_stock, $id_produk]);

    $pdo->commit();
    echo json_encode(['status' => 'success']);
} catch (PDOException $e) {
    $pdo->rollBack();
    echo json_encode(['status' => 'error', 'message' => $e->getMessage()]);
}
?>