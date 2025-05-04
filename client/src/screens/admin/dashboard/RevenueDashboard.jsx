import { useEffect, useState } from 'react'
import { admin } from 'api'
import styled from 'styled-components'
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  Paper,
  TextField,
  Button
} from '@mui/material'
import { Snackbar } from '~/components/general'
import PaidIcon from '@mui/icons-material/Paid'
import ReceiptIcon from '@mui/icons-material/Receipt'
import DateRangeIcon from '@mui/icons-material/DateRange'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from 'recharts'
import TransactionDetailDialog from './revenue/TransactionDetailDialog'

function RevenueDashboard() {
  // States for dashboard data
  const [summaryData, setSummaryData] = useState({
    total_transactions: 0,
    date_revenue: 0,
    month_revenue: 0
  })
  const [statisticData, setStatisticData] = useState({
    monthRevenue: [],
    top20UserPaid: [],
    top20CoursePaid: []
  })
  const [transactions, setTransactions] = useState([])
  const [selectedTransaction, setSelectedTransaction] = useState(null)
  const [openDetailDialog, setOpenDetailDialog] = useState(false)

  // States for date range
  const [startDate, setStartDate] = useState(
    new Date(new Date().getFullYear(), new Date().getMonth(), 1)
  )
  const [endDate, setEndDate] = useState(new Date())

  // Error state
  const [openError, setOpenError] = useState({
    status: false,
    message: ''
  })

  const [maxY, setMaxY] = useState(10000)

  // Pagination state
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)

  // Handle pagination changes
  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }

  // Load summary data (cards)
  const loadSummaryData = async () => {
    try {
      const response = await admin.getRevenueSummary()
      if (response.status === 200) {
        setSummaryData(response.data)
      } else {
        setOpenError({
          status: true,
          message: 'Failed to load revenue summary data'
        })
        setTimeout(() => {
          setOpenError({
            status: false,
            message: ''
          })
        }, 3000)
      }
    } catch (error) {
      setOpenError({
        status: true,
        message: 'Failed to load revenue summary data'
      })
      setTimeout(() => {
        setOpenError({
          status: false,
          message: ''
        })
      }, 3000)
    }
  }

  // Load statistics data (charts)
  const loadStatisticsData = async () => {
    try {
      // Format dates as YYYY-MM-DD for API
      const formattedStartDate = startDate.toISOString().split('T')[0]
      const formattedEndDate = endDate.toISOString().split('T')[0]

      const response = await admin.getRevenueStatisticsPayment(
        formattedStartDate,
        formattedEndDate
      )
      setStatisticData(response.data)
    } catch (error) {
      setOpenError({
        status: true,
        message: 'Failed to load revenue statistics data'
      })
      setTimeout(() => {
        setOpenError({
          status: false,
          message: ''
        })
      }, 3000)
    }
  }

  // Load transactions data (table)
  const loadTransactions = async () => {
    try {
      const response = await admin.getTransactions()
      if (response.status === 200) {
        setTransactions(response.data)
      } else {
        setOpenError({
          status: true,
          message: 'Failed to load transactions data'
        })
        setTimeout(() => {
          setOpenError({
            status: false,
            message: ''
          })
        }, 3000)
      }
    } catch (error) {
      setOpenError({
        status: true,
        message: 'Failed to load transactions data'
      })
      setTimeout(() => {
        setOpenError({
          status: false,
          message: ''
        })
      }, 3000)
    }
  }

  // Initial load
  useEffect(() => {
    loadSummaryData()
    loadTransactions()
  }, [])

  // Load statistics data when date range changes
  useEffect(() => {
    if (startDate && endDate) {
      loadStatisticsData()
    }
  }, [startDate, endDate])

  useEffect(() => {
    if (statisticData.monthRevenue.length > 0) {
      const maxValue = Math.max(
        ...statisticData.monthRevenue.map((item) => item.total_amount)
      )
      // Optionally, round it up to nearest thousand for cleaner axis
      const roundedMax = Math.ceil(maxValue / 1000) * 1000
      setMaxY(roundedMax)
    }
  }, [statisticData.monthRevenue])

  // Handle transaction detail dialog
  const handleOpenDetail = (transaction) => {
    setSelectedTransaction(transaction)
    setOpenDetailDialog(true)
  }

  const handleCloseDetail = () => {
    setOpenDetailDialog(false)
    setSelectedTransaction(null)
  }

  // Format currency
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(amount)
  }

  return (
    <RevenueDashboardWrapper>
      <h3>Revenue Dashboard</h3>

      {/* Summary Cards */}
      <div className="general-card-list">
        <div className="general-card">
          <div className="general-icon">
            <span id="transactions">
              <ReceiptIcon style={{ fontSize: 40 }} />
            </span>
          </div>
          <div className="general-content">
            <h4>Monthly Transactions</h4>
            <p>{summaryData.total_transactions}</p>
          </div>
        </div>
        <div className="general-card">
          <div className="general-icon">
            <span id="daily">
              <PaidIcon style={{ fontSize: 40 }} />
            </span>
          </div>
          <div className="general-content">
            <h4>Today&apos;s Revenue</h4>
            <p>{formatCurrency(summaryData.date_revenue)}</p>
          </div>
        </div>
        <div className="general-card">
          <div className="general-icon">
            <span id="monthly">
              <DateRangeIcon style={{ fontSize: 40 }} />
            </span>
          </div>
          <div className="general-content">
            <h4>Monthly Revenue</h4>
            <p>{formatCurrency(summaryData.month_revenue)}</p>
          </div>
        </div>
      </div>

      {/* Date Range Picker */}
      <div className="date-range-container">
        <h4>Revenue Statistics</h4>
        <div className="date-pickers">
          <TextField
            label="Start Date"
            type="date"
            value={startDate.toISOString().split('T')[0]}
            onChange={(e) => setStartDate(new Date(e.target.value))}
            InputLabelProps={{
              shrink: true
            }}
          />
          <TextField
            label="End Date"
            type="date"
            value={endDate.toISOString().split('T')[0]}
            onChange={(e) => setEndDate(new Date(e.target.value))}
            InputLabelProps={{
              shrink: true
            }}
          />
        </div>
      </div>

      {/* Charts Section */}
      <div className="chart-container">
        <div className="chart-item full-width">
          <h4>Daily Revenue</h4>
          <LineChart
            width={1000}
            height={300}
            data={statisticData.monthRevenue || []}
            label={{ fontSize: 16 }}
            labelLine={true}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="day" tick={{ fontSize: 16 }} />
            <YAxis
              tick={{ fontSize: 16 }}
              domain={[0, maxY + 1000]}
              allowDataOverflow={true}
              scale="linear"
            />
            <Tooltip contentStyle={{ fontSize: '16px' }} />
            <Legend wrapperStyle={{ fontSize: '16px' }} />
            <Line
              type="monotone"
              dataKey="total_amount"
              stroke="#8884d8"
              name="Daily Revenue"
            />
          </LineChart>
          <p className="chart-note">
            This chart shows the daily revenue within the selected date range.
          </p>
        </div>

        {/* Top Users Section */}
        <div className="chart-item">
          <h4>Top 20 Paying Users</h4>
          <div className="top-list-container">
            {statisticData.top20UserPaid.map((user, index) => (
              <div className="top-list-item" key={user.userID}>
                <div className="top-list-rank">{index + 1}</div>
                <div className="top-list-avatar">
                  <img
                    src={user.avatar || '/default-avatar.png'}
                    alt={user.fullname}
                  />
                </div>
                <div className="top-list-info">
                  <div className="top-list-name">{user.fullname}</div>
                  <div className="top-list-id">ID: {user.userID}</div>
                </div>
                <div className="top-list-amount">
                  {formatCurrency(user.total_amount)}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top Courses Section */}
        <div className="chart-item">
          <h4>Top 20 Purchased Courses</h4>
          <div className="top-list-container">
            {statisticData.top20CoursePaid.map((course, index) => (
              <div className="top-list-item" key={course.course}>
                <div className="top-list-rank">{index + 1}</div>
                <div className="top-list-image">
                  <img
                    src={course.image_introduce || '/default-course.png'}
                    alt={course.title}
                  />
                </div>
                <div className="top-list-info">
                  <div className="top-list-name">{course.title}</div>
                  <div className="top-list-id">ID: {course.course}</div>
                </div>
                <div className="top-list-count">
                  {course.total_bought} purchases
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Transactions Table */}
      <div className="transactions-section">
        <h4>Recent Transactions</h4>
        <TableContainer component={Paper} className="table-container">
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Order Code</TableCell>
                <TableCell>Description</TableCell>
                <TableCell>Amount</TableCell>
                <TableCell>Paid By</TableCell>
                <TableCell>Paid For</TableCell>
                <TableCell>Transaction Time</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {transactions
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((transaction) => (
                  <TableRow
                    key={transaction.order_code}
                    onClick={() => handleOpenDetail(transaction)}
                    style={{ cursor: 'pointer' }}
                  >
                    <TableCell>{transaction.order_code}</TableCell>
                    <TableCell>
                      {transaction.description.substring(0, 30)}...
                    </TableCell>
                    <TableCell>{formatCurrency(transaction.amount)}</TableCell>
                    <TableCell>{transaction.paid_by}</TableCell>
                    <TableCell>{transaction.paid_for}</TableCell>
                    <TableCell>
                      {new Date(transaction.transaction_time).toLocaleString()}
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={transactions.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            className="table-pagination"
          />
        </TableContainer>
      </div>

      {/* Transaction Detail Dialog */}
      {selectedTransaction && (
        <TransactionDetailDialog
          open={openDetailDialog}
          onClose={handleCloseDetail}
          transaction={selectedTransaction}
        />
      )}

      {openError.status && (
        <Snackbar
          vertical="bottom"
          horizontal="right"
          severity="error"
          message={openError.message}
        />
      )}
    </RevenueDashboardWrapper>
  )
}

const RevenueDashboardWrapper = styled.section`
  padding: 3rem;
  h3 {
    font-size: 2.4rem;
    font-weight: 600;
    color: rgb(52, 71, 103);
    margin-bottom: 3rem;
  }

  .general-card-list {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 3rem;
    margin-bottom: 3rem;

    .general-card {
      display: flex;
      justify-content: space-between;
      padding: 1rem;
      background: rgb(255, 255, 255);
      border-radius: 0.75rem;
      box-shadow: rgba(0, 0, 0, 0.14) 0rem 0.25rem 1.25rem 0rem,
        rgba(64, 64, 64, 0.4) 0rem 0.4375rem 0.625rem -0.3125rem;
      animation: fadeInUp 0.8s ease-out forwards;
      opacity: 0;
      transform: translateY(20px);

      &:nth-child(1) {
        animation-delay: 0.2s;
      }

      &:nth-child(2) {
        animation-delay: 0.3s;
      }

      &:nth-child(3) {
        animation-delay: 0.4s;
      }

      @keyframes fadeInUp {
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }

      .general-content {
        padding: 0 1rem;

        h4 {
          font-size: 1.6rem;
          font-weight: 200;
        }

        p {
          font-size: 2.4rem;
          font-weight: 600;
          color: rgb(52, 71, 103);
        }
      }

      .general-icon #transactions,
      .general-icon #daily,
      .general-icon #monthly {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 7rem;
        height: 7rem;
        opacity: 1;
        margin-top: -25px;
        border-radius: 0.75rem;
        box-shadow: rgba(0, 0, 0, 0.14) 0rem 0.25rem 1.25rem 0rem,
          rgba(64, 64, 64, 0.4) 0rem 0.4375rem 0.625rem -0.3125rem;
      }

      .general-icon #transactions {
        color: rgb(255, 255, 255);
        background: linear-gradient(
          45deg,
          rgba(25, 118, 210, 0.8),
          rgba(33, 150, 243, 0.8)
        );
      }

      .general-icon #daily {
        color: rgb(255, 255, 255);
        background: linear-gradient(
          45deg,
          rgba(8, 59, 21, 0.8),
          rgba(18, 142, 50, 0.8)
        );
      }

      .general-icon #monthly {
        color: rgb(255, 255, 255);
        background: linear-gradient(
          45deg,
          rgba(135, 70, 22, 0.8),
          rgba(211, 130, 46, 0.8)
        );
      }
    }
  }

  .date-range-container {
    margin-bottom: 2rem;
    h4 {
      font-size: 1.8rem;
      font-weight: 600;
      color: rgb(52, 71, 103);
      margin-bottom: 1.5rem;
    }
    .date-pickers {
      display: flex;
      gap: 2rem;
      margin-bottom: 2rem;

      .MuiTextField-root {
        width: 20rem;
        .MuiInputBase-root {
          font-size: 1.4rem;
        }
        .MuiInputLabel-root {
          font-size: 1.4rem;
        }
      }
    }
  }

  .chart-container {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 3rem;
    margin-bottom: 3rem;

    .chart-item {
      background: rgb(255, 255, 255);
      border-radius: 0.75rem;
      box-shadow: rgba(0, 0, 0, 0.14) 0rem 0.25rem 1.25rem 0rem,
        rgba(64, 64, 64, 0.4) 0rem 0.4375rem 0.625rem -0.3125rem;
      padding: 2rem;
      animation: fadeInUp 0.8s ease-out forwards;
      opacity: 0;
      transform: translateY(20px);

      &.full-width {
        grid-column: 1 / -1;
      }

      &:nth-child(1) {
        animation-delay: 0.5s;
      }

      &:nth-child(2) {
        animation-delay: 0.6s;
      }

      &:nth-child(3) {
        animation-delay: 0.7s;
      }

      h4 {
        font-size: 1.8rem;
        font-weight: 600;
        color: rgb(52, 71, 103);
        margin-bottom: 2rem;
      }

      .chart-note {
        margin-top: 1rem;
        font-size: 1.4rem;
        color: rgb(100, 100, 100);
        font-style: italic;
        font-weight: 600;
      }

      .top-list-container {
        max-height: 400px;
        overflow-y: auto;
        padding-right: 1rem;

        .top-list-item {
          display: flex;
          align-items: center;
          padding: 1rem;
          margin-bottom: 1rem;
          border-radius: 8px;
          background-color: #f9f9f9;

          .top-list-rank {
            width: 30px;
            height: 30px;
            border-radius: 50%;
            background-color: rgb(52, 71, 103);
            color: white;
            display: flex;
            align-items: center;
            justify-content: center;
            font-weight: bold;
            margin-right: 1rem;
          }

          .top-list-avatar,
          .top-list-image {
            width: 40px;
            height: 40px;
            border-radius: 50%;
            overflow: hidden;
            margin-right: 1rem;

            img {
              width: 100%;
              height: 100%;
              object-fit: cover;
            }
          }

          .top-list-image {
            border-radius: 4px;
          }

          .top-list-info {
            flex: 1;

            .top-list-name {
              font-weight: bold;
              font-size: 1.4rem;
            }

            .top-list-id {
              font-size: 1.2rem;
              color: #666;
            }
          }

          .top-list-amount,
          .top-list-count {
            font-weight: bold;
            color: rgb(52, 71, 103);
            font-size: 1.4rem;
          }
        }
      }
    }
  }

  .transactions-section {
    margin-bottom: 3rem;

    h4 {
      font-size: 1.8rem;
      font-weight: 600;
      color: rgb(52, 71, 103);
      margin-bottom: 1.5rem;
    }

    .table-container {
      background: rgb(255, 255, 255);
      border-radius: 0.75rem;
      box-shadow: rgba(0, 0, 0, 0.14) 0rem 0.25rem 1.25rem 0rem,
        rgba(64, 64, 64, 0.4) 0rem 0.4375rem 0.625rem -0.3125rem;
      animation: fadeInUp 0.8s ease-out forwards;
      opacity: 0;
      transform: translateY(20px);
      animation-delay: 0.8s;

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

    .table-pagination {
      font-family: 'Inter', 'Arial', sans-serif;
      color: rgb(52, 71, 103);

      .MuiTablePagination-selectLabel,
      .MuiTablePagination-displayedRows,
      .MuiTablePagination-select,
      .MuiInputBase-root {
        font-size: 1.4rem;
      }

      .MuiTablePagination-actions {
        font-size: 1.4rem;

        .MuiIconButton-root {
          padding: 0.8rem;

          &:hover {
            background-color: rgba(52, 71, 103, 0.08);
          }

          &.Mui-disabled {
            opacity: 0.5;
          }

          .MuiSvgIcon-root {
            width: 2rem;
            height: 2rem;
          }
        }
      }

      .MuiToolbar-root {
        min-height: 56px;
        padding: 0 1.6rem;
      }

      .MuiTablePagination-spacer {
        flex: 1 1 100%;
      }

      .MuiInputBase-root {
        margin-right: 1.6rem;
        margin-left: 0.8rem;
      }

      .MuiSelect-select {
        padding: 0.7rem 3.2rem 0.7rem 1.2rem !important;
      }
    }
  }

  @media (max-width: 768px) {
    .general-card-list {
      grid-template-columns: repeat(1, 1fr);
    }

    .chart-container {
      grid-template-columns: repeat(1, 1fr);
    }
  }
`

export default RevenueDashboard
