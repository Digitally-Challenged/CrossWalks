import React, { useCallback, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Search, RefreshCw, ArrowLeft } from 'lucide-react';
import { JobData } from '../../types/job';
import BasicInfo from './BasicInfo';
import PosturalsSection from './PosturalsSection';
import ManipulativeSection from './ManipulativeSection';
import SensorySection from './SensorySection';
import VisualSection from './VisualSection';
import EnvironmentalSection from './EnvironmentalSection';
import WorkerFunctionsSection from './WorkersFunctionSection';
import GEDSection from './GEDSection';
import { useAdvancedSearch } from '../../hooks/useAdvJobSearch';
import { Button, Card, CardContent } from '../ui';
import SearchResults from '../SearchResults';

interface AdvancedSearchProps {
  onBackToBasic: () => void;
}

const AdvancedSearch: React.FC<AdvancedSearchProps> = React.memo(({ onBackToBasic }) => {
  const {
    filters,
    updateFilters,
    jobs,
    isLoading,
    error,
    submitSearch,
    resetFilters,
    hasNextPage,
    isFetchingNextPage,
    loadMore,
    hasPerformedSearch
  } = useAdvancedSearch();

  const handleSearch = useCallback(async () => {
    console.log('🔍 Starting advanced search...');
    await submitSearch();
  }, [submitSearch]);

  const handleJobSelect = useCallback((job: JobData) => {
    console.log('Selected job:', job);
    // Handle job selection
  }, []);

  const memoizedSections = useMemo(() => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div>
        <BasicInfo
          title={filters.title}
          strength={filters.strength}
          svp={filters.svp}
          setTitle={(value) => updateFilters('title', value)}
          setStrength={(value) => updateFilters('strength', value)}
          setSvp={(value) => updateFilters('svp', value)}
        />
      </div>
      <div>
        <PosturalsSection
          posturals={filters.posturals}
          setPosturals={(value) => updateFilters('posturals', value)}
        />
      </div>
      <div>
        <ManipulativeSection
          manipulative={filters.manipulative}
          setManipulative={(value) => updateFilters('manipulative', value)}
        />
      </div>
      <div>
        <SensorySection
          sensory={filters.sensory}
          setSensory={(value) => updateFilters('sensory', value)}
        />
      </div>
      <div>
        <VisualSection
          visual={filters.visual}
          setVisual={(value) => updateFilters('visual', value)}
        />
      </div>
      <div>
        <EnvironmentalSection
          environmental={filters.environmental}
          setEnvironmental={(value) => updateFilters('environmental', value)}
        />
      </div>
      <div>
        <WorkerFunctionsSection
          workForce={filters.workerFunctions}
          setWorkForce={(value) => updateFilters('workerFunctions', value)}
        />
      </div>
      <div>
        <GEDSection
          ged={filters.generalEducationalDevelopment}
          setGed={(value) => updateFilters('generalEducationalDevelopment', value)}
        />
      </div>
    </div>
  ), [filters, updateFilters]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
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

          <div className="flex justify-end pt-4 border-t border-gray-700 space-x-4">
            <Button
              variant="outline"
              onClick={resetFilters}
              disabled={isLoading}
            >
              <RefreshCw className="w-4 h-4 mr-2" />
              Reset Filters
            </Button>
            <Button
              onClick={handleSearch}
              disabled={isLoading}
            >
              <Search className="w-4 h-4 mr-2" />
              {isLoading ? 'Searching...' : 'Apply Filters'}
            </Button>
          </div>
        </CardContent>
      </Card>

      <SearchResults
        jobs={jobs}
        isLoading={isLoading}
        isFetchingNextPage={isFetchingNextPage}
        error={error ? new Error(error) : null}
        onJobSelect={handleJobSelect}
        hasPerformedSearch={hasPerformedSearch}
        onLoadMore={loadMore}
        hasNextPage={hasNextPage}
      />
    </motion.div>
  );
});

AdvancedSearch.displayName = 'AdvancedSearch';

export default AdvancedSearch;