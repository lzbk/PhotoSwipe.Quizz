// %%quizzyear%% by Lzbk
// Licensed under the MIT license
// version: %%quizzversion%%

(function(window, Util){
	
	Util.registerNamespace('Code.PhotoSwipe.Quizz');
	Util.registerNamespace('Code.PhotoSwipe');
	var PhotoSwipe = window.Code.PhotoSwipe, Quizz = window.Code.PhotoSwipe.Quizz;
	
	//PhotoSwipe.CssClasses = PhotoSwipe.CssClasses;
	
	/*
	 * Function: Code.PhotoSwipe.attach
	 */
	Quizz.attach = function(question, options, id){
		
		var i, j, instance, image, images;
		
		instance = Quizz.createInstance(question, options, id);
		images = question.images();
		
		// Add click event handlers if applicable
		for (i=0, j=images.length; i<j; i++){
			
			image = images[i];
			if (!Util.isNothing(image.nodeType)){
				if (image.nodeType === 1){
					// DOM element
					image.__photoSwipeClickHandler = PhotoSwipe.onTriggerElementClick.bind(instance);
					Util.Events.remove(image, 'click', image.__photoSwipeClickHandler);
					Util.Events.add(image, 'click', image.__photoSwipeClickHandler);
				}
			}
			
		}
		
		return instance;
		
	};
	
	
	
	/*
	 * jQuery plugin
	 */
	if (window.jQuery){
		
		window.jQuery.fn.quizz = function(options, id){
		
			return Quizz.attach(this, options, id);
			
		};
		
		
	}
	
	
	/*
	 * Function: Code.PhotoSwipe.Quizz.createInstance
	 */
	Quizz.createInstance = function(question, options, id){
		
		var instance;
		
		options = Util.coalesce(options, { });
		
		instance = PhotoSwipe.getInstance(id);
		
		if (Util.isNothing(instance)){
			instance = new Quizz.QuizzClass(question.images(), options, id);
			PhotoSwipe.instances.push(instance);
		}
		else{
			throw 'Code.Quizz.createInstance: Instance with id "' + id +' already exists."';
		}
		
		return instance;
	
	};
	
/*	Quizz.Toolbar.getToolbar = function(){
		
		return '<div class="' + PhotoSwipe.Toolbar.CssClasses.close + '"><div class="' + PhotoSwipe.Toolbar.CssClasses.toolbarContent + '"></div></div><div class="' + PhotoSwipe.Toolbar.CssClasses.play + '"><div class="' + PhotoSwipe.Toolbar.CssClasses.toolbarContent + '"></div></div><div class="' + PhotoSwipe.Toolbar.CssClasses.choose + '"><div class="' + PhotoSwipe.Toolbar.CssClasses.toolbarContent + '"></div></div><div class="' + PhotoSwipe.Toolbar.CssClasses.previous + '"><div class="' + PhotoSwipe.Toolbar.CssClasses.toolbarContent + '"></div></div><div class="' + PhotoSwipe.Toolbar.CssClasses.next + '"><div class="' + PhotoSwipe.Toolbar.CssClasses.toolbarContent + '"></div></div>';
		
	};
	
	Quizz.Toolbar.ToolbarAction = {
		close: 'close',
		play: 'play',
		next: 'next',
		previous: 'previous',
		choose: 'choose',
		none: 'none'
	};*/
	
}
(
	window, 
	window.Code.Util
));
