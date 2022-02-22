import React from 'react'
import { TextField } from '@mui/material'
import { Box } from '@mui/system'

interface CounterTextFieldProps {
  name: string
  value: string
  onChange(): void
  onBlur(): void
}

const CounterTextField = ({
  name,
  value,
  onChange,
  onBlur
}: CounterTextFieldProps) => {
  return (
    <Box>
      <TextField
        name={name}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
      />
    </Box>
  )
}

export default CounterTextField
