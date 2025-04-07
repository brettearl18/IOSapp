import React, { createContext, useState, useEffect } from 'react';
import { auth, db } from '../api/firebaseConfig';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';

export const AuthContext = createContext({
  user: null,
  userRole: null,
  loading: true,
  login: async () => {},
  register: async () => {},
  logout: async () => {},
});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [userRole, setUserRole] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setUser(user);
        // Fetch user role from Firestore
        const userDoc = await getDoc(doc(db, 'users', user.uid));
        if (userDoc.exists()) {
          setUserRole(userDoc.data().role);
        }
      } else {
        setUser(null);
        setUserRole(null);
      }
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const login = async (email, password) => {
    try {
      const { user, error } = await loginWithEmail(email, password);
      if (error) throw new Error(error);
      return { error: null };
    } catch (error) {
      return { error: error.message };
    }
  };

  const register = async (email, password, role) => {
    try {
      const { user, error } = await registerWithEmail(email, password, role);
      if (error) throw new Error(error);
      return { error: null };
    } catch (error) {
      return { error: error.message };
    }
  };

  const logout = async () => {
    try {
      const { error } = await logoutUser();
      if (error) throw new Error(error);
      return { error: null };
    } catch (error) {
      return { error: error.message };
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        userRole,
        loading,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}; 