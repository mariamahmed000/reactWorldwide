import { Box } from "@mui/material";

import PropTypes from "prop-types";

const UserImg = ({ image, size = "50px" }) => {
  return (
    <Box width={size} height={size}>
      <img
        style={{ objectFit: "cover", borderRadius: "50%" }}
        width={size}
        height={size}
        alt="user"
        src={image || ""}
      />
    </Box>
  );
};

UserImg.propTypes = {
  image: PropTypes.string.isRequired,
  size: PropTypes.string,
};

export default UserImg;
