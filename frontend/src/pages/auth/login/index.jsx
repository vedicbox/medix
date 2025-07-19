import { debounce, Grid, Typography } from "@mui/material";
import { useCallback, useRef, useState } from "react";
import { useSignInMutation } from "service/auth/authService";
import { LOGIN_RULES } from "utils/security/ruleBox";
import { validateAll, validateField } from "utils/security/validation";
import AuthWrapper from "../AuthWrapper";
import LoginForm from "../forms/LoginForm";

export default function LoginPage() {
  // Refs
  const signinFormRef = useRef(null);

  // State
  const [errors, setErrors] = useState({});

  // API Mutation
  const [signInMutation, { isLoading }] = useSignInMutation();

  // Handlers
  const handleChange = useCallback(
    debounce((e) => {
      const { name, value } = e.target;

      if (errors[name]) {
        const validation = validateField(LOGIN_RULES[name], value);
        if (!validation.status) {
          setErrors((prev) => {
            const newErrors = { ...prev };
            delete newErrors[name];
            return newErrors;
          });
        }
      }
    }, 1200),
    [errors]
  );

  const handleBlur = useCallback((e) => {
    const { name, value } = e.target;
    if (!value) return;

    const validation = validateField(LOGIN_RULES[name], value);
    if (validation.status) {
      setErrors((prev) => ({ ...prev, [name]: validation.msg }));
    }
  }, []);

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      const credentials = Object.fromEntries(
        new FormData(signinFormRef.current)
      );

      try {
        const isValid = await validateAll(LOGIN_RULES, credentials);
        if (isValid) {
          await signInMutation(credentials);
        }
      } catch (err) {
        setErrors(err);
      }
    },
    [signInMutation]
  );

  return (
    <AuthWrapper>
      <Grid
        container
        sx={{ minHeight: "80vh" }}
        justifyContent="center"
        alignItems="center"
      >
        <Grid size={{ xs: 12, sm: 8 }}>
          <div className="d-flex justify-content-between align-items-center">
            <Typography variant="h4" gutterBottom>
              Sign In
            </Typography>
          </div>
          <Typography color="text.secondary" variant="body2" paragraph>
            Enter your credentials to continue
          </Typography>
          <hr className=" mb-4" />

          <LoginForm
            onSubmit={handleSubmit}
            onBlur={handleBlur}
            onChange={handleChange}
            errors={errors}
            ref={signinFormRef}
            isLoading={isLoading}
          />
        </Grid>
      </Grid>
    </AuthWrapper>
  );
}
