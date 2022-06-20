"use strict";

//Выход из личного кабинета
const logoutButton = new LogoutButton();
logoutButton.action = () => ApiConnector.logout((responseBody) => {
	if (responseBody.success) {
		location.reload();
	}
});

//Получение информации о пользователе
ApiConnector.current((responseBody) => {
	if (responseBody.success) {
		ProfileWidget.showProfile(responseBody.data);
	}
});

//Получение текущих курсов валюты
const ratesBoard = new RatesBoard();
getRates();
setInterval(getRates, 60000);

function getRates() {
	ApiConnector.getStocks((responseBody) => {
		if (responseBody.success) {
			ratesBoard.clearTable();
			ratesBoard.fillTable(responseBody.data);
		}
	});
}


const moneyManager = new MoneyManager();

//Пополнение баланса
moneyManager.addMoneyCallback = (data) => {
	ApiConnector.addMoney(data, (responseBody) => {
		if (responseBody.success) {
			ProfileWidget.showProfile(responseBody.data);
			moneyManager.setMessage(true, "Баланс успешно пополнен!");
		}
		else {
			moneyManager.setMessage(false, responseBody.error);
		}
	});
};

//Конвертирование валюты
moneyManager.conversionMoneyCallback = (data) => {
	ApiConnector.convertMoney(data, (responseBody) => {
		console.log(responseBody);
		if (responseBody.success) {
			ProfileWidget.showProfile(responseBody.data);
			moneyManager.setMessage(true, "Перевод успешно выполнен!");
		}
		else {
			moneyManager.setMessage(false, responseBody.error);
		}
	});
};
