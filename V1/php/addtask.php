
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<?php
include 'connect.php'; /* Connects to DB */

//$description='Take out the thrash';
//$details='Do not forget plastic';
$couple='test';
$description= stripslashes(mysqli_real_escape_string($con,$_POST['description']));
$details= stripslashes(mysqli_real_escape_string($con,$_POST['details']));
$sql = "INSERT INTO twotasks (description, details, couple) VALUES ('$description','$details', '$couple')"; /* Update DB so that user gets task */

if ($con->query($sql) === TRUE) {
    echo "Record updated successfully";
} else {
    echo "Error updating record: " . $conn->error;
}

?>