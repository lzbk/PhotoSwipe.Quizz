// %%quizzyear%% by Lzbk
// Licensed under the MIT license
// version: %%quizzversion%%

(function(window, klass, Util, Toolbar, PhotoSwipe){
	
	Util.registerNamespace('Code.PhotoSwipe.Quizz');
	var Quizz = PhotoSwipe.Quizz;
	
	Quizz.QuizzClass = window.Code.PhotoSwipe.PhotoSwipeClass.extend(function(){
	}).methods({
		initialize: function(images, options, id){
					this.supr(images, options, id);
					this.settings.getToolbar = Toolbar.getToolbar;
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
			window.alert('choisi !');
		},
		
		/*
		 * overload: onToolbarTap
		 */
		onToolbarTap: function(e){
		
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
