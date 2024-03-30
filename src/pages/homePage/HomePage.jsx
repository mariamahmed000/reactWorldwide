import { Box, useMediaQuery } from "@mui/material";
import { useSelector } from "react-redux";
import AdvertWidget from "../../components/AdvertWidget";
import User from "../../components/User";
import NewPost from "../../components/NewPost";
import ComponentWrapper from "../../components/utilities/ComponentWrapper";
import FriendList from "../../components/FriendList";
import PostsWidget from "../../components/PostsWidget/PostsWidget";

const HomePage = () => {
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");

  const { _id, userImage } = useSelector((state) => state.auth.user);

  return (
    <Box>
      <Box
        width="100%"
        padding="2rem 6%"
        display={isNonMobileScreens ? "flex" : "block"}
        gap="0.5rem"
        justifyContent="space-between"
      >
        <Box flexBasis={isNonMobileScreens ? "26%" : undefined}>
          <User userId={_id} picturePath={userImage} />
        </Box>
        <Box
          flexBasis={isNonMobileScreens ? "42%" : undefined}
          mt={isNonMobileScreens ? undefined : "2rem"}
        >
          <NewPost picturePath={userImage} />
          {isNonMobileScreens && <Box m="2rem 0" />}
          <PostsWidget userId={_id} />
        </Box>
        {isNonMobileScreens && (
          <Box flexBasis="26%">
            <AdvertWidget />
            <Box m="2rem 0" />
            <FriendList userId={_id} />
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default HomePage;
