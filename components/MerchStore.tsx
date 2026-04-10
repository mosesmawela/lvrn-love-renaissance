import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, X, Plus, Minus, ArrowRight, CreditCard, Check, Truck, ShieldCheck, Trash2, RotateCcw, AlertCircle, ChevronLeft, ChevronRight, Image as ImageIcon, Search, Filter, Heart, Star, Sparkles, Tag } from 'lucide-react';
import { GlassCard } from './GlassCard';
import { MERCH_PRODUCTS } from '../constants';
import { MerchProduct } from '../types';
import { useExperience } from './ExperienceProvider';

// Skeleton Loading Component
const ProductSkeleton = () => (
  <div className="animate-pulse">
    <GlassCard className="h-full flex flex-col !p-0 overflow-hidden">
      <div className="aspect-[4/5] bg-gray-200 dark:bg-zinc-700"></div>
      <div className="p-5 space-y-3">
        <div className="h-5 bg-gray-200 dark:bg-zinc-700 rounded w-3/4"></div>
        <div className="h-4 bg-gray-200 dark:bg-zinc-700 rounded w-1/2"></div>
        <div className="h-4 bg-gray-200 dark:bg-zinc-700 rounded w-2/3"></div>
        <div className="flex justify-between items-center pt-2">
          <div className="h-6 bg-gray-200 dark:bg-zinc-700 rounded w-16"></div>
          <div className="h-4 bg-gray-200 dark:bg-zinc-700 rounded w-12"></div>
        </div>
      </div>
    </GlassCard>
  </div>
);

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
    onUpdateQuantity?: (cartId: string, quantity: number) => void;
    onClearCart: () => void;
}

