import React, { useState } from "react";
import { FaShoppingCart } from "react-icons/fa";
import ShoppingCart from "./ShoppingCart";

interface ShoppingCartIconProps {
	isOpen: boolean;
	toggleCart: () => void;
}

const ShoppingCartIcon: React.FC<ShoppingCartIconProps> = ({
	isOpen,
	toggleCart,
}) => {
	const [isCartOpen, setIsCartOpen] = useState(isOpen);

	const handleToggleCart = () => {
		setIsCartOpen(!isCartOpen);
		toggleCart();
	};

	return (
		<div>
			<button
				onClick={handleToggleCart}
				className='text-green-700 hover:text-green-900'
			>
				<FaShoppingCart className='w-6 h-6 mt-1' />
			</button>

			<ShoppingCart
				isOpen={isCartOpen}
				toggleCart={handleToggleCart}
				activeTab='cart'
			/>
		</div>
	);
};

export default ShoppingCartIcon;
