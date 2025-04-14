import React from "react";

const AboutUs = () => {
  window.scrollTo(0, 0);
  return (
    <div>
      <section className="about-banner">
        <img src="/FirstBanner/download.jpg" alt="Store Banner" />
        <div className="banner-text">
          <h1>About ShopNest</h1>
          <p>Your trusted partner for online shopping</p>
        </div>
      </section>
      <section className="about-content">
        <div className="about-text">
          <h2>Who We Are</h2>
          <p>
            At <strong>ShopNest</strong>, we are dedicated to making shopping
            easier, faster, and more reliable for everyone. We offer thousands
            of products across various categories like fashion, electronics,
            groceries, home decor, and more.
          </p>
          <h2>Our Mission</h2>
          <p>
            To deliver happiness to every doorstep by providing affordable,
            quality products with seamless delivery service and support.
          </p>
        </div>
        <div className="about-image">
          <img src="/teamwork.jpg" alt="Team Working" />
        </div>
      </section>
      <section className="about-stats flex items-center justify-center gap-64 p-8 mt-2 bg-white">
        <div className="flex items-center px-2 flex-col">
          <img src="/heart.png" alt="Customers" className="w-[70px] mb-3 m" />
          <h3 className="text-[22px]">100K</h3>
          <p className="text-[18px]">Happy Customers</p>
        </div>
        <div className="flex items-center px-2 flex-col">
          <img src="/browsing.png" alt="Products" className="w-[70px] mb-3" />
          <h3 className="text-[22px]">50K</h3>
          <p className="text-[18px]">Products Delivered</p>
        </div>
        <div className="flex items-center px-2 flex-col">
          <img src="/24-hours.png" alt="Support" className="w-[70px] mb-3" />
          <h3 className="text-[22px]">24/7</h3>
          <p className="text-[18px]">Customer Support</p>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;
