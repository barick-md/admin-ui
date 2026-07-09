import React from 'react'
import AuthLayout from '../component/Layouts/AuthLayout';
import FormSignIn from '../component/Fragments/FormSignIn';

function SignIn() {
  return (
    <AuthLayout>
        <FormSignIn/>
    </AuthLayout>
  )
}

export default SignIn;