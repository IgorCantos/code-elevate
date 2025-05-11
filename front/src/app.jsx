import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { useScrollToTop } from 'src/hooks/use-scroll-to-top';
import Router from 'src/routes/router';
import { ThemeProvider as MuiThemeProvider } from '@mui/material/styles';
import { createTheme, CssBaseline } from '@mui/material';

library.add(fas);
const defaultTheme = createTheme();

export default function App() {
  useScrollToTop();

  return (
    <MuiThemeProvider theme={defaultTheme}>
      <CssBaseline />
      <Router />
    </MuiThemeProvider>
  );
}