export const MerchStore: React.FC<MerchStoreProps> = ({ 
    cart, 
    isCartOpen, 
    onToggleCart, 
    onAddToCart, 
    onRemoveFromCart, 
    onUpdateQuantity,
    onClearCart 
}) => {
  const { showNotification } = useExperience();
  const [selectedProduct, setSelectedProduct] = useState<MerchProduct | null>(null);
  const [selectedSize, setSelectedSize] = useState<string>("");
  const [checkoutStep, setCheckoutStep] = useState(0); // 0: Cart, 1: Shipping, 2: Payment, 3: Success
  const [isProcessing, setIsProcessing] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Search & Filter State
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [sortBy, setSortBy] = useState<string>('featured');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 150]);
  const [wishlist, setWishlist] = useState<Set<string>>(new Set());
  
  // Promo code state
  const [promoCode, setPromoCode] = useState('');
  const [appliedPromo, setAppliedPromo] = useState<{code: string; discount: number; type: 'percent' | 'fixed'} | null>(null);
  const [promoError, setPromoError] = useState('');

  // Checkout Form State
  const [shippingForm, setShippingForm] = useState({ email: '', fName: '', lName: '', address: '', city: '', zip: '' });
  const [paymentForm, setPaymentForm] = useState({ card: '', expiry: '', cvc: '' });
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);

  // Reset local state when modal closes
  useEffect(() => {
      if (!selectedProduct) {
          setSelectedSize("");
          setCurrentImageIndex(0);
      }
  }, [selectedProduct]);

  // Cart Total
  const cartTotal = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);

  // Filtered and Sorted Products
  const filteredProducts = useMemo(() => {
    setIsLoading(true);

    // Simulate loading delay for better UX demonstration
    setTimeout(() => setIsLoading(false), 300);

    let filtered = MERCH_PRODUCTS.filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           product.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           product.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
      const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1];

      return matchesSearch && matchesCategory && matchesPrice;
    });

    // Sort products
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        case 'name':
          return a.name.localeCompare(b.name);
        case 'newest':
          return b.id.localeCompare(a.id); // Assuming higher ID = newer
        default: // 'featured'
          return 0; // Keep original order for featured
      }
    });

    return filtered;
  }, [searchQuery, selectedCategory, priceRange, sortBy]);

  // Get unique categories
  const categories = useMemo(() => {
    const cats = ['All', ...Array.from(new Set(MERCH_PRODUCTS.map(p => p.category)))];
    return cats;
  }, []);

  // Toggle wishlist
  const toggleWishlist = (productId: string) => {
    setWishlist(prev => {
      const newWishlist = new Set(prev);
      if (newWishlist.has(productId)) {
        newWishlist.delete(productId);
        showNotification('Removed from wishlist', 'info');
      } else {
        newWishlist.add(productId);
        showNotification('Added to wishlist', 'success');
      }
      return newWishlist;
    });
  };

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

  const handleQuickAddToCart = (product: MerchProduct) => {
    // For products with sizes, select the first available size
    // For products without sizes (like vinyl), use "One Size"
    const defaultSize = product.sizes[0] || "One Size";

    // Simulated stock check
    if (Math.random() > 0.95) {
        showNotification("Sorry, this item just sold out.", "error");
        return;
    }

    onAddToCart(product, defaultSize);
    showNotification(`Added ${product.name} to cart`, "success");
  };

  const handleRemove = (item: CartItem) => {
      onRemoveFromCart(item.cartId);
      showNotification(`${item.name} removed`, 'info', {
          label: 'Undo',
          onClick: () => onAddToCart(item, item.selectedSize)
      });
  };

  const handleUpdateQuantity = (cartId: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      const item = cart.find(item => item.cartId === cartId);
      onRemoveFromCart(cartId);
      if (item) {
        showNotification(`${item.name} removed`, 'info', {
          label: 'Undo',
          onClick: () => onAddToCart(item, item.selectedSize)
        });
      }
      return;
    }

    if (onUpdateQuantity) {
      onUpdateQuantity(cartId, Math.min(newQuantity, 10));
    }
  };

  // Promo code handling
  const applyPromoCode = () => {
    const code = promoCode.trim().toUpperCase();
    setPromoError('');
    
    const promoCodes: Record<string, { discount: number; type: 'percent' | 'fixed' }> = {
      'LVRN10': { discount: 10, type: 'percent' },
      'LOVE20': { discount: 20, type: 'percent' },
      'MUSIC15': { discount: 15, type: 'fixed' },
      'VIP25': { discount: 25, type: 'percent' }
    };
    
    if (promoCodes[code]) {
      setAppliedPromo({ code, ...promoCodes[code] });
      showNotification(`Promo code applied: ${promoCodes[code].discount}${promoCodes[code].type === 'percent' ? '%' : '$'} off!`, 'success');
    } else {
      setPromoError('Invalid promo code');
    }
    setPromoCode('');
  };
  
  const removePromo = () => {
    showNotification('Promo code removed', 'info');
    setAppliedPromo(null);
  };
  
  // Calculate discounted total
  const discountAmount = useMemo(() => {
    if (!appliedPromo) return 0;
    if (appliedPromo.type === 'percent') {
      return cartTotal * (appliedPromo.discount / 100);
    }
    return Math.min(appliedPromo.discount, cartTotal);
  }, [appliedPromo, cartTotal]);
  
  const finalTotal = cartTotal - discountAmount;

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

                   <p className="text-[var(--text-secondary)] leading-relaxed mb-6">
                       {selectedProduct?.description}
                   </p>

                   {/* Product Details */}
                   <div className="mb-6 p-4 bg-[var(--card-bg)] rounded-lg border border-[var(--card-border)]">
                       <h4 className="font-bold text-[var(--text-color)] mb-3 text-sm uppercase tracking-wider">Product Details</h4>
                       <div className="grid grid-cols-2 gap-4 text-sm">
                           <div>
                               <span className="text-[var(--text-secondary)]">Category:</span>
                               <span className="text-[var(--text-color)] ml-2 font-medium">{selectedProduct?.category}</span>
                           </div>
                           <div>
                               <span className="text-[var(--text-secondary)]">SKU:</span>
                               <span className="text-[var(--text-color)] ml-2 font-mono text-xs">{selectedProduct?.id.toUpperCase()}</span>
                           </div>
                           <div className="col-span-2">
                               <span className="text-[var(--text-secondary)]">Materials:</span>
                               <span className="text-[var(--text-color)] ml-2">
                                 {selectedProduct?.category === 'Apparel' ? '100% Cotton' :
                                  selectedProduct?.category === 'Music' ? 'Vinyl/CD' :
                                  'Various Materials'}
                               </span>
                           </div>
                       </div>
                   </div>

                   {/* Rating */}
                   <div className="flex items-center gap-2 mb-6">
                       <div className="flex items-center gap-1">
                         {[...Array(5)].map((_, i) => (
                           <Star key={i} size={16} className="text-yellow-400 fill-current" />
                         ))}
                       </div>
                       <span className="text-sm text-[var(--text-secondary)]">(4.8) • 127 reviews</span>
                   </div>

                  <div className="mb-8">
                       <div className="flex justify-between items-center mb-4">
                           <p className="text-sm font-bold uppercase tracking-wider text-[var(--text-color)]">Select Size</p>
                           <button
                             onClick={() => showNotification("Size guide coming soon! For now: S/M fits 5'4-5'8, L/XL fits 5'8-6'2", "info")}
                             className="text-xs text-[var(--accent)] hover:underline font-medium"
                           >
                             Size Guide
                           </button>
                       </div>

                       {selectedProduct?.sizes[0] !== 'One Size' ? (
                         <div className="grid grid-cols-3 gap-2">
                             {selectedProduct?.sizes.map(size => (
                                 <button
                                   key={size}
                                   onClick={() => setSelectedSize(size)}
                                   className={`py-3 px-2 rounded-lg border text-sm font-bold transition-all focus:outline-none focus:ring-2 focus:ring-[var(--accent)] text-center ${
                                       selectedSize === size
                                       ? 'bg-[var(--accent)] text-white border-[var(--accent)] shadow-lg'
                                       : 'border-[var(--card-border)] text-[var(--text-secondary)] hover:border-[var(--accent)] hover:bg-[var(--accent)]/5'
                                   }`}
                                 >
                                     {size}
                                 </button>
                             ))}
                         </div>
                       ) : (
                         <div className="text-sm text-[var(--text-secondary)] italic">
                           One size fits all • Digital products have no size selection
                         </div>
                       )}
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
                        <motion.div
                          key={item.cartId}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: 20 }}
                          className="flex gap-4 p-4 rounded-xl bg-[var(--card-bg)] border border-[var(--card-border)] hover:border-[var(--accent)]/30 transition-colors"
                        >
                            <div className="relative">
                              <img src={item.images[0]} alt={item.name} className="w-20 h-20 rounded-lg object-cover bg-gray-800" />
                              {item.images.length > 1 && (
                                <div className="absolute -top-1 -right-1 w-5 h-5 bg-[var(--accent)] rounded-full flex items-center justify-center text-xs text-white font-bold">
                                  +
                                </div>
                              )}
                            </div>
                            <div className="flex-1 flex flex-col justify-between min-w-0">
                                <div className="flex justify-between items-start mb-2">
                                    <h3 className="font-bold text-[var(--text-color)] line-clamp-2 pr-2">{item.name}</h3>
                                    <button
                                      onClick={() => handleRemove(item)}
                                      className="text-[var(--text-secondary)] hover:text-red-500 p-1 hover:bg-red-500/10 rounded transition-colors flex-shrink-0"
                                    >
                                        <Trash2 size={16} />
                                    </button>
                                </div>
                                <p className="text-sm text-[var(--text-secondary)] mb-2">{item.category} • Size: {item.selectedSize}</p>

                                {/* Quantity Controls */}
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <button
                                          onClick={() => handleUpdateQuantity(item.cartId, item.quantity - 1)}
                                          className="w-8 h-8 rounded-full border border-[var(--card-border)] hover:border-[var(--accent)] flex items-center justify-center text-[var(--text-secondary)] hover:text-[var(--accent)] transition-colors"
                                        >
                                          <Minus size={14} />
                                        </button>
                                        <span className="w-8 text-center font-bold text-[var(--text-color)]">{item.quantity}</span>
                                        <button
                                          onClick={() => handleUpdateQuantity(item.cartId, item.quantity + 1)}
                                          className="w-8 h-8 rounded-full border border-[var(--card-border)] hover:border-[var(--accent)] flex items-center justify-center text-[var(--text-secondary)] hover:text-[var(--accent)] transition-colors"
                                          disabled={item.quantity >= 10}
                                        >
                                          <Plus size={14} />
                                        </button>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-[var(--accent)] font-bold">${(item.price * item.quantity).toFixed(2)}</p>
                                        {item.quantity > 1 && (
                                          <p className="text-xs text-[var(--text-secondary)]">${item.price} each</p>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </motion.div>
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
                  {/* Promo Code Input */}
                  {checkoutStep === 0 && (
                    <div className="mb-4">
                      {appliedPromo ? (
                        <div className="flex items-center justify-between p-3 bg-green-500/10 border border-green-500/30 rounded-lg">
                          <div className="flex items-center gap-2">
                            <Tag size={16} className="text-green-500" />
                            <span className="text-sm font-bold text-green-500">{appliedPromo.code}</span>
                            <span className="text-xs text-green-600">-{appliedPromo.discount}{appliedPromo.type === 'percent' ? '%' : '$'}</span>
                          </div>
                          <button onClick={removePromo} className="text-green-500 hover:text-green-400">
                            <X size={14} />
                          </button>
                        </div>
                      ) : (
                        <div className="flex gap-2">
                          <input
                            type="text"
                            placeholder="Promo code"
                            value={promoCode}
                            onChange={(e) => setPromoCode(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && applyPromoCode()}
                            className="flex-1 px-3 py-2 text-sm rounded-lg border border-[var(--card-border)] bg-[var(--bg-color)] text-[var(--text-color)] placeholder-[var(--text-secondary)] focus:outline-none focus:ring-1 focus:ring-[var(--accent)]"
                          />
                          <button
                            onClick={applyPromoCode}
                            className="px-4 py-2 bg-[var(--text-color)]/10 hover:bg-[var(--text-color)]/20 text-[var(--text-color)] text-sm font-bold rounded-lg transition-colors"
                          >
                            Apply
                          </button>
                        </div>
                      )}
                      {promoError && <p className="text-xs text-red-500 mt-1">{promoError}</p>}
                    </div>
                  )}
                  
                  {/* Discount display */}
                  {appliedPromo && discountAmount > 0 && (
                    <div className="flex justify-between items-center mb-2 text-green-500">
                      <span className="text-sm">Discount</span>
                      <span className="text-sm font-bold">-${discountAmount.toFixed(2)}</span>
                    </div>
                  )}
                  
                  <div className="flex justify-between items-center mb-4">
                      <span className="text-[var(--text-secondary)]">Total</span>
                      <div className="text-right">
                        {appliedPromo && discountAmount > 0 && (
                          <span className="text-sm text-[var(--text-secondary)] line-through mr-2">${cartTotal.toFixed(2)}</span>
                        )}
                        <span className="text-2xl font-black text-[var(--text-color)]">${finalTotal.toFixed(2)}</span>
                      </div>
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
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-12">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h1 className="text-5xl md:text-7xl font-black text-[var(--text-color)] tracking-tighter mb-4">LVRN Shop</h1>
                <p className="text-xl text-[var(--text-secondary)] max-w-2xl">Exclusive apparel, vinyls, and accessories from your favorite artists.</p>
              </div>

              {/* Wishlist Button */}
              <button
                onClick={() => showNotification(`You have ${wishlist.size} items in your wishlist`, "info")}
                className="p-3 rounded-full bg-[var(--card-bg)] border border-[var(--card-border)] hover:border-[var(--accent)] transition-colors relative group"
                aria-label="View wishlist"
              >
                <Heart
                  size={24}
                  className={`transition-colors ${wishlist.size > 0 ? 'text-red-500 fill-current' : 'text-[var(--text-secondary)] group-hover:text-[var(--accent)]'}`}
                />
                {wishlist.size > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-[var(--accent)] text-white text-xs font-bold rounded-full flex items-center justify-center">
                    {wishlist.size}
                  </span>
                )}
              </button>
            </div>

            {/* Search and Filters */}
            <div className="flex flex-col lg:flex-row gap-4 mb-8">
              {/* Search Bar */}
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-secondary)]" size={20} />
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-[var(--card-border)] bg-[var(--card-bg)] text-[var(--text-color)] placeholder-[var(--text-secondary)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)] transition-all"
                />
              </div>

              {/* Category Filter */}
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-4 py-3 rounded-xl border border-[var(--card-border)] bg-[var(--card-bg)] text-[var(--text-color)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)]"
              >
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>

              {/* Sort */}
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-3 rounded-xl border border-[var(--card-border)] bg-[var(--card-bg)] text-[var(--text-color)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)]"
              >
                <option value="featured">Featured</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="name">Name A-Z</option>
                <option value="newest">Newest</option>
              </select>
            </div>

            {/* Results Count */}
            <div className="flex items-center justify-between mb-8">
              <p className="text-[var(--text-secondary)]">
                {isLoading ? (
                  <span className="animate-pulse">Searching products...</span>
                ) : (
                  `Showing ${filteredProducts.length} of ${MERCH_PRODUCTS.length} products`
                )}
              </p>
              {filteredProducts.length === 0 && (
                <button
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedCategory('All');
                    setPriceRange([0, 150]);
                  }}
                  className="text-[var(--accent)] hover:underline text-sm"
                >
                  Clear filters
                </button>
              )}
            </div>
        </motion.div>

        {/* Product Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-16">
            {isLoading ? (
              // Show skeleton cards while loading
              Array.from({ length: 8 }).map((_, idx) => (
                <ProductSkeleton key={`skeleton-${idx}`} />
              ))
            ) : (
              filteredProducts.map((product, idx) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  className="group"
                >
                    <GlassCard className="h-full flex flex-col !p-0 overflow-hidden relative">
                        {/* Product Image */}
                        <div className="relative aspect-[4/5] overflow-hidden bg-gray-100 dark:bg-zinc-800">
                            <img
                              src={product.images[0]}
                              alt={product.name}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            />

                            {/* Overlay Actions */}
                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                              <div className="flex gap-2">
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setSelectedProduct(product);
                                  }}
                                  className="p-3 bg-white/90 hover:bg-white text-black rounded-full transition-colors"
                                  aria-label="View product details"
                                >
                                  <Plus size={18} />
                                </button>
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    toggleWishlist(product.id);
                                  }}
                                  className={`p-3 rounded-full transition-colors ${
                                    wishlist.has(product.id)
                                      ? 'bg-red-500 text-white'
                                      : 'bg-white/90 hover:bg-white text-black'
                                  }`}
                                  aria-label={wishlist.has(product.id) ? "Remove from wishlist" : "Add to wishlist"}
                                >
                                  <Heart size={18} fill={wishlist.has(product.id) ? 'currentColor' : 'none'} />
                                </button>
                              </div>
                            </div>

                            {/* Badges */}
                            <div className="absolute top-3 left-3 flex flex-col gap-2">
                              <span className="px-2 py-1 bg-[var(--accent)] text-white text-xs font-bold uppercase tracking-wider rounded">
                                {product.category}
                              </span>
                              {product.price > 60 && (
                                <span className="px-2 py-1 bg-yellow-500 text-black text-xs font-bold uppercase tracking-wider rounded flex items-center gap-1">
                                  <Sparkles size={10} /> Premium
                                </span>
                              )}
                            </div>

                            {/* Image Count Indicator */}
                            {product.images.length > 1 && (
                                <div className="absolute top-3 right-3 p-1 bg-black/50 rounded text-white text-xs flex items-center gap-1">
                                    <ImageIcon size={12} /> +{product.images.length - 1}
                                </div>
                            )}

                            {/* Quick Add Button */}
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                handleQuickAddToCart(product);
                              }}
                              className="absolute bottom-3 left-1/2 -translate-x-1/2 px-4 py-2 bg-[var(--accent)] text-white font-bold text-sm uppercase tracking-wider rounded-full opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300 hover:brightness-110"
                            >
                              Quick Add
                            </button>
                        </div>

                        {/* Product Info */}
                        <div className="p-5 flex-1 flex flex-col">
                            <div className="flex-1">
                                <h3 className="text-lg font-bold text-[var(--text-color)] mb-2 leading-tight line-clamp-2">{product.name}</h3>
                                <p className="text-[var(--text-secondary)] text-sm mb-3 line-clamp-2">{product.description}</p>
                            </div>

                            <div className="flex justify-between items-center mt-4">
                                <span className="text-xl font-bold text-[var(--accent)]">${product.price}</span>
                                <div className="flex items-center gap-1">
                                  {[...Array(5)].map((_, i) => (
                                    <Star key={i} size={12} className="text-yellow-400 fill-current" />
                                  ))}
                                  <span className="text-xs text-[var(--text-secondary)] ml-1">(4.8)</span>
                                </div>
                            </div>
                        </div>

                        {/* Click handler for entire card */}
                        <div
                          className="absolute inset-0 cursor-pointer"
                          onClick={() => setSelectedProduct(product)}
                          aria-label={`View ${product.name} details`}
                        />
                    </GlassCard>
                </motion.div>
              ))
            )}
        </div>

        {/* Empty State */}
        {filteredProducts.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16"
          >
            <div className="w-24 h-24 bg-[var(--text-color)]/5 rounded-full flex items-center justify-center mx-auto mb-6">
              <Search size={32} className="text-[var(--text-secondary)]" />
            </div>
            <h3 className="text-xl font-bold text-[var(--text-color)] mb-2">No products found</h3>
            <p className="text-[var(--text-secondary)] mb-6">Try adjusting your search or filter criteria</p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('All');
                setPriceRange([0, 150]);
              }}
              className="px-6 py-3 bg-[var(--accent)] text-white font-bold uppercase tracking-wider rounded-full hover:brightness-110 transition-all"
            >
              Clear Filters
            </button>
          </motion.div>
        )}

        {/* Trending Section */}
        {filteredProducts.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="border-t border-[var(--text-color)]/10 pt-16"
          >
            <div className="flex items-center gap-4 mb-8">
              <h2 className="text-3xl md:text-4xl font-black text-[var(--text-color)]">Trending Now</h2>
              <div className="h-px flex-1 max-w-[100px] bg-gradient-to-r from-[var(--accent)] to-transparent" />
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {MERCH_PRODUCTS.slice(0, 4).map((product, idx) => (
                <motion.div
                  key={`trending-${product.id}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  className="group"
                >
                  <GlassCard className="h-full flex flex-col !p-0 overflow-hidden relative">
                    <div className="relative aspect-[4/5] overflow-hidden bg-gray-100 dark:bg-zinc-800">
                        <img
                          src={product.images[0]}
                          alt={product.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute top-3 left-3">
                          <span className="px-2 py-1 bg-red-500 text-white text-xs font-bold uppercase tracking-wider rounded">
                            Hot
                          </span>
                        </div>
                        <button
                          onClick={() => handleQuickAddToCart(product)}
                          className="absolute bottom-3 left-1/2 -translate-x-1/2 px-4 py-2 bg-[var(--accent)] text-white font-bold text-sm uppercase tracking-wider rounded-full opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300 hover:brightness-110"
                        >
                          Quick Add
                        </button>
                    </div>
                    <div className="p-4">
                        <h3 className="text-lg font-bold text-[var(--text-color)] mb-1 leading-tight line-clamp-1">{product.name}</h3>
                        <div className="flex justify-between items-center">
                            <span className="text-lg font-bold text-[var(--accent)]">${product.price}</span>
                            <div className="flex items-center gap-1">
                              <Star size={12} className="text-yellow-400 fill-current" />
                              <span className="text-xs text-[var(--text-secondary)]">(4.9)</span>
                            </div>
                        </div>
                    </div>
                    <div
                      className="absolute inset-0 cursor-pointer"
                      onClick={() => setSelectedProduct(product)}
                    />
                  </GlassCard>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
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