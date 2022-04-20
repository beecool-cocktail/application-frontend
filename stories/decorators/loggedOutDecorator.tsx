/* eslint-disable react-hooks/rules-of-hooks */
import { DecoratorFn } from '@storybook/react'
import useOnce from 'lib/hooks/useOnce'
import useLocalStorage from 'lib/services/localStorageAdapter'

const loggedOutDecorator: DecoratorFn = story => {
  const storage = useLocalStorage()
  useOnce(() => storage.removeToken())
  return story()
}

export default loggedOutDecorator
