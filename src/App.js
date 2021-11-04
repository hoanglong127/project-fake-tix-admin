import "./App.css";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { BrowserRouter, Switch } from "react-router-dom";
import AdminLayout from "./HOCs/Layouts/AdminLayout";
import Movies from "./views/Movies";
import Users from "./views/Users";
import Signin from "./views/Signin";
import AddMovie from "./views/Movies/AddMovie";
import EditMovie from "./views/Movies/EditMovie";
import Showtime from "./views/Movies/Showtime";
import { AuthRoute, PrivateRoute } from "./HOCs/Routes";
import { fetchAdminInfo } from "./store/actions/authAction";
import AddUser from "./views/Users/AddUser";
import EditUser from "./views/Users/EditUser";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    if (localStorage.getItem("t_a")) dispatch(fetchAdminInfo);
  }, []);

  return (
    <BrowserRouter>
      <AdminLayout>
        <Switch>
          <PrivateRoute
            path="/movies/addMovie"
            component={AddMovie}
            redirectPath="/"
          />
          <PrivateRoute
            path="/movies/editMovie/:id"
            component={EditMovie}
            redirectPath="/"
          />
          <PrivateRoute
            path="/movies/showtime/:id"
            component={Showtime}
            redirectPath="/"
          />
          <PrivateRoute
            path="/users/addUser"
            component={AddUser}
            redirectPath="/"
          />
          <PrivateRoute
            path="/users/editUser/:username"
            component={EditUser}
            redirectPath="/"
          />
          <PrivateRoute
            exact
            path="/movies"
            component={Movies}
            redirectPath="/"
          />
          <PrivateRoute
            exact
            path="/users"
            component={Users}
            redirectPath="/"
          />
          <AuthRoute exact path="/" component={Signin} redirectPath="/movies" />
        </Switch>
      </AdminLayout>
    </BrowserRouter>
  );
}

export default App;
