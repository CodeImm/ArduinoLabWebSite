import React from 'react';
import {useTheme} from '@material-ui/core/styles';
import {CartesianGrid, Label, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis} from 'recharts';
import Title from '../shared/Title';
import {FirebaseContext} from "../../firebase";


// Generate Sales Data
function createData(frequency, amplitude) {
    return {frequency, amplitude};
}

// const data = [
//     // createData('00:00', 0),
//     // createData('03:00', 300),
//     // createData('06:00', 600),
//     // createData('09:00', 800),
//     // createData('12:00', 1500),
//     // createData('15:00', 2000),
//     // createData('18:00', 2400),
//     // createData('21:00', 2400),
//     // createData('24:00', undefined),
// ];

export default function Chart(props) {
    const theme = useTheme();
    const {user, firebase} = React.useContext(FirebaseContext);
    const statusRef = firebase.database.ref('status');
    const chartIdRef = firebase.database.ref('status/chartId');
    const [data, setData] = React.useState([]);
    // console.log(user.uid);

    React.useEffect(() => {
        getPoints();
        // return () => unsubscribe();
        // console.log(points);
    }, [user]);


    function getPoints() {
        if(user) {
            //TODO: убрать два условия ниже, chartId передавать через props
            chartIdRef.once("value").then(function (snap) {
                // console.log(Object.keys(snap.val())[0]);
                if (snap.val() != "null") {
                    const pointsRefStr = 'users/' + user.uid + '/charts/' + snap.val();
                    console.log(snap.val());
                    const chartRef = firebase.database.ref(pointsRefStr);
                    console.log(pointsRefStr);
                    chartRef.on('child_added', snapshot => {
                        const addedData = snapshot.val();
                        console.log(addedData);
                        setData(prevState => {
                            return [...prevState, createData(addedData.x, addedData.y)]
                        });

                        // config.data.datasets[0].data.push(parseInt(addedData.y));
                        // config.data.labels.push(parseInt(addedData.x));
                        // window.myLine.update();
                        // $("#addData").prop("disabled", false);
                        // $("#addData").removeClass("button--disable");
                    })
                    return () => chartRef.off("value");
                }
            });
        }

        // linkRef.get().then(doc => {
        //     setLink({...doc.data(), id: doc.id})
        // })
    }

    return (
        <React.Fragment>
            <Title>Today</Title>
            <ResponsiveContainer>
                <LineChart
                    data={data}
                    margin={{
                        top: 16,
                        right: 16,
                        bottom: 20,
                        left: 20,
                    }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="frequency" stroke={theme.palette.text.secondary}>
                        <Label value="Frequency, Hz" offset={0} position="bottom" />
                    </XAxis>
                    <YAxis stroke={theme.palette.text.secondary}>
                        <Label
                            angle={270}
                            position="left"
                            style={{textAnchor: 'middle', fill: theme.palette.text.primary}}
                        >
                            Relative amplitude
                        </Label>
                    </YAxis>
                    <Tooltip />
                    <Line type="monotone" dataKey="amplitude" stroke={theme.palette.primary.main} activeDot={{ r: 8 }}/>
                </LineChart>
            </ResponsiveContainer>
        </React.Fragment>
    );
}

/*

import React, { PureComponent } from 'react';
import {
    LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from 'recharts';

const data = [
    {
        name: 'Page A', uv: 4000, pv: 2400, amt: 2400,
    },
    {
        name: 'Page B', uv: 3000, pv: 1398, amt: 2210,
    },
    {
        name: 'Page C', uv: 2000, pv: 9800, amt: 2290,
    },
    {
        name: 'Page D', uv: 2780, pv: 3908, amt: 2000,
    },
    {
        name: 'Page E', uv: 1890, pv: 4800, amt: 2181,
    },
    {
        name: 'Page F', uv: 2390, pv: 3800, amt: 2500,
    },
    {
        name: 'Page G', uv: 3490, pv: 4300, amt: 2100,
    },
];


export default class Example extends PureComponent {
    static jsfiddleUrl = 'https://jsfiddle.net/alidingling/xqjtetw0/';

    render() {
        return (
            <LineChart
                width={500}
                height={300}
                data={data}
                margin={{
                    top: 5, right: 30, left: 20, bottom: 5,
                }}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="pv" stroke="#8884d8" activeDot={{ r: 8 }} />
                <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
            </LineChart>
        );
    }
}

*/
