import { css, StyleSheet } from 'aphrodite'
import React from 'react'
import statistics from '../static/statistics.jpg'

export default function StatisticsEmptyPieChart() {
    return (
        <div>
            <h1 className={css(styles.statisticsImg)}>
                Недостаточно информации для <br /> отображение данной диаграммы
            </h1>

            <img src={statistics} alt="" />
        </div>
    )
}
const styles = StyleSheet.create({
    statisticsImg: {
        position: 'absolute',
        marginTop: '12rem',
        marginLeft: '4.5rem',
        fontSize: '1.3em',
        fontWeight: 'bold',
        backgroundColor: 'rgba(0,0,0,0.6)',
        color: 'white',
        padding: '0.7rem',
    },
})
