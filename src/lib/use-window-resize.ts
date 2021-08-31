import { useCallback, useEffect } from 'react'
import { debounce } from 'lodash-es'
import useEventListener from '@use-it/event-listener'

const useWindowResize = (onResize: () => void, debounceValue = 100): void => {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handleResize = useCallback(
    debounce(() => {
      onResize()
    }, debounceValue),
    [onResize, debounceValue]
  )

  useEffect(() => {
    handleResize()
  }, [handleResize])

  useEventListener('resize', handleResize)
}

export default useWindowResize
