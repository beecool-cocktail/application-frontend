import { DecoratorFn } from '@storybook/react'
import SWRConfigWrapper from 'components/app/SWRConfigWrapper'

const SWRConfigDecorator: DecoratorFn = story => (
  <SWRConfigWrapper provider={() => new Map()}>{story()}</SWRConfigWrapper>
)

export default SWRConfigDecorator
