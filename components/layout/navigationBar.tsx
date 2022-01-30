import { Box, BottomNavigation, BottomNavigationAction } from '@mui/material'
import routes from '../../configs/routes'

export interface NavigationBarProps {
  value: string
  onChange(value: string): void
}

export const NavigationBar = ({ value, onChange }: NavigationBarProps) => {
  return (
    <Box position="fixed" bottom={0} left={0} width={1}>
      <BottomNavigation
        value={value}
        onChange={(_event, value) => onChange(value)}
      >
        {routes
          .filter(r => r.inNavigationBar)
          .map(route => (
            <BottomNavigationAction
              key={route.path}
              label={route.label}
              value={route.path}
              icon={route.icon}
              onClick={() => onChange(route.path)}
            />
          ))}
      </BottomNavigation>
    </Box>
  )
}

export default NavigationBar