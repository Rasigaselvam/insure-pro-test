import React, { useEffect, useState } from "react";
import { storeData } from "../helper/data";
import CardContent from '@mui/material/CardContent';
import Card from '@mui/material/Card';
import { TableContainer, TableHead, Table, TableBody,TableCell, TableRow, Paper } from "@mui/material";
import { FormatDate } from "../helper/FormatDate";

const MaxandMinSalesMonthwise = (): any => {
    const [data, setData] = useState("")

    useEffect(() => {
        const collection = storeData.map(x => ({ ...x, Date: x.Date, "Total Price": Number(x["Total Price"]) }));

        const mapDayToMonth = collection.map(x => ({ ...x, Date: new Date(x.Date).getMonth() }));

        let newobj = mapDayToMonth.reduce((a, c) => {
            let filtered = a.filter(el => el.Date === c.Date && el.SKU == c.SKU);
            if (filtered.length > 0) {
                a[a.indexOf(filtered[0])]["Total Price"] += +c["Total Price"];
            } else {
                a.push(c);
            }
            return a;
        }, []);
        const groupBy = newobj.reduce((acc, cur) => {
            const key = `${cur.Date}`;
            if (!acc[key]) {
              acc[key] = cur;
            }
            if (acc[key]["Total Price"] > cur["Total Price"]) {
              acc[key]["Total Price"] = cur["Total Price"];
                 acc[key]["SKU"] = cur["SKU"]
            }
            return acc;
          }, {});
          
          const output = Object.values(groupBy);
        setData(output)

    }, [])


    return (
        <Card>
            <CardContent>
            <div className="d-flex">
                <div className="w-70">
                  <h3>{"Minimum popular item (Min quantity sold) in each month"}
          </h3>

              <TableContainer>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>SKU (Item)</TableCell>
            <TableCell align="right">Total Price</TableCell>
            <TableCell align="right">Month</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data ? data.map((item) => (
            <TableRow
              key={item.SKU}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {item.SKU}
              </TableCell>
              <TableCell align="right">{new Intl.NumberFormat().format(item["Total Price"])}</TableCell>
              <TableCell align="right">{FormatDate(item.Date)}</TableCell>
            </TableRow>
          )): "No Record Found"}
        </TableBody>
      </Table>
    </TableContainer>
                </div>
              </div>
            </CardContent>
        </Card>

    )
}
export default MaxandMinSalesMonthwise