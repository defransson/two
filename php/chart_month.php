<?php
echo"<div id='chartlabel'><p ><span id='last_week'>Last week</span> - <span id='last_month'>Last month</span></p></div>";
include 'connect.php'; 
$couple="test";
$user1="test1";
$user2="test2";
$data = mysqli_query($con,"SELECT * FROM twotasks WHERE (couple ='$couple' ) ORDER BY date_of_creation DESC");
 

$tasks1=array();
$finished1=array();
$tasks2=array();
$finished2=array();
for($i=0;$i<=29;$i++){
	$tasks1[$i]=0;
	$tasks2[$i]=0;
	$finished1[$i]=0;
	$finished2[$i]=0;
	}


 while($info = mysqli_fetch_array( $data )) 
 {
 	if($info['user']==$user1){
 		for($i=0;$i<=29;$i++){
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
 		for($i=0;$i<=29;$i++){
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

echo"<canvas id='myChart' width='300' height='350'></canvas>
		<script>
			
			var data = {
			    labels: [";
			            for($i=29;$i>=0;$i--)
			            {
			            	echo "'".$i." days ago',";
			            }
			            echo"],
			    datasets: [
			        {
			            label: 'User 1 picked',
			            fillColor: '#fff',
			            strokeColor: '#a6c69d',
			            pointColor: '#a6c69d',
			            pointStrokeColor: '#fff',
			            pointHighlightFill: '#fff',
			            pointHighlightStroke: 'rgba(220,220,220,1)',
			            data: [";
			            for($i=29;$i>=0;$i--)
			            {
			            	echo $tasks1[$i].",";
			            }
			            echo"]
			        },
			        {
			           label: 'User 1 finished',
			            fillColor: 'rgba(151,187,205,0.2)',
			            strokeColor: '#DBE8D8',
			            pointColor: 'rgba(151,187,205,1)',
			            pointStrokeColor: '#fff',
			            pointHighlightFill: '#fff',
			            pointHighlightStroke: 'rgba(151,187,205,1)',
			            data: [";
			            for($i=29;$i>=0;$i--)
			            {
			            	echo $finished1[$i].",";
			            }
			            echo"]
			        },
			   
			{
			            label: 'User 2 picked',
			            fillColor: 'rgba(220,220,220,0.2)',
			            strokeColor: '#f37545',
			            pointColor: 'rgba(220,220,220,1)',
			            pointStrokeColor: '#fff',
			            pointHighlightFill: '#fff',
			            pointHighlightStroke: 'rgba(220,220,220,1)',
			            data: [";
			            for($i=29;$i>=0;$i--)
			            {
			            	echo $tasks2[$i].",";
			            }
			            echo"]
			        },
			        {
			            label: 'User 2 finished',
			            fillColor: 'rgba(151,187,205,0.2)',
			            strokeColor: '#F9BAA2',
			            pointColor: 'rgba(151,187,205,1)',
			            pointStrokeColor: '#fff',
			            pointHighlightFill: '#fff',
			            pointHighlightStroke: 'rgba(151,187,205,1)',
			            data: [";
			            for($i=29;$i>=0;$i--)
			            {
			            	echo $finished2[$i].",";
			            }
			            echo"]
			        }
			    ]
			};
			var options={
				pointDot : false,
				datasetFill : false,
				bezierCurve : false
			};
			var ctx = document.getElementById('myChart').getContext('2d');
			//var myLineChart = new Chart(ctx).Line(data, options);
			var myLineChart = new Chart(ctx).Line(data);
			init_click();
			$('#last_week').css('text-decoration','none');
    			$('#last_month').css('text-decoration','underline');
		</script>";
?>