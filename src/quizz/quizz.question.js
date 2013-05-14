// %%quizzyear%% by Lzbk
// Licensed under the MIT license
// version: %%quizzversion%%

(function(window, klass, Util, Answer, Feedback){
	
	Util.registerNamespace('Code.PhotoSwipe.Quizz');
	var Quizz = window.Code.PhotoSwipe.Quizz;
	
	Quizz.Question = klass({
		
		//attributes
		id:null,
		el: null,
		overlay: null,
		text: null,
		title: null,
		language:Quizz.CONSTANTS.Language.English,
		mode: Quizz.CONSTANTS.Question.ONE_TRUE,
		answers: {},
		yesAnswers: [],
		selection: [],
		traces: false,
		globalFeedback: [],
		alreadyCompleted: false,
		repeatable: false,
		recap: [],
		scoreFormula: null,
		
		dispose: function(){
			if(typeof this.overlay !== "undefined"){
				this.overlay.dispose();
			}
		},
		
		//methods jason = parsed JSON // traceActivity : a Boolean
		initialize: function(jason, traceActivity){
			this.id = jason.id;
			this.text = jason.text;
			this.title = jason.title;
			if(typeof jason.repeatable !== "undefined"){
				this.repeatable = jason.repeatable;
			}
			if((typeof jason.mode !== "undefined") && (typeof Quizz.CONSTANTS.Question.test(jason.mode) !== "undefined")){
				this.mode = Quizz.CONSTANTS.Question.test(jason.mode);
			}
			if((typeof jason.language !== "undefined") && (typeof Quizz.CONSTANTS.Language.test(jason.language) !== "undefined")){
				this.language = Quizz.CONSTANTS.Language.test(jason.language);
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
			l = jason.recap.length;
			for(i=0; i < l; i++){
				this.recap.push(new Feedback(jason.recap[i].text, jason.recap[i].condition));
			}
			if( (typeof traceActivity === "boolean") && (traceActivity === true) ){
				this.traces = new Quizz.Traces();
			}
			this.overlay = new Quizz.DialogOverlay();
			this.load();
			
			if(this.alreadyCompleted){
				if(!this.repeatable){
					this.overlay.show(Quizz.CONSTANTS.Dialog.CLOSE, "<p>" + Quizz.MESSAGES[this.language].NICE_TRY+ "</p>");
				}
				this.selection = [];
			}
		},
		
		//to keep some data…
		save: function(score, recap){
			if(typeof score === "undefined"){
				score = false;
				recap = false;
			}
			else if(typeof recap === "undefined"){
				recap = false;
			}
			if(this.alreadyCompleted && !this.repeatable){
				if(this.traces !== false){
					this.addTrace("Q", new Date().valueOf(), 'save after retry');
					Quizz.Storage.updateTraces(this.id, this.traces);
				}
			}
			else{
				if(this.traces !== false){
					this.addTrace("Q", new Date().valueOf(), 'save');
				}
				var temp = {
					score: score,
					recap: recap,
					selection: this.selection,
					traces: this.traces};
				Quizz.Storage.storeQuizz(this.id, temp);
			}
		},
		
		load: function(){
			var temp = Quizz.Storage.loadQuizz(this.id);
			if(temp !== false){
				this.selection = temp.selection;
				if(temp.traces  !== false){
					this.traces = new Quizz.Traces();
					this.traces.fill(temp.traces);
				}
				if(this.traces !== false){
					this.addTrace("Q", new Date().valueOf(), 'load');
				}
				if(temp.score !== false || temp.recap !== false){
					this.alreadyCompleted = true;
				}
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
		
		computeScore: function(){
			return 1;//TODO
		},
		
		//parameters : see Util.DOM.find function…
		loadIn: function(selector, contextEl){
			var anAnswer, content = "<h1>"+this.title+"</h1>" +
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
				this.el = Util.DOM.createElement('div', null, content);
				
				Util.DOM.appendChild(this.el, theParent);
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
			var retval, self=this;
			this.selection.push(id);
			if(this.answers[id].getStatus() === true){
				retval = Quizz.MESSAGES[this.language].WELL_DONE;
			}
			else{
				retval = Quizz.MESSAGES[this.language].NOPE;
			}
			if(this.isOver()){
				this.save(this.computeScore, this.createRecap());
				this.overlay.show(Quizz.CONSTANTS.Dialog.OK, "<p>" + retval+ "<br/>" + this.answers[id].getFeedback() + "</p>",
					function(){self.overlay.show(Quizz.CONSTANTS.Dialog.FINAL, self.createGlobalFeedback());});
			}
			else{
				this.save();
				this.overlay.show(Quizz.CONSTANTS.Dialog.OK, "<p>" + retval+ "<br/>" + this.answers[id].getFeedback() + "</p>");
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
		},
		
		createRecap: function(){
			var retval=[], l=this.recap.length;
			for(var i=0;i<l;i++){
				if(this.recap[i].testCondition(this.selected())){
					retval.push(this.recap[i].getText());
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
