import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useUser } from "../features/authentication/useUser";
import Spinner from "./Spinner";
import { useEffect } from "react";

const FullPage = styled.div`
  height: 100vh;
  background-color: var(--color-grey-50);
  display: flex;
  align-items: center;
  justify-content: center;
`;

function ProtectedRouter({ children }) {
  const navigate = useNavigate();
  // load the authenticated user
  const { isPending, isAuth } = useUser();

  // if the user is not authenticated, redirect to the login page
  useEffect(
    function () {
      if (!isAuth && !isPending) navigate("/login");
    },
    [isAuth, isPending, navigate]
  );

  // while loading show a spnner
  if (isPending)
    return (
      <FullPage>
        <Spinner />;
      </FullPage>
    );

  if (isAuth) return children;
}
export default ProtectedRouter;
