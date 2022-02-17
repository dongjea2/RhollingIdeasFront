import React from 'react';
import './App.css';
import { BrowserRouter, Routes,Route} from "react-router-dom"
import ProjectDetail from './components/project/ProjectDetail';
import Order from './components/Order';
import EmptyPage from './components/EmptyPage';
import MainPage from './components/mainpage/MainPage';
import DiscoverPage from './components/project/DiscoverPage';
import Signup from './components/login/Singup';
import Login from './components/login/Login';
import Header from './components/header/Header';
import OrderList from './components/profile/OrderList.js';
import OrderDetail from './components/profile/OrderDetail';
import InterestProjectList from './components/profile/InterestProjectList';

//테스트주석
//테스트주석 브런치 최신화
//테스트주석
function App () {

return (
<BrowserRouter>
    <Header />
    <Routes>
        <Route path='/' element={<MainPage/>} />
        <Route path='/discover' element={<DiscoverPage/>} />
        <Route path='/projectdetail/:prodNo/*' element={<ProjectDetail/>} />  
        <Route path='/order/:prodNo/:rewardNo' element={<Order/>} />
        <Route path='*' element={<EmptyPage/>}/>
        <Route path='/orderlist' element={<OrderList/>} />
        <Route path='/signup' element={<Signup/>}/>
        <Route path='/login' element={<Login />}/>
        <Route path='/orderdetail/:paymentNo' element={<OrderDetail />} />
        <Route path='/interestlist' element={<InterestProjectList />} />
    </Routes>
</BrowserRouter>
)
}
export default App;
