import styled from 'styled-components'
import Accordion from '@mui/material/Accordion'
import AccordionSummary from '@mui/material/AccordionSummary'
import AccordionDetails from '@mui/material/AccordionDetails'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import Radio from '@mui/material/Radio'
import RadioGroup from '@mui/material/RadioGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import FormControl from '@mui/material/FormControl'
import StarRating from '~/components/general/Other/StarRating'
import { languages } from '~/constants/listLanguage'
import { useSearchParams } from 'react-router-dom'
import { useState, useEffect } from 'react'

function FilterCourse({ title }) {
  const [searchFilters, setSearchFilters] = useSearchParams()
  const [ratings, setRatings] = useState(searchFilters.get('ratings') || '')
  const [language, setLanguage] = useState(searchFilters.get('language') || '')
  const [method, setMethod] = useState(searchFilters.get('method') || '')
  const [program, setProgram] = useState(searchFilters.get('program') || '')
  const [price, setPrice] = useState(searchFilters.get('price') || '')

  useEffect(() => {
    const params = {}

    if (title) params.q = title
    if (ratings) params.ratings = ratings
    if (language) params.language = language
    if (method) params.method = method
    if (program) params.program = program
    if (price) params.price = price

    setSearchFilters(params)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [title, ratings, language, method, program, price])

  return (
    <FilterCourseWrapper>
      <Accordion
        sx={{
          boxShadow: 'none',
          borderTop: '1px solid #e0e0e0',
          fontSize: '1rem !important',
          '&:before': {
            display: 'none'
          }
        }}
        defaultExpanded
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="rating-content"
          id="rating-header"
          sx={{
            padding: '0px 10px',
            '& .MuiAccordionSummary-content': {
              margin: 0
            }
          }}
        >
          <h3>Rating</h3>
        </AccordionSummary>
        <AccordionDetails>
          <FormControl>
            <RadioGroup
              aria-labelledby="demo-radio-buttons-group-label"
              value={ratings}
              name="radio-buttons-group"
              onChange={(event) => {
                setRatings(event.target.value)
              }}
            >
              <FormControlLabel
                value="4"
                control={<Radio />}
                label={
                  <div className="star-value">
                    <StarRating rating_star={4} />
                    <span id="number">4 and up</span>
                  </div>
                }
              />

              <FormControlLabel
                value="3"
                control={<Radio />}
                label={
                  <div className="star-value">
                    <StarRating rating_star={3} />
                    <span id="number">3 and up</span>
                  </div>
                }
              />

              <FormControlLabel
                value="2"
                control={<Radio />}
                label={
                  <div className="star-value">
                    <StarRating rating_star={2} />
                    <span id="number">2 and up</span>
                  </div>
                }
              />

              <FormControlLabel
                value="1"
                control={<Radio />}
                label={
                  <div className="star-value">
                    <StarRating rating_star={1} />
                    <span id="number">1 and up</span>
                  </div>
                }
              />
            </RadioGroup>
          </FormControl>
        </AccordionDetails>
      </Accordion>
      <Accordion
        sx={{
          boxShadow: 'none',
          borderTop: '1px solid #e0e0e0',
          fontSize: '1rem !important',
          '&:before': {
            display: 'none'
          }
        }}
        defaultExpanded
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="language-content"
          id="language-header"
          sx={{
            padding: '0px 10px',
            '& .MuiAccordionSummary-content': {
              margin: 0
            }
          }}
        >
          <h3>Language</h3>
        </AccordionSummary>
        <AccordionDetails>
          <select
            id="language"
            className="language-select"
            value={language}
            onChange={(event) => {
              setLanguage(event.target.value)
            }}
          >
            {languages.map((language, index) => (
              <option key={index} value={language}>
                {language}
              </option>
            ))}
          </select>
        </AccordionDetails>
      </Accordion>

      <Accordion
        sx={{
          boxShadow: 'none',
          borderTop: '1px solid #e0e0e0',
          fontSize: '1rem !important',
          '&:before': {
            display: 'none'
          }
        }}
        defaultExpanded
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="method-content"
          id="method-header"
          sx={{
            padding: '0px 10px',
            '& .MuiAccordionSummary-content': {
              margin: 0
            }
          }}
        >
          <h3>Method</h3>
        </AccordionSummary>
        <AccordionDetails>
          <FormControl>
            <RadioGroup
              onChange={(event) => {
                setMethod(event.target.value)
              }}
              value={method}
            >
              <FormControlLabel
                value="Supervised with AI camera"
                control={<Radio />}
                label={<p>Supervised with AI camera</p>}
              />
              <FormControlLabel
                value="Self-directed study"
                control={<Radio />}
                label={<p>Self-directed study</p>}
              />
            </RadioGroup>
          </FormControl>
        </AccordionDetails>
      </Accordion>
      <Accordion
        sx={{
          boxShadow: 'none',
          borderTop: '1px solid #e0e0e0',
          fontSize: '1rem !important',
          '&:before': {
            display: 'none'
          }
        }}
        defaultExpanded
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="price-content"
          id="price-header"
          sx={{
            padding: '0px 10px',
            '& .MuiAccordionSummary-content': {
              margin: 0
            }
          }}
        >
          <h3>Price</h3>
        </AccordionSummary>
        <AccordionDetails>
          <FormControl>
            <RadioGroup
              onChange={(event) => {
                setPrice(event.target.value)
              }}
              value={price}
            >
              <FormControlLabel
                value="Free"
                control={<Radio />}
                label={<p>Free</p>}
              />
              <FormControlLabel
                value="Paid"
                control={<Radio />}
                label={<p>Paid</p>}
              />
            </RadioGroup>
          </FormControl>
        </AccordionDetails>
      </Accordion>
      <Accordion
        sx={{
          boxShadow: 'none',
          borderTop: '1px solid #e0e0e0',
          fontSize: '1rem !important',
          '&:before': {
            display: 'none'
          }
        }}
        defaultExpanded
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="program-content"
          id="program-header"
          sx={{
            padding: '0px 10px',
            '& .MuiAccordionSummary-content': {
              margin: 0
            }
          }}
        >
          <h3>Program</h3>
        </AccordionSummary>
        <AccordionDetails>
          <FormControl>
            <RadioGroup
              onChange={(event) => {
                setProgram(event.target.value)
              }}
              value={program}
            >
              <FormControlLabel
                value="Degree"
                control={<Radio />}
                label={<p>Degree</p>}
              />
              <FormControlLabel
                value="Certificate"
                control={<Radio />}
                label={<p>Certificate</p>}
              />
              <FormControlLabel
                value="Knowledge"
                control={<Radio />}
                label={<p>Knowledge</p>}
              />
            </RadioGroup>
          </FormControl>
        </AccordionDetails>
      </Accordion>
    </FilterCourseWrapper>
  )
}

const FilterCourseWrapper = styled.aside`
  align-self: start;
  height: auto-fit;
  display: flex;
  flex-direction: column;
  padding: 2rem;
  background-color: #fff;
  border-radius: 8px;
  border: 2px solid #74c0fc;
  box-shadow: 0 10px 20px rgba(44, 130, 201, 0.2);
  transition: all 0.3s;

  &:hover {
    box-shadow: 0 10px 20px rgba(44, 130, 201, 0.4);
    transition: all ease 0.3s;
  }

  .MuiAccordion-root {
    margin: 0;
  }

  .MuiAccordionSummary-root {
    margin: 0;
  }

  .css-1i7u1af-MuiPaper-root-MuiAccordion-root.Mui-expanded {
    margin: 0;
  }

  p {
    font-size: 1.6rem;
    margin: 0;
    line-height: 1.6;
  }

  h3 {
    font-size: 1.6rem;
    font-weight: 700;
    margin: 0;
    line-height: 1.6;
  }

  .star-value {
    display: flex;
    align-items: center;

    span {
      font-size: 1.6rem;
      margin-top: 0.5rem;
    }
    #number {
      margin-left: 20px;
      line-height: 1.6;
    }

    @media screen and (max-width: 1440px) {
      span {
        font-size: 1.4rem;
      }
      #number {
        font-size: 1.4rem;
      }
    }

    @media screen and (max-width: 978px) {
      flex-direction: column;
      align-items: flex-start;
      span {
        margin-top: 0;
      }
      #number {
        margin-left: 0;
      }
    }

    @media screen and (max-width: 480px) {
      span {
        font-size: 1.4rem;
      }
      #number {
        font-size: 1.4rem;
      }
    }
  }
  .language-select {
    width: 100%;
    height: 4rem;
    padding: 8px;
    font-size: 1.6rem;
    margin: 0 auto;
    margin-bottom: 20px;
    border: 1px solid #ccc;
    border-radius: 8px;
    box-sizing: border-box;
    transition: border-color 0.3s, border-width;
    &:focus {
      border-color: #187bce;
      border-width: 2px;
      outline: none;
    }
  }

  @media screen and (max-width: 768px) {
    padding: 1rem;
  }

  @media screen and (max-width: 480px) {
    padding: 1rem;
  }
`

export default FilterCourse
