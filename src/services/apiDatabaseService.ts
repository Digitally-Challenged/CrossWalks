import axios from 'axios';
import { JobData, SearchParams } from '../types/job';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export async function searchJobs(params: SearchParams): Promise<JobData[]> {
  console.log('🔍 Search Request:', {
    endpoint: `${API_BASE_URL}/search`,
    params
  });

  try {
    const response = await axios.get(`${API_BASE_URL}/search`, { params });
    console.log('✅ Search Response:', {
      status: response.status,
      resultCount: response.data.results?.length || 0
    });
    return response.data.results || [];
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('❌ Search Error:', {
        status: error.response?.status,
        statusText: error.response?.statusText,
        message: error.response?.data?.message || 'Failed to search jobs'
      });
      throw new Error(error.response?.data?.message || 'Failed to search jobs');
    }
    console.error('❌ Unexpected Search Error:', error);
    throw new Error('An unexpected error occurred while searching jobs');
  }
}

export async function getJobByCode(code: string): Promise<JobData | null> {
  console.log('🎯 Get Job Request:', {
    endpoint: `${API_BASE_URL}/job/${code}`,
    code
  });

  try {
    const response = await axios.get(`${API_BASE_URL}/job/${code}`);
    console.log('✅ Get Job Response:', {
      status: response.status,
      hasRecord: !!response.data.record
    });
    return response.data.record || null;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('❌ Get Job Error:', {
        code,
        status: error.response?.status,
        statusText: error.response?.statusText,
        message: error.response?.data?.message || 'Failed to fetch job by code'
      });
      throw new Error(error.response?.data?.message || 'Failed to fetch job by code');
    }
    console.error('❌ Unexpected Get Job Error:', error);
    throw new Error('An unexpected error occurred while fetching job');
  }
}

export async function getFirstNRecords(
  limit: number,
  sortField: string,
  sortOrder: 'asc' | 'desc'
): Promise<JobData[]> {
  console.log('📋 Get Records Request:', {
    endpoint: `${API_BASE_URL}/jobs`,
    params: { limit, sortField, sortOrder }
  });

  try {
    const response = await axios.get(`${API_BASE_URL}/jobs`, {
      params: { limit, sort_field: sortField, sort_order: sortOrder }
    });
    console.log('✅ Get Records Response:', {
      status: response.status,
      resultCount: response.data.results?.length || 0
    });
    return response.data.results || [];
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('❌ Get Records Error:', {
        status: error.response?.status,
        statusText: error.response?.statusText,
        message: error.response?.data?.message || 'Failed to fetch initial records'
      });
      throw new Error(error.response?.data?.message || 'Failed to fetch initial records');
    }
    console.error('❌ Unexpected Get Records Error:', error);
    throw new Error('An unexpected error occurred while fetching records');
  }
}