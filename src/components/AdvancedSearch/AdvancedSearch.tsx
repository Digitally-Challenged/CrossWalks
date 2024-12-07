import React, { useCallback, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Search, RefreshCw, ArrowLeft, User, Activity, Eye, Ear, Cloud, Users, GraduationCap } from 'lucide-react';
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
import { Button, Card } from 'flowbite-react';
import SearchResults from '../SearchResults';
import { Table } from '../ui/Table';
import type { 
  FilterMode, 
  StrengthLevel, 
  SVPLevel, 
  FrequencyLevel,
  AdvancedSearchState 
} from '../../types/filters';

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
    hasPerformedSearch,
    fetchNextPage
  } = useAdvancedSearch();

  const handleSearch = useCallback(async () => {
    console.log('🔍 Starting advanced search...');
    await submitSearch();
  }, [submitSearch]);

  const handleJobSelect = useCallback((job: JobData) => {
    console.log('Selected job:', job);
    // Handle job selection
  }, []);

  const handleLoadMore = useCallback(async () => {
    await fetchNextPage();
  }, [fetchNextPage]);

  const handleStrengthChange = useCallback((value: StrengthLevel | null, mode: FilterMode) => {
    console.log('Strength change:', { value, mode });
    updateFilters('strength', { value, mode });
  }, [updateFilters]);

  const handleSvpChange = useCallback((value: SVPLevel | null, mode: FilterMode) => {
    console.log('SVP change:', { value, mode });
    updateFilters('svp', { value, mode });
  }, [updateFilters]);

  const formattedError = useMemo(() => {
    if (!error) return null;
    if (error instanceof Error) return error;
    if (typeof error === 'string') return new Error(error);
    return new Error('An unknown error occurred');
  }, [error]);

  // Ensure filters are properly initialized
  const safeFilters: AdvancedSearchState = useMemo(() => ({
    ...filters,
    definition: filters.definition || "",
    workForce: filters.workForce || {
      data: { value: null, mode: "maximum" },
      people: { value: null, mode: "maximum" },
      things: { value: null, mode: "maximum" }
    },
    strength: filters.strength || { value: null, mode: "maximum" },
    svp: filters.svp || { value: null, mode: "maximum" },
  }), [filters]);

  // Transform FilterConfig to string values for each section
  const transformedPosturals = {
    climbing: (safeFilters.posturals.climbing.value || "") as "" | FrequencyLevel,
    balancing: (safeFilters.posturals.balancing.value || "") as "" | FrequencyLevel,
    stooping: (safeFilters.posturals.stooping.value || "") as "" | FrequencyLevel,
    kneeling: (safeFilters.posturals.kneeling.value || "") as "" | FrequencyLevel,
    crouching: (safeFilters.posturals.crouching.value || "") as "" | FrequencyLevel,
    crawling: (safeFilters.posturals.crawling.value || "") as "" | FrequencyLevel
  };

  const transformedManipulative = {
    reaching: (safeFilters.manipulative.reaching.value || "") as "" | FrequencyLevel,
    handling: (safeFilters.manipulative.handling.value || "") as "" | FrequencyLevel,
    fingering: (safeFilters.manipulative.fingering.value || "") as "" | FrequencyLevel
  };

  const transformedSensory = {
    feeling: (safeFilters.sensory.feeling.value || "") as "" | FrequencyLevel,
    talking: (safeFilters.sensory.talking.value || "") as "" | FrequencyLevel,
    hearing: (safeFilters.sensory.hearing.value || "") as "" | FrequencyLevel,
    tasteSmell: (safeFilters.sensory.tasteSmell.value || "") as "" | FrequencyLevel
  };

  const transformedVisual = {
    nearAcuity: safeFilters.visual.nearAcuity.value?.toString() || "",
    farAcuity: safeFilters.visual.farAcuity.value?.toString() || "",
    depthPerception: safeFilters.visual.depthPerception.value?.toString() || "",
    accommodation: safeFilters.visual.accommodation.value?.toString() || "",
    colorVision: safeFilters.visual.colorVision.value?.toString() || "",
    fieldOfVision: safeFilters.visual.fieldOfVision.value?.toString() || ""
  };

  const transformedEnvironmental = {
    weather: (safeFilters.environmental.weather.value || "") as "" | FrequencyLevel,
    extremeCold: (safeFilters.environmental.extremeCold.value || "") as "" | FrequencyLevel,
    extremeHeat: (safeFilters.environmental.extremeHeat.value || "") as "" | FrequencyLevel,
    wet: (safeFilters.environmental.wetHumid.value || "") as "" | FrequencyLevel,
    noise: (safeFilters.environmental.noise.value || "") as "" | FrequencyLevel,
    vibration: (safeFilters.environmental.vibration.value || "") as "" | FrequencyLevel,
    atmosphericConditions: (safeFilters.environmental.atmospheric.value || "") as "" | FrequencyLevel,
    movingMechanicalParts: "" as "" | FrequencyLevel,
    electricShock: "" as "" | FrequencyLevel,
    highPlaces: "" as "" | FrequencyLevel,
    radiation: "" as "" | FrequencyLevel,
    toxicChemicals: "" as "" | FrequencyLevel,
    other: "" as "" | FrequencyLevel
  };

  const transformedWorkForce = {
    data: safeFilters.workForce.data.value?.toString() || "",
    people: safeFilters.workForce.people.value?.toString() || "",
    things: safeFilters.workForce.things.value?.toString() || ""
  };

  const transformedGed = {
    reasoning: safeFilters.generalEducationalDevelopment.reasoning.value?.toString() || "",
    math: safeFilters.generalEducationalDevelopment.math.value?.toString() || "",
    language: safeFilters.generalEducationalDevelopment.language.value?.toString() || ""
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      {/* Navigation and Action Buttons */}
      <div className="flex justify-between items-center">
        <Button
          color="gray"
          onClick={onBackToBasic}
          className="text-gray-400 hover:text-white"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Basic Search
        </Button>
        <div className="flex gap-4">
          <Button
            color="gray"
            onClick={resetFilters}
            disabled={isLoading}
          >
            <RefreshCw className="w-4 h-4 mr-2" />
            Reset Filters
          </Button>
          <Button
            color="gray"
            onClick={handleSearch}
            disabled={isLoading}
          >
            <Search className="w-4 h-4 mr-2" />
            {isLoading ? 'Searching...' : 'Apply Filters'}
          </Button>
        </div>
      </div>

      {/* Tables Layout - Single Column */}
      <div className="space-y-6">
        {/* Table 1: Basic Search */}
        <Card className="bg-gray-800 border-gray-700">
          <Table 
            title="Basic Search Criteria" 
            description="Primary job search parameters"
            icon={Search}
            className="text-center"
          >
            <BasicInfo
              title={safeFilters.title}
              definition={safeFilters.definition}
              strength={safeFilters.strength}
              svp={safeFilters.svp}
              setTitle={(value) => updateFilters('title', value)}
              setDefinition={(value) => updateFilters('definition', value)}
              setStrength={handleStrengthChange}
              setSvp={handleSvpChange}
              onSearch={handleSearch}
            />
          </Table>
        </Card>

        {/* Table 2: Posturals */}
        <Card className="bg-gray-800 border-gray-700">
          <Table 
            title="Postural Requirements" 
            icon={User}
            className="text-center"
          >
            <PosturalsSection
              posturals={transformedPosturals}
              setPosturals={(value) => updateFilters('posturals', value)}
            />
          </Table>
        </Card>

        {/* Table 3: Manipulative */}
        <Card className="bg-gray-800 border-gray-700">
          <Table 
            title="Manipulative Requirements" 
            icon={Activity}
            className="text-center"
          >
            <ManipulativeSection
              manipulative={transformedManipulative}
              setManipulative={(value) => updateFilters('manipulative', value)}
            />
          </Table>
        </Card>

        {/* Table 4: Sensory */}
        <Card className="bg-gray-800 border-gray-700">
          <Table 
            title="Sensory Requirements" 
            icon={Ear}
            className="text-center"
          >
            <SensorySection
              sensory={transformedSensory}
              setSensory={(value) => updateFilters('sensory', value)}
            />
          </Table>
        </Card>

        {/* Table 5: Visual */}
        <Card className="bg-gray-800 border-gray-700">
          <Table 
            title="Visual Requirements" 
            icon={Eye}
            className="text-center"
          >
            <VisualSection
              visual={transformedVisual}
              setVisual={(value) => updateFilters('visual', value)}
            />
          </Table>
        </Card>

        {/* Table 6: Environmental */}
        <Card className="bg-gray-800 border-gray-700">
          <Table 
            title="Environmental Conditions" 
            icon={Cloud}
            className="text-center"
          >
            <EnvironmentalSection
              environmental={transformedEnvironmental}
              setEnvironmental={(value) => updateFilters('environmental', value)}
            />
          </Table>
        </Card>

        {/* Table 7: Worker Functions */}
        <Card className="bg-gray-800 border-gray-700">
          <Table 
            title="Worker Function Requirements" 
            icon={Users}
            className="text-center"
          >
            <WorkerFunctionsSection
              workForce={transformedWorkForce}
              setWorkForce={(value) => updateFilters('workForce', value)}
            />
          </Table>
        </Card>

        {/* Table 8: GED */}
        <Card className="bg-gray-800 border-gray-700">
          <Table 
            title="General Educational Development" 
            icon={GraduationCap}
            className="text-center"
          >
            <GEDSection
              ged={transformedGed}
              setGed={(value) => updateFilters('generalEducationalDevelopment', value)}
            />
          </Table>
        </Card>
      </div>

      {/* Search Results */}
      <SearchResults
        jobs={jobs}
        isLoading={isLoading}
        isFetchingNextPage={isFetchingNextPage}
        error={formattedError}
        onJobSelect={handleJobSelect}
        hasPerformedSearch={hasPerformedSearch}
        onLoadMore={handleLoadMore}
        hasNextPage={hasNextPage}
      />
    </motion.div>
  );
});

AdvancedSearch.displayName = 'AdvancedSearch';

export default AdvancedSearch;