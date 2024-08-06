"use server"
import { InfluxDB } from '@influxdata/influxdb-client'

const url = 'http://10.10.209.19:8086'
const token = 'eA2cTIUNh8V_pr0WuS2EpAmetH1kzHcHKDa4Mjuv1jh6xwIxrTsfRQRHIJR3PwOD-JSMyLW0iqd0vmQz1UYTqg=='
const org = 'iit_bh'
const timeout = 25000

const queryApi = new InfluxDB({ url, token, timeout }).getQueryApi(org)

const v = {
  timeRangeStart: `2023-11-07T11:58:16Z`,
  timeRangeStop: `2023-11-07T14:58:16Z`,
}
const fluxQuery = `from(bucket: "test1")
  |> range(start: ${v.timeRangeStart}, stop: ${v.timeRangeStop})
  |> filter(fn: (r) => r["_measurement"] == "CVAH_L1_anomaly_score_cobble")
  |> filter(fn: (r) => r["_field"] == "sensor_reading")
  |> filter(fn: (r) => r["sensor_name"] == "predicted_cobble")`

export const myQuery = async () => {
  try {
    console.log(url, token, org)

    const queryData = await queryApi.collectRows(fluxQuery)

    for (const [table, rows] of Object.entries(queryData)) {
    //   console.log(`Table: ${table}`)
    console.log(rows)
    //   for (const row of rows) {
    //     console.log(`  ${row._time} ${row._measurement} in '${row.location}' (${row.sensor_id}): ${row._field}=${row._value}`)
    //   }
    }
  } catch (error) {
    console.error('Error executing Flux query:', error)
  }
}

// myQuery()