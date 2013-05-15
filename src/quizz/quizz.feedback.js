// %%quizzyear%% by Lzbk
// Licensed under the MIT license
// version: %%quizzversion%%

(function(window, klass, Util){
	
	
	Util.registerNamespace('Code.PhotoSwipe.Quizz');
	var Quizz = window.Code.PhotoSwipe.Quizz;
	
	
	Quizz.Feedback = klass({
		text: null,
		condition: null,
		score: false,
				
		
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
			return (condition===true) || (typeof condition.match(Quizz.CONSTANTS.Feedback.RE_TEST) !== undefined);//TODO
		},
		
		/**
		 * We take the ids of the selected solutions:
		 * #id in the formula will be evaluated to true if in selectedIds
		 * false otherwise
		 */
		testCondition: function(quizz){
			if(this.condition===true){ return true; }
			else {
				var args = this.condition.match(Quizz.CONSTANTS.Feedback.RE_TEST);
				if((args[1]=="perm") && (typeof quizz.storedScore !== "undefined")){
					this.score = quizz.storedScore;
				}
				if(this.score === false){
					this.score = quizz.computeScore();
				}
				if(args[2]=="inf"){
					return this.score < parseInt(args[3], 10);
				}
				else{
					return this.score > parseInt(args[3], 10);
				}
			}
			return this.condition(quizz);//TODO
		},
		
		getText: function(quizz){
			return this.text.replace(Quizz.CONSTANTS.Feedback.RE_TEXT, this.score);//TODO
		}
		
	});

		
	

}
(
	window, 
	window.klass, 
	window.Code.Util
));
