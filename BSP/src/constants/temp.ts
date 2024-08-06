export const  Analyze_DataSidebarLinks=[
    {
        route: "/analyze_data/overview",
        label: "Overview",
    },
    // {
    //     route: "/analyze_data/trends",
    //     label: "Trends",
    // },
    {
        route: "/analyze_data/anomalies",
        label: "Anomalies",
    },
    // {
    //     route: "/analyze_data/sensor_data",
    //     label: "Sensor Data",
    // },
]
export interface SensorData {
    result: string;
    table: number;
    start: string;
    stop: string;
    time: string;
    value: number;
    field: string;
    measurement: string;
    sensor_name: string;
    alarm?: boolean
}

export const sensorDataArray: SensorData[] = [
    {
        result: "_result",
        table: 0,
        start: "2023-11-07T11:58:16Z",
        stop: "2023-11-07T14:58:16Z",
        time: "2023-11-07T14:58:22.772Z",
        value: 1,
        field: "sensor-reading",
        measurement: "CVAH_11_anomaly_score",
        sensor_name: "predicted_cobble",
        alarm: true
    },
    {
        result: "_result",
        table: 1,
        start: "2023-11-07T12:00:00Z",
        stop: "2023-11-07T15:00:00Z",
        time: "2023-11-07T14:59:45.123Z",
        value: 1,
        field: "sensor-reading",
        measurement: "CVAH_12_anomaly_score",
        sensor_name: "predicted_temperature",
        alarm: true
    },
    {
        result: "_result",
        table: 2,
        start: "2023-11-07T12:05:00Z",
        stop: "2023-11-07T15:05:00Z",
        time: "2023-11-07T15:01:10.456Z",
        value: 1,
        field: "sensor-reading",
        measurement: "CVAH_13_anomaly_score",
        sensor_name: "predicted_pressure",
        alarm: true
    },
    {
        result: "_result",
        table: 3,
        start: "2023-11-07T12:10:00Z",
        stop: "2023-11-07T15:10:00Z",
        time: "2023-11-07T15:02:35.789Z",
        value: 0,
        field: "sensor-reading",
        measurement: "CVAH_14_anomaly_score",
        sensor_name: "predicted_humidity",
        alarm: false
    },
    {
        result: "_result",
        table: 4,
        start: "2023-11-07T12:15:00Z",
        stop: "2023-11-07T15:15:00Z",
        time: "2023-11-07T15:04:00.012Z",
        value: 0,
        field: "sensor-reading",
        measurement: "CVAH_15_anomaly_score",
        sensor_name: "predicted_vibration",
        // alarm: true
        

    },
    {
        result: "_result",
        table: 5,
        start: "2023-11-07T12:20:00Z",
        stop: "2023-11-07T15:20:00Z",
        time: "2023-11-07T15:05:25.345Z",
        value: 1,
        field: "sensor-reading",
        measurement: "CVAH_16_anomaly_score",
        sensor_name: "predicted_flow_rate",
        alarm: false

    },
    {
        result: "_result",
        table: 6,
        start: "2023-11-07T12:25:00Z",
        stop: "2023-11-07T15:25:00Z",
        time: "2023-11-07T15:06:50.678Z",
        value: 1,
        field: "sensor-reading",
        measurement: "CVAH_17_anomaly_score",
        sensor_name: "predicted_level",

        alarm: false

    },
    {
        result: "_result",
        table: 7,
        start: "2023-11-07T12:30:00Z",
        stop: "2023-11-07T15:30:00Z",
        time: "2023-11-07T15:08:15.901Z",
        value: 1,
        field: "sensor-reading",
        measurement: "CVAH_18_anomaly_score",
        sensor_name: "predicted_voltage",
        alarm: false

    },
    {
        result: "_result",
        table: 8,
        start: "2023-11-07T12:35:00Z",
        stop: "2023-11-07T15:35:00Z",
        time: "2023-11-07T15:09:40.234Z",
        value: 1,
        field: "sensor-reading",
        measurement: "CVAH_19_anomaly_score",
        sensor_name: "predicted_current",
        alarm: true

    },
    {
        result: "_result",
        table: 9,
        start: "2023-11-07T12:40:00Z",
        stop: "2023-11-07T15:40:00Z",
        time: "2023-11-07T15:11:05.567Z",
        value: 0,
        field: "sensor-reading",
        measurement: "CVAH_20_anomaly_score",
        sensor_name: "predicted_power"
    }
];



