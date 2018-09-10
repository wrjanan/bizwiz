console.log('hi');



function httpGetAsync(theUrl, callback)
{
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function() { 
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
            callback(xmlHttp.responseText);
    }
    xmlHttp.open("GET", theUrl, true); // true for asynchronous 
    xmlHttp.send(null);
}

function janan()
{
    httpGetAsync('')
}

var buttons = document.getElementById("companysearch");
var companynametext = document.getElementById("companyname");

    buttons.addEventListener("click", function(e) {
        alert(companynametext.value);
      if(companynametext.value.length >4 ) {
        
        setCookie("companyname",companynametext.value,30);
      
        $('#form-cname').val(companynametext.value);
      
      
        httpGetAsync('https://www.bizwiz.heirloam.com/janan.php/TABLE23/' + companynametext.value + '/', cb());

      } else {
                alert("Company name has to be at least 4 letters and greater");

      }
    });


function resetHome() {
        $('#home-container').removeClass('d-none fadeIn fadeOut');
        $('#form-container').removeClass('d-block fadeIn fadeOut'); 
 
        $('#home-container').addClass('d-block animated fadeIn');

        $('#form-container').addClass('d-none animated fadeOut');

}

function resetForm() {
        $('#form-container').removeClass('d-none fadeIn fadeOut');
        $('#home-container').removeClass('d-block fadeIn fadeOut');
        
        $('#form-container').addClass('d-block animated fadeIn');

        $('#home-container').addClass('d-none animated fadeOut');

}

function submitForm() {
   // transparentcy the form and display form
  console.log("submitting");
  
}

function cb(value) {
  console.log("cookie value");
  console.log(value);
  
  if(value === undefined) {
    var companynametext = document.getElementById("companyname");
    setCookie('cname', companynametext.value, 30);

    $('#form-cname').val(companynametext.value);

    resetForm();  
  } else {
    
    var json = JSON.parse(value);
    console.log(json);
    console.log(json["uen"]);  

    setCookie('cname', json["entity_name"], 30);

    $('#form-cname').val(json["entity_name"]);

    resetForm();  
  }
  
}


// - html functions

// - - cookie functions

function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    var expires = "expires="+d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

function checkCookie() {
    var user = getCookie("username");
    if (user != "") {
        alert("Welcome again " + user);
    } else {
        user = prompt("Please enter your name:", "");
        if (user != "" && user != null) {
            setCookie("username", user, 365);
        }
    }
}

function listCookies() {
  console.log("ASd");
    var theCookies = document.cookie.split(';');
    var aString = '';
    for (var i = 1 ; i <= theCookies.length; i++) {
        aString += i + ' ' + theCookies[i-1] + "\n";
    }
    return aString;
}
setCookie("jan", "ab", 1); 
listCookies();

function showallcookies() {
    console.log(listCookies());
}

function showallforminput() {


  var formTabs = $("#msform fieldset").children();
  console.log(formTabs);
  
  $.each(formTabs, function(key, formInput) {
    console.log(key);
    console.log(formTabs[key]);
  });
  formTabs.forEach(function(formInput) {
    console.log(formInput);
  });
  
}

function saveallforminput() {
 

  var formTabs = $("#msform fieldset input");
  console.log(formTabs);
  
  $.each(formTabs, function(key, formInput) {
    console.log(formInput.name);
    console.log(formInput.value);
    setCookie(formInput.name, formInput.value, 30) 
  });
}