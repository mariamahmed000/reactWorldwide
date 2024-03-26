import { Box, Button, Card, CardActions, CardContent, CardMedia, Stack, Typography } from '@mui/material';
import Grid from '@mui/material/Grid';
import AddReactionIcon from '@mui/icons-material/AddReaction';
import PeopleIcon from '@mui/icons-material/People';
import PostAddIcon from '@mui/icons-material/PostAdd';
import axios from 'axios';

import { useEffect, useState } from 'react';
const Home = () => {
  const [postData, setPostData] = useState(null);
  const [userData, setUserData] = useState(null);
  const [impressionsData, setImpressionsData] = useState(null);

  useEffect(() => {
    // Fetch data when component mounts
    const fetchData = async () => {
      try {
        // Fetch data for posts
        // const postsResponse = await axios.get('/api/posts');
        // setPostData(postsResponse.data);

        // Fetch data for users
        const usersResponse = await axios.get('http://localhost:7005/user');
        console.log(usersResponse.data);
        setUserData(usersResponse.data);

        // Fetch data for impressions
      //   const impressionsResponse = await axios.get('/api/impressions');
      //   setImpressionsData(impressionsResponse.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);
return (
<Box height={70}>
    <Box sx={{ display:"flex" }}>
    <Box component="main" sx={{flexGrow:1 , p:3}}>
        <Grid container spacing={2}>
            <Grid item xs={8}>
               <Stack spacing={2} direction="row">
                   
                        <Card sx={{ width: '100%', maxWidth: '35%', height: 140 }}>
                          <CardContent sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '100%' ,paddingX:5 }}>
                            <PostAddIcon sx={{ fontSize: 40 }}/>
                            <Stack direction='row'>
                              <Typography gutterBottom variant="h2" component="div">
                                Posts
                              </Typography>
                              <Typography variant="h3" sx={{ marginLeft: 10 ,marginTop:1 }}>
                                3ADAD  {postData}
                              </Typography>
                            </Stack>
                        
                          </CardContent>
                        </Card>
                        <Card sx={{ width: '100%', maxWidth: '35%', height: 140 }}>
                          <CardContent sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '100%' ,paddingX:5 }}>
                            <PeopleIcon sx={{ fontSize: 40 }}/>
                            <Stack direction='row'>
                              <Typography gutterBottom variant="h2" component="div">
                                Users
                              </Typography>
                              <Typography variant="h3" sx={{ marginLeft: 10 ,marginTop:1 }}>
                                3ADAD  {userData}
                              </Typography>
                            </Stack>
                        
                          </CardContent>
                        </Card>
                        <Card sx={{ width: '100%', maxWidth: '35%', height: 140 }}>
                          <CardContent sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '100%' ,paddingX:5 }}>
                            <AddReactionIcon sx={{ fontSize: 40 }}/>
                            <Stack direction='row'>
                              <Typography gutterBottom variant="h2" component="div">
                                Impressions
                              </Typography>
                              <Typography variant="h3" sx={{ marginLeft: 10 ,marginTop:1 }}>
                                3ADAD  {impressionsData}
                              </Typography>
                            </Stack>
                        
                          </CardContent>
                        </Card>

                       
               </Stack>
            </Grid>
            <Grid item xs={4}>
            <Stack spacing={3}  >
                    <Card sx={{ maxWidth: 100+"%" }}>
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="div">
                           <span>Kalam static</span>
                           <span>sharh static</span>

                            </Typography>
                        </CardContent>
                        </Card>
                        <Card sx={{ maxWidth: 100+"%" }}>
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="div">
                            Lizard 2
                            </Typography>
                        </CardContent>
                        </Card>
                        
               </Stack>
            </Grid>
        </Grid>
      <Box height={20} sx={{marginTop:3}}>
      <Grid container spacing={2}>
        <Grid item xs={8}>
          <Card sx={{ height: '60vh' }}>
            <CardContent>
              Card 1
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={4}>
          <Card sx={{ height: '60vh' }}>
            <CardContent>
              Card 2
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
    </Box>     
    </Box>
</Box>
)
}

export default Home