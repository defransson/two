var user1="";
var taskid="";
var couplename="";
var idnr;
$(document).ready(function() {
    	
    	
            couplename="test";
	listtasks();
    	init();
    	$("#addtask").hide();

    	$("#user1").click(function(){
    		list_user_tasks();
    		
    	});
    	$("#stats").click(function(){
    		chart_week();
    		init_click();
    		
    	});
    	$("#user2").click(function(){
    		
    		$("#commontodo").html("<img src='img/avatar.jpg'/>");
    	});
    	$("#toplogo").click(function(){
    		
    		listtasks();
    		$("a").removeClass("ui-btn-active");
    		$("#addtask").hide();
    	});
   
});
function listtasks(){
	
	
	$("#commontodo").load("https://www.kubary.se/two/php/listtasks.php",{couple:couplename});
}
function init_click(){
	user1="test1";
	
	$("#addtask").hide();
	$(".new").click(function(){
    		$("#addtask").toggle();
    		
    	});	
    	$(".opentask").click(function(){
    			taskid=$(this).attr('id');
    			$(this).find('.taskclaimer').toggle();
    			
    	});
    	$(".confirmtask").click(function(){
    		
    		grabtask();
    		listtasks();
    	});
    	$(".rejecttask").click(function(){
    		
    		$(this).parent().find('.taskclaimer').toggle();
    	});

    	$("#taskadder").click(function(){
		var desc = $('#description').val();
		var det = $('#details').val();
		if (desc!=''){
			$.post('https://www.kubary.se/two/php/addtask.php',
				{
					description: desc,
					details: det
					
				});
			listtasks();
		}

		else
			$('#descprompt').html(' This field needs a value!');
		
	});
    	$(".usertask").click(function(){
    			taskid=$(this).attr('id');
    			$(this).find('.taskfinisher').toggle();
    			
    	});
    	$(".finishtask").click(function(){
    		
    		finish_task();
    		list_user_tasks();
    	});
	$("#last_month").click(function(){
    		chart_month();
    		$("#last_month").css("text-decoration","underline");
    		$("#last_week").css("text-decoration","none");

    		
    	});
	$("#last_week").click(function(){
    		chart_week();
    		
    		
    	});
}
function grabtask(){
	
	$.post('https://www.kubary.se/two/php/grabtask.php',
				{
					name: user1,
					t_id: taskid
					
				});
	
}
function finish_task(){
	
	$.post('https://www.kubary.se/two/php/finishtask.php',
				{
					t_id: taskid
					
				});
	
}
function list_user_tasks(){
	$.ajax({
    		url: "https://www.kubary.se/two/php/listusertasks.php", 
    		success: function(result){
        			$("#commontodo").html(result);
    		}});
}
function chart_week(){
	$.ajax({
    		url: "https://www.kubary.se/two/php/chart_week.php", 
    		success: function(result){
        			$("#commontodo").html(result);
    		}});
}
function chart_month(){
	$.ajax({
    		url: "https://www.kubary.se/two/php/chart_month.php", 
    		success: function(result){
        			$("#commontodo").html(result);
    		}});
}
/*** Nedanstående funktion kontrollerar om enhetens är klar ***/
function init(){
   idnr = device.uuid;
      //testet();
      alert(idnr);
    document.addEventListener("deviceready", onDeviceReady, false);
}

/*** Nedanstående funktion läser in enhetens id och kör kontrollfunktionen testet ***/
function onDeviceReady() {
        
      idnr = device.uuid;
      //testet();
      alert(idnr);
      
    }