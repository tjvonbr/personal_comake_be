import React, { useState, useEffect } from 'react';
import axios from 'axios';

function AddIssue(props) {
  const [createIssue, setCreateIssue] = useState({ title: "", tags: "", location: "", zipCode: localStorage.getItem("zipcode"), user_id: localStorage.getItem("id") });

  // Functionality for Post Request
  const addIssue = data => {
      console.log("passIn data", data);
      let token = JSON.parse(localStorage.getItem('token'))
      let localId = JSON.parse(localStorage.getItem('id'))
      axios
        .post('https://co-make.herokuapp.com/issues', data, {
          headers: {
            Authorization: token
          }
         })
        .then( res => {
          // let thisUser = res.data.filter( user => user.id === localId )
          console.log(res.data)
          setCreateIssue(...createIssue, res.data);
          
      })
        .catch( err => console.log("OH NO AN ERROR HAPPENED", err))
  }

  function handleChange(event) {
    const updatedIssues = { ...createIssue, [event.target.name]: event.target.value };
    console.log(
      "handleChange",
      event.target.name,
      event.target.value,
      updatedIssues
    );
    setCreateIssue(updatedIssues);
  };

  function handleSubmit(event) {
    event.preventDefault();
    console.log("createIssue", createIssue);
    addIssue(createIssue);
    setCreateIssue({ issue_name: "", category: "", description: "", zipCode: localStorage.getItem("zipcode"), user_id: localStorage.getItem("id") });
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <fieldset>
        <div className="signup-header">
          <legend>Create Issue</legend>
        </div>
          <div className="form-group row">
            <label htmlFor="name" className="column-sm-2 col-form-label">
              Project Title
              <div className="col-sm-10">
                <input
                  type="text"
                  className="form-control"
                  name="issue_name"
                  placeholder="Add a title"
                  value={createIssue.issue_name}
                  onChange={handleChange}
                />
              </div>
            </label>
          </div>
          <div className="form-group">
            <label htmlFor="email" className="column-sm-2 col-form-label">
              Category
              <div className="col-sm-10">
                <input
                  type="text"
                  className="form-control"
                  name="category"
                  placeholder="Add relevant tags"
                  value={createIssue.category}
                  onChange={handleChange}
                />
              </div>
            </label>
          </div>
          <div className="form-group">
            <label htmlFor="role" className="column-sm-2 col-form-label">
              Description
              <div className="col-sm-10">
                <input
                  type="text"
                  className="form-control"
                  name="description"
                  placeholder="Please add a description"
                  value={createIssue.description}
                  onChange={handleChange}
                />
              </div>
            </label>
          </div>
            <button type="submit" className="btn btn-post">
              Submit
            </button>
        </fieldset>
      </form>
  )
}

export default AddIssue;