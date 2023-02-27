import React, { useState } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getFile, getUser } from "../../api/apiCalls";
import ErrorPage from "../../components/Error/ErrorPage";
import Loading from "../../components/Loading/Loading";
import { fileSizeConverter, getFileType } from "../../entities/fileDetails";

export default function Downloard() {
    const { id } = useParams();
    const user = useSelector((state) => state.user.currentUser);
    const [file, setFile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [fileUser, setFileUser] = useState(null);

    useEffect(() => {
        const fetchFile = async () => {
            setLoading(true);
            try {
                const result = await getFile(id);
                setFile(result);
                if (result.createdBy) {
                    const newUser = await getUser(result.createdBy);
                    setFileUser(newUser);
                }
            } catch (err) {
                setError(true);
            } finally {
                setLoading(false);
            }
        };
        fetchFile();
    }, []);

    if (loading) {
        return <Loading />;
    }
    if (error) {
        return ErrorPage;
    }

    return (
        <main>
            <h1 className="main-heading">G Share</h1>
            <h1 className="main-subheading">Share Your Files Instantly</h1>
            <form className="box">
                <h2>
                    Download The File
                    <br />
                    <span>Simple,Fast and Secure</span>
                </h2>
                <div className="file_details" style={{ marginTop: "1rem" }}>
                    <i
                        className={`fa-solid ${
                            file?.type ? getFileType(file?.type) : null
                        }`}
                    ></i>
                    <span>
                        {file?.filename} -&nbsp;
                        {file?.size}
                    </span>
                </div>
                {fileUser ? (
                    <h3>
                        File Created By
                        <span className="main-color">{fileUser.email}</span>
                    </h3>
                ) : null}
                <a
                    href={file.url}
                    download="new"
                    className="btn-primary full sec"
                >
                    Download
                </a>
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
