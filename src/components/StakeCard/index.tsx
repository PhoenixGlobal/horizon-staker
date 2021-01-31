import { makeStyles, withStyles } from "@material-ui/core/styles";
import {
  Button,
  Typography,
  Card,
  CardHeader,
  CardActions,
  CardContent,
  Link,
} from "@material-ui/core";
import Stats from "./Stats";
import phbLogo from "@assets/phb.png";

const useStyles = makeStyles(() => ({
  title: {
    fontSize: 14,
  },
  desc: {
    color: "#C1D3E0",
    fontSize: "14px",
    lineHeight: "22px",
  },
}));

const StyledCard = withStyles(({ palette }) => ({
  root: {
    minHeight: 500,
    width: 340,
    borderRadius: 20,
    backgroundColor: "transparent",
    backgroundRepeat: "no-repeat",
    backgroundSize: "360px 240px",
    backgroundPosition: "top -56px right -84px",
    backgroundImage: `url(${phbLogo})`,
    border: `1px solid ${palette.divider}`,
  },
}))(Card);

const StyledHeader = withStyles({
  root: {
    paddingTop: 32,
    backgroundColor: "rgba(28,57,95,0.25)",
  },
  title: {
    marginBottom: 8,
  },
})(CardHeader);

const StyledContent = withStyles(() => ({
  root: {
    backgroundColor: "rgba(12,17,29,0.5)",
  },
}))(CardContent);

const StyledActions = withStyles(({ palette }) => ({
  root: {
    borderTop: `1px solid ${palette.divider}`,
  },
}))(CardActions);

export default function StakeCard() {
  const classes = useStyles();

  return (
    <StyledCard variant='outlined'>
      <StyledHeader
        title='Stake PHB'
        subheader={
          <Typography className={classes.desc} color='textSecondary'>
            Stake BEP-20 PHB to earn HZN. <br />
            To convert your existing PHX or BEP-2 PHB to BEP-20 PHB, click{" "}
            <Link href='https://horizonprotocol.com'>here</Link>.
          </Typography>
        }
      />
      <StyledContent>
        <Stats />
      </StyledContent>
      <StyledActions>
        <Button size='small'>Buy PHB</Button>
      </StyledActions>
    </StyledCard>
  );
}
