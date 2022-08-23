import React from 'react';
import { Link } from 'react-router-dom';
import heroImg from "../assets/images/istockphoto-1025651750-1024x1024.jpg";

const Hero = () => {
  return (
    <div className='hero__section'>
      <section className="py-4 container">
        <div className="row py-lg-5 d-flex align-items-center">
          <div className="col-lg-6 col-md-6 col-sm-12">
            <h1 className="fw-normal">Welcome to Kenyan Hadharim!</h1>
            <p className="lead text-muted">Something short and leading about the collection below—its contents, the creator, etc. Make it short and sweet, but not too short so folks don’t simply skip over it entirely.</p>
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
  )
}

export default Hero;