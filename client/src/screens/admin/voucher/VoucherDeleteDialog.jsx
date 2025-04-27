import React from 'react'
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Paper
} from '@mui/material'
import {
  dialogPaperStyles,
  dialogTitleStyles,
  dialogContentStyles,
  dialogActionsStyles
} from './VoucherStyles'

const VoucherDeleteDialog = ({ open, onClose, voucher, onConfirmDelete }) => {
  if (!voucher) return null

  return (
    <Dialog
      open={open}
      onClose={onClose}
      sx={{
        '& .MuiDialog-paper': {
          ...dialogPaperStyles,
          maxWidth: '500px'
        }
      }}
    >
      <DialogTitle sx={dialogTitleStyles}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <span style={{ fontSize: '24px', color: '#ff4d4f' }}>🗑️</span>
          Confirm Delete
        </div>
      </DialogTitle>
      <DialogContent sx={{ ...dialogContentStyles, padding: '1.5rem 2rem' }}>
        <Paper
          elevation={0}
          sx={{
            padding: '1.5rem',
            background: 'linear-gradient(to right, #fff1f0, #fff2e8)',
            borderRadius: '8px',
            marginBottom: '1.5rem',
            border: '1px solid #ffccc7'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div
              style={{
                width: '42px',
                height: '42px',
                borderRadius: '50%',
                backgroundColor: '#ff4d4f',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0
              }}
            >
              <span style={{ fontSize: '20px', color: 'white' }}>!</span>
            </div>
            <div>
              <h4
                style={{
                  margin: '0 0 8px 0',
                  fontSize: '1.6rem',
                  color: '#cf1322',
                  fontWeight: 'bold'
                }}
              >
                Are you sure you want to delete this voucher?
              </h4>
              <p
                style={{
                  margin: '0',
                  color: '#555',
                  fontSize: '1.4rem'
                }}
              >
                This action cannot be undone. All data related to voucher{' '}
                <strong>&quot;{voucher.voucher_code}&quot;</strong> will be
                permanently removed from the system.
              </p>
            </div>
          </div>
        </Paper>

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
            Voucher Information
          </h4>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}
          >
            <div>
              <p
                style={{
                  margin: '4px 0',
                  fontWeight: 'bold',
                  fontSize: '1.5rem',
                  color: '#333'
                }}
              >
                {voucher.voucher_code}
              </p>
              <p style={{ margin: '4px 0', color: '#666' }}>
                Discount:{' '}
                <span style={{ fontWeight: 'bold' }}>
                  {voucher.discount_value}%
                </span>
              </p>
              <p style={{ margin: '4px 0', color: '#666' }}>
                Valid until:{' '}
                <span
                  style={{
                    fontWeight: 'bold',
                    color:
                      new Date(voucher.end_date) > new Date()
                        ? 'green'
                        : '#ff4d4f'
                  }}
                >
                  {voucher.end_date.split('T')[0]}
                </span>
              </p>
            </div>
            <div
              style={{
                padding: '8px 16px',
                backgroundColor: '#fff1f0',
                borderRadius: '4px',
                color: '#ff4d4f',
                fontWeight: 'bold',
                fontSize: '1.2rem',
                border: '1px solid #ffccc7'
              }}
            >
              {voucher.usage_count} / {voucher.usage_limit} used
            </div>
          </div>
        </Paper>
      </DialogContent>
      <DialogActions
        sx={{
          ...dialogActionsStyles,
          padding: '1rem 2rem 2rem',
          gap: '1.5rem'
        }}
      >
        <Button
          className="btn-cancel"
          onClick={onClose}
          sx={{ minWidth: '120px' }}
        >
          Cancel
        </Button>
        <Button
          className="btn-delete"
          onClick={onConfirmDelete}
          sx={{
            minWidth: '120px',
            backgroundColor: '#ff4d4f',
            '&:hover': {
              backgroundColor: '#ff7875'
            }
          }}
        >
          Delete Voucher
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default VoucherDeleteDialog
