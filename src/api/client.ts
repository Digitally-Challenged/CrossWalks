import axios from 'axios';
import { z } from 'zod';
import type { JobData, SearchParams } from '../types/job';
import { jobDataSchema } from './schemas';
import { mapAPIJobDataToJobData } from './mappers';
import { handleAPIError } from './errors';

const API_BASE_URL = 
  (import.meta.env?.VITE_API_BASE_URL as string) || 
  (window.env?.REACT_APP_API_BASE_URL as string) || 
  'https://occuguru-production.up.railway.app';
const BASIC_SEARCH_ENDPOINT = '/search';

// Define the API response types
export interface APIJobData {
  id: number;
  title: string;
  code: string;
  strength: string;
  svp: number;
  // Add other API fields as needed
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
});

export async function searchJobs(params: SearchParams): Promise<SearchResponse> {
  console.log('🔍 Basic Search API Call:', params);
  
  try {
    const { data } = await basicApi.get<{ 
      status: string; 
      results: APIJobData[]; 
      total_count: number 
    }>(
      BASIC_SEARCH_ENDPOINT,
      {
        params: {
          ...params,
          search_mode: 'contains',
          search_term: params.search_term,
          title_search: params.search_column === 'Title' ? params.search_term : undefined,
          code_search: params.search_column === 'Code' ? params.search_term : undefined,
        },
      }
    );

    console.log('📥 Basic Search Raw Response:', data);

    const validatedResults = z.array(jobDataSchema).parse(data.results);
    const transformedResults = validatedResults.map(mapAPIJobDataToJobData);

    return {
      results: transformedResults,
      total_count: data.total_count || 0
    };
  } catch (error) {
    console.error('❌ Basic Search Error:', error);
    return handleAPIError(error);
  }
}

export default {
  searchJobs,
};