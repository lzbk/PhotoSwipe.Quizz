// %%quizzyear%% by Lzbk
// Licensed under the MIT license
// version: %%quizzversion%%

(function(window, Util){
	
	Util.registerNamespace('Code.PhotoSwipe.Quizz');
	var Quizz = window.Code.PhotoSwipe.Quizz;
	Quizz.CONSTANTS ={
		Trace: {DISPLAY :0,
				SELECT  :1,
				START   :2,
				COMPLETE:3,
				test: function(constant){
						return this[constant];
					}
				},
		Question: {ALL_TRUE:0,
				ONLY_TRUE  :1,
				ONE_TRUE   :2,
				ONE_FALSE  :3,
				JUST_ONE   :4,
				ALL_AT_ONCE:5, //TODO
				test: function(constant){
						return this[constant];
					}
				},

		Dialog: {OK: "quizz-overlay-ok",
				 CLOSE: "quizz-overlay-close",
				 FINAL: "quizz-overlay-final",
				 BUTTONID: "quizz-overlay-button",
				 TEXTCLASS: "quizz-overlay-content"
				},
				
		Language: {English: "EN",
				 French: "FR",
				 test: function(constant){
						 return this[constant];
					 }
				 }
	};
	
	Quizz.MESSAGES = {//see Quizz.CONSTANTS.Language
		EN: {//English
			WELL_DONE: "Well done!",
			NOPE: "This answer was not expected",
			NICE_TRY: "You can only get a score on this activity once… But feel free to toy with this quizz as much as you want."
		},
		FR: {//French
			WELL_DONE: "Bien joué !",
			NOPE: "Nous n'attendions pas cette réponse",
			NICE_TRY: "Vous ne pouvez être évalué sur cette activité qu'une fois… mais n'hésitez pas à re-jouer pour le plaisir."
		}
	};
}
(
	window,
	window.Code.Util
));
