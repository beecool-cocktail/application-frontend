import React, { useRef, useState } from 'react'
import {
  FormControl,
  InputBase,
  Stack,
  Typography,
  useFormControl
} from '@mui/material'
import { InputBaseProps } from '@mui/material'

interface InputProps extends InputBaseProps {
  label?: string
  feedback?: string
  maxLength?: number
  getLetterCount?: (target: string) => number
}

interface optionalControlProps {
  defaultValue?: InputBaseProps['defaultValue']
  valueFromProps?: InputBaseProps['value']
  onChangeFromProps: InputBaseProps['onChange']
}

const useOptionalControl = ({
  defaultValue,
  valueFromProps,
  onChangeFromProps
}: optionalControlProps) => {
  const { current: isControlled } = useRef(valueFromProps != null)
  const { current: hasDefaultValue } = useRef(defaultValue != null)
  const [internalValue, setInternalValue] = useState(
    hasDefaultValue ? defaultValue : ''
  )
  const value = String(isControlled ? valueFromProps : internalValue)

  const handleChange = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    if (onChangeFromProps) onChangeFromProps(e)
    if (!isControlled) setInternalValue(e.target.value)
  }

  return {
    value,
    isControlled,
    hasDefaultValue,
    handleChange
  }
}

const RawInput = (props: InputProps) => {
  const {
    value: valueFromProps,
    onChange: onChangeFromProps,
    defaultValue,
    label,
    feedback,
    placeholder,
    maxLength,
    multiline,
    getLetterCount = target => target.length
  } = props
  const formControl = useFormControl()
  const { value, handleChange } = useOptionalControl({
    defaultValue,
    valueFromProps,
    onChangeFromProps
  })

  const getPlaceholder = () => {
    if (formControl && formControl.focused) return ''
    return placeholder
  }

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    if (props.onBlur) props.onBlur(e)
    e.target.value.replace(/  +/g, ' ')
  }

  const letterCount = getLetterCount(value)

  return (
    <Stack alignItems="flex-start" spacing="4px" sx={{ position: 'relative' }}>
      {label && (
        <Typography
          variant="body2"
          sx={{ pl: '6px', color: theme => theme.palette.light1.main }}
        >
          {label}
        </Typography>
      )}
      <InputBase
        {...props}
        sx={{
          display: 'flex',
          alignItems: 'flex-start',
          minHeight: multiline ? '186px' : '50px',
          p: () => {
            if (!multiline) return '10px 11px'
            return '16px 20px'
          },
          columnGap: '4px',
          borderRadius: '8px',
          border: theme =>
            `2px solid ${
              formControl?.error ? theme.palette.red.main : 'transparent'
            }`,
          color: theme => {
            if (formControl && (formControl.focused || formControl.error))
              return theme.palette.light1.main
            return theme.palette.light2.main
          },
          backgroundColor: theme => {
            if (formControl && (formControl.focused || formControl.error))
              return theme.palette.dark6.main
            return theme.palette.dark5.main
          },
          fontSize: theme => theme.typography.body1.fontSize,
          fontWeight: theme => theme.typography.body1.fontWeight,
          lineHeight: theme => theme.typography.body1.lineHeight,
          '&::placeholder': {
            color: theme => theme.palette.light4.main
          },
          '& svg': {
            p: 0,
            fontSize: '24px'
          },
          '& svg *': {
            stroke: theme => {
              const { light1, light2, light4 } = theme.palette
              if (formControl && formControl.focused) return light1.main
              if (formControl && formControl.filled) return light2.main
              return light4.main
            }
          },
          '& .MuiInputBase-input': {
            p: 0,
            display: 'flex',
            alignItems: 'center'
          },
          ...props.sx
        }}
        inputProps={{ ...props.inputProps, maxLength }}
        placeholder={getPlaceholder()}
        onChange={handleChange}
        onBlur={handleBlur}
      />
      {feedback && (
        <Typography
          variant="body2"
          sx={{ pl: '6px', color: theme => theme.palette.light4.main }}
        >
          {feedback}
        </Typography>
      )}
      {maxLength && (
        <Typography
          variant="body4"
          sx={{
            pl: '6px',
            color: theme => theme.palette.light4.main,
            position: () => {
              if (multiline) return 'absolute'
            },
            right: () => {
              if (multiline) return '12px'
            },
            bottom: () => {
              if (multiline) return '8px'
            }
          }}
        >
          {`${letterCount}/${maxLength}`}
        </Typography>
      )}
    </Stack>
  )
}

const Input = (props: InputProps) => {
  return (
    <FormControl fullWidth={props.fullWidth} error={props.error}>
      <RawInput {...props} />
    </FormControl>
  )
}

export default Input
