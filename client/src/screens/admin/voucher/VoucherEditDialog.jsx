// This is a condensed example - the full implementation would include all form fields
import React from 'react'
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Checkbox,
  FormControlLabel,
  Autocomplete,
  Paper
} from '@mui/material'
import {
  dialogPaperStyles,
  dialogTitleStyles,
  dialogContentStyles,
  dialogActionsStyles,
  textFieldStyles
} from './VoucherStyles'

const VoucherEditDialog = ({
  open,
  onClose,
  voucher,
  handleChange,
  handleSave,
  validationErrors,
  allStudents,
  allCourses,
  selectedStudents,
  setSelectedStudents,
  selectedCourses,
  setSelectedCourses,
  setEditVoucher
}) => {
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
          <span style={{ fontSize: '24px', color: '#1971c2' }}>✏️</span>
          Edit Voucher
        </div>
      </DialogTitle>
      <DialogContent sx={{ ...dialogContentStyles, padding: '1.5rem 2rem' }}>
        {/* Header section with code and discount */}
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
              <TextField
                margin="dense"
                name="voucher_code"
                label="Voucher Code"
                fullWidth
                value={voucher.voucher_code || ''}
                onChange={handleChange}
                disabled
                sx={{
                  ...textFieldStyles,
                  '& .MuiInputBase-root': {
                    ...textFieldStyles['& .MuiInputBase-root'],
                    fontSize: '1.6rem',
                    fontWeight: 'bold',
                    color: '#0f4e8b',
                    backgroundColor: 'transparent'
                  },
                  '& .MuiOutlinedInput-notchedOutline': {
                    border: 'none'
                  }
                }}
              />
              <TextField
                margin="dense"
                name="description"
                label="Description"
                fullWidth
                multiline
                rows={2}
                value={voucher.description || ''}
                onChange={handleChange}
                error={!!validationErrors.description}
                helperText={validationErrors.description}
                sx={{
                  ...textFieldStyles,
                  '& .MuiInputBase-root': {
                    ...textFieldStyles['& .MuiInputBase-root'],
                    backgroundColor: 'transparent'
                  }
                }}
              />
            </div>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center'
              }}
            >
              <div style={{ fontSize: '1.8rem', fontWeight: 'bold' }}>
                <TextField
                  type="number"
                  name="discount_value"
                  label="Discount %"
                  value={parseInt(voucher.discount_value) || 0}
                  onChange={handleChange}
                  inputProps={{ min: 1, max: 100, step: 1 }}
                  error={!!validationErrors.discount_value}
                  helperText={validationErrors.discount_value}
                  sx={{
                    width: '100px',
                    '& .MuiInputBase-root': {
                      ...textFieldStyles['& .MuiInputBase-root'],
                      fontSize: '1.8rem',
                      fontWeight: 'bold',
                      textAlign: 'center',
                      backgroundColor: '#1971c2',
                      color: 'white',
                      borderRadius: '8px',
                      '&:hover': {
                        color: '#1971c2',
                        backgroundColor: 'white'
                      }
                    }
                  }}
                />
              </div>
            </div>
          </div>
        </Paper>
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

            <FormControl fullWidth margin="dense" sx={textFieldStyles}>
              <InputLabel>Voucher For</InputLabel>
              <Select
                name="voucher_for"
                value={voucher.voucher_for || ''}
                onChange={handleChange}
              >
                <MenuItem value="student">Student</MenuItem>
                <MenuItem value="course">Course</MenuItem>
              </Select>
            </FormControl>

            <TextField
              margin="dense"
              name="usage_limit"
              label="Usage Limit"
              type="number"
              fullWidth
              value={voucher.usage_limit || 0}
              onChange={handleChange}
              sx={textFieldStyles}
              inputProps={{ step: 1, min: 1 }}
              error={!!validationErrors.usage_limit}
              helperText={validationErrors.usage_limit}
            />
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
              Validity Period
            </h4>

            <TextField
              margin="dense"
              name="start_date"
              label="Start Date"
              type="date"
              fullWidth
              InputLabelProps={{ shrink: true }}
              value={voucher.start_date?.split('T')[0] || ''}
              onChange={handleChange}
              sx={textFieldStyles}
              error={!!validationErrors.start_date}
              helperText={validationErrors.start_date}
            />

            <TextField
              margin="dense"
              name="end_date"
              label="End Date"
              type="date"
              fullWidth
              InputLabelProps={{ shrink: true }}
              value={voucher.end_date?.split('T')[0] || ''}
              onChange={handleChange}
              sx={textFieldStyles}
              error={!!validationErrors.end_date}
              helperText={validationErrors.end_date}
            />
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
              border:
                voucher.voucher_for === 'course'
                  ? '1px solid #d9d9d9'
                  : '1px solid #f0f0f0',
              opacity: voucher.voucher_for === 'course' ? 0.6 : 1,
              backgroundColor:
                voucher.voucher_for === 'course' ? '#f9f9f9' : 'white'
            }}
          >
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}
            >
              <h4
                style={{
                  margin: '0 0 8px 0',
                  color: '#555',
                  fontSize: '1.4rem'
                }}
              >
                User Targeting
              </h4>
              <FormControlLabel
                control={
                  <Checkbox
                    name="is_all_users"
                    checked={voucher.is_all_users || false}
                    onChange={handleChange}
                    disabled={voucher.voucher_for === 'course'}
                    sx={{ '& .MuiSvgIcon-root': { fontSize: 20 } }}
                  />
                }
                label={
                  <span
                    style={{
                      fontSize: '0.9rem',
                      backgroundColor: voucher.is_all_users
                        ? '#e6ffed'
                        : '#f5f5f5',
                      color: voucher.is_all_users ? 'green' : '#666',
                      padding: '3px 8px',
                      borderRadius: '4px'
                    }}
                  >
                    ALL USERS
                  </span>
                }
                sx={{ margin: '0' }}
              />
            </div>

            {!voucher.is_all_users && voucher.voucher_for === 'student' && (
              <Autocomplete
                multiple
                id="student-edit-select"
                options={allStudents}
                value={selectedStudents || []}
                getOptionLabel={(option) =>
                  `${option.fullname || option.userID} (${option.userID})`
                }
                onChange={(event, newValue) => {
                  setSelectedStudents(newValue)
                  setEditVoucher((prev) => ({
                    ...prev,
                    users: newValue
                  }))
                }}
                renderOption={(props, option) => (
                  <li {...props}>
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '10px'
                      }}
                    >
                      <img
                        src={option.avatar || 'default-avatar.png'}
                        alt="avatar"
                        style={{
                          width: 30,
                          height: 30,
                          borderRadius: '50%'
                        }}
                      />
                      <div>
                        <div style={{ fontWeight: 'bold' }}>
                          {option.fullname}
                        </div>
                        <div style={{ fontSize: '0.8rem' }}>
                          {option.userID}
                        </div>
                      </div>
                    </div>
                  </li>
                )}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Select Students"
                    placeholder="Search students"
                    margin="dense"
                    sx={textFieldStyles}
                  />
                )}
                sx={{ marginTop: 1 }}
              />
            )}

            {voucher.is_all_users ? (
              <p
                style={{
                  color: '#777',
                  fontStyle: 'italic',
                  margin: '1rem 0'
                }}
              >
                This voucher will be available to all users.
              </p>
            ) : (
              <></>
            )}

            {voucher.voucher_for === 'course' ? (
              <p
                style={{
                  color: '#777',
                  fontStyle: 'italic',
                  margin: '1rem 0'
                }}
              >
                Not applicable for course vouchers.
              </p>
            ) : (
              <></>
            )}
          </Paper>

          <Paper
            sx={{
              padding: '1rem',
              borderRadius: '8px',
              border:
                voucher.voucher_for === 'student'
                  ? '1px solid #d9d9d9'
                  : '1px solid #f0f0f0',
              opacity: voucher.voucher_for === 'student' ? 0.6 : 1,
              backgroundColor:
                voucher.voucher_for === 'student' ? '#f9f9f9' : 'white'
            }}
          >
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}
            >
              <h4
                style={{
                  margin: '0 0 8px 0',
                  color: '#555',
                  fontSize: '1.4rem'
                }}
              >
                Course Targeting
              </h4>
              <FormControlLabel
                control={
                  <Checkbox
                    name="is_all_courses"
                    checked={voucher.is_all_courses || false}
                    onChange={handleChange}
                    disabled={voucher.voucher_for === 'student'}
                    sx={{ '& .MuiSvgIcon-root': { fontSize: 20 } }}
                  />
                }
                label={
                  <span
                    style={{
                      fontSize: '0.9rem',
                      backgroundColor: voucher.is_all_courses
                        ? '#e6ffed'
                        : '#f5f5f5',
                      color: voucher.is_all_courses ? 'green' : '#666',
                      padding: '3px 8px',
                      borderRadius: '4px'
                    }}
                  >
                    ALL COURSES
                  </span>
                }
                sx={{ margin: '0' }}
              />
            </div>

            {!voucher.is_all_courses && voucher.voucher_for === 'course' && (
              <Autocomplete
                multiple
                id="course-edit-select"
                options={allCourses}
                value={selectedCourses || []}
                getOptionLabel={(option) =>
                  `${option.title || 'Unknown'} (${option.courseID})`
                }
                onChange={(event, newValue) => {
                  setSelectedCourses(newValue)
                  setEditVoucher((prev) => ({
                    ...prev,
                    courses: newValue
                  }))
                  console.log('Update courses:', newValue)
                }}
                renderOption={(props, option) => (
                  <li {...props}>
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '10px'
                      }}
                    >
                      <img
                        src={option.image_introduce || 'default-course.png'}
                        alt="course"
                        style={{
                          width: 40,
                          height: 30,
                          objectFit: 'cover'
                        }}
                      />
                      <div>
                        <div style={{ fontWeight: 'bold' }}>{option.title}</div>
                        <div style={{ fontSize: '0.8rem' }}>
                          {option.teacher} | {option.courseID}
                        </div>
                      </div>
                    </div>
                  </li>
                )}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Select Courses"
                    placeholder="Search courses"
                    margin="dense"
                    sx={textFieldStyles}
                  />
                )}
                sx={{ marginTop: 1 }}
              />
            )}

            {voucher.is_all_courses ? (
              <p
                style={{
                  color: '#777',
                  fontStyle: 'italic',
                  margin: '1rem 0'
                }}
              >
                This voucher will be applicable to all courses.
              </p>
            ) : (
              <></>
            )}

            {voucher.voucher_for === 'student' ? (
              <p
                style={{
                  color: '#777',
                  fontStyle: 'italic',
                  margin: '1rem 0'
                }}
              >
                Not applicable for student vouchers.
              </p>
            ) : (
              <></>
            )}
          </Paper>
        </div>
        {/* Hiển thị thông báo lỗi targeting */}
        {validationErrors.targeting && (
          <Paper
            sx={{
              padding: '0.8rem 1.2rem',
              background: '#fff1f0',
              borderRadius: '8px',
              marginBottom: '1.5rem',
              border: '1px solid #ffccc7'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span style={{ color: '#ff4d4f', fontSize: '20px' }}>⚠️</span>
              <span style={{ color: '#cf1322', fontWeight: 'bold' }}>
                {validationErrors.targeting}
              </span>
            </div>
          </Paper>
        )}

        {/* Hiển thị thông báo lỗi voucher_for nếu có */}
        {validationErrors.voucher_for && (
          <Paper
            sx={{
              padding: '0.8rem 1.2rem',
              background: '#fff1f0',
              borderRadius: '8px',
              marginBottom: '1.5rem',
              border: '1px solid #ffccc7'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span style={{ color: '#ff4d4f', fontSize: '20px' }}>⚠️</span>
              <span style={{ color: '#cf1322', fontWeight: 'bold' }}>
                {validationErrors.voucher_for}
              </span>
            </div>
          </Paper>
        )}
      </DialogContent>
      <DialogActions sx={dialogActionsStyles}>
        <Button className="btn-cancel" onClick={onClose}>
          Cancel
        </Button>
        <Button onClick={handleSave} className="btn-save">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default VoucherEditDialog
