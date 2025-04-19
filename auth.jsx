import { createContext, useState } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  
 
  const users = [
    { email: 'meen@example.com', password: 'meen123' },
    { email: 'deep@example.com', password: 'deep123' }
  ];

  const login = (email, password) => {
    const foundUser = users.find(u => 
      u.email === email && u.password === password
    );
    
    if (foundUser) {
      setUser({ email });
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};