import React, { use } from 'react';
import { AuthContext } from '../Providers/AuthContext';

const useAuthContext = () => {
    const context = use(AuthContext);
    return context;
};

export default useAuthContext;