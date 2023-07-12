import { Card, Button } from 'react-bootstrap';
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import NavBar from "./NavBar";
import Stocks from "../services/routing";
import UpdateProductInterface from "./UpdateProductInterface";
import DeleteProductInterface from "./DeleteProductInterface";


// function ViewIndividualProduct({product, handleCloseCard}){

function ViewIndividualProduct(){

    const { productId } = useParams();
    const [product, setProduct] = useState(null);

    const [updateButtonClicked, setUpdateButtonClicked] = useState(false);
    const [deleteButtonClicked, setDeleteButtonClicked] = useState(false);

    function handleCloseCard(){
        setUpdateButtonClicked(false);
        setDeleteButtonClicked(false);
    }

    useEffect(() => {
        const getOneProduct = async () => {
          try {
            // Fetch single product based on productId
            const res = await Stocks.getProduct(productId);
            setProduct(res.data);
          } catch (error) {
            console.log(error);
          }
        };
    
        getOneProduct();
    }, [productId]);

    if (!product) {
        return null;
    }

    const handleUpdateClick = (product) => {
        // Handle update action - Store product info and set state for button click to true to use in another component
        setProduct(product);
        setUpdateButtonClicked(true);
        console.log("View product:", product);
        console.log("Update product:", productId);
    };
    
    const handleDeleteClick = () => {
        // Handle delete button click - Store product info and set state for button click to true to use in another component
        setProduct(product);
        setDeleteButtonClicked(true);
        console.log("Delete product:", productId);
    };

    return(
        <>
            <NavBar />
            {/* If button clicked, then load the respective component */}
            {updateButtonClicked && <UpdateProductInterface product={product} handleCloseCard={handleCloseCard}/>}
            {deleteButtonClicked && <DeleteProductInterface product={product} handleCloseCard={handleCloseCard}/>}
            
            <div
                className="d-flex justify-content-center align-items-center"
                style={{ height: "100vh" }}
            >   
                <div style={{ maxWidth: "500px", width: "100%" }}>
                        <Card>
                            <Card.Body>
                                <Card.Title style={{ fontSize: "40px" }}>{product.name}</Card.Title>
                                <Card.Text><b>ID:</b> {product.id}</Card.Text>
                                <Card.Text><b>Description:</b> {product.description}</Card.Text>
                                <Card.Text><b>Colour:</b> {product.colour}</Card.Text>
                                <Card.Text><b>Size:</b> {product.size}</Card.Text>
                                <Button variant="warning" onClick={() => handleUpdateClick(product)}>Update</Button>
                                <Button variant="danger" onClick={() =>handleDeleteClick(product)}>Delete</Button>
                            </Card.Body>
                        </Card>
                </div>
            </div>
        
        </>
    )

}
export default ViewIndividualProduct;