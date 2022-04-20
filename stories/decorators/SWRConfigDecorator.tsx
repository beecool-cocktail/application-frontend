import { DecoratorFn } from '@storybook/react'
import SWRConfigWrapper from 'components/app/swrConfigWrapper'

const SWRConfigDecorator: DecoratorFn = story => (
  <SWRConfigWrapper>{story()}</SWRConfigWrapper>
)

export default SWRConfigDecorator
