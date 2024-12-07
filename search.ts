import type { JobData } from './src/types/job';

export interface SearchResponse {
  results: JobData[];
  total_count: number;
}