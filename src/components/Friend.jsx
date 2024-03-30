import { PersonRemoveOutlined, PersonAddOutlined } from "@mui/icons-material";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import FlexBetween from "./utilities/FlexBetween";
import UserImg from "./utilities/UserImg";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { setFriends } from "../redux/authSlice";
import { useEffect } from "react";

const Friend = ({ friendId, name, subtitle, userPicturePath }) => {
  // const name = "Abdallah";
  // const subtitle = "Software Developer";
  // const userPicturePath =
  //   "https://images.unsplash.com/photo-1503249023995-51b0f3778ccf?q=80&w=1920&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { _id } = useSelector((state) => state.auth.user);
  const token = useSelector((state) => state.auth.token);
  const friends = useSelector((state) => state.auth.user.friends);

  const isFriend = friends.find((friend) => friend._id === friendId);
  const { pathname } = useLocation();

  const patchFriend = async () => {
    const response = await fetch(
      `http://localhost:7005/user/${_id}/${friendId}`,
      {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    const data = await response.json();
    const friendsArr = pathname.includes("/profile") ? data.friend : data.user;
    dispatch(setFriends({ friends: friendsArr }));
  };

  const { palette } = useTheme();
  const primaryLight = palette.primary.light;
  const primaryDark = palette.primary.dark;
  const main = palette.neutral.main;
  const medium = palette.neutral.medium;

  return (
    <FlexBetween>
      <FlexBetween gap="1rem">
        <UserImg image={userPicturePath} size="55px" />
        <Box
          onClick={() => {
            navigate(`/profile/${friendId}`);
            // navigate(0);
          }}
        >
          <Typography
            color={main}
            variant="h5"
            fontWeight="500"
            sx={{
              "&:hover": {
                color: palette.primary.xlight,
                cursor: "pointer",
              },
            }}
          >
            {name}
          </Typography>
          <Typography color={medium} fontSize="0.75rem">
            {subtitle}
          </Typography>
        </Box>
      </FlexBetween>
      {pathname.includes("/home") && (
        <IconButton
          onClick={() => patchFriend()}
          sx={{ backgroundColor: primaryLight, p: "0.6rem" }}
        >
          {isFriend ? (
            <PersonRemoveOutlined sx={{ color: primaryDark }} />
          ) : (
            <PersonAddOutlined sx={{ color: primaryDark }} />
          )}
        </IconButton>
      )}
    </FlexBetween>
    // <FlexBetween>
    //   <FlexBetween gap="1rem">
    //     <UserImg image={userPicturePath} size="55px" />
    //     <Box>
    //       <Typography
    //         color={main}
    //         variant="h5"
    //         fontWeight="500"
    //         sx={{
    //           "&:hover": {
    //             color: medium,
    //             cursor: "pointer",
    //           },
    //         }}
    //       >
    //         {name}
    //       </Typography>
    //       <Typography color={medium} fontSize="0.75rem">
    //         {subtitle}
    //       </Typography>
    //     </Box>
    //   </FlexBetween>
    //   <IconButton sx={{ backgroundColor: primaryLight, p: "0.6rem" }}>
    //     <PersonRemoveOutlined sx={{ color: primaryDark }} />
    //   </IconButton>
    // </FlexBetween>
  );
};

export default Friend;
