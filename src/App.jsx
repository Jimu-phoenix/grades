import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Students from './Students';
import CreateStudents from './CreateStudents';
import UpdateStudents from './UpdateStudents';
import './App.css';


function App() {
  const [count, setCount] = useState(0)

  return (
    <div>
      
    <BrowserRouter>
    <Routes>
    <Route path='/' element={<Students />}></Route>
    <Route path='/create' element={<CreateStudents />}></Route>
    <Route path='/update/:id' element={<UpdateStudents />}></Route>
    </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App
