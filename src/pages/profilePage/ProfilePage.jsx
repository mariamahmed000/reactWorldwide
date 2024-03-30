import { Box, useMediaQuery } from "@mui/material";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation, useParams } from "react-router-dom";
// import PostsWidget from "scenes/widgets/PostsWidget";
import User from "../../components/User";
import FriendList from "../../components/FriendList";
import axios from "axios";
import OnePostWidget from "../../components/OnePostWidget/OnePostWidget";
import AdvertWidget from "../../components/AdvertWidget";

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const { userId } = useParams();
  const token = useSelector((state) => state.auth.token);
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");
  const [profilePosts, setProfilePosts] = useState([]);
  const { pathname } = useLocation();

  const getUser = async () => {
    const response = await fetch(`http://localhost:7005/user/${userId}`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await response.json();
    setUser(data);
    getUserPosts();
  };

  const getUserPosts = async () => {
    const response = await axios.get(`http://localhost:7005/post/${userId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    setProfilePosts(response.data.posts);
  };

  useEffect(() => {
    getUser();
    // getUserPosts();
  }, [pathname]); // eslint-disable-line react-hooks/exhaustive-deps

  if (!user) return null;

  return (
    <Box>
      <Box width="100%" padding="2rem 6%">
        <Box>
          <User userId={userId} picturePath={user.data.userImage} />
          <Box m="2rem 0" />
        </Box>
        <Box
          display="flex"
          flexDirection={isNonMobileScreens ? "row" : "column"}
          gap="2rem"
        >
          <Box sx={isNonMobileScreens && { width: "40rem" }}>
            <FriendList userId={userId} />
          </Box>
          <Box>
            {profilePosts?.map(
              ({ _id, userId, postImage, likes, comments, description }) => (
                <OnePostWidget
                  key={_id}
                  postId={_id}
                  postUserId={userId?._id}
                  name={`${userId?.firstName} ${userId?.lastName}`}
                  description={description}
                  location={userId?.location}
                  postImage={postImage}
                  userImage={userId?.userImage}
                  likes={likes}
                  comments={comments}
                />
              )
            )}
          </Box>
          {isNonMobileScreens && (
            <Box width="40rem">
              <AdvertWidget />
            </Box>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default ProfilePage;
