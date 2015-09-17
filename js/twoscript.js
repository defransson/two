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
                  
                    loginform();
            });
                $("#checkloginbutton").click(function(){
                    checklogin();
             });
            $("#registerbutton").click(function(){
                    $("#commontodo").load("https://www.kubary.se/two/php/addform.php");
             });
            $("#registerconfirm").click(function(){
                    add_user();
             });
             $("#avatar").click(function(){
                    uploadFromGallery();
             });
             $("#color1").click(function(){
                   $('#color0').removeClass('green');
                    $('#color1').addClass('orange');
             });
              $("#color0").click(function(){
                   $('#color0').addClass('green');
                    $('#color1').removeClass('orange');
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
     function add_user(){
       $("#userremind").hide();
        $("#passremind").hide();
        $("#passconfremind").hide();
        $('#passmatch').hide();
       var username=$("#myusername").val();
       var password=$("#mypassword").val();
       var passwordconf=$("#mypasswordconf").val();
     
      if((username!="")&&(password!="")&&(passwordconf!="")){
            if(password==passwordconf){
           $.ajax({
            url: "https://www.kubary.se/two/php/adduser.php", 
                            data:{ user: username, pass: password, uuid: idnr },
            success: function(result){
                    $("#commontodo").html(result);
            }});
            }
            else
                 $('#passmatch').show();
        }
        else
            {
                if(username=="")
                    $("#userremind").show();
                if(password=="")
                    $("#passremind").show();
                if(passwordconf=="")
                    $("#passconfremind").show();
            }
        

    }
  /*  function getImage() {
            // Retrieve image file location from specified source
            navigator.camera.getPicture(uploadPhoto, function(message) {
            alert('get picture failed');
        },{
            quality: 50, 
            destinationType: navigator.camera.DestinationType.FILE_URI,
            sourceType: navigator.camera.PictureSourceType.PHOTOLIBRARY
        }
            );
 
        }
 
        function uploadPhoto(imageURI) {
            var options = new FileUploadOptions();
            options.fileKey="file";
            options.fileName=imageURI.substr(imageURI.lastIndexOf('/')+1);
            options.mimeType="image/jpeg";
 
            var params = new Object();
            params.value1 = "test";
            params.value2 = "param";
 
            options.params = params;
            options.chunkedMode = false;
 
            var ft = new FileTransfer();
            ft.upload(imageURI, "https:/www.kubary.se/two/php/upload.php", win, fail, options);
        }
 
        function win(r) {
            console.log("Code = " + r.responseCode);
            console.log("Response = " + r.response);
            console.log("Sent = " + r.bytesSent);
            alert(r.response);
        }
 
        function fail(error) {
            alert("An error has occurred: Code = " = error.code);
        }*/
        function uploadFromGallery() {

    // Retrieve image file location from specified source
    navigator.camera.getPicture(uploadPhoto,
                                function(message) { alert('get picture failed'); },
                                { quality: 50, 
                                destinationType: navigator.camera.DestinationType.FILE_URI,
                                sourceType: navigator.camera.PictureSourceType.PHOTOLIBRARY }
                                );

}

function uploadPhoto(imageURI) {
    var options = new FileUploadOptions();
    options.fileKey="file";
    options.fileName=imageURI.substr(imageURI.lastIndexOf('/')+1)+'.png';
    options.mimeType="text/plain";

    var params = new Object();

    options.params = params;

    var ft = new FileTransfer();
    ft.upload(imageURI, encodeURI("http://some.server.com/upload.php"), win, fail, options);
}

function win(r) {
    console.log("Code = " + r.responseCode);
    console.log("Response = " + r.response);
    console.log("Sent = " + r.bytesSent);
}

function fail(error) {
    alert("An error has occurred: Code = " + error.code);
    console.log("upload error source " + error.source);
    console.log("upload error target " + error.target);
}