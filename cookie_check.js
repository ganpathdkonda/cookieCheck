/******
  Global variables to hold the results of the checks
  and to indicate if the checks were performed at all
 *****/
var LocalCookieAllowed = '';
var ZanoxCookieAllowed = '';
var CheckLocalDone = '';
var CheckZanoxDone = '';
var retries = 20;

/* functions for the local/1rst party cookie check */
function createLocalCookie(name, value, days) {
    var expires;
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toGMTString();
    }
    else expires = "";
	document.cookie = name + "=" + value + expires + "; path=/";
}

function readLocalCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
}

function areLocalCookiesEnabled() {
	var cookie_name = "testing";
	var cookie_value = "Hello";
	createLocalCookie(cookie_name, cookie_value, 1);
	if (readLocalCookie(cookie_name) != null) {
		createLocalCookie(cookie_name, "", -1);
		LocalCookieAllowed = 1;
	}
	CheckLocalDone = 1;
}
/* end of functions for the local/1rst party cookie check */

	
/* functions for the zanox/3rd party cookie check */
var rn = Math.floor((Math.random()*1000)+1);
function areZanoxCookiesEnabled() {
  var firstUrl = 'http://ad.zanox.com/tools/check/step1.aspx?f=ZanoxValidTrack_test_step1_loaded&r=' + rn;
  var scriptElement = document.createElement('script');
  var scriptTargetElement = document.getElementById('divTrackingCheck');
  scriptElement.setAttribute('src', firstUrl);
  scriptTargetElement.appendChild(scriptElement); 
}

window.ZanoxValidTrack_test_step1_loaded = function () {  
  var secondUrl = 'http://ad.zanox.com/tools/check/step2.aspx?f=ZanoxValidTrack_test_step2_loaded&r=' + rn;
  var scriptTargetElement = document.getElementById('divTrackingCheck');
  var scriptElement = document.createElement('script');

  scriptElement.setAttribute('src', secondUrl);
  scriptTargetElement.appendChild(scriptElement);
}

window.ZanoxValidTrack_test_step2_loaded = function (cookieSuccess) {
	if (cookieSuccess) {
		ZanoxCookieAllowed = "1";
	}
	else {
		ZanoxCookieAllowed = "0";
	}
	CheckZanoxDone = 1;
}
/* end of functions for the zanox/3rd party cookie check */

/* reset global varaiables and perform all the checks */
function performChecks(){
	LocalCookieAllowed = '';
	ZanoxCookieAllowed = '';
	CheckLocalDone = '';
	CheckZanoxDone = '';
	
	document.getElementById("check_in_progress").style.display = '';
	
	areLocalCookiesEnabled()
	areZanoxCookiesEnabled();
	
	retries = 20;
	timer = setInterval(checkResults, 200);
}

/******
  see if all the checks were already perfomed
  if so, stop waiting and display results
  if not, wait another cycle
 *****/
function checkResults(){
	if(CheckLocalDone != 1 || CheckZanoxDone != 1){
		if(retries > 0){
			retries--;
			return;
		}
	}
	clearInterval(timer);
	
	if(CheckZanoxDone == '' && retries == 0){
		ZanoxCookieAllowed = -1;
		CheckZanoxDone = 1;
	}
	
	if(CheckLocalDone == 1 && CheckZanoxDone == 1){ showResults(); }
}

function showResults(){
	resetResultSpans();
	
	if(LocalCookieAllowed == 0){ document.getElementById("local_cookie_not_ok").style.display = ''; }
	if(LocalCookieAllowed == 1){ document.getElementById("local_cookie_ok").style.display = ''; }
	
	if(ZanoxCookieAllowed == -1){ document.getElementById("zanox_blocked").style.display = ''; }
	if(ZanoxCookieAllowed == 0){  document.getElementById("zanox_cookie_not_ok").style.display = '';  }
	if(ZanoxCookieAllowed == 1){  document.getElementById("zanox_cookie_ok").style.display = '';  }
	
	if(LocalCookieAllowed == 1 && ZanoxCookieAllowed == 1){
		document.getElementById("all_fine_message").style.display = '';
	}
	
	if(ZanoxCookieAllowed == -1){
		document.getElementById("adblocker_message").style.display = '';
	}
	
	if(LocalCookieAllowed == 0 || ZanoxCookieAllowed == 0){
		document.getElementById("cookie_unblock_message").style.display = '';
	}
}

function resetResultSpans(){
	document.getElementById("check_in_progress").style.display = 'none';
	document.getElementById("local_cookie_not_ok").style.display = 'none';
	document.getElementById("local_cookie_ok").style.display = 'none';
	document.getElementById("zanox_blocked").style.display = 'none';
	document.getElementById("zanox_cookie_not_ok").style.display = 'none';
	document.getElementById("zanox_cookie_ok").style.display = 'none';
	document.getElementById("all_fine_message").style.display = 'none';
	document.getElementById("adblocker_message").style.display = 'none';
	document.getElementById("cookie_unblock_message").style.display = 'none';
}

