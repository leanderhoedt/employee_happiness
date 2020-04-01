import React, {Fragment, useState, useEffect} from 'react';
import clsx from 'clsx';
import {makeStyles} from "@material-ui/core/styles";
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import {Line, Bar} from 'react-chartjs-2';
import {
    Card,
    CardHeader,
    CardContent,
    Divider,
    Button
} from '@material-ui/core';
import {BarOptions as options} from './Chart.options';
import moment from "moment";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import {fetchAuth} from "../services/Fetch.service";

const useStyles = makeStyles(() => ({
    root: {},
    chartContainer: {
        height: 400,
        position: 'relative'
    },
    actions: {
        justifyContent: 'flex-end'
    }
}));

const getData = (votes, period) => {
    const date = moment().add(-1, period);

    const today = moment();
    const amountOfDays = today.diff(date, 'days');

    let labels = [];

    for (let i = 1; i < amountOfDays; i++) {
        labels.push(today.add(-i, 'days').format("D MMM"));
    }
    const datasets = votes.map(u => {
        return {
            label: u.firstName,
            data: u.votes.map(v => v.mood)
        }
    });
    return {
        labels,
        datasets,
    }
};

const Chart = ({className, ...rest}) => {
    const classes = useStyles();

    const periodsLabel = {
        days: 'Last day',
        weeks: 'Last week',
        months: 'Last month',
    };
    const periods = ['days', 'weeks', 'months'];

    const [period, setPeriod] = useState('days');
    const [anchorEl, setAnchorEl] = useState(null);
    const [votes, setVotes] = useState([]);

    useEffect(() => {
        const getResponse = async () => await fetchAuth().post('/vote/statistics', {date: moment().add(-1, period)});
        getResponse().then(result => {
            setVotes(result.data.votes);
        })
    }, [period]);

    const handleClickButton = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleMenuItemClick = (period) => {
        setAnchorEl(null);
        setPeriod(period);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };
    return (
        <Card
            {...rest}
            className={clsx(classes.root, className)}
        >
            <CardHeader
                action={
                    <Fragment>
                        <Button
                            size="small"
                            variant="text"
                            aria-controls="simple-menu"
                            aria-haspopup="true"
                            onClick={handleClickButton}
                        >
                            {periodsLabel[period]} <ArrowDropDownIcon/>
                        </Button>
                        <Menu
                            id="simple-menu"
                            keepMounted
                            anchorEl={anchorEl}
                            open={Boolean(anchorEl)}
                            onClose={handleClose}
                        >
                            {
                                periods.map((option, index) => (
                                        <MenuItem
                                            key={option}
                                            disabled={option === period}
                                            selected={period}
                                            onClick={(event) => handleMenuItemClick(option)}
                                        >
                                            {option}
                                        </MenuItem>
                                    )
                                )
                            }
                        </Menu>
                    </Fragment>
                }
                title="Overview"
            />
            <Divider/>
            <CardContent>
                <div className={classes.chartContainer}>
                    <Bar
                        data={getData(votes, period)}
                        options={options}
                    />
                </div>
            </CardContent>
        </Card>
    )
};

export default Chart;