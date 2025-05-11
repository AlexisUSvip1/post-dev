/* eslint-disable react/react-in-jsx-scope */
import { Box, Typography, Button } from "@mui/material";
import { useStyles } from "./Login.style";
import googleIcon from "../../../assets/googleIcon.svg";
import { useTranslation } from "react-i18next";
import { useLoginHook } from "./Login.hook";
export const Login = () => {
  const classes = useStyles();
  const { t } = useTranslation(); // Hook to get translation function
  const { handleGoogleLogin } = useLoginHook();
  return (
    <>
      <Box className={classes.container}>
        <Typography variant="h3" component="h2">
          <span className={classes.title}>{"{Post"}</span>{" "}
          <span className={classes.devPart}>{"dev}"}</span>
        </Typography>
        <Typography variant="h4" component="p" className={classes.subtitle}>
          {t("¿Quieres ver lo último para desarrolladores?")}
        </Typography>
        <Button
          onClick={handleGoogleLogin}
          sx={{
            backgroundColor: "white",
            color: "#5A636A",
            fontWeight: "bold",
            borderRadius: "100px",
          }}
        >
          <img
            src={googleIcon}
            width={45}
            height={45}
            alt="Ícono de cuenta de Google"
          />
          {t("Inicia sesión con Google")}
        </Button>
        <div className={classes.blurEffect}></div>
      </Box>
    </>
  );
};
