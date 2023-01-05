import { useRef, useState } from 'preact/hooks'

export function useRefState<Type>(initialValue: Type) {
  const ref = useRef<Type>(initialValue)
  const [, setUpdated] = useState(0)
  const set = (value: Type) => {
    ref.current = value
    setUpdated(Date.now())
  }
  return [ref, set] as const
}

export function usePrimitiveRefState<Type>(initialValue: Type) {
  const [ref, set] = useRefState(initialValue)
  const primitiveSet = (value: Type) => {
    if (ref.current !== value) set(value)
  }
  return [ref, primitiveSet] as const
}
