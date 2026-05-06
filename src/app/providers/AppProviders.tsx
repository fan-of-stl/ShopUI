import { SnackbarProvider } from '../../shared/providers/SnackbarProviders';
import { AuthProvider } from './AuthProvider';
import { ErrorBoundaryProvider } from './ErrorBoundaryProvider';
import { QueryProvider } from './QueryProvider';
import { RouterProvider } from './RouterProvider';
import { ThemeProvider } from './ThemeProvider';
import { GoogleOAuthProvider } from '@react-oauth/google';
const env = import.meta.env;

export const AppProviders = ()=> {
    return (
        <ErrorBoundaryProvider>
            <QueryProvider>
                <ThemeProvider>
                    <AuthProvider>
                        <GoogleOAuthProvider clientId={env.VITE_GOOGLE_CLIENT_ID}>
                            <SnackbarProvider>
                                <RouterProvider />
                            </SnackbarProvider>
                        </GoogleOAuthProvider>
                    </AuthProvider>
                </ThemeProvider>
            </QueryProvider>
        </ErrorBoundaryProvider>
    );
};