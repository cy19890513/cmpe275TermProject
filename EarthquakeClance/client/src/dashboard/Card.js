import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { relative, isAbsolute } from 'path';

const styles = {
    card: {
        minWidth: 100,
        height: 170,
        position: "relative"
    },
    title: {
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        fontSize: 20,
        textAlign: 'center',
        color: 'black',
    },
    pos: {
        // marginBottom: 12,
        position: "absolute",
        bottom: 0,
        right: "50%",
    },
    titleSession: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: "100%",
        height: "35%",
        // backgroundColor: '#ff7d3d'
    },
    body: {
        position: 'absolute',
        top: "35%",
        left: 0,
        height: "65%",
        width: "100%",
    },
    bodyContent: {
        position: "absolute",
        left: "50%",
        top: "50%",
        transform: "translate(-50%, -50%)",
    }
};

function InfoCard(props) {
    const { classes } = props;

    return (
        <Card className={classes.card}>
            <CardContent>
                <div className={classes.titleSession} style={{ backgroundColor: props.bgColor }}>
                    <Typography className={classes.title} >
                        {props.title}
                    </Typography>
                    {/* <Typography className={classes.pos} color="textSecondary">
                        adjective
                    </Typography> */}
                </div>
                <div className={classes.body}>
                    <Typography className={classes.bodyContent} variant="h4" component="h2">
                        {props.data}
                        {/* {console.log(props.data)} */}
                    </Typography>
                </div>
            </CardContent>
        </Card>
    );
}

InfoCard.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(InfoCard);