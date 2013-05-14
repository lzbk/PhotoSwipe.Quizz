// %%quizzyear%% by Lzbk
// Licensed under the MIT license
// version: %%quizzversion%%

(function(window, klass, Util, Toolbar, PhotoSwipe){
	
	Util.registerNamespace('Code.PhotoSwipe.Quizz');
	var Quizz = PhotoSwipe.Quizz;
	
	Quizz.QuizzClass = window.Code.PhotoSwipe.PhotoSwipeClass.extend(function(){
	}).methods({
		initialize: function(question, options, id){
					this.question = question;
					this.supr(question.images(), options, id);
					this.settings.getToolbar = Toolbar.getToolbar;
		},
		
		dispose: function(){			
			if(typeof this.question !== "undefined"){
				this.question.dispose();
			}
			this.supr();
		},
		/*
		 * Function: createComponents
		 */
		createComponents: function(){
			this.documentOverlay = new window.Code.PhotoSwipe.DocumentOverlay.DocumentOverlayClass(this.settings);
			this.carousel = new window.Code.PhotoSwipe.Carousel.CarouselClass(this.cache, this.settings);
			this.uiLayer = new window.Code.PhotoSwipe.UILayer.UILayerClass(this.settings);
			if (!this.settings.captionAndToolbarHide){
				this.toolbar = new Toolbar.ToolbarClass(this.cache, this.settings);
			}			
		},

		/*
		 * Function: choose
		 */
		choose: function(){
			this.question.answer(this.getCurrentImageId());
		},
		
		/*
		 * overload, for choose…
		 */
		onToolbarTap: function(e){

			this.question.addTrace(this.getCurrentImageId(), new Date().valueOf(), 'click '+e.action);

			switch(e.action){
				
				case PhotoSwipe.Toolbar.ToolbarAction.next:
					this.next();
					break;
				
				case PhotoSwipe.Toolbar.ToolbarAction.previous:
					this.previous();
					break;
					
				case PhotoSwipe.Toolbar.ToolbarAction.close:
					this.hide();
					break;
				
				case PhotoSwipe.Toolbar.ToolbarAction.play:
					this.play();
					break;
					
				case Toolbar.ToolbarAction.choose:
					this.choose();
					break;
					
			}
			
			Util.Events.fire(this, { 
				type: PhotoSwipe.EventTypes.onToolbarTap, 
				target: this,
				toolbarAction: e.action,
				tapTarget: e.tapTarget
			});
			
		},
		
		/*
		 * overload for traces…
		 */
		onKeyDown: function(e){
			
			if (e.keyCode === 37) { // Left
				e.preventDefault();
				this.question.addTrace(this.getCurrentImageId(), new Date().valueOf(), 'key previous');
				this.previous();
			}
			else if (e.keyCode === 39) { // Right
				e.preventDefault();
				this.question.addTrace(this.getCurrentImageId(), new Date().valueOf(), 'key next');
				this.next();
			}
			else if (e.keyCode === 38 || e.keyCode === 40) { // Up and down
				e.preventDefault();
			}
			else if (e.keyCode === 27) { // Escape
				e.preventDefault();
				this.question.addTrace(this.getCurrentImageId(), new Date().valueOf(), 'key close');
				this.hide();
			}
			else if (e.keyCode === 13) { // Enter
				e.preventDefault();
				this.question.addTrace(this.getCurrentImageId(), new Date().valueOf(), 'key choose');
				this.choose();
			}
			else if (e.keyCode === 32) { // SpaceBar
				e.preventDefault();
				if(this.carousel.isSlideshowActive){
					this.question.addTrace(this.getCurrentImageId(), new Date().valueOf(), 'key stop');
					this.stop();
				}
				else{
					this.question.addTrace(this.getCurrentImageId(), new Date().valueOf(), 'key play');
					this.play();
				}
			}
			
		},
		
		/*
		 * to know the id of the current image…
		 */
		getCurrentImageId: function(){
			return this.getCurrentImage().metaData.id;
		}
	});
}
(
	window,
	window.klass, 
	window.Code.Util,
	window.Code.PhotoSwipe.Quizz.Toolbar,
	window.Code.PhotoSwipe
));
