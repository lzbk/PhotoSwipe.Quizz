// %%quizzyear%% by Lzbk
// Licensed under the MIT license
// version: %%quizzversion%%

(function(window, klass, Util, Answer, Feedback){
	
	Util.registerNamespace('Code.PhotoSwipe.Quizz');
	var Quizz = window.Code.PhotoSwipe.Quizz;
	
	Quizz.Question = klass({
		
		//attributes
		id:null,
		text: null,
		title: null,
		mode: Quizz.CONSTANTS.Question.ONE_TRUE,
		answers: {},
		yesAnswers: [],
		selection: [],
		traces: false,
		globalFeedback: [],
		scoreFormula: null,
		
		//methods jason = parsed JSON // traceActivity : a Boolean
		initialize: function(jason, traceActivity){
			this.id = jason.id;
			this.text = jason.text;
			this.title = jason.title;
			if(typeof Quizz.CONSTANTS.Question.test(jason.mode) !== "undefined"){
				this.mode = Quizz.CONSTANTS.Question.test(jason.mode);
			}
			this.scoreFormula = this.checkFormula(jason.scoreFormula);
			var l = jason.answers.length, i;
			for(i=0; i < l; i++){
				this.answers[jason.answers[i].id] = new Answer(jason.answers[i]);
				if(jason.answers[i].status === true){
					this.yesAnswers.push(jason.answers[i].id);
				}
			}
			l = jason.feedback.length;
			for(i=0; i < l; i++){
				this.globalFeedback.push(new Feedback(jason.feedback[i].text, jason.feedback[i].condition));
			}
			if( (typeof traceActivity === "boolean") && (traceActivity === true) ){
				this.traces = new Quizz.Traces();
			}
				
		},
		
		//optional : the id sought
		selected: function(id){
			if(typeof id === "undefined"){
				return this.selection;
			}
			else{//is int, don't check
				return (this.selection.indexOf(id)>-1);
			}
		},
		
		getTrue: function(){
			return this.yesAnswers;
		},
		
		isTrue: function(id){
			return (this.yesAnswers.indexOf(id)>-1);
		},//manquent des opérations ensemblistes

		checkFormula: function(formula){
			return formula;//TODO
		},
		
		//parameters : see Util.DOM.find function…
		loadIn: function(selector, contextEl){
			var theQuestion, anAnswer, content = "<h1>"+this.title+"</h1>" +
				"\n<p>"+this.text+"</p>" +
				"\n<ul id='"+this.id+"' class='gallery'>",
				theParent = Util.DOM.find(selector, contextEl);
			if(theParent.length !== 1){
				throw("quizz.question.loadIn : bad selector ("+(selector)+"), bad : "+theParent.length+" elements");
			}
			else{
				theParent = theParent[0];
				for(anAnswer in this.answers){
					content += "\n"+this.answers[anAnswer].toString();
				}
				content += "\n</ul>";
				theQuestion = Util.DOM.createElement('div', null, content);
				
				Util.DOM.appendChild(theQuestion, theParent);
			}
		},
		
		//calls the photoswipe attach method
		init: function(){
			return window.Code.PhotoSwipe.attach( this.images(), {} );
		},

		//returns a list of the images in the questionnaire
		images: function(){
			return window.document.querySelectorAll('#'+this.id+' a');
		},
		
		//adds a trace
		addTrace: function(id, ts, act){
			if(this.traces !== false){
				this.traces.addTrace(id, ts, act);
			}
		},
		
		//process an answer
		answer: function(id){
			var retval;
			this.selection.push(id);
			if(this.answers[id].getStatus() === true){
				retval = "Well done";
			}
			else{
				retval = "This answer was not expected";
			}
			window.alert(retval+ "\n" + this.answers[id].getFeedback());
			if(this.isOver()){
				window.alert(this.createGlobalFeedback());
			}
		},
		
		//is the activity over based on the mode…
		isOver: function(){
			var retval = false;
			switch(this.mode){
				case Quizz.CONSTANTS.Question.ALL_TRUE:
					retval = (Util.arrayDiff(this.getTrue(), Util.arrayIntersect(this.selected(), this.getTrue())).length===0);
					break;
				case Quizz.CONSTANTS.Question.ONE_TRUE:
					retval = (Util.arrayIntersect(this.selected(), this.getTrue()).length > 0);
					break;
				case Quizz.CONSTANTS.Question.ONE_FALSE:
					retval = (Util.arrayDiff(this.selected(), this.getTrue()).length > 0);
					break;
				case Quizz.CONSTANTS.Question.JUST_ONE:
					retval = (this.selected().length == 1);
					break;
				case Quizz.CONSTANTS.Question.ONLY_TRUE:
					retval = ( (Util.arrayDiff(this.getTrue(), this.selected()).length === 0) &&
							   (Util.arrayDiff(this.selected(), this.getTrue()).length === 0) );
					break;
			}
			return retval;
		},
		
		//for each feedback checks the condition and concatenates it in order of appearance if true
		createGlobalFeedback: function(){
			var retval="", l=this.globalFeedback.length;
			for(var i=0;i<l;i++){
				if(this.globalFeedback[i].testCondition(this.selected())){
					retval += "\n"+this.globalFeedback[i].getText();
				}
			}
			return retval;
		}
	});
	
		
	

}
(
	window, 
	window.klass, 
	window.Code.Util,
	window.Code.PhotoSwipe.Quizz.Answer,
	window.Code.PhotoSwipe.Quizz.Feedback
));
