import * as React from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getAllUsers } from "../../redux/users";
import { useLocation, useNavigate } from "react-router-dom";

export default function SearchResultList(props) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  //const [search, setSearch] = useState("");
  //nst [result, setResult] = useState([]);
  const usersArr = useSelector((state) => state.users.users.data);

  console.log(usersArr.length,{ usersArr });

  useEffect(() => {
    console.log('dispatch change')
    dispatch(getAllUsers());
    //getUser();
  }, [dispatch]);
  /*
  const getUser = () => {
    console.log(usersArr)
    const results = usersArr?.map((user) => {
      return (
       
        user.firstName 
        // user.firstName.toLowerCase().includes(value)
      );
    });
    setResult(results);
    console.log("HIIIIIIIIIIIIIIII",results)
  };

  const handleChanges = (value) => {
    setSearch(value);
    getUser(value);
  };
*/

  const handleSelect = (newValue) => {
    if (newValue) {
      navigate(`/profile/${newValue._id}`);
    }
  };
  return (
    <Autocomplete
      key={location.pathname}
      getOptionLabel={(result) => (
          `${result?.firstName} ${result?.lastName}`
      )}
      // user
      onChange={(e, newValue) => handleSelect(newValue)}
      // value = {}
      // text hamada
      // inputValue={search}
      // onInputChange={(e, newValue) => handleChanges(newValue)}
      options={usersArr} // doesnt change
      sx={{
        width: 300,
        height: 32,
        display: "flex",
        justifyContent: "start",
        alignItems: "center",
        fontSize: "16px",
        padding: "0px",
        "& .MuiInputBase-root": {
          width: 300,
          height: 32,
          padding: "0px",
          paddingLeft: "10px",
        },
      }}
      renderInput={(params) => {
        return (
          <TextField
            {...params}
            label="Search"
            sx={{
              display: "flex",
              justifyContent: "center", // Center the label horizontally
              alignItems: "center",
              height: 45,
              padding: "0px",
            }}
          />
        );
      }}
    />
  );
}
