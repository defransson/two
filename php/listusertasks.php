<?php
include 'connect.php'; 
$couple="test";
$user="test1";
$data = mysqli_query($con,"SELECT * FROM twotasks WHERE (couple ='$couple' AND user ='$user' AND finished=0) ORDER BY date_of_creation DESC");
 echo"<ul id='maintodo'>";

				
 while($info = mysqli_fetch_array( $data )) 
 {
 	echo "<li  class='usertask' id='".$info['id']."'>".$info['description']."<ul class='taskfinisher'><li><form>mark task as finished?<br>
 		<span class='finishtask' >Yes &nbsp;</span>
 		<span class='keeptask' >No</span>
 		</form></li></ul></li>";
 	
 }
echo"</ul>";
echo"<script>$('.taskfinisher').hide();init_click();</script>"
?>
