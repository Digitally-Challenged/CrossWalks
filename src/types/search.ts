import type { JobData } from './job';

export interface SearchResponse {
  results: JobData[];
  total_count: number;
}