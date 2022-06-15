import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import UserList from "./components/User/UserList";
import AddUser from "./components/User/AddUser";
import EditUser from "./components/User/EditUser";
import SignIn from "./components/Auth/SignIn";
import SignUp from "./components/Auth/SignUp";
import Header from "./components/Header/Header";
import CustomerList from "./components/Customer/CustomerList";
import AddCustomer from "./components/Customer/AddCustomer";
import EditCustomer from "./components/Customer/EditCustomer";
function App() {
  return (
      <>
    
    <Router>
    <Header />
    <div className="container">
      <div className="columns">
        <div className="column is-half is-offset-one-quarter">
          <Routes>
            <Route path="/" element={<SignIn />}/>
            <Route path="/users" element={<UserList />}/>
            <Route path="/customers" element={<CustomerList />}/>
            <Route path="/signin" element={<SignIn />}/>
            <Route path="/signup" element={<SignUp />}/>
            <Route path="/users/add" element={<AddUser />} />
            <Route path="/users/edit/:id" element={<EditUser /> } />
            <Route path="/customers/add" element={<AddCustomer />} />
            <Route path="/customers/edit/:id" element={<EditCustomer /> } />
          </Routes>
        </div>
      </div>
    </div>
    </Router>
    </>
  );
}
 
export default App;
