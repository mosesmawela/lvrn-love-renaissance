import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, X, Plus, Minus, ArrowRight, CreditCard, Check, Truck, ShieldCheck, Trash2, RotateCcw, AlertCircle, ChevronLeft, ChevronRight, Image as ImageIcon } from 'lucide-react';
import { GlassCard } from './GlassCard';
import { MERCH_PRODUCTS, MerchProduct } from '../constants';
import { useExperience } from './ExperienceProvider';

export interface CartItem extends MerchProduct {
    cartId: string;
    selectedSize: string;
    quantity: number;
}

interface MerchStoreProps {
    cart: CartItem[];
    isCartOpen: boolean;
    onToggleCart: () => void;
    onAddToCart: (product: MerchProduct, size: string) => void;
    onRemoveFromCart: (cartId: string) => void;
    onClearCart: () => void;
}

export const MerchStore: React.FC<MerchStoreProps> = ({ 
    cart, 
    isCartOpen, 
    onToggleCart, 
    onAddToCart, 
    onRemoveFromCart, 
    onClearCart 
}) => {
  const { showNotification } = useExperience();
  const [selectedProduct, setSelectedProduct] = useState<MerchProduct | null>(null);
  const [selectedSize, setSelectedSize] = useState<string>("");
  const [checkoutStep, setCheckoutStep] = useState(0); // 0: Cart, 1: Shipping, 2: Payment, 3: Success
  const [isProcessing, setIsProcessing] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  // Checkout Form State
  const [shippingForm, setShippingForm] = useState({ email: '', fName: '', lName: '', address: '', city: '', zip: '' });
  const [paymentForm, setPaymentForm] = useState({ card: '', expiry: '', cvc: '' });
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  // Reset local state when modal closes
  useEffect(() => {
      if (!selectedProduct) {
          setSelectedSize("");
          setCurrentImageIndex(0);
      }
  }, [selectedProduct]);

  // Cart Total
  const cartTotal = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);

  const handleAddToCart = () => {
      if (!selectedProduct) return;
      if (!selectedSize) {
          showNotification("Please select a size", "error");
          return;
      }
      // Simulated stock check
      if (Math.random() > 0.9) {
          showNotification("Sorry, this item just sold out in that size.", "error");
          return;
      }
      
      onAddToCart(selectedProduct, selectedSize);
      setSelectedProduct(null);
      showNotification("Added to Cart", "success");
  };

  const handleRemove = (item: CartItem) => {
      onRemoveFromCart(item.cartId);
      showNotification(`${item.name} removed`, 'info', {
          label: 'Undo',
          onClick: () => onAddToCart(item, item.selectedSize)
      });
  };

  // Gallery Controls
  const nextImage = (e?: React.MouseEvent) => {
      e?.stopPropagation();
      if (selectedProduct) setCurrentImageIndex(prev => (prev + 1) % selectedProduct.images.length);
  };
  const prevImage = (e?: React.MouseEvent) => {
      e?.stopPropagation();
      if (selectedProduct) setCurrentImageIndex(prev => (prev - 1 + selectedProduct.images.length) % selectedProduct.images.length);
  };

  // Form Handling
  const handleInputChange = (section: 'shipping' | 'payment', field: string, value: string) => {
      if (section === 'shipping') setShippingForm(prev => ({ ...prev, [field]: value }));
      else setPaymentForm(prev => ({ ...prev, [field]: value }));
      
      // Clear error
      if (formErrors[field]) {
          setFormErrors(prev => {
              const newErrors = { ...prev };
              delete newErrors[field];
              return newErrors;
          });
      }
  };

  const validateStep = (step: number) => {
      let isValid = true;
      const errors: Record<string, string> = {};

      if (step === 1) {
          if (!shippingForm.email.includes('@')) { errors.email = 'Invalid email'; isValid = false; }
          if (!shippingForm.fName) { errors.fName = 'Required'; isValid = false; }
          if (!shippingForm.address) { errors.address = 'Required'; isValid = false; }
          if (!shippingForm.zip) { errors.zip = 'Required'; isValid = false; }
      }
      if (step === 2) {
          if (paymentForm.card.length < 12) { errors.card = 'Invalid card number'; isValid = false; }
          if (!paymentForm.expiry) { errors.expiry = 'Required'; isValid = false; }
          if (paymentForm.cvc.length < 3) { errors.cvc = 'Invalid CVC'; isValid = false; }
      }

      setFormErrors(errors);
      if (!isValid) showNotification("Please correct the errors.", "error");
      return isValid;
  };

  const nextStep = () => {
      if (validateStep(checkoutStep)) setCheckoutStep(prev => prev + 1);
  };

  const handleCheckoutProcess = async () => {
      if (!validateStep(2)) return;

      setIsProcessing(true);
      try {
        await new Promise(r => setTimeout(r, 2500));
        setIsProcessing(false);
        setCheckoutStep(3);
        onClearCart();
        showNotification("Order placed successfully!", "success");
      } catch (e) {
          setIsProcessing(false);
          showNotification("Payment declined. Please try again.", "error");
      }
  };

  const renderProductModal = () => (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-md flex items-center justify-center p-4"
        onClick={() => setSelectedProduct(null)}
      >
          <motion.div 
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: 20 }}
            className="w-full max-w-4xl bg-[var(--bg-color)] border border-[var(--card-border)] rounded-3xl overflow-hidden shadow-2xl flex flex-col md:flex-row max-h-[90vh]"
            onClick={e => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
          >
              {/* Gallery Section */}
              <div className="md:w-1/2 bg-gray-100 dark:bg-zinc-900 relative group">
                  <img 
                    src={selectedProduct?.images[currentImageIndex]} 
                    alt={selectedProduct?.name} 
                    className="w-full h-full object-cover transition-opacity duration-300"
                  />
                  
                  {/* Gallery Nav */}
                  {(selectedProduct?.images.length || 0) > 1 && (
                      <>
                        <button onClick={prevImage} className="absolute left-4 top-1/2 -translate-y-1/2 p-2 bg-black/20 hover:bg-black/50 text-white rounded-full transition-colors opacity-0 group-hover:opacity-100">
                            <ChevronLeft size={20} />
                        </button>
                        <button onClick={nextImage} className="absolute right-4 top-1/2 -translate-y-1/2 p-2 bg-black/20 hover:bg-black/50 text-white rounded-full transition-colors opacity-0 group-hover:opacity-100">
                            <ChevronRight size={20} />
                        </button>
                        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                            {selectedProduct?.images.map((_, idx) => (
                                <div key={idx} className={`w-1.5 h-1.5 rounded-full transition-all ${idx === currentImageIndex ? 'bg-white w-3' : 'bg-white/50'}`} />
                            ))}
                        </div>
                      </>
                  )}

                  <button 
                    onClick={() => setSelectedProduct(null)}
                    className="absolute top-4 left-4 p-2 bg-black/50 text-white rounded-full md:hidden z-10"
                  >
                      <X size={20} />
                  </button>
              </div>

              {/* Details Section */}
              <div className="md:w-1/2 p-8 flex flex-col overflow-y-auto">
                  <div className="flex justify-between items-start mb-4">
                      <div>
                          <h2 className="text-2xl font-black text-[var(--text-color)] mb-1">{selectedProduct?.name}</h2>
                          <p className="text-[var(--text-secondary)]">{selectedProduct?.category}</p>
                      </div>
                      <p className="text-2xl font-bold text-[var(--accent)]">${selectedProduct?.price}</p>
                  </div>

                  <p className="text-[var(--text-secondary)] leading-relaxed mb-8">
                      {selectedProduct?.description}
                  </p>

                  <div className="mb-8">
                      <div className="flex justify-between items-center mb-3">
                          <p className="text-xs font-bold uppercase tracking-wider text-[var(--text-color)]">Select Size</p>
                          <a href="#" className="text-[10px] text-[var(--text-secondary)] underline">Size Guide</a>
                      </div>
                      <div className="flex flex-wrap gap-3">
                          {selectedProduct?.sizes.map(size => (
                              <button
                                key={size}
                                onClick={() => setSelectedSize(size)}
                                className={`px-4 py-2 rounded-lg border text-sm font-bold transition-all focus:outline-none focus:ring-2 focus:ring-[var(--accent)] ${
                                    selectedSize === size 
                                    ? 'bg-[var(--text-color)] text-[var(--bg-color)] border-[var(--text-color)]' 
                                    : 'border-[var(--card-border)] text-[var(--text-secondary)] hover:border-[var(--text-color)]'
                                }`}
                              >
                                  {size}
                              </button>
                          ))}
                      </div>
                  </div>

                  {/* Low Stock Indicator */}
                  {Math.random() > 0.7 && (
                      <div className="flex items-center gap-2 text-orange-500 text-xs font-bold uppercase tracking-wide mb-6 animate-pulse">
                          <AlertCircle size={14} /> Low Stock - Order Soon
                      </div>
                  )}

                  <button 
                    onClick={handleAddToCart}
                    className="w-full py-4 rounded-xl bg-[var(--accent)] text-white font-bold uppercase tracking-widest hover:brightness-110 transition-all shadow-lg mt-auto focus:outline-none focus:ring-4 focus:ring-[var(--accent)]/30 disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={!selectedSize}
                  >
                      {selectedSize ? `Add to Cart - $${selectedProduct?.price}` : 'Select a Size'}
                  </button>
              </div>
          </motion.div>
      </motion.div>
  );

  const renderCartDrawer = () => (
      <motion.div
        initial={{ x: '100%' }}
        animate={{ x: 0 }}
        exit={{ x: '100%' }}
        transition={{ type: "spring", damping: 25, stiffness: 200 }}
        className="fixed inset-y-0 right-0 z-[90] w-full md:w-[450px] bg-[var(--bg-color)] border-l border-[var(--card-border)] shadow-2xl flex flex-col focus:outline-none"
      >
          <div className="p-6 border-b border-[var(--card-border)] flex justify-between items-center bg-[var(--card-bg)]">
              <h2 className="text-xl font-black text-[var(--text-color)] flex items-center gap-2">
                  <ShoppingBag size={20} /> Cart ({cart.reduce((a, b) => a + b.quantity, 0)})
              </h2>
              <button onClick={onToggleCart} className="p-2 hover:bg-[var(--text-color)]/5 rounded-full text-[var(--text-color)]">
                  <X size={20} />
              </button>
          </div>

          <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {cart.length === 0 && checkoutStep === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-center">
                      <ShoppingBag size={48} className="text-[var(--text-secondary)] opacity-20 mb-4" />
                      <h3 className="text-lg font-bold text-[var(--text-color)] mb-2">Your cart is empty</h3>
                      <button onClick={onToggleCart} className="mt-4 px-8 py-3 rounded-full border border-[var(--text-color)]/20 text-[var(--text-color)] font-bold text-xs uppercase tracking-wider hover:bg-[var(--text-color)] hover:text-[var(--bg-color)] transition-all">
                          Start Shopping
                      </button>
                  </div>
              ) : (
                  <>
                    {/* Cart Items */}
                    {checkoutStep === 0 && cart.map(item => (
                        <div key={item.cartId} className="flex gap-4 p-3 rounded-xl bg-[var(--card-bg)] border border-[var(--card-border)]">
                            <img src={item.images[0]} alt={item.name} className="w-20 h-20 rounded-lg object-cover bg-gray-800" />
                            <div className="flex-1 flex flex-col justify-between">
                                <div className="flex justify-between items-start">
                                    <h3 className="font-bold text-[var(--text-color)] line-clamp-1">{item.name}</h3>
                                    <button onClick={() => handleRemove(item)} className="text-[var(--text-secondary)] hover:text-red-500">
                                        <Trash2 size={14} />
                                    </button>
                                </div>
                                <p className="text-sm text-[var(--text-secondary)]">{item.category} | Size: {item.selectedSize}</p>
                                <div className="flex justify-between items-center mt-2">
                                    <p className="text-[var(--accent)] font-bold">${item.price}</p>
                                    <div className="text-xs font-mono text-[var(--text-secondary)]">x{item.quantity}</div>
                                </div>
                            </div>
                        </div>
                    ))}
                    
                    {/* Shipping Form */}
                    {checkoutStep === 1 && (
                        <div className="space-y-4">
                            <h3 className="text-lg font-bold text-[var(--text-color)] mb-4 flex items-center gap-2"><Truck size={18} /> Shipping</h3>
                            <div className="space-y-2">
                                <input 
                                    type="email" 
                                    placeholder="Email" 
                                    value={shippingForm.email}
                                    onChange={(e) => handleInputChange('shipping', 'email', e.target.value)}
                                    className={`theme-input w-full p-3 rounded-lg ${formErrors.email ? 'border-red-500' : ''}`} 
                                    autoFocus 
                                />
                                {formErrors.email && <span className="text-xs text-red-500">{formErrors.email}</span>}
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <input type="text" placeholder="First Name" value={shippingForm.fName} onChange={(e) => handleInputChange('shipping', 'fName', e.target.value)} className={`theme-input p-3 rounded-lg ${formErrors.fName ? 'border-red-500' : ''}`} />
                                <input type="text" placeholder="Last Name" value={shippingForm.lName} onChange={(e) => handleInputChange('shipping', 'lName', e.target.value)} className="theme-input p-3 rounded-lg" />
                            </div>
                            <input type="text" placeholder="Address" value={shippingForm.address} onChange={(e) => handleInputChange('shipping', 'address', e.target.value)} className={`theme-input w-full p-3 rounded-lg ${formErrors.address ? 'border-red-500' : ''}`} />
                            <div className="grid grid-cols-2 gap-4">
                                <input type="text" placeholder="City" value={shippingForm.city} onChange={(e) => handleInputChange('shipping', 'city', e.target.value)} className="theme-input p-3 rounded-lg" />
                                <input type="text" placeholder="Zip Code" value={shippingForm.zip} onChange={(e) => handleInputChange('shipping', 'zip', e.target.value)} className={`theme-input p-3 rounded-lg ${formErrors.zip ? 'border-red-500' : ''}`} />
                            </div>
                        </div>
                    )}

                    {/* Payment Form */}
                    {checkoutStep === 2 && (
                        <div className="space-y-6">
                            <h3 className="text-lg font-bold text-[var(--text-color)] mb-4 flex items-center gap-2"><CreditCard size={18} /> Payment</h3>
                            <div className="space-y-4">
                                <input 
                                    type="text" 
                                    placeholder="Card Number" 
                                    value={paymentForm.card}
                                    onChange={(e) => handleInputChange('payment', 'card', e.target.value)}
                                    className={`theme-input w-full p-3 rounded-lg font-mono ${formErrors.card ? 'border-red-500' : ''}`} 
                                    autoFocus 
                                />
                                <div className="grid grid-cols-2 gap-4">
                                    <input type="text" placeholder="MM / YY" value={paymentForm.expiry} onChange={(e) => handleInputChange('payment', 'expiry', e.target.value)} className={`theme-input p-3 rounded-lg font-mono ${formErrors.expiry ? 'border-red-500' : ''}`} />
                                    <input type="text" placeholder="CVC" value={paymentForm.cvc} onChange={(e) => handleInputChange('payment', 'cvc', e.target.value)} className={`theme-input p-3 rounded-lg font-mono ${formErrors.cvc ? 'border-red-500' : ''}`} />
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Success */}
                    {checkoutStep === 3 && (
                        <div className="flex flex-col items-center justify-center text-center py-12">
                            <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center text-green-500 mb-6">
                                <Check size={40} />
                            </motion.div>
                            <h3 className="text-2xl font-black text-[var(--text-color)] mb-2">Order Confirmed!</h3>
                            <p className="text-[var(--text-secondary)] mb-8">Order #LVRN-{Math.floor(Math.random()*10000)} confirmed.</p>
                            <button onClick={() => { setCheckoutStep(0); onToggleCart(); }} className="px-8 py-3 bg-[var(--text-color)] text-[var(--bg-color)] rounded-full font-bold uppercase text-sm">
                                Continue Shopping
                            </button>
                        </div>
                    )}
                  </>
              )}
          </div>

          {cart.length > 0 && checkoutStep < 3 && (
              <div className="p-6 border-t border-[var(--card-border)] bg-[var(--card-bg)]">
                  <div className="flex justify-between items-center mb-4">
                      <span className="text-[var(--text-secondary)]">Total</span>
                      <span className="text-2xl font-black text-[var(--text-color)]">${cartTotal.toFixed(2)}</span>
                  </div>
                  <button 
                    onClick={checkoutStep === 0 ? () => setCheckoutStep(1) : (checkoutStep === 1 ? nextStep : handleCheckoutProcess)} 
                    disabled={isProcessing}
                    className="w-full py-4 rounded-xl bg-[var(--text-color)] text-[var(--bg-color)] font-bold uppercase tracking-widest flex items-center justify-center gap-2 hover:opacity-90 transition-opacity disabled:opacity-50"
                  >
                      {isProcessing ? 'Processing...' : (checkoutStep === 2 ? 'Pay Now' : 'Checkout')} <ArrowRight size={16} />
                  </button>
                  {checkoutStep > 0 && (
                      <button onClick={() => setCheckoutStep(prev => prev - 1)} className="w-full mt-2 py-3 text-xs text-[var(--text-secondary)] hover:text-[var(--text-color)] font-bold uppercase tracking-wider">
                          Back
                      </button>
                  )}
              </div>
          )}
      </motion.div>
  );

  return (
    <div className="min-h-screen py-12 relative">
      <AnimatePresence>
          {isCartOpen && <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[80]" onClick={onToggleCart} />}
      </AnimatePresence>

      <div className="max-w-7xl mx-auto px-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-12 flex justify-between items-end">
            <div>
                <h1 className="text-5xl md:text-7xl font-black text-[var(--text-color)] tracking-tighter mb-4">LVRN Shop</h1>
                <p className="text-xl text-[var(--text-secondary)] max-w-2xl">Exclusive apparel, vinyls, and accessories.</p>
            </div>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {MERCH_PRODUCTS.map((product, idx) => (
                <motion.div key={product.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.1 }}>
                    <GlassCard 
                        className="h-full flex flex-col group !p-0 overflow-hidden cursor-pointer"
                        onClick={() => setSelectedProduct(product)}
                    >
                        <div className="relative aspect-[3/4] overflow-hidden bg-gray-100 dark:bg-zinc-800">
                             <img src={product.images[0]} alt={product.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                             {(product.images.length > 1) && (
                                 <div className="absolute top-2 right-2 p-1 bg-black/50 rounded text-white text-[10px] flex items-center gap-1">
                                     <ImageIcon size={10} /> +{product.images.length - 1}
                                 </div>
                             )}
                        </div>
                        <div className="p-5 flex-1 flex flex-col">
                            <h3 className="text-lg font-bold text-[var(--text-color)] mb-1 leading-tight">{product.name}</h3>
                            <p className="text-[var(--text-secondary)] text-sm mb-4">{product.category}</p>
                            <div className="mt-auto flex justify-between items-center">
                                <span className="text-lg font-bold text-[var(--accent)]">${product.price}</span>
                                <button className="p-2 bg-[var(--text-color)]/5 hover:bg-[var(--text-color)] hover:text-[var(--bg-color)] rounded-full transition-colors">
                                    <Plus size={16} />
                                </button>
                            </div>
                        </div>
                    </GlassCard>
                </motion.div>
            ))}
        </div>
      </div>

      <AnimatePresence>
          {selectedProduct && renderProductModal()}
      </AnimatePresence>

      <AnimatePresence>
          {isCartOpen && renderCartDrawer()}
      </AnimatePresence>
    </div>
  );
};