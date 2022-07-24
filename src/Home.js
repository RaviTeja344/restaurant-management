
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
        await fetch("https://xrd6ufie2i.execute-api.us-east-2.amazonaws.com/dev/menu")
        .then(getResp => getResp.json())
        .then(getResp => {
            setMenuItems(getResp);
        });
    }

    const postItem = async (item)  => {
        await fetch("https://j0h3mkocah.execute-api.us-east-2.amazonaws.com/dev/menu", {
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
        await fetch("https://gbqqzxid1j.execute-api.us-east-2.amazonaws.com/dev/delete/" + item.id, {
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
                <div className="welcome-banner"><h3>Welcome to the  Restaurant!</h3> <a href="javascript:void(0)" onClick={logout}>Logout</a></div>
                <br></br>
                <Menu items={menuItems} role={role} addItem={addItem} editItem={editItem} deleteItem={deleteItem} />
            </> : 'Loading...'
        }

        
        </div>
    );
}
 
export default Home;
