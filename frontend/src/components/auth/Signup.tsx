import { useEffect } from "react";
import Navbar from "../shared/Navbar";
import { TextField, Button, CircularProgress, InputLabel, Typography, Box, Paper } from '@mui/material';
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { USER_API_END_POINT } from '../../utils/constant';
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "../../redux/authSlice";
import Footer from "../shared/Footer";
import { useFormik } from "formik";
import * as Yup from "yup";


const signupSchema = {
  fullname: Yup.string().required("Full name is required"),
  email: Yup.string().email("Invalid email address").required("Email is required"),
  phoneNumber: Yup.string().required("Phone number is required"),
  password: Yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
};

const Signup = () => {
  const { loading, user } = useSelector(
    (store: { auth: { loading: boolean; user: any } }) => store.auth
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      fullname: "",
      email: "",
      phoneNumber: "",
      password: "",
      file: null,
    },
    validationSchema: Yup.object(signupSchema),
    onSubmit: async (values) => {
      try {
        dispatch(setLoading(true));

        const formData = new FormData();
        formData.append("fullname", values.fullname);
        formData.append("email", values.email);
        formData.append("phoneNumber", values.phoneNumber);
        formData.append("password", values.password);
        if (values.file) {
          formData.append("file", values.file);
        }
        const response = await axios.post(
          `${USER_API_END_POINT}/register`,
          formData,
          {
            withCredentials: true,
            headers: {
              Accept: "application/json",
            },
          }
        );

        const res = await response.data;
          console.log(res);
        if (res.success) {
          navigate("/signin");
          toast.success(res.message);
        }
      } catch (err: any) {
        toast.error(err.response?.data?.message);
      } finally {
        dispatch(setLoading(false));
      }
    },
  });

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);

  return (
    <div>
      <Navbar />
      <Box className="d-flex justify-content-center align-items-center mt-5" style={{ minHeight: "100vh" }}>
        <Paper elevation={3} className="p-4" style={{ width: "100%", maxWidth: 500 }}>
          <Typography variant="h5" fontWeight="bold" mb={3}>
            Sign Up
          </Typography>
          <form onSubmit={formik.handleSubmit}>
            <div className="mb-3">
              <TextField
                fullWidth
                label="Full Name"
                name="fullname"
                placeholder="Enter your full name"
                value={formik.values.fullname}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.fullname && Boolean(formik.errors.fullname)}
                helperText={formik.touched.fullname && formik.errors.fullname}
                variant="outlined"
                size="small"
              />
            </div>
            <div className="mb-3">
              <TextField
                fullWidth
                label="Email"
                name="email"
                type="email"
                placeholder="Enter your email"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
                variant="outlined"
                size="small"
              />
            </div>
            <div className="mb-3">
              <TextField
                fullWidth
                label="Phone Number"
                name="phoneNumber"
                placeholder="Enter your phone number"
                value={formik.values.phoneNumber}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.phoneNumber && Boolean(formik.errors.phoneNumber)}
                helperText={formik.touched.phoneNumber && formik.errors.phoneNumber}
                variant="outlined"
                size="small"
              />
            </div>
            <div className="mb-3">
              <TextField
                fullWidth
                label="Password"
                name="password"
                type="password"
                placeholder="Enter your password"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.password && Boolean(formik.errors.password)}
                helperText={formik.touched.password && formik.errors.password}
                variant="outlined"
                size="small"
              />
            </div>
            <div className="mb-3">
              <InputLabel>Profile Picture</InputLabel>
              <input
                type="file"
                name="file"
                accept="image/*"
                className="form-control"
                onChange={(e) => formik.setFieldValue("file", e.currentTarget.files?.[0] || null)}
              />
              {!formik.values.file && (
                <Typography variant="caption" color="textSecondary">
                  A default profile picture will be used if none is selected.
                </Typography>
              )}
            </div>
            <div className="mb-3">
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                disabled={loading}
                className="fw-bold"
                style={{ minHeight: 45 }}
                startIcon={loading ? <CircularProgress size={20} /> : null}
              >
                {loading ? "Please wait" : "Signup"}
              </Button>
            </div>
            <Typography variant="body2" align="center" className="mt-3">
              Already have an account?{" "}
              <Link to="/signin" className="text-primary text-decoration-none">
                Signin
              </Link>
            </Typography>
          </form>
        </Paper>
      </Box>
      <Footer />
    </div>
  );
};

export default Signup;