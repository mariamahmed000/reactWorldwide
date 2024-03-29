// import { Box } from "@mui/material";
// import AdvertWidget from "../../components/AdvertWidget";
// import FriendList from "../../components/FriendList";

// const HomePage = () => {
//   return (
//     <div>
//       <Box flexBasis="26%" width="25%">
//         <AdvertWidget />
//         <Box m="2rem 0" />
//         <FriendList />
//       </Box>
//     </div>
//   );
// };

// export default HomePage;

import { Box, useMediaQuery } from "@mui/material";
import { useSelector } from "react-redux";
// import PostsWidget from "scenes/widgets/PostsWidget";
import AdvertWidget from "../../components/AdvertWidget";
import User from "../../components/User";
import NewPost from "../../components/NewPost";
import ComponentWrapper from "../../components/utilities/ComponentWrapper";
import FriendList from "../../components/FriendList";

const HomePage = () => {
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");
  const userData = useSelector((state) => state.auth.user);
  console.log(userData);
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
          {/* <User userId={"userId"} picturePath={"userImage"} /> */}
        </Box>
        <Box
          flexBasis={isNonMobileScreens ? "42%" : undefined}
          mt={isNonMobileScreens ? undefined : "2rem"}
        >
          <NewPost picturePath={userImage} />
          {/* <NewPost picturePath={"userImage"} /> */}
          {/* <PostsWidget userId={userId} /> */}
          <ComponentWrapper width={5} height={5} />
        </Box>
        {isNonMobileScreens && (
          <Box flexBasis="26%">
            <AdvertWidget />
            <Box m="2rem 0" />
            {/* <FriendList userId={"userImage"} /> */}
            <FriendList userId={_id} />
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default HomePage;
