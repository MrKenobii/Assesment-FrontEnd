import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import "bulma/css/bulma.min.css";

const EditCustomer = () => {
  const [name, setName] = useState("");
  const [lastname, setLastname] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  const { id } = useParams();

  const updateCustomer = async (e) => {
    e.preventDefault();
    await axios.patch(`http://localhost:8080/customers/${id}`, {
      name,
      last_name: lastname,
      user_name: username,
      email,
    });

    navigate("/customers");
  };

  useEffect(() => {
    getCustomerById();
  }, []);

  const getCustomerById = async () => {
    const response = await axios.get(`http://localhost:8080/customers/${id}`);
    setName(response.data.name);
    setLastname(response.data.last_name);
    setUsername(response.data.user_name);
    setEmail(response.data.email);
  };

  return (
    <div>
      <form onSubmit={updateCustomer}>
        <div className="field">
          <label className="label">Name</label>
          <input
            className="input"
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className="field">
          <label className="label">Last Name</label>
          <input
            className="input"
            type="text"
            placeholder="Last Name"
            value={lastname}
            onChange={(e) => setLastname(e.target.value)}
          />
        </div>

        <div className="field">
          <label className="label">Username</label>
          <input
            className="input"
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        
          <div className="field">
            <label className="label">Email</label>
            <input
              className="input"
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
        

        <div className="field">
          <button className="button is-primary">Update</button>
        </div>
      </form>
    </div>
  );
};

export default EditCustomer;
