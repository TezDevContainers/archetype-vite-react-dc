import React from 'react'
import { CallResult } from '@completium/archetype-ts-types'

interface CountContextProps {
    increment: () => Promise<CallResult | undefined>
    count: number | undefined
    fetchCount: () => Promise<void>
    incrementInProgress: boolean
    countLoading: boolean
}

const CountContext = React.createContext<CountContextProps>({
    increment: function(): Promise<CallResult | undefined> {
        throw new Error("Function not implemented.")
    },
    count: undefined,
    fetchCount: function(): Promise<void> {
        throw new Error("Function not implemented.")
    },
    incrementInProgress: false,
    countLoading: true
  })

const useCountContext = () => React.useContext(CountContext)


export { CountContext, useCountContext }
export type { CountContextProps }