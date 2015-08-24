
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<?php
include 'connect.php'; /* Connects to DB */

//$id='2';
//$name='test1';
$id= stripslashes(mysqli_real_escape_string($con,$_POST['t_id']));
$name= stripslashes(mysqli_real_escape_string($con,$_POST['name']));
$sql = "UPDATE twotasks SET user='$name', date_claimed=now() WHERE id= '$id' "; /* Update DB so that user gets task */

if ($con->query($sql) === TRUE) {
    echo "Record updated successfully";
} else {
    echo "Error updating record: " . $conn->error;
}

?>