


function SelectJob(evt, Job) {
	//console.log("login_test.js SelectJob 호출");
  var i, tabcontent, tablinks;
  tabcontent = document.getElementsByClassName("tabcontent");
  
  tablinks = document.getElementsByClassName("tablinks");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" active", "");
  }
  
  evt.currentTarget.className += " active";
  
  if(Job == "student"){
		console.log("student 클릭");
		
		document.getElementsByClassName("student-tab")[0].style.display = "";
		document.getElementsByClassName("maker-tab")[0].style.display = "none";
		document.getElementsByClassName("manager-tab")[0].style.display = "none";
	}  
	else if(Job == "maker"){
		console.log("maker 클릭");
		
		document.getElementsByClassName("maker-tab")[0].style.display = "";
		document.getElementsByClassName("student-tab")[0].style.display = "none";
		document.getElementsByClassName("manager-tab")[0].style.display = "none";
	}
	else if(Job == "manager"){
		console.log("manager 클릭");
		
		document.getElementsByClassName("manager-tab")[0].style.display = "";
		document.getElementsByClassName("student-tab")[0].style.display = "none";
		document.getElementsByClassName("maker-tab")[0].style.display = "none";
	}
}


function login_command(Job){
	
	if(Job == "student"){
		console.log("student 로그인");
		window.location.href = './student_main.html';
	}  
	else if(Job == "maker"){
		console.log("maker 로그인");
		window.location.href = './maker_main.html';
	}
	else if(Job == "manager"){
		console.log("manager 로그인");
		window.location.href = './manager_main.html';
	}
	
}


function register(){
	
	window.location.href = './register.html';
	
}