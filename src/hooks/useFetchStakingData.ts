import { useCallback } from "react";
import { useUpdateAtom } from "jotai/utils";
import {
  stakedAtomFamily,
  earnedAtomFamily,
  withdrawableAtomFamily,
} from "@atoms/balance";
import { tokenStatAtomFamily } from "@atoms/stat";
import useWallet from "./useWallet";
import useStaking from "./useStaking";

export default function useFetchStakingData(token: TokenEnum) {
  const { account } = useWallet();
  const stakingContract = useStaking(token);

  // staked
  const setStaked = useUpdateAtom(stakedAtomFamily(token));

  // earned
  const setEarned = useUpdateAtom(earnedAtomFamily(token));

  // withdraw
  const setWithdrawable = useUpdateAtom(withdrawableAtomFamily(token));

  // withdraw
  const setStat = useUpdateAtom(tokenStatAtomFamily(token));

  const fetchData = useCallback(async () => {
    if (account && stakingContract) {
      const [
        staked,
        earned,
        withdrawable,
        totalStaked,
        finish,
        lockDownSeconds,
      ] = await Promise.all([
        stakingContract.balanceOf(account), // user staked
        stakingContract.earned(account), // user staked
        stakingContract.withdrawableAmount(account), // user withdrawable Amount
        stakingContract.totalSupply(), // total staked
        stakingContract.periodFinish(), // finish time
        stakingContract.lockDownDuration(), // lockDownDuration in seconds
      ]);
      setStaked(staked);
      setEarned(earned);
      setWithdrawable(withdrawable);
      setStat({
        total: totalStaked,
        apy: 0,
        finish,
        lockDownSeconds,
      });
    }
  }, [
    account,
    setEarned,
    setStaked,
    setStat,
    setWithdrawable,
    stakingContract,
  ]);

  return fetchData;
}
