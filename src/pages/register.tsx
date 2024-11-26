import React from 'react';

import Layout from '@/shared/ui/layout';
import Register from '@/features/auth/ui/register-form';

const SignInAndRegister = () => {
  return (
    <Layout>
      <div className="container flex flex-col items-center w-full h-screen">
        {/* // Render the Register component inside the container element. */}
        <Register />
      </div>
    </Layout>
  );
};
export default SignInAndRegister;
