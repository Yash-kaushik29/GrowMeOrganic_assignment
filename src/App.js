import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Container, TextField, Button, Typography, Box, Paper, } from "@mui/material";
import * as z from "zod";
import { useNavigate } from "react-router-dom";
const userSchema = z.object({
    name: z.string().nonempty({ message: "Name is required" }),
    phoneNumber: z
        .string()
        .nonempty({ message: "Phone number is required" })
        .regex(/^\d{10}$/, "Please enter a valid 10-digit phone number"),
    email: z
        .string()
        .nonempty({ message: "Email is required" })
        .email("Please enter a valid email"),
});
const App = () => {
    const { handleSubmit, control, formState: { errors }, } = useForm({
        resolver: zodResolver(userSchema),
        defaultValues: {
            name: "",
            phoneNumber: "",
            email: "",
        },
    });
    const navigate = useNavigate();
    const onSubmit = (data) => {
        console.log("Form data submitted:", data);
        localStorage.setItem("data", JSON.stringify(data));
        navigate("/second");
    };
    return (_jsx(Container, { maxWidth: "sm", sx: {
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            minHeight: "100vh",
        }, children: _jsxs(Paper, { elevation: 3, sx: {
                p: 4,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
            }, children: [_jsx(Typography, { variant: "h4", gutterBottom: true, children: "User Information" }), _jsxs("form", { onSubmit: handleSubmit(onSubmit), style: { width: "100%" }, children: [_jsx(Controller, { name: "name", control: control, render: ({ field }) => (_jsx(TextField, { ...field, label: "Name", fullWidth: true, error: !!errors.name, helperText: errors.name?.message })) }), _jsx(Controller, { name: "phoneNumber", control: control, render: ({ field }) => (_jsx(TextField, { ...field, label: "Phone Number", fullWidth: true, error: !!errors.phoneNumber, helperText: errors.phoneNumber?.message })) }), _jsx(Controller, { name: "email", control: control, render: ({ field }) => (_jsx(TextField, { ...field, label: "Email", fullWidth: true, error: !!errors.email, helperText: errors.email?.message })) }), _jsx(Box, { mt: 2, sx: { display: "flex", justifyContent: "center", width: "100%" }, children: _jsx(Button, { type: "submit", variant: "contained", color: "primary", children: "Submit" }) })] })] }) }));
};
export default App;
