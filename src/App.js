import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProjectDetail from "./components/project/ProjectDetail";
import Order from "./components/Order";
import EmptyPage from "./components/EmptyPage";
import MainPage from "./components/mainpage/MainPage";
import DiscoverPage from "./components/project/DiscoverPage";
import Signup from "./components/login/Singup";
import Login from "./components/login/Login";
import Header from "./components/header/Header";
import OrderList from "./components/profile/order/OrderList.js";
import OrderDetail from "./components/profile/order/OrderDetail";
import AccountSet from "./components/settings/AccountSet";
import PaymentSet from "./components/settings/PaymentSet";
import AddressSet from "./components/settings/AddressSet";
import InterestProjectList from "./components/profile/interest/InterestProjectList";
import PreLaunchedProjectList from "./components/profile/interest/PreLaunchedProjectList";
import FollowingList from "./components/profile/follow/FollowingList";
import FollowerList from "./components/profile/follow/FollowerList";
import ProjectWrite from "./components/project/ProjectWrite";
import OrderPage from "./components/order/OrderPage";
import RewardList from "./components/project/RewardList";
import Profile from "./components/profile/profile/Profile";
import Logout from "./components/login/Logout";
import RequireAuth from "./components/RequireAuth";
import CreatedList from "./components/profile/created/CreatedList";
import ProfileOrder from "./components/profile/profile/ProfileOrder";
import ProfileFollower from "./components/profile/profile/ProfileFollower";
import ProfileCreated from "./components/profile/profile/ProfileCreated";
import ProfileFollowing from "./components/profile/profile/ProfileFollowing";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/discover" element={<DiscoverPage />} />
        <Route path="/projectwrite" element={<RequireAuth><ProjectWrite /></RequireAuth>} />
        <Route path="/rewardlist/:prodNo" element={<RewardList />} />

        <Route path="/order/:prodNo/:rewardNo" element={<Order />} />
        <Route path="/projectdetail/:prodNo/*" element={<ProjectDetail />} />
        <Route path="/order/:rewardNo" element={<OrderPage />} />
        <Route path="*" element={<EmptyPage />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/profile/accountset" element={<RequireAuth><AccountSet /></RequireAuth>} />
        <Route path="/profile/paymentset" element={<RequireAuth><PaymentSet /></RequireAuth>} />
        <Route path="/profile/addressset" element={<RequireAuth><AddressSet /></RequireAuth>} />

        {/* 프로필 메뉴 링크 */}
        <Route path="/orderlist" element={<RequireAuth><OrderList /></RequireAuth>} />
        <Route path="/orderlist/:orderNo" element={<RequireAuth><OrderDetail /></RequireAuth>} />
        <Route path="/interestlist" element={<RequireAuth><InterestProjectList /></RequireAuth>} />
        <Route path="/prelaunchedlist" element={<RequireAuth><PreLaunchedProjectList /></RequireAuth>} />
        <Route path="/following" element={<RequireAuth><FollowingList /></RequireAuth>} />
        <Route path="/following/followers" element={<RequireAuth><FollowerList /></RequireAuth>} />
        <Route path="/created" element={<RequireAuth><CreatedList /></RequireAuth>} />
        <Route path="/profile/:userUrl" element={<Profile />} />
        <Route path="/profile/:userUrl/following" element={<ProfileFollowing />} />
        <Route path="/profile/:userUrl/order" element={<RequireAuth><ProfileOrder /></RequireAuth>} />
        <Route path="/profile/:userUrl/created" element={<ProfileCreated />} />
        <Route path="/profile/:userUrl/follower" element={<ProfileFollower />} />
        
      </Routes>
    </BrowserRouter>
  );
}
export default App;
