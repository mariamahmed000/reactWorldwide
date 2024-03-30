import { Box, Typography, useTheme } from "@mui/material";
import ComponentWrapper from "./utilities/ComponentWrapper";
import Friend from "./Friend";
import { useDispatch, useSelector } from "react-redux";
import { setFriends } from "../redux/authSlice";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const FriendList = ({ userId }) => {
  const token = useSelector((state) => state.auth.token);
  const currentUser = useSelector((state) => state.auth.user);
  const isCurrentUser = userId === currentUser._id;
  const userFriends = useSelector((state) => state.auth.user.friends);
  console.log("USERFRIENDS", userFriends, "ISFRIEND", isCurrentUser);
  const dispatch = useDispatch();
  const { pathname } = useLocation();

  const { palette } = useTheme();

  const getFriends = async () => {
    const response = await fetch(
      `http://localhost:7005/user/${userId}/friends`,
      {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    const data = await response.json();
    console.log("DATA", data);

    dispatch(setFriends({ friends: data.data }));
  };

  useEffect(() => {
    getFriends();
  }, [pathname]); // eslint-disable-line react-hooks/exhaustive-deps

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
        {userFriends.length > 0 ? (
          userFriends?.map((friend) => (
            <Friend
              key={friend._id}
              friendId={friend._id}
              name={`${friend.firstName} ${friend.lastName}`}
              subtitle={friend.occupation}
              userPicturePath={friend?.userImage}
            />
          ))
        ) : (
          <h1>no friends</h1>
        )}
      </Box>
    </ComponentWrapper>
    // <ComponentWrapper>
    //   <Typography
    //     color={palette.neutral.dark}
    //     variant="h5"
    //     fontWeight="500"
    //     sx={{ mb: "1.5rem" }}
    //   >
    //     Friend List
    //   </Typography>
    //   <Box display="flex" flexDirection="column" gap="1.5rem">
    //     <Friend />
    //   </Box>
    // </ComponentWrapper>
  );
};

export default FriendList;
