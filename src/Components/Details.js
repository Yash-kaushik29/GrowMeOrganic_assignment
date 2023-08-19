import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Typography, Container, CircularProgress } from "@mui/material";
import DepartmentList from "./DepartmentList";
const columns = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "title", headerName: "Title", width: 300 },
    { field: "body", headerName: "Body", width: 500 },
];
const SecondPage = () => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        fetchPosts();
    }, []);
    const fetchPosts = async () => {
        try {
            const response = await fetch("https://jsonplaceholder.typicode.com/posts");
            const data = await response.json();
            setPosts(data);
            setLoading(false);
        }
        catch (error) {
            console.error("Error fetching posts:", error);
            setLoading(false);
        }
    };
    return (_jsxs(Container, { children: [_jsx(Typography, { variant: "h5", fontWeight: 'bolder', gutterBottom: true, style: { marginTop: "20px" }, children: "Posts List" }), _jsx("div", { style: { height: "70vh", width: "100%", marginTop: "20px", marginBottom: '30px' }, children: loading ? (_jsx("div", { style: {
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        height: "100%",
                    }, children: _jsx(CircularProgress, {}) })) : (_jsx(DataGrid, { rows: posts, columns: columns })) }), _jsx(DepartmentList, {})] }));
};
export default SecondPage;
