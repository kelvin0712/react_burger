import React, { Component } from 'react';
import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.css';
import axios from '../../../axios-orders';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';
import {connect} from 'react-redux';
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../../store/actions/index';
import {updatedObject, checkValidity} from '../../../shared/utility';

class ContactData extends Component {
	state = {
		orderForm: {
			name: {
				elementType: 'input',
				elementConfig: {
					type: 'text',
					placeholder: 'your name'
				},
				value: '',
				validation: {
					required: true
				},
				valid: false,
				touched: false
			},
			street: {
				elementType: 'input',
				elementConfig: {
					type: 'text',
					placeholder: 'street'
				},
				value: '',
				validation: {
					required: true,
					minLength: 5,
					maxLength: 8
				},
				valid: false,
				touched: false
			},
			country: {
				elementType: 'input',
				elementConfig: {
					type: 'text',
					placeholder: 'your address'
				},
				value: '',
				validation: {
					required: true
				},
				valid: false,
				touched: false
			},
			email: {
				elementType: 'input',
				elementConfig: {
					type: 'email',
					placeholder: 'your email'
				},
				value: '',
				validation: {
					required: true
				},
				valid: false,
				touched: false
			},	
			deliveryMethod: {
				elementType: 'select',
				elementConfig: {
					options: [
					{value: 'fastest', displayValue: 'Fastest'},
					{value: 'lowest', displayValue: 'Lowest'}
					]
				},
				value: 'lowest',
				validation: {},
				valid: true
			}
		},
		formIsValid:false,
		
	}

	orderHandler = (event) => {
		event.preventDefault();
	
		const formData = {};
		for (let formElementIdentifier in this.state.orderForm) {
			formData[formElementIdentifier] = this.state.orderForm[formElementIdentifier].value;
		}
		const order = {
			ingredients: this.props.ings,
			price: this.props.price,
			orderData: formData,
			userId: this.props.userId
		}	

		this.props.onOrderBurger(order, this.props.token);
	}

	inputChangedHandler = (event, inputIndentifier) => {
		const updatedFormElement = updatedObject(this.state.orderForm[inputIndentifier], {
			value: event.target.value,
			valid: checkValidity(event.target.value, this.state.orderForm[inputIndentifier].validation),
			touched: true
		});

		const updatedOrderForm = updatedObject(this.state.orderForm, {
			[inputIndentifier]:  updatedFormElement
		});
	

		let formIsValid = true;
		for (let inputIndentifier in updatedOrderForm) {
			formIsValid = updatedOrderForm[inputIndentifier].valid && formIsValid;
		} 
		this.setState({orderForm: updatedOrderForm, formIsValid: formIsValid});
	}

	render() {
		const formElementArray = [];
		for (let key in this.state.orderForm) {
			formElementArray.push({
				id: key, 
				config: this.state.orderForm[key]
			});
		}

		let form = (
			<form onSubmit={this.orderHandler}>
				{formElementArray.map(formElement => (
					<Input 
						key={formElement.id}
						//label={formElement.id}
						elementType={formElement.config.elementType}
						elementConfig={formElement.config.elementConfig}
						value={formElement.config.value}	
						invalid={!formElement.config.valid}
						shouldValidate={formElement.config.validation}
						touched={formElement.config.touched}
						changed={(event) => this.inputChangedHandler(event, formElement.id)} 
						/>
					))}
				<Button btnType="Success" disabled={!this.state.formIsValid}>ORDER</Button>
			</form>
		);

		if (this.props.loading) {
			form = <Spinner />;
		}

		return(
				<div className={classes.ContactData}> 
					<h4>Enter your Contact </h4>
					{form}
				</div> 
			);
	}
}

const mapStateToProps = state => {
	return {
		ings: state.burgerBuilder.ingredients,
		price: state.burgerBuilder.totalPrice,
		loading: state.order.loading,
		token: state.auth.token,
		userId: state.auth.userId

	};
}

const mapDispatchToProps = dispatch => {
	return {
		onOrderBurger: (orderData, token) => dispatch(actions.purchaseBurger(orderData, token)),

	}
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(ContactData, axios));