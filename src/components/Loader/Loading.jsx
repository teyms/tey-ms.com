import { useEffect, useState } from 'react';
import './loading.css'; // Import your CSS file

function Loading() {
  return (
    <>
      <div className='loading'>
        <div className='spinner'></div>
        <p>Loading...</p>
      </div>
    </>
  );
}

export default Loading;