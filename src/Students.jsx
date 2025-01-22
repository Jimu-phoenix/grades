import { useEffect } from 'react';
import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom'
import './Students.css';
import axios from 'axios'

function Students(){
    const [students, setStudents] = useState([]);
    

    useEffect(() => {
        axios.get('http://localhost:3001')
        .then(res => setStudents(res.data))
        .catch(err => console.log(err)) 
        }, [])






        let sortedStudents = students
        
        const sortStudents = () => {
            let swapped = true
            while(swapped){
                swapped = false
                for(let i = 0;i < (sortedStudents.length - 1);i++){
                    
                    if(sortedStudents[i+1].total < sortedStudents[i].total){
                        swapped = true
                        let less = sortedStudents[i]
                        less = sortedStudents[i+1]
                        sortedStudents[i+1] = sortedStudents[i]
                        sortedStudents[i] = less
                    }
                    setStudents(sortedStudents)
                }
            }
            window.location.reload()
        }
        const deleteStudent = (id) => {
            axios.delete('http://localhost:3001/deleteStudent/'+id)
            .then(res => {console.log(res)
                window.location.reload()
            })
            .catch(err => console.log(err))
        }
        function exportTableToCSV(filename) {
            var csv = [];
            var rows = document.querySelectorAll("table tr");
            for (var i = 0; i < rows.length; i++) {
                var row = [], cols = rows[i].querySelectorAll("td, th");
                for (var j = 0; j < cols.length; j++) 
                    row.push(cols[j].innerText);
                csv.push(row.join(","));        
            }
            downloadCSV(csv.join("\n"), filename);
        }
        function downloadCSV(csv, filename) {
            var csvFile;
            var downloadLink;
            csvFile = new Blob([csv], {type: "text/csv"});
            downloadLink = document.createElement("a");
            downloadLink.download = filename;
            downloadLink.href = window.URL.createObjectURL(csvFile);
            downloadLink.style.display = "none";
            document.body.appendChild(downloadLink);
            downloadLink.click();
        }
       


    return (
        <div>
            {sortStudents}
            <div className="top">
            <h1>Students List</h1>
            <button onClick={sortStudents}>Sort</button>
            </div>
            <table id='studentsTable'>
                <thead>
                    <tr key="header">
                        <th>Name</th>
                        <th>English</th>
                        <th>Mathematics</th>
                        <th>Science</th>
                        <th>Chichewa</th>
                        <th>Social</th>
                        <th>Arts</th>
                        <th>Total</th>

                    </tr>
                </thead>
                <tbody>
                    
                    {students.map((student) => {
                        return (<tr key={student._id }>
                            {console.log(student._id)}
                        <td>{student.studentname}</td>
                        <td>{student.eng}</td>
                        <td>{student.math}</td>
                        <td>{student.ps}</td>
                        <td>{student.chich}</td>
                        <td>{student.social}</td>
                        <td>{student.arts}</td>
                        <td>{student.total}</td>
                        <td><button onClick={() => window.location.href = `/update/${student._id}`} className='update'>Update</button></td>
                        <td><button className='delete' onClick={(e) => deleteStudent(student._id)}>Delete</button></td>
                                </tr> )
                    }
                        
                    )}
                </tbody>
            </table>
            <button onClick={() => window.location.href = `/Create`}>
                Add Student
            </button>
            <button id='export'>Export</button>
            <button onClick={() => exportTableToCSV('students.csv')}>Download</button>
        </div>
    );
};

export default Students;