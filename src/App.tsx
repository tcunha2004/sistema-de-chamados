import { ThemeProvider } from "styled-components";
import { defaultTheme } from "./styles/themes/default";
import { GlobalStyle } from "./styles/themes/global";
import Router from "./Router";
import { BrowserRouter } from "react-router-dom";
import SupabaseProvider from "./contexts/supabaseContext";

function App() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <SupabaseProvider>
        <BrowserRouter>
          <Router />
        </BrowserRouter>
      </SupabaseProvider>
      <GlobalStyle />
    </ThemeProvider>
  );
}

export default App;
