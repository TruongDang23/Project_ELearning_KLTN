import styled from 'styled-components'
import { Element } from 'react-scroll'
import { TextField } from '@mui/material'
import { useState, useContext } from 'react'

import { DesignCourseContext } from './DesignCourseContext'
import { categories } from '~/constants/listCategories'
import { languages } from '~/constants/listLanguage'
import { currencies } from '~/constants/listCurrency'
import { levels } from '~/constants/listLevels'

import UploadFile from './UploadFile'

import AddCircleIcon from '@mui/icons-material/AddCircle'
import CancelIcon from '@mui/icons-material/Cancel'
import Radio from '@mui/material/Radio'
import RadioGroup from '@mui/material/RadioGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import FormControl from '@mui/material/FormControl'
import DeleteIcon from '@mui/icons-material/Delete'
import {
  Button,
  IconButton,
  Select,
  MenuItem,
  Card,
  CardContent
} from '@mui/material'

function MainDesignCourse({ setStructure }) {
  //* Context API from DesignCourseContext
  const { markSectionAsCompleted } = useContext(DesignCourseContext)
  //* General section
  // About generalTitle
  const [generalTitle, setGeneralTitle] = useState('')
  const maxGeneralTitleLength = 80
  const handleGeneralTitleChange = (event) => {
    const inputValue = event.target.value
    if (inputValue.length <= maxGeneralTitleLength) {
      setGeneralTitle(inputValue)
    }
  }
  // About generalKeywords
  const [generalKeywords, setGeneralKeywords] = useState([{ value: '' }])
  const handleGeneralKeywordsChange = (index, event) => {
    const newKeywords = [...generalKeywords]
    newKeywords[index].value = event.target.value
    setGeneralKeywords(newKeywords)
  }
  const handleGeneralAddMore = () => {
    setGeneralKeywords([...generalKeywords, { value: '' }])
  }
  const handleGeneralRemoveKeyword = (index) => {
    const newKeywords = generalKeywords.filter((_, i) => i !== index)
    setGeneralKeywords(newKeywords)
  }
  // About method
  const [method, setMethod] = useState('')
  // About Language
  const [languageChoose, setLanguage] = useState('')
  // About Price
  const [price, setPrice] = useState({ value: '', unit: '' })
  // About Program
  const [program, setProgram] = useState('')

  const handleGeneralSave = () => {
    const hasEmptyKeyword = generalKeywords.some(
      (keyword) => keyword.value === ''
    )
    if (
      !generalTitle ||
      hasEmptyKeyword ||
      !method ||
      !languageChoose ||
      !program
    ) {
      alert('Please fill all the inputs before saving.')
      return
    } else if (price.value && !price.unit) {
      alert('Please select a currency before saving.')
      return
    } else if (!price.value || !price.unit) {
      alert('Your course will be free')
    } else {
      alert('General section saved')
    }
    setStructure((prev) => {
      return {
        ...prev,
        //mongoDB
        keywords: generalKeywords.map(obj => obj.value),

        //mysql
        title: generalTitle,
        method: method,
        language: languageChoose,
        price: (price.value) ? (price.value) : '0.0',
        currency: (price.unit) ? (price.unit) : 'VND',
        program: program
      }
    })
    markSectionAsCompleted('general')
    return
  }

  //* Categories section
  const [selectedCategory, setSelectedCategory] = useState('')

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value)
  }

  const [selectedLevel, setSelectedLevel] = useState('')

  const handleLevelChange = (event) => {
    setSelectedLevel(event.target.value)
  }

  const handleSaveCategoriesClick = () => {
    if (!selectedCategory) {
      alert('Please select a category before saving.')
      return
    } else {
      alert('Categories section saved')
      markSectionAsCompleted('categories')
      setStructure((prev) => {
        return {
          ...prev,
          category: selectedCategory
        }
      })
    }
  }

  //* Intended learners section
  // About intendedInputs
  const [intendedInputs, setInputs] = useState([
    { value: '' },
    { value: '' },
    { value: '' }
  ])
  const handleIntendedInputChange = (index, event) => {
    const newIntendedInputs = [...intendedInputs]
    newIntendedInputs[index].value = event.target.value
    setInputs(newIntendedInputs)
  }
  const handleIntendedAddMore = () => {
    setInputs([...intendedInputs, { value: '' }])
  }
  const handleIntendedRemoveInput = (index) => {
    const newInputs = intendedInputs.filter((_, i) => i !== index)
    setInputs(newInputs)
  }
  // About requirement inputs
  const [requirementInputs, setRequirementInputs] = useState([
    { value: '' },
    { value: '' },
    { value: '' }
  ])
  const handleRequirementInputChange = (index, event) => {
    const newRequirementInputs = [...requirementInputs]
    newRequirementInputs[index].value = event.target.value
    setRequirementInputs(newRequirementInputs)
  }
  const handleRequirementAddMore = () => {
    setRequirementInputs([...requirementInputs, { value: '' }])
  }
  const handleRequirementRemoveInput = (index) => {
    const newInputs = requirementInputs.filter((_, i) => i !== index)
    setRequirementInputs(newInputs)
  }

  const handleSaveIntendedLearnersClick = () => {
    // Kiểm tra có input nào có giá trị là rỗng không
    const hasEmptyIntendedInput = intendedInputs.some(
      (input) => input.value === ''
    )
    const hasEmptyRequirementInput = requirementInputs.some(
      (input) => input.value === ''
    )
    if (hasEmptyIntendedInput || hasEmptyRequirementInput) {
      alert('Please fill all the inputs before saving.')
      return
    }
    else if (!selectedLevel) {
      alert('Please select a category before saving.')
      return
    }
    else {
      alert('Intended learners section saved')
      markSectionAsCompleted('intendedLearners')
      setStructure((prev) => {
        return {
          ...prev,
          targets: intendedInputs.map(obj => obj.value),
          requirements: requirementInputs.map(obj => obj.value),
          course_for: selectedLevel
        }
      })
    }
  }

  //* Course structure section
  const [isEditing, setIsEditing] = useState(false)
  const [chapters, setChapters] = useState([
    {
      chapter_name: 'Chapter 1',
      lectures: [
        {
          name: 'Lecture 1: Introduction',
          type: 'file',
          description: '',
          source: ''
        }
      ]
    },
    {
      chapter_name: 'Chapter 2',
      lectures: [
        {
          name: 'Lecture 1: Introduction',
          type: 'File',
          description: '',
          source: ''
        }
      ]
    }
  ])
  const handleChapterTitleChange = (index, newTitle) => {
    const updatedChapters = [...chapters]
    updatedChapters[index].chapter_name = newTitle
    setChapters(updatedChapters)
  }

  const handleAddLecture = (chapterIndex) => {
    const updatedChapters = [...chapters]
    updatedChapters[chapterIndex].lectures.push({
      name: `Lecture ${updatedChapters[chapterIndex].lectures.length + 1}`,
      type: 'File',
      description: '',
      source: ''
    })
    setChapters(updatedChapters)
  }
  const handleAddChapter = () => {
    setChapters([
      ...chapters,
      {
        chapter_name: `Chapter ${chapters.length + 1}`,
        lectures: []
      }
    ])
  }
  const handleInputChange = (chapterIndex, lectureIndex, field, value) => {
    const updatedChapters = [...chapters]
    updatedChapters[chapterIndex].lectures[lectureIndex][field] = value
    setChapters(updatedChapters)
  }

  const handleDeleteLecture = (chapterIndex, lectureIndex) => {
    const updatedChapters = [...chapters]
    updatedChapters[chapterIndex].lectures.splice(lectureIndex, 1) // Xóa lecture theo index
    setChapters(updatedChapters)
  }

  const handleDeleteChapter = (chapterIndex) => {
    const updatedChapters = [...chapters]
    updatedChapters.splice(chapterIndex, 1) // Xóa chapter theo index
    setChapters(updatedChapters)
  }

  const handleFileChange = (chapterIndex, lectureIndex, event) => {
    const file = event.target.files[0]
    if (file) {
      handleInputChange(chapterIndex, lectureIndex, 'filename', file.name) // Cập nhật tên file
      handleInputChange(chapterIndex, lectureIndex, 'source', file)
    }
  }

  const getFileAccept = (lectureType) => {
    switch (lectureType) {
    case 'file':
      return '.pdf'
    case 'video':
      return '.mp4,.wmv'
    case 'quiz':
      return '.xlsx'
    case 'assignment':
      return '.xlsx'
    default:
      return '' // Cho phép tất cả các loại file nếu không ràng buộc
    }
  }

  const handleSaveCourseStructureClick = () => {
    let errorMessages = []

    chapters.forEach((chapter, chapterIndex) => {
      if (chapter.chapter_name === '') {
        errorMessages.push(`Chapter ${chapterIndex + 1} title is empty.`)
      }

      chapter.lectures.forEach((lecture, lectureIndex) => {
        if (lecture.name === '') {
          errorMessages.push(
            `Lecture ${lectureIndex + 1} in Chapter ${
              chapterIndex + 1
            } title is empty.`
          )
        }
        if (lecture.source === '') {
          errorMessages.push(
            `Lecture ${lectureIndex + 1} in Chapter ${
              chapterIndex + 1
            } resource is empty.`
          )
        }
        if (lecture.type === '') {
          errorMessages.push(
            `Lecture ${lectureIndex + 1} in Chapter ${
              chapterIndex + 1
            } type is empty.`
          )
        }
      })
    })

    if (errorMessages.length > 0) {
      alert(
        `Please fill all the inputs before saving:\n${errorMessages.join('\n')}`
      )
      return
    } else {
      alert('Course structure section saved')
      setStructure((prev) => {
        return {
          ...prev,
          chapters: chapters,
          num_lecture: chapters.length
        }
      })
      markSectionAsCompleted('courseStructure')
    }
  }

  //* Introduce course section
  const [courseImage, setCourseImage] = useState(null)
  const [promotionalVideo, setPromotionalVideo] = useState(null)

  const handleImageChange = (file) => {
    setCourseImage(file)
  }

  const handleVideoChange = (file) => {
    setPromotionalVideo(file)
  }

  const handleSave = () => {
    if (!courseImage || !promotionalVideo) {
      alert('Please upload both course image and promotional video.')
      return
    } else {
      alert('Introduce course section saved')
      markSectionAsCompleted('introduceCourse')
      setStructure((prev) => {
        return {
          ...prev,
          image_introduce: courseImage,
          video_introduce: promotionalVideo,
          image_file: courseImage.name,
          video_file: promotionalVideo.name
        }
      })
    }
  }

  return (
    <MainDesignCourseWrapper>
      <h1>Design Your Course</h1>

      <Element name="general">
        <div className="design-general">
          <h2>General</h2>
          <hr />
          <div className="design-general-title">
            <h3>Title of Course</h3>
            <TextField
              placeholder="e.g. Java Programming for Beginners"
              helperText={`${generalTitle.length}/${maxGeneralTitleLength}`}
              variant="outlined"
              fullWidth
              value={generalTitle}
              onChange={handleGeneralTitleChange}
              InputProps={{
                endAdornment: (
                  <span>{maxGeneralTitleLength - generalTitle.length}</span>
                ),
                style: { fontSize: '1.6rem', color: '#555' },
                sx: {
                  height: '40px',
                  borderRadius: '5px',
                  backgroundColor: 'rgba(243, 243, 250, 0.8)',
                  color: '#187bce',
                  fontSize: '1.6rem',
                  outline: 'none',
                  transition: '0.3s all ease',
                  '&:hover .MuiOutlinedInput-notchedOutline': {
                    transition: '0.3s all ease',
                    border: 'none', // Loại bỏ border khi hover
                    boxShadow: '0 0 0 2px #187bce'
                  },
                  '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                    transition: '0.3s all',
                    border: 'none', // Loại bỏ border khi focus
                    boxShadow: '0 0 0 2px #187bce'
                  }
                },
                notchedOutline: {
                  border: 'none' // Loại bỏ border mặc định
                }
              }}
            />
          </div>
          <div className="design-general-keyword">
            <h3>Keywords</h3>
            <div className="design-general-keyword-inputs">
              {generalKeywords.map((keyword, index) => (
                <div key={index} className="design-general-keyword-input">
                  <TextField
                    key={index}
                    placeholder={`e.g. Java`}
                    value={keyword.value}
                    variant="outlined"
                    onChange={(e) => handleGeneralKeywordsChange(index, e)}
                    InputProps={{
                      style: { fontSize: '1.6rem', color: '#555' },
                      sx: {
                        height: '40px',
                        borderRadius: '5px',
                        backgroundColor: 'rgba(243, 243, 250, 0.8)',
                        color: '#187bce',
                        fontSize: '1.6rem',
                        outline: 'none',
                        transition: '0.3s all ease',
                        '&:hover .MuiOutlinedInput-notchedOutline': {
                          transition: '0.3s all ease',
                          border: 'none', // Loại bỏ border khi hover
                          boxShadow: '0 0 0 2px #187bce'
                        },
                        '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                          transition: '0.3s all',
                          border: 'none', // Loại bỏ border khi focus
                          boxShadow: '0 0 0 2px #187bce'
                        }
                      },
                      notchedOutline: {
                        border: 'none' // Loại bỏ border mặc định
                      }
                    }}
                    fullWidth
                  />
                  <a
                    id="cancel"
                    onClick={() => handleGeneralRemoveKeyword(index)}
                  >
                    <span>
                      <CancelIcon style={{ viewBox: '0 0 24 24' }} />
                    </span>
                  </a>
                </div>
              ))}
              <div className="design-general-keyword-addmore">
                <button id="btn-secoundary" onClick={handleGeneralAddMore}>
                  Add More{' '}
                  <span>
                    <AddCircleIcon style={{ viewBox: '0 0 24 24' }} />
                  </span>
                </button>
              </div>
            </div>
          </div>
          <div className="design-genral-method">
            <h3>Method</h3>
            <div className="design-genral-method-radio">
              <FormControl component="fieldset">
                <RadioGroup
                  row
                  aria-label="method"
                  name="method"
                  defaultValue="online"
                  value={method}
                  onChange={(e) => setMethod(e.target.value)}
                >
                  <FormControlLabel
                    value="Self-directed study"
                    control={<Radio />}
                    label={<p>Self-directed study</p>}
                  />
                  <FormControlLabel
                    value="Supervised with AI camera"
                    control={<Radio />}
                    label={<p>Supervised with AI camera</p>}
                  />
                </RadioGroup>
              </FormControl>
            </div>
          </div>

          <div className="design-genral-language">
            <h3>Language</h3>
            <div className="design-genral-language-select">
              <select
                defaultValue=""
                value={languageChoose}
                onChange={(event) => {
                  setLanguage(event.target.value)
                }}
                required
              >
                <option value="" disabled hidden>
                  Select a language
                </option>
                {languages.map((language, index) => (
                  <option key={index} value={language}>
                    {language}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="design-genral-price">
            <h3>Price</h3>
            <div className="design-genral-price-input">
              <input
                type="number"
                placeholder="e.g. 100"
                min="0"
                max="10000"
                value={price.value}
                onChange={(event) =>
                  setPrice({ ...price, value: event.target.value })
                }
              />
              <select
                defaultValue=""
                value={price.unit}
                onChange={(event) => {
                  setPrice({ value: price.value, unit: event.target.value })
                }}
                required
              >
                <option value="" disabled hidden>
                  Select a currency
                </option>
                {currencies.map((currency, index) => (
                  <option key={index} value={currency.label}>
                    {currency.label}
                  </option>
                ))}
              </select>
            </div>
            <p>
              <span>*</span>If you want your course free, leave blank
            </p>
          </div>

          <div className="design-genral-program">
            <h3>Program</h3>
            <div className="design-genral-program-radio">
              <FormControl component="fieldset">
                <RadioGroup
                  row
                  aria-label="method"
                  name="method"
                  defaultValue="online"
                  value={program}
                  onChange={(e) => setProgram(e.target.value)}
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
            </div>
          </div>

          <div className="design-genral-button">
            <button id="btn-primary" onClick={handleGeneralSave}>
              Save General
            </button>
          </div>
        </div>
      </Element>

      <Element name="categories">
        <div className="design-categories">
          <h2>Categories</h2>
          <hr />
          <h3>What categories best fit the knowledge you will share?</h3>
          <div className="design-categories-selects">
            <select
              defaultValue=""
              value={selectedCategory}
              onChange={handleCategoryChange}
              required
            >
              <option value="" disabled hidden>
                Select a category
              </option>
              {categories.map((category, index) => (
                <option key={index} value={category.label}>
                  {category.label}
                </option>
              ))}
            </select>
          </div>

          <div className="design-categories-button">
            <button id="btn-primary" onClick={handleSaveCategoriesClick}>
              Save Categories
            </button>
          </div>
        </div>
      </Element>

      <Element name="intended-learners">
        <div className="design-intended">
          <h2>Intended learners</h2>
          <hr />
          <h3>What will students learn in your course?</h3>
          <div className="design-intended-inputs">
            {intendedInputs.map((input, index) => (
              <div key={index} className="design-intended-input">
                <TextField
                  key={index}
                  placeholder={`e.g. Learning Java`}
                  value={input.value}
                  variant="outlined"
                  onChange={(e) => handleIntendedInputChange(index, e)}
                  InputProps={{
                    endAdornment: <span>200</span>,
                    style: { fontSize: '1.6rem', color: '#555' },
                    sx: {
                      height: '40px',
                      borderRadius: '5px',
                      backgroundColor: 'rgba(243, 243, 250, 0.8)',
                      color: '#187bce',
                      fontSize: '1.6rem',
                      outline: 'none',
                      transition: '0.3s all ease',
                      '&:hover .MuiOutlinedInput-notchedOutline': {
                        transition: '0.3s all ease',
                        border: 'none', // Loại bỏ border khi hover
                        boxShadow: '0 0 0 2px #187bce'
                      },
                      '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                        transition: '0.3s all',
                        border: 'none', // Loại bỏ border khi focus
                        boxShadow: '0 0 0 2px #187bce'
                      }
                    },
                    notchedOutline: {
                      border: 'none' // Loại bỏ border mặc định
                    }
                  }}
                  fullWidth
                />
                <a id="cancel" onClick={() => handleIntendedRemoveInput(index)}>
                  <span>
                    <CancelIcon />
                  </span>
                </a>
              </div>
            ))}
            <div className="design-intended-input-addmore">
              <button id="btn-secoundary" onClick={handleIntendedAddMore}>
                Add More{' '}
                <span>
                  <AddCircleIcon />
                </span>
              </button>
            </div>
          </div>
          <h3>
            What are the requirements of prerequisites for taking your course?
          </h3>
          <div className="design-intended-inputs">
            {requirementInputs.map((input, index) => (
              <div key={index} className="design-intended-input">
                <TextField
                  key={index}
                  placeholder={`e.g. Basic Java`}
                  value={input.value}
                  variant="outlined"
                  onChange={(e) => handleRequirementInputChange(index, e)}
                  InputProps={{
                    endAdornment: <span>200</span>,
                    style: { fontSize: '1.6rem', color: '#555' },
                    sx: {
                      height: '40px',
                      borderRadius: '5px',
                      backgroundColor: 'rgba(243, 243, 250, 0.8)',
                      color: '#187bce',
                      fontSize: '1.6rem',
                      outline: 'none',
                      transition: '0.3s all',
                      '&:hover .MuiOutlinedInput-notchedOutline': {
                        transition: '0.3s all',
                        border: 'none', // Loại bỏ border khi hover
                        boxShadow: '0 0 0 2px #187bce'
                      },
                      '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                        transition: '0.3s all',
                        border: 'none', // Loại bỏ border khi focus
                        boxShadow: '0 0 0 2px #187bce'
                      }
                    },
                    notchedOutline: {
                      border: 'none' // Lo
                    }
                  }}
                  fullWidth
                />
                <a
                  id="cancel"
                  onClick={() => handleRequirementRemoveInput(index)}
                >
                  <span>
                    <CancelIcon />
                  </span>
                </a>
              </div>
            ))}
            <div className="design-intended-input-addmore">
              <button id="btn-secoundary" onClick={handleRequirementAddMore}>
                Add More{' '}
                <span>
                  <AddCircleIcon />
                </span>
              </button>
            </div>
          </div>


          <h3>Who is this course for?</h3>
          <div className="design-intended-selects">
            <select
              defaultValue=""
              value={selectedLevel}
              onChange={handleLevelChange}
              required
            >
              <option value="" disabled hidden>
                Select a levels
              </option>
              {levels.map((level, index) => (
                <option key={index} value={level.label}>
                  {level.label}
                </option>
              ))}
            </select>
          </div>

          <div className="design-intended-button">
            <button id="btn-primary" onClick={handleSaveIntendedLearnersClick}>
              Save Intended Learners
            </button>
          </div>
        </div>
      </Element>

      <Element name="course-structure">
        <div className="design-structure">
          <h2>Course Structure</h2>
          <hr />
          {chapters.map((chapter, chapterIndex) => (
            <Card
              variant="outlined"
              key={chapterIndex}
              style={{ marginBottom: 20 }}
            >
              <CardContent>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                  }}
                >
                  <TextField
                    value={chapter.chapter_name}
                    variant="outlined"
                    size="small"
                    InputProps={{
                      style: { fontSize: '1.3rem', color: '#555' },
                      sx: {
                        height: '40px',
                        borderRadius: '5px',
                        backgroundColor: 'rgba(243, 243, 250, 0.8)',
                        fontSize: '1.6rem',
                        color: '#187bce',
                        outline: 'none',
                        transition: '0.3s all ease',
                        '&:hover .MuiOutlinedInput-notchedOutline': {
                          transition: '0.3s all ease',
                          border: 'none', // Loại bỏ border khi hover
                          boxShadow: '0 0 0 2px #187bce'
                        },
                        '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                          transition: '0.3s all',
                          border: 'none', // Loại bỏ border khi focus
                          boxShadow: '0 0 0 2px #187bce'
                        }
                      },
                      notchedOutline: {
                        border: 'none' // Loại bỏ border mặc định
                      }
                    }}
                    sx={{
                      width: '100%'
                    }}
                    onChange={(e) =>
                      handleChapterTitleChange(chapterIndex, e.target.value)
                    }
                    disabled={!isEditing} // Chỉ chỉnh sửa khi ở chế độ edit
                  />
                  {isEditing && (
                    <IconButton
                      onClick={() => handleDeleteChapter(chapterIndex)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  )}
                </div>
                {chapter.lectures.map((lecture, lectureIndex) => (
                  <div
                    key={lectureIndex}
                    style={{ marginTop: 20, paddingLeft: 20 }}
                  >
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        gap: 40
                      }}
                    >
                      <TextField
                        value={lecture.name}
                        variant="outlined"
                        onChange={(e) =>
                          handleInputChange(
                            chapterIndex,
                            lectureIndex,
                            'name',
                            e.target.value
                          )
                        }
                        style={{ flex: 1 }}
                        InputProps={{
                          style: { fontSize: '1.3rem', color: '#555' },
                          sx: {
                            height: '40px',
                            borderRadius: '5px',
                            backgroundColor: 'rgba(243, 243, 250, 0.8)',
                            fontSize: '1.6rem',
                            color: '#187bce',
                            outline: 'none',
                            transition: '0.3s all ease',
                            '&:hover .MuiOutlinedInput-notchedOutline': {
                              transition: '0.3s all ease',
                              border: 'none', // Loại bỏ border khi hover
                              boxShadow: '0 0 0 2px #187bce'
                            },
                            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                              transition: '0.3s all',
                              border: 'none', // Loại bỏ border khi focus
                              boxShadow: '0 0 0 2px #187bce'
                            }
                          },
                          notchedOutline: {
                            border: 'none' // Loại bỏ border mặc định
                          }
                        }}
                        disabled={!isEditing} // Chỉ chỉnh sửa khi ở chế độ edit
                      />
                      <Select
                        value={lecture.type}
                        size="small"
                        onChange={(e) =>
                          handleInputChange(
                            chapterIndex,
                            lectureIndex,
                            'type',
                            e.target.value
                          )
                        }
                        sx={{
                          height: '40px',
                          borderRadius: '5px',
                          backgroundColor: 'rgba(243, 243, 250, 0.8)',
                          fontSize: '1.3rem',
                          outline: 'none',
                          color: '#555',
                          '.MuiSelect-icon': {
                            color: '#555'
                          },
                          '& .MuiSelect-select': {
                            fontSize: '1.3rem'
                          }
                        }}
                        MenuProps={{
                          disableScrollLock: true
                        }}
                        disabled={!isEditing} // Chỉ chỉnh sửa khi ở chế độ edit
                      >
                        <MenuItem value="file">File</MenuItem>
                        <MenuItem value="video">Video</MenuItem>
                        <MenuItem value="quiz">Quiz</MenuItem>
                        <MenuItem value="assignment">Assignment</MenuItem>
                      </Select>
                      {isEditing && (
                        <IconButton
                          onClick={() =>
                            handleDeleteLecture(chapterIndex, lectureIndex)
                          }
                        >
                          <DeleteIcon />
                        </IconButton>
                      )}
                    </div>
                    <div style={{ marginTop: 20, paddingLeft: 20 }}>
                      <TextField
                        label="Description"
                        variant="outlined"
                        size="small"
                        value={lecture.description}
                        fullWidth
                        InputProps={{
                          style: { fontSize: '1.3rem', color: '#555' },
                          sx: {
                            height: '40px',
                            borderRadius: '5px',
                            backgroundColor: 'rgba(243, 243, 250, 0.8)',
                            fontSize: '1.6rem',
                            color: '#187bce',
                            outline: 'none',
                            transition: '0.3s all ease',
                            '&:hover .MuiOutlinedInput-notchedOutline': {
                              transition: '0.3s all ease',
                              border: 'none', // Loại bỏ border khi hover
                              boxShadow: '0 0 0 2px #187bce'
                            },
                            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                              transition: '0.3s all',
                              border: 'none', // Loại bỏ border khi focus
                              boxShadow: '0 0 0 2px #187bce'
                            }
                          },
                          notchedOutline: {
                            border: 'none' // Loại bỏ border mặc định
                          }
                        }}
                        onChange={(e) =>
                          handleInputChange(
                            chapterIndex,
                            lectureIndex,
                            'description',
                            e.target.value
                          )
                        }
                        disabled={!isEditing} // Chỉ chỉnh sửa khi ở chế độ edit
                      />
                    </div>
                    <div
                      style={{
                        marginTop: 10,
                        paddingLeft: 20,
                        display: 'flex',
                        alignItems: 'center'
                      }}
                    >
                      <label style={{ marginRight: 10, fontSize: '1.3rem' }}>
                        Resource:
                      </label>
                      <input
                        type="file"
                        accept={getFileAccept(lecture.type)} // Ràng buộc định dạng file dựa trên type
                        onChange={(e) =>
                          handleFileChange(chapterIndex, lectureIndex, e)
                        }
                        disabled={!isEditing}
                        style={{ display: 'none' }}
                        id={`resource-input-${chapterIndex}-${lectureIndex}`}
                      />
                      <label
                        htmlFor={`resource-input-${chapterIndex}-${lectureIndex}`}
                      >
                        <Button
                          variant="outlined"
                          component="span"
                          disabled={!isEditing}
                          sx={{
                            fontSize: '1.3rem',
                            textTransform: 'none',
                            fontWeight: 700,
                            fontFamily: 'inter',
                            backgroundColor: 'rgba(243, 243, 250, 0.8)',
                            borderRadius: '5px',
                            '&:hover': {
                              backgroundColor: 'rgba(243, 243, 250, 0.8)',
                              boxShadow: '0 0 0 1px #187bce'
                            }
                          }}
                        >
                          {lecture.source.name ? lecture.source.name : 'Choose File'}
                        </Button>
                      </label>
                    </div>
                  </div>
                ))}
                {isEditing && (
                  <button
                    id="btn-secoundary"
                    style={{ marginTop: 20, fontSize: '1.3rem' }}
                    onClick={() => handleAddLecture(chapterIndex)}
                  >
                    + Add Lecture
                  </button>
                )}
              </CardContent>
            </Card>
          ))}
          {isEditing && (
            <button
              id="btn-secoundary"
              style={{ marginTop: 20, fontSize: '1.3rem' }}
              onClick={handleAddChapter}
            >
              + Add Chapter
            </button>
          )}
          <div className="design-structure-button">
            <button id="btn-third" onClick={() => setIsEditing(!isEditing)}>
              {isEditing ? 'View' : 'Edit'}
            </button>
            <button id="btn-primary" onClick={handleSaveCourseStructureClick}>
              Save Course Structure
            </button>
            {/* <button id="btn-primary" onClick={() => console.log(chapters)}>
              Course Structure
            </button> */}
          </div>
        </div>
      </Element>

      <Element name="introduce-course">
        <div className="design-introduce">
          <h2>Introduce Course</h2>
          <hr />
          <div className="design-introduce-image">
            <h3>Course Image</h3>
            <UploadFile
              uniqueId="introduceImage"
              type="image"
              onFileChange={handleImageChange}
            />
          </div>
          <div className="design-introduce-video">
            <h3>Promotional Video</h3>
            <UploadFile
              uniqueId="introduce-video"
              type="video"
              onFileChange={handleVideoChange}
            />
          </div>
          <div className="design-introduce-button">
            <button id="btn-primary" onClick={handleSave}>
              Save Introduce Course
            </button>
          </div>
        </div>
      </Element>
    </MainDesignCourseWrapper>
  )
}

