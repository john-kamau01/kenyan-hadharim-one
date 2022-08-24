import { deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { deleteObject, ref } from 'firebase/storage';
import React, {useEffect, useState} from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import CheckUserRole from '../../../components/CheckUserRole';
import VerifyAccount from '../../../components/VerifyAccount';
import { UserAuth } from '../../../context/AuthContext';
import { db, storage } from '../../../firebase/firebase';
import Sidebar from '../Sidebar';

const Users = () => {
  let navigate = useNavigate();
  const { users, isLoading, user, userData } = UserAuth();

  if(user.emailVerified === false){
    return <VerifyAccount user={user} />
  };

  if( userData?.role !== 'admin' ){
    return <CheckUserRole />
  };

  const handleDelete = async (id, profile_image) => {
    try {
      await deleteDoc(doc(db, "users", id));
      const storageRef = ref(storage, profile_image);
      await deleteObject(storageRef);
      toast.success("User deleted successfully!");
      navigate("/admin/users");
    } catch (error) {
      toast.error("Error deleting the user.");
    }
  };

  const makeAdmin = async (id) => {
    const usersCollectionRef = doc(db, "users", id);
    try {
      await updateDoc(usersCollectionRef, {
        role: "admin"
      });
      toast.success("Success!");
    } catch (error) {
      console.log(error);
      toast.error("Error");
    }
  };

  return (
    <div className='container'>
      <ToastContainer />
      <div className='row'>
        <div className='col-md-3 col-xs-12 py-5'>
          <Sidebar />
        </div>

        <div className='col-md-9 col-xs-12 py-5'>
          <div className='row'>
            {isLoading ? (
              <div>
                <div className="spinner-border text-danger" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
                <p>Loading Users...</p>
              </div>
              ) : (
                <div className='table-responsive'>
                  <table className="table table-striped table-hover table-bordered">
                    <thead>
                      <tr>
                        <th scope="col">#</th>
                        <th scope="col">Name</th>
                        <th scope="col">Email</th>
                        <th scope="col">Phone</th>
                        <th scope="col">Subscription</th>
                        <th scope="col">Contributions</th>
                        <th scope="col">Role</th>
                        <th scope='col'>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {users?.map((user, index) => {
                        const {
                          id,
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
                        } = user;
                        return (
                          <tr key={user.id}>
                            <th scope="row">{index + 1}</th>
                            <td>{first_name}</td>
                            <td>{user?.email}</td>
                            <td>{user?.phone ? user.phone : 'Not available'}</td>
                            <td>{user?.subscription_level}</td>
                            <td>{total_contributions}</td>
                            <td>{user?.role}</td>
                            <td className='d-flex align-items-center'>
                              <button type="button" className="btn btn-warning btn-sm mx-1" data-bs-toggle="modal" data-bs-target={`#modal${user?.id}`}>
                                View
                              </button>

                              <div className="modal fade mx-1" id={`modal${user?.id}`} tabIndex={-1} aria-labelledby="userModalLabel" aria-hidden="true">
                                <div className="modal-dialog modal-dialog-scrollable">
                                  <div className="modal-content">
                                    <div className="modal-header">
                                      <h5 className="modal-title" id="userModalLabel">{`Welcome to ${user?.first_name}'s Profile`}</h5>
                                      <button type="button" className="btn-close btn-sm" data-bs-dismiss="modal" aria-label="Close"></button>
                                    </div>
                                    <div className="modal-body">
                                      <div className='row'>
                                        <div className='col-md-4 com-sm-12'>
                                          <img src={user?.profile_image} alt="profile image" style={{ width: "120px", height:"120px", borderRadius:"50%",objectFit:"cover",objectPosition:"center top" }} />
                                        </div>
                                        <div className='col-md-8 col-sm-12'>
                                          <table className="table table-responsive">
                                            <tbody>
                                              <tr>
                                                <th scope="row">Name:</th>
                                                <td>{user?.first_name + " " + user?.middle_name + " " + user?.last_name}</td>
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
                                              <tr>
                                                <th scope="row">Total Contribution:</th>
                                                <td>{total_contributions}</td>
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
                                      <button type="button" className="btn btn-secondary btn-sm" data-bs-dismiss="modal">Close</button>
                                    </div>
                                  </div>
                                </div>
                              </div>
                                                
                              <button type="button" className="btn btn-danger btn-sm mx-1" onClick={()=>handleDelete(id,profile_image)}>
                                Delete
                              </button>
                              {user?.role === "user" && (
                                <button type="button" className="btn btn-danger btn-sm mx-1" onClick={()=>makeAdmin(id)}>
                                Make Admin
                                </button>
                              )}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Users;