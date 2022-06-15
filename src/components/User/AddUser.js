import { useState } from 'react'
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import 'bulma/css/bulma.min.css';

const AddUser = () => {
    const [name, setName] = useState('');
    const [lastname, setLastname] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    
    const navigate = useNavigate();
    
    const saveUser = async (e) => {
        e.preventDefault();
        await axios.post('http://localhost:8080/users',{
            name,
            last_name: lastname,
            username,
            user_pass: password
        });
        navigate('/users');
    }
 
    return (
        <div>
            <form onSubmit={ saveUser }>
                <div className="field">
                    <label className="label">Name</label>
                    <input 
                        className="input"
                        type="text"
                        placeholder="Name"
                        value={ name }
                        onChange={ (e) => setName(e.target.value) }
                    />
                </div>

                <div className="field">
                    <label className="label">Last Name</label>
                    <input 
                        className="input"
                        type="text"
                        placeholder="Last Name"
                        value={ lastname }
                        onChange={ (e) => setLastname(e.target.value) }
                    />
                </div>

                <div className="field">
                    <label className="label">Username</label>
                    <input 
                        className="input"
                        type="text"
                        placeholder="Username"
                        value={username}
                        onChange={ (e) => setUsername(e.target.value) }
                    />
                </div>
 
                <div className="field">
                    <label className="label">Password</label>
                    <input 
                        className="input"
                        type="password"
                        placeholder="Password"
                        value={ password }
                        onChange={ (e) => setPassword(e.target.value) }
                    />
                </div>
 
                <div className="field">
                    <button className="button is-primary">Save</button>
                </div>
            </form>
        </div>
    )
}
 
export default AddUser