import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

// Define the state interface
export interface AuthState {
    loading: boolean;
    user?: {
        _id:string;
        role: string;
        fullname: string;
        email: string;
        profile?: {
            profilePhoto?: string;
            bio?: string;
        };
        phoneNumber:string;
        updatedAt:Date;
    } | null;
}

// Define the initial state
const initialState: AuthState = {
    loading: false,
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setLoading(state, action: PayloadAction<boolean>) {
            state.loading = action.payload;
        },
        setUser(state, action: PayloadAction<AuthState["user"]>) {
            state.user = action.payload;
        },
    },
});

export const { setLoading, setUser } = authSlice.actions;
export default authSlice.reducer;

// Helper function for login to store JWT token in localStorage
export const loginAndStoreToken = async (payload: any) => {
    const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_API_URL}/user/signin`,
        payload,
        { withCredentials: true }
    );
    if (response.data.token) {
        localStorage.setItem('token', response.data.token);
    }
    return response.data;
};

