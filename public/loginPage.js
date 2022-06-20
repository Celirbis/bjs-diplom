"use strict";

const userForm = new UserForm();
userForm.loginFormCallback = (data) => {
	ApiConnector.login(data, (responseBody) => {
		if (responseBody.success) {
			location.reload();
		} else {
			userForm.setLoginErrorMessage(responseBody.error);
		}
	});
};

userForm.registerFormCallback = (data) => {
	ApiConnector.register(data, (responseBody) => {
		if (responseBody.success) {
			location.reload();
		} else {
			userForm.RegisterErrorMessage(responseBody.error);
		}
	});
};
