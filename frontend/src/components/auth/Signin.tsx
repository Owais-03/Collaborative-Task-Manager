import { useEffect } from "react";
import Navbar from "../shared/Navbar";
import Footer from "../shared/Footer";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import { setLoading, setUser } from "../../redux/authSlice";
import { useFormik } from "formik";
import * as Yup from "yup";

// MUI imports
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import axios from "axios";
import { USER_API_END_POINT } from "../../utils/constant";


const signinSchema = {
  email: Yup.string().email("Invalid email address").required("Email is required"),
  password: Yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
}

const Signin = () => {
  const { loading, user } = useSelector(
    (store: { auth: { loading: boolean; user: any } }) => store.auth
  );
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // Helper function for login to store JWT token in localStorage

  const loginAndStoreToken = async (payload: any) => {
    const response = await axios.post(
      `${USER_API_END_POINT}/signin`,
      payload,
      { withCredentials: true }
    );
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
    }
    return response.data;
  };

    const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object(signinSchema),
    onSubmit: async (values) => {
      try {
      dispatch(setLoading(true));
      const res = await loginAndStoreToken(values);
      if (res.success) {
        dispatch(setUser(res.user));
        toast.success(res.message);
      }
      } catch (err: any) {
      toast.error(err.response?.data?.message);
      } finally {
      dispatch(setLoading(false));
      }
    }
    });

   useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);

  return (
    <div>
      <Navbar />
      <div className="mt-5 container d-flex justify-content-center align-items-center" style={{ minHeight: "80vh" }}>
        <Box
          component="form"
          onSubmit={formik.handleSubmit}
          className="w-100"
          sx={{
            maxWidth: 400,
            width: "100%",
            p: 4,
            border: "1px solid #dee2e6",
            borderRadius: 2,
            boxShadow: 3,
            backgroundColor: "#fff",
          }}
        >
          <Typography variant="h5" fontWeight="bold" mb={3}>
            Sign In
          </Typography>
          <div className="mb-3">
            <TextField
              fullWidth
              id="email"
              label="Email"
              type="email"
              variant="outlined"
              {...formik.getFieldProps("email")}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
              placeholder="JohnDoe123@gmail.com"
              size="small"
            />
          </div>
          <div className="mb-3">
            <TextField
              fullWidth
              id="password"
              label="Password"
              type="password"
              variant="outlined"
              {...formik.getFieldProps("password")}
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
              placeholder="*******"
              size="small"
            />
          </div>
          <div className="mb-3">
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              disabled={loading}
              startIcon={loading ? <CircularProgress size={20} /> : null}
            >
              {loading ? "Please wait" : "Sign In"}
            </Button>
          </div>
            <Box display="flex" justifyContent="space-between" mt={3} flexWrap="wrap" gap={3}>
              <Box display="flex" flexDirection="column" alignItems="flex-start">
                <Typography variant="body2">Don't have an account?</Typography>
                <Link to="/signup" className="text-primary text-decoration-none">
                  Signup
                </Link>
              </Box>
              <Box display="flex" flexDirection="column" alignItems="flex-end">
                <Typography variant="body2">Forgot Password?</Typography>
                <Link to="/forget-password" className="text-primary text-decoration-none">
                  New password
                </Link>
              </Box>
            </Box>
        </Box>
      </div>
      <Footer />
    </div>
  );
};


export default Signin;
