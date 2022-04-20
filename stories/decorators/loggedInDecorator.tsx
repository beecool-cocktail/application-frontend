/* eslint-disable react-hooks/rules-of-hooks */
import { DecoratorFn } from '@storybook/react'
import useOnce from 'lib/hooks/useOnce'
import useLocalStorage from 'lib/services/localStorageAdapter'

const loggedInDecorator: DecoratorFn = story => {
  const storage = useLocalStorage()
  useOnce(() => storage.setToken('mock login token'))
  return story()
}

export default loggedInDecorator
