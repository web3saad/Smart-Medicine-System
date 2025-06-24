import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Notification = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecentProducts = async () => {
      try {
        const res = await axios.get('http://localhost:5001/api/v1/products?limit=5&page=1&sort=-createdAt');
        const recentProducts = res.data?.data || [];
        setProducts(recentProducts);
      } catch (err) {
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };
    fetchRecentProducts();
  }, []);

  if (loading) return (
    <div className="flex items-center justify-center min-h-[40vh]">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-700"></div>
    </div>
  );

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-xl shadow-2xl mt-10 border border-gray-200">
      <h2 className="text-3xl font-extrabold text-green-800 mb-6 text-center tracking-tight">Recently Added Products</h2>
      {products.length === 0 ? (
        <div className="text-center text-gray-500 text-lg">No recent products found.</div>
      ) : (
        <ul className="space-y-6">
          {products.map((product, idx) => (
            <li key={idx} className="flex flex-col md:flex-row items-center gap-6 bg-gradient-to-r from-green-50 to-green-100 border border-green-200 rounded-lg p-5 shadow hover:shadow-lg transition-shadow duration-200">
              <div className="flex-shrink-0 w-24 h-24 bg-white border border-green-200 rounded-lg flex items-center justify-center overflow-hidden">
                {product.imageUrl ? (
                  <img src={`http://localhost:5001/uploads/products/${product.imageUrl}`} alt={product.name} className="object-contain w-full h-full" />
                ) : (
                  <span className="text-gray-400">No Image</span>
                )}
              </div>
              <div className="flex-1 w-full">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                  <div>
                    <div className="text-xl font-bold text-green-900 mb-1">{product.name}</div>
                    <div className="text-sm text-gray-600 mb-1">Generic: <span className="font-medium text-gray-800">{product.generic}</span></div>
                    <div className="text-sm text-gray-600 mb-1">Measurement: <span className="font-medium text-gray-800">{product.measurement}</span></div>
                    <div className="text-sm text-gray-600 mb-1">Price: <span className="font-semibold text-green-700">₹{product.price}</span></div>
                  </div>
                  <div className="mt-3 md:mt-0 md:ml-6 text-center md:text-right">
                    <span className="inline-block bg-green-200 text-green-900 font-semibold px-4 py-2 rounded-full text-sm shadow-sm mb-2">Items are Back in Stock</span>
                    <div className="text-xs text-gray-700 font-medium">Reminder to Purchase your Medicine</div>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Notification;
