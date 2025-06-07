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
  containerImage: {
    width: '50px',
    height: '50px',
    borderRadius: '50%',
  },
  header: {
    width: '90%',
    margin: 'auto',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 16,
  },
  userInfo: {
    display: 'flex',
    alignItems: 'center',
    gap: 12,
  },
  body: {
    width: '90%',
    margin: 'auto',
    marginTop: 16,
  },
  mediaWrapper: {
    width: '90%',
    margin: 'auto',
    marginTop: 16,
    position: 'relative',
  },
  mediaImage: {
    width: '100%',
    borderRadius: '8px',
  },
  navLeft: {
    position: 'absolute',
    left: 0,
    top: '50%',
    transform: 'translateY(-50%)',
    color: 'white',
  },
  navRight: {
    position: 'absolute',
    right: 0,
    top: '50%',
    transform: 'translateY(-50%)',
    color: 'white',
  },
  actions: {
    width: '90%',
    margin: 'auto',
    marginTop: 16,
  },
});
