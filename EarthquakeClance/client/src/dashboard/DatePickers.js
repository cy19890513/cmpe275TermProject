import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

const styles = theme => ({
    container: {
        display: 'inline-flex',
        flexWrap: 'wrap',
        width: '30%',
        marginBottom: 20
    },
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        width: '100%',
    },
});



function DatePickers(props) {
    const { classes } = props;

    const handleChange = e => {
        props.select(e.target.value);
    }

    return (
        <form className={classes.container} noValidate>
            <TextField
                id="standard-number"
                // label={props.label}
                // value={values.age}
                placeholder={props.year}
                onChange={handleChange}
                type="number"
                className={classes.textField}
                InputLabelProps={{
                    shrink: true,
                }}
                margin="normal"
            />
        </form>
    );
}

DatePickers.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(DatePickers);