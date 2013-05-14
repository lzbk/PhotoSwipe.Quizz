This is a fork of PhotoSwipe that is used to create image based quizzes
=======================================================================

If you want the real PhotoSwipe without my added bugs and functionnalities go [there](https://github.com/codecomputerlove/PhotoSwipe)

This will probably be a bit fastly done, not very generic, not perfect : I needed the functionnality for another project, but if someone needs something of the sort feel free to make it better (remember to let her into your heart, though).

Changelog
---------
* v0.3 :
	* with [BrowserQuest](https://github.com/lzbk/BrowserQuest) compliant local storage :
		* the user can come back to finish their activity ;
		* possibility to prevent users from repeating the test and getting an evaluation (unless they erase their local storage);
	* "multilingual" ;
	* now possibility to create a "recap" : global feedback that can be accessed later (handled as a global feedback, almost).
* v0.2 : 
	* messages are now an overlay (not an alert), we can therefore put real html in there.
	* backlog and known bugs :
		* O.K.E: the keyboards events are not modified when the overlay is put and the carousel below is therefore still operationnal, something should be done about this someday
		* settings : in DialogOverlay.initialize(), use the settings
* v0.1 : Added quizzes…
	* backlog and known bugs :
		* lacks mode : "ALL_AT_ONCE"

