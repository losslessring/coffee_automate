

// Функция принимает div, куда вставить кофе автомат
function CreateCoffeeAutomateInterface(container) {
		
		
		/* Генерируем случайную стоку, чтобы маркировать ей элементы, сгенерированные в каждом контейнере, 
		   для того, чтобы они между собой не путались, если есть несколько контейнеров.
		   Кстати, а почему у меня кофе автоматы между собой не путаются ?
		   Потому что каждый контейнерсоздает свой экземпляр Кофе Автомата ?
		   Наверное да. Уже запутался.
		*/
		let containerId = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
		       
       	// Создаем объект Кофе Автомат и передаем ему ресурсы: кофе, воду, цену.
       	let coffeeAutomate = new CoffeeAutomate(   {"coffee": 3,
       												"water": 3,
       											 	"price": 50
       											 	})	
       	// Объект для хранения элементов, чтобы был к нему доступ из функций
       	let elementsList = {}
		
		init()
		
		// Функция для изначальной генерации html кнопок и поля ввода
		function init() {

				let resources = coffeeAutomate.message({"messageMethod":"getResources",
								        				"messageValue":null})



		 		document.getElementById(`${container}`).innerHTML = `<div id ="${containerId}" class="application">`
		


		 		// ЗАДАЧА Переписать генерацию всех чивов через CreateElement

		 		elementsList.addInputField = new CreateInputElement( {"container": container,
		 												"elementType":"input",
		 												"inputType":"number", 
								        				"containerId": containerId, 
								        				"defaultValue":25,
								        				"minValue":1,
								        				"maxValue":100000000,
								        				"inputValueCheck": true,
								        				"text": "",
								        				"class":"input",
								        				"id":`input_${containerId}`,
								        				"messageTargetObject":coffeeAutomate,
								        				"messageMethod":"addMoney",
								        				"messageValue":25,
								        				"event":"keyup",
								        				"keyCode": 13
		        										})


		 		elementsList.addMoneyButton = new CreateElement( {"container": container,
		 												"elementType":"div", 
								        				"containerId": containerId, 
								        				"text": "Ввести деньги",
								        				"class":"item",
								        				"id":`button_${containerId}`,
								        				"messageTargetObject":coffeeAutomate,
								        				"messageMethod":"addMoney",
								        				"messageValue":0,
								        				"event":"click"
		        										})

		        elementsList.displayResourcesButton = new CreateElement( {"container": container, 
								        				"elementType":"div", 
								        				"containerId": containerId, 
								        				"text":`Осталось кофе ${resources.coffee}<br>
																Осталось воды ${resources.water}<br>
																Цена ${resources.price}<br>
																Введенные деньги ${resources.totalMoney}<br>
																Сдача ${resources.change}`,
								        				"class":"item",
								        				"id":`display_resources_${containerId}`,
								        				"messageTargetObject":coffeeAutomate,
								        				"messageMethod":"getResources",
								        				"messageValue":null,
								        				"event":"click"
		        										})
		 	
		 		elementsList.giveChangeButton = new CreateElement( {"container": container,
		 												"elementType":"div", 
								        				"containerId": containerId, 
								        				"text": "Ваша сдача",
								        				"class":"item",
								        				"id":`take_change_${containerId}`,
								        				"messageTargetObject":coffeeAutomate,
								        				"messageMethod":"giveChange",
								        				"messageValue":null,
								        				"event":"click"
		        										})
		        elementsList.giveCoffeeButton = new CreateElement( {"container": container,
		        										"elementType":"div", 
								        				"containerId": containerId, 
								        				"text": "Возьмите кофе",
								        				"class":"item",
								        				"id":`take_coffee_${containerId}`,
								        				"messageTargetObject":coffeeAutomate,
								        				"messageMethod":"giveCoffee",
								        				"messageValue":null,
								        				"event":"click"
								        			})
		 	
		 	update()
			addEvents()		  
   
		     
		}

		// Передавать в функцию id элемента, и стиль на который изменить. Чтобы разнести обновление текста и стиля.
		function updateStyle(elem, style) {
			document.getElementById(elem).className = style
		}
		// Функция изменяет стиль элемента на active, inactive, offline
		function updateButtonStyle(resourceObject) {
			if (resourceObject.change > 0) {
				updateStyle(`take_change_${containerId}`,`active`)	
			} else updateStyle(`take_change_${containerId}`,`inactive`)	

			if (resourceObject.coffee_unlock === true) {
				updateStyle(`take_coffee_${containerId}`,`active`)
				updateStyle(`button_${containerId}`,`inactive`)
			} else {
				updateStyle(`take_coffee_${containerId}`,`inactive`)
				updateStyle(`button_${containerId}`,`active`)
			}

			if (resourceObject.workStatus !== true) {								
				updateStyle(`button_${containerId}`,`offline`)
			}
		}

		// Функция обновляет содержимое кнопок, запрашивая данные из объекта кофе автомата
		function update() {

			


			let resources = coffeeAutomate.message({"messageMethod":"getResources",
								        				"messageValue":null})

			
			
			updateButtonStyle(resources)

			


			
			elementsList.giveChangeButton.update({"id":`take_change_${containerId}`,
								        	"text":`Возьмите сдачу ${resources.change}`})

			elementsList.displayResourcesButton.update( {"id":`display_resources_${containerId}`,
								        	"text":`Осталось кофе ${resources.coffee}<br>
													Осталось воды ${resources.water}<br>
													Цена ${resources.price}<br>
													Введенные деньги ${resources.totalMoney}<br>
													Сдача ${resources.change}`
		        							})

			
			elementsList.addMoneyButton.update( {
								        				"text": `Ввести деньги<br>${document.getElementById(`input_${containerId}`).value}`,
								        				"id":`button_${containerId}`,
								        				"messageValue": document.getElementById(`input_${containerId}`).value,
								        				
		        										})
			// Проверить статус работы автомата и поменять текст
			if (resources.workStatus !== true) {
				elementsList.addMoneyButton.update( {								        				
								        				"text":`Автомат не работает`,								        				
								        				"id":`button_${containerId}`,
		        										})
			}
			
			updateButtonStyle(resources)

		}

		// Добавление событий на приложение, чтобы обновлялись кнопки
		function addEvents() {

			// Апдейт по клику в любом месте окна application
			document.getElementById(`${containerId}`).addEventListener('click', function() {
                   
            	
                update()
                   
            })	
			
			// На обработчике keydown обновлялось все с запаздыванием на 1 шаг
			document.getElementById(`${containerId}`).addEventListener('keyup', function() {
                   
            	
                update()
                   
            })	

            
        }

      

}


