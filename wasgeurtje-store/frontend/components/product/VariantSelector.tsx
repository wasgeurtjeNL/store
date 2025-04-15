import React, { useState, useEffect } from 'react';

// Define types for the component
type VariantOption = {
  value: string;
};

type ProductVariant = {
  id: string;
  title: string;
  options: VariantOption[];
  prices: { amount: number; currency_code: string }[];
  inventory_quantity: number;
};

type ProductOption = {
  id: string;
  title: string;
  values: { value: string }[];
};

type VariantSelectorProps = {
  options: ProductOption[];
  variants: ProductVariant[];
  selectedVariant: ProductVariant;
  onVariantChange: (variant: ProductVariant) => void;
};

const VariantSelector = ({
  options,
  variants,
  selectedVariant,
  onVariantChange,
}: VariantSelectorProps) => {
  // Keep track of the selected options
  const [selectedOptions, setSelectedOptions] = useState<Record<string, string>>({});

  // Initialize selected options based on the selected variant
  useEffect(() => {
    if (selectedVariant && options.length > 0) {
      const optionMap: Record<string, string> = {};
      
      // Map each option to its value in the selected variant
      options.forEach((option, index) => {
        if (selectedVariant.options[index]) {
          optionMap[option.title] = selectedVariant.options[index].value;
        }
      });
      
      setSelectedOptions(optionMap);
    }
  }, [selectedVariant, options]);

  // Handle option change and find corresponding variant
  const handleOptionChange = (optionTitle: string, value: string) => {
    const newSelectedOptions = {
      ...selectedOptions,
      [optionTitle]: value,
    };
    
    setSelectedOptions(newSelectedOptions);
    
    // Find the variant that matches all selected options
    const matchingVariant = variants.find((variant) => {
      return options.every((option, index) => {
        return variant.options[index]?.value === newSelectedOptions[option.title];
      });
    });
    
    if (matchingVariant) {
      onVariantChange(matchingVariant);
    }
  };

  // If no options, don't render anything
  if (options.length === 0) return null;

  return (
    <div className="space-y-4">
      {options.map((option) => (
        <div key={option.id} className="space-y-2">
          <div className="flex items-center justify-between">
            <label
              htmlFor={option.id}
              className="block text-sm font-medium text-gray-700"
            >
              {option.title}
            </label>
            
            {selectedOptions[option.title] && (
              <span className="text-sm font-medium text-gray-900">
                {selectedOptions[option.title]}
              </span>
            )}
          </div>
          
          {/* For size options, display as buttons */}
          {option.title === 'Formaat' && (
            <div className="flex flex-wrap gap-2">
              {option.values.map((opValue) => {
                const isSelected = selectedOptions[option.title] === opValue.value;
                const isAvailable = variants.some(
                  (variant) =>
                    variant.options.some((opt) => opt.value === opValue.value) &&
                    variant.inventory_quantity > 0
                );
                
                return (
                  <button
                    key={opValue.value}
                    type="button"
                    className={`
                      relative inline-flex items-center justify-center rounded-md border py-2 px-4 text-sm font-medium
                      ${
                        isSelected
                          ? 'border-indigo-500 bg-indigo-50 text-indigo-700'
                          : isAvailable
                          ? 'border-gray-300 bg-white text-gray-900 hover:bg-gray-50'
                          : 'border-gray-200 bg-gray-50 text-gray-400 cursor-not-allowed'
                      }
                    `}
                    disabled={!isAvailable}
                    onClick={() => handleOptionChange(option.title, opValue.value)}
                  >
                    {opValue.value}
                  </button>
                );
              })}
            </div>
          )}
          
          {/* For fragrance options, display as select */}
          {option.title === 'Geur' && (
            <select
              id={option.id}
              name={option.title}
              value={selectedOptions[option.title] || ''}
              onChange={(e) => handleOptionChange(option.title, e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
            >
              {option.values.map((opValue) => (
                <option key={opValue.value} value={opValue.value}>
                  {opValue.value}
                </option>
              ))}
            </select>
          )}
        </div>
      ))}
    </div>
  );
};

export default VariantSelector; 