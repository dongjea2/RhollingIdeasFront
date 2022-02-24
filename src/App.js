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
import OrderList from './components/profile/order/OrderList.js';
import OrderDetail from './components/profile/order/OrderDetail';
import AccountSet from './components/settings/AccountSet';
import PaymentSet from './components/settings/PaymentSet';
import AddressSet from './components/settings/AddressSet';
import InterestProjectList from './components/profile/interest/InterestProjectList';
import PreLaunchedProjectList from './components/profile/interest/PreLaunchedProjectList';
import FollowingList from './components/profile/follow/FollowingList';
import FollowerList from './components/profile/follow/FollowerList';
import ProjectWrite from './components/project/ProjectWrite';
import OrderPage from './components/order/OrderPage';
import RewardList from './components/project/RewardList';

function App () {

return (
<BrowserRouter>
    <Header />
    <Routes>
        <Route path='/' element={<MainPage/>} />
        <Route path='/discover' element={<DiscoverPage/>} />
        <Route path='/projectdetail/:prodNo/*' element={<ProjectDetail/>} /> 
        <Route path='/projectwrite' element={<ProjectWrite/>}/> 
        <Route path='/rewardlist/:prodNo' element={<RewardList/>}/>

        <Route path='/order/:prodNo/:rewardNo' element={<Order/>} />
        <Route path='/projectdetail/:prodNo/*' element={<ProjectDetail/>} />  
        <Route path='/order/:rewardNo' element={<OrderPage/>} />
        <Route path='*' element={<EmptyPage/>}/>
        <Route path='/signup' element={<Signup/>}/>
        <Route path='/login' element={<Login />}/>
        <Route path='/profile/accountset' element={<AccountSet/>} />
        <Route path='/profile/paymentset' element={<PaymentSet/>} />
        <Route path='/profile/addressset' element={<AddressSet/>} />

        {/* 프로필 메뉴 링크 */}
        <Route path='/orderlist' element={<OrderList/>} />
        <Route path='/orderdetail/:paymentNo' element={<OrderDetail />} />
        <Route path='/interestlist' element={<InterestProjectList />} />
        <Route path='/prelaunchedlist' element={<PreLaunchedProjectList />} />
        <Route path='/following' element={<FollowingList />} />
        <Route path='/following/followers' element={<FollowerList />} />
    </Routes>
</BrowserRouter>
)
}
export default App;
