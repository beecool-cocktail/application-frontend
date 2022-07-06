import {
  Box,
  Stack,
  Typography,
  Paper,
  FormGroup,
  FormControlLabel
} from '@mui/material'
import IngredientListIcon from 'lib/assets/list.svg'
import Checkbox from './checkbox'
import type { Ingredient } from 'lib/domain/cocktail'

interface IngredientListProps {
  ingredients: Ingredient[]
}

const IngredientList = ({ ingredients }: IngredientListProps) => {
  return (
    <Box mt="24px">
      <Stack direction="row" sx={{ px: '12px', py: '4px' }}>
        <Box sx={{ fontSize: 24 }}>
          <IngredientListIcon />
        </Box>
        <Typography
          variant="body1"
          sx={{
            ml: '12px',
            color: theme => theme.palette.light1.main,
            display: 'flex',
            alignItems: 'center'
          }}
        >
          備料清單
        </Typography>
        <Typography
          variant="body3"
          sx={{
            ml: '8px',
            color: theme => theme.palette.light1.main,
            display: 'flex',
            alignItems: 'center',
            fontWeight: 'bold'
          }}
        >
          Ingredients
        </Typography>
      </Stack>
      <Paper
        sx={{
          borderRadius: 4,
          mt: '12px',
          backgroundColor: theme => theme.palette.dark5.main
        }}
      >
        <FormGroup>
          <Stack p="12px" spacing="24px">
            {ingredients.map((ingredient, index) => (
              <FormControlLabel
                key={index}
                control={<Checkbox />}
                sx={{
                  margin: 0,
                  '.MuiFormControlLabel-label': { flex: 1 }
                }}
                label={
                  <Stack
                    direction="row"
                    justifyContent="space-between"
                    ml="12px"
                  >
                    <Typography
                      variant="body2"
                      sx={{ color: theme => theme.palette.light2.main }}
                    >
                      {ingredient.name}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{ color: theme => theme.palette.light2.main }}
                    >
                      {ingredient.amount}
                    </Typography>
                  </Stack>
                }
              />
            ))}
          </Stack>
        </FormGroup>
      </Paper>
    </Box>
  )
}

export default IngredientList
