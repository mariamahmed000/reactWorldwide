import {
  ManageAccountsOutlined,
  EditOutlined,
  LocationOnOutlined,
  WorkOutlineOutlined,
  PersonRemoveOutlined,
  PersonAddOutlined,
} from "@mui/icons-material";
import { Box, Typography, Divider, useTheme, IconButton } from "@mui/material";
import UserImg from "./utilities/UserImg";
import FlexBetween from "./utilities/FlexBetween";
import ComponentWrapper from "./utilities/ComponentWrapper";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { setFriends } from "../redux/authSlice";
import { borderRadius } from "@mui/system";

const User = ({ userId, picturePath }) => {
  const [user, setUser] = useState(null);
  const [currentUserFriends, setCurrentUserFriends] = useState([]);
  let toggleUser;
  const { palette } = useTheme();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);
  const currentUser = useSelector((state) => state.auth.user);
  const currentUserId = useSelector((state) => state.auth.user._id);
  // console.log("AHHHHHHHHHH", currentUser);
  const isCurrentUser = userId === currentUser._id;
  const userFriends = useSelector((state) => state.auth.user.friends);

  console.log("USERFRIENDS", userFriends);
  // const isFriend = currentUserFriends?.find((friend) => friend._id === userId);
  let isFriend = user?.data.friends.find(
    (friendId) => friendId === currentUserId
  );
  console.log("ISNEWFRIEND", isFriend);
  // console.log("ISFRIEND", isFriend);
  // console.log("PICTUREPATH", picturePath);

  const dark = palette.neutral.dark;
  const medium = palette.neutral.medium;
  const main = palette.neutral.main;
  const { pathname } = useLocation();

  console.log("PATHNAME_STR", pathname);

  const getUser = async () => {
    const response = await fetch(`http://localhost:7005/user/${userId}`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await response.json();
    // console.log(data);
    setUser(data);
    if (pathname.includes("/profile")) {
      const viewedProfileRes = await fetch(
        `http://localhost:7005/user/${userId}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...data.data,
            viewedProfile: data.data.viewedProfile + 1,
          }),
        }
      );
      const newUser = await viewedProfileRes.json();
      setUser(newUser);
    }
  };

  const patchFriend = async () => {
    const response = await fetch(
      `http://localhost:7005/user/${currentUser._id}/${userId}`,
      {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    toggleUser = await response.json();
    // const friendsArr = pathname.includes("/profile")
    //   ? toggleUser.friend
    //   : toggleUser.user;
    // console.log("FRIENDARR", friendsArr);
    dispatch(setFriends({ friends: toggleUser.friend }));
    setCurrentUserFriends(toggleUser.user);
  };

  useEffect(() => {
    getUser();
  }, [pathname, currentUser]); // eslint-disable-line react-hooks/exhaustive-deps

  if (!user) {
    return null;
  }

  //   const user = {
  //     firstName: "Gareth",
  //     lastName: "Bale",
  //     location: "El Marg",
  //     occupation: "Doctor",
  //     viewedProfile: 55,
  //     impressions: 250,
  //     friends: [],
  //   };

  const {
    firstName,
    lastName,
    location,
    occupation,
    viewedProfile,
    impressions,
    friends,
  } = user.data;

  return (
    <ComponentWrapper>
      {/* FIRST ROW */}
      {pathname.includes("/profile") && (
        <img
          width="100%"
          // height="auto"
          alt="cover"
          style={{
            borderRadius: "0.75rem",
            marginTop: "0.75rem",
            maxHeight: "20rem",
            aspectRatio: "2 / 1",
            backgroundSize: "cover",
          }}
          src="https://images.pexels.com/photos/66997/pexels-photo-66997.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
        />
      )}
      <FlexBetween
        gap="0.5rem"
        pb="1.1rem"
        onClick={() => navigate(`/profile/${userId}`)}
      >
        <FlexBetween gap="1rem">
          <UserImg image={picturePath} />
          <Box>
            <Typography
              variant="h4"
              color={palette.primary.dark}
              fontWeight="500"
              sx={{
                "&:hover": {
                  color: palette.primary.main,
                  cursor: "pointer",
                },
              }}
            >
              {firstName} {lastName}
            </Typography>
            <Typography color={medium}>
              {friends.length} friend{friends.length !== 1 && "s"}
            </Typography>
          </Box>
        </FlexBetween>
        {!isCurrentUser && (
          <IconButton
            onClick={() => patchFriend()}
            sx={{ backgroundColor: palette.primary.light, p: "0.6rem" }}
          >
            {isFriend ? (
              <PersonRemoveOutlined sx={{ color: palette.primary.dark }} />
            ) : (
              <PersonAddOutlined sx={{ color: palette.primary.dark }} />
            )}
          </IconButton>
        )}
      </FlexBetween>

      <Divider />

      {/* SECOND ROW */}
      <Box
        p="1rem 0"
        display="flex"
        flexDirection={pathname.includes("/profile") ? "row" : "column"}
        justifyContent="space-around"
      >
        <Box display="flex" alignItems="center" gap="1rem">
          <LocationOnOutlined fontSize="large" sx={{ color: main }} />
          <Typography color={medium}>{location}</Typography>
        </Box>
        <Box display="flex" alignItems="center" gap="1rem">
          <WorkOutlineOutlined fontSize="large" sx={{ color: main }} />
          <Typography color={medium}>{"Software Engineer"}</Typography>
        </Box>
      </Box>

      <Divider />

      {/* THIRD ROW */}
      {isCurrentUser && (
        <>
          <Box p="1rem 0">
            <FlexBetween mb="0.5rem">
              <Typography color={medium}>Who's viewed your profile</Typography>
              <Typography color={main} fontWeight="500">
                {viewedProfile}
              </Typography>
            </FlexBetween>
            <FlexBetween>
              <Typography color={medium}>Impressions of your post</Typography>
              <Typography color={main} fontWeight="500">
                {impressions}
              </Typography>
            </FlexBetween>
          </Box>

          <Divider />
        </>
      )}

      {/* FOURTH ROW */}
      <Box p="1rem 0">
        <Typography fontSize="1rem" color={main} fontWeight="500" mb="1rem">
          Social Profiles
        </Typography>

        <FlexBetween gap="1rem" mb="0.5rem">
          <FlexBetween gap="1rem">
            <img
              src="https://img.freepik.com/free-vector/twitter-new-2023-x-logo-white-background-vector_1017-45422.jpg?size=338&ext=jpg&ga=GA1.1.553209589.1711497600&semt=ais"
              alt="twitter"
              height="40px"
              style={{ borderRadius: "50%" }}
            />
            <Box>
              <Typography color={main} fontWeight="500">
                Twitter
              </Typography>
              <Typography color={medium}>Social Network</Typography>
            </Box>
          </FlexBetween>
          <EditOutlined sx={{ color: main }} />
        </FlexBetween>

        <FlexBetween gap="1rem">
          <FlexBetween gap="1rem">
            <img
              src="https://st3.depositphotos.com/8943496/36360/v/450/depositphotos_363604792-stock-illustration-initial-letter-business-name-gold.jpg"
              alt="linkedin"
              height="40px"
              style={{ borderRadius: "50%" }}
            />
            <Box>
              <Typography color={main} fontWeight="500">
                Linkedin
              </Typography>
              <Typography color={medium}>Network Platform</Typography>
            </Box>
          </FlexBetween>
          <EditOutlined sx={{ color: main }} />
        </FlexBetween>
      </Box>
    </ComponentWrapper>
  );
};

export default User;
