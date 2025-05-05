import React from 'react'
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Paper,
  Tooltip
} from '@mui/material'
import {
  dialogPaperStyles,
  dialogTitleStyles,
  dialogContentStyles,
  dialogActionsStyles
} from './TransactionStyles'

const TransactionDetailDialog = ({ open, onClose, transaction }) => {
  if (!transaction) return null

  // Format currency
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(amount)
  }

  return (
    <Dialog
      open={open}
      onClose={onClose}
      sx={{
        '& .MuiDialog-paper': {
          ...dialogPaperStyles,
          maxWidth: '800px'
        }
      }}
    >
      <DialogTitle sx={dialogTitleStyles}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <span style={{ fontSize: '24px', color: '#1971c2' }}>💰</span>
          Transaction Details
        </div>
      </DialogTitle>
      <DialogContent sx={{ ...dialogContentStyles, padding: '1.5rem 2rem' }}>
        <div>
          {/* Header section */}
          <Paper
            elevation={0}
            sx={{
              padding: '1rem',
              background: 'linear-gradient(to right, #e6f7ff, #f0f5ff)',
              borderRadius: '8px',
              marginBottom: '1.5rem',
              border: '1px solid #e6f2ff'
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
              }}
            >
              <div>
                <h3
                  style={{
                    margin: '0 0 4px 0',
                    fontSize: '1.8rem',
                    color: '#0f4e8b'
                  }}
                >
                  Order #{transaction.order_code}
                </h3>
                <p style={{ margin: '0', fontSize: '1.3rem', color: '#666' }}>
                  {transaction.description}
                </p>
              </div>
              <div>
                <div
                  style={{
                    padding: '1rem',
                    background: '#1971c2',
                    color: 'white',
                    borderRadius: '8px',
                    minWidth: '120px',
                    height: '60px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 'bold',
                    fontSize: '1.8rem'
                  }}
                >
                  {formatCurrency(transaction.amount)}
                </div>
              </div>
            </div>
          </Paper>

          {/* Transaction details grid */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '1.5rem',
              marginBottom: '1.5rem'
            }}
          >
            <Paper
              sx={{
                padding: '1rem',
                borderRadius: '8px',
                border: '1px solid #f0f0f0'
              }}
            >
              <h4
                style={{
                  margin: '0 0 8px 0',
                  color: '#555',
                  fontSize: '1.4rem'
                }}
              >
                Transaction Information
              </h4>
              <p
                style={{
                  margin: '8px 0',
                  display: 'flex',
                  justifyContent: 'space-between'
                }}
              >
                <span style={{ color: '#777' }}>Transaction ID:</span>
                <span style={{ fontWeight: 'bold' }}>
                  {transaction.order_code}
                </span>
              </p>
              <p
                style={{
                  margin: '8px 0',
                  display: 'flex',
                  justifyContent: 'space-between'
                }}
              >
                <span style={{ color: '#777' }}>Reference:</span>
                <span style={{ fontWeight: 'bold' }}>
                  {transaction.reference}
                </span>
              </p>
              <p
                style={{
                  margin: '8px 0',
                  display: 'flex',
                  justifyContent: 'space-between'
                }}
              >
                <span style={{ color: '#777' }}>Payment Link ID:</span>
                <span style={{ fontWeight: 'bold' }}>
                  {transaction.payment_link_id}
                </span>
              </p>
            </Paper>

            <Paper
              sx={{
                padding: '1rem',
                borderRadius: '8px',
                border: '1px solid #f0f0f0'
              }}
            >
              <h4
                style={{
                  margin: '0 0 8px 0',
                  color: '#555',
                  fontSize: '1.4rem'
                }}
              >
                Payment Details
              </h4>
              <p
                style={{
                  margin: '8px 0',
                  display: 'flex',
                  justifyContent: 'space-between'
                }}
              >
                <span style={{ color: '#777' }}>Amount:</span>
                <span style={{ fontWeight: 'bold' }}>
                  {formatCurrency(transaction.amount)}
                </span>
              </p>
              <p
                style={{
                  margin: '8px 0',
                  display: 'flex',
                  justifyContent: 'space-between'
                }}
              >
                <span style={{ color: '#777' }}>Account Number:</span>
                <span style={{ fontWeight: 'bold' }}>
                  {transaction.account_number}
                </span>
              </p>
              <p
                style={{
                  margin: '8px 0',
                  display: 'flex',
                  justifyContent: 'space-between'
                }}
              >
                <span style={{ color: '#777' }}>Time:</span>
                <span style={{ fontWeight: 'bold' }}>
                  {new Date(transaction.transaction_time).toLocaleString()}
                </span>
              </p>
            </Paper>
          </div>

          {/* User and Course Info */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '1.5rem',
              marginBottom: '1.5rem'
            }}
          >
            <Paper
              sx={{
                padding: '1rem',
                borderRadius: '8px',
                border: '1px solid #f0f0f0'
              }}
            >
              <h4
                style={{
                  margin: '0 0 8px 0',
                  color: '#555',
                  fontSize: '1.4rem'
                }}
              >
                Paid By
              </h4>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  padding: '8px',
                  background: '#f9f9f9',
                  borderRadius: '8px'
                }}
              >
                <div
                  style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '50%',
                    background: '#e6f7ff',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginRight: '12px',
                    fontSize: '1.6rem',
                    fontWeight: 'bold',
                    color: '#1971c2'
                  }}
                >
                  {transaction.paid_by.substring(0, 1)}
                </div>
                <div>
                  <p style={{ margin: '0', fontWeight: 'bold' }}>
                    User ID: {transaction.paid_by}
                  </p>
                  <p
                    style={{
                      margin: '4px 0 0 0',
                      fontSize: '0.9rem',
                      color: '#777'
                    }}
                  >
                    Student
                  </p>
                </div>
              </div>
            </Paper>

            <Paper
              sx={{
                padding: '1rem',
                borderRadius: '8px',
                border: '1px solid #f0f0f0'
              }}
            >
              <h4
                style={{
                  margin: '0 0 8px 0',
                  color: '#555',
                  fontSize: '1.4rem'
                }}
              >
                Paid For
              </h4>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  padding: '8px',
                  background: '#f9f9f9',
                  borderRadius: '8px'
                }}
              >
                <div
                  style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '4px',
                    background: '#e6f7ff',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginRight: '12px',
                    fontSize: '1.6rem',
                    fontWeight: 'bold',
                    color: '#1971c2'
                  }}
                >
                  {transaction.paid_for.substring(0, 1)}
                </div>
                <div>
                  <p style={{ margin: '0', fontWeight: 'bold' }}>
                    Course ID: {transaction.paid_for}
                  </p>
                  <p
                    style={{
                      margin: '4px 0 0 0',
                      fontSize: '0.9rem',
                      color: '#777'
                    }}
                  >
                    Course
                  </p>
                </div>
              </div>
            </Paper>
          </div>

          {/* Description section */}
          <Paper
            sx={{
              padding: '1rem',
              borderRadius: '8px',
              border: '1px solid #f0f0f0',
              marginBottom: '1rem'
            }}
          >
            <h4
              style={{
                margin: '0 0 8px 0',
                color: '#555',
                fontSize: '1.4rem'
              }}
            >
              Description
            </h4>
            <p style={{ margin: '0', lineHeight: '1.6' }}>
              {transaction.description}
            </p>
          </Paper>
        </div>
      </DialogContent>
      <DialogActions sx={dialogActionsStyles}>
        <Button className="btn-cancel" onClick={onClose}>
          Close
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default TransactionDetailDialog
