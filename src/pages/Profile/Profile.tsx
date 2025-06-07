import { Box, Button, Icon } from '@mui/material';
import { React } from 'react';
import { useAppSelector } from '../../hook/useAppSelector';
import SettingsIcon from '@mui/icons-material/Settings'; // Importa el ícono de settings
import { useStyles } from './Profile.styles';
export const Profile = () => {
  const user = useAppSelector((state) => state.user);
  const classes = useStyles();
  return (
    <Box>
      <Box
        sx={{
          display: 'flex',
          width: '100%',
          marginTop: '50px',
          justifyContent: 'center',
          gap: 3,
        }}
      >
        <img src={user.avatar_url} alt="" className={classes.avatarProfile} />
        <Box>
          <h3>{user.displayName}</h3>
          <Box display={'flex'} justifyContent={'center'} alignItems="center" gap={2}>
            <p>Followers: 4k</p>
            <Button onClick={() => console.log('mada ')} sx={{ background: 'white' }}>
              <SettingsIcon sx={{ color: 'black' }} />
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
