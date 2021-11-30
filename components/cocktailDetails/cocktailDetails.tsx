import { StackedLineChart } from '@mui/icons-material'
import {
  Divider,
  Stack,
  Typography,
  Paper,
  FormGroup,
  FormControlLabel,
  Checkbox
} from '@mui/material'
import { grey } from '@mui/material/colors'
import { Box } from '@mui/system'
import Image from 'next/image'
import { Cocktail } from '../../types/cocktail'
import CocktailDetailsHeader from './cocktailDetailsHeader'

export type CocktailDetailsProps = {
  cocktail: Cocktail
}

const CocktailDetails = ({ cocktail }: CocktailDetailsProps) => {
  return (
    <Stack>
      <Image
        src={cocktail.imageUrl}
        alt={cocktail.name}
        width="100%"
        height={250}
      />
      <Stack p={2}>
        <CocktailDetailsHeader cocktail={cocktail} />
        <Box py={2}>
          <Typography>
            Aut modi molestiae qui neque. Nobis dolores voluptatem aut
            asperiores. Ducimus excepturi ratione qui illo a illum. Porro ex
            sequi excepturi rerum placeat quo. Qui harum quis sed dicta.
          </Typography>
        </Box>
        <Divider variant="middle" />
        <Box py={2}>
          <Typography variant="h6">備料清單：</Typography>
          <Paper sx={{ borderRadius: 4, bgcolor: grey[300], mt: 2 }}>
            <Box p={2}>
              <FormGroup>
                <FormControlLabel control={<Checkbox />} label="1. 材料" />
                <FormControlLabel control={<Checkbox />} label="2. 材料" />
                <FormControlLabel control={<Checkbox />} label="3. 材料" />
                <FormControlLabel control={<Checkbox />} label="4. 材料" />
              </FormGroup>
            </Box>
          </Paper>
        </Box>
        <Box py={2}>
          <Typography variant="h6">製作過程：</Typography>
          <Paper sx={{ borderRadius: 4, bgcolor: grey[300], mt: 2 }}>
            <Box p={2}>
              <Typography variant="subtitle1">步驟ㄧ</Typography>
              <Typography>
                Cut your lime ready for squeezing and garnish
              </Typography>
              <Typography variant="subtitle1">步驟二</Typography>
              <Typography>Fill your highball glass with cubed ice</Typography>
              <Typography variant="subtitle1">步驟三</Typography>
              <Typography>Pour in the gin and lime juice</Typography>
              <Typography variant="subtitle1">步驟四</Typography>
              <Typography>Top up with soda water</Typography>
            </Box>
          </Paper>
        </Box>
      </Stack>
    </Stack>
  )
}

export default CocktailDetails
