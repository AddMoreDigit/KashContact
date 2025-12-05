import { useState, useEffect, useRef } from 'react';
import { Search, X } from 'lucide-react';
import { serviceProviderStorage } from '../../utils/serviceProviderStorage';
import { serviceStorage } from '../../utils/serviceStorage';

type Page = 'dashboard' | 'campaigns' | 'vouchers' | 'transactions' | 'profile' | 'overview' | 'draft' | 'howItWorks' | 'campaignDetail' | 'viewCampaign' | 'messaging' | 'messageChat' | 'serviceDetail' | 'selectedServices' | 'createCampaign' | 'manageCampaign' | 'contributors' | 'contributorDetail' | 'campaignSchedule' | 'myCampaignSchedule' | 'campaignsHistory' | 'contribute' | 'individualCampaign' | 'groupCampaign' | 'managingCampaigns' | 'helpSupport' | 'saveDraft' | 'selectServices' | 'viewCampaignDetail' | 'serviceProviders';

interface NetflixSearchProps {
  onNavigate?: (page: Page) => void;
  onSelectProvider?: (provider: any) => void;
  onSelectService?: (service: any) => void;
}

interface SearchResult {
  type: 'provider' | 'service' | 'page';
  id: string | number;
  title: string;
  subtitle: string;
  image?: string;
  data?: any;
}

export function NetflixSearch({ onNavigate, onSelectProvider, onSelectService }: NetflixSearchProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isFocused, setIsFocused] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Close search when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsExpanded(false);
        setSearchQuery('');
        setIsFocused(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Search functionality
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
          image: provider.image,
          data: provider,
        });
      }
    });

    // Search services
    const services = serviceStorage.getAllServiceProviders();
    services.forEach(service => {
      if (
        service.name.toLowerCase().includes(query) ||
        service.location.toLowerCase().includes(query) ||
        service.category.toLowerCase().includes(query) ||
        (service.serviceProviderName && service.serviceProviderName.toLowerCase().includes(query)) ||
        (service.description && service.description.toLowerCase().includes(query))
      ) {
        searchResults.push({
          type: 'service',
          id: service.id,
          title: service.name,
          subtitle: `${service.serviceProviderName || service.location} â€¢ ${service.category}${service.price ? ' â€¢ ' + service.price : ''}`,
          image: service.image,
          data: service,
        });
      }
    });

    // Add navigation pages
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
        });
      }
    });

    setResults(searchResults.slice(0, 8));
  }, [searchQuery]);

  const handleSearchClick = () => {
    setIsExpanded(true);
    setTimeout(() => inputRef.current?.focus(), 100);
  };

  const handleClear = () => {
    setSearchQuery('');
    setResults([]);
    inputRef.current?.focus();
  };

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
    setIsExpanded(false);
    setSearchQuery('');
    setIsFocused(false);
  };

  return (
    <div ref={searchRef} className="relative">
      {/* Search Container */}
      <div
        className={`flex items-center transition-all duration-300 ease-in-out ${
          isExpanded ? 'w-80' : 'w-10'
        }`}
      >
        {/* Search Icon Button */}
        {!isExpanded && (
          <button
            onClick={handleSearchClick}
            className="w-10 h-10 flex items-center justify-center hover:bg-gray-100 rounded-lg transition-colors"
            aria-label="Search"
          >
            <Search size={20} className="text-gray-700" />
          </button>
        )}

        {/* Expanded Search Input */}
        {isExpanded && (
          <div className="flex items-center w-full bg-white border border-gray-300 rounded-lg overflow-hidden">
            <Search size={18} className="text-gray-400 ml-3 flex-shrink-0" />
            <input
              ref={inputRef}
              type="text"
              placeholder="Search providers, services..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => setIsFocused(true)}
              className="flex-1 px-3 py-2 outline-none text-gray-900 placeholder-gray-400"
            />
            {searchQuery && (
              <button
                onClick={handleClear}
                className="w-8 h-8 flex items-center justify-center hover:bg-gray-100 transition-colors flex-shrink-0"
                aria-label="Clear search"
              >
                <X size={18} className="text-gray-500" />
              </button>
            )}
          </div>
        )}
      </div>

      {/* Search Results Dropdown */}
      {isExpanded && isFocused && searchQuery.length >= 2 && (
        <div className="absolute top-full right-0 mt-2 w-96 bg-white rounded-lg shadow-2xl border border-gray-200 overflow-hidden z-50 max-h-[500px] overflow-y-auto">
          {results.length === 0 ? (
            <div className="p-8 text-center">
              <Search size={40} className="text-gray-300 mx-auto mb-3" />
              <p className="text-gray-500">No results for "{searchQuery}"</p>
              <p className="text-gray-400 text-xs mt-1">Try different keywords</p>
            </div>
          ) : (
            <div className="py-2">
              {results.map((result, index) => (
                <button
                  key={`${result.type}-${result.id}-${index}`}
                  onClick={() => handleResultClick(result)}
                  className="w-full px-4 py-3 flex items-start gap-3 hover:bg-gray-100 transition-colors text-left"
                >
                  {/* Image or Icon */}
                  {result.image ? (
                    <img
                      src={result.image}
                      alt={result.title}
                      className="w-16 h-16 object-cover rounded flex-shrink-0"
                    />
                  ) : (
                    <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-700 rounded flex items-center justify-center flex-shrink-0">
                      <Search size={24} className="text-white" />
                    </div>
                  )}

                  {/* Content */}
                  <div className="flex-1 min-w-0 pt-1">
                    <h4 className="text-gray-900 truncate mb-1">{result.title}</h4>
                    <p className="text-gray-500 text-sm truncate">{result.subtitle}</p>
                    {result.type !== 'page' && (
                      <span className="inline-block mt-1 px-2 py-0.5 bg-purple-100 text-purple-700 text-xs rounded">
                        {result.type === 'provider' ? 'Service Provider' : 'Service'}
                      </span>
                    )}
                  </div>
                </button>
              ))}
            </div>
          )}

          {/* Footer */}
          {results.length > 0 && (
            <div className="px-4 py-2 bg-gray-50 border-t border-gray-200">
              <p className="text-gray-500 text-xs">
                {results.length} result{results.length !== 1 ? 's' : ''} found
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
