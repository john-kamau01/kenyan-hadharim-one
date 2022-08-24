import React from 'react'
import { Link } from 'react-router-dom';

import heroImg from "../assets/images/istockphoto-474912698-1024x1024.jpg";
import happyPerson1 from "../assets/images/istockphoto-1193690070-1024x1024.jpg";
import happyPerson2 from "../assets/images/istockphoto-638507050-1024x1024.jpg";

import { UserAuth } from '../context/AuthContext';

const AboutPage = () => {
  const {user} = UserAuth();
  return (
    <div className="container">
      <div className='row'>
        <div className='hero__section'>
          <section className="py-4">
            <div className="row py-lg-5 d-flex align-items-center">
              <div className="col-lg-6 col-md-6 col-sm-12">
                <h1 className="fw-normal">About Us</h1>
                <p className="py-3 lead text-muted">
                  Kenya Hadharim Self-Help Group, is a group that advocates for and supports Kenya Hadharim Community Members participation in development processes.  We envision: A Community where our Members including our youth are empowered to realize their full potential.  The KH-SHG currently has over hundred (100) Kenya Hadharim Members in different Counties in <b>Kenya (Kitui, Kilifi, Nairobi,Wajir)</b> and in seven (7) different <b>Diaspora Countries (USA, UK, Qatar, Kuwait, UAE, Saudia & Uganda)</b>.
                </p>
                {user ? (
                  <div>
                  <Link to="/profile" className="btn btn-success mx-2" style={{ paddingLeft:"25px",paddingRight:"25px", minWidth:"200px" }}>Profile</Link>
                  <Link to="/articles" className="btn btn-outline-danger mx-2" style={{ paddingLeft:"25px",paddingRight:"25px",minWidth:"200px" }}>Articles</Link>
                </div>
                ) : (
                  <div>
                  <Link to="/login" className="btn btn-primary mx-2" style={{ paddingLeft:"25px",paddingRight:"25px",minWidth:"200px" }}>Login</Link>
                  <Link to="/register" className="btn btn-danger mx-2" style={{ paddingLeft:"25px",paddingRight:"25px",minWidth:"200px" }}>Register</Link>
                </div>
                )}
                
              </div>
              <div className="col-lg-6 col-md-6 col-sm-12 d-none d-md-block">
                <img src={heroImg} alt="Kenyan Hadharim" className='img-fluid' style={{ borderRadius:"10px" }} />
              </div>
            </div>
          </section>
        </div>
      </div>

      <div className='row'>
        <div className='col-md-6 col-sm-12'>
          <h2>Our History</h2>
          <hr />
          <p>
          Kenya Hadharim Self-Help Group was registered with The Republic of Kenya government, under the Ministry of Labour and Social Protection, Registration Certificate No. 0094554 on the 10th of December, 2021.  It is located in the Mombasa Island and falls under Mvita Constituency in Kenya, with a vision of uplifting the Kenya Hadharim Members to overcome their unique challenges and actively participate in the formation of their Communitynl and Country.
          </p>
        </div>

        <div className='col-md-3 col-sm-6 d-flex'>
          <div class="card mb-3 align-self-stretch">
            <div className='card-header'>
              <h3 class="card-title">Vision</h3>
            </div>
            <div class="card-body">
              <p class="card-text">
              To provide standard quality life to the entire KH-SHG Members through Income Generating Activities (IGAs) as a business.
              </p>
            </div>
          </div>
        </div>
        <div className='col-md-3 col-sm-6 d-flex'>
          <div class="card mb-3 align-self-stretch">
            <div className='card-header'>
              <h3 class="card-title">Mission</h3>
            </div>
            <div class="card-body">
              <p class="card-text">
              To enhance the quality standard of our KH-SHG Members and reduce the level of dependency ratio through indulging in Small Businesses as a source of income.
              </p>
            </div>
          </div>
        </div>

      </div>

      <div className='row'>
        <div className='col-md-6 col-sm-12 pt-5'>
          <div class="card mb-3">
            <div className='card-header'>
              <h3 class="card-title">Our Objectives</h3>
            </div>
            <div class="card-body">
              <div class="card-text">
                <ol className="list-group list-group-numbered border-0">
                  <li className="list-group-item border-0">To improve the living standard for the Members of the KH-SHG within and beyond Mombasa.</li>
                  <li className="list-group-item border-0">To eradicate the level of poverty for our KH-SHG Members.</li>
                  <li className="list-group-item border-0">To eliminate immoral behavior and avoid petty code of conduct.</li>
                  <li className="list-group-item border-0">To reduce the level of dependency ratio.</li>
                  <li className="list-group-item border-0"> To emphasize in education level and health care.</li>
                  <li className="list-group-item border-0">To create and find a job opportunity for jobless youth of KH-SHG Members.</li>
                </ol>
              </div>
            </div>
          </div>
        </div>

        <div className="col-md-6 col-sm-12 pt-5">
          <img src={happyPerson2} alt="Kenyan Hadharim" className='img-fluid' style={{ borderRadius:"10px" }} />
        </div>
      </div>

      <div className='row pt-5'>
        <div className='col-md-12 col-sm-12'>
          <h3>Our Approach</h3>
          <hr />
          <p>
          To tackle these we have come up with clear notions and solutions.  Finances in this contemporary world are the major source to generate development and to transform the Vision into sustainable Objectives and finally to reality.
          This earnestly calls for monetary sacrifices in contributing continuously over a defined period to attain Capital Muscle.
          We have resolved to contribute:
          </p>
          <ul>
            <li>Admission Fees of Ksh 500 per Member (non refundable),</li>
            <li>Monthly Subscription Fees of Ksh 1,000 per month, before the 10th of every calendar month.</li>
          </ul>
          <p>
          These payments to ensure Accountability and Transparency shall be deposited to <b>KH-SHG Ksh Gulf African Bank Account: 0800070601 via Mpesa Paybill 985050</b> and for <b>Donations to the Ksh Account: (0800070602 to be opened soon) for Diaspora send directly to GAB: Swift Code: GAFRKEN</b>
          </p>
          <p>
          The Banks issues a Monthly Statement to the group and the Statement will be shared in our Telegram platform for all to be able to trace their payments and to relate with those of fellow KH-SHG Members and to have an overview of the progress into the contributions.
          </p>
        </div>
        <div className='col-md-6 col-sm-12'></div>
      </div>

      <div className='row'>
        <div className="col-md-6 col-sm-12 pt-5">
          <img src={happyPerson1} alt="Kenyan Hadharim" className='img-fluid' style={{ borderRadius:"10px" }} />
        </div>

        <div className='col-md-6 col-sm-12 pt-5'>
          <div class="card mb-3">
            <div className='card-header'>
              <h3 class="card-title">Our Target</h3>
            </div>
            <div class="card-body">
              <p>
              We reiterate for all to be achieved that all payments should be directed into the above-mentioned GAB Ksh Account. <b>Our target is to reach 1,000 or more Members in less than two (2) years.</b>
              </p>
              <p>
              The main objective is the economic empowerment of our <b>KH-SHG Members</b>. This is a global trend nowadays characterised by stiffer economic challenges in this world with many flocks not able to achieve the more elusive power due to the rising costs, UNLESS they unite.
              </p>
              <p>
              Out of this zeal came our noble vision for the future and the coming generations of our KH-SHG Members. As vision dictates it is an undertaking stretching over 5 (five) or fewer years depending upon our numbers and contributions.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AboutPage;