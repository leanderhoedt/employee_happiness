import theme from '../theme';
const BarOptions = {
    responsive: true,
    maintainAspectRatio: false,
    legend: { display: true },
    cornerRadius: 20,
    tooltips: {
        enabled: true,
        mode: 'index',
        intersect: false,
        borderWidth: 1,
        borderColor: theme.palette.divider,
        backgroundColor: theme.palette.white,
        titleFontColor: theme.palette.text.primary,
        bodyFontColor: theme.palette.text.secondary,
        footerFontColor: theme.palette.text.secondary
    },
    layout: { padding: 0 },
    scales: {
        xAxes: [
            {
                barThickness: 12,
                maxBarThickness: 10,
                barPercentage: 0.5,
                categoryPercentage: 0.5,
                ticks: {
                    fontColor: theme.palette.text.secondary
                },
                gridLines: {
                    display: false,
                    drawBorder: false
                }
            }
        ],
        yAxes: [
            {
                ticks: {
                    fontColor: theme.palette.text.secondary,
                    beginAtZero: true,
                    min: 0
                },
                gridLines: {
                    borderDash: [2],
                    borderDashOffset: [2],
                    color: theme.palette.divider,
                    drawBorder: false,
                    zeroLineBorderDash: [2],
                    zeroLineBorderDashOffset: [2],
                    zeroLineColor: theme.palette.divider
                }
            }
        ]
    }
};


export {BarOptions};