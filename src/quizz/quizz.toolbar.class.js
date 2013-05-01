// Copyright (c) %%year%% by Code Computerlove (http://www.codecomputerlove.com)
// Licensed under the MIT license
// version: %%version%%

(function(window, klass, Util){

	Util.registerNamespace('Code.PhotoSwipe.Quizz.Toolbar');
	var PhotoSwipe = window.Code.PhotoSwipe, Quizz = window.Code.PhotoSwipe.Quizz;
	
	Quizz.Toolbar.ToolbarClass = window.Code.PhotoSwipe.Toolbar.ToolbarClass.extend(function(){
	}).methods({
		initialize: function(cache, options){
			this.supr(cache, options);
			this.chooseEl = Util.DOM.find('.' + Quizz.Toolbar.CssClasses.choose, this.toolbarEl)[0];
			this.addEventHandlers();
		},
		/*
		 * Function: handleTap
		 */
		handleTap: function(e){
			
			this.clearTimeout();
			
			var action;
			
			if (e.target === this.nextEl || Util.DOM.isChildOf(e.target, this.nextEl)){
				action = PhotoSwipe.Toolbar.ToolbarAction.next;
			}
			else if (e.target === this.previousEl || Util.DOM.isChildOf(e.target, this.previousEl)){
				action = PhotoSwipe.Toolbar.ToolbarAction.previous;
			}
			else if (e.target === this.closeEl || Util.DOM.isChildOf(e.target, this.closeEl)){
				action = PhotoSwipe.Toolbar.ToolbarAction.close;
			}
			else if (e.target === this.playEl || Util.DOM.isChildOf(e.target, this.playEl)){
				action = PhotoSwipe.Toolbar.ToolbarAction.play;
			}
			else if (e.target === this.chooseEl || Util.DOM.isChildOf(e.target, this.chooseEl)){
				action = Quizz.Toolbar.ToolbarAction.choose;
			}
			
			this.setTimeout();
			
			if (Util.isNothing(action)){
				action = PhotoSwipe.Toolbar.ToolbarAction.none;
			}
			
			Util.Events.fire(this, { 
				type: PhotoSwipe.Toolbar.EventTypes.onTap, 
				target: this, 
				action: action,
				tapTarget: e.target
			});
			
		}
	});
		
}
(
	window, 
	window.klass, 
	window.Code.Util
));
