import { useNavigate } from "react-router-dom"

const useNavigation = () => {
  const navigate = useNavigate()

  const goTo = (path) => {
    navigate(path)
  }

  return { goTo }
}

export default useNavigation