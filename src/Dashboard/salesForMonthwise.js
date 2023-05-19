import React, { useEffect, useState } from "react";
import { storeData } from "../helper/data";
import ReactApexChart from "react-apexcharts";
import CardContent from '@mui/material/CardContent';
import Card from '@mui/material/Card';

const SalesForMonthwise = (): any => {
    const [chartData, setChartData] = useState({
        series: [{
            name: "",
            data: []
        }],
        options: {
            chart: {
                height: 350,
                type: 'line',
                zoom: {
                    enabled: false
                }
            },
            dataLabels: {
                enabled: false
            },
            stroke: {
                curve: 'straight'
            },
            grid: {
                row: {
                    colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
                    opacity: 0.5
                },
            },
            xaxis: {
                categories: [],
            }
        }
    })

    useEffect(() => {
        const collection = storeData.map(x => ({ ...x, Date: x.Date, "Total Price": Number(x["Total Price"]) }));

        const mapDayToMonth = collection.map(x => ({ ...x, Date: new Date(x.Date).getMonth() }));

        const sumPerMonth = mapDayToMonth.reduce((acc, cur) => {
            acc[cur.Date] = acc[cur.Date] + cur["Total Price"] || cur["Total Price"]; // increment or initialize to cur.value
            return acc;
        }, {})
        let Total_Price_Month = [];
        for (const key in sumPerMonth) {
            Total_Price_Month.push(sumPerMonth[key])
        }
        let val = 12 - Total_Price_Month.length;
        for (let i = 0; i < val; i++) {
            Total_Price_Month.push("0")
        }
        setChartData((prevState) => {
            let options = Object.assign({}, prevState.options);
            options = {
                xaxis: {
                    categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],

                },
                axisTicks: {
                    show: false,
                },
            };
            return { options, series: [{ name: "Total Price", data: Total_Price_Month }] };
        });

    }, [])


    return (
        <Card>
            <CardContent>
                <div className="d-flex">
                <div className="w-70">
                  <h3>{"Month wise sales totals"}
          </h3>
                </div>
                    <div>
                        <div id="chart">
                            <ReactApexChart options={chartData.options} series={chartData.series} width={'100%'}
                                height={'145%'} type="line" />
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>

    )
}
export default SalesForMonthwise