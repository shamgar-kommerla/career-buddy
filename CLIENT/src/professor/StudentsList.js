import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { isAuthenticated } from '../auth';
import { blockStudent, demoteStudent, getAllStudents, promoteStudent, unBlockStudent } from './helper/studenthelper';


const StudentsList = () => {


    const [students, setStudents] = useState([]);
    const navigate = useNavigate();

    const {token} = isAuthenticated();
    const {_id} = isAuthenticated().professor;

    const preload = () => {
        const {token} = isAuthenticated();
        const {_id} = isAuthenticated().professor;
        getAllStudents(_id, token)
        .then(data => {
            if(data.error){
                console.log(data.error);
            }else{
                setStudents(data);
            }
        })
        .catch(err => console.log(err))
    }

    useEffect(() => {
        preload();
    },[]);

    // console.log(students);
    const handleDemote = (studentId) => {
        // console.log({studentId,_id,token});
        demoteStudent(studentId, _id, token)
        .then(data => {
            if(data.error){
                console.log(data.error);
            }else{
                console.log(data);
            }
        })
        .catch(err => console.log(err));
    }


  return (
    <section className="student-table-section">
        <center>
            <h1>
                List of students
            </h1>
        </center>
        <div className="student-table-container">
            <table>
                <tr>
                    <th>Enrollment</th>
                    <th>Name</th>
                    <th>Dept</th>
                    <th>email</th>
                    <th>grad. year</th>
                    <th>Options</th>
                </tr>
                {
                    students.map(student => {
                        return (
                            <tr key={student._id}>
                                <td>{student.enrl}</td>
                                <td>{student.name}</td>
                                <td>{student.dept}</td>
                                <td>{student.email}</td>
                                <td>{student.gradYear}</td>
                                <td>
                                    {
                                        student.role === 0 && (
                                            <button className="promote" onClick={() => promoteStudent(student._id, _id,token)}>promote</button>
                                        )
                                    }
                                    {   
                                        student.role === 1 && (
                                            <button className="demote" onClick={() => handleDemote(student._id)}>deomte</button>
                                        )

                                    }
                                    {
                                        student.role === -1 && (
                                            <button className="un-block" onClick={() => unBlockStudent(student._id, _id,token)}>unblock</button>
                                        )
                                    }
                                    {
                                        student.role !== -1 && (
                                            <button className="block" onClick={() => blockStudent(student._id, _id,token)}>block</button>
                                        )
                                    }
                                </td>
                            </tr>
                        )
                    })
                }
                
            </table>
        </div>
    </section>
  )
}

export default StudentsList