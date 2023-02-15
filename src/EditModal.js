import React, { useState } from "react";

const EditModal = (props) => {
  const [record, setRecord] = useState(props.record);

  const handleChange = (event) => {
    setRecord({ ...record, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    props.updateRecord(record);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          value={record.name}
          onChange={handleChange}
        />
        <input
          type="text"
          name="email"
          value={record.email}
          onChange={handleChange}
        />
        <button type="submit">Update</button>
      </form>
    </div>
  );
};

export default EditModal;
