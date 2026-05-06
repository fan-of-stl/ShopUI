import { ErrorBoundary, type FallbackProps } from 'react-error-boundary';

function Fallback({ error}: FallbackProps) {
  return (
    <div role="alert">
      <p>Something went wrong:</p>
      <pre>{(error as Error).message}</pre>
      {/* <button onClick={resetErrorBoundary}>Try again</button> */}
    </div>
  );
}

type ErrorBoundaryProviderProps = {
    children: React.ReactNode;
};

export const ErrorBoundaryProvider = ({ children }: ErrorBoundaryProviderProps) => {  
  return (
    <ErrorBoundary FallbackComponent={Fallback}>
      {children}
    </ErrorBoundary>
  );
};
