import { useNavigate } from "react-router-dom";

function NavBar(){
    const navigate = useNavigate();

    const handleViewProductClick = () => {
        navigate("/mystore");
    }

    const handleAddProductClick = () => {
        navigate("add");
    }

    return(
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        <ul className="navbar-nav">
          <li className="nav-item">
            <button className="nav-link btn btn-link" onClick={handleViewProductClick}>View All Products</button>
          </li>
          <li className="nav-item">
            <button className="nav-link btn btn-link" onClick={handleAddProductClick}>
              Add New Product
            </button>
          </li>
        </ul>
      </div>
    </nav>
    );
}
export default NavBar;