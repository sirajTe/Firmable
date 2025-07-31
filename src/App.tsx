import React, { useState, useEffect, useMemo } from 'react';
import { Building2 } from 'lucide-react';
import { ABNRecord, SearchFilters } from './types/business';
import { generateSampleData, searchBusinesses } from './utils/dataProcessor';
import { SearchBar } from './components/SearchBar';
import { FilterSidebar } from './components/FilterSidebar';
import { BusinessCard } from './components/BusinessCard';
import { LoadingState } from './components/LoadingState';
import { EmptyState } from './components/EmptyState';
import { Pagination } from './components/Pagination';

function App() {
  const [data, setData] = useState<ABNRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState<SearchFilters>({
    query: '',
    state: '',
    businessType: '',
    gstStatus: '',
    abnStatus: '',
    postcode: ''
  });
  const [isFilterSidebarOpen, setIsFilterSidebarOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 12;

  // Load sample data on component mount
  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      // Simulate API loading time
      await new Promise(resolve => setTimeout(resolve, 1000));
      const sampleData = generateSampleData();
      setData(sampleData);
      setLoading(false);
    };
    
    loadData();
  }, []);

  // Search and filter logic
  const searchResults = useMemo(() => {
    if (!data.length) return { records: [], total: 0, page: 1, pageSize };
    
    return searchBusinesses(data, filters, currentPage, pageSize);
  }, [data, filters, currentPage, pageSize]);

  // Reset page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [filters]);

  const hasActiveFilters = useMemo(() => {
    return filters.state || filters.businessType || filters.gstStatus || 
           filters.abnStatus || filters.postcode;
  }, [filters]);

  const totalPages = Math.ceil(searchResults.total / pageSize);

  const handleExport = () => {
    const csvContent = searchResults.records.map(record => ({
      ABN: record.abn,
      'Business Name': record.mainName.organisationName || 
                      `${record.mainName.personGivenName} ${record.mainName.personFamilyName}`,
      'Business Type': record.businessTypeDescription,
      State: record.stateCode,
      Postcode: record.postcode,
      'ABN Status': record.abnStatus,
      'GST Status': record.gstStatus
    }));

    const headers = Object.keys(csvContent[0] || {});
    const csvString = [
      headers.join(','),
      ...csvContent.map(row => headers.map(header => `"${row[header as keyof typeof row] || ''}"`).join(','))
    ].join('\n');

    const blob = new Blob([csvString], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'abn-search-results.csv';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };

  const clearAllFilters = () => {
    setFilters({
      query: '',
      state: '',
      businessType: '',
      gstStatus: '',
      abnStatus: '',
      postcode: ''
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
              <Building2 className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">ABN Business Search</h1>
              <p className="text-sm text-gray-600">Discover Australian businesses and their details</p>
            </div>
          </div>
        </div>
      </header>

      {/* Search Bar */}
      <SearchBar
        query={filters.query}
        onQueryChange={(query) => setFilters(prev => ({ ...prev, query }))}
        onExport={handleExport}
        onToggleFilters={() => setIsFilterSidebarOpen(!isFilterSidebarOpen)}
        resultsCount={searchResults.total}
      />

      {/* Main Content */}
      <main className="px-6 py-6">
        {loading ? (
          <LoadingState />
        ) : searchResults.records.length === 0 ? (
          <EmptyState 
            hasFilters={hasActiveFilters || !!filters.query}
            onClearFilters={clearAllFilters}
          />
        ) : (
          <>
            {/* Results Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {searchResults.records.map((business) => (
                <BusinessCard key={business.abn} business={business} />
              ))}
            </div>

            {/* Pagination */}
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          </>
        )}
      </main>

      {/* Filter Sidebar */}
      <FilterSidebar
        isOpen={isFilterSidebarOpen}
        onClose={() => setIsFilterSidebarOpen(false)}
        filters={filters}
        onFiltersChange={setFilters}
      />
    </div>
  );
}

export default App;