import React, {useState} from 'react';

import Modal from "react-bootstrap/Modal";
import ModalBody from "react-bootstrap/ModalBody";
import ModalHeader from "react-bootstrap/ModalHeader";
import ModalFooter from "react-bootstrap/ModalFooter";
import ModalTitle from "react-bootstrap/ModalTitle";

import Button from 'react-bootstrap/Button';
 
function Menu(props) {
    const itemNameInput = useFormInput('');
    const priceInput = useFormInput('');
    const idInput = useFormInput('');

    const [show, setShow] = useState(false);
    const [action, setAction] = useState('');


  const handleClose = () => setShow(false);


  const handleOpenAddItem = () => {
    itemNameInput.onChange({target : {value: ''}});
    priceInput.onChange({target : {value: '' }});
    idInput.onChange({target : {value: '' }});

    setShow(true);
    setAction('add');
  };

  const handleOpenEditItem = (item) => {
    itemNameInput.onChange({target : {value: item.itemName}});
    priceInput.onChange({target : {value: item.price }});
    idInput.onChange({target : {value: item.id }});

    setShow(true);
    setAction('edit');
  };


  const addItemOnPopup = async () => {
    await props.addItem({itemName: itemNameInput.value, price: priceInput.value, id: null});
    setShow(false);
  }

  const editItemOnPopup = async () => {
    await props.editItem({itemName: itemNameInput.value, price: priceInput.value, id: idInput.value});
    setShow(false);
  }

  const handleDeleteItem = async (item) => {
    await props.deleteItem({id: item.id});
  }
 
 
  return (
    <div className="menu-items">
        <table>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Price</th>
                    {props.role==='admin' && <th>Action</th>}
                </tr>
            </thead>
            <tbody>
                {
                    props.items.map(item => {
                        return (
                            <tr>
                                <td>{item.itemName}</td>
                                <td>{item.price} $</td>
                                {props.role==='admin' && <td><a href="javascript:void(0)" onClick={() => handleOpenEditItem(item)}>Edit</a>&nbsp;&nbsp;&nbsp; <a href="javascript:void(0)" onClick={() => handleDeleteItem(item)}>Delete</a></td>}
                                
                            </tr>
                        )
                    })
                }

            </tbody>
        </table>
        <br></br>
        <br></br>
        {
            props.role==='admin' && <div className="add-button">
                <Button variant="info" onClick={handleOpenAddItem}>
                    Add Item
                </Button>
            </div>
        }
        

        
        <Modal show={show} onHide={handleClose} animation={false}>
            <ModalHeader>
                <ModalTitle>{action==='add' ? 'Add' : 'Edit'} Item</ModalTitle>
            </ModalHeader>
            <ModalBody>
                <div>
                    Item Name<br />
                    <input type="text" {...itemNameInput} />
                </div>
                <div style={{ marginTop: 10 }}>
                    Price<br />
                    <input type="text" {...priceInput} />
                </div>
            </ModalBody>
            <ModalFooter>
                <Button className="popup-button" variant="secondary" onClick={handleClose}>
                    Cancel
                </Button>
                {action==='add' ? <Button className="popup-button" variant="primary" onClick={addItemOnPopup}>Add</Button> : 
                <Button className="popup-button" variant="primary" onClick={editItemOnPopup}>Edit</Button>}
                
            </ModalFooter>
        </Modal>
        
        
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
 
export default Menu;