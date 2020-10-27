import React from 'react';
import {useTheme} from '@material-ui/core/styles';
import {CartesianGrid, Label, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis} from 'recharts';
import Title from '../shared/Title';
import {FirebaseContext} from "../../firebase";

export default function Chart({
                                  data,
                                  ...props
                              }) {
    const theme = useTheme();
    const [dataProps, setDataProps] = React.useState(data);
// This will launch only if propName value has chaged.
    React.useEffect(() => { setDataProps(data) }, [data]);

    return (
        <React.Fragment>
            <Title>График зависимости отн. интенсивности волны от частоты</Title>
            <ResponsiveContainer>
                <LineChart
                    data={dataProps}
                    // height={300}
                    margin={{
                        top: 16,
                        right: 16,
                        bottom: 20,
                        left: 20,
                    }}
                >
                    <CartesianGrid strokeDasharray="3 3"/>
                    <XAxis dataKey="frequency" stroke={theme.palette.text.secondary}>
                        <Label value="Frequency, Hz" offset={0} position="bottom"/>
                    </XAxis>
                    <YAxis stroke={theme.palette.text.secondary} type="number" domain={[0, 1100]}>
                        <Label
                            angle={270}
                            position="left"
                            style={{textAnchor: 'middle', fill: theme.palette.text.primary}}
                        >
                            Relative amplitude
                        </Label>
                    </YAxis>
                    <Tooltip/>
                    <Line type="monotone" dataKey="amplitude" stroke={theme.palette.primary.main} activeDot={{r: 8}}/>
                </LineChart>
            </ResponsiveContainer>
        </React.Fragment>
    );
}
