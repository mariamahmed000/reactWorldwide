import { Box } from "@mui/material";
import { styled } from "@mui/system";

const ComponentWrapper = styled(Box)(({ theme }) => ({
  padding: "1rem 1rem 0.75rem 1rem",
  backgroundColor: theme.palette.background.alt,
  borderRadius: "0.3rem",
}));

export default ComponentWrapper;
