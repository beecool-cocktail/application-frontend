/* eslint-disable react-hooks/rules-of-hooks */
import { DecoratorFn } from '@storybook/react'
import useOnce from 'lib/utils/hooks/useOnce'
import useTokenStore from 'lib/application/hooks/auth/useTokenStore'

const loggedOutDecorator: DecoratorFn = story => {
  const tokenService = useTokenStore()
  useOnce(() => tokenService.removeToken())
  return story()
}

export default loggedOutDecorator
