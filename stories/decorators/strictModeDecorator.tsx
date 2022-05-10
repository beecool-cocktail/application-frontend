/* eslint-disable react-hooks/rules-of-hooks */
import React from 'react'
import { DecoratorFn } from '@storybook/react'

const strictModeDecorator: DecoratorFn = story => {
  return <React.StrictMode>{story()}</React.StrictMode>
}

export default strictModeDecorator
