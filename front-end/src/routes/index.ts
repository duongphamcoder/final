import { createBrowserRouter } from 'react-router-dom';

// Public routes
import { publicRoutes } from './publics';
import { privateRoutes } from './privates';

export const routes = createBrowserRouter([...publicRoutes, ...privateRoutes]);
