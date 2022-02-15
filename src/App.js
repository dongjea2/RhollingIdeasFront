import React, {useState, useEffect} from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes,Route} from "react-router-dom"
import ProjectList from './components/Project';

function App () {

return (
<BrowserRouter>
    <Routes>
        <Route exact path='/' element={ <h1>메인페이지</h1>} />

        <Route path='/discover' element={<ProjectList/>} />


    </Routes>
</BrowserRouter>
)
}
export default App;
