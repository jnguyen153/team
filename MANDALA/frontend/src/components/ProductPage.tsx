import { useState } from 'react';

interface product {
  id: number;
  name: string;
  price: number;
  image: string;
  category: string;
}

interface ProductPageProps {
  product: product;
}

const ProductPage = ({ product }: ProductPageProps) => {
  const [selectedColor, setSelectedColor] = useState('Black');

  const handleColorChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedColor(e.target.value);
  };

  return (
    <div className="max-w-6xl mx-auto p-12 mt-12">
      <div className="flex flex-wrap justify-center mb-12">
        <div className="w-full lg:w-2/3 xl:w-3/4 mb-4 lg:mb-0">
          <img
            src={product.image}
            alt={product.name}
            className="max-w-2xl w-full h-auto object-contain mb-4"
          />
        </div>
        <div className="w-full lg:w-1/3 xl:w-1/4">
          <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
          <p className="text-lg font-medium mb-4">${product.price.toFixed(2)}</p>
          <p className="text-lg font-medium mb-4">Category: {product.category}</p>

          {/* Color customization */}
          <div className="mb-6">
            <label htmlFor="color" className="block mb-2 text-md font-medium text-gray-700">
              Choose a color:
            </label>
            <select
              id="color"
              value={selectedColor}
              onChange={handleColorChange}
              className="block w-full border border-gray-300 rounded px-3 py-2"
            >
              <option value="Black">Black</option>
              <option value="Blue">Blue</option>
              <option value="Red">Red</option>
              <option value="Purple">Purple</option>
              <option value="Custom">Custom (please specify at checkout)</option>
            </select>
          </div>

          <button className="bg-gray-900 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded w-full">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
