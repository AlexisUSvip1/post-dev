import { makeStyles } from "@mui/styles";
export const useStyles = makeStyles({
  newsPost: {
    position: "relative",
    top: "8%",
    width: "75%",
    height: "90vh",
    left: "1%",
    display: "flex",
    justifyContent: "center",
    alignItems: "flex-start",
    flexDirection: "column",
    overflow: "hidden",
  },
  postsContainer: {
    width: "100%",
    maxHeight: "90%",
    padding: "10px",
    display: "flex",
    justifyContent: "center",
    flexWrap: "wrap",
    flexDirection: "row",
    gap: "10px",
    scrollbarWidth: "thin" /* Firefox */,
    scrollbarColor: "rgba(255,255,255,0.5) rgba(0,0,0,0.2)",
  },
  postCard: {
    padding: "15px",
    borderRadius: "10px",
    width: "90%",
    height: "auto",
    background: "rgba(90,99,106,0.30)",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    borderRadius: "50%",
    width: "40px",
    height: "40px",
  },
  containerImagesPost: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    maxHeight: "250px",
    overflow: "hidden",
    borderRadius: "8px",
    flexGrow: 1, // 📌 Empuja el contenido hacia arriba,
    flexDirection: "column",
  },
  fullImage: {
    width: "100%",
    height: "85%",
    objectFit: "cover",
    borderRadius: "15px",
  },
  multiImageContainer: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(100px, 1fr))",
    gap: "5px",
    width: "100%",
    height: "100%",
  },
  multiImage: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    borderRadius: "8px",
  },
  masonryGrid: {
    display: "flex",
    marginLeft: "-38px", // Espaciado entre columnas
    width: "100%",
    marginTop: "50px",
    height: "90vh",
    overflowY: "scroll",
  },
  masonryColumn: {
    paddingLeft: "16px",
    backgroundClip: "padding-box",
    "& > div": {
      marginBottom: "16px",
    },
  },
  moreImagesOverlay: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "rgba(0, 0, 0, 0.6)",
    color: "white",
    fontSize: "18px",
    fontWeight: "bold",
    borderRadius: "8px",
  },
  postImage: {
    maxWidth: "100%",
    maxHeight: "100%",
    objectFit: "contain",
    borderRadius: "100px",
  },
  imagePreview: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    borderRadius: "100px",
  },
  iconContainer: {
    display: "flex",
    width: "100%",
    alignSelf: "flex-start",
  },
  baseEmpty: {
    width: "100%",
    height: "80vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  "::-webkit-scrollbar": {
    width: "8px",
  },
  "::-webkit-scrollbar-track": {
    background: "rgba(0,0,0,0.2)",
    borderRadius: "10px",
  },
  "::-webkit-scrollbar-thumb": {
    background: "rgba(255,255,255,0.5)",
    borderRadius: "10px",
  },
  "::-webkit-scrollbar-thumb:hover": {
    background: "rgba(255,255,255,0.7)",
  },
});
