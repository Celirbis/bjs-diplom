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

//Операции с деньгами
const moneyManager = new MoneyManager();

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

moneyManager.conversionMoneyCallback = (data) => {
	ApiConnector.convertMoney(data, (responseBody) => {
		if (responseBody.success) {
			ProfileWidget.showProfile(responseBody.data);
			moneyManager.setMessage(true, "Конвертация успешно выполнена!");
		}
		else {
			moneyManager.setMessage(false, responseBody.error);
		}
	});
};

moneyManager.sendMoneyCallback = (data) => {
	ApiConnector.transferMoney(data, (responseBody) => {
		if (responseBody.success) {
			ProfileWidget.showProfile(responseBody.data);
			moneyManager.setMessage(true, "Перевод успешно выполнен!");
		}
		else {
			moneyManager.setMessage(false, responseBody.error);
		}
	});
};

//Избранное 
const favoritesWidget = new FavoritesWidget();

ApiConnector.getFavorites((responseBody) => {
	if (responseBody.success) {
		favoritesWidget.clearTable();
		favoritesWidget.fillTable(responseBody.data);
		moneyManager.updateUsersList(responseBody.data);
	}
});

favoritesWidget.addUserCallback = (data) => {
	ApiConnector.addUserToFavorites(data, (responseBody) => {
		if (responseBody.success) {
			favoritesWidget.clearTable();
			favoritesWidget.fillTable(responseBody.data);
			moneyManager.updateUsersList(responseBody.data);
			favoritesWidget.setMessage(true, 'Пользователен добавлен');
		} else {
			favoritesWidget.setMessage(false, responseBody.error);
		}
	});
};

favoritesWidget.removeUserCallback = (data) => {
	ApiConnector.removeUserFromFavorites(data, (responseBody) => {
		if (responseBody.success) {
			favoritesWidget.clearTable();
			favoritesWidget.fillTable(responseBody.data);
			moneyManager.updateUsersList(responseBody.data);
			favoritesWidget.setMessage(true, 'Пользователен удален');
		} else {
			favoritesWidget.setMessage(false, responseBody.error);
		}
	});
};