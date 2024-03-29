import { Box, Card, CardContent,  Stack, Typography, useMediaQuery } from '@mui/material';
import Grid from '@mui/material/Grid';
import AddReactionIcon from '@mui/icons-material/AddReaction';
import PeopleIcon from '@mui/icons-material/People';
import PostAddIcon from '@mui/icons-material/PostAdd';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllUsers } from '../../redux/users';
import { getAllPosts } from '../../redux/posts';
import Chart2 from './Chart2';
import Chart1 from './Chart1';

const Home = () => {
  const [setUsers]=useState([]);
  const [setPosts]=useState([]);
  const dispatch = useDispatch();

  const postsArr = useSelector((state=>state.posts.posts?.posts))
  console.log(postsArr)
  const postsNumber = postsArr?.length;
  const postWithMaxLikes = postsArr?.reduce((maxPost, post) => {
    if (!maxPost || post.likes > maxPost.likes) {
        return post;
    } else {
        return maxPost;
    }
}, null);


  const usersArr = useSelector((state=>state.users.users.data))
  const usersNumber = usersArr?.length;

  const impressionsArr = usersArr?.map(user=> user.impressions );
  const impressionsNumber =impressionsArr?.reduce((total, impressions) => total + impressions, 0);

  const userMaxImp = impressionsArr?.reduce((maxUser, impressions, index) => {
    if (index === 0 || impressions > maxUser.impressions) {
        return usersArr[index];
    } else {
        return maxUser;
    }
}, {});

  useEffect(()=>{
    dispatch(getAllUsers());
    dispatch(getAllPosts());
    setPosts(postsArr);
    setUsers(usersArr);
 },[dispatch])
 const isNonMobileScreens1 = useMediaQuery("(min-width: 800px)");


return (
<Box height={70}>
    <Box sx={{ display:"flex" }}>
    <Box component="main" sx={{flexGrow:1 , p:3}}>
<Grid container spacing={2}>
      <Grid item xs={12} lg={8}  >
      <Stack spacing={3}  direction={`${isNonMobileScreens1?"row":"column"}`} >
              <Grid xs={12} lg={12} container spacing={2}>
              <Grid item  xs={12} lg={4} md={4}>
                <Card sx={{ width: '100%', height: 250 }}>
                  <CardContent sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '100%' ,paddingX:5 }}>
                    <PostAddIcon sx={{ fontSize: 40 }}/>
                    <Stack direction='row'>
                      <Typography variant="h3" sx={{ marginLeft:3 ,marginTop:1 , marginRight:3}}>
                        <h2>{postsNumber}</h2> 
                      </Typography>
                      <Typography gutterBottom variant="h2" component="div" sx={{marginTop:1}}>
                        Posts  
                      </Typography>
                    </Stack>
                  </CardContent>
                </Card>
              </Grid>
             <Grid item  xs={12} lg={4} md={4}>
                <Card sx={{ width: '100%', height: 250 }}  >
                  <CardContent sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '100%' ,paddingX:5 }}>
                    <PeopleIcon sx={{ fontSize: 40 }}/>
                    <Stack direction='row'>
                      <Typography variant="h3" sx={{ marginLeft:3 ,marginTop:1 , marginRight:3}}>
                        <h2>{usersNumber}</h2> 
                      </Typography>
                      <Typography gutterBottom variant="h2" component="div" sx={{marginTop:1}}>
                        Users
                      </Typography>
                    </Stack>
                
                  </CardContent>
                </Card>
             </Grid>
              <Grid item  xs={12} lg={4} md={4}>
                <Card sx={{ width: '100%',  height: 250 }} >
                  <CardContent sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '100%' ,paddingX:5 }}>
                    <AddReactionIcon sx={{ fontSize: 40 }}/>
                    <Stack direction='row'>
                      <Typography variant="h3" sx={{ marginLeft: 3 ,marginTop:1 , marginRight:3}}>
                        <h2>{impressionsNumber} </h2>
                      </Typography>
                      <Typography gutterBottom variant="h2" component="div" sx={{marginTop:1}}>
                      Impressions  
                      </Typography>
                    </Stack>
                
                  </CardContent>
                </Card>
              </Grid>
              </Grid>
            </Stack>
            </Grid>
            <Grid item xs={12} lg={4}  >
            <Grid  container spacing={2} sx={{paddingTop:2}}>
              <Grid item lg={12} md={6} xs={12}>
                <Card sx={{ maxWidth: 100+"%" }} >
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                        <Typography gutterBottom variant="h2" component="h2" sx={{textAlign:"center"}}>
                        🎊Most Popular User🎊
                        </Typography>
                        <Typography gutterBottom variant="h6" component="div" sx={{textAlign:"center"}}>
                        {userMaxImp?.firstName} {userMaxImp?.lastName}
                        </Typography>
                        </Typography>
                    </CardContent>
                    </Card>
              </Grid>
                  <Grid item lg={12} md={6} xs={12}>
                    <Card sx={{ maxWidth: 100+"%" }}>
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                        <Typography gutterBottom variant="h2" component="h2" sx={{textAlign:"center"}}>
                        🚀Trending post🚀
                        </Typography>
                        <Typography gutterBottom variant="h6" component="div" sx={{textAlign:"center"}}>
                          {postWithMaxLikes?.description}
                        </Typography>
                        </Typography>
                    </CardContent>
                    </Card>
                  </Grid>
            </Grid> 
            </Grid>
        </Grid>
      <Grid container spacing={2} sx={{marginTop:1}}  >
        <Grid item xs={12} lg={8} >
          <Card sx={{ height: '55vh', display: 'flex', justifyContent: 'center' , alignItems: 'center',}}>
            <CardContent>
              <Chart1 />
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} lg={4}>
          <Card sx={{ height: '55vh', display: 'flex', justifyContent: 'center' }}>
            <CardContent>
              <Chart2  />
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>     
    </Box>
</Box>
)
}

export default Home;