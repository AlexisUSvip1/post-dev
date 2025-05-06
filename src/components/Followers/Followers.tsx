/* eslint-disable react/react-in-jsx-scope */
import { Box, Typography, Avatar, Button } from '@mui/material';
import { useFollowers } from './useFollowers.hook';

export const Followers = () => {
  const { sendFriendRequest, users } = useFollowers();
  return (
    <Box
      sx={{
        height: '100%',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        padding: 2,
        boxSizing: 'border-box',
        overflowY: 'auto',
        marginTop: '65px',
        borderLeft: '0.5px solid #5A636A',
      }}
    >
      <Typography
        variant="subtitle2"
        gutterBottom
        textAlign="center"
        sx={{ backgroundColor: 'rgba(90, 99, 106, 0.3)' }}
        borderRadius="10px"
      >
        Personas que quizás conozcas
      </Typography>

      {users.map((user) => (
        <Box
          key={user._id}
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          p={1}
          sx={{ borderBottom: '1px solid #5A636A' }}
        >
          <Box display="flex" alignItems="center" gap={1}>
            <Avatar src={user.avatar_url} alt={user.display_name} />
            <Typography variant="body2">{user.display_name}</Typography>
          </Box>
          <Button size="small" variant="outlined" onClick={() => sendFriendRequest(user._id)}>
            Añadir
          </Button>
        </Box>
      ))}
    </Box>
  );
};
