import * as React from 'react';
import * as PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import SlideTransition, { SlideDirection } from './SlideTransition';
import IconButton, { IconButtonProps } from '@material-ui/core/IconButton';
import { DateType } from '@date-io/type';
import { useUtils } from '../../_shared/hooks/useUtils';
import { MaterialUiPickersDate } from '../../typings/date';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { ArrowLeftIcon } from '../../_shared/icons/ArrowLeftIcon';
import { ArrowRightIcon } from '../../_shared/icons/ArrowRightIcon';

export interface CalendarHeaderProps {
  currentMonth: DateType;
  leftArrowIcon?: React.ReactNode;
  rightArrowIcon?: React.ReactNode;
  leftArrowButtonProps?: Partial<IconButtonProps>;
  rightArrowButtonProps?: Partial<IconButtonProps>;
  disablePrevMonth?: boolean;
  disableNextMonth?: boolean;
  slideMonthDirection: SlideDirection;
  slideYearDirection: SlideDirection;
  onMonthChange: (date: MaterialUiPickersDate, direction: SlideDirection) => void | Promise<void>;
  onYearChange: (date: MaterialUiPickersDate, direction: SlideDirection) => void | Promise<void>;
  setOpenView: (view: PickerView) => void;
}

export const useStyles = makeStyles(
  theme => ({
    switchHeader: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    lastSwitch: {
      marginBottom: theme.spacing(1),
    },
    transitionContainer: {
      width: '100%',
      overflow: 'hidden',
      height: 23,
    },
    iconButton: {
      zIndex: 1,
      backgroundColor: theme.palette.background.paper,
      padding: 6,
    },
    daysHeader: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      maxHeight: 16,
    },
    dayLabel: {
      width: 36,
      margin: '0 2px',
      textAlign: 'center',
      color: theme.palette.text.hint,
    },
    clickable: {
      cursor: 'pointer',
    },
  }),
  { name: 'MuiPickersCalendarHeader' }
);

export const CalendarHeader: React.SFC<CalendarHeaderProps> = ({
  currentMonth,
  onMonthChange,
  onYearChange,
  leftArrowIcon,
  rightArrowIcon,
  leftArrowButtonProps,
  rightArrowButtonProps,
  disablePrevMonth,
  disableNextMonth,
  slideMonthDirection,
  slideYearDirection,
  setOpenView,
}) => {
  const utils = useUtils();
  const classes = useStyles();
  const theme = useTheme();
  const rtl = theme.direction === 'rtl';

  const selectNextMonth = () => onMonthChange(utils.getNextMonth(currentMonth), 'left');

  const selectPreviousMonth = () => onMonthChange(utils.getPreviousMonth(currentMonth), 'right');

  const selectNextYear = () =>
    onYearChange(utils.setYear(currentMonth, utils.getYear(currentMonth) + 1), 'left');

  const selectPreviousYear = () =>
    onYearChange(utils.setYear(currentMonth, utils.getYear(currentMonth) - 1), 'right');

  const openYearsSlider = () => setOpenView('year');

  return (
    <div>
      <div className={classes.switchHeader}>
        <IconButton
          {...leftArrowButtonProps}
          disabled={disablePrevMonth}
          onClick={selectPreviousMonth}
          className={classes.iconButton}
        >
          {rtl ? rightArrowIcon : leftArrowIcon}
        </IconButton>

        <SlideTransition
          slideDirection={slideMonthDirection}
          transKey={utils.getMonthText(currentMonth)}
          className={classes.transitionContainer}
        >
          <Typography align="center" variant="body1">
            {utils.getMonthText(currentMonth)}
          </Typography>
        </SlideTransition>

        <IconButton
          {...rightArrowButtonProps}
          disabled={disableNextMonth}
          onClick={selectNextMonth}
          className={classes.iconButton}
        >
          {rtl ? leftArrowIcon : rightArrowIcon}
        </IconButton>
      </div>
      <div className={`${classes.switchHeader} ${classes.lastSwitch}`}>
        <IconButton
          {...leftArrowButtonProps}
          disabled={disablePrevMonth}
          onClick={selectPreviousYear}
          className={classes.iconButton}
        >
          {rtl ? rightArrowIcon : leftArrowIcon}
        </IconButton>

        <SlideTransition
          slideDirection={slideYearDirection}
          transKey={utils.getYearText(currentMonth)}
          className={classes.transitionContainer}
        >
          <Typography
            align="center"
            variant="body1"
            onClick={openYearsSlider}
            className={classes.clickable}
          >
            {utils.getYearText(currentMonth)}
          </Typography>
        </SlideTransition>

        <IconButton
          {...rightArrowButtonProps}
          disabled={disableNextMonth}
          onClick={selectNextYear}
          className={classes.iconButton}
        >
          {rtl ? leftArrowIcon : rightArrowIcon}
        </IconButton>
      </div>

      <div className={classes.daysHeader}>
        {utils.getWeekdays().map((day, index) => (
          <Typography
            key={index} // eslint-disable-line react/no-array-index-key
            variant="caption"
            className={classes.dayLabel}
          >
            {day}
          </Typography>
        ))}
      </div>
    </div>
  );
};

CalendarHeader.displayName = 'CalendarHeader';

CalendarHeader.propTypes = {
  leftArrowIcon: PropTypes.node,
  rightArrowIcon: PropTypes.node,
  disablePrevMonth: PropTypes.bool,
  disableNextMonth: PropTypes.bool,
};

CalendarHeader.defaultProps = {
  leftArrowIcon: <ArrowLeftIcon />,
  rightArrowIcon: <ArrowRightIcon />,
  disablePrevMonth: false,
  disableNextMonth: false,
};

export default CalendarHeader;
