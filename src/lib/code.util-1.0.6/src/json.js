//code by http://www.w3schools.com/ajax/tryit.asp?filename=tryajax_first & Lzbk (%%quizzyear%%)
// Licensed under the MIT license
// version: %%quizzversion%%

(function (window, Util) {
	
	Util.extend(Util, {
		
		JSON: {
			/*
			 * takes the content of a JSON file interprets it and 
			 * returns it when synchronous or calls success(JSON content)
			 */
			loadJSON : function (url, async, success){			
				var xmlhttp, theJSON;
				if(typeof async === "undefined"){
					async = false;//in our context, we need it now
				}
				if (window.XMLHttpRequest){ // code for IE7+, Firefox, Chrome, Opera, Safari
					xmlhttp=new XMLHttpRequest();
				}
				else{ // code for IE6, IE5
					xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
				}
				xmlhttp.onreadystatechange=function(){
					//4 → READYSTATE_COMPLETE && 200 → OK 
					if (xmlhttp.readyState==4 && (xmlhttp.status==200 || xmlhttp.status==0)){
						if( (async === true) && (typeof success === "function")){
							success(JSON.parse(xmlhttp.responseText));
						}
						else{
							theJSON = JSON.parse(xmlhttp.responseText);
						}
					}
				}
				xmlhttp.open("GET",url,async);
				xmlhttp.send();
				if(async === false){
					return theJSON;
				}
			}
				
		}

	});
}
(
	window,
	window.Code.Util
));
