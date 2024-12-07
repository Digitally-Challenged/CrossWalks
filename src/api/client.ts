import axios from 'axios';
import { z } from 'zod';
import type { JobData } from '../types/job';
import { jobDataSchema } from './schemas';
import { mapAPIJobDataToJobData } from './mappers';
import { handleAPIError } from './errors';

const API_BASE_URL = 
  (import.meta.env?.VITE_API_BASE_URL as string) || 
  (window.env?.REACT_APP_API_BASE_URL as string) || 
  'http://127.0.0.1:8002';

const BASIC_SEARCH_ENDPOINT = '/search';

// Simplified search parameters
export interface SearchParams {
  search_term: string;
  search_column: 'Title' | 'Code';
  limit?: number;
  offset?: number;
  sort_field?: string;
  sort_order?: 'asc' | 'desc';
}

export interface SearchResponse {
  results: JobData[];
  total_count: number;
}

const basicApi = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 5000,
  validateStatus: (status) => status < 500,
});

export async function searchJobs(params: SearchParams): Promise<SearchResponse> {
  console.log('🔍 Basic Search API Call:', params);
  
  try {
    const searchParams = {
      search_term: params.search_term,
      search_column: params.search_column,
      limit: params.limit || 20,
      offset: params.offset || 0,
      sort_field: params.sort_field || 'Title',
      sort_order: params.sort_order || 'asc'
    };

    const { data } = await basicApi.get(BASIC_SEARCH_ENDPOINT, { 
      params: searchParams 
    });

    console.log('📥 Basic Search Raw Response:', data);

    if (!data?.results) {
      throw new Error('Invalid response format: missing results');
    }

    // Validate and transform results
    const validatedResults = z.array(jobDataSchema).parse(data.results);
    const transformedResults = validatedResults.map(mapAPIJobDataToJobData);

    return {
      results: transformedResults,
      total_count: data.total_count || 0
    };
  } catch (error) {
    console.error('❌ Basic Search Error:', error);
    
    if (axios.isAxiosError(error)) {
      if (error.code === 'ERR_NETWORK') {
        throw new Error(`Unable to connect to server at ${API_BASE_URL}. Please check if the server is running.`);
      }
      if (error.response?.status === 404) {
        throw new Error(`Search endpoint not found at ${API_BASE_URL}${BASIC_SEARCH_ENDPOINT}`);
      }
      if (error.response?.status === 400) {
        throw new Error('Invalid search parameters provided');
      }
    }
    
    return handleAPIError(error);
  }
}

export async function checkServerHealth(): Promise<boolean> {
  try {
    await basicApi.get('/health');
    return true;
  } catch (error) {
    console.error('Health check failed:', error);
    return false;
  }
}

export default {
  searchJobs,
  checkServerHealth,
};