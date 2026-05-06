import { createTheme, ThemeProvider as MuiThemeProvider} from '@mui/material/styles';
import { purple, red } from '@mui/material/colors';

const theme = createTheme({
  palette: {
    primary: {
      // Provide a hex value directly or use an MUI color object
      main: '#f82e56', // This will use the 500 shade of red from MUI's color palette
    },
    secondary: {
      main: purple[100], // This is a hex value for a purple color
    },
  },
});

type ThemeProviderProps = {
    children: React.ReactNode;
};

export const ThemeProvider = ({children}: ThemeProviderProps) => {
  return (
    <MuiThemeProvider theme={theme}>
        {children}
    </MuiThemeProvider>
  );
}
