import axios from 'axios';
import { JobData, SearchParams } from '../types/job';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export async function searchJobs(params: SearchParams): Promise<JobData[]> {
  try {
    const response = await axios.get(`${API_BASE_URL}/search`, { params });
    return response.data.results || [];
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || 'Failed to search jobs');
    }
    throw new Error('An unexpected error occurred while searching jobs');
  }
}

export async function getJobByCode(code: string): Promise<JobData | null> {
  try {
    const response = await axios.get(`${API_BASE_URL}/job/${code}`);
    return response.data.record || null;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || 'Failed to fetch job by code');
    }
    throw new Error('An unexpected error occurred while fetching job');
  }
}

export async function getFirstNRecords(
  limit: number,
  sortField: string,
  sortOrder: 'asc' | 'desc'
): Promise<JobData[]> {
  try {
    const response = await axios.get(`${API_BASE_URL}/jobs`, {
      params: { limit, sort_field: sortField, sort_order: sortOrder }
    });
    return response.data.results || [];
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || 'Failed to fetch initial records');
    }
    throw new Error('An unexpected error occurred while fetching records');
  }
}