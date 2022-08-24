import { doc, getDoc, onSnapshot } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import VerifyAccount from '../../components/VerifyAccount';
import { UserAuth } from '../../context/AuthContext';
import { db } from '../../firebase/firebase';
import ProfileSidebar from './ProfileSidebar';

const Account = () => {
  const navigate = useNavigate();
  const [data, setData] = useState();
  const [show, setShow] = useState(false);
  const { user, userData, isLoadingUser } = UserAuth();
  const {
    children,
    clan_name,
    country,
    city,
    county,
    dob,
    email,
    first_name,
    gender,
    id_number,
    passport_number,
    identity_type,
    kin_phone,
    last_name,
    marital_status,
    middle_name,
    next_of_kin,
    nhif_status,
    occupation,
    password,
    phone,
    sub_county,
    profile_image,
    role,
    childFormValues,
    subscription_level,
    total_contributions
  } = userData;

  if(user.emailVerified === false){
    return <VerifyAccount user={user}/>
  };

  return (
    <div className='container'>
      <div className='row'>
        <div className='col-md-3 col-xs-12 py-5'>
          <ProfileSidebar />
        </div>
        <div className='col-md-9 col-xs-12 py-5'>
          {isLoadingUser ? (
            <div className='row'>
              <div className='col-md-12'>
                <div className="spinner-border text-danger" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
                <p>Loading Data...</p>
              </div>
            </div>
          ) : (
            <div className='row'>
              <div className='col-md-12'>
                <h1 className='pb-3'>{`${first_name}'s Profile`}</h1>
              </div>
              <div className='col-md-5'>
                <div className="card">
                  <img src={profile_image} className="img-fluid text-center" alt={first_name} style={{ width: "100%", height: "150px", objectFit: "cover", objectPosition: "center top" }} />
                  <div className="card-body">
                    <div className="table-responsive">
                      <table className='table table-borderless'>
                        <tbody>
                        <tr>
                          <th scope='row'>Name:</th>
                          <td>{first_name + " " + last_name}</td>
                        </tr>
                        <tr>
                          <th scope='row'>Email:</th>
                          <td>{email}</td>
                        </tr>
                        <tr>
                          <th scope='row'>Phone:</th>
                          <td>{phone}</td>
                        </tr>
                        <tr>
                          <th scope='row'>Subscription:</th>
                          <td>{subscription_level}</td>
                        </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                  <div className="card-body d-flex align-items-center justify-content-between">
                    <Link to={`/profile/update/${user?.uid}`} className="btn btn-success btn-sm card-link">Update Profile</Link>

                    <button type="button" className="btn btn-primary btn-sm" data-bs-toggle="modal" data-bs-target="#userModal">
                      View Details
                    </button>

                    <div className="modal fade" id="userModal" tabIndex={-1} aria-labelledby="userModalLabel" aria-hidden="true">
                      <div className="modal-dialog modal-dialog-scrollable">
                        <div className="modal-content">
                          <div className="modal-header">
                            <h5 className="modal-title" id="userModalLabel">{`Welcome to ${first_name}'s Profile`}</h5>
                            <button type="button" className="btn-close btn-sm" data-bs-dismiss="modal" aria-label="Close"></button>
                          </div>
                          <div className="modal-body">
                            <div className='row'>
                              <div className='col-md-4 com-sm-12'>
                                <img src={profile_image} alt="profile image" style={{ width: "120px", height:"120px", borderRadius:"50%",objectFit:"cover",objectPosition:"center top" }} />
                              </div>
                              <div className='col-md-8 col-sm-12'>
                                <table className="table table-responsive">
                                  <tbody>
                                    <tr>
                                      <th scope="row">Name:</th>
                                      <td>{first_name + " " + middle_name + " " + last_name}</td>
                                    </tr>
                                    <tr>
                                      <th scope="row">Clan Name:</th>
                                      <td>{clan_name}</td>
                                    </tr>
                                    <tr>
                                      <th scope="row">Email:</th>
                                      <td>{email}</td>
                                    </tr>
                                    <tr>
                                      <th scope="row">Phone:</th>
                                      <td>{phone}</td>
                                    </tr>
                                    <tr>
                                      <th scope="row">Subscription:</th>
                                      <td>{subscription_level}</td>
                                    </tr>
                                  </tbody>
                                </table>
                              </div>
                            </div>
                            <div className='row'>
                              <div className='col-md-12'>
                                <h4>Details</h4>
                                <table className="table table-responsive">
                                  <tbody>
                                    <tr>
                                      <th scope="row">DOB:</th>
                                      <td>{dob}</td>
                                    </tr>
                                    <tr>
                                      <th scope="row">Gender:</th>
                                      <td>{gender}</td>
                                    </tr>
                                    <tr>
                                      <th scope="row">Marital Status:</th>
                                      <td>{marital_status}</td>
                                    </tr>
                                    <tr>
                                      <th scope="row">Occupation:</th>
                                      <td>{occupation}</td>
                                    </tr>
                                    <tr>
                                      <th scope="row">NHIF Status:</th>
                                      <td>{nhif_status}</td>
                                    </tr>
                                  </tbody>
                                </table>
                              </div>
                            </div>
                            <div className='row'>
                              <div className='col-md-12'>
                                <h4>Identification</h4>
                                <table className="table table-responsive">
                                  <tbody>
                                    <tr>
                                      <th scope="row">National ID:</th>
                                      <td>{id_number}</td>
                                    </tr>
                                    <tr>
                                      <th scope="row">Passport:</th>
                                      <td>{passport_number}</td>
                                    </tr>
                                  </tbody>
                                </table>
                              </div>
                            </div>
                            <div className='row'>
                              <div className='col-md-12'>
                                <h4>Next of Kin</h4>
                                <table className="table table-responsive">
                                  <tbody>
                                    <tr>
                                      <th scope="row">Name:</th>
                                      <td>{next_of_kin}</td>
                                    </tr>
                                    <tr>
                                      <th scope="row">Phone:</th>
                                      <td>{kin_phone}</td>
                                    </tr>
                                  </tbody>
                                </table>
                              </div>
                            </div>
                            <div className='row'>
                              <div className='col-md-12'>
                                <h4>Location Details</h4>
                                <table className="table table-responsive">
                                  <tbody>
                                    <tr>
                                      <th scope="row">Country:</th>
                                      <td>{country}</td>
                                    </tr>
                                    {country !== "Kenya" ? (
                                      <tr>
                                        <th scope="row">City:</th>
                                        <td>{city}</td>
                                      </tr>
                                    ) : (
                                      <>
                                        <tr>
                                          <th scope="row">County:</th>
                                          <td>{county}</td>
                                        </tr>
                                        <tr>
                                          <th scope="row">Sub County:</th>
                                          <td>{sub_county}</td>
                                        </tr>
                                      </>
                                    )}
                                  </tbody>
                                </table>
                              </div>
                            </div>
                            <div className='row'>
                              <div className='col-md-12'>
                                <h4>Children Details</h4>
                                <table className="table table-responsive">
                                  <tbody>
                                    <tr>
                                      <th scope="row">Any children:</th>
                                      <td>{children}</td>
                                    </tr>
                                  </tbody>
                                </table>
                                    {children === "Yes" && (
                                      <table className="table">
                                        <thead>
                                          <tr>
                                            <th scope="col">#</th>
                                            <th scope="col">Name</th>
                                            <th scope="col">DOB</th>
                                            <th scope="col">Gender</th>
                                          </tr>
                                        </thead>
                                        <tbody>
                                          {childFormValues?.map((child, index) => {
                                            return (
                                              <tr key={index}>
                                                <th scope="row">{index + 1}</th>
                                                <td>{child?.childName}</td>
                                                <td>{child?.childDOB}</td>
                                                <td>{child?.childGender}</td>
                                              </tr>
                                            );
                                          })}
                                          
                                        </tbody>
                                      </table>
                                    )}
                              </div>
                            </div>
                          </div>
                          <div className="modal-footer">
                            <button type="button" className="btn btn-success btn-sm" data-bs-dismiss="modal" onClick={()=>navigate(`/profile/update/${user?.uid}`)}>Edit</button>
                            <button type="button" className="btn btn-secondary btn-sm" data-bs-dismiss="modal">Close</button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className='col-md-7'>
                <p className='fs-3 fw-light'>Welcome to your profile page <b>{first_name}</b></p>
                <hr />

                <p className='fw-normal'>You are currently on: <span className='fw-bold text-success'>{subscription_level}</span> plan</p>
                <p className='fw-normal'>Your total subscription amount is: <span className='fw-bold text-success'>{`ksh. ${total_contributions}`}</span></p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Account;