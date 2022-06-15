import { useState, useEffect } from "react";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import axios from "axios";
import { Link } from "react-router-dom";
import "bulma/css/bulma.min.css";

const CustomerList = () => {
  const [customers, setCustomers] = useState([]);
  const [checked, setChecked] = useState([]);
  const [status, setStatus] = useState("Submit");
  useEffect(() => {
    getCustomers();
  }, []);

  const isChecked = (item) =>
    checked.includes(item) ? "checked-item" : "not-checked-item";
  const checkedItems = checked.length
    ? checked.reduce((total, item) => {
        return total + ", " + item;
      })
    : "";
  const handleCheck = (event) => {
    var updatedList = [...checked];
    if (event.target.checked) {
      updatedList = [...checked, event.target.value];
    } else {
      updatedList.splice(checked.indexOf(event.target.value), 1);
    }
    setChecked(updatedList);
  };

  const getCustomers = async () => {
    const response = await axios.get("http://localhost:8080/customers");
    setCustomers(response.data);
  };

  const deleteCustomer = async (id) => {
    await axios.delete(`http://localhost:8080/customers/${id}`);
    getCustomers();
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("Sending...");
    const { message } = e.target.elements;
    let details = {
      message: message.value,
      checkedItems,
    };
    let response = await fetch("http://localhost:8080/customers/email", {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify(details),
    });
    setStatus("Submit");
    let result = await response.json();
    alert(result.status);
  }

  return (
    <div>
      <Link to="/customers/add" className="button is-primary mt-2">
        Add New
      </Link>

      <table className="table is-striped is-fullwidth">
        <thead>
          <tr>
            <th>No</th>
            <th>Name</th>
            <th>Last Name</th>
            <th>Username</th>
            <th>E-mail</th>
          </tr>
        </thead>
        <tbody>
          {customers.map((customer, index) => (
            <tr key={customer.id}>
              <input
                value={customer.email}
                type="checkbox"
                onChange={handleCheck}
              />
              <td>{index + 1}</td>
              <td>{customer.name}</td>
              <td>{customer.last_name}</td>
              <td>{customer.user_name}</td>
              <td>{customer.email}</td>

              <td>
                <Link
                  to={`/customers/edit/${customer.id}`}
                  className="button is-small is-info"
                >
                  Edit
                </Link>
                <button
                  onClick={() => deleteCustomer(customer.id)}
                  className="button is-small is-danger"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Email:</label>
          <div>{checkedItems}</div>
        </div>
        <div>
          <label htmlFor="message">Message:</label>
          <textarea id="message" required />
        </div>
        <button type="submit">{status}</button>
      </form> */}
      <div>{`Items checked are: ${checkedItems}`}</div>
      {/* <Box
      component="form"
      sx={{
        '& .MuiTextField-root': { m: 1, width: '25ch' },
      }}
      noValidate
      autoComplete="off"
    >

      <div>
        <TextField
          label="Text"
          id="filled-size-normal"
          defaultValue=""
          variant="filled"
        />
      </div>
      <Button variant="contained" onClick={handleForm}>Contained</Button>
    </Box> */}
      <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="message">Message:</label>
        <textarea id="message" required />
      </div>
      <button type="submit">{status}</button>
    </form>
      
    </div>
  );
};

export default CustomerList;
