// import React from 'react';
// import { Link } from 'react-router-dom';
// import User from '../User'

// const SearchResultList = ({list}) => {
//   console.log("listtttttttttt",list);
//   return (
//     <div className='result-list'>
//     {list.map((data)=>{
//       return <div key={data._id}>
//         <Link to={`/profile/${data._id}`} >
//         {data.firstName} {data.lastName}
//         </Link>
//         </div>
//     })}
//     </div>
//   );
// }

// export default SearchResultList;
import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import {getAllUsers} from '../../redux/users'
import { useNavigate } from 'react-router-dom';


export default function SearchResultList(props) {
  const dispatch = useDispatch();
  const navigate =useNavigate();
  const [search,setSearch]=useState('');
  const [result,setResult]=useState([]);
  const usersArr=useSelector((state=>state.users.users.data))
  console.log(usersArr);

  useEffect(()=>{
    dispatch(getAllUsers());
 },[dispatch])

 const getUser=(value)=>{
   const results=usersArr?.filter((user)=>{
      return value && user && user.firstName && user.firstName.toLowerCase().includes(value)
   })
  //  console.log("result",result);
   setResult(results);
  } 
  console.log("result",result);

 const handleChanges=(value)=>{
  console.log("value",value);
  setSearch(value);
  getUser(value)

 }

  console.log("search",search);


  return (
    <Autocomplete
    getOptionLabel={(result)=>`${result?.firstName} ${result?.lastName}`}
    // value={search}
    onChange={(e,newValue)=>navigate(`/profile/${newValue._id}`)}
    inputValue={search}
    onInputChange={(e,newValue)=>handleChanges(newValue)}
    options={result}
    sx={{ width: 300 }}
    renderInput={(params) => <TextField {...params}  label="Search" >
      {console.log("params",params)}
    </TextField>
    }
  />
  );
}
