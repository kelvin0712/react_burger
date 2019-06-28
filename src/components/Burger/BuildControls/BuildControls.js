import React from 'react';
import classes from './BuildControls.css';
import BuildControl from './BuildControl/BuildControl.js'

const controls = [
	{ label: 'Salad', type: 'salad'},
	{ label: 'Bacon', type: 'bacon'},
	{ label: 'Cheese', type: 'cheese'},
	{ label: 'Meat', type: 'meat'},
];

const buildControls = (props) => (
		<div className = {classes.BuildControls}>
			<p>Current Price: <strong>{props.price.toFixed(2)}</strong></p>
			{controls.map(ctrl => (
				<BuildControl 
				key={ctrl.label} 
				label={ctrl.label} 
				added={() => props.ingredientAdded(ctrl.type)}
				removed={() => props.ingredientRemoved(ctrl.type)}
				disabled={props.disabled[ctrl.type]}/> 	
				))}
			<button
				onClick={props.ordered} 
				className={classes.OrderButton}
				disabled ={!props.purchaseable}>{props.isAuth ? 'ORDER NOW' : 'SIGN UP TO ORDER' }

			</button>
		</div>
	);

export default buildControls;