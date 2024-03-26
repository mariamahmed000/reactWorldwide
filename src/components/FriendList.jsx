import { Box, Typography, useTheme } from "@mui/material";
import ComponentWrapper from "./utilities/ComponentWrapper";
import Friend from "./Friend";

const FriendList = () => {
  const { palette } = useTheme();

  return (
    <ComponentWrapper>
      <Typography
        color={palette.neutral.dark}
        variant="h5"
        fontWeight="500"
        sx={{ mb: "1.5rem" }}
      >
        Friend List
      </Typography>
      <Box display="flex" flexDirection="column" gap="1.5rem">
        <Friend />
      </Box>
    </ComponentWrapper>
  );
};

export default FriendList;
