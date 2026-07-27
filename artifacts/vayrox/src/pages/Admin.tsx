import { useState } from 'react';
import { motion } from 'framer-motion';
import { Package, ShoppingCart, Users as UsersIcon, TrendingUp, Plus, Trash2, Edit } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { products } from '@/data/products';
import { useLocation } from 'wouter';

function AdminLogin({ onLogin }: { onLogin: () => void }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (username === 'admin' && password === 'admin123') {
      onLogin();
    } else {
      setError('Invalid credentials. Use admin/admin123');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md bg-card border border-border rounded-lg p-8"
      >
        <h1 className="text-3xl font-serif font-bold mb-6 text-center">Admin Login</h1>
        
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <Label htmlFor="username">Username</Label>
            <Input
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="admin"
              required
              data-testid="input-admin-username"
            />
          </div>
          <div>
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="admin123"
              required
              data-testid="input-admin-password"
            />
          </div>
          {error && (
            <p className="text-sm text-destructive">{error}</p>
          )}
          <Button type="submit" className="w-full" data-testid="button-admin-login">
            Login
          </Button>
        </form>

        <p className="text-xs text-muted-foreground mt-4 text-center">
          Demo credentials: admin / admin123
        </p>
      </motion.div>
    </div>
  );
}

export default function Admin() {
  const [, setLocation] = useLocation();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeTab, setActiveTab] = useState<'dashboard' | 'products' | 'orders' | 'customers'>('dashboard');
  const [isAddProductOpen, setIsAddProductOpen] = useState(false);

  const [newProduct, setNewProduct] = useState({
    name: '',
    category: 'men',
    type: 't-shirt',
    price: '',
    description: '',
    sizes: 'S,M,L,XL',
    colors: '#0a0a0a,#111111',
    image: '',
  });

  const handleLogout = () => {
    setIsAuthenticated(false);
    setLocation('/');
  };

  const handleAddProduct = () => {
    console.log('Add product:', newProduct);
    setIsAddProductOpen(false);
    setNewProduct({
      name: '',
      category: 'men',
      type: 't-shirt',
      price: '',
      description: '',
      sizes: 'S,M,L,XL',
      colors: '#0a0a0a,#111111',
      image: '',
    });
  };

  if (!isAuthenticated) {
    return <AdminLogin onLogin={() => setIsAuthenticated(true)} />;
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Admin Header */}
      <div className="bg-card border-b border-border">
        <div className="max-w-[1600px] mx-auto px-6 lg:px-12 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-serif font-bold">VAYROX Admin</h1>
          <Button variant="outline" onClick={handleLogout} data-testid="button-admin-logout">
            Logout
          </Button>
        </div>
      </div>

      <div className="flex">
        {/* Sidebar */}
        <div className="w-64 bg-card border-r border-border min-h-[calc(100vh-73px)] p-6">
          <nav className="space-y-2">
            <button
              onClick={() => setActiveTab('dashboard')}
              className={`w-full text-left px-4 py-3 rounded transition-colors ${
                activeTab === 'dashboard' ? 'bg-primary text-primary-foreground' : 'hover:bg-muted'
              }`}
              data-testid="nav-dashboard"
            >
              <TrendingUp className="w-4 h-4 inline mr-2" />
              Dashboard
            </button>
            <button
              onClick={() => setActiveTab('products')}
              className={`w-full text-left px-4 py-3 rounded transition-colors ${
                activeTab === 'products' ? 'bg-primary text-primary-foreground' : 'hover:bg-muted'
              }`}
              data-testid="nav-products"
            >
              <Package className="w-4 h-4 inline mr-2" />
              Products
            </button>
            <button
              onClick={() => setActiveTab('orders')}
              className={`w-full text-left px-4 py-3 rounded transition-colors ${
                activeTab === 'orders' ? 'bg-primary text-primary-foreground' : 'hover:bg-muted'
              }`}
              data-testid="nav-orders"
            >
              <ShoppingCart className="w-4 h-4 inline mr-2" />
              Orders
            </button>
            <button
              onClick={() => setActiveTab('customers')}
              className={`w-full text-left px-4 py-3 rounded transition-colors ${
                activeTab === 'customers' ? 'bg-primary text-primary-foreground' : 'hover:bg-muted'
              }`}
              data-testid="nav-customers"
            >
              <UsersIcon className="w-4 h-4 inline mr-2" />
              Customers
            </button>
          </nav>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-6 lg:p-12">
          {activeTab === 'dashboard' && (
            <div>
              <h2 className="text-3xl font-serif font-bold mb-8">Dashboard</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-card border border-border rounded-lg p-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-muted-foreground">Total Products</span>
                    <Package className="w-5 h-5 text-primary" />
                  </div>
                  <p className="text-3xl font-bold">{products.length}</p>
                </div>

                <div className="bg-card border border-border rounded-lg p-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-muted-foreground">Total Orders</span>
                    <ShoppingCart className="w-5 h-5 text-primary" />
                  </div>
                  <p className="text-3xl font-bold">47</p>
                </div>

                <div className="bg-card border border-border rounded-lg p-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-muted-foreground">Revenue</span>
                    <TrendingUp className="w-5 h-5 text-primary" />
                  </div>
                  <p className="text-3xl font-bold">₹2,87,350</p>
                </div>

                <div className="bg-card border border-border rounded-lg p-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-muted-foreground">Customers</span>
                    <UsersIcon className="w-5 h-5 text-primary" />
                  </div>
                  <p className="text-3xl font-bold">132</p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'products' && (
            <div>
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-3xl font-serif font-bold">Products</h2>
                
                <Dialog open={isAddProductOpen} onOpenChange={setIsAddProductOpen}>
                  <DialogTrigger asChild>
                    <Button data-testid="button-add-product">
                      <Plus className="w-4 h-4 mr-2" />
                      Add Product
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl">
                    <DialogHeader>
                      <DialogTitle>Add New Product</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4 max-h-[60vh] overflow-y-auto">
                      <div>
                        <Label>Product Name</Label>
                        <Input
                          value={newProduct.name}
                          onChange={(e) => setNewProduct({...newProduct, name: e.target.value})}
                          placeholder="Midnight Essence Tee"
                          data-testid="input-product-name"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label>Category</Label>
                          <select
                            value={newProduct.category}
                            onChange={(e) => setNewProduct({...newProduct, category: e.target.value})}
                            className="w-full px-3 py-2 bg-background border border-input rounded"
                            data-testid="select-product-category"
                          >
                            <option value="men">Men</option>
                            <option value="women">Women</option>
                          </select>
                        </div>
                        <div>
                          <Label>Type</Label>
                          <select
                            value={newProduct.type}
                            onChange={(e) => setNewProduct({...newProduct, type: e.target.value})}
                            className="w-full px-3 py-2 bg-background border border-input rounded"
                            data-testid="select-product-type"
                          >
                            <option value="t-shirt">T-Shirt</option>
                            <option value="hoodie">Hoodie</option>
                          </select>
                        </div>
                      </div>
                      <div>
                        <Label>Price</Label>
                        <Input
                          type="number"
                          value={newProduct.price}
                          onChange={(e) => setNewProduct({...newProduct, price: e.target.value})}
                          placeholder="3499"
                          data-testid="input-product-price"
                        />
                      </div>
                      <div>
                        <Label>Description</Label>
                        <Textarea
                          value={newProduct.description}
                          onChange={(e) => setNewProduct({...newProduct, description: e.target.value})}
                          placeholder="Premium cotton blend..."
                          data-testid="textarea-product-description"
                        />
                      </div>
                      <div>
                        <Label>Sizes (comma-separated)</Label>
                        <Input
                          value={newProduct.sizes}
                          onChange={(e) => setNewProduct({...newProduct, sizes: e.target.value})}
                          placeholder="S,M,L,XL"
                          data-testid="input-product-sizes"
                        />
                      </div>
                      <div>
                        <Label>Colors (comma-separated hex)</Label>
                        <Input
                          value={newProduct.colors}
                          onChange={(e) => setNewProduct({...newProduct, colors: e.target.value})}
                          placeholder="#0a0a0a,#111111"
                          data-testid="input-product-colors"
                        />
                      </div>
                      <div>
                        <Label>Image URL</Label>
                        <Input
                          value={newProduct.image}
                          onChange={(e) => setNewProduct({...newProduct, image: e.target.value})}
                          placeholder="https://..."
                          data-testid="input-product-image"
                        />
                      </div>
                      <Button onClick={handleAddProduct} className="w-full" data-testid="button-save-product">
                        Add Product
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>

              <div className="bg-card border border-border rounded-lg overflow-hidden">
                <table className="w-full">
                  <thead className="bg-muted">
                    <tr>
                      <th className="text-left p-4">Name</th>
                      <th className="text-left p-4">Category</th>
                      <th className="text-left p-4">Type</th>
                      <th className="text-left p-4">Price</th>
                      <th className="text-left p-4">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {products.slice(0, 10).map((product) => (
                      <tr key={product.id} className="border-t border-border">
                        <td className="p-4">{product.name}</td>
                        <td className="p-4 capitalize">{product.category}</td>
                        <td className="p-4 capitalize">{product.type}</td>
                        <td className="p-4">₹{product.price.toLocaleString()}</td>
                        <td className="p-4">
                          <div className="flex gap-2">
                            <Button variant="outline" size="sm" data-testid={`button-edit-${product.id}`}>
                              <Edit className="w-3 h-3" />
                            </Button>
                            <Button variant="outline" size="sm" className="text-destructive" data-testid={`button-delete-${product.id}`}>
                              <Trash2 className="w-3 h-3" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'orders' && (
            <div>
              <h2 className="text-3xl font-serif font-bold mb-8">Orders</h2>
              <div className="bg-card border border-border rounded-lg p-8 text-center">
                <p className="text-muted-foreground">Order management coming soon...</p>
              </div>
            </div>
          )}

          {activeTab === 'customers' && (
            <div>
              <h2 className="text-3xl font-serif font-bold mb-8">Customers</h2>
              <div className="bg-card border border-border rounded-lg p-8 text-center">
                <p className="text-muted-foreground">Customer management coming soon...</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
