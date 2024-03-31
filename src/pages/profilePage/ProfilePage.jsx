import { Box, useMediaQuery } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useParams } from "react-router-dom";
// import PostsWidget from "scenes/widgets/PostsWidget";
import User from "../../components/User";
import FriendList from "../../components/FriendList";
import axios from "axios";
import OnePostWidget from "../../components/OnePostWidget/OnePostWidget";
import AdvertWidget from "../../components/AdvertWidget";
import { setPosts } from "../../redux/authSlice";

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const { userId } = useParams();
  const token = useSelector((state) => state.auth.token);
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");
  const userProfilePosts = useSelector((state) => state.auth.posts);
  const [profilePosts, setProfilePosts] = useState([]);
  const { pathname } = useLocation();
  const dispatch = useDispatch();
  const getUser = async () => {
    const response = await fetch(
      `https://node-react-project-1.onrender.com/user/${userId}`,
      {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    const data = await response.json();
    setUser(data);
  };

  const getUserPosts = async () => {
    const response = await axios.get(
      `https://node-react-project-1.onrender.com/post/${userId}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    dispatch(setPosts(response.data.posts));
  };

  useEffect(() => {
    getUser();
    getUserPosts();
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
          <Box sx={isNonMobileScreens && { width: "50rem" }}>
            {userProfilePosts?.map(
              ({
                _id,
                userId,
                postImage,
                likes,
                comments,
                description,
                createdAt,
              }) => {
                const date = new Date(createdAt);
                const formattedDate = date.toLocaleString("en-US", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                  second: "2-digit",
                });

                return (
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
                    createdAt={formattedDate}
                  />
                );
              }
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
