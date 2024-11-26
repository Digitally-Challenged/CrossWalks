import axios from 'axios';
import { z } from 'zod';
import { JobData, APIResponse } from '../types/job';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://occuguru-production.up.railway.app';
const SEARCH_ENDPOINT = '/v2/advanced-search';

const advancedSearchParamsSchema = z.object({
  Title: z.string().optional(),
  Strength: z.string().optional(),
  SVPNum: z.number().min(1).max(9).optional(),
  ClimbingNum: z.number().min(1).max(4).optional(),
  BalancingNum: z.number().min(1).max(4).optional(),
  StoopingNum: z.number().min(1).max(4).optional(),
  KneelingNum: z.number().min(1).max(4).optional(),
  CrouchingNum: z.number().min(1).max(4).optional(),
  CrawlingNum: z.number().min(1).max(4).optional(),
  ReachingNum: z.number().min(1).max(4).optional(),
  HandlingNum: z.number().min(1).max(4).optional(),
  FingeringNum: z.number().min(1).max(4).optional(),
  FeelingNum: z.number().min(1).max(4).optional(),
  TalkingNum: z.number().min(1).max(4).optional(),
  HearingNum: z.number().min(1).max(4).optional(),
  TastingNum: z.number().min(1).max(4).optional(),
  NearAcuityNum: z.number().min(1).max(4).optional(),
  FarAcuityNum: z.number().min(1).max(4).optional(),
  DepthNum: z.number().min(1).max(4).optional(),
  AccommodationNum: z.number().min(1).max(4).optional(),
  ColorVisionNum: z.number().min(1).max(4).optional(),
  FieldVisionNum: z.number().min(1).max(4).optional(),
  WeatherNum: z.number().min(1).max(4).optional(),
  ColdNum: z.number().min(1).max(4).optional(),
  HeatNum: z.number().min(1).max(4).optional(),
  WetNum: z.number().min(1).max(4).optional(),
  NoiseNum: z.number().min(1).max(5).optional(),
  VibrationNum: z.number().min(1).max(4).optional(),
  AtmosphereNum: z.number().min(1).max(4).optional(),
  MovingNum: z.number().min(1).max(4).optional(),
  ElectricityNum: z.number().min(1).max(4).optional(),
  HeightNum: z.number().min(1).max(4).optional(),
  RadiationNum: z.number().min(1).max(4).optional(),
  ExplosionNum: z.number().min(1).max(4).optional(),
  ToxicNum: z.number().min(1).max(4).optional(),
  OtherNum: z.number().min(1).max(4).optional(),
  WFData: z.number().min(0).max(8).optional(),
  WFPeople: z.number().min(0).max(8).optional(),
  WFThings: z.number().min(0).max(8).optional(),
  GEDR: z.number().min(1).max(6).optional(),
  GEDM: z.number().min(1).max(6).optional(),
  GEDL: z.number().min(1).max(6).optional(),
});

export type AdvancedSearchParams = z.infer<typeof advancedSearchParamsSchema>;

interface SearchQueryParams {
  limit?: number;
  sort_field?: string;
  sort_order?: 'asc' | 'desc';
}

export const advancedSearchJobs = async (
  params: AdvancedSearchParams, 
  queryParams: SearchQueryParams = { limit: 20, sort_field: 'Title', sort_order: 'asc' }
): Promise<JobData[]> => {
  try {
    const response = await axios.post<APIResponse<JobData>>(
      `${API_BASE_URL}${SEARCH_ENDPOINT}`,
      { filters: params },
      { params: queryParams }
    );

    if (response.data.status === 'error') {
      throw new Error(response.data.message || 'An error occurred while performing advanced search');
    }

    return response.data.results || [];
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(`Failed to fetch search results: ${error.response?.status} ${error.response?.statusText}`);
    }
    throw new Error('An unexpected error occurred');
  }
};

export const convertFrequencyToDatabaseValue = (value: string): number => {
  const frequencyMap: Record<string, number> = {
    'Not Present': 1,
    'Occasionally': 2,
    'Frequently': 3,
    'Constantly': 4
  };
  return frequencyMap[value] || 0;
};

export const convertStrengthToDatabaseValue = (value: string): string => {
  const strengthMap: Record<string, string> = {
    'S': 'S',
    'L': 'L',
    'M': 'M',
    'H': 'H',
    'V': 'V'
  };
  return strengthMap[value] || '';
};

export const prepareAdvancedSearchParams = (uiParams: any): AdvancedSearchParams => {
  const dbParams: AdvancedSearchParams = {};

  if (uiParams.title) dbParams.Title = uiParams.title;
  if (uiParams.strength) dbParams.Strength = convertStrengthToDatabaseValue(uiParams.strength);
  if (uiParams.svp) dbParams.SVPNum = parseInt(uiParams.svp);

  const mapFields = (source: any, target: any, prefix: string, converter: (val: string) => number) => {
    Object.entries(source).forEach(([key, value]) => {
      if (value) {
        const dbKey = `${prefix}${key.charAt(0).toUpperCase() + key.slice(1)}Num`;
        target[dbKey] = converter(value as string);
      }
    });
  };

  mapFields(uiParams.posturals, dbParams, '', convertFrequencyToDatabaseValue);
  mapFields(uiParams.manipulative, dbParams, '', convertFrequencyToDatabaseValue);
  mapFields(uiParams.sensory, dbParams, '', convertFrequencyToDatabaseValue);
  mapFields(uiParams.visual, dbParams, '', convertFrequencyToDatabaseValue);
  mapFields(uiParams.environmental, dbParams, '', convertFrequencyToDatabaseValue);

  if (uiParams.workerFunctions) {
    if (uiParams.workerFunctions.data) dbParams.WFData = parseInt(uiParams.workerFunctions.data);
    if (uiParams.workerFunctions.people) dbParams.WFPeople = parseInt(uiParams.workerFunctions.people);
    if (uiParams.workerFunctions.things) dbParams.WFThings = parseInt(uiParams.workerFunctions.things);
  }

  if (uiParams.generalEducationalDevelopment) {
    if (uiParams.generalEducationalDevelopment.reasoning) dbParams.GEDR = parseInt(uiParams.generalEducationalDevelopment.reasoning);
    if (uiParams.generalEducationalDevelopment.math) dbParams.GEDM = parseInt(uiParams.generalEducationalDevelopment.math);
    if (uiParams.generalEducationalDevelopment.language) dbParams.GEDL = parseInt(uiParams.generalEducationalDevelopment.language);
  }

  return dbParams;
};

const apiAdvDatabaseService = {
  advancedSearchJobs,
  prepareAdvancedSearchParams,
  convertFrequencyToDatabaseValue,
  convertStrengthToDatabaseValue,
};

export default apiAdvDatabaseService;