import React, { useEffect, useState } from "react";
import { storeData } from "../helper/data";
import ReactApexChart from "react-apexcharts";
import CardContent from '@mui/material/CardContent';
import Card from '@mui/material/Card';

const TotalSalesOfStore = (): any => {
    const [chartData, setChartData] = useState({
        series: [],
        options: {
          chart: {
            width: 380,
            type: 'donut',
          },
          dataLabels: {
            enabled: false
          },
          responsive: [{
            breakpoint: 480,
            options: {
              chart: {
                width: 200
              },
              legend: {
                show: false
              }
            }
          }],
          legend: {
            position: 'right',
            offsetY: 0,
            height: 230,
          },
          plotOptions: {
            pie: {
              donut: {
                labels: {
                  show: true,
                  name: {
                    show: true,
                    fontSize: '22px',
                    fontFamily: 'Helvetica, Arial, sans-serif',
                    fontWeight: 600,
                    color: undefined,
                    offsetY: -10,
                    formatter: function (val) {
                      return val
                    }
                  },
                  value: {
                    show: true,
                    fontSize: '16px',
                    fontFamily: 'Helvetica, Arial, sans-serif',
                    fontWeight: 400,
                    color: undefined,
                    offsetY: 16,
                    formatter: function (val) {
                      return val
                    }
                  },
                  total: {
                    showAlways: true,
                    show: true,
                    formatter: function(w) {
                      var data = [];
                      var total = 0;
                      data = w.globals.seriesTotals;
                      for (var i = 0; i < data.length; i++) {
                        total += data[i];
                      }
                      return new Intl.NumberFormat().format(total);
                    },
                  },
                },
              },
            },
          },
          labels: [],
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
        // let val = 12 - Total_Price_Month.length;
        // for (let i = 0; i < val; i++) {
        //     Total_Price_Month.push("0")
        // }
        setChartData((prevState) => {
            let options = Object.assign({}, prevState.options);
            options = {
                labels: ["January","February","March"]
            };
            return { options, series: Total_Price_Month };
        });

    }, [])


    return (
        <Card>
            <CardContent>
                <div className="d-flex">
                <div className="w-70">
                  <h3>{"Total sales of the store"}
          </h3>
                </div>
                    <div>
                        <div id="chart">
                            <ReactApexChart options={chartData.options} series={chartData.series} width={'100%'}
                                height={'145%'} type="donut" />
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>

    )
}
export default TotalSalesOfStore