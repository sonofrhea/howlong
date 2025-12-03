import apiClient from './BaseEngine';



const HandleLogin = async (email: string, password: any) => {
  try {
    const response = await apiClient.post('http://127.0.0.1:8000/dj-rest-auth/login/', {
      email,
      password
    });
    localStorage.setItem('token', response.data.key);
    return response.data; // Return user data if needed
  } catch (error: any) {
    console.error('Login failed:', error.response?.data || error.message);
    throw error; // Re-throw for the calling component to handle
  }
};
export default HandleLogin;
