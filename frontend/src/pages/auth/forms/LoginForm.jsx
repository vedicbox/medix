import { Box, IconButton, InputAdornment } from "@mui/material";
import MuiSubmitBtn from "components/button/MuiSubmitBtn";
import Iconify from "components/icons/Iconify";
import MuiOutlinedField from "components/mui/MuiOutlinedField";
import MuiTextField from "components/mui/MuiTextField";
import { forwardRef, useState } from "react";

const LoginForm = forwardRef((props, ref) => {
  // Props
  const { onSubmit, errors, isLoading, onChange, onBlur } = props;

  // States
  const [showPassword, setShowPassword] = useState(false);

  // Handlers
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <form noValidate ref={ref}>
      <div className="mb-4">
        <MuiTextField
          label="Org Code"
          error={errors["orgCode"]}
          textProps={{
            placeholder: "xyz",
            name: "orgCode",
            size: "medium",
            onChange,
            onBlur,
          }}
        />
      </div>
      <div className="mb-4">
        <MuiTextField
          label="Email Address"
          error={errors["email"]}
          textProps={{
            name: "email",
            placeholder: "user@gmail.com",
            size: "medium",
            onChange,
            onBlur,
          }}
        />
      </div>

      <div className="mb-4">
        <MuiOutlinedField
          label="Password"
          error={errors["password"]}
          textProps={{
            name: "password",
            placeholder: "******",
            type: showPassword ? "text" : "password",
            onChange,
            onBlur,
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                  size="large"
                >
                  {showPassword ? (
                    <Iconify icon="majesticons:eye-off-line" />
                  ) : (
                    <Iconify icon="ion:eye-outline" />
                  )}
                </IconButton>
              </InputAdornment>
            ),
            size: "medium",
          }}
        />
      </div>

      <Box sx={{ mt: 2 }}>
        <MuiSubmitBtn
          onSubmit={onSubmit}
          isLoading={isLoading}
          text="Sign In"
          btnProps={{
            fullWidth: true,
            size: "large",
          }}
        />
      </Box>
    </form>
  );
});

LoginForm.displayName = "LoginForm";

export default LoginForm;
