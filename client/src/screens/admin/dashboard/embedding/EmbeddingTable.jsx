import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box,
  Stack,
  Chip,
  Button
} from '@mui/material'
import InsertDriveFileOutlinedIcon from '@mui/icons-material/InsertDriveFileOutlined'
import VideoLibraryOutlinedIcon from '@mui/icons-material/VideoLibraryOutlined'
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import CancelIcon from '@mui/icons-material/Cancel'
import CircularProgress from '@mui/material/CircularProgress'

const EmbeddingTable = ({ datas, onEmbedded, isLoading }) => {

  const renderTypeIcon = (type) => {
    if (type === 'file') return <InsertDriveFileOutlinedIcon style={{ color: '#1976d2' }} />
    if (type === 'video') return <VideoLibraryOutlinedIcon style={{ color: '#d32f2f' }} />
    return <DescriptionOutlinedIcon style={{ color: '#757575' }} />
  }

  const renderEmbeddedStatus = (isEmbedded) => {
    return isEmbedded ? (
      <CheckCircleIcon style={{ color: 'green' }} />
    ) : (
      <CancelIcon style={{ color: 'red' }} />
    )
  }

  const embeddedCount = datas.filter((item) => item.is_embedded).length;
  const notEmbeddedCount = datas.length - embeddedCount;

  return (
    <TableContainer component={Paper} className="table-container">
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>URL</TableCell>
            <TableCell align="center">Type</TableCell>
            <TableCell align="center">Is Embedded</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {datas
            .map((data) => (
              <TableRow
                key={data.url}
              >
                <TableCell>
                  <a href={data.url} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', color: '#1976d2' }}>
                    {data.url}
                  </a>
                </TableCell>
                <TableCell align="center">
                  {renderTypeIcon(data.type)}
                </TableCell>
                <TableCell align="center">
                  {renderEmbeddedStatus(data.is_embedded)}
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
      <Box mt={2} ml={2} mb={2} mr={2} display="flex" justifyContent="space-between" alignItems="center">
        <Stack direction="row" spacing={2}>
          <Chip
            icon={<CheckCircleIcon style={{ color: 'white' }} />}
            label={`Embedded: ${embeddedCount}`}
            style={{ backgroundColor: 'green', color: 'white', fontSize: '1.2rem' }}
          />
          <Chip
            icon={<CancelIcon style={{ color: 'white' }} />}
            label={`Unembedded: ${notEmbeddedCount}`}
            style={{ backgroundColor: 'red', color: 'white', fontSize: '1.2rem' }}
          />
        </Stack>

        <Button
          variant="contained"
          onClick={() => onEmbedded()}
          style={{ marginRight: '100px', backgroundColor: 'rgb(52, 71, 103)' }}
        >
          {isLoading ? <CircularProgress size={20} sx={{ color: '#fff' }} /> : 'Embedding'}
        </Button>
      </Box>
    </TableContainer>
  )
}

export default EmbeddingTable
