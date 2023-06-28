import { Box, Typography, useTheme, useMediaQuery, Divider, Button } from "@mui/material";
import Form from "./Form";

const LoginPage = () => {
  const theme = useTheme();
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
  return (
    <Box>
      <Box
        width="70%"
        backgroundColor={theme.palette.background.alt}
        p="1rem 6%"
        textAlign="center"
        style={{ left: 0, right: 0, top: 0, margin: '90px auto', marginBottom: '2rem' }}
      >
        <img src="logos/how-logo-without-slogan.png" alt="How ?" style={{ display: 'block', maxWidth: '100%' }} />
      </Box>
      <Box sx={{ textAlign: 'center' }}>
        <Typography sx={{ color: '#2A2B2E' }}>
          Connectez-vous à votre compte
        </Typography>
        <Divider sx={{ width: '50%', margin: '0 auto', mt: '20px' }} />
      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: '20px' }}>
        <Button
          variant="contained"
          color="primary"
          sx={{ width: '80%', backgroundColor: "#FFFFFF" }}
          startIcon={<img src="logos/logo-google-64.png" alt="Google" style={{ width: '24px', height: '24px' }} />}
        >
          <Typography variant='h5' sx={{ color: '#2A2B2E', fontSize:'14px', textTransform:'none' }}>
            Connectez-vous avec Google
          </Typography>
        </Button>
      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: '20px' }}>
      <Typography variant='h5' sx={{ color: '#2A2B2E', fontSize:'14px', textTransform:'none' }}>
            ou
          </Typography>
      </Box>



      <Box
        width={isNonMobileScreens ? "50%" : "93%"}
        p="2rem"
        m="2rem auto"
        borderRadius="1.5rem"
        backgroundColor={theme.palette.background.alt}
      >
        <Form />
      </Box>
    </Box>
  );
};

export default LoginPage;
