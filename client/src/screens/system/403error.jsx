import { useNavigate } from 'react-router-dom'
import { Button, Typography, Container, Box } from '@mui/material' // Material-UI components
import { Helmet } from 'react-helmet' // dùng để thay đổi title của trang

const ForbiddenPage = () => {
  const navigate = useNavigate()

  const handleRedirectToHome = () => {
    sessionStorage.clear()
    navigate('/')
  }

  return (
    <>
      <Helmet>
        <title>Forbidden | EL-Space</title>
      </Helmet>
      <Container maxWidth="sm" sx={{ textAlign: 'center', mt: 8, mb: 8 }}>
        <Box
          sx={{
            mb: 4,
            color: '#187bce',
            fontSize: '120px',
            fontWeight: 'bold'
          }}
        >
          403
        </Box>
        <Typography
          variant="h4"
          gutterBottom
          sx={{ color: '#333', mb: 2, fontSize: '4rem' }}
        >
          Forbidden
        </Typography>
        <Typography
          variant="body1"
          paragraph
          sx={{ color: '#555', mb: 4, fontSize: '2rem' }}
        >
          You do not have permission to access this page. Please return to the
          homepage.
        </Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={handleRedirectToHome}
          sx={{
            fontSize: '2rem',
            backgroundColor: '#187bce',
            '&:hover': {
              backgroundColor: '#155b96'
            }
          }}
        >
          Go to Homepage
        </Button>
      </Container>
    </>
  )
}

export default ForbiddenPage
