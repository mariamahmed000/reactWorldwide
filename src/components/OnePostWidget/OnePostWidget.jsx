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
import InputAdornment from "@mui/material/InputAdornment";
import TextField from "@mui/material/TextField";
import AccountCircle from "@mui/icons-material/AccountCircle";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { setPost } from "../../redux/authSlice";
import ComponentWrapper from "../utilities/ComponentWrapper";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

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
  createdAt,
}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = useSelector((state) => state.auth.token);
  const [isComments, setIsComments] = useState(false);
  const loggedInUserId = useSelector((state) => state.auth.user._id);
  const isLiked = Boolean(likes[loggedInUserId]);
  const likeCount = Object.keys(likes).length;
  const [commentsDetails, setCommentsDetails] = useState([]); //comments array for each post
  const [reverseCommentsArr, setReverseCommentsArr] = useState([]); //comments array for each post
  const [comment, setComment] = useState(""); //new comment inside the text Field
  const [addedComment, setaddedComment] = useState({});

  const { palette } = useTheme();
  const primary = palette.primary.main;
  const main = palette.neutral.main;
  const medium = palette.neutral.medium;

  useEffect(() => {
    const fetchComments = async () => {
      const reponse = await axios.get(
        `http://localhost:7005/post/${postId}/comment`,
        {
          headers: {
            Authorization: `Bearer ${token}`, // Pass the token in the Authorization header
          },
        }
      );
      setCommentsDetails(reponse.data.userComments);
    };
    fetchComments();
  }, [postId, addedComment, token]);

  //toggle the like button to adjust the post in the database
  const patchLike = async () => {
    let updatedPost = await fetch(
      `http://localhost:7005/post/${postId}/like`,

      {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`, // Pass the token in the Authorization header
        },
      }
    );
    updatedPost = await updatedPost.json();
    dispatch(setPost({ post: updatedPost.updatedPost }));
  };

  //add comment to a post
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
    setaddedComment({ userComment: comment });
  };

  //function to revere the comments array
  const reverseComments = (arr) => {
    return arr.reverse();
  };

  //Re-render once a new post is added, as the global state (posts) renders and by default re-render the use Effect
  useEffect(() => {
    setReverseCommentsArr(reverseComments([...commentsDetails])); // Create a copy to avoid mutating state
  }, [commentsDetails]);

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
          {/* display user */}
          <FlexBetween
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              minWidth: "100%",
            }}
          >
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
            <Typography
              color={medium}
              fontSize="0.75rem"
              sx={{
                alignSelf: "start",
                paddingTop: "0.75rem",
                justifySelf: "end",
              }}
            >
              {createdAt}
            </Typography>
          </FlexBetween>
          {/* post part */}
          <Typography color={main}>{description}</Typography>

          {postImage && (
            <img
              width="100%"
              height="auto"
              alt="post"
              style={{ borderRadius: "0.75rem", height: "auto" }}
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
                  <IconButton onClick={() => patchLike()}>
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
          {reverseCommentsArr?.length > 0 && isComments && (
            <Box mt="0.5rem">
              {reverseCommentsArr?.map((comment, i) => (
                <Box key={`${name}-${i}`}>
                  <Divider />
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                    }}
                  >
                    <UserImg image={comment?.userImage} size="35px" />
                    <Box>
                      <Typography
                        sx={{
                          color: "main",
                          m: "0.6rem 0 0.3rem 0",
                          pl: "0.4rem",
                          fontWeight: "bold",
                          fontSize: "0.75rem",
                          "&:hover": {
                            color: medium,
                            cursor: "pointer",
                          },
                        }}
                        onClick={() => {
                          navigate(`/profile/${comment?.userId}`);
                        }}
                      >
                        @{comment?.firstName}
                        <span> </span>
                        {comment?.lastName}
                      </Typography>
                      <Typography
                        sx={{
                          color: "main",
                          pl: "1.2rem",
                          pb: ".6rem",
                          fontSize: "0.9rem",
                          fontWeight: "normal",
                          lineHeight: "1",
                        }}
                      >
                        {comment?.comment}
                      </Typography>
                    </Box>
                  </Box>
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
