
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<?php
include 'connect.php'; /* Connects to DB */

//$id='2';
//$name='test1';
$id= stripslashes(mysqli_real_escape_string($con,$_POST['t_id']));

$sql = "UPDATE twotasks SET finished=1, date_finished=now() WHERE id= '$id' "; /* Update DB so that user gets task */
//$sql = "UPDATE twotasks SET date_finished=now() WHERE id= '$id' ";
if ($con->query($sql) === TRUE) {
    echo "Record updated successfully";
} else {
    echo "Error updating record: " . $conn->error;
}

?>