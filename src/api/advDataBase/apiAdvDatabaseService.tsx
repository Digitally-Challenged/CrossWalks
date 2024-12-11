import axios from 'axios';
import { z } from 'zod';
import { jobDataSchema } from '../schemas';
import { mapAPIJobDataToJobData } from '../mappers';
import { handleAPIError } from '../errors';
import type { JobData } from '../../types/job';
import { debounce } from 'lodash';

// Define environment variable type
const getApiBaseUrl = (): string => {
  const viteUrl = import.meta.env?.VITE_API_BASE_URL;
  const windowUrl = window.env?.REACT_APP_API_BASE_URL;
  
  if (typeof viteUrl === 'string' && viteUrl) return viteUrl;
  if (typeof windowUrl === 'string' && windowUrl) return windowUrl;
  
  return 'http://127.0.0.1:8002';
};

const API_BASE_URL = getApiBaseUrl();

const advancedApi = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Define the internal filter types
interface InternalFilters {
  title?: string;
  strength?: number;
  svp?: number;
  posturals?: {
    climbing?: string;
    balancing?: string;
    stooping?: string;
    kneeling?: string;
    crouching?: string;
    crawling?: string;
  };
  manipulative?: {
    reaching?: string;
    handling?: string;
    fingering?: string;
    feeling?: string;
  };
  sensory?: {
    talking?: string;
    hearing?: string;
    tasteSmell?: string;
  };
  visual?: {
    nearAcuity?: string;
    farAcuity?: string;
    depthPerception?: string;
    accommodation?: string;
    colorVision?: string;
    fieldOfVision?: string;
  };
  environmental?: {
    weather?: string;
    extremeCold?: string;
    extremeHeat?: string;
    wet?: string;
    noise?: string;
    vibration?: string;
    atmosphericConditions?: string;
    movingMechanicalParts?: string;
    electricShock?: string;
    highPlaces?: string;
    radiation?: string;
    explosives?: string;
    toxicChemicals?: string;
    other?: string;
  };
  ged?: {
    reasoning?: string;
    math?: string;
    language?: string;
  };
  workerFunctions?: {
    data?: string;
    people?: string;
    things?: string;
  };
}

// Define the API request params type
export interface APIAdvancedSearchParams {
  Title?: string;
  Strength?: number;
  SVPNum?: number;
  ClimbingNum?: number;
  BalancingNum?: number;
  StoopingNum?: number;
  KneelingNum?: number;
  CrouchingNum?: number;
  CrawlingNum?: number;
  ReachingNum?: number;
  HandlingNum?: number;
  FingeringNum?: number;
  FeelingNum?: number;
  TalkingNum?: number;
  HearingNum?: number;
  TastingNum?: number;
  NearAcuityNum?: number;
  FarAcuityNum?: number;
  DepthNum?: number;
  AccommodationNum?: number;
  ColorVisionNum?: number;
  FieldVisionNum?: number;
  WeatherNum?: number;
  ColdNum?: number;
  HeatNum?: number;
  WetNum?: number;
  NoiseNum?: number;
  VibrationNum?: number;
  AtmosphereNum?: number;
  MovingNum?: number;
  ElectricityNum?: number;
  HeightNum?: number;
  RadiationNum?: number;
  ExplosionNum?: number;
  ToxicNum?: number;
  OtherNum?: number;
  GEDR?: number;
  GEDM?: number;
  GEDL?: number;
  WFData?: number;
  WFPeople?: number;
  WFThings?: number;
}

