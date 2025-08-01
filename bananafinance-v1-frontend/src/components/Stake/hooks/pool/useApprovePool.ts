import { useCallback, useEffect, useState } from 'react'
import { useWeb3React } from '@web3-react/core'
import { ethers, Contract } from 'ethers'
import BigNumber from 'bignumber.js'
import { useAppDispatch } from 'state'
import { updateUserAllowance } from 'state/actions'
import { useCake, useSousChef, useCakeVaultContract } from 'hooks/useContract'
import useLastUpdated from 'hooks/useLastUpdated'

export const useApprovePool = (lpContract: Contract, sousId, earningTokenSymbol) => {
  const [requestedApproval, setRequestedApproval] = useState(false)
  const dispatch = useAppDispatch()
  const { account } = useWeb3React()
  const sousChefContract = useSousChef(sousId)

  const handleApprove = useCallback(async () => {
    try {
      setRequestedApproval(true)
      const tx = await lpContract.approve(sousChefContract.address, ethers.constants.MaxUint256)
      const receipt = await tx.wait()

      dispatch(updateUserAllowance(sousId, account))
      if (receipt.status) {
        console.log('You can now stake in the %symbol% pool!', { symbol: earningTokenSymbol })
        // toastSuccess(
        //   t('Contract Enabled'),
        //   t('You can now stake in the %symbol% pool!', { symbol: earningTokenSymbol }),
        // )
        setRequestedApproval(false)
      } else {
        // user rejected tx or didn't go thru
        console.log('Please try again. Confirm the transaction and make sure you are paying enough gas!')
        // toastError(t('Error'), t('Please try again. Confirm the transaction and make sure you are paying enough gas!'))
        setRequestedApproval(false)
      }
    } catch (e) {
      console.error(e)
      // toastError(t('Error'), t('Please try again. Confirm the transaction and make sure you are paying enough gas!'))
      console.log('Please try again. Confirm the transaction and make sure you are paying enough gas!')
      setRequestedApproval(false)
    }
  }, [account, dispatch, lpContract, sousChefContract, sousId, earningTokenSymbol])

  return { handleApprove, requestedApproval }
}

// Approve CAKE auto pool
export const useVaultApprove = (setLastUpdated: () => void) => {
  const [requestedApproval, setRequestedApproval] = useState(false)
  const cakeVaultContract = useCakeVaultContract()
  const cakeContract = useCake()

  const handleApprove = async () => {
    const tx = await cakeContract.approve(cakeVaultContract.address, ethers.constants.MaxUint256)
    setRequestedApproval(true)
    const receipt = await tx.wait()
    if (receipt.status) {
      console.log('You can now stake in the %symbol% vault!', { symbol: 'CAKE' })
      setLastUpdated()
      setRequestedApproval(false)
    } else {
      console.log('Please try again. Confirm the transaction and make sure you are paying enough gas!')
      setRequestedApproval(false)
    }
  }

  return { handleApprove, requestedApproval }
}

export const useCheckVaultApprovalStatus = () => {
  const [isVaultApproved, setIsVaultApproved] = useState(false)
  const { account } = useWeb3React()
  const cakeContract = useCake()
  const cakeVaultContract = useCakeVaultContract()
  const { lastUpdated, setLastUpdated } = useLastUpdated()
  useEffect(() => {
    const checkApprovalStatus = async () => {
      try {
        const response = await cakeContract.allowance(account, cakeVaultContract.address)
        const currentAllowance = new BigNumber(response.toString())
        setIsVaultApproved(currentAllowance.gt(0))
      } catch (error) {
        setIsVaultApproved(false)
      }
    }

    checkApprovalStatus()
  }, [account, cakeContract, cakeVaultContract, lastUpdated])

  return { isVaultApproved, setLastUpdated }
}














