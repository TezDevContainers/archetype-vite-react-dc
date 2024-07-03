
import React, {useEffect, useState, useCallback, useMemo } from 'react'
import { run_listener } from "@completium/event-listener"
import { useWalletContext } from './WalletContext'
import { Count } from '../../../contract-bindings/count'
import { CountContext } from './CountContext'

  const CountProvider = ({ children }: { children: React.ReactNode }) => {
    
    const { Tezos, account } = useWalletContext()
    const [countContract, setCountContract] = useState<Count>()
    const [count, setCount] = useState<number | undefined>()
    const [incrementInProgress, setIncrementInProgress] = useState<boolean>(false)
    const [countLoading, setCountLoading] = useState<boolean>(false)
    
    const fetchCount = useCallback(
      async () => {
        if (!countContract || !account || !account.address) {
          return
        }
        setCountLoading(true)
        try {
          const fetchedCountValue = await countContract.get_count()
          setCount(fetchedCountValue.to_number())
          console.log("fetched Count Value: ", fetchedCountValue)
      } catch (e) {
          console.error(e)
        } finally {
          setCountLoading(false)
        }
      return
      },
      [countContract, account]
    ) 


    useEffect(() => {
      if (!countContract) { return }
      console.log("starting listener")
      const startListener = async () => {
        countContract.register_incremented(async (t) => {
          console.log("incremented event registered!")
          setCount(t.newcount.to_number())          
          setIncrementInProgress(false)
      })
      await run_listener({
        endpoint: import.meta.env.VITE_TEZOS_RPC,
        // endpoint: endpoint,
        verbose: false,
        horizon: 0
      })
    }
      startListener()},[countContract]
    )
        
    useEffect(() => {
      console.log("Count Contract: ", countContract)
    }, [countContract])

    //This useEffect checks that we have access to a Tezos network. If so,
    //we connect to that network with the contract address in the .env file
    useEffect(() => {
        if (!Tezos) {
            return
        }
        console.log("initialising Count contract")
        setCountContract(new Count(import.meta.env.VITE_CONTRACT_ADDRESS))
        }, [Tezos])

    //This use effect checks we have access to a count contract. If so,
    //the count variable is fetched and made available to the count context
    useEffect(() => {
        if (!countContract) {
            return
        }
            fetchCount()
        }, [countContract, fetchCount])


        const increment = useCallback(
            async () => {
              if (!countContract || !account || !account.address) {
                return
              }
              setIncrementInProgress(true)
              fetchCount()
              try {
                return await countContract.increment({})
              } catch (error) {
                console.error(error)
                setIncrementInProgress(false)
              }
            },
            [countContract, account, fetchCount]
          )

        const value = useMemo(
            () => ({
                increment,
                count,
                fetchCount,
                incrementInProgress,
                countLoading
            }),
            [
                increment,
                count,
                fetchCount,
                incrementInProgress,
                countLoading
            ]
          )
          
          return (
            <CountContext.Provider value={value}>
              {children}
            </CountContext.Provider>
          )
}
export { CountProvider }

