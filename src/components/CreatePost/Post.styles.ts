import { makeStyles } from "@mui/styles";

export const useStyles = makeStyles({
  modal: {
    backdropFilter: "blur(10px)",
    backgroundColor: "rgba(87, 87, 87, 0)",
    display: "flex",
    alignItems: "center",
    zIndex: 10000,
    justifyContent: "center",
  },
  modalBox: {
    width: "500px",
    backgroundColor: "#0D1F23",
    borderRadius: "30px",
    padding: "16px",
    border: "2px solid #5A636A",
  },
  title: {
    marginBottom: "16px",
  },
  textField: {
    color: "white",
    backgroundColor: "rgba(90,99,106,0.60)",
    borderRadius: "30px",
    "& .MuiOutlinedInput-root": {
      borderRadius: "30px",
    },
    "& .MuiInputBase-input::placeholder": {
      color: "rgba(255, 255, 255, 0.41)",
    },
  },
  textFieldArea: {
    color: "white",
    backgroundColor: "rgba(90,99,106,0.60)",
    borderTopRightRadius: "30px",
    borderTopLeftRadius: "30px",
    "& .MuiOutlinedInput-root": {
      borderTopRightRadius: "30px",
      borderTopLeftRadius: "30px",
    },
    "& .MuiInputBase-input::placeholder": {
      color: "rgba(255, 255, 255, 0.41)",
    },
  },
  techCarousel: {
    marginTop: "16px",
    display: "flex",
    overflowX: "scroll",
    gap: "8px",
    paddingBottom: "8px",
    marginBottom: "16px",
    scrollbarWidth: "none",
    "&::-webkit-scrollbar": {
      display: "none",
    },
  },
  techButton: {
    minWidth: "110px",
    height: "30px",
    color: "white",
    backgroundColor: "rgba(90,99,106,0.40)",
    borderRadius: "20px",
    whiteSpace: "nowrap",
  },
  fileUpload: {
    marginBottom: "16px",
  },
  fileButton: {
    width: "100%",
    color: "white",
    borderBottomRightRadius: "30px",
    borderBottomLeftRadius: "30px",
    backgroundColor: "rgba(90,99,106,0.60)",
    border: "none",
  },
  submitButton: {
    marginTop: "16px",
    width: "100%",
    borderRadius: "100px",
  },
});