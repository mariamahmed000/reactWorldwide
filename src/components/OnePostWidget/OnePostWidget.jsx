import {
  Box,
  Button,
  Divider,
  IconButton,
  Typography,
  useTheme,
} from "@mui/material";
import FlexBetween from "../utilities/FlexBetween";
import UserImg from "../utilities/UserImg";
import {
  ChatBubbleOutlineOutlined,
  FavoriteBorderOutlined,
  FavoriteOutlined,
  SendOutlined,
  ShareOutlined,
} from "@mui/icons-material";
import Input from "@mui/material/Input";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import AccountCircle from "@mui/icons-material/AccountCircle";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { setPost } from "../../redux/authSlice";
import ComponentWrapper from "../utilities/ComponentWrapper";
import { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";

const OnePostWidget = ({
  postId,
  postUserId,
  name,
  description,
  location,
  postImage,
  userImage,
  likes,
  comments,
}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = useSelector((state) => state.auth.token);
  const [isComments, setIsComments] = useState(false);
  const loggedInUserId = useSelector((state) => state.auth.user._id);
  const isLiked = Boolean(likes[loggedInUserId]);
  const likeCount = Object.keys(likes).length;
  const [commentsDetails, setCommentsDetails] = useState([]);
  const [comment, setComment] = useState(""); //new comment inside the text Field
  const [addedComment, setaddedComment] = useState({});

  const { palette } = useTheme();
  const primary = palette.primary.main;
  const main = palette.neutral.main;
  const medium = palette.neutral.medium;

  console.log("POST_IMAGE", postImage);

  useEffect(() => {
    const fetchComments = async () => {
      const commentsArr = await axios.get(
        `http://localhost:7005/post/${postId}/comment`,
        {
          headers: {
            Authorization: `Bearer ${token}`, // Pass the token in the Authorization header
          },
        }
      );
      // console.log("hi:123", commentsArr.data.userComments);
      setCommentsDetails(commentsArr.data.userComments);
      // console.log("comments", commentsDetails);
    };
    fetchComments();
  }, [postId, addedComment]);

  const patchLike = async () => {
    // console.log(token);
    let updatedPost = await fetch(
      `http://localhost:7005/post/${postId}/like`,

      {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`, // Pass the token in the Authorization header
        },
        // body: JSON.stringify({ userId: loggedInUserId }),
      }
    );
    // console.log(updatedPost);
    updatedPost = await updatedPost.json();
    // console.log(updatedPost);
    dispatch(setPost({ post: updatedPost.updatedPost }));
  };

  const addComment = async (addedComment) => {
    const response = await fetch(
      `http://localhost:7005/post/${postId}/comment`,
      {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userComment: addedComment }),
      }
    );
    console.log("1111", addedComment);
    setaddedComment({ userComment: comment });
    console.log("Adding comment:", comment);
    // setComment("");
  };

  return (
    <>
      <Box mb={2}>
        <ComponentWrapper
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            gap: "1.25rem",
          }}
        >
          {/* friend detail */}
          <FlexBetween>
            <FlexBetween gap="1rem">
              <UserImg image={userImage} size="55px" />
              <Box>
                <Typography
                  color={main}
                  variant="h5"
                  fontWeight="500"
                  sx={{
                    "&:hover": {
                      color: medium,
                      cursor: "pointer",
                    },
                  }}
                  onClick={() => {
                    navigate(`/profile/${postUserId}`);
                  }}
                >
                  {name}
                </Typography>
                <Typography color={medium} fontSize="0.75rem">
                  {location}
                </Typography>
              </Box>
            </FlexBetween>
          </FlexBetween>
          {/* post part */}
          <Typography color={main}>{description}</Typography>

          {postImage && (
            <img
              width="100%"
              height="auto"
              alt="post"
              style={{ borderRadius: "0.75rem" }}
              src={`http://localhost:7005/assets/${postImage}`}
            />
          )}
          <Box>
            <FlexBetween>
              {/* Add comment */}
              <Box
                as="form"
                onSubmit={(e) => {
                  e.preventDefault();
                  addComment(comment);
                  setComment("");
                }}
                sx={{
                  "& > :not(style)": { my: 1 },
                  width: "100%",
                  paddingRight: "8px",
                }}
              >
                <FlexBetween>
                  <TextField
                    id="comment"
                    label="Add comment"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    sx={{ width: "100%" }}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <AccountCircle />
                        </InputAdornment>
                      ),
                    }}
                    placeholder="speak your mind..."
                    variant="standard"
                  />
                  <Button
                    type="submit"
                    sx={{
                      padding: 0,
                      minWidth: "min-content",
                      zIndex: 1,
                    }}
                  >
                    <SendOutlined
                      sx={{
                        color: palette.primary.main,
                        "&:hover": { cursor: "pointer", color: medium },
                        fontSize: 16,
                      }}
                    />
                  </Button>
                </FlexBetween>
              </Box>
            </FlexBetween>
            <FlexBetween mt="0.5rem">
              <FlexBetween gap="1rem">
                <FlexBetween>
                  <IconButton onClick={patchLike}>
                    {isLiked ? (
                      <FavoriteOutlined sx={{ color: primary }} />
                    ) : (
                      <FavoriteBorderOutlined />
                    )}
                  </IconButton>
                  <Typography>{likeCount}</Typography>
                </FlexBetween>
                <FlexBetween gap="0.3rem">
                  <IconButton onClick={() => setIsComments(!isComments)}>
                    <ChatBubbleOutlineOutlined />
                  </IconButton>
                  <Typography>{commentsDetails.length}</Typography>
                </FlexBetween>
              </FlexBetween>
              <IconButton>
                <ShareOutlined />
              </IconButton>
            </FlexBetween>
          </Box>
          {commentsDetails?.length > 0 && isComments && (
            <Box mt="0.5rem">
              {commentsDetails?.map((comment, i) => (
                <Box key={`${name}-${i}`}>
                  <Divider />
                  <Typography sx={{ color: main, m: "0.5rem 0", pl: "1rem" }}>
                    {comment?.firstName}
                    <span> </span>
                    {comment?.lastName}
                    <br />
                    {comment?.comment}
                  </Typography>
                  <Divider />
                </Box>
              ))}
            </Box>
          )}
        </ComponentWrapper>
      </Box>
    </>
  );
};

export default OnePostWidget;
