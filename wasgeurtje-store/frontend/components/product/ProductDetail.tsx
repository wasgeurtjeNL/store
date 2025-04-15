import React, { useState } from 'react';
import Image from 'next/image';
import VariantSelector from './VariantSelector';
import AddToCartButton from '../cart/AddToCartButton';

// Define product type based on Medusa schema
type ProductVariant = {
  id: string;
  title: string;
  options: { value: string }[];
  prices: { amount: number; currency_code: string }[];
  inventory_quantity: number;
};

type ProductOption = {
  id: string;
  title: string;
  values: { value: string }[];
};

type ProductImage = {
  id: string;
  url: string;
};

type Fragrance = {
  id: string;
  name: string;
  description: string;
  icon: string;
  intensity: string;
  notes: string[];
};

type Product = {
  id: string;
  title: string;
  description: string;
  handle: string;
  thumbnail: string;
  price: number;
  variants: ProductVariant[];
  options: ProductOption[];
  images: ProductImage[];
  fragrance: Fragrance;
};

type Props = {
  product: Product;
};

// Price formatter for Euros
const formatPrice = (amount: number): string => {
  return new Intl.NumberFormat('nl-NL', {
    style: 'currency',
    currency: 'EUR',
  }).format(amount / 100);
};

const ProductDetail = ({ product }: Props) => {
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant>(product.variants[0]);
  const [selectedImage, setSelectedImage] = useState<string>(product.images[0]?.url || product.thumbnail);
  const [quantity, setQuantity] = useState<number>(1);

  // Handle variant selection
  const handleVariantChange = (variant: ProductVariant) => {
    setSelectedVariant(variant);
  };

  // Handle quantity changes
  const handleQuantityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setQuantity(parseInt(e.target.value, 10));
  };

  // Handle image selection
  const handleImageSelect = (imageUrl: string) => {
    setSelectedImage(imageUrl);
  };

  // Calculate current price
  const currentPrice = selectedVariant?.prices[0]?.amount || product.price;
  const formattedPrice = formatPrice(currentPrice);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {/* Product Images */}
      <div className="space-y-4">
        <div className="relative aspect-square w-full overflow-hidden rounded-lg bg-gray-100">
          <Image 
            src={selectedImage} 
            alt={product.title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
            priority
          />
        </div>
        <div className="flex space-x-2 overflow-auto pb-2">
          {product.images.map((image) => (
            <button
              key={image.id}
              className={`relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-md ${
                selectedImage === image.url ? 'ring-2 ring-indigo-500' : 'ring-1 ring-gray-200'
              }`}
              onClick={() => handleImageSelect(image.url)}
            >
              <Image
                src={image.url}
                alt=""
                fill
                className="object-cover"
                sizes="80px"
              />
            </button>
          ))}
        </div>
      </div>

      {/* Product Info */}
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">{product.title}</h1>
          <p className="mt-2 text-xl font-medium text-gray-900">{formattedPrice}</p>
        </div>

        {/* Fragrance Details */}
        <div className="border-t border-b py-4">
          <div className="flex items-center space-x-3">
            <div className="relative h-10 w-10">
              <Image
                src={product.fragrance.icon}
                alt={product.fragrance.name}
                fill
                className="object-contain"
                sizes="40px"
              />
            </div>
            <div>
              <h3 className="font-medium">{product.fragrance.name} Geur</h3>
              <p className="text-sm text-gray-500">{product.fragrance.intensity} intensiteit</p>
            </div>
          </div>
          <div className="mt-2">
            <p className="text-sm text-gray-600">{product.fragrance.description}</p>
            <div className="mt-2 flex flex-wrap gap-1">
              {product.fragrance.notes.map((note) => (
                <span 
                  key={note} 
                  className="inline-flex items-center rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-800"
                >
                  {note}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Product Description */}
        <div>
          <h3 className="text-sm font-medium text-gray-900">Beschrijving</h3>
          <div className="mt-2 space-y-4 text-gray-600">
            <p>{product.description}</p>
          </div>
        </div>

        {/* Variant Selection */}
        <div>
          <VariantSelector
            options={product.options}
            variants={product.variants}
            selectedVariant={selectedVariant}
            onVariantChange={handleVariantChange}
          />
        </div>

        {/* Quantity Selection */}
        <div>
          <label htmlFor="quantity" className="block text-sm font-medium text-gray-700">
            Aantal
          </label>
          <select
            id="quantity"
            name="quantity"
            className="mt-1 block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-base sm:text-sm"
            value={quantity}
            onChange={handleQuantityChange}
          >
            {[...Array(10)].map((_, i) => (
              <option key={i + 1} value={i + 1}>
                {i + 1}
              </option>
            ))}
          </select>
        </div>

        {/* Add to Cart */}
        <AddToCartButton 
          variant={selectedVariant} 
          quantity={quantity} 
          product={product}
        />

        {/* Stock Information */}
        <p className="text-sm text-gray-500">
          {selectedVariant.inventory_quantity > 0 
            ? `${selectedVariant.inventory_quantity} op voorraad` 
            : 'Niet op voorraad'}
        </p>
      </div>
    </div>
  );
};

export default ProductDetail; 