/* eslint-disable react/react-in-jsx-scope */
import { Box, Typography, IconButton } from '@mui/material';
import SentimentDissatisfiedIcon from '@mui/icons-material/SentimentDissatisfied';

export const BaseEmpty = () => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      p={6}
      color="gray.500"
    >
      <IconButton sx={{ color: 'white' }}>
        <SentimentDissatisfiedIcon fontSize="large" color="disabled" sx={{ color: 'white' }} />
      </IconButton>
      <Typography variant="h6" fontWeight="medium">
        Por el momento no hay nuevos posts
      </Typography>
    </Box>
  );
};
