This is a fork of PhotoSwipe that is used to create image based quizzes
=======================================================================

This fork (and the one it forks from) was designed and implemented at the LIRIS lab (http://liris.cnrs.fr) in the course of the Janus project, sponsored by the IMU Labex (http://imu.universite-lyon.fr/).

Use
---
This uses apache ant (just like PhotoSwipe) to create reduced .js files. All the code is to be written in the source, then “compiled” :
* either using build.sh (full build)
* or fastbuild.sh (which removes some actions, to be used for testing)

Each build uses the build.properties file to get the version and other info. The result is provided in the release folder thus generated, which contains the libraries and a set of examples.

As the examples show, the creation of a quizz uses a data.json file which contains links to images…

Changelog
---------
* v0.4.0 :
	* a fixed formula ;
	* feedback conditions either true or based on the score ;
	* backlog and known bugs :
		* jquery display of overlay is buggy (maybe look at the PhotoSwipe code which mentionned such issues).
		* create new answer version with true/false for each image…
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
		* lacks mode : "ALL_AT_ONCE",
		* lacks formula handling, and condition handling for global feedback (Edit: and recap)

