/* eslint-disable react-hooks/rules-of-hooks */
import { DecoratorFn } from '@storybook/react'
// import useLoginAction from 'lib/application/ui/useLoginAction'
// import useOnce from 'lib/hooks/useOnce'

const storeDecorator: DecoratorFn = story => {
  // const toInitialState = useLoginAction()
  // useOnce(toInitialState)
  return story()
}

export default storeDecorator
