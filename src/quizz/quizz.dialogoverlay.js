// Copyright (c) %%year%% by Code Computerlove (http://www.codecomputerlove.com)
// Licensed under the MIT license
// version: %%version%%

(function(window, klass, Util){

	Util.registerNamespace('Code.PhotoSwipe.Quizz.DialogOverlay');
	var Quizz = window.Code.PhotoSwipe.Quizz;
	
	Quizz.DialogOverlay = klass({
		el:null,
		content:null,
		close:null,
		type:Quizz.CONSTANTS.Dialog.FINAL,

		dispose: function(){
			var prop;
			Util.Animation.stop(this.el);
			Util.DOM.removeChild(this.el, this.el.parentNode);
			for (prop in this) {
				if (Util.objectHasProperty(this, prop)) {
					this[prop] = null;
				}
			}
		},
		
		initialize: function(){
			var attr="";
			if(typeof extraCssClass !== "undefined"){
				attr = {'class': extraCssClass};
			}
			this.el = Util.DOM.createElement('div', attr, '');
			Util.DOM.setStyle(this.el, {display:'block', position:'absolute', bottom:0, top:0, left:0, right:0, zIndex:1001/*(Quizz.settings.zIndex+1)*/});
			this.close = Util.DOM.createElement('div', {'id': Quizz.CONSTANTS.Dialog.BUTTONID}, '');
			tmp = Util.DOM.createElement('div', {'class': Quizz.CONSTANTS.Dialog.TEXTCLASS}, '');
			this.content = Util.DOM.createElement('div', {}, '');
			Util.DOM.appendChild(this.content, tmp);
			Util.DOM.appendChild(this.close, tmp);
			Util.DOM.appendChild(tmp, this.el);
			Util.DOM.hide(this.el);
			Util.DOM.appendToBody(this.el);
		},
		
		addEventHandlers: function(){
		//TODO
			if (Util.Browser.isTouchSupported){
				if (!Util.Browser.blackberry){
					// Had an issue with touchstart, animation and Blackberry. BB will default to click
					Util.Events.add(this.toolbarEl, 'touchstart', this.touchStartHandler);
				}
				Util.Events.add(this.toolbarEl, 'touchmove', this.touchMoveHandler);
				Util.Events.add(this.captionEl, 'touchmove', this.touchMoveHandler);
			}
			Util.Events.add(this.toolbarEl, 'click', this.clickHandler);
		
		},
		
		setType: function(type){
			Util.DOM.removeClass(this.el, this.type);
			this.type = type || Quizz.CONSTANTS.Dialog.FINAL;
			Util.DOM.addClass(this.el, this.type);
			
		},
		
		setContent: function(content){
			Util.DOM.content(this.content, content);
		},
		
		show: function(type, content, onOK){
			if(typeof type !== "undefined"){
				this.setType(type);
			}
			if(typeof content !== "undefined"){
				this.setContent(content);
			}
			Util.Events.remove(this.close, "click");
			if(typeof onOK === "undefined"){
				var self=this;
				Util.Events.add(this.close, "click", function(){self.hide()});
			}
			else{
				Util.Events.add(this.close, "click", onOK);
			}
			Util.DOM.setStyle(this.el, 'opacity', 0);
			Util.DOM.showOffspring(this.el);
			Util.Animation.fadeIn(this.el, 250);			
		},
		
		hide: function(){
			Util.Animation.fadeOut(this.el, 333, Util.DOM.hide);
		}
		

	});
		
}
(
	window, 
	window.klass, 
	window.Code.Util
));