export const sensorDataArray1: SensorData[] = [
    {
        result: "_result",
        table: 0,
        start: "2023-11-07T11:58:16Z",
        stop: "2023-11-07T14:58:16Z",
        time: "2023-11-07T14:58:22.772Z",
        value: 1,
        field: "sensor-reading",
        measurement: "CVAH_11_anomaly_score",
        sensor_name: "predicted_cobble"
    },
    {
        result: "_result",
        table: 1,
        start: "2023-11-08T09:10:00Z",
        stop: "2023-11-08T10:30:00Z",
        time: "2023-11-08T10:00:00.000Z",
        value: 5.5,
        field: "temperature",
        measurement: "HVAC_02_temp",
        sensor_name: "HVAC_system"
    },
    {
        result: "_result",
        table: 2,
        start: "2023-11-09T08:15:24Z",
        stop: "2023-11-09T12:15:24Z",
        time: "2023-11-09T11:15:24.345Z",
        value: 3,
        field: "humidity",
        measurement: "Room_11_humidity",
        sensor_name: "environment_sensor"
    },
    {
        result: "_result",
        table: 3,
        start: "2023-11-10T07:00:00Z",
        stop: "2023-11-10T09:00:00Z",
        time: "2023-11-10T08:45:00.123Z",
        value: 0.7,
        field: "pressure",
        measurement: "Tank_05_pressure",
        sensor_name: "pressure_valve"
    },
    {
        result: "_result",
        table: 4,
        start: "2023-11-11T13:00:00Z",
        stop: "2023-11-11T15:00:00Z",
        time: "2023-11-11T14:30:00.456Z",
        value: 4.2,
        field: "flow_rate",
        measurement: "Pipe_03_flow",
        sensor_name: "flow_meter"
    },
    {
        result: "_result",
        table: 5,
        start: "2023-11-12T10:00:00Z",
        stop: "2023-11-12T11:00:00Z",
        time: "2023-11-12T10:30:00.789Z",
        value: 2.5,
        field: "vibration",
        measurement: "Engine_07_vibration",
        sensor_name: "vibration_sensor"
    },
    {
        result: "_result",
        table: 6,
        start: "2023-11-13T16:00:00Z",
        stop: "2023-11-13T18:00:00Z",
        time: "2023-11-13T17:15:00.321Z",
        value: 8,
        field: "temperature",
        measurement: "Oven_02_temp",
        sensor_name: "oven_sensor"
    },
    {
        result: "_result",
        table: 7,
        start: "2023-11-14T20:20:20Z",
        stop: "2023-11-14T22:20:20Z",
        time: "2023-11-14T21:40:20.542Z",
        value: 6.3,
        field: "light_intensity",
        measurement: "Light_04_intensity",
        sensor_name: "light_meter"
    },
    {
        result: "_result",
        table: 8,
        start: "2023-11-15T11:58:16Z",
        stop: "2023-11-15T14:58:16Z",
        time: "2023-11-15T14:58:22.772Z",
        value: 9.1,
        field: "sensor-reading",
        measurement: "CVAH_11_anomaly_score",
        sensor_name: "predicted_cobble"
    },
    {
        result: "_result",
        table: 9,
        start: "2023-11-16T15:50:00Z",
        stop: "2023-11-16T17:50:00Z",
        time: "2023-11-16T17:25:00.654Z",
        value: 7.4,
        field: "current",
        measurement: "Generator_03_current",
        sensor_name: "current_sensor"
    }
];

// console.log(sensorDataArray);