import { useAuth0 } from "@auth0/auth0-react";
import { IconButton } from "@mui/material";
import AuthMenu from "./AuthMenu";
import PersonIcon from "@mui/icons-material/Person";

const AuthButtons = () => {
  const { loginWithRedirect, isAuthenticated } = useAuth0();

  return (
    <div>
      {isAuthenticated ? (
        <AuthMenu />
      ) : (
        <IconButton onClick={() => loginWithRedirect()} color="primary">
          <PersonIcon />
        </IconButton>
      )}
    </div>
  );
};

export default AuthButtons;
