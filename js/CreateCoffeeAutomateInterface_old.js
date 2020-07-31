

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
		
		init()
		
		// Функция для изначальной генерации html кнопок и поля ввода
		function init() {

		 		document.getElementById(`${container}`).innerHTML = `<div id ="${containerId}" class="application">
                <input type="number" class="input" id="input_${containerId}" value ="25" min="1" max="10000000000000000000000"/>
                <div class="item" id="button_${containerId}">Ввести деньги</div>
                <div class="item" id="display_coffee_${containerId}"></div>
		        <div class="item" id="take_change_${containerId}">Ваша сдача 0</div>
		        <div class="item" id="take_coffee_${containerId}">Возьмите кофе</div>`
		 	
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
				document.getElementById(`button_${containerId}`).innerHTML = `Автомат не работает`
				
				updateStyle(`button_${containerId}`,`offline`)
			}
		}

		// Функция обновляет содержимое кнопок, запрашивая данные из объекта кофе автомата
		function update() {

			


			let resources = coffeeAutomate.message("getResources")

			
			updateButtonStyle(resources)

			


			document.getElementById(`take_change_${containerId}`).innerHTML = `Возьмите сдачу ${resources.change}`
			
			document.getElementById(`display_coffee_${containerId}`).innerHTML =   `Осталось кофе ${resources.coffee}
																					Осталось воды ${resources.water}
																					Цена ${resources.price}
																					Введенные деньги ${resources.totalMoney}
																					Сдача ${resources.change}`

		}

		// Добавление событий на кнопки
		function addEvents() {
			

			let inputBox = document.getElementById(`input_${containerId}`)
            	
			// Добавление ввода в поле при нажатии Enter
            inputBox.addEventListener('keydown', function(e) {
			    if (e.keyCode === 13) {
			      
			      coffeeAutomate.message("addMoney", this.value)
			      update()
			      
			    }
			  })
            
       

            document.getElementById(`button_${containerId}`).addEventListener('click', function() {
                   
                
                coffeeAutomate.message("addMoney", inputBox.value)
                //coffeeAutomate.message("addMoney2", inputBox.value)
                update()
                   
            })
            
             document.getElementById(`take_change_${containerId}`).addEventListener('click', function() {
                   
               
                coffeeAutomate.message("giveChange")
                update()
                   
            })
            
            document.getElementById(`take_coffee_${containerId}`).addEventListener('click', function() {
                   
               
                coffeeAutomate.message("giveCoffee")
                update()
                   
            })
            
        }

      

}


