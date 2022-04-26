
import React, {useState, useEffect} from 'react';

import Menu from './Menu';
 
function Home(props) {

    const [menuItems, setMenuItems] = useState([]);
    const [role, setRole] = useState('');

    const makeUniqueid = (length) => {
        var result           = [];
        var characters       = '0123456789';
        var charactersLength = characters.length;
        for ( var i = 0; i < length; i++ ) {
          result.push(characters.charAt(Math.floor(Math.random() * 
     charactersLength)));
       }
       return result.join('');
    }

    useEffect(() => {
        const userDetails = JSON.parse(sessionStorage.getItem('userDetails'));
        if(userDetails) {
            setRole(userDetails.role);
        }
        getItems();
    }, []);

    const getItems = async () => {
        await fetch("https://0ob4ux1xd6.execute-api.us-east-1.amazonaws.com/BetaTest/")
        .then(getResp => getResp.json())
        .then(getResp => {
            setMenuItems(getResp);
        });
    }

    const postItem = async (item)  => {
        await fetch("https://odu8tdkp0a.execute-api.us-east-1.amazonaws.com/menu", {
          method: 'POST', 
          body: JSON.stringify(item)
        });
        getItems();
    }

    const addItem = async (item) => {
        item.id = makeUniqueid(3);
        await postItem(item);
    }
    const editItem = async (item) => {
        await postItem(item);
    }

    const deleteItem = async (item) => {
        await fetch("https://lfe27d7foa.execute-api.us-east-1.amazonaws.com/delete/" + item.id, {
            method: 'DELETE', 
          })
        getItems();
    }

    const logout = () => {
        sessionStorage.removeItem('userDetails');
        props.history.push('/login');
    }

    return (
        <div>
        

        {
            menuItems.length ? 
            <>
                <div className="welcome-banner"><h3>Welcome to the Cloud Restaurant!</h3> <a href="javascript:void(0)" onClick={logout}>Logout</a></div>
                <br></br>
                <Menu items={menuItems} role={role} addItem={addItem} editItem={editItem} deleteItem={deleteItem} />
            </> : 'Loading...'
        }

        
        </div>
    );
}
 
export default Home;