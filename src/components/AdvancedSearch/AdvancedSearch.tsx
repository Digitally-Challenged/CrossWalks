import React, { useCallback, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Search, RefreshCw, ArrowLeft } from 'lucide-react';
import { JobData, FrequencyLevel } from '../../types/job';
import { AdvancedSearchParams } from '../../services/apiAdvDatabaseService';
import BasicInfo from './BasicInfo';
import PosturalsSection from './PosturalsSection';
import ManipulativeSection from './ManipulativeSection';
import SensorySection from './SensorySection';
import VisualSection from './VisualSection';
import EnvironmentalSection from './EnvironmentalSection';
import WorkerFunctionsSection from './WorkersFunctionSection';
import GEDSection from './GEDSection';
import { useAdvancedSearch } from '../../hooks/useAdvJobSearch';
import apiAdvDatabaseService from '../../services/apiAdvDatabaseService';
import { Button, Card, CardContent } from '../ui';

interface AdvancedSearchProps {
  onSearch: (advancedFilters: AdvancedSearchParams, results: JobData[]) => void;
  isExpanded: boolean;
  isSearching: boolean;
  onBackToBasic: () => void;
}

const AdvancedSearch: React.FC<AdvancedSearchProps> = React.memo(({
  onSearch,
  isExpanded,
  isSearching,
  onBackToBasic
}) => {
  const {
    filters,
    updateFilters,
    jobs,
    isLoading,
    error,
    submitSearch,
    resetFilters,
  } = useAdvancedSearch();

  const handleSearch = useCallback(async () => {
    await submitSearch();
    const apiParams = apiAdvDatabaseService.prepareAdvancedSearchParams(filters);
    onSearch(apiParams, jobs);
  }, [submitSearch, onSearch, filters, jobs]);

  useEffect(() => {
    if (jobs.length > 0) {
      const apiParams = apiAdvDatabaseService.prepareAdvancedSearchParams(filters);
      onSearch(apiParams, jobs);
    }
  }, [jobs, filters, onSearch]);

  const memoizedSections = useMemo(() => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div>
        <BasicInfo
          title={filters.title}
          strength={filters.strength}
          svp={filters.svp}
          setTitle={updateFilters}
          setStrength={updateFilters}
          setSvp={updateFilters}
          disabled={isLoading || isSearching}
        />
      </div>
      <div>
        <PosturalsSection
          posturals={filters.posturals}
          onUpdate={(field: string, value: FrequencyLevel | '') => 
            updateFilters(`posturals.${field}`, value)
          }
          disabled={isLoading || isSearching}
        />
      </div>
      <div>
        <ManipulativeSection
          manipulative={filters.manipulative}
          onUpdate={(field: string, value: FrequencyLevel | '') => 
            updateFilters(`manipulative.${field}`, value)
          }
          disabled={isLoading || isSearching}
        />
      </div>
      <div>
        <SensorySection
          sensory={filters.sensory}
          onUpdate={(field: string, value: FrequencyLevel | '') => 
            updateFilters(`sensory.${field}`, value)
          }
          disabled={isLoading || isSearching}
        />
      </div>
      <div>
        <VisualSection
          visual={filters.visual}
          onUpdate={(field: string, value: FrequencyLevel | '') => 
            updateFilters(`visual.${field}`, value)
          }
          disabled={isLoading || isSearching}
        />
      </div>
      <div>
        <EnvironmentalSection
          environmental={filters.environmental}
          onUpdate={(field: string, value: FrequencyLevel | '') => 
            updateFilters(`environmental.${field}`, value)
          }
          disabled={isLoading || isSearching}
        />
      </div>
      <div>
        <WorkerFunctionsSection
          workForce={filters.workerFunctions}
          onUpdate={(field: string, value: FrequencyLevel | '') => 
            updateFilters(`workerFunctions.${field}`, value)
          }
          disabled={isLoading || isSearching}
        />
      </div>
      <div>
        <GEDSection
          ged={filters.generalEducationalDevelopment}
          onUpdate={(field: string, value: FrequencyLevel | '') => 
            updateFilters(`generalEducationalDevelopment.${field}`, value)
          }
          disabled={isLoading || isSearching}
        />
      </div>
    </div>
  ), [filters, updateFilters, isLoading, isSearching]);

  if (!isExpanded) {
    return jobs.length > 0 ? (
      <div className="mt-4 text-sm text-gray-300">
        Filters applied. Click "Show Advanced Search Options" to modify.
      </div>
    ) : null;
  }

  return (
    <motion.div
      initial={{ height: 0, opacity: 0 }}
      animate={{ height: 'auto', opacity: 1 }}
      exit={{ height: 0, opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="bg-gray-800 shadow-lg">
        <CardContent className="p-6">
          <div className="mb-6">
            <Button
              variant="ghost"
              onClick={onBackToBasic}
              className="text-gray-400 hover:text-white flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Basic Search
            </Button>
          </div>

          {memoizedSections}

          {error && (
            <div className="mt-4 p-4 bg-red-900/50 text-red-200 rounded-lg">
              {error}
            </div>
          )}

          <div className="flex justify-end pt-4 border-t border-gray-700 space-x-4">
            <Button
              variant="outline"
              onClick={resetFilters}
              disabled={isLoading || isSearching}
            >
              <RefreshCw className="w-4 h-4 mr-2" />
              Reset Filters
            </Button>
            <Button
              onClick={handleSearch}
              disabled={isLoading || isSearching}
            >
              <Search className="w-4 h-4 mr-2" />
              {isLoading || isSearching ? 'Searching...' : 'Apply Filters'}
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
});

AdvancedSearch.displayName = 'AdvancedSearch';

export default AdvancedSearch;