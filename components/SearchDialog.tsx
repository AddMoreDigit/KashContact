import { useState, useEffect } from 'react';
import { X, Search as SearchIcon, Building2, Calendar, FileText, Users } from 'lucide-react';
import { serviceProviderStorage } from '../utils/serviceProviderStorage';
import { serviceStorage } from '../utils/serviceStorage';

type Page = 'dashboard' | 'campaigns' | 'vouchers' | 'transactions' | 'profile' | 'overview' | 'draft' | 'howItWorks' | 'campaignDetail' | 'viewCampaign' | 'messaging' | 'messageChat' | 'serviceDetail' | 'selectedServices' | 'createCampaign' | 'manageCampaign' | 'contributors' | 'contributorDetail' | 'campaignSchedule' | 'myCampaignSchedule' | 'campaignsHistory' | 'contribute' | 'individualCampaign' | 'groupCampaign' | 'managingCampaigns' | 'helpSupport' | 'saveDraft' | 'selectServices' | 'viewCampaignDetail' | 'serviceProviders';

interface SearchDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  searchQuery: string;
  onNavigate?: (page: Page) => void;
  onSelectProvider?: (provider: any) => void;
  onSelectService?: (service: any) => void;
}

interface SearchResult {
  type: 'provider' | 'service' | 'campaign' | 'page';
  id: string | number;
  title: string;
  subtitle: string;
  category?: string;
  data?: any;
}

export function SearchDialog({ open, onOpenChange, searchQuery, onNavigate, onSelectProvider, onSelectService }: SearchDialogProps) {
  const [results, setResults] = useState<SearchResult[]>([]);

  useEffect(() => {
    if (!searchQuery || searchQuery.length < 2) {
      setResults([]);
      return;
    }

    const query = searchQuery.toLowerCase();
    const searchResults: SearchResult[] = [];

    // Search service providers
    const providers = serviceProviderStorage.getAll();
    providers.forEach(provider => {
      if (
        provider.businessName.toLowerCase().includes(query) ||
        provider.name.toLowerCase().includes(query) ||
        provider.location.toLowerCase().includes(query) ||
        provider.businessType.toLowerCase().includes(query)
      ) {
        searchResults.push({
          type: 'provider',
          id: provider.id,
          title: provider.businessName,
          subtitle: `${provider.location} â€¢ ${provider.businessType}`,
          category: 'Service Provider',
          data: provider,
        });
      }
    });

    // Search services (synchronous)
    const services = serviceStorage.getAllServiceProviders();
    services.forEach(service => {
      if (
        service.name.toLowerCase().includes(query) ||
        service.location.toLowerCase().includes(query) ||
        service.category.toLowerCase().includes(query)
      ) {
        searchResults.push({
          type: 'service',
          id: service.id,
          title: service.name,
          subtitle: `${service.location} â€¢ ${service.category}`,
          category: 'Service',
          data: service,
        });
      }
    });

    // Add navigation pages that match
    const pages = [
      { name: 'Dashboard', page: 'dashboard', keywords: ['home', 'main', 'dashboard'] },
      { name: 'Campaigns', page: 'campaigns', keywords: ['campaigns', 'campaign', 'fundraising'] },
      { name: 'Transactions', page: 'transactions', keywords: ['transactions', 'payments', 'history'] },
      { name: 'Vouchers', page: 'vouchers', keywords: ['vouchers', 'coupons', 'discounts'] },
      { name: 'Profile', page: 'profile', keywords: ['profile', 'account', 'settings'] },
      { name: 'Help & Support', page: 'helpSupport', keywords: ['help', 'support', 'faq', 'contact'] },
      { name: 'Messaging', page: 'messaging', keywords: ['messages', 'messaging', 'chat', 'inbox'] },
    ];

    pages.forEach(({ name, page, keywords }) => {
      if (
        name.toLowerCase().includes(query) ||
        keywords.some(keyword => keyword.includes(query))
      ) {
        searchResults.push({
          type: 'page',
          id: page,
          title: name,
          subtitle: 'Navigate to page',
          category: 'Page',
        });
      }
    });

    setResults(searchResults.slice(0, 10)); // Limit to 10 results
  }, [searchQuery]);

  if (!open) return null;

  const handleResultClick = (result: SearchResult) => {
    switch (result.type) {
      case 'provider':
        if (onSelectProvider && result.data) {
          onSelectProvider(result.data);
        }
        if (onNavigate) {
          onNavigate('serviceDetail');
        }
        break;
      case 'service':
        if (onSelectService && result.data) {
          onSelectService(result.data);
        }
        if (onNavigate) {
          onNavigate('serviceDetail');
        }
        break;
      case 'page':
        if (onNavigate) {
          onNavigate(result.id as Page);
        }
        break;
    }
    onOpenChange(false);
  };

  const getIcon = (type: string) => {
    switch (type) {
      case 'provider':
        return <Building2 size={20} className="text-purple-600" />;
      case 'service':
        return <FileText size={20} className="text-blue-600" />;
      case 'campaign':
        return <Calendar size={20} className="text-green-600" />;
      case 'page':
        return <Users size={20} className="text-gray-600" />;
      default:
        return <SearchIcon size={20} className="text-gray-600" />;
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-start justify-center pt-20">
      <div className="bg-white rounded-lg shadow-2xl w-full max-w-2xl mx-4 max-h-[70vh] flex flex-col">
        {/* Header */}
        <div className="p-4 border-b border-gray-200 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <SearchIcon size={20} className="text-gray-400" />
            <h3 className="text-gray-900">Search Results</h3>
          </div>
          <button
            onClick={() => onOpenChange(false)}
            className="w-8 h-8 flex items-center justify-center hover:bg-gray-100 rounded-lg"
          >
            <X size={20} className="text-gray-700" />
          </button>
        </div>

        {/* Results */}
        <div className="flex-1 overflow-y-auto">
          {searchQuery.length < 2 ? (
            <div className="p-8 text-center text-gray-500">
              Type at least 2 characters to search
            </div>
          ) : results.length === 0 ? (
            <div className="p-8 text-center">
              <SearchIcon size={48} className="text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500">No results found for "{searchQuery}"</p>
              <p className="text-gray-400 text-sm mt-2">Try searching for service providers, services, or pages</p>
            </div>
          ) : (
            <div className="divide-y divide-gray-200">
              {results.map((result, index) => (
                <button
                  key={`${result.type}-${result.id}-${index}`}
                  onClick={() => handleResultClick(result)}
                  className="w-full p-4 flex items-start gap-4 hover:bg-gray-50 transition-colors text-left"
                >
                  <div className="mt-1">{getIcon(result.type)}</div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="text-gray-900 truncate">{result.title}</h4>
                      {result.category && (
                        <span className="px-2 py-0.5 bg-purple-100 text-purple-700 text-xs rounded-full flex-shrink-0">
                          {result.category}
                        </span>
                      )}
                    </div>
                    <p className="text-gray-600 text-sm truncate">{result.subtitle}</p>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {results.length > 0 && (
          <div className="p-3 border-t border-gray-200 bg-gray-50">
            <p className="text-gray-500 text-xs text-center">
              Showing {results.length} result{results.length !== 1 ? 's' : ''}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
