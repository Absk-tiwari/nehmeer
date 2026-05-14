import { lazy } from 'react';
import AdminProtectedRoute from '../components/AdminProtectedRoute';

const AdminLayout = lazy(() => import('../layouts/AdminLayout'));
const AdminLogin = lazy(() => import('../pages/AdminLogin'));
const AdminDashboard = lazy(() => import('../pages/AdminDashboard'));
const WorkersManagement = lazy(() => import('../pages/WorkersManagement'));
const PushNotifications = lazy(() => import('../pages/PushNotifications'));
const AdminSettings = lazy(() => import('../pages/AdminSettings'));

const AdminRoutes = [
  {
    path: '/admin/login',
    element: <AdminLogin />
  },
  {
    path: '/admin',
    element: (
      <AdminProtectedRoute>
        <AdminLayout />
      </AdminProtectedRoute>
    ),
    children: [
      { path: '', element: <AdminDashboard /> },
      { path: 'workers', element: <WorkersManagement /> },
      { path: 'notifications', element: <PushNotifications /> },
      { path: 'settings', element: <AdminSettings /> }
    ]
  }
];

export default AdminRoutes;
