<?php
 function getConnection() {
    return  mysqli_connect(getenv('PB_SERVER_NAME'), getenv('PB_USER_NAME'), getenv('PB_DATABASE_PASSWORD'), getenv('PB_DATABASE_NAME'));
}

?>