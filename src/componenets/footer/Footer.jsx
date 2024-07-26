import React from "react";
import "./footer.css";
import { assets } from "../../assets/assets";

function Footer() {
  return (
    <div className="footer" id="footer">
      <div className="content">
        <div className="footer-left">
          <img src={assets.logo} alt="" />
          <p>
            {" "}
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae
            similique illo veritatis est omnis et neque laboriosam ad quas
            delectus harum, sed mollitia cum molestias quod repudiandae officia
            nesciunt expedita!
          </p>
          <div className="footer-icons">
            <a
              target="_blank"
              href="https://www.instagram.com/i._.4bdull4h?igsh=OHpxeHZ1dHQxOTls
"
            >
              <i className="fa-brands  fa-2x fa-instagram"></i>
            </a>
            <a
              target="_blank"
              href="https://www.facebook.com/abdullah.rafique.5891?mibextid=ZbWKwL"
            >
              <i className="fa-brands fa-2x fa-facebook"></i>
            </a>
            <a
              target="_blank"
              href="https://x.com/M_Abdullah419?t=pPA8rSfnOagO2rf6i6RZyg&s=09"
            >
              <i className="fa-brands  fa-2x fa-x-twitter"></i>
            </a>
            <a target="_blank" href="https://wa.link/23a6xv">
              <i className="fa-brands fa-2x fa-whatsapp"></i>
            </a>
          </div>
        </div>
        <div className="footer-center">
          <h2>Company</h2>
          <ul>
            <li>Home</li>
            <li>About Us</li>
            <li>Delivery</li>
            <li>Privacy Policy</li>
          </ul>
        </div>
        <div className="footer-right">
          <h2>Get in Touch</h2>
          <ul>
            <li>+92 3102251502</li>
            <li>abdullah456tu@gmail.com</li>
          </ul>
        </div>
      </div>
      <hr />
      <p className="copyright">Copyright &copy; 2022 All rights reserved</p>
    </div>
  );
}

export default Footer;
