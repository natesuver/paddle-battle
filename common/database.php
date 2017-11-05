<?php
 function getConnection() {
    return  mysqli_connect(getenv('PB_SERVER_NAME'), getenv('PB_USER_NAME'), getenv('PB_DATABASE_PASSWORD'), getenv('PB_DATABASE_NAME'));
}

function execResults($sql) {
    $conn = getConnection();
    $data = array();
    $result = $conn->query($sql);

    while($row =$result->fetch_assoc()) {
    array_push($data, $row);
    }
    $conn->close();
    return $data;
}

function getSingleResult($sql) {
    $conn = getConnection();
    $result = $conn->query($sql);
    if (!$result) {
        throw new Exception("Database Error [{$conn->errno}] {$conn->error}");
    }
    $data = $result->fetch_assoc();
    $conn->close();
    return $data;
}

function cleanupDBResources($conn, $res) {
    $conn->close();
    $res->close();
}

function outputError($resource) {
    if (!$resource) {
        $data = array(
			'isValid'=> false,
			'feedback'=> "Ut-oh! Something went wrong. We're really embarrassed now."
            );
        echo json_encode($data);
        return false;
        exit;
    }
}
?>