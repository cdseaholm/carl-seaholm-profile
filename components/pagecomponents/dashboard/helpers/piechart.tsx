import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';
import React, { useEffect, useState, PureComponent } from 'react';
import { IHobby } from '@/models/types/hobby';

export default function PieChartView({hobbies}: { hobbies: IHobby[] | null}) {

    const [totalTime, setTotalTime] = useState<number>(0);
    const [data, setData] = useState<any[]>([]);
    const [colors, setColors] = useState<string[]>([]);

    useEffect(() => {
        const setColorMap = async () => {
            if (hobbies && hobbies.length > 0) {
                let newColors = [];
                for (let i = 0; i < hobbies.length; i++) {
                    newColors.push(hobbies[i].color);
                }
                setColors(newColors);
            } else {
                setColors(['#0088FE', '#00C49F', '#FFBB28', '#FF8042']);
            }
        }
        setColorMap();
    }, [hobbies]);

    useEffect(() => {
        if (hobbies) {
            const timeH = hobbies.map(hobby => hobby.minutesXsessions).flat();
            const time = timeH.reduce((a, b) => a + parseInt(b), 0);
            setTotalTime(time);
        }
    }, [hobbies]);

    useEffect(() => {
        if (hobbies && totalTime > 0) {
            const newData = hobbies.map(hobby => {
                return {
                    name: hobby.title,
                    value: hobby.minutesXsessions.reduce((a, b) => a + parseInt(b), 0) / totalTime * 100
                }
            });
            setData(newData);
        }
    }, [hobbies, totalTime]);

    if (hobbies === null) {
        return (
            <div>
                No hobbies to display
            </div>
        )
    }

    return (
        <ResponsiveContainer width="100%" height="100%">
            <PieChart width={400} height={400}>
                <Pie
                    dataKey="value"
                    isAnimationActive={true}
                    data={data}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    innerRadius={20}
                />
                {
                    data.map((entry, index) => 
                        <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                    )
                }
                <Tooltip />
            </PieChart>
        </ResponsiveContainer>
    );
  }