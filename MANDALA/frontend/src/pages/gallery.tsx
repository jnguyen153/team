import { useState } from 'react';
import { X } from 'lucide-react';

const images = [
  {
    url: 'https://images.pexels.com/photos/7181612/pexels-photo-7181612.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    title: 'Hand Drawn',
  },
  {
    url: 'https://img.freepik.com/free-vector/hand-drawn-mandala-lotus-flower-drawing_23-2149380813.jpg?t=st=1742399015~exp=1742402615~hmac=bb877963e00fd84e0c8e61612f1b9094f637a7ae4c9cc6ba6592a64c54c2f15e&w=900',
    title: 'Custom Orders',
  },
  {
    url: 'https://images.pexels.com/photos/1447934/pexels-photo-1447934.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    title: 'Digital',
  },

];

const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  return (
    <section id="gallery" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-16">
          Our Work
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {images.map((image, index) => (
            <div
              key={index}
              className="relative h-64 rounded-lg overflow-hidden cursor-pointer"
              onClick={() => setSelectedImage(image.url)}
            >
              <img
                src={image.url}
                alt={image.title}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 hover:scale-110"
              />
              <div className="absolute inset-0 bg-black bg-opacity-70 opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <h3 className="text-white text-xl font-semibold">{image.title}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>

      {selectedImage && (
        <div className="fixed inset-0 bg-black bg-opacity-70 z-50 flex items-center justify-center p-4">
          <button
            onClick={() => setSelectedImage(null)}
            className="absolute top-4 right-4 text-white hover:text-red-500"
          >
            <X size={32} />
          </button>
          <img
            src={selectedImage}
            alt="Gallery"
            className="max-w-full max-h-[90vh] object-contain"
          />
        </div>
      )}
    </section>
  );
};

export default Gallery;