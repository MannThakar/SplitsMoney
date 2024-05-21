/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import "./App.css";
import Otp from "./component/pages/otp";
import SignIn from "./component/pages/signin";
import { Routes, Route, useParams } from "react-router-dom";
import SignUp from "./component/pages/signup";
import Home from "./component/pages/home";
import PageNotFound from "./component/pages/pagenotfound";
import Groups from "./component/HeroSection/group";
import Friends from "./component/HeroSection/friends";
import Account from "./component/HeroSection/account";
import CreateGroup from "./component/HeroSection/creategroup";
import PrivateRoute from "./component/auth/privateroute";
import GroupInfo from "./component/HeroSection/groupinfo";
import AddExpense from "./component/HeroSection/addexpense";
import Settings from "./component/HeroSection/settings";
import GroupInvite from "./component/pages/groupinvite";
import { UserProvider } from './component/utils/usercontext'

function App() {
  return (
    <UserProvider>
      <Routes>
        <Route>
          <Route path="/otp" element={<Otp />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          {/* <Route path="*" element={<PageNotFound />} /> */}
          <Route path='/group-invite/:token' element={<GroupInvite />}></Route>
          <Route element={<PrivateRoute />}>
            <Route path="/groups">
              <Route path=":id" element={<GroupInfo />} />
              <Route path=":id/settings" element={<Settings />} />
            </Route>
            <Route path="/groupinfo/:id" element={<GroupInfo />} />
            <Route path="/addexpense" element={<AddExpense />} />
            <Route path="/groups/creategroup" element={<CreateGroup />} />
            <Route path="/group" element={<Groups />} />
            <Route path="/home" element={<Home />}></Route>
            <Route path="/accounts" element={<Account />} />
            <Route path="/friends" element={<Friends />} />
            <Route path="/settings" element={<Settings />} />
          </Route>
        </Route>
      </Routes>
    </UserProvider>
  );
}
export default App;
