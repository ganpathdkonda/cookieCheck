zanox cookie checker
============================
This is the zanox cookie checker 1.0

It gives users the possibility to simply check if their current browser settings allow cookies on your site (1rst party) 
as well as for zanox (3rd party). It also checks if zanox might be blocked by an adblocker.  
Additional checks can be easily integrated if needed.

# Structure
cookie_check.js
------
Holds all the logic for checking first and (zanox) third party cookies, including an indirect adblocker detection.  
To add another third party cookie check, implement your function(s), add the needed global variables and add a call of your 
check to the performChecks() function. After that adjust the checkResults(), showResults() and resetResultSpans() functions.

index.html
------
Contains the basic basic structure, some info texts and the possible check results in hidden div or span tags.  
Here you can also add feedback messages for additional checks or modify the existing ones according to your needs

style.css
------
Contains all the necessary stylesheet data


## Copyright & License
Copyright (c) 2013 Zanox.de AG licensed under the Apache 2.0 license (see LICENSE file)  
Further, oral or written information or advice given by ZANOX.de AG's or any of its subsidiaries' representatives shall neither create a warranty nor in any way effect the terms of the License.
