/* eslint-disable react-hooks/rules-of-hooks */
import { DecoratorFn } from '@storybook/react'
import useStore from 'lib/services/storeAdapter'
import useOnce from 'lib/hooks/useOnce'

const storeDecorator: DecoratorFn = story => {
  const toInitialState = useStore(state => state.toInitialState)
  useOnce(toInitialState)
  return story()
}

export default storeDecorator
