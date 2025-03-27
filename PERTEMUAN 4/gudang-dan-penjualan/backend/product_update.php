<?php
header('Content-Type: application/json');
include 'config.php';

$data = json_decode(file_get_contents('php://input'), true);
$id = $_GET['id'];

if (!isset($data['nama_produk']) || !isset($data['harga']) || !isset($data['stok'])) {
    echo json_encode(['status' => 'error', 'message' => 'Missing required fields']);
    exit();
}

$nama_produk = $data['nama_produk'];
$harga = $data['harga'];
$stok = $data['stok'];
$deskripsi = $data['deskripsi'] ?? null;

try {
    $stmt = $pdo->prepare("UPDATE produk SET nama_produk = ?, harga = ?, stok = ?, deskripsi = ? WHERE id_produk = ?");
    $stmt->execute([$nama_produk, $harga, $stok, $deskripsi, $id]);
    echo json_encode(['status' => 'success']);
} catch (PDOException $e) {
    echo json_encode(['status' => 'error', 'message' => $e->getMessage()]);
}
?>