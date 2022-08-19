import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import App from "./App";
import Todos from "./components/Todos";
import Error404 from "./components/Error404";
import { Users } from "./interfaces/Interfaces";
import axios from "axios";
import Loader from "./helpers/Loader";

const Router = () => {
  const [users, setUsers] = useState<Users[]>([]);
  const [isLoading, setIsLoading] = useState<Boolean>(true);
  const [isError, setIsError] = useState<Boolean>(false);

  const getUsers = async () => {
    setIsLoading(true);
    try {
      const result = await axios
        .get("https://jsonplaceholder.typicode.com/users")
        .then((res) => res.data);
      setUsers(result);
      setIsError(false);
    } catch (err) {
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (users.length === 0) {
      getUsers();
    }
  }, []);

  const appProps = {
    users,
    isLoading,
    isError,
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/users" element={<App {...appProps} />}>
          <Route path=":userId" element={<Todos />} />
        </Route>
        <Route
          path="*"
          element={
            <Navigate
              to={users.length > 0 ? `/users/${users[0]?.id}` : "/error"}
              replace={true}
            />
          }
        />
        <Route path="/error" element={<Error404 />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
