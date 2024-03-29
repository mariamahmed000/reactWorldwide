import { Box, useMediaQuery } from "@mui/material";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation, useParams } from "react-router-dom";
// import PostsWidget from "scenes/widgets/PostsWidget";
import User from "../../components/User";
import FriendList from "../../components/FriendList";
import ComponentWrapper from "../../components/utilities/ComponentWrapper";

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const { userId } = useParams();
  const token = useSelector((state) => state.auth.token);
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");
  const { pathname } = useLocation();

  const getUser = async () => {
    const response = await fetch(`http://localhost:7005/user/${userId}`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await response.json();
    setUser(data);
  };

  useEffect(() => {
    getUser();
  }, [pathname]); // eslint-disable-line react-hooks/exhaustive-deps

  if (!user) return null;

  return (
    <Box>
      <Box width="100%" padding="2rem 6%" gap="2rem" justifyContent="center">
        <Box>
          <User userId={userId} picturePath={user.picturePath} />
          <Box m="2rem 0" />
          <FriendList userId={userId} />
        </Box>
        <Box>
          <Box m="2rem 0" />
          <ComponentWrapper width={5} height={5} />
        </Box>
      </Box>
    </Box>
  );
};

export default ProfilePage;
