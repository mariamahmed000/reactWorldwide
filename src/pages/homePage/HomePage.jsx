import { Box } from "@mui/material";
import AdvertWidget from "../../components/AdvertWidget";
import FriendList from "../../components/FriendList";

const HomePage = () => {
  return (
    <div>
      <Box flexBasis="26%" width="25%">
        <AdvertWidget />
        <Box m="2rem 0" />
        <FriendList />
      </Box>
    </div>
  );
};

export default HomePage;
