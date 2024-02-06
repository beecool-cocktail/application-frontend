import { Box } from '@mui/material'
import { COCKTAIL_CARD_SMALL_RATIO } from 'lib/application/constants/layout'

const CardGridContainer = (props: { children: React.ReactNode }) => (
  <Box
    display="flex"
    flexDirection="row"
    flexWrap="wrap"
    gap="8px"
    sx={{ p: '8px', color: theme => theme.palette.dark3.main }}
  >
    {props.children}
  </Box>
)

const CardGridContainerItem = (props: { children: React.ReactNode }) => (
  <Box
    sx={{ aspectRatio: COCKTAIL_CARD_SMALL_RATIO, flex: '0 0 calc(50% - 4px)' }}
  >
    {props.children}
  </Box>
)

CardGridContainer.Item = CardGridContainerItem

export default CardGridContainer
