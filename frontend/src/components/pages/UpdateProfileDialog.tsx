import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { USER_API_END_POINT } from '../../utils/constant';
import { setUser } from '../../redux/authSlice';
import { toast } from 'sonner';
import type { RootState } from '../../redux/store';

const UpdateProfileDialog = ({ open, setOpen }: any) => {
    const [loading, setLoading] = useState(false);
    const { user } = useSelector((store: RootState) => store.auth);

    const [input, setInput] = useState({
        fullname: '',
        email: '',
        phoneNumber: '',
        bio: '',
        file: null as File | null
    });
    const dispatch = useDispatch();

    // Pre-fill form when dialog opens
    useEffect(() => {
        if (open && user) {
            setInput({
                fullname: user.fullname || '',
                email: user.email || '',
                phoneNumber: user.phoneNumber || '',
                bio: user.profile?.bio || '',
                file: null
            });
        }
        if (!open) {
            setInput({
                fullname: '',
                email: '',
                phoneNumber: '',
                bio: '',
                file: null
            });
        }
    }, [open, user]);

    const changeEventHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    }

    const changeFileHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] || null;
        setInput({ ...input, file });
    }

    const submitHandler = async (e: React.FormEvent) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('fullname', input.fullname);
        formData.append('email', input.email);
        formData.append('phoneNumber', input.phoneNumber);
        formData.append('bio', input.bio);
        if (input.file) {
            formData.append('file', input.file);
        }
        try {
            setLoading(true);
            const res = await axios.post(`${USER_API_END_POINT}/profile/update`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
                withCredentials: true
            });
            if (res.data.success) {
                dispatch(setUser(res.data.user));
                toast.success(res.data.message);
            }
        } catch (error: any) {
            console.log(error);
            toast.error(error.response?.data?.message || 'Update failed');
        } finally {
            setLoading(false);
        }
        setOpen(false);
    }

    return (
        <div>
            <div className={`modal fade ${open ? 'show d-block' : ''}`} tabIndex={-1} role="dialog" style={{ background: open ? 'rgba(0,0,0,0.5)' : 'transparent' }}>
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header d-flex justify-content-between align-items-center" style={{ borderBottom: '1px solid #dee2e6', padding: '1rem 1.5rem' }}>
                            <h5 className="modal-title mb-0" style={{ fontWeight: 600 }}>Update Profile</h5>
                            <button
                                type="button"
                                className="close"
                                aria-label="Close"
                                onClick={() => setOpen(false)}
                                style={{
                                    background: 'none',
                                    border: 'none',
                                    fontSize: '1.5rem',
                                    fontWeight: 700,
                                    lineHeight: 1,
                                    color: '#000',
                                    opacity: 0.7,
                                    cursor: 'pointer'
                                }}
                            >
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <form onSubmit={submitHandler}>
                            <div className="modal-body">
                                <div className="form-group mb-3">
                                    <label htmlFor="name">Name</label>
                                    <input
                                        id="name"
                                        name="fullname"
                                        type="text"
                                        className="form-control"
                                        value={input.fullname}
                                        onChange={changeEventHandler}
                                    />
                                </div>
                                <div className="form-group mb-3">
                                    <label htmlFor="email">Email</label>
                                    <input
                                        id="email"
                                        name="email"
                                        type="email"
                                        className="form-control"
                                        value={input.email}
                                        onChange={changeEventHandler}
                                    />
                                </div>
                                <div className="form-group mb-3">
                                    <label htmlFor="number">Number</label>
                                    <input
                                        id="number"
                                        name="phoneNumber"
                                        className="form-control"
                                        value={input.phoneNumber}
                                        onChange={changeEventHandler}
                                    />
                                </div>
                                <div className="form-group mb-3">
                                    <label htmlFor="bio">Bio</label>
                                    <input
                                        id="bio"
                                        name="bio"
                                        className="form-control"
                                        value={input.bio}
                                        onChange={changeEventHandler}
                                    />
                                </div>
                                <div className="form-group mb-3">
                                    <label htmlFor="file">Update Profile Picture</label>
                                    <input
                                        id="file"
                                        name="file"
                                        accept="image/*"
                                        type="file"
                                        className="form-control"
                                        onChange={changeFileHandler}
                                    />
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="submit" className="btn btn-primary" disabled={loading}>
                                    {loading ? (
                                        <>
                                            <span className="spinner-border spinner-border-sm mr-2" role="status" aria-hidden="true"></span>
                                            Please wait
                                        </>
                                    ) : (
                                        'Update'
                                    )}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default UpdateProfileDialog;