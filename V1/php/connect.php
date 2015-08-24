<?php
// Connects to database 
 $con=mysqli_connect("kubary.se.mysql","kubary_se","whWNb23K","kubary_se");
// Check connection
if (mysqli_connect_errno())
  {
  echo "Failed to connect to MySQL: " . mysqli_connect_error();
  }
?>