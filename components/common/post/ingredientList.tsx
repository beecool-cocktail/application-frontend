import { Box, Stack, Typography, Paper, FormGroup } from '@mui/material'
import IngredientListIcon from 'lib/assets/listOutlined.svg'
import IngredientItem from './ingredientItem'
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
              <IngredientItem key={index} ingredient={ingredient} />
            ))}
          </Stack>
        </FormGroup>
      </Paper>
    </Box>
  )
}

export default IngredientList
