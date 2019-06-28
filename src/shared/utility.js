export const updatedObject = (oldObject, newProperties) => {
	return {
		...oldObject,
		...newProperties
	}
}

export const checkValidity = (value, rules) => {
	let isValid = true;

	if (rules.required) {
		isValid = value.trim() !== '' && isValid;
	}

	if (rules.minLength) {
		isValid = value.length  >= rules.minLength && isValid;
	}

	if (rules.maxLength) {
		isValid = value.length  <= rules.maxLength && isValid;
	}

	if (rules.isEmail) {
		const pattern = /^\w+([-]?\w+)*@\w+([-]?\w+)*(\w{2,3})+$/;
		isValid = pattern.test(value) && isValid
	}

	if (rules.isNumeric) {
		const pattern = /^\d+$/;
		isValid = pattern.test(value) && isValid
	}

	return isValid
}