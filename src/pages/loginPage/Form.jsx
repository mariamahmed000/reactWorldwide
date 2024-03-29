import { useState } from "react";
import {
  Box,
  Button,
  TextField,
  useMediaQuery,
  Typography,
  useTheme,
  Alert,
} from "@mui/material";
// import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { Formik } from "formik";
import * as yup from "yup";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Snackbar from "@mui/material/Snackbar";
// import { useDispatch } from "react-redux";
import { setLogin, setUrl } from "../../redux/authSlice";

// import { setLogin } from "state";
// import Dropzone from "react-dropzone";
// import FlexBetween from "../../components/FlexBetween";

const registerSchema = yup.object().shape({
  firstName: yup.string().required("required"),
  lastName: yup.string().required("required"),
  email: yup.string().email("invalid email").required("required"),
  password: yup.string().required("required"),
  location: yup.string().required("required"),
  occupation: yup.string().required("required"),
  userImage: yup.string(),
});

const loginSchema = yup.object().shape({
  email: yup.string().email("invalid email").required("required"),
  password: yup.string().required("required"),
});

const initialValuesRegister = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  location: "",
  occupation: "",
  userImage: "",
};

const initialValuesLogin = {
  email: "",
  password: "",
};

const Form = () => {
  // const { setLogin } = useSelector((state) => state.auth);

  const [pageType, setPageType] = useState("login");
  const { palette } = useTheme();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const isLogin = pageType === "login";
  const isRegister = pageType === "register";

  // register function
  const register = async (values, onSubmitProps) => {
    const savedUserResponse = await fetch("http://localhost:7005/register", {
      method: "POST",
      // body: formData,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    });
    const savedUser = await savedUserResponse.json();
    onSubmitProps.resetForm();

    if (savedUser) {
      setPageType("login");
      dispatch(setLogin(savedUser));
      navigate("/home");
    }
  };

  // login with google
  const sendGoogleAuth = async (values) => {
    const data = {
      firstName: values.given_name,
      lastName: values.family_name,
      email: values.email,
      password: values.jti,
      userImage: values.picture,
      location: "",
      isGoogle: true,
    };
    const savedUserResponse = await fetch("http://localhost:7005/register", {
      method: "POST",
      // body: formData,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    const savedUser = await savedUserResponse.json();

    if (savedUser) {
      setPageType("login");
      dispatch(setLogin(savedUser));
      navigate("/home");
    }
  };

  //  login function

  const login = async (values, onSubmitProps) => {
    try {
      const loggedInResponse = await fetch("http://localhost:7005/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      if (!loggedInResponse.ok) {
        handleOpen();
        throw new Error("Failed to log in");
      }
      const loggedIn = await loggedInResponse.json();
      dispatch(setLogin(loggedIn));
      onSubmitProps.resetForm();
      console.log(loggedIn);
      // if (loggedIn) {
      //   dispatch(
      //     setLogin({
      //       user: loggedIn.user,
      //       token: loggedIn.token,
      //     })
      //   );
      // }
      // dispatch(setUrl("/home"))

      navigate("/home");
    } catch (error) {
      console.log(error);
    }
    //     const loggedInResponse = await fetch("http://localhost:7005/login", {
    //       method: "POST",
    //       headers: { "Content-Type": "application/json" },
    //       body: JSON.stringify(values),
    //     });
    //     const loggedIn = await loggedInResponse.json();
    //     dispatch(setLogin(loggedIn));
    //     onSubmitProps.resetForm();
    //     // console.log(loggedIn);
    //     // if (loggedIn) {
    //     //   dispatch(
    //     //     setLogin({
    //     //       user: loggedIn.user,
    //     //       token: loggedIn.token,
    //     //     })
    //     //   );
    //     // }
    //     dispatch(setUrl("/home"))
    //     navigate("/home");
  };

  const handleFormSubmit = async (values, onSubmitProps) => {
    if (isLogin) await login(values, onSubmitProps);
    if (isRegister) await register(values, onSubmitProps);
  };

  // Error toast message
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  return (
    <Formik
      onSubmit={handleFormSubmit}
      initialValues={isLogin ? initialValuesLogin : initialValuesRegister}
      validationSchema={isLogin ? loginSchema : registerSchema}
    >
      {({
        values,
        errors,
        touched,
        handleBlur,
        handleChange,
        handleSubmit,
        resetForm,
      }) => (
        <form
          onSubmit={handleSubmit}
          className="all"
          style={{ width: "60%", margin: "0 auto" }}
        >
          <Box
            display="grid"
            gap="30px"
            gridTemplateColumns="repeat(2, minmax(0, 1fr))"
            sx={{
              margin: "auto",
              "& > div": { gridColumn: isNonMobile ? undefined : "span 2" },
            }}
          >
            {isRegister && (
              <>
                <TextField
                  label="First Name"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.firstName}
                  name="firstName"
                  error={
                    Boolean(touched.firstName) && Boolean(errors.firstName)
                  }
                  helperText={touched.firstName && errors.firstName}
                  sx={{ gridColumn: "span 1" }}
                />
                <TextField
                  label="Last Name"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.lastName}
                  name="lastName"
                  error={Boolean(touched.lastName) && Boolean(errors.lastName)}
                  helperText={touched.lastName && errors.lastName}
                  sx={{ gridColumn: "span 1" }}
                />
                <TextField
                  label="Location"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.location}
                  name="location"
                  error={Boolean(touched.location) && Boolean(errors.location)}
                  helperText={touched.location && errors.location}
                  sx={{ gridColumn: "span 2" }}
                />
                <TextField
                  label="Occupation"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.occupation}
                  name="occupation"
                  error={
                    Boolean(touched.occupation) && Boolean(errors.occupation)
                  }
                  helperText={touched.occupation && errors.occupation}
                  sx={{ gridColumn: "span 2" }}
                />
                <TextField
                  label="userImage"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.userImage}
                  name="userImage"
                  error={
                    Boolean(touched.userImage) && Boolean(errors.userImage)
                  }
                  helperText={touched.userImage && errors.userImage}
                  sx={{ gridColumn: "span 2" }}
                />
              </>
            )}
            <TextField
              label="Email"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.email}
              name="email"
              error={Boolean(touched.email) && Boolean(errors.email)}
              helperText={touched.email && errors.email}
              sx={{ gridColumn: "span 2" }}
            />
            <TextField
              label="Password"
              type="password"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.password}
              name="password"
              error={Boolean(touched.password) && Boolean(errors.password)}
              helperText={touched.password && errors.password}
              sx={{ gridColumn: "span 2" }}
            />
          </Box>
          {/* login with google */}

          {/* BUTTONS */}
          <Box>
            <Button
              fullWidth
              type="submit"
              sx={{
                m: "2rem 0",
                p: "1rem",
                backgroundColor: palette.primary.main,
                color: palette.background.alt,
                "&:hover": {
                  color: palette.primary.light,
                  backgroundColor: palette.primary.dark,
                },
              }}
            >
              {isLogin ? "LOGIN" : "REGISTER"}
            </Button>
            {isLogin && (
              <Box
                sx={{
                  justifyContent: "center",
                  alignItems: "center",
                  display: "flex",
                  margin: "2rem ",
                }}
              >
                <GoogleLogin
                  onSuccess={(credentialResponse) => {
                    const decoded = jwtDecode(credentialResponse?.credential);

                    localStorage.setItem("user", JSON.stringify(decoded));
                    // add auth

                    sendGoogleAuth(decoded);
                    navigate("/");
                    console.log(decoded);
                  }}
                  onError={() => {
                    console.log("Login Failed");
                  }}
                />
              </Box>
            )}
            <Typography
              onClick={() => {
                setPageType(isLogin ? "register" : "login");
                resetForm();
              }}
              sx={{
                textDecoration: "underline",
                color: palette.primary.main,
                "&:hover": {
                  cursor: "pointer",
                  color: palette.primary.dark,
                },
              }}
            >
              {isLogin
                ? "Don't have an account? Sign Up here."
                : "Already have an account? Login here."}
            </Typography>
          </Box>
          <div>
            <Snackbar open={open} autoHideDuration={5000} onClose={handleClose}>
              <Alert
                onClose={handleClose}
                severity="error"
                variant="filled"
                sx={{ width: "100%" }}
              >
                Invalid email or password!
              </Alert>
            </Snackbar>
          </div>
        </form>
      )}
    </Formik>
  );
};

export default Form;
