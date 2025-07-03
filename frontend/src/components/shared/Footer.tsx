import GitHubIcon from '@mui/icons-material/GitHub';
import EmailIcon from '@mui/icons-material/Email';
import TwitterIcon from '@mui/icons-material/Twitter';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import CookieConsent from './CookieConsent';

function Footer() {
  return (
    <>
    <footer className="bg-dark text-white mt-5 py-4">
      <div className="container">
      <div className="row align-items-start">
        <div className="col-md-4 mb-4 mb-md-0">
        <span className="h5">Collaborative Task Manager</span>
        <p className="mb-2 text-white-50">
          Manage your team's tasks efficiently and collaboratively. Built with React, TypeScript, and Node.js.
        </p>
        <p className="mb-0 text-white">© {new Date().getFullYear()} All rights reserved.</p>
        </div>
        <div className="col-md-2 mb-4 mb-md-0">
        <h6 className="text-uppercase">Product</h6>
        <ul className="list-unstyled">
          <li><a href="#" className="link-light link-underline-opacity-0 link-underline-opacity-75-hover">Features</a></li>
          <li><a href="#" className="link-light link-underline-opacity-0 link-underline-opacity-75-hover">Pricing</a></li>
          <li><a href="#" className="link-light link-underline-opacity-0 link-underline-opacity-75-hover">FAQ</a></li>
          <li><a href="#" className="link-light link-underline-opacity-0 link-underline-opacity-75-hover">Changelog</a></li>
        </ul>
        </div>
        <div className="col-md-2 mb-4 mb-md-0">
        <h6 className="text-uppercase">Resources</h6>
        <ul className="list-unstyled">
          <li><a href="#" className="link-light link-underline-opacity-0 link-underline-opacity-75-hover">Documentation</a></li>
          <li><a href="#" className="link-light link-underline-opacity-0 link-underline-opacity-75-hover">Blog</a></li>
          <li><a href="#" className="link-light link-underline-opacity-0 link-underline-opacity-75-hover">Support</a></li>
          <li><a href="#" className="link-light link-underline-opacity-0 link-underline-opacity-75-hover">Community</a></li>
        </ul>
        </div>
        <div className="col-md-2 mb-4 mb-md-0">
        <h6 className="text-uppercase">Company</h6>
        <ul className="list-unstyled">
          <li><a href="#" className="link-light link-underline-opacity-0 link-underline-opacity-75-hover">About Us</a></li>
          <li><a href="#" className="link-light link-underline-opacity-0 link-underline-opacity-75-hover">Careers</a></li>
          <li><a href="#" className="link-light link-underline-opacity-0 link-underline-opacity-75-hover">Contact</a></li>
          <li><a href="#" className="link-light link-underline-opacity-0 link-underline-opacity-75-hover">Privacy Policy</a></li>
        </ul>
        </div>
        <div className="col-md-2 text-md-end">
        <h6 className="text-uppercase">Connect</h6>
        <div className="mb-2 d-flex align-items-center gap-3">
          <a href="https://github.com/dummyuser" target="_blank" rel="noopener noreferrer" className="link-light link-underline-opacity-0 link-underline-opacity-75-hover" title="GitHub">
            <GitHubIcon fontSize="medium" />
          </a>
          <a href="mailto:dummyuser@example.com" className="link-light link-underline-opacity-0 link-underline-opacity-75-hover" title="Email">
            <EmailIcon fontSize="medium" />
          </a>
          <a href="https://twitter.com/dummyuser" target="_blank" rel="noopener noreferrer" className="link-light link-underline-opacity-0 link-underline-opacity-75-hover" title="Twitter">
            <TwitterIcon fontSize="medium" />
          </a>
          <a href="https://linkedin.com/in/dummyuser" target="_blank" rel="noopener noreferrer" className="link-light link-underline-opacity-0 link-underline-opacity-75-hover" title="LinkedIn">
            <LinkedInIcon fontSize="medium" />
          </a>
        </div>
        </div>
        <div>
        <small className="text-white-50">Jogeshwari, Mumbai, India</small><br />
        <small className="text-white-50">Phone: (123) 456-7890</small>
        </div>
      </div>
      </div>
    </footer>
    <CookieConsent />
    </>
  );
}

export default Footer;