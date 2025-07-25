import BigNumber from 'bignumber.js'
import { getBnnfAddress } from 'utils/addressHelpers'
import useTokenBalance from './useTokenBalance'

/**
 * A hook to check if a wallet's CAKE balance is at least the amount passed in
 */
const useHasCakeBalance = (minimumBalance: BigNumber) => {
  const { balance: cakeBalance } = useTokenBalance(getBnnfAddress())
  return cakeBalance.gte(minimumBalance)
}

export default useHasCakeBalance









