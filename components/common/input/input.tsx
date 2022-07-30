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
  getLetterCount: (target: string) => number
  maxLength?: number
}

const useOptionalControl = ({
  defaultValue,
  valueFromProps,
  onChangeFromProps,
  getLetterCount,
  maxLength
}: optionalControlProps) => {
  const { current: isControlled } = useRef(valueFromProps != null)
  const { current: hasDefaultValue } = useRef(defaultValue != null)
  const [internalValue, setInternalValue] = useState(
    hasDefaultValue ? defaultValue : ''
  )
  const value = String(isControlled ? valueFromProps : internalValue)
  const letterCount = getLetterCount(value)

  const handleChange = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    const letterCount = getLetterCount(e.target.value)
    if (maxLength && letterCount > maxLength) return
    if (onChangeFromProps) onChangeFromProps(e)
    if (!isControlled) setInternalValue(e.target.value)
  }

  return {
    value,
    letterCount,
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
    getLetterCount = target => target.length,
    ...restProps
  } = props
  const formControl = useFormControl()
  const { value, letterCount, handleChange } = useOptionalControl({
    defaultValue,
    valueFromProps,
    onChangeFromProps,
    getLetterCount,
    maxLength
  })

  const getPlaceholder = () => {
    if (formControl && formControl.focused) return ''
    return placeholder
  }

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    if (props.onBlur) props.onBlur(e)
    e.target.value.replace(/  +/g, ' ')
  }

  const renderLetterCount = () => (
    <Typography
      variant="body4"
      sx={{
        ml: 'auto',
        color: theme => theme.palette.light4.main
      }}
    >
      {`${letterCount}/${maxLength}`}
    </Typography>
  )

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
      <Stack
        sx={{
          justifyContent: 'space-between',
          gap: '4px',
          width: 1,
          minHeight: multiline ? '186px' : '50px',
          bgcolor: theme => {
            if (formControl && (formControl.focused || formControl.error))
              return theme.palette.dark6.main
            return theme.palette.dark5.main
          },
          borderRadius: '8px',
          border: theme =>
            `2px solid ${
              formControl?.error ? theme.palette.red.main : 'transparent'
            }`,
          p: () => {
            if (!multiline) return '11px 10px'
            return '6px 10px'
          }
        }}
      >
        <InputBase
          {...restProps}
          sx={{
            display: 'flex',
            alignItems: 'flex-start',
            minHeight: '0',
            columnGap: '4px',
            p: 0,
            lineHeight: 0,
            color: theme => {
              if (formControl && (formControl.focused || formControl.error))
                return theme.palette.light1.main
              return theme.palette.light2.main
            },

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
              flex: 1,
              width: 'auto',
              height: 'auto',
              p: 0,
              pt: multiline ? '8px' : 0,
              fontSize: theme => theme.typography.body1.fontSize,
              fontWeight: theme => theme.typography.body1.fontWeight,
              lineHeight: theme => theme.typography.body1.lineHeight
            },
            ...restProps.sx
          }}
          value={value}
          inputProps={props.inputProps}
          multiline={multiline}
          placeholder={getPlaceholder()}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        {maxLength && multiline && renderLetterCount()}
      </Stack>
      <Stack
        direction="row"
        alignItems="flex-start"
        justifyContent="space-between"
        width={1}
        pl="6px"
        pr="12px"
      >
        {feedback && (
          <Typography
            variant="body2"
            sx={{ color: theme => theme.palette.light4.main }}
          >
            {feedback}
          </Typography>
        )}
        {maxLength && !multiline && renderLetterCount()}
      </Stack>
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