// Define the Zod schema for validation
export const advancedSearchParamsSchema = z.object({
  Title: z.string().optional(),
  Definition: z.string().optional(),
  StrengthNum: z.number().optional(),
  SVPNum: z.object({ value: z.number(), operator: z.enum(['eq', 'lt', 'gt', 'lte', 'gte']) }).optional(),
  ClimbingNum: z.union([z.number(), z.object({ value: z.number(), operator: z.enum(['eq', 'lt', 'gt', 'lte', 'gte']) })]).optional(),
  BalancingNum: z.union([z.number(), z.object({ value: z.number(), operator: z.enum(['eq', 'lt', 'gt', 'lte', 'gte']) })]).optional(),
  StoopingNum: z.union([z.number(), z.object({ value: z.number(), operator: z.enum(['eq', 'lt', 'gt', 'lte', 'gte']) })]).optional(),
  KneelingNum: z.union([z.number(), z.object({ value: z.number(), operator: z.enum(['eq', 'lt', 'gt', 'lte', 'gte']) })]).optional(),
  CrouchingNum: z.union([z.number(), z.object({ value: z.number(), operator: z.enum(['eq', 'lt', 'gt', 'lte', 'gte']) })]).optional(),
  CrawlingNum: z.union([z.number(), z.object({ value: z.number(), operator: z.enum(['eq', 'lt', 'gt', 'lte', 'gte']) })]).optional(),
  ReachingNum: z.union([z.number(), z.object({ value: z.number(), operator: z.enum(['eq', 'lt', 'gt', 'lte', 'gte']) })]).optional(),
  HandlingNum: z.union([z.number(), z.object({ value: z.number(), operator: z.enum(['eq', 'lt', 'gt', 'lte', 'gte']) })]).optional(),
  FingeringNum: z.union([z.number(), z.object({ value: z.number(), operator: z.enum(['eq', 'lt', 'gt', 'lte', 'gte']) })]).optional(),
  FeelingNum: z.union([z.number(), z.object({ value: z.number(), operator: z.enum(['eq', 'lt', 'gt', 'lte', 'gte']) })]).optional(),
  TalkingNum: z.union([z.number(), z.object({ value: z.number(), operator: z.enum(['eq', 'lt', 'gt', 'lte', 'gte']) })]).optional(),
  HearingNum: z.union([z.number(), z.object({ value: z.number(), operator: z.enum(['eq', 'lt', 'gt', 'lte', 'gte']) })]).optional(),
  TastingNum: z.union([z.number(), z.object({ value: z.number(), operator: z.enum(['eq', 'lt', 'gt', 'lte', 'gte']) })]).optional(),
  NearAcuityNum: z.union([z.number(), z.object({ value: z.number(), operator: z.enum(['eq', 'lt', 'gt', 'lte', 'gte']) })]).optional(),
  FarAcuityNum: z.union([z.number(), z.object({ value: z.number(), operator: z.enum(['eq', 'lt', 'gt', 'lte', 'gte']) })]).optional(),
  DepthNum: z.union([z.number(), z.object({ value: z.number(), operator: z.enum(['eq', 'lt', 'gt', 'lte', 'gte']) })]).optional(),
  AccommodationNum: z.union([z.number(), z.object({ value: z.number(), operator: z.enum(['eq', 'lt', 'gt', 'lte', 'gte']) })]).optional(),
  ColorVisionNum: z.union([z.number(), z.object({ value: z.number(), operator: z.enum(['eq', 'lt', 'gt', 'lte', 'gte']) })]).optional(),
  FieldVisionNum: z.union([z.number(), z.object({ value: z.number(), operator: z.enum(['eq', 'lt', 'gt', 'lte', 'gte']) })]).optional(),
  WeatherNum: z.union([z.number(), z.object({ value: z.number(), operator: z.enum(['eq', 'lt', 'gt', 'lte', 'gte']) })]).optional(),
  ColdNum: z.union([z.number(), z.object({ value: z.number(), operator: z.enum(['eq', 'lt', 'gt', 'lte', 'gte']) })]).optional(),
  HeatNum: z.union([z.number(), z.object({ value: z.number(), operator: z.enum(['eq', 'lt', 'gt', 'lte', 'gte']) })]).optional(),
  WetNum: z.union([z.number(), z.object({ value: z.number(), operator: z.enum(['eq', 'lt', 'gt', 'lte', 'gte']) })]).optional(),
  NoiseNum: z.union([z.number(), z.object({ value: z.number(), operator: z.enum(['eq', 'lt', 'gt', 'lte', 'gte']) })]).optional(),
  VibrationNum: z.union([z.number(), z.object({ value: z.number(), operator: z.enum(['eq', 'lt', 'gt', 'lte', 'gte']) })]).optional(),
  AtmosphereNum: z.union([z.number(), z.object({ value: z.number(), operator: z.enum(['eq', 'lt', 'gt', 'lte', 'gte']) })]).optional(),
  MovingNum: z.union([z.number(), z.object({ value: z.number(), operator: z.enum(['eq', 'lt', 'gt', 'lte', 'gte']) })]).optional(),
  ElectricityNum: z.union([z.number(), z.object({ value: z.number(), operator: z.enum(['eq', 'lt', 'gt', 'lte', 'gte']) })]).optional(),
  HeightNum: z.union([z.number(), z.object({ value: z.number(), operator: z.enum(['eq', 'lt', 'gt', 'lte', 'gte']) })]).optional(),
  RadiationNum: z.union([z.number(), z.object({ value: z.number(), operator: z.enum(['eq', 'lt', 'gt', 'lte', 'gte']) })]).optional(),
  ExplosionNum: z.union([z.number(), z.object({ value: z.number(), operator: z.enum(['eq', 'lt', 'gt', 'lte', 'gte']) })]).optional(),
  ToxicNum: z.union([z.number(), z.object({ value: z.number(), operator: z.enum(['eq', 'lt', 'gt', 'lte', 'gte']) })]).optional(),
  OtherNum: z.union([z.number(), z.object({ value: z.number(), operator: z.enum(['eq', 'lt', 'gt', 'lte', 'gte']) })]).optional(),
  GEDR: z.union([z.number(), z.object({ value: z.number(), operator: z.enum(['eq', 'lt', 'gt', 'lte', 'gte']) })]).optional(),
  GEDM: z.union([z.number(), z.object({ value: z.number(), operator: z.enum(['eq', 'lt', 'gt', 'lte', 'gte']) })]).optional(),
  GEDL: z.union([z.number(), z.object({ value: z.number(), operator: z.enum(['eq', 'lt', 'gt', 'lte', 'gte']) })]).optional(),
  WFData: z.union([z.number(), z.object({ value: z.number(), operator: z.enum(['eq', 'lt', 'gt', 'lte', 'gte']) })]).optional(),
  WFPeople: z.union([z.number(), z.object({ value: z.number(), operator: z.enum(['eq', 'lt', 'gt', 'lte', 'gte']) })]).optional(),
  WFThings: z.union([z.number(), z.object({ value: z.number(), operator: z.enum(['eq', 'lt', 'gt', 'lte', 'gte']) })]).optional()
});