const MainDesignCourseWrapper = styled.section`
  width: 100%;
  border: 1px solid #ccc;
  width: 100%;
  padding: 20px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: #0000000f 0px 4px 20px 0px;

  h1 {
    font-size: 2.4rem;
    font-weight: 700;
    text-transform: uppercase;
    color: #1971c2;
    margin-bottom: 10px;
    text-align: center;
  }

  h2 {
    font-size: 2rem;
    font-weight: 700;
    color: #1971c2;
    margin-bottom: 10px;
  }

  h3 {
    font-size: 1.6rem;
    font-weight: 700;
    color: #333;
    margin-bottom: 10px;
    margin-top: 20px;
  }

  hr {
    margin-bottom: 10px;
    border: none;
    height: 2px;
    background-color: #1971c2;
  }

  #btn-primary {
    background-color: #1971c2;
    color: #fff;
    border: none;
    padding: 10px 20px;
    border-radius: 5px;
    font-size: 1.6rem;
    font-weight: 700;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 10px;
    border: none;
    transition: 0.3s all ease;
    #btn-main span {
      svg {
        font-size: 2rem;
      }
    }

    &:hover {
      background-color: #fff;
      color: #187bce;
      box-shadow: 0 0 0 2px #1971c2;
    }
  }

  #btn-secoundary {
    background-color: #6c757d;
    color: #fff;
    border: none;
    padding: 10px 20px;
    border-radius: 5px;
    font-size: 1.6rem;
    font-weight: 700;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 10px;
    transition: 0.3s all ease;

    span svg {
      font-size: 1.6rem;
    }

    &:hover {
      background-color: #fff;
      color: #6c757d;
      box-shadow: 0 0 0 2px #6c757d;
    }
  }

  #btn-third {
    background-color: #fff;
    color: #187bce;
    box-shadow: 0 0 0 2px #187bce;
    border: none;
    padding: 5px 20px;
    border-radius: 5px;
    font-size: 1.6rem;
    font-weight: 700;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 10px;
    transition: 0.3s all ease;

    span svg {
      font-size: 1.6rem;
    }

    &:hover {
      background-color: #187bce;
      color: #fff;
    }
  }

  .design-general {
    margin-bottom: 20px;

    .design-general-title {
    }
    .design-general-keyword {
      margin-top: 20px;
      .design-general-keyword-inputs {
        display: flex;
        flex-wrap: wrap;
        gap: 20px;
        .design-general-keyword-input {
          flex: 1 1 calc(33.333% - 20px); /* 3 items per row, accounting for the gap */
          box-sizing: border-box;
          display: flex;
          gap: 10px;
          align-items: center;
          justify-content: space-between;
          a {
            background-color: #fff;
            border: none;
            &:hover {
              border: none !important;
            }
            svg {
              font-size: 3rem;
              color: #868e96;
              transition: 0.3s all ease;

              &:hover {
                color: #e03131;
                scale: 1.1;
              }
            }
          }
        }
        .design-general-keyword-addmore {
          display: flex;
          justify-content: center;
        }
      }
    }

    .design-genral-method {
      margin-top: 20px;
      .design-genral-method-radio {
        margin-left: 20px;
        .MuiAccordion-root {
          margin: 0;
        }

        .MuiAccordionSummary-root {
          margin: 0;
        }

        .css-1i7u1af-MuiPaper-root-MuiAccordion-root.Mui-expanded {
          margin: 0;
        }
      }
      p {
        font-size: 1.6rem;
        margin: 0;
        line-height: 1.6;
      }
    }

    .design-genral-language {
      margin-top: 20px;
      .design-genral-language-select {
        select {
          width: 100%;
          height: 4rem;
          padding: 8px;
          margin: 0 auto;
          font-size: 1.6rem;
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
      }
    }

    .design-genral-price {
      margin-top: 20px;
      .design-genral-price-input {
        display: flex;
        gap: 20px;
        align-items: center;
        margin-bottom: 20px;
        input {
          width: 50%;
          font-size: 1.6rem;
          padding: 10px;
          border: 1px solid #ccc;
          border-radius: 5px;
          outline: none;
        }
        select {
          width: 30%;
          height: 4rem;
          padding: 8px;
          font-size: 1.6rem;
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
      }
      p {
        span {
          color: red;
        }
        font-size: 1.6rem;
        margin: 0;
        line-height: 1.6;
      }
    }

    .design-genral-program {
      margin-top: 20px;
      .design-genral-program-radio {
        margin-left: 20px;
        .MuiAccordion-root {
          margin: 0;
        }

        .MuiAccordionSummary-root {
          margin: 0;
        }

        .css-1i7u1af-MuiPaper-root-MuiAccordion-root.Mui-expanded {
          margin: 0;
        }
      }
      p {
        font-size: 1.6rem;
        margin: 0;
        line-height: 1.6;
      }
    }

    .design-genral-button {
      margin-top: 20px;
      display: flex;
      gap: 10px;
      justify-content: flex-end;
    }
  }

  .design-categories {
    margin-bottom: 20px;
    .design-categories-selects {
      select {
        width: 100%;
        height: 4rem;
        padding: 8px;
        margin: 0 auto;
        font-size: 1.6rem;
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
    }
    .design-categories-button {
      margin-top: 20px;
      display: flex;
      gap: 10px;
      justify-content: flex-end;
    }
  }

  .design-intended {
    margin-bottom: 20px;
    .design-intended-inputs {
      margin: 0 auto;
      width: 90%;
      display: flex;
      flex-direction: column;
      gap: 10px;
      .design-intended-input {
        display: flex;
        gap: 20px;
        align-items: center;
        justify-content: space-between;
        a {
          background-color: #fff;
          border: none;
          &:hover {
            border: none !important;
          }
          svg {
            font-size: 3rem;
            color: #868e96;
            transition: 0.3s all ease;

            &:hover {
              color: #e03131;
              scale: 1.1;
            }
          }
        }
      }
      .design-intended-input-addmore {
        display: flex;
        justify-content: center;
      }
    }
    .design-intended-button {
      margin-top: 20px;
      display: flex;
      gap: 10px;
      justify-content: flex-end;
    }
    .design-intended-selects {
      select {
        width: 90%;
        height: 4rem;
        padding: 8px;
        margin: 0 auto;
        display: flex;
        justify-content: center;
        font-size: 1.6rem;
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
    }
  }

  .design-structure {
    margin-bottom: 20px;

    .design-structure-button {
      margin-top: 20px;
      display: flex;
      gap: 10px;
      justify-content: flex-end;
    }
  }

  .design-introduce {
    margin-bottom: 20px;

    .design-introduce-button {
      margin-top: 20px;
      display: flex;
      gap: 10px;
      justify-content: flex-end;
    }
  }
`

export default MainDesignCourse
