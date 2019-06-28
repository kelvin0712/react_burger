import React from 'react';
import classes from './Burger.css';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';

const burger = (props) => {
	let transfomredIngredients = Object.keys(props.ingredients)
	.map(igKey => {
		return [...Array(props.ingredients[igKey])].map((_, i) => {
			return <BurgerIngredient key={igKey + i} type={igKey} />;
		});
	} )
	 .reduce((arr, el) => {
	 	return arr.concat(el)
	 }, []);  
	 if (transfomredIngredients.length === 0) {
	 	transfomredIngredients = <p>Please start adding ingredients</p>;
	 }
	return (
		<div className={classes.Burger}> 
			<BurgerIngredient type = "bread-top"/>
			{transfomredIngredients}
			<BurgerIngredient type = "bread-bottom"/>
		</div>
	);
};

export default burger;