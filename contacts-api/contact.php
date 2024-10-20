<?php
header('Content-Type: application/json');
header("Access-Control-Allow-Origin: *");

class User {
    private $conn;

    public function __construct() {
        include 'connection-pdo.php'; // Include database connection
        $this->conn = $conn;
    }

    private function closeConnection() {
        $this->conn = null;
    }

    public function getOwner($json) {
        $sql = "SELECT 
        tblcontacts.contact_id,
        tblcontacts.contact_name,
        tblcontacts.contact_phone,
        tblcontacts.contact_email,
        tblcontacts.contact_address,
        tblcontacts.contact_image,
        tblgroups.grp_name,
        tblusers.usr_fullname
    FROM 
        tblcontacts
    INNER JOIN 
        tblgroups ON tblcontacts.contact_group = tblgroups.grp_id
    INNER JOIN 
        tblusers ON tblcontacts.contact_userId = tblusers.usr_id;
    ";
        $stmt = $this->conn->prepare($sql);
        $stmt->execute();
        $returnValue = $stmt->fetchAll(PDO::FETCH_ASSOC);
        $this->closeConnection();
        return json_encode($returnValue);
    }

    public function deleteOwner($json) {
        $json = json_decode($json, true);
        $sql = "DELETE FROM tblcontacts WHERE contact_id = :owner_id";
        $stmt = $this->conn->prepare($sql);
        $stmt->bindParam(':owner_id', $json['owner_id']);
        $stmt->execute();
        $returnValue = $stmt->rowCount() > 0 ? 1 : 0;
        $this->closeConnection();
        return json_encode($returnValue);
    }
}

if ($_SERVER['REQUEST_METHOD'] == 'GET') {
    $operation = $_GET['operation'];
    $json = $_GET['json'];
} elseif ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $operation = $_POST['operation'];
    $json = $_POST['json'];
}

$user = new User();
switch ($operation) {
    case "getOwner":
        echo $user->getOwner($json);
        break;
    case "deleteOwner":
        echo $user->deleteOwner($json);
        break;
    default:
        echo json_encode(['error' => 'Invalid operation']);
        break;
}
?>
