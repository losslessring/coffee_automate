function CreateElement(descriptionObject) {
	
	// Создание элемента
	var div = document.createElement(`${descriptionObject.elementType}`)
	
	div.innerHTML = `<div class="${descriptionObject.class}" id="${descriptionObject.id}">${descriptionObject.text}</div>`

  	document.getElementById(`${descriptionObject.containerId}`).appendChild(div)
	
	
  	// Переписываю переменную из переданного объекта в замыкание, чтобы обновлять нормально
	let value = descriptionObject.messageValue

  	// Добавление обработчика событий
    document.getElementById(`${descriptionObject.id}`).addEventListener(`${descriptionObject.event}`, function(){

    	descriptionObject.messageTargetObject.message({"messageMethod": `${descriptionObject.messageMethod}`,
													"messageValue": value
													})
    	})

	this.update = function(descriptionObject) {
		document.getElementById(`${descriptionObject.id}`).innerHTML = `${descriptionObject.text}</div>`
		value = descriptionObject.messageValue
		//console.log(value)

	}
	

}