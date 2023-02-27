import React, { useContext, useState } from "react";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    PointElement,
    LineElement,
    ArcElement,
} from "chart.js";
import { Bar, Doughnut, Line, Pie } from "react-chartjs-2";
import { useParams } from "react-router-dom";
import SnackBar from "awesome-snackbar";
import getSnackBarStyles from "../../entities/snackBarStyles";
import AuthContext from "../../contexts/AuthContext";
import axios from "../../api/axios.js";
import { useEffect } from "react";
import "./LinkDetails.css";
import Loading from "../../components/Loading/Loading";
import ErrorPage from "../../components/Error/ErrorPage";

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    BarElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    ArcElement
);

const options = {
    responsive: true,
    plugins: {
        legend: {
            position: "top",
        },
        title: {
            text: "Visiters Each Day Chart",
        },
    },
};

const getOptions = (titleText, visible) => {
    return {
        responsive: true,
        plugins: {
            legend: {
                position: "top",
            },
            title: {
                visible: visible,
                text: titleText,
            },
        },
    };
};

export default function LinkDetails() {
    const { id } = useParams();
    const { auth } = useContext(AuthContext);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [link, setLink] = useState();
    const LINK_DETAILS_URL = "/link/";

    const fetchLinkDetails = async () => {
        setLoading(true);
        try {
            let res = await axios.get(LINK_DETAILS_URL + id, {
                headers: {
                    Authorization: "Bearer " + auth?.accessToken,
                },
                withCredentials: true,
            });

            let data = res.data;

            setLink(data);
        } catch (err) {
            console.log(err);
            setError(true)
        } finally {
            setLoading(false);
        }
    };
    useEffect(() => {
        fetchLinkDetails();
    }, []);

    const dates = new Set(
        link?.views?.map((item) => {
            return item.date.split("T")[0];
        })
    );
    const dateLabels = Array.from(dates);

    const dateData = {
        labels: dateLabels,
        datasets: [
            {
                label: "Visiters On Day",
                data: [...dateLabels.map((date) => {
                    return link?.views?.filter(
                        (item) => item.date.split("T")[0] === date
                    ).length;
                })],
                borderColor: "#00ff93",
                backgroundColor: "#00ff93",
            },
        ],
    };

    const os = new Set(
        link?.views?.map((item) => {
            return item.operatingSystem;
        })
    );
    const osLabels = Array.from(os);

    const osData = {
        labels: osLabels,
        datasets: [
            {
                label: "Visiters On Day",
                data: osLabels.map((os) => {
                    return link?.views?.filter(
                        (item) => item.operatingSystem === os
                    ).length;
                }),
                borderColor: [
                    "#00ff93",
                    "#ff4c4c",
                    "#ffd700",
                    "#00b2ff",
                    "#ff00ff",
                ],
                backgroundColor: [
                    "#00ff93",
                    "#ff4c4c",
                    "#ffd700",
                    "#00b2ff",
                    "#ff00ff",
                ],
            },
        ],
    };

    const agent = new Set(
        link?.views?.map((item) => {
            return item.userAgent;
        })
    );
    const agentLabels = Array.from(agent);

    const agentData = {
        labels: agentLabels,
        datasets: [
            {
                label: "Visiters On Day",
                data: agentLabels.map((os) => {
                    return link?.views?.filter((item) => item.userAgent === os)
                        .length;
                }),
                borderColor: [
                    "#00ff93",
                    "#ff4c4c",
                    "#ffd700",
                    "#00b2ff",
                    "#ff00ff",
                ],
                backgroundColor: [
                    "#00ff93",
                    "#ff4c4c",
                    "#ffd700",
                    "#00b2ff",
                    "#ff00ff",
                ],
            },
        ],
    };

    if (loading) {
        return (
            <Loading/>
        );
    }
    if (error) {
        return (
            <ErrorPage/>
        );
    }

    return (
        <div className="link-details">
            <h1 className="link-title">
                Statistics of your{" "}
                <span style={{ color: "#00FF94", fontSize: "inherit" }}>
                    Link
                </span>
            </h1>
            <div className="stat-info">
                <div className="box">
                    <span>URL</span>
                    <span>{link.url}</span>
                </div>
                <div className="box">
                    <span>Short Link</span>
                    <span>
                        {import.meta.env.VITE_BACKEND_SERVER +
                            link.shortenedUrl}
                    </span>
                </div>
                <div className="box">
                    <span>Total Visiters</span>
                    <span>{link.views.length}</span>
                </div>
            </div>
            <h1 className="chart-title">Visiters On a Day</h1>
            <div className="first-col">
                <div className="chart">
                    <Bar options={options} data={dateData} />
                </div>
                <div className="chart">
                    <Line options={options} data={dateData} />
                </div>
            </div>
            <div className="sec-col">
                <div className="chart">
                    <h1 className="chart-title">Visiters Operating Systems</h1>
                    <Pie data={osData} />
                </div>
                <div className="chart">
                    <h1 className="chart-title">Visiters Browser</h1>
                    <Doughnut data={agentData} />
                </div>
            </div>
            <button
                className="btn-primary"
                type="submit"
                disabled={loading}
                onClick={fetchLinkDetails}
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

// backgroundColor: [
//     'rgba(255, 99, 132, 0.2)',
//     'rgba(54, 162, 235, 0.2)',
//     'rgba(255, 206, 86, 0.2)',
//     'rgba(75, 192, 192, 0.2)',
//     'rgba(153, 102, 255, 0.2)',
//     'rgba(255, 159, 64, 0.2)',
//   ],
//   borderColor: [
//     'rgba(255, 99, 132, 1)',
//     'rgba(54, 162, 235, 1)',
//     'rgba(255, 206, 86, 1)',
//     'rgba(75, 192, 192, 1)',
//     'rgba(153, 102, 255, 1)',
//     'rgba(255, 159, 64, 1)',
//   ],
//   borderWidth: 1,
