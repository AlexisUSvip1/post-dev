import { makeStyles } from '@mui/styles';

export const useStyles = makeStyles({
  modal: {
    backdropFilter: 'blur(10px)',
    backgroundColor: 'rgba(87, 87, 87, 0)',
    display: 'flex',
    alignItems: 'center',
    zIndex: 10000,
    justifyContent: 'center',
  },
  modalBox: {
    width: '650px',
    backgroundColor: '#0D1F23',
    borderRadius: '30px',
    padding: '16px',
    border: '2px solid #5A636A',
  },
  title: {
    marginBottom: '16px',
    color: 'white',
  },
  textField: {
    color: 'white',
    backgroundColor: 'rgba(90,99,106,0.60)',
    borderRadius: '30px',
    '& .MuiOutlinedInput-root': {
      borderRadius: '30px',
    },
    '& .MuiInputBase-input::placeholder': {
      color: 'rgba(255, 255, 255, 0.41)',
    },
  },
  textFieldArea: {
    color: 'white',
    backgroundColor: 'rgba(90,99,106,0.60)',
    borderRadius: '30px',
    '& .MuiOutlinedInput-root': {
      borderRadius: '30px',
    },
    '& .MuiInputBase-input::placeholder': {
      color: 'rgba(255, 255, 255, 0.41)',
    },
  },
  closeButton: {
    width: '20px',
    color: 'white',
    marginBottom: '10px',
  },
  techCarousel: {
    marginTop: '16px',
    display: 'flex',
    overflowX: 'scroll',
    gap: '8px',
    paddingBottom: '8px',
    marginBottom: '16px',
    scrollbarWidth: 'none',
    '&::-webkit-scrollbar': {
      display: 'none',
    },
  },
  techButton: {
    minWidth: '110px',
    height: '30px',
    color: 'white',
    backgroundColor: 'rgba(90,99,106,0.40)',
    borderRadius: '20px',
    whiteSpace: 'nowrap',
  },
  fileUpload: {
    position: 'absolute',
    bottom: '2px',
    width: '97%',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTop: '2px solid white',
    paddingTop: '5px',
  },
  fileButton: {
    color: 'white',
  },
  imagePreview: {
    width: '50px',
    height: '50px',
    borderRadius: '100px',
    objectFit: 'cover',
    marginLeft: '15px',
  },
  textContainer: {
    backgroundColor: 'rgba(90,99,106,0.60)',
    height: '305px',
    borderRadius: '30px',
    position: 'relative',
    paddingBottom: '50px',
  },
  techButtonSelected: {
    minWidth: '110px',
    height: '30px',
    color: 'white',
    backgroundColor: 'rgba(255, 255, 255, 0.6)', // Color más claro al seleccionarlo
    borderRadius: '20px',
    whiteSpace: 'nowrap',
    border: '2px solid white', // Puedes ajustar el borde para mayor claridad
    '&:hover': {
      backgroundColor: 'rgba(255, 255, 255, 0.8)',
    },
  },
  ImagePost: {
    width: '50%',
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
  },
  moreFilesCircle: {
    width: '50px',
    height: '50px',
    borderRadius: '50%',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'white',
    fontSize: '16px',
  },
  buttonPost: {
    background: '#0D1F23',
    color: 'white',
    fontSize: '10px',
    borderRadius: '16px',
    transition: 'transform 0.3s ease-in-out',
    '&:disabled': {
      backgroundColor: '#d3d3d3',
      color: '#a1a1a1',
      cursor: 'not-allowed',
    },
    '&:hover': {
      transform: 'scale(1.0)',
    },
  },
  loadingDots: {
    display: 'inline-block',
    animation: '$jumpingDots 1.5s infinite',
  },
  '@keyframes jumpingDots': {
    '0%': { opacity: 0.2, transform: 'translateY(0px)' },
    '50%': { opacity: 1, transform: 'translateY(-5px)' },
    '100%': { opacity: 0.2, transform: 'translateY(0px)' },
  },
});
