/* eslint-disable react/react-in-jsx-scope */
import { Box, Typography, Button } from '@mui/material';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import { useFollowers } from './useFollowers.hook';
import { BaseEmptyFriends } from '../Common/BaseEmpty/BaseEmpty';

export const Followers = () => {
  const { sendFriendRequest, users } = useFollowers();

  return (
    <Box
      sx={{
        height: '100%',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        overflowY: 'auto',
        mt: '15px',
        borderTop: '0.5px solid #5A636A',
      }}
    >
      <Typography
        variant="subtitle2"
        textAlign="center"
        sx={{
          backgroundColor: 'rgba(90, 99, 106, 0.3)',
          borderRadius: '10px',
          p: 1,
          mt: 2,
          overflowY: 'auto',
        }}
        gutterBottom
      >
        Personas que quizás conozcas
      </Typography>

      {users.length > 0 ? (
        users.map((user) => (
          <Box
            key={user._id}
            display="flex"
            alignItems="center"
            justifyContent="space-between"
            p={1}
          >
            <Box display="flex" alignItems="center" gap={1}>
              <img
                src={user.avatar_url}
                alt={user.display_name}
                style={{ width: 30, height: 30, borderRadius: '50%' }}
              />
            </Box>

            <Box display="flex" flexDirection="column" width="60%" mx="auto">
              <Typography fontSize={15}>{user.display_name}</Typography>

              <Button
                size="small"
                variant="outlined"
                startIcon={<PersonAddIcon sx={{ fontSize: 17, color: 'white' }} />}
                sx={{
                  mt: 0.5,
                  borderRadius: '100px',
                  backgroundColor: '#2D4A53',
                  borderColor: '#2D4A53',
                  color: 'white',
                  textTransform: 'none',
                }}
                onClick={() => sendFriendRequest(user._id)}
              >
                Añadir
              </Button>
            </Box>
          </Box>
        ))
      ) : (
        <BaseEmptyFriends />
      )}
    </Box>
  );
};
