import { useState } from 'react'

const useIMEHandler = ({
  valueExcludeIME,
  onChange,
  onCompositionStart,
  onCompositionEnd
}: {
  valueExcludeIME: string
  onChange?: React.ChangeEventHandler<HTMLInputElement>
  onCompositionStart?: React.CompositionEventHandler<HTMLInputElement>
  onCompositionEnd?: React.CompositionEventHandler<HTMLInputElement>
}) => {
  const [isComposing, setIsComposing] = useState(false)
  const [composingValue, setComposingValue] = useState('')

  const valueIncludeIME = isComposing ? composingValue : valueExcludeIME

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = e => {
    if (isComposing) setComposingValue(e.target.value)
    onChange?.(e)
  }

  const handleCompositionStart: React.CompositionEventHandler<
    HTMLInputElement
  > = e => {
    setIsComposing(true)
    setComposingValue(valueExcludeIME)
    onCompositionStart?.(e)
  }

  const handleCompositionEnd: React.CompositionEventHandler<
    HTMLInputElement
  > = e => {
    setIsComposing(false)
    onCompositionEnd?.(e)
  }

  return {
    isComposing,
    composingValue,
    valueIncludeIME,
    valueExcludeIME,
    handleChange,
    handleCompositionStart,
    handleCompositionEnd
  }
}

export default useIMEHandler
