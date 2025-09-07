import React, { useState, useEffect } from 'react';
import { Search, MapPin, Filter, Star, Phone, Mail, Calendar } from 'lucide-react';
import { supabase } from '../lib/supabase';

export default function Dashboard() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedLocation, setSelectedLocation] = useState('all');
  const [recentlyBrowsed, setRecentlyBrowsed] = useState<any[]>([]);
  const [professionals, setProfessionals] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProfessionals();
  }, []);

  const fetchProfessionals = async () => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('role', 'professional');

      if (error) throw error;
      setProfessionals(data || []);
    } catch (error) {
      console.error('Error fetching professionals:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredProfessionals = professionals.filter(professional => {
    const matchesSearch = professional.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         professional.service_name?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || professional.service_name === selectedCategory;
    const matchesLocation = selectedLocation === 'all' || professional.location === selectedLocation;
    
    return matchesSearch && matchesCategory && matchesLocation;
  });

  const categories = [...new Set(professionals.map(p => p.service_name).filter(Boolean))];
  const locations = [...new Set(professionals.map(p => p.location).filter(Boolean))];

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading professionals...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Find Professionals</h1>
          <p className="text-gray-600">Discover skilled professionals in your area</p>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search professionals..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Category Filter */}
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none"
              >
                <option value="all">All Categories</option>
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>

            {/* Location Filter */}
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <select
                value={selectedLocation}
                onChange={(e) => setSelectedLocation(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none"
              >
                <option value="all">All Locations</option>
                {locations.map(location => (
                  <option key={location} value={location}>{location}</option>
                ))}
              </select>
            </div>

            {/* Clear Filters */}
            <button
              onClick={() => {
                setSearchTerm('');
                setSelectedCategory('all');
                setSelectedLocation('all');
              }}
              className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Clear Filters
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Results Count */}
            <div className="mb-6">
              <p className="text-gray-600">
                {filteredProfessionals.length} professional{filteredProfessionals.length !== 1 ? 's' : ''} found
              </p>
            </div>

            {/* Professionals Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredProfessionals.map((professional) => (
                <div key={professional.id} className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow p-6">
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0">
                      {professional.profile_image ? (
                        <img
                          src={professional.profile_image}
                          alt={professional.name}
                          className="w-16 h-16 rounded-full object-cover"
                        />
                      ) : (
                        <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center">
                          <span className="text-gray-500 font-medium text-lg">
                            {professional.name?.charAt(0) || '?'}
                          </span>
                        </div>
                      )}
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <h3 className="text-lg font-semibold text-gray-900 truncate">
                        {professional.name}
                      </h3>
                      <p className="text-blue-600 font-medium">{professional.service_name}</p>
                      
                      {professional.location && (
                        <div className="flex items-center mt-1 text-gray-500">
                          <MapPin className="w-4 h-4 mr-1" />
                          <span className="text-sm">{professional.location}</span>
                        </div>
                      )}
                      
                      {professional.bio && (
                        <p className="text-gray-600 text-sm mt-2 line-clamp-2">
                          {professional.bio}
                        </p>
                      )}
                      
                      {professional.price && (
                        <p className="text-green-600 font-semibold mt-2">
                          {professional.price}
                        </p>
                      )}
                      
                      <div className="flex items-center justify-between mt-4">
                        <div className="flex items-center space-x-2">
                          {professional.phone && (
                            <button className="p-2 text-gray-400 hover:text-blue-600 transition-colors">
                              <Phone className="w-4 h-4" />
                            </button>
                          )}
                          <button className="p-2 text-gray-400 hover:text-blue-600 transition-colors">
                            <Mail className="w-4 h-4" />
                          </button>
                        </div>
                        
                        <button className="flex items-center space-x-1 px-3 py-1 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm">
                          <Calendar className="w-4 h-4" />
                          <span>Book</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {filteredProfessionals.length === 0 && (
              <div className="text-center py-12">
                <div className="text-gray-400 mb-4">
                  <Search className="w-12 h-12 mx-auto" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">No professionals found</h3>
                <p className="text-gray-600">Try adjusting your search criteria or filters</p>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Recently Browsed */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Recently Browsed</h2>
              {recentlyBrowsed && recentlyBrowsed.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {recentlyBrowsed.map((professional: any) => (
                    <div key={professional.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                      <h3 className="font-medium text-gray-900">{professional.name}</h3>
                      <p className="text-sm text-blue-600">{professional.service_name}</p>
                      <p className="text-sm text-gray-500">{professional.location}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500">No recently browsed professionals</p>
              )}
            </div>

            {/* Quick Stats */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Quick Stats</h2>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Total Professionals</span>
                  <span className="font-semibold">{professionals.length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Categories</span>
                  <span className="font-semibold">{categories.length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Locations</span>
                  <span className="font-semibold">{locations.length}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}