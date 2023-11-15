import { Control, Controller } from 'react-hook-form'
import { CocktailPostForm } from 'lib/domain/cocktail'
import { getCharacterCount, mergeSpaces } from 'lib/helper/string'
import Input from '../input/input'

interface DescriptionInputProps {
  control: Control<CocktailPostForm>
}

const DescriptionInput = ({ control }: DescriptionInputProps) => {
  return (
    <Controller
      control={control}
      name="description"
      render={({ field }) => (
        <Input
          placeholder="寫下這則調酒的故事吧！"
          label="介紹調酒"
          multiline
          rows={5}
          maxLength={500}
          getLetterCount={getCharacterCount}
          {...field}
          onBlur={() => {
            field.onChange(mergeSpaces(field.value))
            field.onBlur()
          }}
        />
      )}
    />
  )
}

export default DescriptionInput
