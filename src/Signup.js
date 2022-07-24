import React, { useState } from 'react';
 
function Signup(props) {
  const username = useFormInput('');
  const password = useFormInput('');
  const repassword = useFormInput('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
 
  const data = async ()  => {
    if (password.value === repassword.value){
        const got = await fetch("https://w6irbgb6a8.execute-api.us-east-2.amazonaws.com/test/signup", {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        body: JSON.stringify({username: username.value, password: password.value}) // body data type must match "Content-Type" header
        });
        const result = await got.status;
        console.log(result);
        if (result === 200){
            console.log(result)
            setError('');
            sessionStorage.setItem('userDetails', JSON.stringify(result.userDetails));
            props.history.push('/login');
        } else {
            setError('Error occured!');
        }
        
    } else {
        setError('Password is not matching!!!');
    }
  }
  
  const handleLog = async () => {
    props.history.push('/login');
  }

  // handle button click of Signup form
  const handleSignup = async () => {
    data();   
  }
 
  return (
    <div className="login-block">
      <div className="title">Signup</div>
      <br /><br />
      <div>
        Usernameeee<br />
        <input type="text" {...username} autoComplete="new-password" />
      </div>
      <div style={{ marginTop: 10 }}>
        Password<br />
        <input type="password" {...password} autoComplete="new-password" />
      </div>
      <div style={{ marginTop: 10 }}>
        Confirm Password<br />
        <input type="password" {...repassword} autoComplete="new-password" />
      </div>
      {error && <><small style={{ color: 'red' }}>{error}</small><br /></>}<br />
      <button type="button" onClick={handleSignup}>Submit</button>
      <br />
      <br />
      <span> Already Member?</span>
      <button type="button" style={{backgroundColor: "#008CBA"}} onClick={handleLog}>Log-in</button>
    </div>
  );
}
 
const useFormInput = initialValue => {
  const [value, setValue] = useState(initialValue);
 
  const handleChange = e => {
    setValue(e.target.value);
  }
  return {
    value,
    onChange: handleChange
  }
}
 
export default Signup;
