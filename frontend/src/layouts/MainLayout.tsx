import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Container,
  Box,
} from "@mui/material";
import { Link, Outlet } from "react-router-dom";
import SchoolIcon from "@mui/icons-material/School";

const MainLayout = () => (
  <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <SchoolIcon sx={{ mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component={Link}
            to="/"
            sx={{
              mr: 2,
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".1rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            CourseFinder
          </Typography>
          <Box>
            {/* <Button color="inherit" component={Link} to="/">
              Courses
            </Button> */}
            <Button color="inherit" component={Link} to="/admin">
              Admin Panel
            </Button>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
    <Container component="main" sx={{ mt: 4, mb: 4, flexGrow: 1 }}>
      <Outlet /> {/* Child pages will render here */}
    </Container>
    <Box
      component="footer"
      sx={{ p: 2, backgroundColor: "#f5f5f5", textAlign: "center" }}
    >
      <Typography variant="body2" color="text.secondary">
        © {new Date().getFullYear()} University Course Aggregator
      </Typography>
    </Box>
  </Box>
);

export default MainLayout;
