<?php
header('Content-Type: application/json');
include 'config.php';

try {
    $stmt = $pdo->query("SELECT * FROM gudang ORDER BY nama_gudang");
    $warehouses = $stmt->fetchAll(PDO::FETCH_ASSOC);
    echo json_encode($warehouses);
} catch (PDOException $e) {
    echo json_encode(['status' => 'error', 'message' => $e->getMessage()]);
}
?>