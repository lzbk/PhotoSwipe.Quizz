// %%quizzyear%% by Lzbk
// Licensed under the MIT license
// version: %%quizzversion%%

(function(window, klass, Util){
	
	
	Util.registerNamespace('Code.PhotoSwipe.Quizz');
	var Quizz = window.Code.PhotoSwipe.Quizz;

	Quizz.Trace = klass({
		answerId: null,
		timestamp: null,
		action: null,
		
		initialize: function(id, ts, act){
			this.answerId = id;
			this.timestamp= ts;
			this.action   = act;
		}
	});	
	
	Quizz.Traces = klass({
		traces: null,
		
		initialize: function(){
			this.traces = [];
		},
		
		addTrace: function(id, ts, act){
			//window.alert('('+id+', '+ts+', '+act+')');/**/
			this.traces.push(new Quizz.Trace(id,ts,act));
		}
	});

		
	

}
(
	window, 
	window.klass, 
	window.Code.Util
));
