import "../ErrorPageStyles.css";
import { useNavigate } from "react-router-dom";

export default function NotAuthenticated() {

    const navigate = useNavigate();

    const goBack = () => {
        navigate("/")
    }

    return (
        <div className="error-page">
            <h1>Not Authenticated</h1>
            <h2>Sorry you are not authenticated to view this page</h2>
            <button className="btn-primary" onClick={goBack}>Go Back</button>
        </div>
    );
}
