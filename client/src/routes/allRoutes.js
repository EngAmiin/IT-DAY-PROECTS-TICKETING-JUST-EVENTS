import Home from '../components/Home'
import Projects from '../pages/Projects';
import Register from '../pages/Register'
export const routes = [
  {
    path: "/",
    component: Home,
    exact: true,
  },
  {
    path: "/projects",
    component: Projects,
    exact: true,
  },
  {
    path: "/register",
    component: Register,
    exact: true,
  },
];
