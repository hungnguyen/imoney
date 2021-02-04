import "./App.css";
import MasterPage from "./pages/MasterPage";

import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#1976d2",
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <MasterPage />
    </ThemeProvider>
  );
}

export default App;
