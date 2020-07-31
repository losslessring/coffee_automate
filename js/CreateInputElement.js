function CreateInputElement(descriptionObject) {
	
	

	// Создание элемента
	let elem = document.createElement(`${descriptionObject.elementType}`)
	

	elem.setAttribute('type', `${descriptionObject.inputType}`);
	elem.setAttribute('id', `${descriptionObject.id}`);
	elem.setAttribute('value', `${descriptionObject.defaultValue}`);
	elem.setAttribute('min', `${descriptionObject.minValue}`);
	elem.setAttribute('max', `${descriptionObject.maxValue}`);
	

	document.getElementById(`${descriptionObject.containerId}`).appendChild(elem)

	


  	// Добавление обработчика событий
    document.getElementById(`${descriptionObject.id}`).addEventListener(`${descriptionObject.event}`, function(e){

    			// Проверка ввода некорректных значений в input
    			if(descriptionObject.inputValueCheck === true){
    				this.value = ( isNaN(this.value) || this.value <= 0 || !isFinite(this.value)) ? null : this.value	
            	}
			    if (e.keyCode === descriptionObject.keyCode) {
			    	 
			        descriptionObject.messageTargetObject.message(({"messageMethod":"addMoney",
								        	"messageValue":this.value}))
				//this.value
			      
			      
			    }
			  })

	this.update = function(descriptionObject) {
	
	}
	

}