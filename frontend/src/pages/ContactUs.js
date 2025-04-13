import React from "react";
import { MdMessage } from "react-icons/md";
import { MdCall } from "react-icons/md";

const ContactUs = () => {
  return (
    <section className="contact-section">
      <h1>Contact Us</h1>
      <p>
        We’d love to hear from you! Reach out with any questions or feedback.
      </p>
      <div className="contact-container">
        <div className="contact-form">
          <form>
            <label htmlFor="name">Full Name:</label>
            <input type="text" id="name" name="name" required />
            <label htmlFor="email">Email Address:</label>
            <input type="email" id="email" name="email" required />
            <label htmlFor="message">Message:</label>
            <textarea
              id="message"
              name="message"
              rows={5}
              required
              defaultValue={""}
            />
            <button type="submit">Send Message</button>
          </form>
        </div>
        <div className="contact-table">
          <table>
            <thead>
              <tr>
                <th>Department</th>
                <th>Email</th>
                <th>Phone</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Customer Support</td>
                <td>support@shopease.com</td>
                <td>+1 800 123 4567</td>
              </tr>
              <tr>
                <td>Sales</td>
                <td>sales@shopease.com</td>
                <td>+1 800 234 5678</td>
              </tr>
              <tr>
                <td>Head Office</td>
                <td>contact@shopease.com</td>
                <td>+1 800 345 6789</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

export default ContactUs;
