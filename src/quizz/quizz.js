// %%quizzyear%% by Lzbk
// Licensed under the MIT license
// version: %%quizzversion%%

(function(window, Util){
	
	Util.registerNamespace('Code.PhotoSwipe.Quizz');
	Util.registerNamespace('Code.PhotoSwipe');
	var PhotoSwipe = window.Code.PhotoSwipe, Quizz = window.Code.PhotoSwipe.Quizz;
	
	//Overload of the function. Would be nicer not to edit it, but not used in PhotoSwipe, so who cares?
	window.Code.PhotoSwipe.Cache.Functions.getImageMetaData = function(el){
		return  {id:Util.DOM.getAttribute(el, "id")};
	}
	
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
			instance = new Quizz.QuizzClass(question, options, id);
			PhotoSwipe.instances.push(instance);
		}
		else{
			throw 'Code.Quizz.createInstance: Instance with id "' + id +' already exists."';
		}
		
		return instance;
	
	};
		
}
(
	window, 
	window.Code.Util
));
