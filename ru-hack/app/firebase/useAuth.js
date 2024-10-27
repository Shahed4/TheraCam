// firebase/useAuth.js
import { useState, useEffect } from 'react';
import { auth } from './config';
import { onAuthStateChanged, signOut } from 'firebase/auth';

const useAuth = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);

  // Logout function
  const logout = () => signOut(auth);

  return { user, logout };
};

export default useAuth;
