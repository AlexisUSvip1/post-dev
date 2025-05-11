import { makeStyles } from '@mui/styles';

export const useStyles = makeStyles({
  skeletonContainer: {
    width: '256px',
    padding: '15px',
    borderRadius: '10px',
    background: 'rgba(90,99,106,0.30)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '10px',
  },
  skeletonAvatar: {
    borderRadius: '50%',
    width: '40px',
    height: '40px',
    animation: 'pulse 1.5s infinite ease-in-out',
  },
  skeletonText: {
    width: '80%',
    height: '20px',
    animation: 'pulse 1.5s infinite ease-in-out',
  },
  skeletonImage: {
    width: '100%',
    height: '150px',
    borderRadius: '8px',
    animation: 'pulse 1.5s infinite ease-in-out',
  },
  '@global': {
    '@keyframes pulse': {
      '0%': { opacity: 0.6 },
      '50%': { opacity: 1 },
      '100%': { opacity: 0.6 },
    },
  },
});
