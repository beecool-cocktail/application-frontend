/* eslint-disable react-hooks/rules-of-hooks */
import { DecoratorFn } from '@storybook/react'
import useToken from 'lib/application/useToken'
import useOnce from 'lib/hooks/useOnce'

const loggedOutDecorator: DecoratorFn = story => {
  const tokenService = useToken()
  useOnce(() => tokenService.removeToken())
  return story()
}

export default loggedOutDecorator
