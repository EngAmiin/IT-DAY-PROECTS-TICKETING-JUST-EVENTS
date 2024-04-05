import Home from '../components/Home'
import Projects from '../pages/Projects';
import Register from '../pages/Register'
import Login from '../pages/Login';
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
  {
    path: "/login",
    component: Login,
    exact: true,
  },
];
