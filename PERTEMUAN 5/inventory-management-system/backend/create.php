<?php
header('Content-Type: application/json');
include 'config.php';

$data = json_decode(file_get_contents('php://input'), true);

$name = $data['name'];
$quantity = $data['quantity'];
$price = $data['price'];

try {
    $stmt = $pdo->prepare("INSERT INTO items (name, quantity, price) VALUES (?, ?, ?)");
    $stmt->execute([$name, $quantity, $price]);
    echo json_encode(['status' => 'success']);
} catch (PDOException $e) {
    echo json_encode(['status' => 'error', 'message' => $e->getMessage()]);
}
?>