import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Modal, Alert } from 'react-bootstrap';
import Stocks from "../services/routing";

function UpdateProductInterface({product, handleCloseCard}) {

    const navigate = useNavigate();

    const [name, setName] = useState(product.name);
    const [description, setDescription] = useState(product.description);
    const [colour, setColour] = useState(product.colour);
    const [size, setSize] = useState(product.size);

    // success Alert
    const [successAlert, setSuccessAlert] = useState(false);

    const handleUpdate = async (event) => {
        event.preventDefault();

        try {
            const updatedProduct = {
              ...product,
              name: name,
              description: description,
              colour: colour,
              size: size
            };
            
            // the updated product gets sent over the API to the backend, where the *existing* product gets updated in the DB
            await Stocks.updateProductData(product.id, updatedProduct);
            
            // The user is alerted that the update was successful
            setSuccessAlert(true);
            
            // The user is redirected - navigate to MyStore Page after 2 seconds
            setTimeout(() => {
                handleCloseCard();
                navigate("/mystore");
            }, 2000);

        } catch (error) {
            setSuccessAlert(false);
            console.log(error);
        }

    }
    return(
        <>
            <Modal show={true} onHide={handleCloseCard}>
                <Modal.Header closeButton>
                    <Modal.Title>Update Product</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="card mx-auto" style={{ maxWidth: '500px' }}>
                        <div className="card-body">
                            <form onSubmit={handleUpdate}>
                                {successAlert && (<Alert variant="success"> Product Updated </Alert>)}
                                <div className="form-group">
                                    <label htmlFor="name">Name</label>
                                    <input type="text" className="form-control" id="name" value={name} onChange={(e) => setName(e.target.value)} />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="description">Description</label>
                                    <input type="text" className="form-control" id="description" value={description} onChange={(e) => setDescription(e.target.value)} />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="colour">Colour</label>
                                    <input type="text" className="form-control" id="colour" value={colour} onChange={(e) => setColour(e.target.value)}/>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="size">Size</label>
                                    <select className="form-control" id="size" value={size} onChange={(e) => setSize(e.target.value)}>
                                        <option value="small">Small</option>
                                        <option value="medium">Medium</option>
                                        <option value="large">Large</option>
                                    </select>
                                </div>
                                <br/>
                                <button type="submit" className="btn btn-outline-dark bg-warning">Update</button>
                            </form>
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                </Modal.Footer>
            </Modal>
         </>
         
    );   

}

export default UpdateProductInterface;