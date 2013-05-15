// %%quizzyear%% by Lzbk
// Licensed under the MIT license
// version: %%quizzversion%%
// Meant to be compatible with BrowserQuest storage (thus reuses part of it)
// procedural because it should handle separately what happens in different quizzes.


(function(window, klass, Modernizr, Util){

	Util.registerNamespace('Code.PhotoSwipe.Quizz.Storage');
	var Quizz = window.Code.PhotoSwipe.Quizz;
	
	Quizz.Storage = {
		useable: function(){
			return typeof Modernizr !== "undefined";
		},
		
		hasLocalStorage: function() {
            return this.useable() && Modernizr.localstorage;
        },
		
        loadQuizz: function(quizzID){
			var retval = false, tmp;
			if(this.hasLocalStorage() && localStorage.data) {
				tmp = JSON.parse(localStorage.data);
				if(typeof tmp.quizzes !== "undefined"){
					if (typeof tmp.quizzes[quizzID] !== "undefined"){
						retval = tmp.quizzes[quizzID];
					}
				}
			}
			return retval;
		},

		storeQuizz: function(quizzID, content) {
			var tmp;
			if(this.hasLocalStorage() && localStorage.data) {
				tmp = JSON.parse(localStorage.data);
				if(typeof tmp.quizzes === "undefined"){
					tmp.quizzes = {};
				}
				tmp.quizzes[quizzID] = content;
				localStorage.data = JSON.stringify(tmp);
			}
		},
		
		update: function(quizzID, traces, score, complete){
			var tmp;
			if(this.hasLocalStorage() && localStorage.data) {
				tmp = JSON.parse(localStorage.data);
				if(typeof tmp.quizzes === "undefined"){
					throw("Code.Quizz.Storage.update called on an empty local storage for quizz #"+quizzID);
				}
				tmp.quizzes[quizzID].traces = traces;
				tmp.quizzes[quizzID].score = score;
				tmp.quizzes[quizzID].complete = complete;
				localStorage.data = JSON.stringify(tmp);
			}
		},
		
		reset: function(quizzID){
			if(this.hasLocalStorage() && localStorage.data) {
				tmp = JSON.parse(localStorage.data);
				if(typeof tmp.quizzes !== "undefined"){
					tmp.quizzes[quizzID] = undefined;
				}
				localStorage.data = JSON.stringify(tmp);
			}
		}
	};
}
(
	window, 
	window.klass, 
	window.Modernizr, 
	window.Code.Util
));
