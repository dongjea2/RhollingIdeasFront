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
import ProfileSet from './components/settings/ProfileSet';
import AccountSet from './components/settings/AccountSet';
import PaymentSet from './components/settings/PaymentSet';
import AddressSet from './components/settings/AddressSet';
import ProjectWrite from './components/project/ProjectWrite';


function App () {

return (
<BrowserRouter>
    <Header />
    <Routes>
        <Route path='/' element={<MainPage/>} />
        <Route path='/discover' element={<DiscoverPage/>} />
        <Route path='/projectdetail/:prodNo/*' element={<ProjectDetail/>} /> 
        <Route path='/projectwrite' element={<ProjectWrite/>}/> 
        <Route path='/order/:prodNo/:rewardNo' element={<Order/>} />
        <Route path='*' element={<EmptyPage/>}/>
        <Route path='/orderlist' element={<OrderList/>} />
        <Route path='/signup' element={<Signup/>}/>
        <Route path='/login' element={<Login />}/>
        <Route path='/orderdetail/:paymentNo' element={<OrderDetail />} />
        <Route path='/interestlist' element={<InterestProjectList />} />
        <Route path='/profile/profileset' element={<ProfileSet/>} />
        <Route path='/profile/accountset' element={<AccountSet/>} />
        <Route path='/profile/paymentset' element={<PaymentSet/>} />
        <Route path='/profile/addressset' element={<AddressSet/>} />
    </Routes>
</BrowserRouter>
)
}
export default App;
