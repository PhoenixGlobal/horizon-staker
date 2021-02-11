import { useCallback, useState, useMemo } from "react";
import { BigNumber, utils } from "ethers";
import { Box, Button, Collapse, Typography } from "@material-ui/core";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import { cardContent } from "@utils/theme/common";
import { availableAtomFamily, stakedAtomFamily } from "@atoms/balance";
import { getFullDisplayBalance } from "@utils/formatters";
import AmountInput from "./AmountInput";
import { useAtomValue } from "jotai/utils";

const useStyles = makeStyles(({ palette }) => ({
  root: {
    ...cardContent,
  },
  amountBox: {
    display: "flex",
    alignItems: "center",
  },
  staked: {
    flex: 1,
    overflow: "hidden",
  },
  buttons: {
    flex: "0 0 120px",
    display: "flex",
    justifyContent: "space-between",
    color: palette.text.primary,
  },
  inputBox: {
    padding: cardContent.padding,
  },
}));

const AmountLabel = withStyles({
  root: {
    fontSize: 12,
    fontWeight: 900,
    letterSpacing: "1px",
    textTransform: "uppercase",
  },
})(Typography);

const Amount = withStyles({
  root: {
    paddingRight: 8,
    fontSize: 22,
    letterSpacing: "1.71px",
    fontWeight: 500,
    textOverflow: "ellipsis",
    overflow: "hidden",
  },
})(Typography);

const InputButton = withStyles(({ palette }) => ({
  root: {
    width: 50,
    minWidth: 50,
    fontWeight: 700,
    color: palette.text.primary,
  },
}))(Button);

interface Props {
  token: TokenEnum;
  logo?: string;
}

enum Action {
  Stake = 1,
  Unstake,
}

const Actions = [
  {
    key: Action.Stake,
    label: "+",
  },
  {
    key: Action.Unstake,
    label: "-",
  },
];

export default function AmountStake({ token, logo }: Props) {
  const classes = useStyles();
  const [currentAction, setCurrentAction] = useState<Action>();
  const [input, setInput] = useState<string>();

  const available = useAtomValue(availableAtomFamily(token));
  const staked = useAtomValue(stakedAtomFamily(token));

  const amount = useMemo(
    () => utils.parseUnits((input || "0").replace(/[^0-9.]/g, "")),
    [input]
  );

  const handleAction: (action: Action) => void = useCallback((action) => {
    console.log(action);
    setCurrentAction((prevAction) =>
      prevAction === action ? undefined : action
    );
  }, []);

  return (
    <>
      <Box className={classes.root}>
        <Box className={classes.amountBox}>
          <Box className={classes.staked}>
            <AmountLabel variant='caption' color='primary'>
              {token} Staked
            </AmountLabel>
            <Amount variant='body1'>{getFullDisplayBalance(staked)}</Amount>
          </Box>
          <Box className={classes.buttons}>
            {Actions.map(({ key, label }) => (
              <InputButton
                key={key}
                variant='contained'
                color={currentAction === key ? "primary" : "secondary"}
                size='small'
                onClick={() => handleAction(key)}
              >
                {label}
              </InputButton>
            ))}
          </Box>
        </Box>
      </Box>
      <Collapse in={!!currentAction}>
        <Box className={classes.inputBox}>
          <AmountInput
            token={token}
            logo={logo}
            input={input}
            onInput={setInput}
            amount={amount}
            max={available}
            btnLabel={currentAction ? Action[currentAction] : ""}
          />
        </Box>
      </Collapse>
    </>
  );
}
