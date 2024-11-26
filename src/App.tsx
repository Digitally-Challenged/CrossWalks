import React, { useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { HardHat } from 'lucide-react';
import JobSearch from './components/JobSearch';
import AdvancedSearch from './components/AdvancedSearch';
import type { JobData } from './types/job';

// Define the filter types
interface AdvancedFilters {
  title?: string;
  strength?: string;
  svp?: string;
  posturals?: string[];
  manipulative?: string[];
  sensory?: string[];
  visual?: string[];
  workerFunctions?: string[];
}

const queryClient = new QueryClient();

const App: React.FC = () => {
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [isSearching, setIsSearching] = useState(false);

  const handleAdvancedSearch = async (filters: AdvancedFilters, results: JobData[]) => {
    setIsSearching(true);
    try {
      // Handle advanced search results
      console.log('Advanced search results:', results);
    } finally {
      setIsSearching(false);
    }
  };

  const handleBackToBasic = () => {
    setShowAdvanced(false);
  };

  return (
    <QueryClientProvider client={queryClient}>
      <div className="min-h-screen bg-gray-900 p-4">
        <div className="max-w-6xl mx-auto space-y-6">
          {/* Updated Header */}
          <div className="bg-gray-800 p-6 rounded-lg shadow-xl border border-gray-700">
            <div className="flex flex-col items-center text-center">
              <div className="flex items-center gap-3 mb-2">
                <HardHat className="w-8 h-8 text-blue-400" />
                <h1 className="text-3xl font-bold text-blue-400">
                  Crosswalks
                </h1>
              </div>
              <p className="text-gray-300 max-w-2xl">
                Search and explore detailed job information from the Dictionary of Occupational Titles
              </p>
            </div>
          </div>

          {/* Main Content */}
          <div className="bg-gray-800 p-6 rounded-lg shadow-xl border border-gray-700">
            {showAdvanced ? (
              <AdvancedSearch
                onSearch={handleAdvancedSearch}
                isExpanded={true}
                isSearching={isSearching}
                onBackToBasic={handleBackToBasic}
              />
            ) : (
              <JobSearch 
                onAdvancedClick={() => setShowAdvanced(true)}
              />
            )}
          </div>
        </div>
      </div>
    </QueryClientProvider>
  );
};

export default App;