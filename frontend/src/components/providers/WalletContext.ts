import { createContext, useContext } from "react"
import { AccountInfo } from "@airgap/beacon-types"
import { TezosToolkit } from "@taquito/taquito"
import { BeaconWallet } from "@taquito/beacon-wallet"

interface WalletContextProps {
    connect: () => Promise<void>
    disconnect: () => Promise<void>
    getBalance: () => Promise<void>
    account?: AccountInfo
    wallet?: BeaconWallet
    Tezos?: TezosToolkit
    balance: number
  }
  
  const WalletContext = createContext<WalletContextProps>({
    connect: async () => {},
    disconnect: async () => {},
    getBalance: async () => {},
    balance: 0,
  })
  
  const useWalletContext = () => useContext(WalletContext)
  
  export {useWalletContext, WalletContext}

  export type {WalletContextProps}