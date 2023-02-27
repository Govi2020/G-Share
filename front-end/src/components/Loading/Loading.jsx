import React from "react";

export default function Loading() {
    return (
        <div
            style={{
                width: "100vw",
                height: "100vh",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
            }}
        >
            <i
                className="fa-solid fa-rotate rotate"
                style={{ fontSize: "3rem", color: "#0f1cf3" }}
            ></i>
        </div>
    );
}
