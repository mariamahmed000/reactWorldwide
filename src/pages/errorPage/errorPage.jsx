import { useTheme } from "@emotion/react";
import "./style.css";
import { useNavigate } from "react-router-dom";
import { Box } from "@mui/material";

const ErrorPage = () => {
  const theme = useTheme();

  const navigate = useNavigate();
  return (
    <Box backgroundColor={theme.palette.background.default}>
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/3.3.7/css/bootstrap.min.css"
      />
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css?family=Arvo"
      />

      <section className="page_404">
        <div className="container">
          <div className="row">
            <div className="col-sm-12 ">
              <div className="col-sm-10 col-sm-offset-1  text-center">
                <div className="four_zero_four_bg">
                  <h1 className="text-center ">404</h1>
                </div>

                <div className="contant_box_404">
                  <h3 className="h2">Look like you&apos;re lost</h3>

                  <p>the page you are looking for not avaible!</p>

                  <a className="link_404" onClick={() => navigate("/home")}>
                    Go to Home
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Box>
  );
};

export default ErrorPage;
