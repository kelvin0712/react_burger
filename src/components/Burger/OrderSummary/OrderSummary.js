import React from 'react';
import Auxx from '../../../hoc/Auxx';
import Button from '../../UI/Button/Button';

const orderSummary = (props) => {
	const ingredientSummary = Object.keys(props.ingredients)
	.map(iKey => {
		return (
			<li key={iKey}>
				<span style={{textTransform: 'capitalize' }}>{iKey}</span>: {props.ingredients[iKey]}
			</li> );
	});

	return (
		<Auxx>
			<h3>Your Order</h3>
			<p>Delicious burger with ingredients: </p>
			<ul>
				{ingredientSummary}
			</ul>
			<p><strong>Total Price:{props.price.toFixed(2)}</strong></p>
			<p>Continue to check out?</p>
			<Button btnType="Danger" clicked={props.purchaseCancel}>CANCEL</Button> 
			<Button btnType="Success" clicked={props.purchaseContinue}>CONTINUE</Button>
		</Auxx>
	);

};

export default orderSummary;