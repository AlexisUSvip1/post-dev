import { makeStyles } from '@mui/styles';

export const useStyles = makeStyles({
  formWrapper: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
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
  previewBox: {
    display: 'flex',
    gap: '20px',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(90,99,106,0.20)',
    padding: '20px',
    borderRadius: '30px',
    flexWrap: 'wrap',
  },
  previewImage: {
    maxWidth: '20%',
    height: 'auto',
    borderRadius: '10px',
  },
  previewText: {
    textAlign: 'center',
    maxWidth: '70%',
  },
  submitButton: {
    background: 'white',
    color: 'black',
    borderRadius: '10px',
    textTransform: 'none',
    fontWeight: 'bold',
    '&:hover': {
      background: '#e4e4e4',
    },
  },
});
