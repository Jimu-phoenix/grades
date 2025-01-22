import React from 'react';
import { useState } from 'react';
import axios from 'axios';
import {useNavigate} from 'react-router-dom'
import './CreateStudents.css'


function CreateStudents(){

    const [studentname, setName] = useState()
    const [math, setMath] = useState()
    const [eng, setEng] = useState()
    const [chich, setChich] = useState()
    const [ps, setPs] = useState()
    const [arts, setArts] = useState()
    const [social, setSocial] = useState()
    const [total, setTotal] = useState()
    const navigate = useNavigate()

    const calcTotal = () => {
        let totalScore = parseInt(math) + parseInt(eng) + parseInt(chich) + parseInt(ps) + parseInt(arts) + parseInt(social)
        console.log(totalScore)
        setTotal(totalScore)
    }

    const clear = () => {
        document.getElementById('studentname').value = '';
        document.getElementById('maths').value = '';
        document.getElementById('chich').value = '';
        document.getElementById('eng').value = '';
        document.getElementById('ps').value = '';
        document.getElementById('arts').value = '';
        document.getElementById('social').value = '';

    }
    
    const submit = (e) => {
        e.preventDefault();
        axios.post("http://localhost:3001/create", 
        {studentname, math, eng, chich, ps, arts, social, total})
        .then(result => {console.log(result)
            navigate("/")
    })
    .catch(err => console.log(err))
    }
    
    return (
        <div className='form-box'>
            <form onSubmit={submit}>
                <div className="input-pair">
                    <label htmlFor="studentname">Name:</label>
                    <input type="text" id="studentname" name="studentname" required 
                    placeholder='Name'
                    onChange={(e) => setName(e.target.value)}/>
                </div>
                <div className="input-pair">
                    <label htmlFor="math">Maths:</label>
                    <input type="number" id="maths" name="maths" required
                    placeholder='Maths' 
                    onChange={(e) => setMath(e.target.value)}/>
                </div>
                <div className = "input-pair">
                    <label htmlFor="chich">Chichewa:</label>
                    <input type="number" id="chich" name="chich" required
                    placeholder='Chichewa' 
                    onChange={(e) => setChich(e.target.value)}/>
                </div>
                <div className = "input-pair">
                    <label htmlFor="eng">English:</label>
                    <input type="number" id="eng" name="eng" required
                    placeholder='English'
                    onChange={(e) => setEng(e.target.value)}/>
                </div>
                <div className = "input-pair">
                    <label htmlFor="ps">Primary Science:</label>
                    <input type="number" id="ps" name="ps" required
                    placeholder='Primary Science' 
                    onChange={(e) => setPs(e.target.value)}/>
                </div>
                <div className = "input-pair">
                    <label htmlFor="arts">Arts:</label>
                    <input type="number" id="arts" name="arts" required
                    placeholder='Arts'
                    onChange={(e) => setArts(e.target.value)}/>
                </div>
                <div className = "input-pair">
                    <label htmlFor="social">Social:</label>
                    <input type="number" id="social" name="social" required
                    placeholder='Social'
                    onChange={(e) => setSocial(e.target.value)}/>
                </div>
                <button type="submit" onClick={calcTotal} className='add'>Add</button>
                
            </form>
            <button className='clear' onClick={clear}>Clear</button>
        </div>
   
    );
};

export default CreateStudents;