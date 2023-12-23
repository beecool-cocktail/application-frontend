/* eslint-disable react-hooks/rules-of-hooks */
import { DecoratorFn } from '@storybook/react'
import useToken from 'lib/application/useToken'
import useOnce from 'lib/hooks/useOnce'

const loggedInDecorator: DecoratorFn = story => {
  const tokenService = useToken()
  useOnce(() => tokenService.setToken('mock login token'))
  return story()
}

export default loggedInDecorator
