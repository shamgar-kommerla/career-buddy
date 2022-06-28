import React from 'react'
import { isAuthenticated } from '../auth'

const AdminProfile = () => {
  
  console.log(isAuthenticated().professor);
  const {_id, name, email, role,photo, designation,department, emplId} = isAuthenticated().professor;

  return (
    <section>
      <div className="container">
        <div className="c1">
            <div className="picture">
              <img src={photo} alt="photo" />
            </div>
        </div>
        <div className="c2">
          <div className="details">
            <div className="empid">
              <p><span>Employee Id: </span>{emplId}</p>
            </div>
            <div className="name">
              <p><span>Name: </span>{name}</p>
            </div>
            <div className="name">
              <p><span>Designation: </span>{designation}</p>
            </div>
            <div className="name">
              <p><span>Department: </span>{department}</p>
            </div>         
            <div className="name">
              <p><span>email ID: </span>{email}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default AdminProfile