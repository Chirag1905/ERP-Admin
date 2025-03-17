// import { useEffect } from 'react';
// import { Outlet, useNavigate } from 'react-router-dom';
// import PageNotFound from '../pages/auth/PageNotFound';

// const PrivateRoutes = (props) => {
//     const navigate = useNavigate();

//     const isAuthenticated = !!token;
//     const isAuthorized = allowedRoles ? allowedRoles.includes(role) : true;

//     useEffect(() => {
//         if (isAuthenticated) {
//             const currentPath = location.pathname;

//             if (role === 'admin' && adminRoutes.includes(currentPath)) {
//                 return;
//             } else if (role === 'restaurant' && restaurantOwnerRoutes.includes(currentPath)) {
//                 return;
//             } else if (role === 'admin') {
//                 navigate('/admin/dashboard');
//             } else if (role === 'restaurant') {
//                 navigate(`/restaurantPanel/dashboard/${rolewiseId}`);
//             }
//         } else {
//             navigate('/auth-signin');
//         }
//     }, [isAuthenticated, isAuthorized, navigate]);

//     return isAuthenticated && isAuthorized ? <Outlet /> : <PageNotFound />;
// };

// export default PrivateRoutes;

import React from 'react'

const PrivateRoute = () => {
  return (
    <div>PrivateRoute</div>
  )
}

export default PrivateRoute