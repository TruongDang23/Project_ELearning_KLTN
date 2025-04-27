import styled from 'styled-components'

export const VoucherDashboardWrapper = styled.section`
  padding: 3rem;
  h3 {
    font-size: 2.4rem;
    font-weight: 600;
    color: rgb(52, 71, 103);
    margin-bottom: 3rem;
  }
  .table-container {
    background: rgb(255, 255, 255);
    border-radius: 0.75rem;
    box-shadow: rgba(0, 0, 0, 0.14) 0rem 0.25rem 1.25rem 0rem,
      rgba(64, 64, 64, 0.4) 0rem 0.4375rem 0.625rem -0.3125rem;
    animation: fadeInUp 0.8s ease-out forwards;
    opacity: 0;
    transform: translateY(20px);

    @keyframes fadeInUp {
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

    .MuiTableCell-root {
      font-family: 'Inter', 'Arial', sans-serif;
      font-size: 1.4rem;
      color: rgb(52, 71, 103);
    }

    .MuiTableHead-root .MuiTableCell-root {
      font-weight: 600;
      background-color: rgba(52, 71, 103, 0.1);
    }
  }

  .MuiButton-root {
    font-family: 'Inter', 'Arial', sans-serif;
    font-size: 1.4rem;
    text-transform: none;
    transition: color 0.3s, background 0.3s, box-shadow 0.3s;

    &:hover {
      background: rgba(52, 71, 103, 0.1);
    }
  }

  .MuiTextField-root {
    .MuiInputBase-root {
      font-family: 'Inter', 'Arial', sans-serif;
      font-size: 1.4rem;
    }
    .MuiInputLabel-root {
      font-family: 'Inter', 'Arial', sans-serif;
      font-size: 1.4rem;
    }
  }

  @keyframes fadeInUp {
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`

// Common dialog styles
export const dialogPaperStyles = {
  background: 'rgb(255, 255, 255)',
  borderRadius: '0.75rem',
  boxShadow:
    'rgba(0, 0, 0, 0.14) 0rem 0.25rem 1.25rem 0rem, rgba(64, 64, 64, 0.4) 0rem 0.4375rem 0.625rem -0.3125rem',
  border: '1px solid rgba(52, 71, 103, 0.2)',
  maxWidth: '600px',
  width: '100%',
  margin: '1rem',
  animation: 'fadeInUp 0.5s ease-out forwards'
}

export const dialogTitleStyles = {
  fontFamily: "'Inter', 'Arial', sans-serif",
  fontSize: '1.8rem',
  fontWeight: 600,
  color: 'rgb(52, 71, 103)',
  padding: '1.5rem 2rem',
  borderBottom: '1px solid rgba(52, 71, 103, 0.1)'
}

export const dialogContentStyles = {
  fontFamily: "'Inter', 'Arial', sans-serif",
  fontSize: '1.4rem',
  color: 'rgb(52, 71, 103)',
  padding: '2rem'
}

export const dialogActionsStyles = {
  display: 'flex',
  width: '100%',
  gap: '3rem',
  justifyContent: 'center',
  '.btn-save, .btn-cancel, .btn-delete': {
    padding: '0.5rem 1rem',
    fontSize: '1.6rem',
    fontWeight: 600,
    borderRadius: '0.5rem',
    cursor: 'pointer',
    transition: 'transform 0.2s ease',
    '&:hover': {
      transform: 'scale(1.05)'
    }
  },
  '.btn-save': {
    backgroundColor: '#0f4e8b',
    color: '#fff',
    border: 'none',
    '&:hover': {
      backgroundColor: '#1971c2'
    }
  },
  '.btn-cancel': {
    backgroundColor: '#fff',
    color: '#1971c2',
    outline: 'none',
    border: 'none',
    boxShadow: 'inset 0 0 0 2px #1971c2',
    '&:hover': {
      backgroundColor: '#1971c2',
      color: '#fff'
    }
  },
  '.btn-delete': {
    backgroundColor: '#ff4d4f',
    color: '#fff',
    border: 'none',
    '&:hover': {
      backgroundColor: '#ff7875'
    }
  }
}

export const textFieldStyles = {
  '& .MuiInputBase-root': {
    fontFamily: "'Inter', 'Arial', sans-serif",
    fontSize: '1.4rem',
    color: 'rgb(52, 71, 103)',
    borderRadius: '0.5rem',
    background: 'rgba(255, 255, 255, 1)',
    '&:hover': {
      background: 'rgba(52, 71, 103, 0.05)'
    }
  },
  '& .MuiOutlinedInput-notchedOutline': {
    borderColor: 'rgba(52, 71, 103, 0.3)',
    borderWidth: '1px'
  },
  '&:hover .MuiOutlinedInput-notchedOutline': {
    borderColor: 'rgb(52, 71, 103)'
  },
  '& .Mui-focused .MuiOutlinedInput-notchedOutline': {
    borderColor: 'rgb(52, 71, 103)',
    borderWidth: '2px'
  },
  '& .MuiInputLabel-root': {
    fontFamily: "'Inter', 'Arial', sans-serif",
    fontSize: '1.4rem',
    color: 'rgb(52, 71, 103)',
    '&.Mui-focused': {
      color: 'rgb(52, 71, 103)'
    }
  },
  '& .MuiInputBase-multiline': {
    padding: '0.5rem'
  },
  '& .Mui-error': {
    fontSize: '1.4rem'
  },
  '& .MuiFormHelperText-root': {
    fontSize: '1.2rem',
    marginTop: '6px'
  }
}
