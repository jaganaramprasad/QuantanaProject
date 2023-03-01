import 'bootstrap/dist/css/bootstrap.min.css';
import Calendar from 'react-calendar'
import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import axios from 'axios';

const NavBar = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [employeeData, setEmployeeData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const[editTable, setEditTable] = useState(null);
  const [Adata,setData]=useState([])
  const [movieName, setMovieName] = useState("");
  const [releaseDate, setReleaseDate] = useState("");
  const [genre, setGenre] = useState("");
const [query, setQuery] = useState([])
const [value, onChange] = useState(new Date());
  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const CloseModal = () => {
    setIsModalOpen(false);
  };
  const handleChange = (event) => {
    // 👇 Get input value from "event"
    setMovieName(event.target.value);
  }

  const handleChangereleaseDate = (event) => {
    // 👇 Get input value from "event"
    setReleaseDate(event.target.value);
  }

  const handleChangegener = (event) => {
    // 👇 Get input value from "event"
    setGenre(event.target.value);
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    const movieName = e.target.elements.moviename.value;
    console.log()
    const releaseDate = e.target.elements.releaseDate.value;
    const gener = e.target.elements.gener.value;
    console.log(movieName, releaseDate, gener)
    if (editTable !== null) {
      setEmployeeData(
        employeeData.map((employee, index) => {
          if (index === editTable) {
            return { movieName, releaseDate, gener };
          }
          return employee;
        })
      );
    } else {
      setEmployeeData([...employeeData, { movieName, releaseDate, gener }]);
    }
    CloseModal();
  };

  const handleEdit = (index) => {
    setEditTable(index);
    setIsModalOpen(true);
  };


  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredData = employeeData.filter(
    employee =>
      employee.moviename.toLowerCase().includes(searchTerm.toLowerCase()) ||
      // employee.releaseDate.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.gener.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
   useEffect(()=>{
    const getData = async ()=>{
      const responseData = await axios.get("http://localhost:5000/getAllMovie");
      const {tasks} = responseData.data;
      setData(tasks);
    }
    getData();
  },[]);

//Getting all the tasks in the list
console.log("11111111111111111111",Adata)

async function editTask(id){
  handleOpenModal()
  const {data} = await axios.patch(`http://localhost:5000/editMovie/${id}`);
  console.log("222222222222222222222222222222222222",data.moviename);
  <Modal isOpen={isModalOpen} onRequestClose={CloseModal}>
  <h2>Update Employee</h2>
  <form onSubmit={handleSubmit}>
    <div className="form-group">
      <input type="text" className="form-control" placeholder="Name" name="name"  value={data.moviename} onChange={handleChange}/>
      <br/>
    </div>

      <div>
      <Calendar onChange={handleChangereleaseDate} value={value} />
    </div>
    <div className="form-group">
      <input type="text" className="form-control" placeholder="Gender" name="gender" onChange={handleChangegener}/>
      <br/>
    </div>
    
    <button type="submit" className="btn btn-primary" onClick={async ()=>{console.log("ram"); await axios.post('http://localhost:5000/editMovie/:id',{
      moviename:movieName,
      releaseDate:releaseDate,
      genre:genre
    })}}>Submit</button>
    <button type="button " className="btn btn-secondary" onClick={CloseModal}>Close</button>
</form>
</Modal>

}

return (
  <>
  <nav className="navbar navbar-light bg-primary">
    <div className="container-fluid">
      <img src="https://www.aabhishek.com/wp-content/uploads/2020/01/Visa-Company-Logo-Oci-Visa-Center-Logo-Logo-Design-company-USA-London-India-Dubai.jpg" alt="company logo" style={{width:"100px",height:"50px"}} />
      <form className="d-flex">
        <input className="form-control mr-2" type="search" placeholder="Search" aria-label="Search" onChange={(e)=>{
               setQuery(e.target.value);
         }} />
        <button className="btn btn-outline-success" type="submit">Search</button>
      </form> 
      <button className="btn btn-success" onClick={handleOpenModal}>Create</button>
    </div>
  </nav>
  <br/>
    
  <Modal isOpen={isModalOpen} onRequestClose={CloseModal}>
    <h2>Create Movielist</h2>
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <input type="text" className="form-control" placeholder="Name" name="name" onChange={handleChange}/>
        <br/>
      </div>
    
      <label> 
      <h5>Release Date</h5>
        <input type="date" value={releaseDate} onChange={handleChangereleaseDate} max={new Date().toISOString().split("T")[0]} required />
        </label>
    <br/><br/>
      {/* <div className="form-group">
        <input type="text" className="form-control" placeholder="Gender" name="gender" onChange={handleChangegener}/>
        <br/>
      </div> */}
      <div>
          <label>
          <h5>Genre</h5>
            <select value={genre} onChange={handleChangegener} required>
              <option value="">Select Genre</option>
              <option value="sci-fi">Sci-Fi</option>               
              <option value="drama">Drama</option>
             <option value="comedy">Comedy</option>
             {/* Add more genres here */}
           </select>
         </label>
         </div>
        <br/>
      <button type="submit" className="btn btn-secondary" style={{margin:"5px", border:"10px"}}onClick={async ()=>{console.log("shashi"); await axios.post('http://localhost:5000/addNewMovie/',{
        moviename:movieName,
        releaseDate:releaseDate,
        genre:genre
      })}}>Submit</button>
    <button type="button " className="btn btn-primary" style={{margin:"5px", border:"10px"}} onClick={CloseModal}>Close</button>
</form>
</Modal>

<div style={{ padding: "20px",margin: "20px"}}>
<table className="table table-striped">
  <thead>
    <tr>
      <th>#</th>
      <th>moviename</th>
      <th>releaseDate</th>
      <th>genre</th>
      <th>ResponseEdit</th>
    </tr>
  </thead>

  <tbody>
      {Adata.filter(item=> item.name).map((item, index)=>{
        return(
        <tr key={index}>
          <td>{item._id}</td>
          <td>{item.moviename}</td>
          <td>{item.releaseDate}</td>
          <td>{item.gener}</td>
          <tr><a onClick={async()=>{await axios.delete(`http://localhost:5000/deleteMovie/${item._id}`)}}><button type="button" class="btn btn-danger">Delete</button></a> &nbsp; 
          
          {/* <a onClick={()=>handleEdit(index)} ><button>Edit</button></a> */}
          {/* <button className="btn btn-success" onClick={()=>handleEdit(index)}>Edit</button> */}

        <a type="button" class="btn btn-primary" data-toggle="modal" data-target="#exampleModal" onClick={()=>editTask(item._id)}>Edit</a>
        </tr>
        </tr>
        )})}
  </tbody>
</table>
</div>

</>
);
};

export default NavBar;


//     {/* {filteredData.map((employee, index) => (
//       <tr key={index}>
//         <td scope='row'>{index+1}</td>
//         <td>{employee.name}</td>
//         <td>{employee.releaseDate}</td>
//         <td>{employee.gender}</td>
//         <td><button className="btn btn-info" style={{margin:"10px"}} onClick={() => handleEdit(index)}>Edit</button>
//         <button className="btn btn-danger" onClick={() => handleDelete(index)}>Delete</button></td>
//       </tr>
//     ))} */}


// import 'bootstrap/dist/css/bootstrap.min.css';
// import React, { useState } from "react";
// import Modal from "react-modal";

// Modal.setAppElement("#root");

// function Navbar() {
//   const [modalIsOpen, setModalIsOpen] = useState(false);
//   const [movieName, setMovieName] = useState("");
//   const [releaseDate, setReleaseDate] = useState("");
//   const [genre, setGenre] = useState("");

//   function handleSubmit(event) {
//     event.preventDefault();
//     // Handle form submission here
//     console.log("Movie Name:", movieName);
//     console.log("Release Date:", releaseDate);
//     console.log("Genre:", genre);
//     setModalIsOpen(false);
//   }

//   function handleMovieNameChange(event) {
//     setMovieName(event.target.value);
//   }

//   function handleReleaseDateChange(event) {
//     setReleaseDate(event.target.value);
//   }

//   function handleGenreChange(event) {
//     setGenre(event.target.value);
//   }

//   function openModal() {
//     setModalIsOpen(true);
//   }

//   function closeModal() {
//     setModalIsOpen(false);
//   }

//   return (
//     <nav className="navbar">
//       <div className="navbar-brand">
//         <img src="https://example.com/logo.png" alt="Company Logo" />
//       </div>
//       <div className="navbar-menu">
//         <button className="navbar-item" onClick={openModal}>
//           Create Movie
//         </button>
//       </div>
//       <Modal
//         isOpen={modalIsOpen}
//         onRequestClose={closeModal}
//         contentLabel="Create Movie Modal"
//       >
//         <h2>Create Movie</h2>
//         <form onSubmit={handleSubmit}>
//           <label>
//             Movie Name:
//             <input type="text" value={movieName} onChange={handleMovieNameChange} required />
//           </label>
//           <br />
//           <label>
//             Release Date:
//             <input type="date" value={releaseDate} onChange={handleReleaseDateChange} max={new Date().toISOString().split("T")[0]} required />
//           </label>
//           <br />
//           <label>
//             Genre:
//             <select value={genre} onChange={handleGenreChange} required>
//               <option value="">Select Genre</option>
//               <option value="sci-fi">Sci-Fi</option>
//               <option value="drama">Drama</option>
//               <option value="comedy">Comedy</option>
//               {/* Add more genres here */}
//             </select>
//           </label>
//           <br />
//           <button type="submit">Create</button>
//           <button type="button" onClick={closeModal}>Cancel</button>
//         </form>
//       </Modal>
//     </nav>
//   );
// }

// export default Navbar;
