import { getUserProfile } from "apis/user";
import { IUser } from "../interfaces/user";
import React from "react";

interface UserContextType {
    user: IUser | null;
    setUser: (user: IUser | null) => void;
    loading: boolean;
    error: Error | null;
    refreshProfile: () => Promise<void>;
}

const UserContext = React.createContext<UserContextType|undefined>(undefined);

export function useUser() {
    const context = React.useContext(UserContext);
    if (!context) {
        throw new Error("useUser must be used within a UserProvider");
    }
    return context;
}

export function ProfileProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = React.useState<IUser | null>(null);
    const [loading, setLoading] = React.useState(false);
    const [error, setError] = React.useState<Error | null>(null);

    const fetcherUser = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await getUserProfile();
            setUser(response.data);
            console.log("User profile fetched:", response.data);
        } catch (err) {
            setError(err as Error);
        } finally {
            setLoading(false);
        }
    }

    React.useEffect(() => {
        fetcherUser();
    }, []);

    return (
        <UserContext.Provider value={{ user, setUser, loading, error, refreshProfile: fetcherUser }}>
            {children}
        </UserContext.Provider>
    );
}