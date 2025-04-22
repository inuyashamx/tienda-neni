import React, { useState, useMemo } from 'react';
import ProductList from '../components/ProductList';
import { Product } from '../types/product';

// Datos de ejemplo - Mover a un servicio después
const sampleProducts: Product[] = [
  {
    id: '1',
    name: 'Camiseta Básica',
    description: 'Camiseta de algodón 100%',
    price: 299.99,
    comparePrice: 399.99,
    imageUrl: 'https://via.placeholder.com/150',
    stock: 50,
    category: 'Ropa',
    status: 'active',
    sales: 124,
    storeId: '1',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  // ... más productos
];

export default function Products() {
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');

  const filteredProducts = useMemo(() => {
    return sampleProducts.filter(product => {
      const matchesSearch = searchTerm === '' || 
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesCategory = categoryFilter === '' || 
        product.category.toLowerCase() === categoryFilter.toLowerCase();
      
      const matchesStatus = statusFilter === '' || 
        product.status === statusFilter;

      return matchesSearch && matchesCategory && matchesStatus;
    });
  }, [searchTerm, categoryFilter, statusFilter]);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="py-6 px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="sm:flex sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Productos</h1>
            <p className="mt-2 text-sm text-gray-700">
              Administra tu catálogo de productos, precios y existencias
            </p>
          </div>
          <div className="mt-4 sm:mt-0">
            <button
              type="button"
              className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-[#2196f3] hover:bg-[#1976d2] focus:outline-none"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Nuevo Producto
            </button>
          </div>
        </div>

        {/* Filters */}
        <div className="mt-6 space-y-4 sm:space-y-0 sm:flex sm:items-center sm:space-x-4">
          <div className="flex-1">
            <label htmlFor="search" className="sr-only">
              Buscar productos
            </label>
            <div className="relative rounded-md shadow-sm">
              <input
                type="text"
                name="search"
                id="search"
                className="block w-full rounded-md border-gray-300 pr-10 focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                placeholder="Buscar productos..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <select
              id="category"
              name="category"
              className="block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
            >
              <option value="">Todas las categorías</option>
              <option value="ropa">Ropa</option>
              <option value="accesorios">Accesorios</option>
              <option value="calzado">Calzado</option>
            </select>
            <select
              id="status"
              name="status"
              className="block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="">Todos los estados</option>
              <option value="active">Activo</option>
              <option value="draft">Borrador</option>
              <option value="inactive">Inactivo</option>
            </select>
          </div>
        </div>

        {/* Product List */}
        <div className="mt-6 bg-white shadow-sm rounded-lg">
          <ProductList
            products={filteredProducts}
            onEdit={(product) => console.log('Edit:', product)}
            onDelete={(product) => console.log('Delete:', product)}
          />
        </div>
      </div>
    </div>
  );
}
