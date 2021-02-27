import { useCallback, useEffect, useRef } from 'react'

const useIsMounted = () => {
  const isMounted = useRef(false)
  useEffect(() => {
    isMounted.current = true
    return function cleanup() {
      isMounted.current = false
    }
  }, [])
  const checker = useCallback(() => {
    return isMounted.current
  }, [])
  return checker
}

export default useIsMounted