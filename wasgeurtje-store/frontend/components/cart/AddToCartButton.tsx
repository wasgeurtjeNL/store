import React, { useState } from 'react';

// Define types for the component props
type ProductVariant = {
  id: string;
  title: string;
  prices: { amount: number; currency_code: string }[];
  inventory_quantity: number;
};

type Product = {
  id: string;
  title: string;
  thumbnail: string;
};

type AddToCartButtonProps = {
  variant: ProductVariant;
  quantity: number;
  product: Product;
};

const AddToCartButton = ({ variant, quantity, product }: AddToCartButtonProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isAdded, setIsAdded] = useState(false);

  // In a real implementation, this would call the Medusa API to add the product to the cart
  const handleAddToCart = async () => {
    if (variant.inventory_quantity < quantity) {
      alert('Niet genoeg voorraad beschikbaar.');
      return;
    }

    setIsLoading(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 800));

      // In a real app, you would call something like:
      // await medusaClient.carts.addLineItem({
      //   cart_id: cartId,
      //   variant_id: variant.id,
      //   quantity
      // });
      
      console.log('Added to cart:', {
        product: product.title,
        variant: variant.title,
        quantity,
        price: variant.prices[0]?.amount
      });

      // Show feedback
      setIsAdded(true);
      setTimeout(() => setIsAdded(false), 2000);
    } catch (err) {
      console.error('Error adding to cart:', err);
      alert('Er is een fout opgetreden bij het toevoegen aan je winkelwagen. Probeer het later opnieuw.');
    } finally {
      setIsLoading(false);
    }
  };

  // Check if the item is in stock
  const isOutOfStock = variant.inventory_quantity < 1;
  const notEnoughStock = variant.inventory_quantity < quantity;

  return (
    <div className="mt-2">
      <button
        type="button"
        onClick={handleAddToCart}
        disabled={isLoading || isOutOfStock || notEnoughStock}
        className={`w-full rounded-md px-6 py-3 text-base font-medium text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 ${
          isAdded
            ? 'bg-green-600 hover:bg-green-700 focus:ring-green-500'
            : isOutOfStock || notEnoughStock
            ? 'bg-gray-400 cursor-not-allowed'
            : 'bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500'
        }`}
      >
        {isLoading ? (
          <span className="flex items-center justify-center">
            <svg
              className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
            Toevoegen...
          </span>
        ) : isAdded ? (
          <span className="flex items-center justify-center">
            <svg
              className="-ml-1 mr-2 h-5 w-5"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </svg>
            Toegevoegd!
          </span>
        ) : isOutOfStock ? (
          'Niet op voorraad'
        ) : notEnoughStock ? (
          'Niet genoeg op voorraad'
        ) : (
          'Toevoegen aan winkelwagen'
        )}
      </button>

      {/* Extra stock warning */}
      {!isOutOfStock && notEnoughStock && (
        <p className="mt-2 text-sm text-red-600">
          Slechts {variant.inventory_quantity} op voorraad
        </p>
      )}
    </div>
  );
};

export default AddToCartButton; 