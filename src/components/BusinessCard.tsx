import React from 'react';
import { Building2, MapPin, Calendar, CheckCircle, XCircle } from 'lucide-react';
import { ABNRecord } from '../types/business';

interface BusinessCardProps {
  business: ABNRecord;
}

export const BusinessCard: React.FC<BusinessCardProps> = ({ business }) => {
  const getStatusColor = (status: string) => {
    return status === 'Active' ? 'text-emerald-600' : 'text-red-600';
  };

  const getStatusIcon = (status: string) => {
    return status === 'Active' ? (
      <CheckCircle className="w-4 h-4 text-emerald-600" />
    ) : (
      <XCircle className="w-4 h-4 text-red-600" />
    );
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow duration-200">
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-900 mb-1">
            {business.mainName.organisationName || 
             `${business.mainName.personGivenName} ${business.mainName.personFamilyName}`}
          </h3>
          <p className="text-sm text-gray-600 mb-2">ABN: {business.abn}</p>
          
          {business.otherNames.length > 0 && (
            <p className="text-sm text-gray-500 mb-2">
              Trading as: {business.otherNames.map(name => name.organisationName).join(', ')}
            </p>
          )}
        </div>
        
        <div className="flex items-center gap-1">
          {getStatusIcon(business.abnStatus)}
          <span className={`text-sm font-medium ${getStatusColor(business.abnStatus)}`}>
            {business.abnStatus}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <Building2 className="w-4 h-4" />
          <span>{business.businessTypeDescription}</span>
        </div>
        
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <MapPin className="w-4 h-4" />
          <span>{business.stateCode} {business.postcode}</span>
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
          business.gstStatus === 'Registered' 
            ? 'bg-emerald-100 text-emerald-800' 
            : 'bg-gray-100 text-gray-800'
        }`}>
          GST: {business.gstStatus}
        </span>
        
        {business.dgrtStatus === 'Endorsed' && (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
            DGR Endorsed
          </span>
        )}
        
        {business.aecFund === 'Yes' && (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
            AEC Fund
          </span>
        )}
      </div>

      {business.address.fromDate && (
        <div className="mt-4 pt-4 border-t border-gray-100">
          <div className="flex items-center gap-2 text-xs text-gray-500">
            <Calendar className="w-3 h-3" />
            <span>Registered: {new Date(business.address.fromDate).toLocaleDateString()}</span>
          </div>
        </div>
      )}
    </div>
  );
};