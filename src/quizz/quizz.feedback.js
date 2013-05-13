// %%quizzyear%% by Lzbk
// Licensed under the MIT license
// version: %%quizzversion%%

(function(window, klass, Util){
	
	
	Util.registerNamespace('Code.PhotoSwipe.Quizz');
	var Quizz = window.Code.PhotoSwipe.Quizz;
	
	
	Quizz.Feedback = klass({
		text: null,
		condition: null,
				
		
		initialize: function(text, condition){
			if(this.checkCondition(condition)){
				this.text = text;
				this.condition = condition;
			}
			else{
				throw("quizz.feedback("+condition + ") is not valid.");
			}
		},
		
		checkCondition: function(condition){
			return true;//TODO
		},
		
		/**
		 * We take the ids of the selected solutions:
		 * #id in the formula will be evaluated to true if in selectedIds
		 * false otherwise
		 */
		testCondition: function(selectedIds){
			return true;//TODO
		},
		
		getText: function(){
			return this.text;//TODO
		}
		
	});

		
	

}
(
	window, 
	window.klass, 
	window.Code.Util
));
