import React, {useState, useEffect} from 'react';
import './App.css';
import { BrowserRouter, Routes,Route} from "react-router-dom"
import ProjectList from './components/project/Project';
import ProjectDetail from './components/project/ProjectDetail';
import Order from './components/Order';
import EmptyPage from './components/EmptyPage';
import MainPage from './components/mainpage/MainPage';
import DiscoverPage from './components/project/DiscoverPage';

//테스트주석
//테스트주석 브런치 최신화
//테스트주석
function App () {

return (
<BrowserRouter>
    <Routes>
        <Route path='/' element={<MainPage/>} />

        <Route path='/discover' element={<DiscoverPage/>} />
        <Route path='/projectdetail/:prodNo' element={<ProjectDetail/>} />
        <Route path='/order/:prodNo/:rewardNo' element={<Order/>} />
        <Route path='*' element={<EmptyPage/>}/>

    </Routes>
</BrowserRouter>
)
}
export default App;
