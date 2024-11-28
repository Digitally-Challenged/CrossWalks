import React, { useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { HardHat } from 'lucide-react';
import JobSearch from './components/JobSearch';
import AdvancedSearch from './components/AdvancedSearch';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});

const App: React.FC = () => {
  const [showAdvanced, setShowAdvanced] = useState(false);

  const handleToggleAdvanced = (show: boolean) => {
    console.log(`🔄 ${show ? 'Switching to advanced' : 'Returning to basic'} search`);
    setShowAdvanced(show);
  };

  return (
    <QueryClientProvider client={queryClient}>
      <div className="min-h-screen bg-gray-900 p-4">
        <div className="max-w-6xl mx-auto space-y-6">
          {/* Header */}
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
                onBackToBasic={() => handleToggleAdvanced(false)}
              />
            ) : (
              <JobSearch 
                onAdvancedClick={() => handleToggleAdvanced(true)}
              />
            )}
          </div>
        </div>
      </div>
    </QueryClientProvider>
  );
};

export default App;