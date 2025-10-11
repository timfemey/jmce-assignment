import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import MainLayout from "./layouts/MainLayout";
import CourseDetailsPage from "./pages/CourseDetailsPage";
import AdminDashboardPage from "./pages/AdminPage";
import AddCoursePage from "./pages/AddCoursePage";
import EditCoursePage from "./pages/EditCoursePage";
import { SnackbarProvider } from "notistack";
import CourseDashboardPage from "./pages/CourseDashboardPage";
import ComparePage from "./pages/ComparePage";

const theme = createTheme({
  palette: {
    primary: { main: "#1976d2" },
    background: { default: "#f4f6f8" },
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          transition: "transform 0.15s ease-in-out",
          "&:hover": { transform: "scale(1.02)" },
        },
      },
    },
  },
});

function App() {
  return (
    <>
      <SnackbarProvider />
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Router>
          <Routes>
            <Route element={<MainLayout />}>
              <Route path="/" element={<CourseDashboardPage />} />
              <Route path="/courses/:id" element={<CourseDetailsPage />} />
              <Route path="/admin" element={<AdminDashboardPage />} />
              <Route path="/admin/add" element={<AddCoursePage />} />
              <Route path="/admin/edit/:id" element={<EditCoursePage />} />
              <Route path="/compare" element={<ComparePage />} />
            </Route>
          </Routes>
        </Router>
      </ThemeProvider>
    </>
  );
}

export default App;
