import { DependencyList, useMemo } from 'react'
import { useDispatch } from 'react-redux'
import { bindActionCreators } from 'redux'

export function useAction<T>(action: T, dependencies?: DependencyList[]) {
  const dispatch = useDispatch()
  return useMemo(
    () => bindActionCreators(action as {}, dispatch) as T,
    // eslint-disable-next-line react-hooks/exhaustive-deps
    dependencies ? [dispatch, ...dependencies] : [dispatch],
  )
}
