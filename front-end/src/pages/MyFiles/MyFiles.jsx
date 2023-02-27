import SnackBar from "awesome-snackbar";
import React, { useState } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { deleteFile, getUserFiles } from "../../api/apiCalls";
import ErrorPage from "../../components/Error/ErrorPage";
import Loading from "../../components/Loading/Loading";
import { getLink } from "../../entities/fileDetails";
import getSnackBarStyles from "../../entities/snackBarStyles";
import "./MyFiles.css";

export default function MyFiles() {
    const user = useSelector((state) => state.user.currentUser);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [files, setFiles] = useState([]);
    const href = getLink();
    useEffect(() => {
        getUserFiles(setLoading, setFiles);
    }, []);

    const copyToClipboard = (value) => {
        console.log(value);
        navigator.clipboard.writeText(value);
        return new SnackBar("Copied To Clipboard", {
            position: "bottom-right",
            style: getSnackBarStyles(false),
        });
    };


    if (error) {
        return <ErrorPage />;
    }

    return (
        <div className="my_links">
            <table>
                <thead style={{ borderTop: "4px solid #00ff93" }}>
                    <tr>
                        <td>Filename</td>
                        <td>URL</td>
                        <td>Actions</td>
                    </tr>
                </thead>
                <tbody>
                    {files.map((file) => {
                        return (
                            <tr>
                                <td>{file.filename}</td>
                                <td
                                    onClick={() => {
                                        copyToClipboard(
                                            href + "download/" + file.link
                                        );
                                    }}
                                >
                                    {href + "download/" + file.link}
                                </td>
                                <td
                                    style={{
                                        textAlign: "center",
                                        cursor: "pointer",
                                        color: "rgb(0, 255, 219)",
                                    }}
                                >
                                    <i
                                        class="fa-regular fa-trash-can"
                                        style={{
                                            marginInline: "1rem",
                                            color: "red",
                                        }}
                                        onClick={async () => {
                                            await deleteFile(file._id,setLoading,setFiles);
                                            getUserFiles(setLoading, setFiles);
                                        }}
                                    ></i>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
            <button
                className="btn-primary"
                type="submit"
                disabled={loading}
                onClick={() => {
                    getUserFiles(setLoading, setFiles);
                }}
            >
                {loading ? (
                    <i className="fa-solid fa-rotate rotate"></i>
                ) : (
                    "Refresh"
                )}
            </button>
        </div>
    );
}
