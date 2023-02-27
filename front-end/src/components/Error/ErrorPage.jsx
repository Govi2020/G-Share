import "../ErrorPageStyles.css";
import { useNavigate } from "react-router-dom";

export default function ErrorPage() {

    const navigate = useNavigate();

    const goBack = () => {
        navigate("/")
    }

    return (
        <div className="error-page">
            <h1>Sorry Some Error Occurred!</h1>
            <h2>We can't get your page</h2>
            <button className="btn-primary" onClick={goBack}>Go Back</button>
        </div>
    );
}
