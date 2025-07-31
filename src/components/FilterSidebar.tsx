import React from 'react';
import { X, ChevronDown, ChevronUp } from 'lucide-react';
import { SearchFilters } from '../types/business';

interface FilterSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  filters: SearchFilters;
  onFiltersChange: (filters: SearchFilters) => void;
}

export const FilterSidebar: React.FC<FilterSidebarProps> = ({
  isOpen,
  onClose,
  filters,
  onFiltersChange
}) => {
  const [expandedSections, setExpandedSections] = React.useState({
    location: true,
    business: true,
    status: true
  });

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const updateFilter = (key: keyof SearchFilters, value: string) => {
    onFiltersChange({
      ...filters,
      [key]: value
    });
  };

  const clearFilters = () => {
    onFiltersChange({
      query: filters.query,
      state: '',
      businessType: '',
      gstStatus: '',
      abnStatus: '',
      postcode: ''
    });
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div 
        className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
        onClick={onClose}
      />
      
      {/* Sidebar */}
      <div className="fixed right-0 top-0 h-full w-80 bg-white shadow-xl z-50 overflow-y-auto">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-gray-900">Filters</h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="space-y-6">
            {/* Location Filters */}
            <div className="border-b border-gray-200 pb-4">
              <button
                onClick={() => toggleSection('location')}
                className="flex items-center justify-between w-full text-left"
              >
                <h3 className="font-medium text-gray-900">Location</h3>
                {expandedSections.location ? (
                  <ChevronUp className="w-4 h-4 text-gray-500" />
                ) : (
                  <ChevronDown className="w-4 h-4 text-gray-500" />
                )}
              </button>
              
              {expandedSections.location && (
                <div className="mt-3 space-y-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      State
                    </label>
                    <select
                      value={filters.state}
                      onChange={(e) => updateFilter('state', e.target.value)}
                      className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="">All States</option>
                      <option value="NSW">New South Wales</option>
                      <option value="VIC">Victoria</option>
                      <option value="QLD">Queensland</option>
                      <option value="SA">South Australia</option>
                      <option value="WA">Western Australia</option>
                      <option value="TAS">Tasmania</option>
                      <option value="NT">Northern Territory</option>
                      <option value="ACT">Australian Capital Territory</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Postcode
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. 2000"
                      value={filters.postcode}
                      onChange={(e) => updateFilter('postcode', e.target.value)}
                      className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Business Type Filters */}
            <div className="border-b border-gray-200 pb-4">
              <button
                onClick={() => toggleSection('business')}
                className="flex items-center justify-between w-full text-left"
              >
                <h3 className="font-medium text-gray-900">Business Type</h3>
                {expandedSections.business ? (
                  <ChevronUp className="w-4 h-4 text-gray-500" />
                ) : (
                  <ChevronDown className="w-4 h-4 text-gray-500" />
                )}
              </button>
              
              {expandedSections.business && (
                <div className="mt-3">
                  <select
                    value={filters.businessType}
                    onChange={(e) => updateFilter('businessType', e.target.value)}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">All Business Types</option>
                    <option value="IND">Individual/Sole Trader</option>
                    <option value="PRV">Australian Private Company</option>
                    <option value="PUB">Australian Public Company</option>
                    <option value="PTN">Partnership</option>
                    <option value="TRU">Trust</option>
                    <option value="SUP">Superannuation Fund</option>
                    <option value="ASS">Incorporated Association</option>
                    <option value="GOV">Government Entity</option>
                  </select>
                </div>
              )}
            </div>

            {/* Status Filters */}
            <div className="pb-4">
              <button
                onClick={() => toggleSection('status')}
                className="flex items-center justify-between w-full text-left"
              >
                <h3 className="font-medium text-gray-900">Status</h3>
                {expandedSections.status ? (
                  <ChevronUp className="w-4 h-4 text-gray-500" />
                ) : (
                  <ChevronDown className="w-4 h-4 text-gray-500" />
                )}
              </button>
              
              {expandedSections.status && (
                <div className="mt-3 space-y-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      ABN Status
                    </label>
                    <select
                      value={filters.abnStatus}
                      onChange={(e) => updateFilter('abnStatus', e.target.value)}
                      className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="">All Statuses</option>
                      <option value="Active">Active</option>
                      <option value="Cancelled">Cancelled</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      GST Status
                    </label>
                    <select
                      value={filters.gstStatus}
                      onChange={(e) => updateFilter('gstStatus', e.target.value)}
                      className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="">All GST Statuses</option>
                      <option value="Registered">Registered</option>
                      <option value="Not Registered">Not Registered</option>
                    </select>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="mt-6 pt-6 border-t border-gray-200">
            <button
              onClick={clearFilters}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium"
            >
              Clear All Filters
            </button>
          </div>
        </div>
      </div>
    </>
  );
};