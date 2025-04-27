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
} from './VoucherStyles'

const VoucherDetailDialog = ({ open, onClose, voucher }) => {
  if (!voucher) return null

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
          <span style={{ fontSize: '24px', color: '#1971c2' }}>🏷️</span>
          Voucher Details
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
                  {voucher.voucher_code}
                </h3>
                <p style={{ margin: '0', fontSize: '1.3rem', color: '#666' }}>
                  {voucher.description.substring(0, 120)}
                  {voucher.description.length > 120 ? '...' : ''}
                </p>
              </div>
              <div>
                <div
                  style={{
                    padding: '1rem',
                    background: '#1971c2',
                    color: 'white',
                    borderRadius: '50%',
                    width: '60px',
                    height: '60px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 'bold',
                    fontSize: '1.8rem'
                  }}
                >
                  {parseInt(voucher.discount_value)}%
                </div>
              </div>
            </div>
          </Paper>

          {/* Information grid */}
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
                Basic Information
              </h4>
              <p
                style={{
                  margin: '8px 0',
                  display: 'flex',
                  justifyContent: 'space-between'
                }}
              >
                <span style={{ color: '#777' }}>Voucher For:</span>
                <span
                  style={{
                    fontWeight: 'bold',
                    textTransform: 'capitalize'
                  }}
                >
                  {voucher.voucher_for || 'N/A'}
                </span>
              </p>
              <p
                style={{
                  margin: '8px 0',
                  display: 'flex',
                  justifyContent: 'space-between'
                }}
              >
                <span style={{ color: '#777' }}>Usage Limit:</span>
                <span style={{ fontWeight: 'bold' }}>
                  {voucher.usage_limit}
                </span>
              </p>
              <p
                style={{
                  margin: '8px 0',
                  display: 'flex',
                  justifyContent: 'space-between'
                }}
              >
                <span style={{ color: '#777' }}>Usage Count:</span>
                <span style={{ fontWeight: 'bold' }}>
                  {voucher.usage_count}
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
                Validity
              </h4>
              <p
                style={{
                  margin: '8px 0',
                  display: 'flex',
                  justifyContent: 'space-between'
                }}
              >
                <span style={{ color: '#777' }}>Start Date:</span>
                <span style={{ fontWeight: 'bold' }}>
                  {voucher.start_date.split('T')[0]}
                </span>
              </p>
              <p
                style={{
                  margin: '8px 0',
                  display: 'flex',
                  justifyContent: 'space-between'
                }}
              >
                <span style={{ color: '#777' }}>End Date:</span>
                <span style={{ fontWeight: 'bold' }}>
                  {voucher.end_date.split('T')[0]}
                </span>
              </p>
              <p
                style={{
                  margin: '8px 0',
                  display: 'flex',
                  justifyContent: 'space-between'
                }}
              >
                <span style={{ color: '#777' }}>Status:</span>
                <span
                  style={{
                    fontWeight: 'bold',
                    color:
                      new Date(voucher.end_date) > new Date() ? 'green' : 'red',
                    padding: '2px 8px',
                    backgroundColor:
                      new Date(voucher.end_date) > new Date()
                        ? '#e6ffed'
                        : '#fff1f0',
                    borderRadius: '4px',
                    fontSize: '0.9rem'
                  }}
                >
                  {new Date(voucher.end_date) > new Date()
                    ? 'ACTIVE'
                    : 'EXPIRED'}
                </span>
              </p>
            </Paper>
          </div>

          {/* Target options */}
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
                  fontSize: '1.4rem',
                  display: 'flex',
                  alignItems: 'center'
                }}
              >
                <span>User Targeting</span>
                <span
                  style={{
                    marginLeft: '8px',
                    fontSize: '0.9rem',
                    padding: '2px 6px',
                    backgroundColor: voucher.is_all_users
                      ? '#e6ffed'
                      : '#f5f5f5',
                    color: voucher.is_all_users ? 'green' : '#666',
                    borderRadius: '4px'
                  }}
                >
                  {voucher.is_all_users ? 'ALL USERS' : 'SPECIFIC USERS'}
                </span>
              </h4>
              {voucher.is_all_users ? (
                <p style={{ color: '#777', fontStyle: 'italic' }}>
                  This voucher is available to all users.
                </p>
              ) : (
                <div>
                  {voucher.users?.length > 0 ? (
                    <div
                      style={{
                        maxHeight: '150px',
                        overflowY: 'auto',
                        padding: '8px 0'
                      }}
                    >
                      {voucher.users.map((user) => (
                        <Tooltip
                          key={user.userID}
                          title={
                            <div style={{ padding: '8px' }}>
                              <p style={{ margin: '0', fontWeight: 'bold' }}>
                                {user.fullname}
                              </p>
                              <p style={{ margin: '4px 0 0 0' }}>
                                ID: {user.userID}
                              </p>
                            </div>
                          }
                          arrow
                        >
                          <div
                            style={{
                              display: 'flex',
                              alignItems: 'center',
                              padding: '4px 8px',
                              margin: '4px 0',
                              borderRadius: '4px',
                              backgroundColor: '#f9f9f9',
                              cursor: 'pointer'
                            }}
                          >
                            <img
                              src={user.avatar || 'default-avatar.png'}
                              alt={user.fullname}
                              style={{
                                width: '24px',
                                height: '24px',
                                borderRadius: '50%',
                                marginRight: '8px'
                              }}
                            />
                            <span>{user.fullname}</span>
                          </div>
                        </Tooltip>
                      ))}
                    </div>
                  ) : (
                    <p style={{ color: '#777', fontStyle: 'italic' }}>
                      No specific users set.
                    </p>
                  )}
                </div>
              )}
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
                  fontSize: '1.4rem',
                  display: 'flex',
                  alignItems: 'center'
                }}
              >
                <span>Course Targeting</span>
                <span
                  style={{
                    marginLeft: '8px',
                    fontSize: '0.9rem',
                    padding: '2px 6px',
                    backgroundColor: voucher.is_all_courses
                      ? '#e6ffed'
                      : '#f5f5f5',
                    color: voucher.is_all_courses ? 'green' : '#666',
                    borderRadius: '4px'
                  }}
                >
                  {voucher.is_all_courses ? 'ALL COURSES' : 'SPECIFIC COURSES'}
                </span>
              </h4>
              {/* Course targets listing - similar structure to user targeting */}
              {/* Course targeting UI implementation */}
            </Paper>
          </div>

          {/* Usage history */}
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
              Usage History
            </h4>
            {voucher.used?.length > 0 ? (
              <div style={{ maxHeight: '150px', overflowY: 'auto' }}>
                {voucher.used.map((user, index) => (
                  <div
                    key={index}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      padding: '8px',
                      borderBottom:
                        index < voucher.used.length - 1
                          ? '1px solid #f0f0f0'
                          : 'none'
                    }}
                  >
                    <img
                      src={user.avatar || 'default-avatar.png'}
                      alt={user.fullname}
                      style={{
                        width: '32px',
                        height: '32px',
                        borderRadius: '50%',
                        marginRight: '12px'
                      }}
                    />
                    <div>
                      <p style={{ margin: '0', fontWeight: 'bold' }}>
                        {user.fullname}
                      </p>
                      <p
                        style={{
                          margin: '2px 0 0 0',
                          fontSize: '0.9rem',
                          color: '#888'
                        }}
                      >
                        Used on:{' '}
                        {user.use_at
                          ? new Date(user.use_at).toLocaleString()
                          : 'Unknown date'}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p style={{ color: '#777', fontStyle: 'italic' }}>
                No usage history available.
              </p>
            )}
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

export default VoucherDetailDialog
