// %%quizzyear%% by Lzbk
// Licensed under the MIT license
// version: %%quizzversion%%

(function(window, Util){
	
	Util.registerNamespace('Code.PhotoSwipe.Quizz');
	var Quizz = window.Code.PhotoSwipe.Quizz;
	Quizz.CONSTANTS ={
		Trace: {DISPLAY: 0,
				SELECT : 1,
				test: function(constant){
						return Quizz.CONSTANTS.Trace[constant];
					}
				},
		Question: {ALL_TRUE:0,
				ONLY_TRUE:  1,
				ONE_TRUE:   2,
				ONE_FALSE:  3,
				JUST_ONE:   4,
				ALL_AT_ONCE:5, //TODO
				test: function(constant){
						return Quizz.CONSTANTS.Question[constant];
					}
				},
		Dialog: {OK: "quizz-overlay-ok",
				 CLOSE: "quizz-overlay-close",
				 FINAL: "quizz-overlay-final",
				 BUTTONID: "quizz-overlay-button",
				 TEXTCLASS: "quizz-overlay-content"
				}
	};
}
(
	window,
	window.Code.Util
));
