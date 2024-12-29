import { useNavigate } from 'react-router-dom'
import { Button, Typography, Container, Box } from '@mui/material'
import { Helmet } from 'react-helmet' // dùng để thay đổi title của trang

const ErrorGetData = () => {
  const navigate = useNavigate()

  const handleRedirectToHome = () => {
    navigate('/')
  }

  return (
    <>
      <Helmet>
        <title>Server Error | EL-Space</title>
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
          ERROR
        </Box>
        <Typography
          variant="h4"
          gutterBottom
          sx={{ color: '#333', mb: 2, fontSize: '4rem' }}
        >
          The server is having a trouble
        </Typography>
        <Typography
          variant="body1"
          paragraph
          sx={{ color: '#555', mb: 4, fontSize: '2rem' }}
        >
          It seems we have encountered an error while fetching data from the
          database. Please contact the admin for assistance.
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

export default ErrorGetData
