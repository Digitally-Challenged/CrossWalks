import axios from 'axios';
import { z } from 'zod';
import type { SearchParams, SearchResponse, JobData, APIJobData } from '../types/job';
import { jobDataSchema } from './schemas';
import { mapAPIJobDataToJobData } from './mappers';
import { handleAPIError } from './errors';

const API_BASE_URL = 'https://occuguru-production.up.railway.app';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export async function searchJobs(params: SearchParams): Promise<SearchResponse> {
  try {
    const { data } = await api.get<{ status: string; results: APIJobData[]; total_count: number }>('/search', {
      params: {
        ...params,
        search_mode: 'contains', // Always use contains mode
        search_term: params.search_term,
        title_search: params.search_column === 'Title' ? params.search_term : undefined,
        code_search: params.search_column === 'Code' ? params.search_term : undefined,
      },
    });

    // Validate the response data
    const validatedResults = z.array(jobDataSchema).parse(data.results);

    // Transform the API data to our frontend format
    const transformedResults = validatedResults.map(mapAPIJobDataToJobData);

    return {
      results: transformedResults,
      total_count: data.total_count || 0
    };
  } catch (error) {
    return handleAPIError(error);
  }
}