import React from "react";
import ComponentWrapper from "./utilities/ComponentWrapper";
import UserImg from "./utilities/UserImg";
import FlexBetween from "./utilities/FlexBetween";
import Dropzone from "react-dropzone";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { setPosts } from "state";
import {
  EditOutlined,
  DeleteOutlined,
  AttachFileOutlined,
  GifBoxOutlined,
  ImageOutlined,
  MicOutlined,
  MoreHorizOutlined,
  SendAndArchiveOutlined,
  SendOutlined,
} from "@mui/icons-material";
import {
  Box,
  Divider,
  Typography,
  InputBase,
  useTheme,
  Button,
  IconButton,
  useMediaQuery,
} from "@mui/material";
import { setPosts } from "../redux/authSlice";

const NewPost = ({ picturePath }) => {
  const [isImage, setIsImage] = useState(false);
  const [image, setImage] = useState(null);
  const [post, setPost] = useState("");
  const { palette } = useTheme();
  const { _id } = useSelector((state) => state.auth.user);
  const token = useSelector((state) => state.auth.token);
  const dispatch = useDispatch();
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
  const mediumMain = palette.neutral.mediumMain;
  const medium = palette.neutral.medium;

  const handlePost = async () => {
    const formData = new FormData();
    formData.append("userId", _id);
    formData.append("description", post);
    if (image) {
      formData.append("image", image);
      formData.append("postImage", image.name);
    }

    const response = await fetch(`http://localhost:7005/post`, {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
      body: formData,
    });
    const data = await response.json();
    console.log("New Post Abdallah",data)
    dispatch(setPosts( data.data ));
    setImage(null);
    setPost("");
  };
  return (
    <ComponentWrapper>
      <Box display="flex" alignItems="center">
        <Box sx={{ marginRight: -8.2, marginLeft: 1, zIndex: 1 }}>
          <UserImg image={picturePath} />
        </Box>
        <InputBase
          placeholder="What's on your mind..."
          onChange={(e) => setPost(e.target.value)}
          value={post}
          sx={{
            width: "100%",
            backgroundColor: palette.neutral.light,
            borderRadius: "2rem",
            padding: "1.5rem 0",
            paddingLeft: "5rem",
            paddingRight: `${isNonMobileScreens ? "2.5rem" : "5.6rem"}`,
          }}
        />
        {!isNonMobileScreens && (
          <FlexBetween marginLeft={"-95px"} width="5px">
            <Box
              sx={{
                // marginLeft: -13,
                zIndex: 1,
              }}
              onClick={() => setIsImage(!isImage)}
            >
              <ImageOutlined
                sx={{
                  "&:hover": { cursor: "pointer", color: medium },
                  color: palette.primary.main,
                  fontSize: 30,
                }}
              />
            </Box>
            <Divider
              orientation="vertical"
              sx={{
                background: palette.background.alt,
                zIndex: 1,
                borderColor: palette.background.alt,
                marginLeft: "10px",
              }}
              flexItem
            />
            <Button
              disabled={!post}
              onClick={handlePost}
              sx={{
                // color: palette.background.alt,
                // color: palette.background.main,
                // backgroundColor: palette.primary.main,
                borderRadius: "1rem",
                padding: 1,
                // marginLeft: -1,
                zIndex: 1,
              }}
            >
              <SendOutlined
                sx={{
                  color: palette.primary.main,
                  "&:hover": { cursor: "pointer", color: medium },
                  fontSize: 30,
                }}
              />
            </Button>
          </FlexBetween>
        )}
      </Box>
      {isImage && (
        <Box
          border={`1px solid ${medium}`}
          borderRadius="5px"
          mt="1rem"
          p="1rem"
        >
          <Dropzone
            acceptedFiles=".jpg,.jpeg,.png"
            multiple={false}
            onDrop={(acceptedFiles) => setImage(acceptedFiles[0])}
          >
            {({ getRootProps, getInputProps }) => (
              <FlexBetween>
                <Box
                  {...getRootProps()}
                  border={`2px dashed ${palette.primary.main}`}
                  p="1rem"
                  width="100%"
                  sx={{ "&:hover": { cursor: "pointer" } }}
                >
                  <input {...getInputProps()} />
                  {!image ? (
                    <p>Add Image Here</p>
                  ) : (
                    <FlexBetween>
                      <Typography>{image.name}</Typography>
                      <EditOutlined />
                    </FlexBetween>
                  )}
                </Box>
                {image && (
                  <IconButton
                    onClick={() => setImage(null)}
                    sx={{ width: "15%" }}
                  >
                    <DeleteOutlined />
                  </IconButton>
                )}
              </FlexBetween>
            )}
          </Dropzone>
        </Box>
      )}
      {isNonMobileScreens && (
        <>
          <Divider sx={{ margin: "1.25rem 0" }} />

          <FlexBetween>
            <FlexBetween gap="0.25rem" onClick={() => setIsImage(!isImage)}>
              <ImageOutlined sx={{ color: mediumMain }} />
              <Typography
                color={mediumMain}
                sx={{ "&:hover": { cursor: "pointer", color: medium } }}
              >
                Image
              </Typography>
            </FlexBetween>

            <Button
              disabled={!post}
              onClick={handlePost}
              sx={{
                color: palette.background.alt,
                backgroundColor: palette.primary.main,
                borderRadius: "3rem",
              }}
            >
              POST
            </Button>
          </FlexBetween>
        </>
      )}
    </ComponentWrapper>
  );
};

export default NewPost;
