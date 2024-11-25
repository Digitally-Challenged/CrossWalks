import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { JobSearch } from './components/JobSearch';

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <JobSearch />
    </QueryClientProvider>
  );
}