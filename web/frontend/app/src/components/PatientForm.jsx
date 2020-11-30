import React from 'react';

function PatientForm({updateData}) {

  function submitHandeler(event) {
    event.preventDefault();
    updateData({});
  }

  return (
    <form onSubmit={submitHandeler}> 
      <button type="submit">Show</button>
    </form>
  )
}

export default PatientForm;