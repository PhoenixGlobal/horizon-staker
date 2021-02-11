import { useMemo } from "react";
import { useAtomValue } from "jotai/utils";
import { Box, BoxProps, Typography } from "@material-ui/core";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import { availableAtomFamily } from "@atoms/balance";
import useWallet from "@hooks/useWallet";
import { Token } from "@utils/constants";
import { getFullDisplayBalance } from "@utils/formatters";

const useStyles = makeStyles({
  root: {
    padding: "8px 12px",
    borderRadius: 16,
    background: "rgba(16,38,55,0.3)",
    border: "1px solid #11263B",
    whiteSpace: "nowrap",
    textAlign: "center",
  },
  dot: {
    display: "inline-block",
    marginRight: 12,
    height: 12,
    width: 12,
    borderRadius: "50%",
    backgroundColor: ({ connected }: { connected: boolean }) =>
      connected ? "#3481B7" : "gray",
  },
  balance: {
    borderTop: "1px solid #11263B",
    paddingTop: 4,
    marginTop: 4,
    textAlign: "right",
  },
});

const StyledUnit = withStyles(() => ({
  root: {
    paddingLeft: 16,
    color: "#88ABC3",
  },
}))(Typography);

export default function WalletInfo({ className, ...props }: BoxProps) {
  const { shortAccount, connected } = useWallet();
  const classes = useStyles({ connected });

  const availablePHB = useAtomValue(availableAtomFamily(Token.PHB));
  const availableHZN = useAtomValue(availableAtomFamily(Token.HZN));

  const balances = useMemo(() => {
    return [
      {
        token: Token.HZN,
        amount: availableHZN,
      },
      {
        token: Token.PHB,
        amount: availablePHB,
      },
    ];
  }, [availablePHB, availableHZN]);

  return (
    <Box className={clsx(classes.root, className)} {...props}>
      <Typography variant='body2'>
        <i className={classes.dot} />
        {shortAccount}
      </Typography>
      <Box className={classes.balance}>
        {balances.map(({ token, amount }) => (
          <Box key={token}>
            <Typography variant='caption'>
              {getFullDisplayBalance(amount)}
            </Typography>
            <StyledUnit variant='caption'>{token} Balance</StyledUnit>
          </Box>
        ))}
      </Box>
    </Box>
  );
}
