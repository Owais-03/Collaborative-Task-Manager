import Navbar from '../shared/Navbar';
import Footer from '../shared/Footer';
import { Alert } from 'react-bootstrap';
import { BsPeople, BsCheckCircle, BsCalendar } from 'react-icons/bs';


const Home = () => {
    return (
        <div>
            <Navbar />
            <div className="container my-5">
                <div className="row align-items-center">
                    <div className="col-md-7">
                        <h1 className="display-4 fw-bold mb-3" style={{ color: '#1976d2' }}>
                            Collaborative Task Manager
                        </h1>
                        <p className="lead mb-4">
                            Organize, assign, and track your team's tasks in real-time. Boost productivity and collaboration with our intuitive task management platform.
                        </p>
                        <div className="d-flex gap-3 mb-4">
                            <a
                                href="/task-manager"
                                className="btn btn-primary btn-lg"
                                style={{ backgroundColor: '#1976d2', borderColor: '#1976d2' }}
                            >
                                Get Started
                            </a>
                            <button
                                className="btn btn-outline-primary btn-lg"
                            >
                                Learn More
                            </button>
                        </div>
                        {/* React-bootstrap Alert Example */}
                        <div className="mb-3">
                            <Alert variant="info">
                                <strong>New!</strong> Try our collaborative features and assign tasks to your teammates.
                            </Alert>
                        </div>
                        {/* Feature Highlights */}
                        <div className="row text-center">
                            <div className="col-4">
                                <BsPeople size={32} className="mb-2 text-primary" />
                                <h6>Team Collaboration</h6>
                                <small>Assign and discuss tasks in real-time.</small>
                            </div>
                            <div className="col-4">
                                <BsCheckCircle size={32} className="mb-2 text-success" />
                                <h6>Progress Tracking</h6>
                                <small>Visualize progress with clear status updates.</small>
                            </div>
                            <div className="col-4">
                                <BsCalendar size={32} className="mb-2 text-warning" />
                                <h6>Due Dates</h6>
                                <small>Never miss a deadline with reminders.</small>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-5 d-flex justify-content-center">
                        <img
                            src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=600&q=80"
                            alt="Task Manager Illustration"
                            className="img-fluid rounded shadow"
                            style={{ maxHeight: 320 }}
                        />
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default Home;