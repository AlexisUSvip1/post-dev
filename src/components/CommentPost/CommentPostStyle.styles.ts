import { makeStyles } from '@mui/styles';

export const useStyles = makeStyles({
  modal: {
    backdropFilter: 'blur(10px)',
    backgroundColor: 'rgba(87, 87, 87, 0)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 10000,
  },
  modalBox: {
    width: '650px',
    backgroundColor: '#0D1F23',
    borderRadius: '30px',
    padding: '16px',
    border: '0px solid #5A636A',
  },
  header: {
    display: 'flex',
    justifyContent: 'flex-end',
    marginBottom: '24px',
  },
  content: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
  },
  inputRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
  },
  imgCommentUser: {
    width: '50px',
    height: '50px',
    borderRadius: '40px',
  },
});
