import React from "react";
import { Grid, Paper } from "@mui/material";
import SalesForMonthwise from "./salesForMonthwise";
import "./dashboard.css";
import MostQuantityMonthwise from "./mostQuantityMonthwise";
import MostSalesMonthwise from "./mostSalesMonthwise";
import MaxandMinSalesMonthwise from "./maxandMinSalesMonthwise";
import TotalSalesOfStore from "./totalSalesOfStore";
import AverageSalesMonthwise from "./averageSalesMonthwise";

const Dashboard = (): any => {

    return (
        <div className="w-70 m-b-10 p-10">
        <h2 className="text-center">{"Ice Cream Parlour"}
</h2>
     
        <Grid container spacing={3}>
            <Grid item xs={6} className="h-300 desk-100">
                <Paper>
                    <SalesForMonthwise />
                </Paper>
            </Grid>
            <Grid item xs={6} className="h-300 desk-100">
                <Paper>
                    <MostQuantityMonthwise />
                </Paper>
            </Grid>
            <Grid item xs={6} className="h-300 desk-100">
                <Paper>
                    <MostSalesMonthwise />
                </Paper>
            </Grid>
            <Grid item xs={6} className="h-300 desk-100">
                <Paper>
                    <MaxandMinSalesMonthwise />
                </Paper>
            </Grid>
            <Grid item xs={6} className="h-300 desk-100">
                <Paper>
                    <AverageSalesMonthwise />
                </Paper>
            </Grid>
            <Grid item xs={6} className="h-300 desk-100">
                <Paper>
                    <TotalSalesOfStore />
                </Paper>
            </Grid>
        </Grid>
        </div>
    )
}
export default Dashboard