import React, { useState, useEffect } from 'react';
import { 
  LayoutDashboard, 
  Package, 
  ShoppingCart, 
  Users, 
  LogOut, 
  Plus, 
  Trash2, 
  Edit, 
  Save, 
  X,
  TrendingUp,
  DollarSign
} from 'lucide-react';
import { db } from '../../firebase'; // Firebase configuration import
import { collection, getDocs, addDoc, deleteDoc, doc, updateDoc } from 'firebase/firestore';

export default function Admin() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [activeTab, setActiveTab] = useState('dashboard');
  
  // Real Database States
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // New Product Form State
  const [newProduct, setNewProduct] = useState({
    name: '',
    category: 'Men',
    type: 'T-Shirt',
    price: '',
    image: '',
    description: ''
  });

  // Login Handler
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (username === 'admin' && password === 'admin123') {
      setIsAuthenticated(true);
    } else {
      alert('Invalid Username or Password');
    }
  };

  // Fetch Products from Firebase
  const fetchProducts = async () => {
    try {
      setLoading(true);
      const querySnapshot = await getDocs(collection(db, 'products'));
      const productList = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setProducts(productList);
    } catch (error) {
      console.error("Error fetching products: ", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchProducts();
    }
  }, [isAuthenticated]);

  // Add Product to Firebase
  const handleAddProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, 'products'), {
        name: newProduct.name,
        category: newProduct.category,
        type: newProduct.type,
        price: Number(newProduct.price),
        image: newProduct.image || 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518',
        description: newProduct.description,
        createdAt: new Date()
      });
      setIsModalOpen(false);
      setNewProduct({ name: '', category: 'Men', type: 'T-Shirt', price: '', image: '', description: '' });
      fetchProducts();
      alert('Product added successfully!');
    } catch (error) {
      console.error("Error adding product: ", error);
      alert('Failed to add product');
    }
  };

  // Delete Product from Firebase
  const handleDeleteProduct = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        await deleteDoc(doc(db, 'products', id));
        fetchProducts();
      } catch (error) {
        console.error("Error deleting product: ", error);
      }
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center p-4">
        <div className="bg-zinc-900 border border-zinc-800 p-8 rounded-xl max-w-md w-full shadow-2xl">
          <h2 className="text-3xl font-serif text-white mb-6 text-center tracking-wider">Admin Login</h2>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm text-zinc-400 mb-1">Username</label>
              <input 
                type="text" 
                value={username} 
                onChange={(e) => setUsername(e.target.value)}
                className="w-full bg-black border border-zinc-800 rounded px-4 py-2 text-white focus:outline-none focus:border-white"
                required 
              />
            </div>
            <div>
              <label className="block text-sm text-zinc-400 mb-1">Password</label>
              <input 
                type="password" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-black border border-zinc-800 rounded px-4 py-2 text-white focus:outline-none focus:border-white"
                required 
              />
            </div>
            <button 
              type="submit" 
              className="w-full bg-white text-black font-medium py-2 rounded hover:bg-zinc-200 transition"
            >
              Login
            </button>
            <p className="text-xs text-zinc-500 text-center mt-4">Demo credentials: admin / admin123</p>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white flex">
      {/* Sidebar */}
      <div className="w-64 bg-zinc-950 border-r border-zinc-800 flex flex-col">
        <div className="p-6 border-b border-zinc-800">
          <h1 className="text-xl font-serif tracking-widest">VAYROX Admin</h1>
        </div>
        <nav className="flex-1 p-4 space-y-1">
          <button 
            onClick={() => setActiveTab('dashboard')} 
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition ${activeTab === 'dashboard' ? 'bg-white text-black' : 'text-zinc-400 hover:text-white hover:bg-zinc-900'}`}
          >
            <LayoutDashboard size={18} /> Dashboard
          </button>
          <button 
            onClick={() => setActiveTab('products')} 
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition ${activeTab === 'products' ? 'bg-white text-black' : 'text-zinc-400 hover:text-white hover:bg-zinc-900'}`}
          >
            <Package size={18} /> Products
          </button>
          <button 
            onClick={() => setActiveTab('orders')} 
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition ${activeTab === 'orders' ? 'bg-white text-black' : 'text-zinc-400 hover:text-white hover:bg-zinc-900'}`}
          >
            <ShoppingCart size={18} /> Orders
          </button>
          <button 
            onClick={() => setActiveTab('customers')} 
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition ${activeTab === 'customers' ? 'bg-white text-black' : 'text-zinc-400 hover:text-white hover:bg-zinc-900'}`}
          >
            <Users size={18} /> Customers
          </button>
        </nav>
        <div className="p-4 border-t border-zinc-800">
          <button 
            onClick={() => setIsAuthenticated(false)} 
            className="w-full flex items-center gap-3 px-4 py-2 rounded-lg text-sm text-red-400 hover:bg-zinc-900 transition"
          >
            <LogOut size={18} /> Logout
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="h-16 bg-zinc-950 border-b border-zinc-800 flex items-center justify-between px-8">
          <h2 className="text-lg font-medium capitalize">{activeTab}</h2>
          <button 
            onClick={() => setIsAuthenticated(false)}
            className="text-xs bg-zinc-800 hover:bg-zinc-700 px-3 py-1.5 rounded transition"
          >
            Logout
          </button>
        </header>

        <main className="flex-1 overflow-y-auto p-8 bg-black">
          {activeTab === 'dashboard' && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-xl">
                <div className="flex items-center justify-between text-zinc-400 mb-2">
                  <span>Total Products</span>
                  <Package size={20} />
                </div>
                <div className="text-3xl font-bold">{products.length}</div>
              </div>
              <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-xl">
                <div className="flex items-center justify-between text-zinc-400 mb-2">
                  <span>Total Orders</span>
                  <ShoppingCart size={20} />
                </div>
                <div className="text-3xl font-bold">47</div>
              </div>
              <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-xl">
                <div className="flex items-center justify-between text-zinc-400 mb-2">
                  <span>Revenue</span>
                  <TrendingUp size={20} />
                </div>
                <div className="text-3xl font-bold">₹2,87,350</div>
              </div>
              <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-xl">
                <div className="flex items-center justify-between text-zinc-400 mb-2">
                  <span>Customers</span>
                  <Users size={20} />
                </div>
                <div className="text-3xl font-bold">132</div>
              </div>
            </div>
          )}

          {activeTab === 'products' && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-serif">Manage Products</h3>
                <button 
                  onClick={() => setIsModalOpen(true)}
                  className="bg-white text-black px-4 py-2 rounded-lg flex items-center gap-2 text-sm font-medium hover:bg-zinc-200 transition"
                >
                  <Plus size={16} /> Add Product
                </button>
              </div>

              {loading ? (
                <div className="text-zinc-500 text-center py-12">Loading products from database...</div>
              ) : (
                <div className="bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="border-b border-zinc-800 text-zinc-400 text-xs uppercase tracking-wider">
                        <th className="p-4">Name</th>
                        <th className="p-4">Category</th>
                        <th className="p-4">Type</th>
                        <th className="p-4">Price</th>
                        <th className="p-4 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-zinc-800 text-sm">
                      {products.length === 0 ? (
                        <tr>
                          <td colSpan={5} className="p-6 text-center text-zinc-500">No products found in Firebase. Add your first product!</td>
                        </tr>
                      ) : (
                        products.map((product) => (
                          <tr key={product.id} className="hover:bg-zinc-850">
                            <td className="p-4 font-medium">{product.name}</td>
                            <td className="p-4 text-zinc-400">{product.category}</td>
                            <td className="p-4 text-zinc-400">{product.type}</td>
                            <td className="p-4">₹{product.price}</td>
                            <td className="p-4 text-right space-x-2">
                              <button 
                                onClick={() => handleDeleteProduct(product.id)}
                                className="text-red-400 hover:text-red-300 p-1"
                              >
                                <Trash2 size={16} />
                              </button>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}

          {activeTab === 'orders' && (
            <div className="bg-zinc-900 border border-zinc-800 p-8 rounded-xl text-center text-zinc-400">
              Order management integration coming soon...
            </div>
          )}

          {activeTab === 'customers' && (
            <div className="bg-zinc-900 border border-zinc-800 p-8 rounded-xl text-center text-zinc-400">
              Customer management integration coming soon...
            </div>
          )}
        </main>
      </div>

      {/* Add Product Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-50">
          <div className="bg-zinc-900 border border-zinc-800 rounded-xl max-w-lg w-full p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-serif">Add New Product</h3>
              <button onClick={() => setIsModalOpen(false)} className="text-zinc-400 hover:text-white">
                <X size={20} />
              </button>
            </div>
            <form onSubmit={handleAddProduct} className="space-y-4">
              <div>
                <label className="block text-xs text-zinc-400 mb-1">Product Name</label>
                <input 
                  type="text" 
                  value={newProduct.name}
                  onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                  className="w-full bg-black border border-zinc-800 rounded px-3 py-2 text-sm text-white focus:outline-none focus:border-white"
                  required 
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs text-zinc-400 mb-1">Category</label>
                  <select 
                    value={newProduct.category}
                    onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
                    className="w-full bg-black border border-zinc-800 rounded px-3 py-2 text-sm text-white focus:outline-none focus:border-white"
                  >
                    <option value="Men">Men</option>
                    <option value="Women">Women</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs text-zinc-400 mb-1">Type</label>
                  <select 
                    value={newProduct.type}
                    onChange={(e) => setNewProduct({ ...newProduct, type: e.target.value })}
                    className="w-full bg-black border border-zinc-800 rounded px-3 py-2 text-sm text-white focus:outline-none focus:border-white"
                  >
                    <option value="T-Shirt">T-Shirt</option>
                    <option value="Hoodie">Hoodie</option>
                    <option value="Shirt">Shirt</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-xs text-zinc-400 mb-1">Price (₹)</label>
                <input 
                  type="number" 
                  value={newProduct.price}
                  onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                  className="w-full bg-black border border-zinc-800 rounded px-3 py-2 text-sm text-white focus:outline-none focus:border-white"
                  required 
                />
              </div>
              <div>
                <label className="block text-xs text-zinc-400 mb-1">Image URL</label>
                <input 
                  type="text" 
                  value={newProduct.image}
                  onChange={(e) => setNewProduct({ ...newProduct, image: e.target.value })}
                  placeholder="https://..."
                  className="w-full bg-black border border-zinc-800 rounded px-3 py-2 text-sm text-white focus:outline-none focus:border-white"
                />
              </div>
              <div>
                <label className="block text-xs text-zinc-400 mb-1">Description</label>
                <textarea 
                  value={newProduct.description}
                  onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
                  className="w-full bg-black border border-zinc-800 rounded px-3 py-2 text-sm text-white focus:outline-none focus:border-white"
                  rows={3}
                />
              </div>
              <div className="flex justify-end gap-3 mt-6">
                <button 
                  type="button" 
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded text-sm bg-zinc-800 hover:bg-zinc-700 transition"
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  className="px-4 py-2 rounded text-sm bg-white text-black font-medium hover:bg-zinc-200 transition"
                >
                  Save Product
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
