/* eslint-disable react-hooks/rules-of-hooks */
import { DecoratorFn } from '@storybook/react'
import useOnce from 'lib/hooks/useOnce'
import useTokenStore from 'lib/services/useTokenStore'

const loggedOutDecorator: DecoratorFn = story => {
  const tokenService = useTokenStore()
  useOnce(() => tokenService.removeToken())
  return story()
}

export default loggedOutDecorator
