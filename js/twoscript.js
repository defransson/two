var user1="";
var user2="";
var taskid="";
var couplename="";
var idnr;
var color='0';
$(document).ready(function() {
    	
    	
            couplename="test";
	//listtasks();
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
                $("#loginbutton").click(function(){
                   /*$.ajax({
                    url: "https://www.kubary.se/two/php/loginform.php", 
                    success: function(result){
                            $("#commontodo").html(result);
                    }});*/
                    //$("#commontodo").html("result");
                    loginform();
            });
                $("#checkloginbutton").click(function(){
                    checklogin();
             });
            $("#registerbutton").click(function(){
                    $("#commontodo").load("https://www.kubary.se/two/php/addform.php");
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
                            data:{user: user1, couple: couplename},
    		success: function(result){
        			$("#commontodo").html(result);
    		}});
}
function chart_week(){
	$.ajax({
    		url: "https://www.kubary.se/two/php/chart_week.php", 
                            data:{usera: user1, userb:user2, couple: couplename},
    		success: function(result){
        			$("#commontodo").html(result);
    		}});
}
function chart_month(){
	$.ajax({
    		url: "https://www.kubary.se/two/php/chart_month.php", 
                            data:{usera: user1, userb:user2, couple: couplename},
    		success: function(result){
        			$("#commontodo").html(result);
    		}});
}
function testet(){
    $("#commontodo").load("https://www.kubary.se/two/php/finduser.php",{uuid:idnr});
    init_click();
    $("#deviceProperties").hide();
    
}
/*** Nedanstående funktion kontrollerar om enhetens är klar ***/
function init(){
  // idnr = device.uuid;
      //testet();
      //alert(idnr);
    document.addEventListener("deviceready", onDeviceReady, false);
}

/*** Nedanstående funktion läser in enhetens id och kör kontrollfunktionen testet ***/
function onDeviceReady() {
        
      idnr = device.uuid;
      testet();
      
      
    }
    function loginform(){
        $("#commontodo").html("<form> <label for='myusername'>Email</label> <input name='myusername' type='text' id='myusername' maxlength='30' autocomplete='off'><p id='userremind'>Please input email</p> <br><label for='mypassword'>Password</label><input name='mypassword' type='password' id='mypassword' maxlength='100'> <p id='passremind'>Please input password</p><br><button id='checkloginbutton' type='button'>Login</button> </form>");
//$("#commontodo").html("<strong>Kalle</strong>");
        init_click();
        $("#userremind").hide();
        $("#passremind").hide();
    }
    function checklogin(){
       $("#userremind").hide();
        $("#passremind").hide();
       var username=$("#myusername").val();
       var password=$("#mypassword").val();
      if((username!="")&&(password!="")){
           $.ajax({
            url: "https://www.kubary.se/two/php/checklogin.php", 
                            data:{ user: username, pass: password, uuid: idnr },
            success: function(result){
                    $("#commontodo").html(result);
            }});
            
            
        }
        else
            {
                if(username=="")
                    $("#userremind").show();
                if(password=="")
                    $("#passremind").show();
            }
        

    }