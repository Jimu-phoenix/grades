import React from 'react';
import { useState } from 'react';
import axios from 'axios';
import {useNavigate} from 'react-router-dom'
import {useEffect} from 'react'
import { useParams } from 'react-router-dom';

function UpdateStudents(){


    const {id} = useParams()
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

    useEffect(() => {
        axios.get('http://localhost:3001/getUser/'+id)
        .then(res => {console.log(res.data)
            setName(res.data.studentname)
            setMath(res.data.math)
            setEng(res.data.eng)
            setChich(res.data.chich)
            setPs(res.data.ps)
            setArts(res.data.arts)
            setSocial(res.data.social)
        })
        .catch(err => console.log(err)) 
        }, [])

        const update = (e) => {
            e.preventDefault();
            axios.put("http://localhost:3001/update/"+id, 
            {studentname, math, eng, chich, ps, arts, social, total})
            .then(result => {console.log(result)
                navigate("/")
        })
        .catch(err => console.log(err))
    }



    return ( <div className='form-box'>
        <form onSubmit={update}>
            <div className="input-pair">
                <label htmlFor="studentname">Name:</label>
                <input type="text" id="studentname" name="studentname" required 
                // placeholder='Name'
                value={studentname}
                onChange={(e) => setName(e.target.value)}/>
            </div>
            <div className="input-pair">
                <label htmlFor="math">Maths:</label>
                <input type="number" id="maths" name="maths" required
                placeholder='Maths' 
                value={math}
                onChange={(e) => setMath(e.target.value)}/>
            </div>
            <div className = "input-pair">
                <label htmlFor="chich">Chichewa:</label>
                <input type="number" id="chich" name="chich" required
                placeholder='Chichewa'
                value={chich} 
                onChange={(e) => setChich(e.target.value)}/>
            </div>
            <div className = "input-pair">
                <label htmlFor="eng">English:</label>
                <input type="number" id="eng" name="eng" required
                placeholder='English'
                value={eng}
                onChange={(e) => setEng(e.target.value)}/>
            </div>
            <div className = "input-pair">
                <label htmlFor="ps">Primary Science:</label>
                <input type="number" id="ps" name="ps" required
                placeholder='Primary Science'
                value={ps} 
                onChange={(e) => setPs(e.target.value)}/>
            </div>
            <div className = "input-pair">
                <label htmlFor="arts">Arts:</label>
                <input type="number" id="arts" name="arts" required
                placeholder='Arts'
                value={arts}
                onChange={(e) => setArts(e.target.value)}/>
            </div>
            <div className = "input-pair">
                <label htmlFor="social">Social:</label>
                <input type="number" id="social" name="social" required
                placeholder='Social'
                value={social}
                onChange={(e) => setSocial(e.target.value)}/>
            </div>
            <button type="submit" onClick={calcTotal} className='add'>Add</button>
            
        </form>
        {/* <button className='clear' onClick={clear}>Clear</button> */}
    </div>
    );
};

export default UpdateStudents;