import { makeStyles } from '@mui/styles';

export const useStyles = makeStyles({
  root: {
    maxWidth: '200px',
    minWidth: '200px',
    height: '86vh',
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column',
    position: 'relative',
    color: '#AFB3B7',
    fontWeight: 'bold',
    borderRight: '0.5px solid #5A636A',
    top: 66,
    padding: '16px',
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '10px',
    width: '100%',
    padding: '2px',
  },
  avatar: {
    width: '30px',
    height: '30px',
    marginRight: '12px',
    borderRadius: '50%',
  },
  displayName: {
    fontSize: '11px',
    fontWeight: 'bold',
    color: '#AFB3B7',
  },
  linksContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
    marginTop: '16px',
  },
  linkBox: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    padding: '8px 12px',
    borderRadius: '4px',
    transition: 'background-color 0.3s ease',
  },
  activeBox: {
    backgroundColor: 'rgba(237, 251, 255, 0.67)', // Fondo para el enlace activo
  },
  link: {
    textDecoration: 'none',
    color: '#AFB3B7',
    fontSize: '14px',
    fontWeight: 'bold',
  },
  icon: {
    width: '16px',
    height: '16px',
  },
  containerLogout: {
    padding: '8px 12px',
    borderRadius: '4px',
    width: '67%',
    '&:hover': {
      backgroundColor: 'rgba(45, 74, 83, 0.5)',
    },
  },
});
