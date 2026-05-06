import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient({
    defaultOptions:{
        queries: {
            staleTime: 1000 * 60 * 5, // 5 minutes
            retry: 1,
        },
         mutations: {
            retry: 1,
        },
    },
});

type QueryProviderProps = {
    children: React.ReactNode;
};

export const QueryProvider = ({children}: QueryProviderProps) => {
    return(
        <QueryClientProvider client={queryClient}>
            {children}
        </QueryClientProvider>
    );
};