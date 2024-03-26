import React from 'react';

const SearchResultList = (result) => {
  return (
    <div className='result-list'>
    {result.map((data)=>{
      return <div key={result._id}>{data.firstName} {result.lastName}</div>
    })}
    </div>
  );
}

export default SearchResultList;
