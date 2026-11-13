"use client";

import { createContext, useContext, useEffect, useState } from "react";

import { onAuthStateChanged, type User } from "firebase/auth";

import { auth } from "@/firebase/auth";
import { syncUserProfile } from "@/firebase/user";

interface AuthContextValue {
  user: User | null;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(
      auth,
      async (currentUser) => {
        setUser(currentUser);

        try {
          if (currentUser) {
            await syncUserProfile(currentUser);
          }
        } catch (error: unknown) {
          console.error("Failed to synchronize user profile:", error);
        } finally {
          setIsLoading(false);
        }
      },
      () => {
        setUser(null);
        setIsLoading(false);
      },
    );

    return unsubscribe;
  }, []);

  return (
    <AuthContext.Provider value={{ user, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
}

// "use client";

// import { createContext, useContext, useEffect, useState } from "react";
// import { onAuthStateChanged, type User } from "firebase/auth";

// import { auth } from "@/firebase/auth";
// import { syncUserProfile } from "@/firebase/user";

// interface AuthContextValue {
//   user: User | null;
//   isLoading: boolean;
// }

// const AuthContext = createContext<AuthContextValue | undefined>(undefined);

// export function AuthProvider({ children }: { children: React.ReactNode }) {
//   const [user, setUser] = useState<User | null>(null);
//   const [isLoading, setIsLoading] = useState(true);

//   useEffect(() => {
//     const unsubscribe = onAuthStateChanged(
//       auth,
//       async (currentUser) => {
//         setUser(currentUser);

//         try {
//           if (currentUser) {
//             await syncUserProfile(currentUser);
//           }
//         } catch (error: unknown) {
//           console.error(
//             "Failed to synchronize user profile:",
//             error,
//           );
//         } finally {
//           setIsLoading(false);
//         }
//       },
//     // const unsubscribe = onAuthStateChanged(
//     //   auth,
//     //   (currentUser) => {
//     //     setUser(currentUser);
//     //     setIsLoading(false);
//     //   },
//     //   () => {
//     //     setUser(null);
//     //     setIsLoading(false);
//     //   },
//     // );

//     return unsubscribe;
//   }, []);

//   return (
//     <AuthContext.Provider value={{ user, isLoading }}>
//       {children}
//     </AuthContext.Provider>
//   );
// }

// export function useAuth() {
//   const context = useContext(AuthContext);

//   if (!context) {
//     throw new Error("useAuth must be used within an AuthProvider");
//   }

//   return context;
// }
