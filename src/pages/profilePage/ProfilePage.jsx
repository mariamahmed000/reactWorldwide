import { Box, useMediaQuery } from "@mui/material";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation, useParams } from "react-router-dom";
// import PostsWidget from "scenes/widgets/PostsWidget";
import User from "../../components/User";
import FriendList from "../../components/FriendList";
import ComponentWrapper from "../../components/utilities/ComponentWrapper";
import axios from "axios";
import OnePostWidget from "../../components/OnePostWidget/OnePostWidget";

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const { userId } = useParams();
  const token = useSelector((state) => state.auth.token);
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");
  const [profilePosts, setProfilePosts] = useState([]);
  const { pathname } = useLocation();

  // console.log("USERPIC", user);

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
    console.log("pleaseeeeeeeeeee", response);
    console.log("hii",response.data.posts);
    setProfilePosts(response.data.posts);
    console.log("letssssss",profilePosts);
  };

  useEffect(() => {
    getUser();
    // getUserPosts();
  }, [pathname]); // eslint-disable-line react-hooks/exhaustive-deps

  if (!user) return null;

  return (
    <Box>
      <Box width="100%" padding="2rem 6%" gap="2rem" justifyContent="center">
        <Box>
          <User userId={userId} picturePath={user.data.userImage} />
          <Box m="2rem 0" />
          <FriendList userId={userId} />
        </Box>
        <Box>
          <Box m="2rem 0" />
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
          {/* <ComponentWrapper width={5} height={5} /> */}
        </Box>
      </Box>
    </Box>
  );
};

export default ProfilePage;
