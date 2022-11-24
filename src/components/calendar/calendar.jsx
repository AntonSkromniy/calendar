import React, {useEffect, useState} from 'react';
import styles from './calendar.module.scss';
import cn from 'classnames';
import moment from 'moment';

const Calendar = () => {
    moment.updateLocale('en', {week: {dow: 1}});
    const [today, setToday] = useState(moment())
    const startDay = today.clone().startOf('month').startOf('week');
    let weekDays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];


    const prevHandler = () => setToday(prev => prev.clone().subtract(1, 'month'));
    const nextHandler = () => setToday(prev => prev.clone().add(1, 'month'));

    const day = startDay.clone().subtract(1, 'day');
    const daysMap = [...Array(42)].map(() => {
        return (
            {
                day: day.add(1, 'day').clone(),
                isCurrentMonth: day.month() === today.month(),
                isToday: day.isSame(new Date(), 'day'),
                isWeekend: day.day() === 6 || day.day() === 0,
            }
        )
    })

    return (
        <div className={styles.container}>
            <div className={styles.wrapper}>
                <div className={styles.top}>
                    <div className={styles.info}>
                        <p>
                            {today.format('MMMM')}
                        </p>
                        <p>
                            {today.format('YYYY')}
                        </p>
                    </div>
                    <div className={styles.buttons}>
                        <button onClick={prevHandler}>
                            Prev Month
                        </button>
                        <button onClick={nextHandler}>
                            Next Month
                        </button>
                    </div>
                </div>
                <div className={styles.calendar}>
                    {
                        weekDays.map((day, index) => {
                            return (
                                <div className={cn(styles.calendar__weekDay, styles.cell)}
                                     key={index}>{day.slice(0, 3)}
                                </div>
                            );
                        })
                    }
                    {
                        daysMap && daysMap.map((item, index) => {
                            return (
                                <div key={index} className={cn(styles.calendar__day, styles.cell, {
                                    [styles.calendar__day__notCurrent]: !item.isCurrentMonth,
                                    [styles.calendar__day__today]: item.isToday,
                                    [styles.calendar__day__weekend]: item.isWeekend
                                })}>
                                    <p>{item.day.format('D')}</p>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </div>
    );
}

export default Calendar;
