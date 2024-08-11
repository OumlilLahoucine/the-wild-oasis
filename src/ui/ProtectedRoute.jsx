import { useUser } from "../features/authentication/useUser";
import styled from "styled-components";
import Spinner from "../ui/Spinner";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const FullPage = styled.div`
  height: 100dvh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

function ProtectedRoute({ children }) {
  // 1. Load the current user
  const { user, isLoading, isAuthenticated } = useUser();
  const navigate = useNavigate();

  // 3. If not authorized redirect to login page
  useEffect(() => {
    if (!isAuthenticated && !isLoading) navigate("/login");
  }, [isAuthenticated, isLoading, navigate]);

  // 2. While loading, show the Spinner
  if (isLoading)
    return (
      <FullPage>
        <Spinner />;
      </FullPage>
    );

  // 4. If authorized show the children
  if (isAuthenticated) return children;
}

export default ProtectedRoute;
