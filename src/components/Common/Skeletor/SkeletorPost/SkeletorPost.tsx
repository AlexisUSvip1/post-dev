import { Box, Skeleton } from '@mui/material';
import { useStyles } from './Skeletor.styles';
export const NewsPostSkeleton = () => {
  const classes = useStyles();

  return (
    <Box className={classes.skeletonContainer}>
      <Skeleton variant="circular" className={classes.skeletonAvatar} animation="wave" />
      <Skeleton variant="text" className={classes.skeletonText} animation="wave" />
      <Skeleton variant="rectangular" className={classes.skeletonImage} animation="wave" />
      <Skeleton variant="text" className={classes.skeletonText} animation="wave" />
    </Box>
  );
};
