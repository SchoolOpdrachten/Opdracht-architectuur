import React, { useContext } from 'react';
import AttractieForm from './AttractieForm';

const VoegAttractieToe = ({ history }) => {
  const handleOnSubmit = async (attractie) => {
    fetch('attractie', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(attractie),
    });
    history.push('/attracties');
  };

  return (
    <React.Fragment>
      <AttractieForm handleOnSubmit={handleOnSubmit} />
    </React.Fragment>
  );
};

export default VoegAttractieToe;
