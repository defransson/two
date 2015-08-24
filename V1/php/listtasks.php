<?php
include 'connect.php'; 
//$couple="test";
$couple= stripslashes(mysqli_real_escape_string($con,$_POST['couple']));
$data = mysqli_query($con,"SELECT * FROM twotasks WHERE (couple ='$couple' AND user is null) ORDER BY date_of_creation DESC");
 echo"<ul id='maintodo'>";

echo"<li class='new'>+ new to do</li>";
echo"
<li id='addtask'>
	<form >
		Add a new task:<br>
		Description:<br><div id='descprompt'></div><input id='description' type='text'><br>
		Details:<br><input id='details' type='text'><br>
		<input type='button' id='taskadder' value='Add task'></input>
	</form>
</li>
";
				
 while($info = mysqli_fetch_array( $data )) 
 {
 	echo "<li class='opentask' id='".$info['id']."'>".$info['description']."
 		<ul class='taskclaimer'><li><form>Claim task?<br>
 		<span class='confirmtask' >Yes &nbsp;</span>
 		<span class='rejecttask' >No</span>
 		</form></li></ul>
 	</li>";
 	
 }
echo"</ul>";
echo"<script>$('.taskclaimer').hide(); init_click();</script>";
?>
