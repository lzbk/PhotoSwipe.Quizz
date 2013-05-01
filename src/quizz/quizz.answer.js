// %%quizzyear%% by Lzbk
// Licensed under the MIT license
// version: %%quizzversion%%

(function(window, klass, Util){

	Util.registerNamespace('Code.PhotoSwipe.Quizz');
	var Quizz = window.Code.PhotoSwipe.Quizz;
	
	
	Quizz.Answer = klass({
		id: null,
		src: null,
		thumb: null,
		status: null,
		comment: null,
		feedback: null,
		weighting: null,
		
		
		initialize: function(jason){
			this.id = jason.id;
			this.src = jason.src;
			this.thumb = jason.thumb;
			this.status = jason.status;
			this.comment = jason.comment;
			this.feedback = jason.feedback;
			this.weighting = jason.weighting;
			//maybe some testing would be nice, for later…
		},
		
		toString: function(){
			return '<li><a href="'+this.src+'" id="'+this.id+'"><img src="'+this.thumb+'" alt="'+this.comment+'" /></a></li>';
		},
		
		getFeedback: function(){
			return this.feedback;
		},
		
		getWeight: function(){
			return this.weighting;
		},
		
		getId: function(){
			return this.id;
		},
		
		getStatus: function(){
			return this.status;
		}
	});

		
	

}
(
	window, 
	window.klass, 
	window.Code.Util
));
