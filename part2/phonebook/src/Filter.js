import React from 'react'

const Filter = ({ filterText, handleFilterTextChange }) => (
  <div>
    filter shown with
    <input value={filterText} onChange={handleFilterTextChange} />
  </div>
)

export default Filter
