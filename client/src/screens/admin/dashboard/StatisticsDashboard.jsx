import { useEffect, useState } from 'react'
import { admin } from 'api'
import styled from 'styled-components'
import { Snackbar } from '~/components/general'
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid
} from 'recharts'

const COLORS = ['#128e32cc', '#878616cc', '#be1d1df0']

function StatisticsDashboard() {
  const [data, setData] = useState({
    courseStatus: [],
    userRoles: [],
    ratings: [],
    categories: []
  })
  const [openError, setOpenError] = useState({
    status: false,
    message: ''
  })

  const loadStatisticsData = async () => {
    try {
      const [
        courseStatusResponse,
        userRolesResponse,
        ratingsResponse,
        categoriesResponse
      ] = await Promise.all([
        admin.getCourseStatistics(),
        admin.getUserStatistics(),
        admin.getRatingStatistics(),
        admin.getCourseByCategory()
      ])

      setData({
        courseStatus: courseStatusResponse.data,
        userRoles: userRolesResponse.data,
        ratings: ratingsResponse.data,
        categories: categoriesResponse.data
      })
    } catch (error) {
      setOpenError({
        status: true,
        message: 'Failed to load statistics data'
      })
      setTimeout(() => {
        setOpenError({
          status: false,
          message: ''
        })
      }, 3000)
    }
  }

  useEffect(() => {
    loadStatisticsData()
  }, [])

  return (
    <StatisticsDashboardWrapper>
      <h3>Statistics Overview</h3>
      <div className="chart-container">
        <div className="chart-item">
          <h4>Course Status</h4>
          <PieChart width={400} height={400}>
            <Pie
              data={data.courseStatus}
              dataKey="count"
              nameKey="status"
              cx="50%"
              cy="50%"
              outerRadius={150}
              fill="#8884d8"
              label={{ fontSize: 16 }}
              labelLine={true}
            >
              {data.courseStatus.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                  stroke="#fff"
                  strokeWidth={2}
                />
              ))}
            </Pie>
            <Tooltip contentStyle={{ fontSize: '16px' }} />
            <Legend wrapperStyle={{ fontSize: '16px' }} />
          </PieChart>
          <p className="chart-note">
            This chart shows the distribution of courses by their status:
            Published, Monitoring, and Terminated.
          </p>
        </div>
        <div className="chart-item">
          <h4>User Roles</h4>
          <BarChart
            width={600}
            height={300}
            data={data.userRoles}
            label={{ fontSize: 16 }}
            labelLine={true}
          >
            <XAxis dataKey="role" tick={{ fontSize: 16 }} />
            <YAxis tick={{ fontSize: 16 }} />
            <Tooltip contentStyle={{ fontSize: '16px' }} />
            <Legend wrapperStyle={{ fontSize: '16px' }} />
            <Bar dataKey="count" fill="#49a3f1" />
          </BarChart>
          <p className="chart-note">
            This chart displays the number of users categorized by their roles:
            Admin, Instructor, and Student.
          </p>
        </div>
        <div className="chart-item">
          <h4>Ratings</h4>
          <LineChart
            width={600}
            height={300}
            data={data.ratings}
            label={{ fontSize: 16 }}
            labelLine={true}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="star" tick={{ fontSize: 16 }} />
            <YAxis tick={{ fontSize: 16 }} />
            <Tooltip contentStyle={{ fontSize: '16px' }} />
            <Line type="monotone" dataKey="count" stroke="#8884d8" />
          </LineChart>
          <p className="chart-note">
            This chart shows the number of ratings grouped by the number of
            stars given by users.
          </p>
        </div>
        <div className="chart-item">
          <h4>Categories</h4>
          <BarChart
            width={600}
            height={300}
            data={data.categories}
            label={{ fontSize: 16 }}
            labelLine={true}
          >
            <XAxis dataKey="category" tick={{ fontSize: 16 }} />
            <YAxis tick={{ fontSize: 16 }} />
            <Tooltip contentStyle={{ fontSize: '16px' }} />
            <Legend wrapperStyle={{ fontSize: '16px' }} />
            <Bar dataKey="count" fill="#8884d8" />
          </BarChart>
          <p className="chart-note">
            This chart represents the number of courses available in each
            category.
          </p>
        </div>
      </div>
      {openError.status && (
        <Snackbar
          vertical="bottom"
          horizontal="right"
          severity="error"
          message={openError.message}
        />
      )}
    </StatisticsDashboardWrapper>
  )
}

const StatisticsDashboardWrapper = styled.section`
  padding: 3rem;

  h3 {
    font-size: 2.4rem;
    font-weight: 600;
    color: rgb(52, 71, 103);
    margin-bottom: 3rem;
  }

  .chart-container {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 3rem;

    .chart-item {
      background: rgb(255, 255, 255);
      border-radius: 0.75rem;
      box-shadow: rgba(0, 0, 0, 0.14) 0rem 0.25rem 1.25rem 0rem,
        rgba(64, 64, 64, 0.4) 0rem 0.4375rem 0.625rem -0.3125rem;
      padding: 2rem;
      animation: fadeInUp 0.8s ease-out forwards;
      opacity: 0;
      transform: translateY(20px);

      &:nth-child(odd) {
        animation-delay: 0.2s;
      }

      &:nth-child(even) {
        animation-delay: 0.4s;
      }

      h4 {
        font-size: 1.8rem;
        font-weight: 600;
        color: rgb(52, 71, 103);
        margin-bottom: 3rem;
      }

      .chart-note {
        margin-top: 1rem;
        font-size: 1.4rem;
        color: rgb(100, 100, 100);
        font-style: italic;
        font-weight: 600;
      }
    }
  }

  @keyframes fadeInUp {
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @media (max-width: 768px) {
    .chart-container {
      grid-template-columns: repeat(1, 1fr);
    }
  }
`

export default StatisticsDashboard
