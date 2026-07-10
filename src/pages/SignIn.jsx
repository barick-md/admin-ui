import React, {useState, useContext} from 'react';
import AuthLayout from '../component/Layouts/AuthLayout';
import FormSignIn from '../component/Fragments/FormSignIn';
import { loginService } from '../services/authService'; 
import { AuthContext } from '../context/authContext';
import AppSnackbar from '../component/Elements/AppSnackbar';

function SignIn() {
    const {login} = useContext (AuthContext);

    const [snackbar, setSnackbar] = useState({
      open: false,
      message: "",
      severity: "success",
    }); 
    
    const handleCloseSnackbar = () => {
      setSnackbar((prev) => ({ ...prev, open: false }));
    };

  	const handleLogin = async (email, password) => {
      try {
        const { refreshToken } = await loginService(email, password);
        
        login(refreshToken); 
      } catch (err) {
        setSnackbar({ open: true, message: err.msg, severity: "error" });
      }
    };

  return (
    <>
      <AuthLayout>
        <FormSignIn onSubmit={handleLogin}/>

        <AppSnackbar
          open={snackbar.open}
          message={snackbar.message}
          severity={snackbar.severity}
          onClose={handleCloseSnackbar}
        />
      </AuthLayout>
    </>
    
  )
}

export default SignIn;