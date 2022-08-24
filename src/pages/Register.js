import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { UserAuth } from '../context/AuthContext';
import { addDoc, doc, serverTimestamp, setDoc } from 'firebase/firestore';
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import '../styles/register.css';
import { format, subMonths, subYears, max } from 'date-fns';
import { countryList } from '../components/data/countryList';
import { kenyanCounties } from '../components/data/kenyaCounties';
import {userCareers} from '../components/data/userCareers';
import { storage } from '../firebase/firebase';

const Register = () => {
  let navigate = useNavigate();
  const [file, setFile] = useState("");
  const [progress, setProgress] = useState(0);
  const [data, setData] = useState({
    children: "",
    clan_name: "",
    country: "",
    county: "",
    dob: "",
    email: "",
    first_name: "",
    gender: "",
    id_number: "",
    identity_type: "",
    kin_phone: "",
    last_name: "",
    marital_status: "",
    middle_name: "",
    next_of_kin: "",
    nhif_status: "",
    occupation: "",
    password: "",
    phone: "",
    sub_county: "",
    profile_image:"",
  });
  
  const [childFormValues, setChildFormValues] = useState([{ childName: "", childDOB: "", childGender: ""}]);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);

  const { createUser, usersCollectionRef, verifyEmail, user, subscribersCollectionRef } = UserAuth();

  useEffect(() => {
    const uploadFile = () => {
      const name = new Date().getTime() + file.name;
      const storageReference = ref(storage, `/profiles/${file.name}`);
      const uploadTask = uploadBytesResumable(storageReference, file);

      uploadTask.on('state_changed', 
        (snapshot) => {
          const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
          setProgress(progress);
          switch (snapshot.state) {
            case 'paused':
              console.log('Upload is paused');
              break;
            case 'running':
              console.log('Upload is running');
              break;
          }
        }, 
        (error) => {
          toast.error("There was an error uploading the image. Please try again.")
          console.log(error);
        }, 
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setData((prev) => ({...prev, profile_image: downloadURL}));
          });
        }
      );
      console.log(name)
    };

    file && uploadFile();
  },[file]);

  const handleInput = (e) => {
    const id = e.target.id;
    const value = e.target.value;
    setData({...data, [id]:value});
  };

  // const handleImageChange = (e) => {
  //   setData({...data, profile_image: e.target.files[0] });
  // };

  let handleChildFormChange = (i, e) => {
    let newChildFormValues = [...childFormValues];
    newChildFormValues[i][e.target.id] = e.target.value;
    setChildFormValues(newChildFormValues);
  };

  let addChildFormFields = () => {
    setChildFormValues([...childFormValues, { childName: "", childDOB:"", childGender: ""}])
  };

  let removeChildFormFields = (i) => {
      let newChildFormValues = [...childFormValues];
      newChildFormValues.splice(i, 1);
      setChildFormValues(newChildFormValues);
  };

  const handleAddUser = async (e) => {
    e.preventDefault();
    setFormErrors(validate(data));

    if(isSubmit){
      try {
        const res = await createUser(data.email, data.password);

        await setDoc(doc(usersCollectionRef, res.user.uid), {
          ...data,
          childFormValues,
          subscription_level: "Free",
          role: "user",
          total_contributions: 0,
          timeStamp: serverTimestamp()
        });

        await addDoc(subscribersCollectionRef, {
          email: data?.email,
          id:"Free",
          userID: res.user.uid,
          subscription_date: format(new Date(), "dd-MM-yyy"),
          subscription_expiry: "",
          subscription_period:"",
          subscription_plan: "Free",
          subscription_price: 0,
          subscription_status: "Approved",
          mpesa_code: "NO_CODE_FREE",
          name_of_subscriber: data?.first_name + " " + data?.last_name,
        });

        toast.success('Registration Successful. Check your email to verify account!');
        setTimeout(() => {
        navigate('/profile');
        verifyEmail();
        }, 1000);
      } catch (err) {
        if(err.code === 'auth/weak-password'){
          toast.error('Password is too short');
        }
        if(err.code === 'auth/email-already-in-use'){
          toast.error('Email is already in use');
        }
      }
    }
  };

  useEffect(() => {
    if(Object.keys(formErrors).length === 0){
      setIsSubmit(true);
    }
  }, [formErrors]);

  const validate = (values) => {
    const errors = {};
    const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if(!values.file){
      errors.file = "Please upload your profile";
    }
    if(!values.first_name){
      errors.first_name = "Please enter a name";
    }
    if(!values.middle_name){
      errors.middle_name = "Please enter a name";
    }
    if(!values.last_name){
      errors.last_name = "Please enter a name";
    }
    if(!values.clan_name){
      errors.clan_name = "Please enter a name";
    }
    if(!values.dob){
      errors.dob = "Please enter a date";
    }
    if(!values.gender){
      errors.gender = "Please enter your gender";
    }
    if(!values.marital_status){
      errors.marital_status = "Please enter your status";
    }
    if(!values.occupation){
      errors.occupation = "Please select your occupation";
    }
    if(!values.nhif_status){
      errors.nhif_status = "Please select your status";
    }
    if(!values.identity_type){
      errors.identity_type = "Please select your identity type";
    }
    if(!values.id_number){
      errors.id_number = "Please enter your ID Number";
    }
    if(!values.email){
      errors.email = "Please enter your email";
    } 
    if(!emailRegex.test(values.email)){
      errors.email = "Please enter a valid email";
    }
    if(!values.phone){
      errors.phone = "Please enter your phone number";
    }
    if(!values.password){
      errors.password = "Please enter your password";
    }
    if(values.password.length < 6){
      errors.password = "Password must be atleast 6 characters";
    }
    if(!values.next_of_kin){
      errors.next_of_kin = "Please enter your next of kin";
    }
    if(!values.kin_phone){
      errors.kin_phone = "Please enter phone number";
    }
    if(!values.country){
      errors.country = "Please select your country";
    }
    if(!values.children){
      errors.children = "Please select a value";
    }
    return errors;
  };

  useEffect(() => {
    if(user){
      navigate('/profile')
    }
  }, []);

  return (
    <div className='container'>
      <ToastContainer />
      <div className='row'>
        <div className='col-md-12 py-5'>
          <h1>Register</h1>
          <p className='pb-3'>Please fill in the form below to log in</p>

          <form onSubmit={handleAddUser}>
            <div className='row'>
              <div className='col-md-12'>
                <h4 className='title'>Profile:</h4>
                <hr />
              </div>
              <div className="col-md-3 mb-3">
                <img src={
                  file
                    ? URL.createObjectURL(file)
                    : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg" 
                  } 
                  alt=''
                  style={{ width: "100px",height: "100px", borderRadius: "50%", objectFit: "cover", marginBottom: "5px" }}
                />
                {progress === 0 && null }
                {progress > 0 && (
                  <div className="progress mb-2">
                    <div className="progress-bar progress-bar-success progress-bar-animated" style={{ width: `${progress}%`}}>
                      Uploading {progress}%
                    </div>
                  </div>
                )}
              </div>
              <div className="col-md-3 mb-3">
                <label htmlFor="file" className="form-label">Profile Image</label>
                <input 
                  type="file"
                  className="form-control" 
                  id="file" 
                  onChange={e => setFile(e.target.files[0])}
                  accept='image/*'
                  required={true}
                />
                <span className='text-danger text-sm'>{formErrors.file}</span>
              </div>
              <div className='col-md-12'>
                <h4 className='title'>Names in Full:</h4>
                <hr />
              </div>
              <div className="col-md-3 mb-3">
                <label htmlFor="first_name" className="form-label">First Name</label>
                <input 
                  type="text"
                  className="form-control" 
                  id="first_name" 
                  placeholder='First name'
                  onChange={handleInput}
                />
                <span className='text-danger text-sm'>{formErrors.first_name}</span>
              </div>
              <div className="col-md-3 mb-3">
                <label htmlFor="middle_name" className="form-label">Middle Name</label>
                <input 
                  type="text"
                  className="form-control" 
                  id="middle_name" 
                  placeholder='Middle name'
                  onChange={handleInput}
                />
                <span className='text-danger text-sm'>{formErrors.middle_name}</span>
              </div>
              <div className="col-md-3 mb-3">
                <label htmlFor="last_name" className="form-label">Last Name</label>
                <input 
                  type="text"
                  className="form-control" 
                  id="last_name" 
                  placeholder='Last name'
                  onChange={handleInput}
                />
                <span className='text-danger text-sm'>{formErrors.last_name}</span>
              </div>
              <div className="col-md-3 mb-3">
                <label htmlFor="clan_name" className="form-label">Clan Name</label>
                <input 
                  type="text"
                  className="form-control" 
                  id="clan_name" 
                  placeholder='Clan name' 
                  onChange={handleInput}
                />
                <span className='text-danger text-sm'>{formErrors.clan_name}</span>
              </div>
      
              <div className='col-md-12 py-3 mt-2'>
                <h4 className='title'>Details:</h4>
                <hr />
              </div>

              <div className="col-md-3 mb-3">
                <label htmlFor="dob" className="form-label">Date of Birth</label>
                <input 
                  type="date"
                  className="form-control" 
                  id="dob" 
                  placeholder='Enter your DOB'
                  onChange={handleInput}
                  max={format(subYears(new Date(), 18), "yyyy-MM-dd")}
                />
                <span className='text-danger text-sm'>{formErrors.dob}</span>
              </div>
              
              <div className="col-md-3 mb-3">
                <label htmlFor='gender' className="form-label">Gender</label>
                <select 
                  className="form-select" 
                  id="gender"
                  onChange={handleInput}
                  defaultValue={""}
                >
                  <option value="" disabled>Please select</option>
                  <option value="Female">Female</option>
                  <option value="Male">Male</option>
                </select>
                <span className='text-danger text-sm'>{formErrors.gender}</span>
              </div>
              <div className="col-md-3 mb-3">
                <label htmlFor='marital_status' className="form-label">Marital Status</label>
                <select 
                  className="form-select" 
                  id="marital_status" 
                  onChange={handleInput} 
                  defaultValue={""}
                >
                  <option value="" disabled>Please select</option>
                  <option value="Single">Single</option>
                  <option value="Married">Married</option>
                  <option value="Divorced">Divorced</option>
                  <option value="Widower">Widower</option>
                  <option value="Widow">Widow</option>
                </select>
                <span className='text-danger text-sm'>{formErrors.marital_status}</span>
              </div>
              <div className="col-md-3 mb-3">
                <label htmlFor='occupation' className="form-label">Occupation</label>
                <select 
                  className="form-select" 
                  id="occupation" 
                  onChange={handleInput}
                  defaultValue={""}
                >
                  <option value="" disabled>Please select</option>
                  {userCareers.map((career, index) => <option key={index} value={career}>{career}</option>)}
                </select>
                <span className='text-danger text-sm'>{formErrors.occupation}</span>
              </div>
              <div className="col-md-3 mb-3">
                <label htmlFor='nhif_status' className="form-label">NHIF Status</label>
                <select 
                  className="form-select" 
                  id="nhif_status" 
                  onChange={handleInput} 
                  defaultValue={""}
                >
                  <option value="" disabled>Please select</option>
                  <option value="Yes">Yes</option>
                  <option value="No">No</option>
                </select>
                <span className='text-danger text-sm'>{formErrors.nhif_status}</span>
              </div>

              <div className='col-md-12 py-3 mt-2'>
                <h4 className='title'>Identification:</h4>
                <hr />
              </div>

              <div className="col-md-3 mb-3">
                <label htmlFor='identity_type' className="form-label">Select Identity Type</label>
                <select 
                  className="form-select" 
                  id="identity_type" 
                  onChange={handleInput} 
                  defaultValue={""}
                >
                  <option value="" disabled>Please select</option>
                  <option value="National_ID">National ID</option>
                  <option value="Passport">Passport</option>
                </select>
                <span className='text-danger text-sm'>{formErrors.identity_type}</span>
              </div>

              {data?.identity_type === "National_ID" && (
                <div className="col-md-3 mb-3">
                  <label htmlFor="id_number" className="form-label">ID Number</label>
                  <input 
                    type="text" 
                    className="form-control" 
                    id="id_number" 
                    placeholder='ID Number'
                    onChange={handleInput}
                  />
                  <span className='text-danger text-sm'>{formErrors.id_number}</span>
                </div>
              )}

              {data?.identity_type === "Passport" && (
                <div className="col-md-3 mb-3">
                  <label htmlFor="passport_number" className="form-label">Passport Number</label>
                  <input 
                    type="text" 
                    className="form-control" 
                    id="passport_number" 
                    placeholder='Passport Number'
                    onChange={handleInput}
                  />
                </div>
              )}

              <div className='col-md-12 py-3 mt-2'>
                <h4 className='title'>Contact Details:</h4>
                <hr />
              </div>

              <div className="col-md-3 mb-3">
                <label htmlFor='email' className="form-label">Email</label>
                <input 
                  type="email" 
                  className="form-control" 
                  id="email" 
                  placeholder='Enter email'
                  onChange={handleInput}
                />
                <span className='text-danger text-sm'>{formErrors.email}</span>
              </div>
              <div className="col-md-3 mb-3">
                <label htmlFor='phone' className="form-label">Phone No.</label>
                <input 
                  type="tel" 
                  className="form-control" 
                  id="phone" 
                  placeholder='Enter phone no.'
                  onChange={handleInput}
                />
                <span className='text-danger text-sm'>{formErrors.phone}</span>
              </div>
              <div className="col-md-3 mb-3">
                <label htmlFor='password' className="form-label">Password</label>
                <input 
                  type="password" 
                  className="form-control" 
                  id="password" 
                  placeholder='Enter Password' 
                  onChange={handleInput}
                />
                <span className='text-danger text-sm'>{formErrors.password}</span>
              </div>

              <div className='col-md-12 py-3 mt-2'>
                <h4 className='title'>Next of Kin Details:</h4>
                <hr />
              </div>
              <div className="col-md-3 mb-3">
                <label htmlFor='nex_of_kin' className="form-label">Next of Kin</label>
                <input 
                  type="text" 
                  className="form-control" 
                  id="next_of_kin" 
                  placeholder='Enter your next of kin' 
                  onChange={handleInput}
                />
                <span className='text-danger text-sm'>{formErrors.next_of_kin}</span>
              </div>
              <div className="col-md-3 mb-3">
                <label htmlFor='kin_phone' className="form-label">Phone No. of Next of Kin</label>
                <input 
                  type="tel" 
                  className="form-control" 
                  id="kin_phone" 
                  placeholder='Enter phone no. of Next of Kin'
                  onChange={handleInput}
                />
                <span className='text-danger text-sm'>{formErrors.kin_phone}</span>
              </div>

              <div className='col-md-12 py-3 mt-2'>
                <h4 className='title'>Location Details:</h4>
                <hr />
              </div>
              <div className="col-md-3 mb-3">
                <label htmlFor='country' className="form-label">Country</label>
                <select 
                  className="form-select" 
                  id="country" 
                  onChange={handleInput}
                  defaultValue={""}
                >
                  <option value="" disabled>Please select your country</option>
                  {countryList?.map((country, index) => <option key={index} value={country}>{country}</option>)}
                </select>
                <span className='text-danger text-sm'>{formErrors.country}</span>
              </div>

              {data?.country !== "Kenya" && (
                <div className="col-md-3 mb-3">
                  <label htmlFor="city" className="form-label">City</label>
                  <input 
                    type="text" 
                    className="form-control" 
                    id="city" 
                    placeholder='Enter City of Residence'
                    onChange={handleInput}
                  />
                </div>
              )}

              {data?.country === "Kenya" && (
                <>
                  <div className="col-md-3 mb-3">
                    <label htmlFor="county" className="form-label">County</label>
                    <select 
                      className="form-select" 
                      id="county" 
                      onChange={handleInput} 
                      defaultValue={""}
                    >
                      <option value="" disabled>Please select</option>
                      {kenyanCounties?.map((county, index) => <option key={index} value={county}>{county}</option>)}
                    </select>
                    <span className='text-danger text-sm'>{formErrors.county}</span>
                  </div>
                  <div className="col-md-3 mb-3">
                    <label htmlFor="sub_county" className="form-label">Sub County</label>
                    <input 
                      type="text" 
                      className="form-control" 
                      id="sub_county" 
                      placeholder='Enter Sub County'
                      onChange={handleInput}
                    />
                    <span className='text-danger text-sm'>{formErrors.sub_county}</span>
                  </div>
                </>
              )}

            <div className='col-md-12 py-3 mt-2'>
              <h4 className='title'>Children Details:</h4>
              <hr />
            </div>

            <div className="col-md-3 mb-3">
              <label htmlFor="children" className="form-label">Do you have children</label>
              <select 
                className="form-select" 
                id="children" 
                onChange={handleInput} 
                defaultValue={""}
              >
                <option value="" disabled>Please select</option>
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </select>
              <span className='text-danger text-sm'>{formErrors.children}</span>
            </div>
            {data?.children === "Yes" && (
              childFormValues?.map((element, index) => (
                <div className="row" key={index}>
                  <div className='col-md-3 mb-3'>
                    <label htmlFor="childName" className="form-label">Name</label>
                    <input 
                      type="text"
                      className="form-control" 
                      id="childName"
                      onChange={e => handleChildFormChange(index, e)}
                      value={element.childName}
                      placeholder="Enter name of child"
                    />
                  </div>
                  <div className='col-md-2 mb-3'>
                    <label htmlFor="childDOB" className="form-label">Date of Birth</label>
                    <input 
                      type="date"
                      className="form-control" 
                      id="childDOB" 
                      placeholder='Enter Childs DOB'
                      onChange={e => handleChildFormChange(index, e)}
                      value={element.childDOB}
                      max={format(new Date(), "yyyy-MM-dd")}
                    />
                    
                  </div>
                  <div className="col-md-2 mb-3">
                    <label htmlFor='childGender' className="form-label">Gender</label>
                    <select 
                      className="form-select" 
                      id="childGender" 
                      onChange={e => handleChildFormChange(index, e)}
                      defaultValue={""}
                    >
                      <option value="" disabled>Please select</option>
                      <option value="Female">Female</option>
                      <option value="Male">Male</option>
                    </select>
                  </div>
                  <div className='col-md-4 mb-3 d-flex align-items-end'>
                    <button className="btn btn-success btn-sm me-1" type="button" onClick={() => addChildFormFields()}>Add</button>
                    {
                    index ?
                      <button type="button"  className="btn btn-danger btn-sm" onClick={() => removeChildFormFields(index)}>Remove</button> 
                    : null
                    } 
                  </div>
                </div>
              ))
            )}
            
          </div>
          <button type="submit" className="btn btn-danger ps-3">Register</button>
          </form>

          <p className='pt-3'>Already have an account? <Link to='/login' className="red__link-color" >Login Here</Link></p>
        </div>
      </div>
    </div>
  )
}

export default Register;