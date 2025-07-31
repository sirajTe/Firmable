export interface ABNRecord {
  abn: string;
  abnStatus: string;
  stateCode: string;
  postcode: string;
  businessTypeCode: string;
  gstStatus: string;
  dgrtStatus: string;
  aecFund: string;
  businessTypeDescription: string;
  // Main name
  mainName: {
    organisationName?: string;
    personGivenName?: string;
    personFamilyName?: string;
    personNameType?: string;
    score?: number;
  };
  // Other names (trading names, etc.)
  otherNames: Array<{
    organisationName?: string;
    personGivenName?: string;
    personFamilyName?: string;
    personNameType?: string;
    score?: number;
  }>;
  // Address
  address: {
    stateCode: string;
    postcode: string;
    fromDate: string;
    toDate?: string;
  };
}

export interface SearchFilters {
  query: string;
  state: string;
  businessType: string;
  gstStatus: string;
  abnStatus: string;
  postcode: string;
}

export interface SearchResult {
  records: ABNRecord[];
  total: number;
  page: number;
  pageSize: number;
}