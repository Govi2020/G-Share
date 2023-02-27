import "../ErrorPageStyles.css";
import { useNavigate } from "react-router-dom";

export default function Page404() {

    const navigate = useNavigate();

    const goBack = () => {
        navigate("/")
    }

    return (
        <div className="error-page">
            <h1>404</h1>
            <h2>Page not found</h2>
            <button className="btn-primary" onClick={goBack}>Go Back</button>
        </div>
    );
}
