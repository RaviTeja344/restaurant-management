import React, { useState } from 'react';
 
function Login(props) {
  const username = useFormInput('');
  const password = useFormInput('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
 
  const data = async ()  => {
    const got = await fetch("https://j7xac0cmxg.execute-api.us-east-1.amazonaws.com/auth", {
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      body: JSON.stringify({username: username.value, password: password.value}) // body data type must match "Content-Type" header
    });
    const result = await got.json();
    console.log(result);
    if (result.authenticated){
      console.log(result)
      setError('');
      sessionStorage.setItem('userDetails', JSON.stringify(result.userDetails));
      props.history.push('/home');
    } else {
      setError('Usernam/Password invalid');
    }
  }
  
  

  // handle button click of login form
  const handleLogin = async () => {
    data();
    // await fetch("https://j7xac0cmxg.execute-api.us-east-1.amazonaws.com/auth", {
    //         method: 'POST', // *GET, POST, PUT, DELETE, etc.
    //         mode: 'no-cors', // no-cors, *cors, same-origin
    //         cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    //         credentials: 'same-origin', // include, *same-origin, omit
    //         headers: {
    //           'Content-Type': 'application/json',
    //           'Access-Control-Allow-Origin': '*'
    //           // 'Content-Type': 'application/x-www-form-urlencoded',
    //         },
    //         redirect: 'follow', // manual, *follow, error
    //         referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    //         body: JSON.stringify({username: username.value, password: password.value}) // body data type must match "Content-Type" header
    //       })
    //     .then(res => {
    //         console.log(res)
    //           setError('');
    //           sessionStorage.setItem('userDetails', JSON.stringify(res.userDetails));
    //           props.history.push('/home');
    //     });
    
  }
 
  return (
    <div className="login-block">
      <div className="title">Login</div>
      <br /><br />
      <div>
        Username<br />
        <input type="text" {...username} autoComplete="new-password" />
      </div>
      <div style={{ marginTop: 10 }}>
        Password<br />
        <input type="password" {...password} autoComplete="new-password" />
      </div>
      {error && <><small style={{ color: 'red' }}>{error}</small><br /></>}<br />
      <button type="button" onClick={handleLogin}>Submit</button>
      <br />
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
 
export default Login;