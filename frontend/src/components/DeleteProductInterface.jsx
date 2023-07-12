import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Modal, Alert } from 'react-bootstrap';
import Stocks from "../services/routing";

function DeleteProductInterface({product, handleCloseCard}) {

    const navigate = useNavigate();

    // success Alert
    const [successAlert, setSuccessAlert] = useState(false);

    const handleDelete = async (event) => {
        event.preventDefault();

        try {
            await Stocks.deleteProductData(product.id);
            // Set success alert
            setSuccessAlert(true);
            
            // Navigate to MyStore Page after 2 seconds
            setTimeout(() => {
                handleCloseCard();
                navigate("/mystore");
            }, 2000);
        } catch (error) {
            console.log(error);
        }

    }
    return(
        <>
            <Modal show={true} onHide={handleCloseCard}>
                <Modal.Header closeButton>
                    <Modal.Title>Delete Product</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="card mx-auto" style={{ maxWidth: '500px' }}>
                        <div className="card-body">
                            {successAlert && (<Alert variant="success"> Product Deleted </Alert>)}
                            <p>Name: {product.name}</p>
                            <p>ID: {product.id}</p>
                            <p>Description: {product.description}</p>
                            <p>Colour: {product.colour}</p>
                            <p>Size: {product.size}</p>
                        </div>
                        
                    </div>
                    <button type="submit" className="btn btn-outline-dark bg-danger" onClick={handleDelete}>Delete</button>
                            
                </Modal.Body>
                <Modal.Footer>
                </Modal.Footer>
            </Modal>
         </>
         
    );
    
}

export default DeleteProductInterface;