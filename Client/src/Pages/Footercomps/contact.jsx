import '../../Styles/Contact.css';

function Contact() {
  return (
    <div className="contact container py-5">
      <h2 className="text-center mb-4">Contact Us</h2>

      <div className="row">
        {/* Contact Info Section */}
        <div className="col-md-5 mb-4 animate-left">
          <div className="basic p-4 rounded ">
            <p><strong>Email:</strong> contact@example.com</p>
            <p><strong>Phone:</strong> +91 98765 43210</p>
            <p><strong>Address:</strong> 123 Main Street, City, State, Country</p>
            <p><strong>Working Hours:</strong> Mon - Fri: 9AM - 5PM</p>
          </div>
        </div>

        {/* Contact Form Section */}
        <div className="col-md-7 animate-right">
          <form>
            <div className="mb-3">
              <p className="lead mb-4">
                <strong className="fw-bold">Get in touch!</strong><br />
                Fill up the form and our team will get back to you within{" "}
                <strong>24 hours</strong>.<br />
                You can also directly email us at{" "}
                <a href="mailto:contact@example.com" className="text-primary fw-bold">
                  contact@example.com
                </a>.
              </p>

              <label htmlFor="name" className="form-label">Name</label>
              <input type="text" id="name" className="form-control" placeholder="Enter your name" required />
            </div>

            <div className="mb-3">
              <label htmlFor="email" className="form-label">Email</label>
              <input type="email" id="email" className="form-control" placeholder="Enter your email" required />
            </div>

            <div className="mb-3">
              <label htmlFor="subject" className="form-label">Subject</label>
              <input type="text" id="subject" className="form-control" placeholder="Subject" required />
            </div>

            <div className="mb-3">
              <label htmlFor="message" className="form-label">Message</label>
              <textarea id="message" className="form-control" rows="5" placeholder="Your message" required></textarea>
            </div>

            <button type="submit" className="btn btn-success w-100">Send Message</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Contact;
