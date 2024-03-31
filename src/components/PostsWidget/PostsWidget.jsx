import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import OnePostWidget from "../OnePostWidget/OnePostWidget";
import { useEffect, useState } from "react";
import { setPosts } from "../../redux/authSlice";

const PostsWidget = (userId) => {
  const [data, setData] = useState([]);
  const dispatch = useDispatch();
  const userHomePosts = useSelector((state) => state.auth.posts);
  const token = useSelector((state) => state.auth.token);

  useEffect(() => {
    const getFriendsPosts = async () => {
      const initialHomePosts = await axios.get("http://localhost:7005/post", {
        headers: {
          Authorization: `Bearer ${token}`, // Pass the token in the Authorization header
        },
      });
      dispatch(setPosts(initialHomePosts.data.data));
    };

    getFriendsPosts();
  }, [token, dispatch]); // Fetch data on component mount

  useEffect(() => {
    // Sort userHomePosts array in ascending order based on createdAt
    const sortedPosts = userHomePosts.slice().sort((a, b) => {
      return new Date(b.createdAt) - new Date(a.createdAt);
    });
    setData(sortedPosts);
  }, [userHomePosts]);

  return (
    <>
      {data?.map(
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
    </>
  );
};

export default PostsWidget;
