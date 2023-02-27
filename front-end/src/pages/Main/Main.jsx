import "./Main.css";
import { useContext, useState } from "react";
import SnackBar from "awesome-snackbar";
import getSnackBarStyles from "../../entities/snackBarStyles";
import { useSelector } from "react-redux";
import {
    fileSizeConverter,
    getFileType,
    getLink,
    isFileSmall,
} from "../../entities/fileDetails";
import Snackbar from "awesome-snackbar";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "../../firebase";
import { createFile } from "../../api/apiCalls";

export default function Main() {
    const [link, setLink] = useState("");
    const [file, setFile] = useState(null);
    const [loading, setLoading] = useState(false);
    const user = useSelector((state) => state.user.currentUser);
    const href = getLink();

    const LINK_CREATE_URL = "/link/";

    const handleChange = (e) => {
        console.log(e.target.files[0]);
        const isSmall = isFileSmall(e.target.files[0]?.size);
        if (!isSmall) {
            new Snackbar("The File Size Should be lower than 1 GB", {
                position: "bottom-right",
                style: getSnackBarStyles(true),
            });
        }
        setFile(e.target.files[0]);
    };

    const copyToClipboard = (t) => {
        
        navigator.clipboard.writeText(t || link);
        return new SnackBar("Copied To Clipboard", {
            position: "bottom-right",
            style: getSnackBarStyles(false),
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!file) {
            return new Snackbar("Not File Submitted", {
                position: "bottom-right",
                style: getSnackBarStyles(true),
            });
        }
        setLoading(true);
        const storageRef = ref(
            storage,
            "files/" + file.name + (Math.random() * 100).toString()
        );
        uploadBytes(storageRef, file)
            .then((snapshot) => {
                console.log("Uploaded a blob or file!");
                console.log(snapshot);
                getDownloadURL(snapshot.ref)
                    .then(async (downloadURL) => {
                        console.log("File available at", downloadURL);
                        setLoading(false);
                        const result = await createFile(
                            file?.name,
                            downloadURL,
                            fileSizeConverter(file?.size),
                            file?.type
                        );
                        setLink(href + "download/" + result.link);
                        console.log(result.link)
                        copyToClipboard(result.link);
                    })
                    .catch(() => {
                        setLoading(false);
                        new Snackbar("Could not get download URL", {
                            position: "bottom-right",
                            style: getSnackBarStyles(true),
                        });
                    });
            })
            .catch((error) => {
                console.log(error);
                setLoading(false);
                new Snackbar("Sorry Can't Upload The File", {
                    position: "bottom-right",
                    style: getSnackBarStyles(true),
                });
            });
    };

    return (
        <main>
            <h1 className="main-heading">G Share</h1>
            <h1 className="main-subheading">Share Your Files Instantly</h1>
            <form className="box" onSubmit={handleSubmit}>
                <h2>
                    Get a download link to share <br />
                    <span>Simple,Fast and Secure</span>
                </h2>

                <label htmlFor="file_upload" className="btn-primary upload sec">
                    Upload File
                </label>
                <input
                    type="file"
                    name="file_upload"
                    id="file_upload"
                    onChange={handleChange}
                />
                <div
                    className="file_details"
                    style={!file ? { display: "none" } : null}
                >
                    <i
                        className={`fa-solid ${
                            file?.type ? getFileType(file?.type) : null
                        }`}
                    ></i>
                    <span>
                        {file?.name} -&nbsp;
                        {fileSizeConverter(file?.size)}
                    </span>
                </div>

                <h3>
                    Upload Files Under <span className="main-color">1 GB</span>
                </h3>
                <button
                    type="submit"
                    htmlFor="file_upload"
                    className="btn-primary full sec"
                >
                    {loading ? (
                        <i
                            className="fa-solid fa-rotate rotate"
                            style={{ fontSize: "inherit", color: "white" }}
                        ></i>
                    ) : (
                        "Get Link"
                    )}
                </button>
                {user ? (
                    <p
                        style={{
                            marginTop: ".5rem",
                        }}
                    >
                        Creating as{" "}
                        <span className="main-light">{user?.email}</span>
                    </p>
                ) : (
                    <p
                        style={{
                            marginTop: ".5rem",
                        }}
                    >
                        Please Login to monitor your files
                    </p>
                )}
                <div
                    className="auth-input-container"
                    style={{
                        marginTop: "2rem",
                        display: `${link ? "" : "none"}`,
                    }}
                >
                    <div className="auth-input-logo">
                        <i class="fa-solid fa-link"></i>
                    </div>
                    <input type="text" className="auth-input" value={link} />
                </div>
                <button
                    type="button"
                    htmlFor="file_upload"
                    className="btn-primary full sec"
                    onClick={() => {copyToClipboard()}}
                    style={{ display: `${link ? "" : "none"}`,marginTop: ".0" }}
                >
                    Copy Link
                </button>
            </form>

            <p
                style={{
                    marginTop: "1rem",
                    textAlign: "center",
                }}
            >
                Made By <span className="main-light">Govind/Govi2020</span>
            </p>
        </main>
    );
}
