import {makeStyles} from '@mui/styles';
export const useStyles = makeStyles({
    container: {
        textAlign: 'center',
        padding: '32px',
        height: '84vh',
        display: 'flex',
        gap: '30px',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
    },
    title: {
        color: 'white',
    },
    subtitle: {
        maxWidth: '500px',
        minWidth: '300px',
        marginTop: '16px',
        color: '#DEDEDE',
    },
    devPart: {
        color: '#5A636A',
    },
    loginButton: {
        backgroundColor: 'white',
        color: '#5A636A',
        fontWeight: 'bold',
        borderRadius: '100px',
        padding: '10px 30px',
        '&:hover': {
            backgroundColor: '#f0f0f0',
        },
    },
    blurEffect: {
        position: 'absolute',
        bottom: '-50px', // Ubicación en la parte inferior, ajustable según el diseño
        left: '50%',
        transform: 'translateX(-50%)',
        width: '300px', // Ancho del círculo
        height: '300px', // Alto del círculo
        background: 'linear-gradient(135deg, #1E90FF, #000)',
        filter: 'blur(80px)',
        borderRadius: '50%',
        opacity: 0.6,
    },
    
});