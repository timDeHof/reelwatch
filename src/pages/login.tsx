import React from 'react';

import Layout from '@/shared/ui/layout';
import { LoginForm } from '@/features/auth';

const LoginPage = () => {
  return (
    <Layout>
      <div className="container flex flex-col items-center w-full h-screen">
        {/* Render the Login component inside the container element. */}
        <LoginForm />
      </div>
    </Layout>
  );
};
export default LoginPage;
