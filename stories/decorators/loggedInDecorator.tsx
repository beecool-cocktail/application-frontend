/* eslint-disable react-hooks/rules-of-hooks */
import { DecoratorFn } from '@storybook/react'
import useOnce from 'lib/hooks/useOnce'
import useTokenStore from 'lib/application/auth/useTokenStore'

const loggedInDecorator: DecoratorFn = story => {
  const tokenService = useTokenStore()
  useOnce(() => tokenService.setToken('mock login token'))
  return story()
}

export default loggedInDecorator
