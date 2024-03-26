import { Box, Typography, useTheme, useMediaQuery } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Form from "./Form";
import logo from "../../assets/logo.jpg";

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
          p=".3rem 6%"
          textAlign="center"
        >
          <Typography fontWeight="bold" fontSize="32px" color="primary">
            <img
              src={logo}
              alt="login"
              width="150px"
              height="auto"
              onClick={() => navigate("/")}
              style={{ cursor: "pointer" }}
            />
          </Typography>
        </Box>
        <Box
          width={isNonMobileScreens ? "50%" : "93%"}
          p=".2rem"
          m=".5rem auto"
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
