import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import OnePostWidget from "../OnePostWidget/OnePostWidget";
import { useEffect, useState } from "react";
import { setPosts } from "../../redux/authSlice";
import { useLocation } from "react-router-dom";

const PostsWidget = (userId) => {
  const [data, setData] = useState([]);
  const dispatch = useDispatch();
  const userHomePosts = useSelector((state) => state.auth.posts);
  const token = useSelector((state) => state.auth.token);
  // const userFriends = useSelector((state) => state.auth.friends);
  const {pathname} = useLocation();

  useEffect(() => {
    const getFriendsPosts = async () => {
      const initialHomePosts = await axios.get("http://localhost:7005/post", {
        headers: {
          Authorization: `Bearer ${token}`, // Pass the token in the Authorization header
        },
      });
      dispatch(setPosts(initialHomePosts.data.data));
      // console.log("posts Mariam",initialHomePosts); //intitialHomePosts.data.data
      // console.log("hi:", userHomePosts);
    };

    getFriendsPosts();
  }, [token, dispatch]); // Fetch data on component mount
 
  return (
    <>
      {userHomePosts?.map(({ _id, userId, postImage, likes, comments, description }) => (
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
      ))}
    </>
  );
};

export default PostsWidget;
