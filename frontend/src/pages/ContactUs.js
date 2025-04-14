import React, { useState } from "react";
import { FaFacebookF } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa6";
import { FaPinterest } from "react-icons/fa6";
import { FaXTwitter } from "react-icons/fa6";
import { Link } from "react-router-dom";

const ContactUs = () => {
  window.scrollTo(0, 0);

  return (
    <section class="contact-section">
      <div class="contact-container">
        <div class="contact-info">
          <h2>Get in Touch</h2>
          <p>
            We’d love to hear from you. Fill out the form and we’ll get back to
            you as soon as possible.
          </p>
          <ul>
            <li>
              <strong>Email:</strong>{" "}
              <sapn className="link text-[16px]">
                helpdeskindia@shopnest.com
              </sapn>
            </li>
            <li>
              <strong>Phone:</strong> (+91) 7433-021-436
            </li>
            <li>
              <strong>Location:</strong> 123 Safal, Ahmedabad, Gujarat, India
            </li>
          </ul>
          <div className="text-[20px] flex items-start gap-2">
            <ul className="flex justify-center items-center gap-3 mt-1">
              <li className="list-none">
                <Link
                  to="/"
                  target="_blank"
                  className="w-[35px] h-[35px] rounded-full  border border-[rgba(0,0,0,0.2)] flex items-center justify-center group hover:bg-primary transition-all"
                >
                  <FaFacebookF className="text-[18px] group-hover:text-white" />
                </Link>
              </li>
              <li className="list-none">
                <Link
                  to="/"
                  target="_blank"
                  className="w-[35px] h-[35px] rounded-full  border border-[rgba(0,0,0,0.2)] flex items-center justify-center group hover:bg-primary transition-all"
                >
                  <FaXTwitter className="text-[18px] group-hover:text-white" />
                </Link>
              </li>
              <li className="list-none">
                <Link
                  to="/"
                  target="_blank"
                  className="w-[35px] h-[35px] rounded-full  border border-[rgba(0,0,0,0.2)] flex items-center justify-center group hover:bg-primary transition-all"
                >
                  <FaInstagram className="text-[22px] group-hover:text-white" />
                </Link>
              </li>
              <li className="list-none">
                <Link
                  to="/"
                  target="_blank"
                  className="w-[35px] h-[35px] rounded-full  border border-[rgba(0,0,0,0.2)] flex items-center justify-center group hover:bg-primary transition-all"
                >
                  <FaPinterest className="text-[22px] group-hover:text-white" />
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div class="contact-form">
          <form action="#" method="post">
            <div class="form-group">
              <input type="text" name="name" placeholder="Your Name" required />
            </div>
            <div class="form-group">
              <input
                type="email"
                name="email"
                placeholder="Your Email"
                required
              />
            </div>
            <div class="form-group">
              <input
                type="text"
                name="subject"
                placeholder="Subject"
                required
              />
            </div>
            <div class="form-group">
              <textarea
                name="message"
                rows="5"
                placeholder="Your Message"
                required
              ></textarea>
            </div>
            <button type="submit">Send Message</button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ContactUs;
