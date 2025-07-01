
import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from '@/components/ui/use-toast';
import { AuthService, User } from '@/services/AuthService';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  register: (email: string, password: string, name: string) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  
  // Check for saved auth on initial mount
  useEffect(() => {
    const savedUser = AuthService.getCurrentUser();
    if (savedUser) {
      setUser(savedUser);
    }
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const result = await AuthService.login(email, password);
      
      if (result.success && result.token) {
        const userData: User = {
          email,
          isAdmin: email.endsWith('@admin.com')
        };
        
        setUser(userData);
        localStorage.setItem('authToken', result.token);
        localStorage.setItem('user', JSON.stringify(userData));
        
        toast({
          title: 'Login successful',
          description: `Welcome back${userData.isAdmin ? ', admin' : ''}!`,
        });
        
        return true;
      } else {
        toast({
          title: 'Login failed',
          description: result.error || 'Invalid email or password',
          variant: 'destructive',
        });
        return false;
      }
    } catch (error) {
      console.error('Login error:', error);
      toast({
        title: 'Login error',
        description: 'An unexpected error occurred. Please try again.',
        variant: 'destructive',
      });
      return false;
    }
  };

  const register = async (email: string, password: string, name: string) => {
    try {
      const result = await AuthService.register(email, password, name);
      
      if (result.success) {
        toast({
          title: 'Registration successful',
          description: 'Your account has been created. You can now log in.',
        });
        return true;
      } else {
        toast({
          title: 'Registration failed',
          description: result.error || 'Failed to create account',
          variant: 'destructive',
        });
        return false;
      }
    } catch (error) {
      console.error('Registration error:', error);
      toast({
        title: 'Registration error',
        description: 'An unexpected error occurred. Please try again.',
        variant: 'destructive',
      });
      return false;
    }
  };

  const logout = () => {
    AuthService.logout();
    setUser(null);
    toast({
      title: 'Logged out',
      description: 'You have been successfully logged out',
    });
  };

  return (
    <AuthContext.Provider value={{
      user,
      isAuthenticated: !!user,
      isAdmin: user?.isAdmin || false,
      login,
      register,
      logout
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
