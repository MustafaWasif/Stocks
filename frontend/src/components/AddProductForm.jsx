import { useState } from "react"
import { useNavigate } from "react-router-dom";
import { Form, Button, Alert } from 'react-bootstrap';
import NavBar from "./NavBar";
import Stocks from "../services/routing";

function AddProductForm(){

    const navigate = useNavigate();

    // Product Info
    const [name, setName] = useState("");
    const [id, setId] = useState(""); //is a number
    const [description, setDescription] = useState("");
    const [colour, setColour] = useState("");
    const [size, setSize] = useState("medium"); // default size

    const validSizes = ['small', 'medium', 'large'];

    // success Alert
    const [successAlert, setSuccessAlert] = useState(false);
    
    const handleSizeChange = (event) => {
        const newSize = event.target.value;
        if (validSizes.includes(newSize)) {
          setSize(newSize);
        }
    }

    const handleFormSubmit = async (event) => {
        event.preventDefault();

        const productData = {
            id,
            name,
            description,
            colour,
            size,
        };
      
        try {
            await Stocks.saveProductData(productData);
            setSuccessAlert(true);
            
            // Navigate to MyStore Page after 2 seconds
            setTimeout(() => {
                navigate("/mystore");
            }, 2000);
        }catch (error){
            setSuccessAlert(false);
            console.log(error);
        }

        // console.log('Form submitted!');
        // console.log('Product Name:', name);
        // console.log('Product Id:', id);
        // console.log('Description:', description);
        // console.log('Colour:', colour);
        // console.log('Size:', size);
        
    }

    return(
        <>
            <NavBar />
            <br/>
            <h1 className="mb-4">Product Information Form</h1>
            <div className="container mt-4 mx-4">
                <Form onSubmit={handleFormSubmit}>
                    {successAlert && (
                        <Alert variant="success">
                            Listing saved
                        </Alert>
                    )}
                    <Form.Group controlId="name" className="my-3">
                        <Form.Label className="fw-bold">Product Name</Form.Label>
                        <Form.Control type="string" required value={name} onChange={(e) => setName(e.target.value)}/>
                    </Form.Group>

                    <Form.Group controlId="id" className="my-3">
                        <Form.Label className="fw-bold">Product Id</Form.Label>
                        <Form.Control type="number" min="0" inputMode="numeric" pattern="[0-9]*" required value={id} onChange={(e) => setId(e.target.value)}/>
                    </Form.Group>

                    <Form.Group controlId="description" className="my-3">
                        <Form.Label className="fw-bold">Product Description</Form.Label>
                        <Form.Control type="string" required value={description} onChange={(e) => setDescription(e.target.value)}/>
                    </Form.Group>

                    <Form.Group controlId="colour" className="my-3">
                        <Form.Label className="fw-bold">Product Colour</Form.Label>
                        <Form.Control type="string" required value={colour} onChange={(e) => setColour(e.target.value)}/>
                    </Form.Group>

                    <Form.Group controlId="size" className="my-3">
                        <Form.Label className="fw-bold">Product Size</Form.Label>
                        <Form.Control as="select" value={size} onChange={handleSizeChange}>
                            {validSizes.map((option) => (
                            <option key={option} value={option}>
                                {option}
                            </option>
                            ))}
                        </Form.Control>
                    </Form.Group>


                    <Button className="my-3" variant="primary" type="submit">
                        Save
                    </Button>
                </Form>
            </div>
        </>
    );
}
export default AddProductForm;