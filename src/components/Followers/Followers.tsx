/* eslint-disable react/react-in-jsx-scope */
import { Box, Typography, Avatar, Button } from '@mui/material';
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import { useFollowers } from "./useFollowers.hook";

export const Followers = () => {
  const { sendFriendRequest, users } = useFollowers();
  return (
    <Box
      sx={{
        height: "100%",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        overflowY: "auto",
        marginTop: "15px",
        borderTop: "0.5px solid #5A636A",
      }}
    >
      <Typography
        variant="subtitle2"
        gutterBottom
        textAlign="center"
        sx={{ backgroundColor: "rgba(90, 99, 106, 0.3)" }}
        borderRadius="10px"
        padding={1}
        marginTop={2}
        overflowY={"auto"}
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
        >
          <Box display="flex" alignItems="center" gap={1}>
            <Avatar src={user.avatar_url} alt={user.display_name} />
          </Box>
          <Box
            display={"flex"}
            flexDirection={"column"}
            width={"60%"}
            margin={"auto"}
          >
            <Typography fontSize={15}>{user.display_name}</Typography>

            <Button
              size="small"
              variant="outlined"
              startIcon={
                <PersonAddIcon sx={{ fontSize: "17px", color: "white" }} />
              }
              sx={{
                borderRadius: "100px",
                backgroundColor: "#2D4A53",
                borderColor: "#2D4A53",
                color: "white",
                textTransform: "none",
              }}
              onClick={() => sendFriendRequest(user._id)}
            >
              Añadir
            </Button>
          </Box>
        </Box>
      ))}
    </Box>
  );
};