// Use the schema to derive the type
export type AdvancedSearchParams = z.infer<typeof advancedSearchParamsSchema>;

export interface SearchQueryParams {
  limit: number;
  offset: number;
  sort_field?: string;
  sort_order?: 'asc' | 'desc';
}

export interface SearchResponse {
  results: JobData[];
  total_count: number;
  limit: number;
  offset: number;
}

interface APIQueryParams {
  [key: string]: string | number | undefined;
}

// Create a cache instance
const searchCache = new Map<string, SearchResponse>();

// Update the API response type to match actual data
interface APIJobData {
  Title: string;
  Code: string;
  SVPNum: number;
  // ... other fields
}

// Update the API call to handle comparison operators separately
export const advancedSearchJobs = debounce(async (
  searchParams: AdvancedSearchParams,
  queryParams: SearchQueryParams
): Promise<SearchResponse> => {
  console.group('🔍 Advanced Search API Call');
  console.log('Search Params:', searchParams);
  console.log('Query Params:', queryParams);

  try {
    const apiQueryParams: APIQueryParams = {
      limit: queryParams.limit,
      offset: queryParams.offset,
      sort_field: queryParams.sort_field || 'Title',
      sort_order: queryParams.sort_order || 'asc'
    };

    const validatedParams: AdvancedSearchParams = advancedSearchParamsSchema.parse(searchParams);

    const { data } = await advancedApi.post('/v2/advanced-search', 
      validatedParams,
      { params: apiQueryParams }
    );

    console.log('📥 Advanced Search Raw Response:', data);

    const validatedResults = z.array(jobDataSchema).parse(data.results) as APIJobData[];
    const transformedResults = validatedResults.map(mapAPIJobDataToJobData);

    console.log('✅ Advanced Search Success');
    console.groupEnd();
    
    const response = {
      results: transformedResults,
      total_count: data.total_count || 0,
      limit: data.limit,
      offset: data.offset
    };

    searchCache.set(JSON.stringify({ searchParams, queryParams }), response);
    
    return response;
  } catch (error) {
    console.error('❌ Advanced Search Error:', error);
    console.groupEnd();
    return handleAPIError(error);
  }
}, 300);

// Helper function to convert UI frequency values to DB numbers
export const frequencyToNumber = (freq: string | undefined): number | undefined => {
  if (!freq) return undefined;
  const map: Record<string, number> = {
    'N': 1, // Not Present
    'O': 2, // Occasionally
    'F': 3, // Frequently
    'C': 4  // Constantly
  };
  return map[freq];
};

// Helper function to convert UI strength values to DB values
export const strengthToAPIValue = (strength: string | undefined): string | undefined => {
  if (!strength) return undefined;
  const map: Record<string, string> = {
    'S': 'Sedentary',
    'L': 'Light',
    'M': 'Medium',
    'H': 'Heavy',
    'V': 'Very Heavy'
  };
  return map[strength] || strength;
};

// Helper function to convert noise levels
export const noiseToNumber = (level: string | undefined): number | undefined => {
  if (!level) return undefined;
  const map: Record<string, number> = {
    'VQ': 1, // Very Quiet
    'Q': 2,  // Quiet
    'M': 3,  // Moderate
    'L': 4,  // Loud
    'VL': 5  // Very Loud
  };
  return map[level];
};

