import React from 'react';
import { Search } from 'lucide-react';

interface EmptyStateProps {
  hasFilters: boolean;
  onClearFilters: () => void;
}

export const EmptyState: React.FC<EmptyStateProps> = ({ hasFilters, onClearFilters }) => {
  return (
    <div className="flex flex-col items-center justify-center py-12">
      <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
        <Search className="w-8 h-8 text-gray-400" />
      </div>
      <h3 className="text-lg font-medium text-gray-900 mb-2">No businesses found</h3>
      <p className="text-gray-500 text-center mb-4 max-w-md">
        {hasFilters 
          ? "No businesses match your current search criteria. Try adjusting your filters or search terms."
          : "Start searching for Australian businesses by name, ABN, or use the filters to explore."}
      </p>
      {hasFilters && (
        <button
          onClick={onClearFilters}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Clear Filters
        </button>
      )}
    </div>
  );
};