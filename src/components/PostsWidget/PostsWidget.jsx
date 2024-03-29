import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import OnePostWidget from "../OnePostWidget/OnePostWidget";
import { useEffect, useState } from "react";
import { setPosts } from "../../redux/authSlice";

const PostsWidget = (userId, isProfile = false) => {
  const [data, setData] = useState([]);
  const dispatch = useDispatch();
  const userHomePosts = useSelector((state) => state.auth.posts);
  const token = useSelector((state) => state.auth.token);
  // const userFriends = useSelector((state) => state.auth.friends);
  const [isFirstMount, setIsFirstMount] = useState(true);

  useEffect(() => {
    const getFriendsPosts = async () => {
      const initialHomePosts = await axios.get("http://localhost:7005/post", {
        headers: {
          Authorization: `Bearer ${token}`, // Pass the token in the Authorization header
        },
      });
      dispatch(setPosts(initialHomePosts.data.data));
      console.log("posts Mariam",initialHomePosts); //intitialHomePosts.data.data
      console.log("hi:", userHomePosts);
    };

    getFriendsPosts();
  }, [token, dispatch]); // Fetch data on component mount

  // const shuffleArrayExceptLast = (arr) => {
  //   const lastIndex = arr.length - 1;

  //   for (let i = 0; i < lastIndex; i++) {
  //     const randomIndex = Math.floor(Math.random() * (lastIndex - i) + i);
  //     const temp = arr[i];
  //     arr[i] = arr[randomIndex];
  //     arr[randomIndex] = temp;
  //   }

  //   return arr.reverse();
  // };

  // useEffect(() => {
  //   if (isFirstMount) {
  //     setData(shuffleArrayExceptLast([...userHomePosts])); // Create a copy to avoid mutating state
  //     setIsFirstMount(false);
  //   } else {
  //     setData(userHomePosts);
  //   }
  // }, [userHomePosts]);
  console.log(userHomePosts)

  return (
    <>
      {userHomePosts?.map(
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
    </>
  );
};

export default PostsWidget;
