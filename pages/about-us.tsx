import Image from 'next/image'
import { Box, Stack, Typography, TypographyProps } from '@mui/material'
import TopNavigation from 'components/layout/topNavigation'
import BackButton from 'components/common/button/backButton'
import GmailIcon from 'lib/assets/google-gmail.svg'
import useCornerRouter from 'lib/application/useCornerRouter'
import { pathname } from 'lib/configs/routes'

const StyledTypography = (props: TypographyProps) => {
  return (
    <Typography
      variant="body2"
      sx={{ color: theme => theme.palette.light1.main }}
      {...props}
    >
      {props.children}
    </Typography>
  )
}

const AboutUs = () => {
  const router = useCornerRouter()
  const mailTo = 'marc.jr2021@gmall.com'
  const mailToHref = `mailto:${mailTo}`

  return (
    <Stack sx={{ minHeight: 1 }}>
      <TopNavigation
        position="static"
        title="關於我們"
        leftSlot={() => (
          <BackButton onClick={() => router.push(pathname.settings)} />
        )}
      />
      <Stack alignItems="stretch" px="24px" py="16px">
        <StyledTypography>哈囉！</StyledTypography>
        <StyledTypography mt={2}>
          此網站由 Marc jr.
          精心製作，名稱取自於團隊成員英文名字的縮寫，我們是一個由 6
          人組成的專案團隊。
        </StyledTypography>
        <StyledTypography mt={2}>
          致力於打造一個專屬於調酒的交流空間，在我們的調酒平台上，你可以找到各式多元的酒譜或是將自己的獨創特調分享出去！
        </StyledTypography>
        <StyledTypography mt={5}>
          如果想支持 Marc jr.，可以
          <Typography
            component="span"
            variant="body2"
            sx={{
              color: theme => theme.palette.primary.lighter,
              cursor: 'pointer'
            }}
            onClick={() => {
              window.open('https://www.buymeacoffee.com/whispering', '_blank')
            }}
          >
            {' '}
            買一杯調酒{' '}
          </Typography>
          給我們表達心意，我們也將盡力研發更多帥帥的功能～ <br />
          一起為 Marc jr. 獻出心臟吧！
        </StyledTypography>
        <StyledTypography mt={2}>最後獻給各位</StyledTypography>
        <StyledTypography mt="4px">
          不論你是酒鬼、酒仙、醉漢、小酌之人，希望在這裡都可以找到一杯最喜歡的調酒！
        </StyledTypography>
        <Stack position="relative" mt={3}>
          <Box position="absolute" top={0} left={0} width={1} pl="44px">
            <Image
              src="/shiba-inu.png"
              alt="Shiba Inu"
              layout="responsive"
              width={283}
              height={183}
            />
          </Box>
          <Stack alignItems="stretch" rowGap={1} mt="155px">
            <StyledTypography>聯絡我們</StyledTypography>
            <Box component="a" sx={{ fontSize: '32px' }} href={mailToHref}>
              <GmailIcon />
            </Box>
            <StyledTypography>Marc jr. 歡迎你的回饋與建議！</StyledTypography>
          </Stack>
        </Stack>
      </Stack>
    </Stack>
  )
}

export default AboutUs
