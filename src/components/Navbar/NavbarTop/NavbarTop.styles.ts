import { makeStyles } from "@mui/styles";

export const useStyles = makeStyles({
  root: {
    width: "100%",
    top: 0,
    display: "flex",
    overflow: "hidden",
    alignItems: "center",
    position: "absolute",
    background: "transparent",
    borderBottom: "0.5px solid #5A636A",
  },
  toolbar: {
    width: "100%",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  logoContainer: {},
  searchBox: {
    padding: "6px 12px",
    backgroundColor: "#5A636A",
    borderRadius: "20px",
    width: "400px",
    color: "white",
    fontWeight: "bold",
  },
  rightSection: {
    display: "flex",
    alignItems: "center",
    gap: "16px",
    position: "relative",
    right: "120px",
  },
  userName: {
    color: "white",
    fontWeight: "bold",
  },
  newPostButton: {
    backgroundColor: "white",
    color: "black",
    fontWeight: "bold",
    display: "flex",
    alignItems: "center",
    gap: "8px",
    "&:hover": {
      backgroundColor: "#6A7A81",
    },
  },
  newPostIcon: {
    fontSize: "20px",
  },
});
