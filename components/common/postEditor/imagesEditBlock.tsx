import { Control, Controller } from 'react-hook-form'
import { Stack, Typography } from '@mui/material'
import { CocktailPostForm } from 'lib/application/types/cocktail'
import { CropResult } from 'lib/domain/photo'
import ImageSelector, { ImageSelectorProps } from './imageSelector'

export interface PostTutorialProps {
  control: Control<CocktailPostForm>
  onImageToCover(index: number): void
  onImageUpload(index: number, urls: string[]): void
  onImageEdit(index: number, cropResult: CropResult): void
  onImageDelete(index: number): void
}

const ImagesEditBlock = ({
  control,
  onImageToCover,
  onImageUpload,
  onImageEdit,
  onImageDelete
}: PostTutorialProps) => {
  return (
    <Stack width={1} spacing={1}>
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Typography
          variant="body1"
          sx={{ color: theme => theme.palette.light1.main }}
        >
          調酒照片
        </Typography>
        <Typography
          variant="body4"
          sx={{ color: theme => theme.palette.light4.main }}
        >
          拖曳照片可變換順序
        </Typography>
      </Stack>
      <Controller
        control={control}
        name="photos"
        render={({ field }) => {
          const toImageSelectorProps = (index: number): ImageSelectorProps => {
            return {
              index,
              photo: field.value[index],
              onDelete: () => onImageDelete(index),
              onToCover: () => onImageToCover(index),
              onUpload: (urls: string[]) => onImageUpload(index, urls),
              onEdit: (cropResult: CropResult) => onImageEdit(index, cropResult)
            }
          }

          return (
            <Stack spacing={1} component="label">
              <ImageSelector isCover {...toImageSelectorProps(0)} />
              <Stack width={1} spacing={1}>
                <Stack width={1} direction="row" spacing={1}>
                  <ImageSelector {...toImageSelectorProps(1)} />
                  <ImageSelector {...toImageSelectorProps(2)} />
                </Stack>
                <Stack width={1} direction="row" spacing={1}>
                  <ImageSelector {...toImageSelectorProps(3)} />
                  <ImageSelector {...toImageSelectorProps(4)} />
                </Stack>
              </Stack>
            </Stack>
          )
        }}
      />
    </Stack>
  )
}

export default ImagesEditBlock
