import * as React from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getAllUsers } from "../../redux/users";
import { useNavigate } from "react-router-dom";

export default function SearchResultList(props) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [result, setResult] = useState([]);
  const usersArr = useSelector((state) => state.users.users.data);

  useEffect(() => {
    dispatch(getAllUsers());
  }, [dispatch]);

  const getUser = (value) => {
    const results = usersArr?.filter((user) => {
      return (
        value &&
        user &&
        user.firstName &&
        user.firstName.toLowerCase().includes(value)
      );
    });
    setResult(results);
  };

  const handleChanges = (value) => {
    setSearch(value);
    getUser(value);
  };

  const handleSelect = (newValue) => {
    if (newValue) {
      navigate(`/profile/${newValue._id}`);
      setSearch("");
    }
  };

  return (
    <Autocomplete
      getOptionLabel={(result) => `${result?.firstName} ${result?.lastName}`}
      onChange={(e, newValue) => handleSelect(newValue)}
      inputValue={search}
      onInputChange={(e, newValue) => handleChanges(newValue)}
      options={result}
      sx={{
        width: 300,
        height: 40,

        "& .MuiInputBase-root": {
          width: 300,
          height: 40,
          // paddingBottom: 2,
          // marginBottom: 2,
          // paddingTop: 2, // Remove border from input
        },
      }}
      renderInput={(params) => <TextField {...params} label="Search" />}
    />
  );
}
