import React, {useState} from 'react';
import axios from 'axios';
import {Link} from  'react-router-dom';
import styled from 'styled-components';
import background from '../img/background.jpg';
import logo from '../img/logo.png';

const SignUpContainer = styled.div`
    height: 100vh;
    background-image: url(${background});
    background-size: cover;
    background-position: center;
    display: flex;
    justify-content: center;
    align-items: center;
    
    .container {
        height: 475px;
        width: 441px;
        background: white;
        border-radius: 5px;
        box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;

        img {
            height: 64px;
            width: 64px;
        }

        h1 {
            margin-bottom: 16px;
            font-size: 32px;
            font-weight: 700;
            color: #484848;
        }
        
        form {
            width: 377px;
            margin:  0 auto;
            display: flex;
            flex-direction: column;
            justify-content: center;
            
            label {
                font-size: 16px;
                font-weight: 500;
                color: #484848;
            }

            input {
                padding: 8px 16px;
                border: 1px solid darkgray;
                border-radius: 3px;
                outline: none;
                font-family: 'Quicksand', sans-serif;
                font-size: 16px;
                font-weight: 500;
                color: #484848;
            }

            .password {
                margin-top: 8px;
            }

            .error {
                font-size: 14px;
                font-weight: 500;
                color: red;
            }
            
            button {
                padding: 12px;
                margin-top: 16px;
                margin-bottom: 8px;
                background: linear-gradient(to right, #49708A, #88ABC2);
                border: none;
                border-radius: 3px;
                outline: none;
                font-family: 'Quicksand', sans-serif;
                font-size: 16px;
                font-weight: 500;
                color: white;
                cursor: pointer;
                transition: 0.25s;

                :hover {
                    opacity: 0.9;
                }
            }
        }
        
        a {
            text-decoration: none;
            
            .signin {
                font-size: 14px;
                font-weight: 500;
                color: #484848;
                cursor: pointer;
                transition: 0.25s;
    
                :hover {
                    opacity: 0.75;
                }
            }
        }
    }
`

const SignUp = props => {
    const [input, setInput] = useState({
        email: '',
        password: ''
    });
    const [error, setError] = useState('');
    
    const onChange = event => {
        setInput({
            ...input,
            [event.target.name]: event.target.value
        });
    };

    const onSubmit = event => {
        event.preventDefault();
        axios.post('https://air-bnb-optimal-price-4.herokuapp.com/api/auth/register', input)
            .then(response => {
                setInput({
                    email: '',
                    password: ''
                });
                props.history.push('/');
            })
            .catch(error => setError(error));
    };

    return (
        <SignUpContainer>
            <div className='container'>
                <img src={logo} alt='opti logo'/>
                <h1>Sign Up</h1>

                <form autoComplete='off' spellCheck='false' onSubmit={onSubmit}>
                    <label htmlFor='email'>Username</label>
                    <input name='email' type='text' placeholder='Enter username' value={input.email} onChange={onChange} minLength='5'/>

                    <label className='password' htmlFor='password'>Password</label>
                    <input name='password' type='password' placeholder='Enter password' value={input.password} onChange={onChange} minLength='5'/>

                    {error !== '' && <p className='error'>Username taken</p>}

                    <button type='submit'>Sign Up</button>
                </form>

                <Link to='/'><p className='signin'>Already have an account? Sign In</p></Link>
            </div>
        </SignUpContainer>
    );
};

export default SignUp;