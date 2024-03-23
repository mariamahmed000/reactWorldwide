import { Box, Typography, useTheme, useMediaQuery } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Form from "./Form";

const Login = () => {
  const theme = useTheme();
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
  const navigate = useNavigate();
  return (
    <div className="container">
      <Box>
        <Box
          width="100%"
          backgroundColor={theme.palette.background.alt}
          p="1rem 6%"
          textAlign="center"
        >
          <Typography
            fontWeight="bold"
            fontSize="32px"
            color="primary"
            onClick={() => navigate("/")}
            sx={{ cursor: "pointer" }}
          >
            WorldWide
          </Typography>
        </Box>

        <Box
          width={isNonMobileScreens ? "50%" : "93%"}
          p="2rem"
          m="2rem auto"
          borderRadius="1.5rem"
          backgroundColor={theme.palette.background.alt}
        >
          <Form />
        </Box>
      </Box>
    </div>
  );
};

export default Login;
