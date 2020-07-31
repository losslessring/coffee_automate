	/*
	Объект Message Hub для централизации обмена сообщениями
	*/
	function MessageHub(initObject) {
		

		
		

		// Объект для перевода сообщений в приватные методы объекта
		this.message = function(descriptionObject){

			//console.log(descriptionObj)
			let method = descriptionObj.messageMethod
			let value = descriptionObj.messageValue
/*
			let messageTranslator = {
				"addMoney"     : addMoney,						
				"getResources" : getResources,
				"giveCoffee"   : giveCoffee,
				"giveChange"   : giveChange
			}*/

			//ЭТО ГЛАВНАЯ ИНСТРУКЦИЯ, запускающая объект, вместо switch переключающий сообщения в локальные функции
		//	return messageTranslator[method](value)
			


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
					//	return messageTranslator[method](value) 
					
					} else throw new Error(`MessageError: ${method} is not defined in CoffeeAutomate`) 
				
				}
				catch(e) {
					messageToLog(messageLog, method,`${e.name}:${e.message}:${e.stack}`) // Добавляем в лог 
					console.log(`${e.name}:${e.message}\n${e.stack}`)
				}
			}
			// Запуск проверки сообщения
			return messageCheck(method, value)
		
		}
			
		
		
		


