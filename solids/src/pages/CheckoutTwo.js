import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

export function CheckoutTwo({ isAuthenticated }) {
  const location = useLocation();
  const navigate = useNavigate();
  const productFromState = location.state ? location.state.product : { 
    _id: 1, 
    name: "Sample Product", 
    price: 2000, // Example price in cents
    quantity: 1, 
    images: [{ 
      data: { data: [] }, 
      contentType: "image/png" 
    }] 
  };

  const [product, setProduct] = useState(productFromState);
  const [name, setName] = useState('John Doe');
  const [address, setAddress] = useState('123 Main St');
  const [city, setCity] = useState('New York');
  const [postalcode, setPostalcode] = useState('10001');
  const [state, setState] = useState('NY');

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  const renderImage = (image) => {
    if (!image || !image.data || !image.data.data) return null;
    let binary = '';
    const bytes = new Uint8Array(image.data.data);
    const len = bytes.byteLength;
    for (let i = 0; i < len; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    const base64String = window.btoa(binary);
    return `data:${image.contentType};base64,${base64String}`;
  };

  const removeProduct = () => {
    setProduct(null);
    navigate(-1); // Navigate back if product is removed
  };

  const goBack = () => {
    navigate(-1); // Navigate back to the previous page
  };

  const calculateTotalPrice = (price) => {
    return (price * 1).toFixed(2); // Convert price to correct value
  };

  if (!product) {
    return null;
  }

  return (
    <>
      <div className="mx-auto my-4 max-w-4xl md:my-6">
        <div className="flex justify-between items-center mb-4">
          <button onClick={goBack} className="text-lg font-semibold text-gray-900">←</button>
        </div>
        <div className="overflow-hidden rounded-xl shadow">
          <div className="grid grid-cols-1 md:grid-cols-2">
            {/* Contact Info */}
            <div className="px-5 py-6 text-gray-900 md:px-8">
              <div className="flow-root">
                <div className="-my-6 divide-y divide-gray-200">
                  <div className="py-6">
                    <form>
                      <div className="mx-auto max-w-2xl px-4 lg:max-w-none lg:px-0">
                        <div>
                          <h3 id="contact-info-heading" className="text-lg font-semibold text-gray-900">
                            Contact information
                          </h3>
                          <div className="mt-4 w-full">
                            <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70" htmlFor="name">
                              Full Name
                            </label>
                            <input
                              className="flex h-10 w-full rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm placeholder:text-gray-600 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                              type="text"
                              value={name}
                              onChange={(e) => setName(e.target.value)}
                              placeholder="Enter your name"
                              id="name"
                            ></input>
                          </div>
                        </div>
                        <div className="mt-10">
                          <h3 className="text-lg font-semibold text-gray-900">Shipping address</h3>
                          <div className="mt-6 grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-3">
                            <div className="sm:col-span-3">
                              <label htmlFor="address" className="block text-sm font-medium text-gray-700">
                                Address
                              </label>
                              <div className="mt-1">
                                <input
                                  type="text"
                                  id="address"
                                  name="address"
                                  value={address}
                                  onChange={(e) => setAddress(e.target.value)}
                                  autoComplete="street-address"
                                  className="flex h-10 w-full rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                                />
                              </div>
                            </div>
                            <div>
                              <label htmlFor="city" className="block text-sm font-medium text-gray-700">
                                City
                              </label>
                              <div className="mt-1">
                                <input
                                  type="text"
                                  id="city"
                                  name="city"
                                  value={city}
                                  onChange={(e) => setCity(e.target.value)}
                                  autoComplete="address-level2"
                                  className="flex h-10 w-full rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                                />
                              </div>
                            </div>
                            <div>
                              <label htmlFor="region" className="block text-sm font-medium text-gray-700">
                                State / Province
                              </label>
                              <div className="mt-1">
                                <input
                                  type="text"
                                  id="region"
                                  name="region"
                                  value={state}
                                  onChange={(e) => setState(e.target.value)}
                                  autoComplete="address-level1"
                                  className="flex h-10 w-full rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                                />
                              </div>
                            </div>
                            <div>
                              <label htmlFor="postal-code" className="block text-sm font-medium text-gray-700">
                                Postal code
                              </label>
                              <div className="mt-1">
                                <input
                                  type="text"
                                  id="postal-code"
                                  name="postal-code"
                                  value={postalcode}
                                  onChange={(e) => setPostalcode(e.target.value)}
                                  autoComplete="postal-code"
                                  className="flex h-10 w-full rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                        <hr className="my-8" />
                        <div className="mt-10">
                          <h3 className="text-lg font-semibold text-gray-900">Billing information</h3>
                          <div className="mt-6 flex items-center">
                            <input
                              id="same-as-shipping"
                              name="same-as-shipping"
                              type="checkbox"
                              defaultChecked
                              className="h-4 w-4 rounded border-gray-300 text-black focus:ring-black"
                            />
                            <div className="ml-2">
                              <label htmlFor="same-as-shipping" className="text-sm font-medium text-gray-900">
                                Same as shipping information
                              </label>
                            </div>
                          </div>
                        </div>
                        <div className="mt-10 flex justify-end border-t border-gray-200 pt-6">
                          <button
                            type="button"
                            className="rounded-md bg-[#617a4f] px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-[#617a4f] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                          >
                            Make payment
                          </button>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
            {/* Product List */}
            <div className="bg-gray-100 px-5 py-6 md:px-8">
              <div className="flow-root">
                <ul className="-my-7 divide-y divide-gray-200">
                  <li className="flex items-stretch justify-between space-x-5 py-7">
                    <div className="flex flex-1 items-stretch">
                      <div className="flex-shrink-0">
                        <img
                          className="h-20 w-20 rounded-lg border border-gray-200 bg-white object-contain"
                          src={renderImage(product.images[0])}
                          alt={product.name}
                        />
                      </div>
                      <div className="ml-5 flex flex-col justify-between">
                        <div className="flex-1">
                          <p className="text-sm font-bold">{product.name}</p>
                          <p className="mt-1.5 text-sm font-medium text-gray-500">
                            Sample dimensions
                          </p>
                        </div>
                        <p className="mt-4 text-xs font-medium cursor-pointer text-red-500" onClick={removeProduct}>x</p>
                      </div>
                    </div>
                    <div className="ml-auto flex flex-col items-end justify-between">
                      <p className="text-right text-sm font-bold text-gray-900">₹{calculateTotalPrice(product.price)}</p>
                    </div>
                  </li>
                </ul>
              </div>
              <hr className="mt-6 border-gray-200" />
              <ul className="mt-6 space-y-3">
                <li className="flex justify-between">
                  <p className="text-sm font-medium text-gray-500">Total Price</p>
                  <p className="text-sm font-bold text-gray-900">₹{calculateTotalPrice(product.price)}</p>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
