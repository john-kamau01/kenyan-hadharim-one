import { createContext, useContext, useEffect, useState } from "react";
import { auth, db } from "../firebase/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  sendEmailVerification
} from 'firebase/auth';

import { collection, doc, getDoc, getDocs, onSnapshot, orderBy, query, where } from 'firebase/firestore';

const AuthContext = createContext();

export const AuthContextProvider = ({children}) => {
  // will hold the state for the single user created
  const [user, setUser] = useState({});
  const [userData, setUserData] = useState({});
  // Hold all users from our DB
  const [users, setUsers] = useState([]);
  
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingArticles, setIsLoadingArticles] = useState(true);
  const [isLoadingUserArticles, setIsLoadingUserArticles] = useState(true);
  const [isLoadingUser, setIsLoadingUser] = useState(true);
  const [isLoadingUserSubscriptions, setIsLoadingUserSubscriptions] = useState(true);
  const [isLoadingAllSubscribers, setIsLoadingAllSubscribers] = useState(true);

  const [articles, setArticles] = useState([]);
  const [subscriptions, setSubscriptions] = useState([]);
  const [userSubscriptions, setUserSubscriptions] = useState([]);

  const [allSubscribers, setAllSubscribers] = useState([]);

  const [userArticles, setUserArticles] = useState([]);
  const [currentUserID, setCurrentUserID] = useState();

  //Get the users collection
  const usersCollectionRef = collection(db, 'users');
  const subscribersCollectionRef = collection(db, 'subscribers');
  const articlesCollectionRef = collection(db, 'articles');
  const subscriptionsCollectionRef = collection(db, 'subscriptions');
  const allSubscribersCollectionRef = collection(db, "subscribers");

  // Register User
  const createUser = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  // Login User
  const loginUser = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  // Sign Out User
  const logout = () => {
    return signOut(auth);
  };

  //Verify email
  const verifyEmail = () => {
    return sendEmailVerification(auth.currentUser);
  };

  // Use this hook to set the user state variable to the current user
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => {
      unsubscribe();
    }
  },[]);

  // Use this hook to retrieve all the users from the database
  useEffect(() => {
    const getUsers = async () => {
      onSnapshot(usersCollectionRef, (data) => {
        setUsers(data.docs.map((doc) => ({...doc.data(), id: doc.id})));
        setIsLoading(false);
      })
    };

    return () => {
      getUsers();
    }
  },[]);

  useEffect(() => {
    const getArticles = async () => {
      const q = query(articlesCollectionRef, orderBy('createdAt', 'desc'));
      onSnapshot(q, (data) => {
        // setIsLoadingArticles(true);
        setArticles(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
        setIsLoadingArticles(false);
      })
    };

    return () => {
      getArticles();
    }
  },[]);

  useEffect(() => {
    const getSubscriptions = async () => {
      const q = query(subscriptionsCollectionRef, orderBy('createdAt', 'desc'));
      onSnapshot(q, (data) => {
        setSubscriptions(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
        setIsLoading(false);
      })
    };

    return () => {
      getSubscriptions();
    }
  },[user]);

  useEffect(() => {
    const getAllSubscribers = async () => {
      const q = query(allSubscribersCollectionRef, orderBy('subscription_date', 'desc'));
      onSnapshot(q, (data) => {
        setAllSubscribers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
        setIsLoadingAllSubscribers(false);
      })
    };

    return () => {
      getAllSubscribers();
    }

  },[user]);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if(user){
        const userID = user.uid;
        setCurrentUserID(userID);
      }

    });
  },[]);

  useEffect(() => {
    const fetchData = async () =>{
      if(currentUserID !== undefined){
        onSnapshot(doc(db, "users", currentUserID), (doc) => {
          // console.log("Current data: ", doc.data());
          setUserData(doc.data());
          setIsLoadingUser(false);
      });
      }
    };
    fetchData();
  },[user]);

  useEffect(() => {
    const fetchUserArticles = async () =>{
      if(currentUserID !== undefined){
        const q = query(collection(db, "articles"), where("userID", "==", `${currentUserID}`));
        onSnapshot(q, (data) => {
          setUserArticles(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
          setIsLoadingUserArticles(false);
        });
      }
    };

    fetchUserArticles();

  },[user]);

  useEffect(() => {
    const fetchUserSubscriptions = async () =>{
      if(currentUserID !== undefined){
        const q = query(collection(db, "subscribers"), where("userID", "==", `${currentUserID}`));
        onSnapshot(q, (data) => {
          // setIsLoadingArticles(true);
          setUserSubscriptions(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
          setIsLoadingUserSubscriptions(false);
        });
      }
    };

    fetchUserSubscriptions();

  },[user]);


  return (
    <AuthContext.Provider value={{ createUser, loginUser, logout, user, users, usersCollectionRef, isLoading, articles, isLoadingArticles, verifyEmail, currentUserID, userData, isLoadingUser, userArticles, isLoadingUserArticles, subscriptions, subscriptionsCollectionRef, subscribersCollectionRef, userSubscriptions, isLoadingUserSubscriptions, allSubscribers }}>
      {children}
    </AuthContext.Provider>
  );
};

export const UserAuth = () => {
  return useContext(AuthContext);
};