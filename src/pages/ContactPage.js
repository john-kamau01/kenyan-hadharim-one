import React from 'react';
import { Link } from 'react-router-dom';

import heroImg from "../assets/images/istockphoto-1244562481-1024x1024.jpg";

const ContactPage = () => {
  return (
    <div className="container">
      <div className='row'>
        <div className='hero__section'>
          <section className="py-4 container">
            <div className="row py-lg-5 d-flex align-items-center">
              <div className="col-lg-6 col-md-6 col-sm-12">
                <h1 className="fw-normal">Contact Us</h1>
                <p className="text-muted lead">
                  Kenya Hadharim SHG<br />
                  Majengo, Mombasa Island - Kenya<br />
                  Located at Ujamaa Hall<br />
                  <b>P.O. Box</b>: 0000-0000 Mombasa, Kenya (* we are applying for a new postal address)<br />
                  <b>Mobiles</b>: 000 000 000<br/>
                  <b>Email</b>: admin@email.com<br />
                </p>
                <div>
                  <Link to="/profile" className="btn btn-success mx-2" style={{ paddingLeft:"25px",paddingRight:"25px" }}>Profile</Link>
                  <Link to="/articles" className="btn btn-outline-danger mx-2" style={{ paddingLeft:"25px",paddingRight:"25px" }}>Articles</Link>
                </div>
              </div>
              <div className="col-lg-6 col-md-6 col-sm-12 d-none d-md-block">
                <img src={heroImg} alt="Kenyan Hadharim" className='img-fluid' style={{ borderRadius:"10px" }} />
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}

export default ContactPage;