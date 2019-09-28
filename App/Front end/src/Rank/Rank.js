import React from 'react';

const Rank = ({ name, entries }) => {
  return (
    <div>
      <div className='white center f3'>
        {`${name}, your current entry count is...`}
      </div>
      <div className='white center f1'>
        {entries}
      </div>
    </div>
  );
}

export default Rank;