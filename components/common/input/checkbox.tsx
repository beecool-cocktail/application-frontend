import { Checkbox as BaseCheckbox } from '@mui/material'
import { CheckboxProps } from '@mui/material'
import CheckboxDefaultIcon from 'lib/assets/checkbox/default.svg'
import CheckboxActiveIcon from 'lib/assets/checkbox/active.svg'

const Checkbox = (props: CheckboxProps) => {
  return (
    <BaseCheckbox
      icon={<CheckboxDefaultIcon />}
      checkedIcon={<CheckboxActiveIcon />}
      sx={{
        p: 0,
        '& svg': {
          fontSize: '24px !important'
        }
      }}
      {...props}
    />
  )
}

export default Checkbox
