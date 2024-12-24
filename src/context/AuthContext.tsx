// src/context/UserContext.tsx
import React, { createContext, useState, useEffect, ReactNode } from "react";
import { auth } from "../services/firebaseConfig";
import supabase from "../services/supabase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";

interface User {
  id: string;
  email: string;
  name?: string;
}

interface UserContextProps {
  user: User | null;
  loading: boolean;
  signUpUser: (email: string, password: string, name: string) => Promise<void>;
  signInUser: (email: string, password: string) => Promise<void>;
  signOutUser: () => Promise<void>;
}

const UserContext = createContext<UserContextProps | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (firebaseUser) => {
      if (firebaseUser) {
        const { data, error } = await supabase
          .from("users")
          .select("*")
          .eq("email", firebaseUser.email)
          .single();

        if (data) {
          setUser({ id: data.id, email: data.email, name: data.name });
        }
      } else {
        setUser(null);
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const signUpUser = async (email: string, password: string, name: string) => {
    try {
      const firebaseUser = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      if (firebaseUser) {
        const { data, error }: { data: any; error: any } = await supabase
          .from("users")
          .insert([{ email, name }])
          .single();
          if (error) {
            throw error;
          }

        if (data) {

          
          setUser({ id: data.id, email: data.email, name: data.name });
        }
      }
    } catch (error) {
      console.error("Error signing up: ", error);
    }
  };

  const signInUser = async (email: string, password: string) => {
    try {
      const firebaseUser = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      if (firebaseUser) {
        const { data, error } = await supabase
          .from("users")
          .select("*")
          .eq("email", email)
          .single();

        if (data) {
          setUser({ id: data.id, email: data.email, name: data.name });
        }
      }
    } catch (error) {
      console.error("Error signing in: ", error);
    }
  };

  const signOutUser = async () => {
    try {
      await auth.signOut();
      setUser(null);
    } catch (error) {
      console.error("Error signing out: ", error);
    }
  };

  return (
    <UserContext.Provider
      value={{ user, loading, signUpUser, signInUser, signOutUser }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useAuth = () => {
  const context = React.useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
