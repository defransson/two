<?php
include 'connect.php'; 
$couple="test";
$user1="test1";
$user2="test2";
$data = mysqli_query($con,"SELECT * FROM twotasks WHERE (couple ='$couple' ) ORDER BY date_of_creation DESC");
 

$tasks1=array(0,0,0,0,0,0,0);
$finished1=array(0,0,0,0,0,0,0);
$tasks2=array(0,0,0,0,0,0,0);
$finished2=array(0,0,0,0,0,0,0);


 while($info = mysqli_fetch_array( $data )) 
 {
 	if($info['user']==$user1){
 		for($i=0;$i<=6;$i++){
			$dateset=date("Y-m-d", strtotime('-'.$i.'days'));
			$olddate=date($info['date_claimed']);
			if ($olddate==$dateset){
 				$tasks1[$i]++;
 			}
 			$olddate=date($info['date_finished']);
			if ($olddate==$dateset){
				if($info['finished']==1)
 					$finished1[$i]++;
 			}
 		}
 	}
 	else
 	if($info['user']==$user2){
 		for($i=0;$i<=6;$i++){
			$dateset=date("Y-m-d", strtotime('-'.$i.'days'));
			$olddate=date($info['date_claimed']);
			if ($olddate==$dateset){
 				$tasks2[$i]++;
 			}
			$olddate=date($info['date_finished']);
			if ($olddate==$dateset){
				if($info['finished']==1)
 					$finished2[$i]++;
 			}
 		}
 	}
 }
for($i=0;$i<=6;$i++){
	echo $tasks1[$i]." ".$finished1[$i]." ";
}
echo"<br>";
for($i=0;$i<=6;$i++){
	echo $tasks2[$i]." ".$finished2[$i]." ";
}
?>
 