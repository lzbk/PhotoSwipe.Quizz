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
		traces: null,
		globalFeedback: [],
		scoreFormula: null,
		
		//methods jason = parsed JSON
		initialize: function(jason){
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
		},
		
		verify : function(){
			return this.questions[1].test;
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
				window.alert("bad selector, bad : "+theParent.length+" elements");
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
