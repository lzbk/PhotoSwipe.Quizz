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
				ONE_TRUE:   1,
				ONE_FALSE:  2,
				JUST_ONE:   3,
				ALL_AT_ONCE:4, //TODO
				test: function(constant){
						return Quizz.CONSTANTS.Question[constant];
					}
				}
	};
}
(
	window,
	window.Code.Util
));
