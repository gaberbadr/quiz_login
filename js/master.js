let darkmode=document.querySelector(".dark-mode");
let darkmodebtn=document.querySelector(".dark-mode .container .buttun");
let darkmodecont=document.querySelector(".dark-mode .container");
let wrapper=document.querySelector(".wrapper");

//check if  thir is dark-mode in localstorge
if(window.localStorage.getItem("dark-mode")!==null){
//if sun
if(window.localStorage.getItem("dark-mode")==="sun"){
    document.querySelector(".dark-mode .container .left-sun i").classList.add("fa-spin");
    document.documentElement.style.setProperty('--main-darkmode', "white");
    darkmodecont.style.setProperty("background-color","#73C0FC");
    darkmodebtn.classList.remove("active");
    document.documentElement.style.setProperty('--main-color', "black");
    document.documentElement.style.setProperty('--main-backgroundform', "#e8e8e8");
    document.documentElement.style.setProperty('--main-btncolor', "white");  
    document.documentElement.style.setProperty('--main-shadow', "12px 12px 18px #bababa, -12px -12px 18px #ffffff");
    wrapper.classList.remove("gredient-active");
    //if 
}else{ //moon
    document.querySelector(".dark-mode .container .left-sun i").classList.remove("fa-spin");
    document.documentElement.style.setProperty('--main-darkmode', "black");
    darkmodecont.style.setProperty("background-color","#183153");
    darkmodebtn.classList.add("active");
    document.documentElement.style.setProperty('--main-color', "white");
    document.documentElement.style.setProperty('--main-backgroundform', "#313131");
    document.documentElement.style.setProperty('--main-btncolor', "#282626");  
    document.documentElement.style.setProperty('--main-shadow', "none");
    wrapper.classList.add("gredient-active")
}
}


darkmode.onclick = function () { 
    
        //add class active to buttun that make the buttun turn to the right way towords the dark mode
        darkmodebtn.classList.toggle("active");
    //sun
    //if the buttun  not contains class active that mean the buttun in the left and the case is sun mode 
    if (!(darkmodebtn.classList.contains("active"))) { 
//set --main-darkmode = white
    document.documentElement.style.setProperty('--main-darkmode', "white");
//save in the localstorge = sun
    window.localStorage.setItem("dark-mode" ,"sun");
            //make the sun rotate in sun mod
            document.querySelector(".dark-mode .container .left-sun i").classList.add("fa-spin");

//edit the form into sun mode
    darkmodecont.style.setProperty("background-color","#73C0FC");
    document.documentElement.style.setProperty('--main-color', "black");
    document.documentElement.style.setProperty('--main-backgroundform', "#e8e8e8");
    document.documentElement.style.setProperty('--main-btncolor', "white");  
    document.documentElement.style.setProperty('--main-shadow', "12px 12px 18px #bababa, -12px -12px 18px #ffffff");
    wrapper.classList.remove("gredient-active");
    }

//dark
//if the buttun  contains class active that mean the buttun in the right and the case is dark mode 
    if (darkmodebtn.classList.contains("active")) {   
        //set --main-darkmode = black
        document.documentElement.style.setProperty('--main-darkmode', "black");
        //save in the localstorge = moon
        window.localStorage.setItem("dark-mode" ,"moon");
                //make the sun rotate in sun mod
                document.querySelector(".dark-mode .container .left-sun i").classList.remove("fa-spin");

        //edit the form into dark mode
        darkmodecont.style.setProperty("background-color","#183153");
        document.documentElement.style.setProperty('--main-color', "white");
        document.documentElement.style.setProperty('--main-backgroundform', "#313131");
        document.documentElement.style.setProperty('--main-btncolor', "#282626");  
        document.documentElement.style.setProperty('--main-shadow', "none");
        wrapper.classList.add("gredient-active");  
}
}




//hide and show passowrd
let openeye=document.getElementById("open-eye");
let closeeye=document.getElementById("close-eye");
let eye=document.querySelector(".show-hide");
let pass=document.getElementById("pass");

eye.onclick=function(){
if(pass.type=="password"){
    pass.type="text";
openeye.style.setProperty("display","none");
closeeye.style.setProperty("display","inline-block");
}else{
    pass.type="password";
    openeye.style.setProperty("display","inline-block");
    closeeye.style.setProperty("display","none");
}

}

//remember me//////////////////

let rmCheck = document.getElementById("rememberMe");
 pass = document.getElementById ("pass");
let emailInput = document.getElementById("email");

//if thir is checkbox in localstorge and checkbox != ""
if (window.localStorage.getItem("checkbox") && window.localStorage.getItem("checkbox")!=="") {
    //active the checkbox
rmCheck.setAttribute ("checked", "checked");
//get vale of input from local storge
pass.value = window.localStorage.getItem("password");
emailInput.value = window.localStorage.getItem("email"); 

}else{//this mean that checkbox not active or checkbox = ""

    ////turn off the checkbox
rmCheck.removeAttribute("checked");
//remove value of of inputs 
pass.value="";
emailInput.value="";
}


function RememberMe() {
    if (rmCheck.checked && emailInput.value !=="" && pass.value !==""){
        window.localStorage.setItem("email", emailInput.value);
        window.localStorage.setItem("password", pass.value);
        window.localStorage.setItem("checkbox", rmCheck.value);
    } else { 
    window.localStorage.setItem("email" , "");
    window.localStorage.setItem("password" , "");
    window.localStorage.setItem("checkbox" , "");
    }
}

let subm=document.getElementById("subm");
subm.onclick=function(){
    RememberMe();
}

rmCheck.onclick=function(){
    RememberMe();
}

let erroruser=document.querySelector(".erroruser");
let errorpass=document.querySelector(".errorpass");

//validate form//////////////////////////
document.forms[0].onsubmit=function(e){
let user=false;
let passowrd=false;
if(emailInput.value!=="" && emailInput.value.length<=30){
    let pattarnphoneforuserregex=/(012|010|011|015)\d{8}$/;
    let pattarnemailforuserregex=  /^[a-zA-Z0-9]{4,}@[a-zA-Z]{3,6}.(com|net|org)$/ig;
    if(pattarnphoneforuserregex.test(emailInput.value) || pattarnemailforuserregex.test(emailInput.value)){
        emailInput.style.setProperty("border","none");
        erroruser.style.setProperty("display","none");
    user=true;
    }else{
        erroruser.innerHTML="your email or phone might be uncorrect please entar correctly again .";
        emailInput.style.setProperty("border","1px solid red");
        erroruser.style.setProperty("display","block");
    }
}else{
    erroruser.innerHTML="enter your email or phone .";
    emailInput.style.setProperty("border","1px solid red");
    erroruser.style.setProperty("display","block");
}


if(pass.value!=="" && pass.value.length>=4 && pass.value.length<=16 ){
    pattarnpasswordforuserregex=/^[a-zA-Z0-9]+$/;
    if(pattarnpasswordforuserregex.test(pass.value)){
        errorpass.style.setProperty("display","none");
    passowrd=true;
    pass.style.setProperty("border","none");
    }else{
        errorpass.innerHTML="your password must contain letter and number . (not special characters) .";
        pass.style.setProperty("border","1px solid red");
        errorpass.style.setProperty("display","block");
    }
}else{
    errorpass.innerHTML="enter your password , (your password must be between 4 and 16 letter) .";
    pass.style.setProperty("border","1px solid red");
    errorpass.style.setProperty("display","block");
}


if(user===false || passowrd===false){
    e.preventDefault();
}


if(user===true && passowrd===true){
   //location.href="quiz.html";
   window.open("quiz.html","_blank");
   

}
};
