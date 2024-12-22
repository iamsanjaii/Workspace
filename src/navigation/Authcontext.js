import React, { createContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import jwtDecode from "jwt-decode";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(null);
    const [userID, setUserID] = useState(null);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const storedToken = await AsyncStorage.getItem("authToken");
                if (storedToken) {
                    setToken(storedToken);
                    const decodedToken = jwtDecode(storedToken);
                    setUserID(decodedToken?.userID || null);
                }
            } catch (error) {
                console.error("Error fetching user data:", error);
            }
        };
        fetchUser();
    }, []);

    return (
        <AuthContext.Provider
            value={{
                token,
                setToken,
                userID,
                setUserID,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export { AuthContext, AuthProvider };
