import React from 'react';
import ProductDetail from '../../../components/product/ProductDetail';

// Define types for the product detail page
type Props = {
  params: {
    handle: string;
  };
};

// This is the product detail page component
export default async function ProductPage({ params }: Props) {
  const { handle } = params;
  
  // In a real implementation, we would fetch the product from the Medusa API
  // For now, we'll use a mock product
  const product = {
    id: 'prod_123',
    title: 'Lavendel Wasparfum',
    description: 'Een rustgevende geur die je wasgoed een heerlijke frisse lavendelgeur geeft. Perfect voor beddengoed en handdoeken.',
    handle: 'lavendel-wasparfum',
    thumbnail: '/images/lavender.jpg',
    price: 1495, // Price in cents
    variants: [
      {
        id: 'variant_1',
        title: '100ml Lavendel',
        options: [{ value: '100ml' }, { value: 'Lavendel' }],
        prices: [{ amount: 1495, currency_code: 'EUR' }],
        inventory_quantity: 25
      },
      {
        id: 'variant_2',
        title: '250ml Lavendel',
        options: [{ value: '250ml' }, { value: 'Lavendel' }],
        prices: [{ amount: 2495, currency_code: 'EUR' }],
        inventory_quantity: 15
      },
      {
        id: 'variant_3',
        title: '500ml Lavendel',
        options: [{ value: '500ml' }, { value: 'Lavendel' }],
        prices: [{ amount: 3995, currency_code: 'EUR' }],
        inventory_quantity: 10
      }
    ],
    options: [
      {
        id: 'opt_size',
        title: 'Formaat',
        values: [{ value: '100ml' }, { value: '250ml' }, { value: '500ml' }]
      },
      {
        id: 'opt_fragrance',
        title: 'Geur',
        values: [{ value: 'Lavendel' }]
      }
    ],
    images: [
      {
        id: 'img_1',
        url: '/images/lavender_1.jpg'
      },
      {
        id: 'img_2',
        url: '/images/lavender_2.jpg'
      }
    ],
    fragrance: {
      id: 'frag_1',
      name: 'Lavendel',
      description: 'Een rustgevende bloemige geur met frisse ondertonen',
      icon: '/images/icons/lavender.svg',
      intensity: 'Medium',
      notes: ['Bloemen', 'Kruidig', 'Fris']
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <ProductDetail product={product} />
    </div>
  );
} 