// Helper function to prepare search parameters
export const prepareAdvancedSearchParams = (filters: InternalFilters): AdvancedSearchParams => {
  const params: AdvancedSearchParams = {};

  // Title filter - only add if non-empty string
  if (filters.title?.trim()) {
    params.Title = filters.title.trim();
  }

  // Postural activities - only add if frequency is specified
  if (filters.posturals) {
    Object.entries(filters.posturals).forEach(([key, value]) => {
      if (value && value !== 'ANY') {
        const numValue = frequencyToNumber(value);
        if (numValue !== undefined) {
          switch (key) {
            case 'climbing': params.ClimbingNum = numValue; break;
            case 'balancing': params.BalancingNum = numValue; break;
            case 'stooping': params.StoopingNum = numValue; break;
            case 'kneeling': params.KneelingNum = numValue; break;
            case 'crouching': params.CrouchingNum = numValue; break;
            case 'crawling': params.CrawlingNum = numValue; break;
          }
        }
      }
    });
  }

  // Manipulative activities
  if (filters.manipulative) {
    Object.entries(filters.manipulative).forEach(([key, value]) => {
      if (value && value !== 'ANY') {
        const numValue = frequencyToNumber(value);
        if (numValue !== undefined) {
          switch (key) {
            case 'reaching': params.ReachingNum = numValue; break;
            case 'handling': params.HandlingNum = numValue; break;
            case 'fingering': params.FingeringNum = numValue; break;
            case 'feeling': params.FeelingNum = numValue; break;
          }
        }
      }
    });
  }

  // Sensory activities
  if (filters.sensory) {
    Object.entries(filters.sensory).forEach(([key, value]) => {
      if (value && value !== 'ANY') {
        const numValue = frequencyToNumber(value);
        if (numValue !== undefined) {
          switch (key) {
            case 'talking': params.TalkingNum = numValue; break;
            case 'hearing': params.HearingNum = numValue; break;
            case 'tasteSmell': params.TastingNum = numValue; break;
          }
        }
      }
    });
  }

  // Visual activities
  if (filters.visual) {
    Object.entries(filters.visual).forEach(([key, value]) => {
      if (value && value !== 'ANY') {
        const numValue = frequencyToNumber(value);
        if (numValue !== undefined) {
          switch (key) {
            case 'nearAcuity': params.NearAcuityNum = numValue; break;
            case 'farAcuity': params.FarAcuityNum = numValue; break;
            case 'depthPerception': params.DepthNum = numValue; break;
            case 'accommodation': params.AccommodationNum = numValue; break;
            case 'colorVision': params.ColorVisionNum = numValue; break;
            case 'fieldOfVision': params.FieldVisionNum = numValue; break;
          }
        }
      }
    });
  }

  // Environmental conditions
  if (filters.environmental) {
    Object.entries(filters.environmental).forEach(([key, value]) => {
      if (value && value !== 'ANY') {
        const numValue = key === 'noise' ? 
          noiseToNumber(value) : 
          frequencyToNumber(value);
        
        if (numValue !== undefined) {
          switch (key) {
            case 'weather': params.WeatherNum = numValue; break;
            case 'extremeCold': params.ColdNum = numValue; break;
            case 'extremeHeat': params.HeatNum = numValue; break;
            case 'wet': params.WetNum = numValue; break;
            case 'noise': params.NoiseNum = numValue; break;
            case 'vibration': params.VibrationNum = numValue; break;
            case 'atmosphericConditions': params.AtmosphereNum = numValue; break;
            case 'movingMechanicalParts': params.MovingNum = numValue; break;
            case 'electricShock': params.ElectricityNum = numValue; break;
            case 'highPlaces': params.HeightNum = numValue; break;
            case 'radiation': params.RadiationNum = numValue; break;
            case 'explosives': params.ExplosionNum = numValue; break;
            case 'toxicChemicals': params.ToxicNum = numValue; break;
            case 'other': params.OtherNum = numValue; break;
          }
        }
      }
    });
  }

  // GED Requirements
  if (filters.ged) {
    Object.entries(filters.ged).forEach(([key, value]) => {
      if (value && value !== 'ANY') {
        const numValue = parseInt(value, 10);
        if (!isNaN(numValue)) {
          switch (key) {
            case 'reasoning': params.GEDR = numValue; break;
            case 'math': params.GEDM = numValue; break;
            case 'language': params.GEDL = numValue; break;
          }
        }
      }
    });
  }

  // Worker Functions
  if (filters.workerFunctions) {
    Object.entries(filters.workerFunctions).forEach(([key, value]) => {
      if (value && value !== 'ANY') {
        const numValue = parseInt(value, 10);
        if (!isNaN(numValue)) {
          switch (key) {
            case 'data': params.WFData = numValue; break;
            case 'people': params.WFPeople = numValue; break;
            case 'things': params.WFThings = numValue; break;
          }
        }
      }
    });
  }

  console.log('🔍 Prepared search params:', params);
  return params;
};

export default {
  advancedSearchJobs,
  prepareAdvancedSearchParams,
  frequencyToNumber,
  strengthToAPIValue,
  noiseToNumber
};