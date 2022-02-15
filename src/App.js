import React, {useState, useEffect} from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes,Route} from "react-router-dom"
import ProjectList from './components/Project';
import ProjectDetail from './components/ProjectDetail';
import Order from './components/Order';
import EmptyPage from './components/EmptyPage';

function App () {

return (
<BrowserRouter>
    <Routes>
        <Route path='/' element={ <h1>메인페이지</h1>} />

        <Route path='/discover' element={<ProjectList/>} />
        <Route path='/projectdetail/:prodNo' element={<ProjectDetail/>} />
        <Route path='/order/:prodNo/:rewardNo' element={<Order/>} />
        <Route path='*' element={<EmptyPage/>}/>


    </Routes>
</BrowserRouter>
)
}
export default App;
