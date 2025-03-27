<?php
header('Content-Type: application/json');
include 'config.php';

$id = $_GET['id'];

try {
    $stmt = $pdo->prepare("DELETE FROM produk WHERE id_produk = ?");
    $stmt->execute([$id]);
    echo json_encode(['status' => 'success']);
} catch (PDOException $e) {
    echo json_encode(['status' => 'error', 'message' => $e->getMessage()]);
}
?>