import React, { useState } from "react";
import Navbar from "../shared/Navbar";
import Footer from "../shared/Footer";
import { toast } from "sonner";
import axios from "axios";
import { USER_API_END_POINT } from "../../utils/constant";
import {
    CircularProgress,
    TextField,
    Button,
    Typography,
    Box,
    Paper,
    Container,
} from "@mui/material";
import "bootstrap/dist/css/bootstrap.min.css";

const ForgetPassword = () => {
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);

    const submitHandler = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const res = await axios.post(
                `${USER_API_END_POINT}/forget-password`,
                { email },
                {
                    headers: { "Content-Type": "application/json" },
                }
            );

            if (res.data.success) {
                toast.success(
                    `Password reset link sent to your email. Redirecting to homepage...`
                );
                setTimeout(() => {
                    window.location.href = "/";
                }, 2000);
            } else {
                toast.error(res.data.message || "Failed to send reset link.");
            }
        } catch (error: any) {
            console.error(error);
            toast.error(error.response?.data?.message || "Something went wrong.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <Navbar />
            <Container maxWidth="sm" sx={{ minHeight: "70vh", display: "flex", alignItems: "center" }}>
                <Paper elevation={3} sx={{ p: 4, width: "100%" }}>
                    <Typography variant="h5" fontWeight="bold" mb={3} className="text-center mb-4">
                        Forget Password
                    </Typography>
                    <form onSubmit={submitHandler}>
                        <div className="mb-3">
                            <TextField
                                label="Email"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Enter your registered email"
                                required
                                fullWidth
                                margin="normal"
                                className="form-control"
                            />
                        </div>
                        <Box mt={3} display="flex" justifyContent="center">
                            <Button
                                type="submit"
                                variant="contained"
                                color="primary"
                                fullWidth
                                disabled={loading}
                                startIcon={loading ? <CircularProgress size={20} /> : null}
                                className="btn btn-primary"
                            >
                                {loading ? "Please wait" : "Send Reset Link"}
                            </Button>
                        </Box>
                    </form>
                </Paper>
            </Container>
            <Footer />
        </div>
    );
};

export default ForgetPassword;