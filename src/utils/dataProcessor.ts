import { ABNRecord } from '../types/business';

// Sample data generator since we can't actually download the large ABN dataset
export const generateSampleData = (): ABNRecord[] => {
  const businessTypes = [
    { code: 'IND', description: 'Individual/Sole Trader' },
    { code: 'PRV', description: 'Australian Private Company' },
    { code: 'PUB', description: 'Australian Public Company' },
    { code: 'PTN', description: 'Partnership' },
    { code: 'TRU', description: 'Trust' },
    { code: 'SUP', description: 'Superannuation Fund' },
    { code: 'ASS', description: 'Incorporated Association' },
    { code: 'GOV', description: 'Government Entity' }
  ];

  const states = ['NSW', 'VIC', 'QLD', 'SA', 'WA', 'TAS', 'NT', 'ACT'];
  const businessNames = [
    'Tech Solutions', 'Digital Marketing', 'Construction Services', 'Consulting Group',
    'Software Development', 'Property Management', 'Financial Services', 'Healthcare',
    'Education Services', 'Retail Trading', 'Manufacturing', 'Transport Services',
    'Legal Services', 'Accounting Firm', 'Design Studio', 'Engineering Solutions',
    'Food Services', 'Tourism', 'Agriculture', 'Mining Services'
  ];

  const suffixes = ['Pty Ltd', 'Pty Limited', 'Ltd', 'Limited', 'Trust', 'Partnership', ''];

  const data: ABNRecord[] = [];

  for (let i = 0; i < 1000; i++) {
    const businessType = businessTypes[Math.floor(Math.random() * businessTypes.length)];
    const state = states[Math.floor(Math.random() * states.length)];
    const baseName = businessNames[Math.floor(Math.random() * businessNames.length)];
    const suffix = suffixes[Math.floor(Math.random() * suffixes.length)];
    const fullName = suffix ? `${baseName} ${suffix}` : baseName;
    
    // Generate realistic ABN (11 digits)
    const abn = Math.floor(10000000000 + Math.random() * 90000000000).toString();
    
    // Generate realistic postcode based on state
    let postcode = '';
    switch (state) {
      case 'NSW':
        postcode = (2000 + Math.floor(Math.random() * 999)).toString();
        break;
      case 'VIC':
        postcode = (3000 + Math.floor(Math.random() * 999)).toString();
        break;
      case 'QLD':
        postcode = (4000 + Math.floor(Math.random() * 999)).toString();
        break;
      case 'SA':
        postcode = (5000 + Math.floor(Math.random() * 999)).toString();
        break;
      case 'WA':
        postcode = (6000 + Math.floor(Math.random() * 999)).toString();
        break;
      case 'TAS':
        postcode = (7000 + Math.floor(Math.random() * 999)).toString();
        break;
      case 'NT':
        postcode = (800 + Math.floor(Math.random() * 99)).toString();
        break;
      case 'ACT':
        postcode = (2600 + Math.floor(Math.random() * 99)).toString();
        break;
    }

    const record: ABNRecord = {
      abn,
      abnStatus: Math.random() > 0.1 ? 'Active' : 'Cancelled',
      stateCode: state,
      postcode,
      businessTypeCode: businessType.code,
      businessTypeDescription: businessType.description,
      gstStatus: Math.random() > 0.3 ? 'Registered' : 'Not Registered',
      dgrtStatus: Math.random() > 0.8 ? 'Endorsed' : 'Not Endorsed',
      aecFund: Math.random() > 0.9 ? 'Yes' : 'No',
      mainName: {
        organisationName: fullName,
        score: Math.floor(80 + Math.random() * 20)
      },
      otherNames: Math.random() > 0.7 ? [{
        organisationName: `${baseName} Trading`,
        score: Math.floor(70 + Math.random() * 20)
      }] : [],
      address: {
        stateCode: state,
        postcode,
        fromDate: new Date(2020 + Math.floor(Math.random() * 4), Math.floor(Math.random() * 12), Math.floor(Math.random() * 28) + 1).toISOString().split('T')[0],
      }
    };

    data.push(record);
  }

  return data;
};

export const searchBusinesses = (
  data: ABNRecord[],
  filters: {
    query: string;
    state: string;
    businessType: string;
    gstStatus: string;
    abnStatus: string;
    postcode: string;
  },
  page: number,
  pageSize: number
) => {
  let filtered = data;

  // Apply filters
  if (filters.query) {
    const queryLower = filters.query.toLowerCase();
    filtered = filtered.filter(record => 
      record.abn.includes(filters.query) ||
      record.mainName.organisationName?.toLowerCase().includes(queryLower) ||
      record.otherNames.some(name => 
        name.organisationName?.toLowerCase().includes(queryLower)
      )
    );
  }

  if (filters.state) {
    filtered = filtered.filter(record => record.stateCode === filters.state);
  }

  if (filters.businessType) {
    filtered = filtered.filter(record => record.businessTypeCode === filters.businessType);
  }

  if (filters.gstStatus) {
    filtered = filtered.filter(record => record.gstStatus === filters.gstStatus);
  }

  if (filters.abnStatus) {
    filtered = filtered.filter(record => record.abnStatus === filters.abnStatus);
  }

  if (filters.postcode) {
    filtered = filtered.filter(record => record.postcode.includes(filters.postcode));
  }

  // Pagination
  const startIndex = (page - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const paginatedResults = filtered.slice(startIndex, endIndex);

  return {
    records: paginatedResults,
    total: filtered.length,
    page,
    pageSize
  };
};