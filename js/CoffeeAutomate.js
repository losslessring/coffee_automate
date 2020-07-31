	/*
		Объект Кофе Автомат. Логика такая - вносим деньги до нужной суммы, когда наберем нужную сумму, то срабатывает
		флаг переключения выдачи кофе coffee_unlock, и автомат выдает 1 стакан кофе.
		Кофе автомат не имеет никакого выхода во внешний мир, и ничего о внешнем мире не знает.
		Эта сущность сама в себе обитает. Это верно.
		Все переменные для этого объекта локальны и находятся в замыкании, доступ к объекту осуществляется
		только через сообщения, которые ему передаются.
		У него открыт один метод message, который принимает сообщения в виде 2 параметров method, value,
		и с помощью объекта messageTranslator переводит запросы из внешних к внутренним.

		Вместо swich case используется объект, как сделать написано здесь 
		http://frontiermag.ru/switch-from-switch.html

		ЗАДАНИЕ - сделать проверку внутренних данных объекта
		 сделать, чтобы при выключении автомата он не принимал деньги,
		 сделать ограничение на размер массива
		 Сделать проверку на размер передаваемого числа - можно переполнить лог огромными числами, 
		 они же сохраняются у меня в объекте.
		 Добавить проверку размера введенных данных, у меня пока сохраняет сообщение до проверки - можно
		 передать крупный txt файл и он переполнит лог. Либо отключить лог, либо вести лог ошибок, либо 
		 сделать проверки на длину до занесения в лог, и вводить только ошибки.
		 Либо сделать по отдельности проверку method и value.

		 Есть еще ошибки, связанные с плавающей точкой, связанные с представлением чисел в js.
	*/
	function CoffeeAutomate(resources) {
		
		

		let totalMoney = 0		
		let change = 0

		let coffee_unlock = false
		let messageLog = []
		
		

		// Объект для перевода сообщений в приватные методы объекта
		this.message = function(descriptionObj){

			//console.log(descriptionObj)
			let method = descriptionObj.messageMethod
			let value = descriptionObj.messageValue

			let messageTranslator = {
				"addMoney"     : addMoney,						
				"getResources" : getResources,
				"giveCoffee"   : giveCoffee,
				"giveChange"   : giveChange
			}

			//ЭТО ГЛАВНАЯ ИНСТРУКЦИЯ, запускающая объект, вместо switch переключающий сообщения в локальные функции
			return messageTranslator[method](value)
			

/*
			// Функция для обработки ошибок сообщений, получилась сложноватой, 
			//но чтобы потренироваться с try catch throw
			function messageCheck(method, value) {

				//Сохраняю лог всех запросов к объекту
				function messageToLog(log, method, value, maxLength = 100){
					let messageObject = {}
					messageObject[method] = value
					log.push(messageObject)				
					
					// Сдвигаем элементы массива, чтобы его не переполнить
					if (log.length >= maxLength ) {
						log.shift()
					}
					console.log(log)
				}

				//Функция, обнуляющая некорректные данные с поля ввода
				function resetValue(value) {
					return value = 0
				}

				// Функция, обрезающая длину введенных данных, чтобы лог не стал слишком большим,
				// и объект не упал, если кто то будет вводить стоки по 100 мегабайт
				function trimValueLength(value, length){
					if(typeof value === 'string'){

						if (value.length > length) {
							value = value.substring(0,length) + `TRIMMED FROM ${value.length} TO ${length} SYMBOLS`
							return value
						} else return value
					}
				}


				//Записываем в лог все сообщения, обрезая длину у слишком большие
				messageToLog(messageLog, method, trimValueLength(value, 1000))



				// Обработка ошибок ввода денег				
				try {
					if(method === "addMoney"){
						if( isNaN(Number(value)) || value <= 0 || !isFinite(value) || value.length > 1000){
							throw new Error(`MessageError: ${trimValueLength(value, 1000)} is not a valid number`)

						}
					}
				}
				catch(e) {
					messageToLog(messageLog, method,`${e.name}:${e.message}:${e.stack}`)
					value = resetValue(value) // Обнуляем некорректные данные
					console.log(`${e.name}:${e.message}\n${e.stack}`)
				}
				





				// Обработка ошибок запроса несуществующих методов
				try {
					if (messageTranslator.hasOwnProperty(method)) {				
						
						// ЭТО ГЛАВНАЯ ИНСТРУКЦИЯ, запускающая объект, вместо switch переключающий сообщения в локальные функции
						return messageTranslator[method](value) 
					
					} else throw new Error(`MessageError: ${method} is not defined in CoffeeAutomate`) 
				
				}
				catch(e) {
					messageToLog(messageLog, method,`${e.name}:${e.message}:${e.stack}`) // Добавляем в лог 
					console.log(`${e.name}:${e.message}\n${e.stack}`)
				}
			}
			// Запуск проверки сообщения
			return messageCheck(method, value)
		*/
		}
			
		
		
		// Метод для ввода денег
		function addMoney(inputMoney) {
			if(checkResources(resources)){

				if (coffee_unlock === false) {
					// Просим деньги, пока не наберем нужную сумму
					if ( totalMoney < resources.price ) {
						inputMoney = Number(inputMoney)
						console.log(`Вы ввели сейчас ${inputMoney}`)
						//Проверяем,чтобы ввели цифры, не отрицательное значение, и не очень большое и складываем деньги
						totalMoney += ( isNaN(inputMoney) || inputMoney <= 0 || !isFinite(inputMoney)) ? 0 : inputMoney
						console.log(`Вы ввели в общем ${totalMoney}. Нужно ${resources.price}`)
						if (totalMoney > resources.price ) {
							unlockCoffee()
							change = totalMoney - resources.price
						}
						if (totalMoney === resources.price ) {
							unlockCoffee()
							totalMoney = 0
							inputMoney = 0
							change = 0
							console.log(`totalMoney ${totalMoney}`)
							console.log(`inputMoney ${inputMoney}`)
						}
					} 
				}
		    }
		}
		// Проверка ресурсов. Если хотя бы одно поле меньше или равно 0, проваливаем проверку.
		function checkResources(obj) {
			let check = true
			Object.keys(obj).forEach(function(key) {
		    
		    if (obj[key] <= 0) {
		    	
		    	check =  false
		    }
		   
		    
			})
			return check
		}


		// Скрытый метод, переключающий флаг выдачи кофе
		function unlockCoffee() {
			
			
					coffee_unlock = true
					console.log(`coffee_unlock = ${coffee_unlock}`)
			
			
		}

		// Скрытый метод, переключающий флаг выдачи кофе
		function lockCoffee() {
			coffee_unlock = false
			
		}

		// Метод выдает статус кофе автомата - работает или нет
		function getWorkStatus() {
			if(checkResources(resources)) return true
			else return false
		}

		// Метод, который возвращает информацию о ресурсах кофе автомата
		function getResources() {
			return {"coffee":resources.coffee, "water":resources.water, "price":resources.price, totalMoney, change, coffee_unlock, workStatus:getWorkStatus()}

		}


		// Автомат выдает 1 стакан кофе, и переключает флаги
		function giveCoffee() {

			 if (coffee_unlock === true){
				// Уменьшаем воду и кофе на 1
				resources.coffee -= 1
				resources.water -= 1	
				console.log(`Осталось кофе ${resources.coffee}`)

				lockCoffee()
			}
		}

	
		
		// Метод для выдачи сдачи
		function giveChange() {
			if (change > 0 ) {
				// Обнуляем деньги
				totalMoney = 0
				inputMoney = 0
				change = 0
			}
		}

	}



