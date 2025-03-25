<?php
header('Content-Type: application/json');
include 'config.php';

$data = json_decode(file_get_contents('php://input'), true);
$id = $_GET['id'];

$name = $data['name'];
$quantity = $data['quantity'];
$price = $data['price'];

try {
    $stmt = $pdo->prepare("UPDATE items SET name = ?, quantity = ?, price = ? WHERE id = ?");
    $stmt->execute([$name, $quantity, $price, $id]);
    echo json_encode(['status' => 'success']);
} catch (PDOException $e) {
    echo json_encode(['status' => 'error', 'message' => $e->getMessage()]);
}
?>