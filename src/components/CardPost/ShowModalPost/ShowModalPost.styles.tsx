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
    border: '0px solid #5A636A',
  },
  containerImage: {
    width: '50px',
    height: '50px',
    borderRadius: 100,
  },
});
