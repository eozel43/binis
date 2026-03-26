
import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';

const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899', '#6366f1'];

export function CardTypePie({ data, title = "Kart Tipi Dağılımı", description = "Kullanılan kart türlerine göre oranlar", largeLegend = false }) {
    const total = React.useMemo(() => data.reduce((acc, curr) => acc + curr.value, 0), [data]);

    return (
        <div className="rounded-xl border bg-card text-card-foreground shadow flex flex-col h-[450px]">
            <div className="p-6 pb-4 flex flex-col space-y-1.5 shrink-0">
                <h3 className="font-semibold leading-none tracking-tight">{title}</h3>
                <p className="text-sm text-muted-foreground">{description}</p>
            </div>
            <div className="p-0 flex-1 min-h-0">
                <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                        {/* 3D Alt Katman (Derinlik) */}
                        <Pie
                            data={data}
                            cx="50%"
                            cy="45%"
                            innerRadius={70}
                            outerRadius={90}
                            paddingAngle={4}
                            dataKey="value"
                            nameKey="name"
                            stroke="none"
                            isAnimationActive={false}
                            legendType="none"
                            tooltipType="none"
                        >
                            {data.map((entry, index) => (
                                <Cell 
                                    key={`cell-depth-${index}`} 
                                    fill={COLORS[index % COLORS.length]} 
                                    style={{ filter: 'brightness(0.5) drop-shadow(0px 6px 4px rgba(0,0,0,0.4))' }} 
                                />
                            ))}
                        </Pie>
                        {/* 3D Üst Katman */}
                        <Pie
                            data={data}
                            cx="50%"
                            cy="43%"
                            innerRadius={70}
                            outerRadius={90}
                            paddingAngle={4}
                            dataKey="value"
                            nameKey="name"
                            stroke="none"
                        >
                            {data.map((entry, index) => (
                                <Cell 
                                    key={`cell-${index}`} 
                                    fill={COLORS[index % COLORS.length]} 
                                    style={{ filter: 'drop-shadow(0px -1px 1px rgba(255,255,255,0.3)) drop-shadow(0px 2px 2px rgba(0,0,0,0.2))' }}
                                />
                            ))}
                        </Pie>
                        <Tooltip
                            contentStyle={{
                                backgroundColor: 'hsl(var(--popover))',
                                borderColor: 'hsl(var(--border))',
                                color: 'hsl(var(--popover-foreground))',
                                borderRadius: '0.5rem',
                                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                            }}
                            itemStyle={{ color: 'hsl(var(--popover-foreground))', fontSize: '13px' }}
                            formatter={(value, name) => [
                                `%${(total > 0 ? (value / total) * 100 : 0).toFixed(1)} (${new Intl.NumberFormat('tr-TR').format(value)} Biniş)`,
                                name
                            ]}
                        />
                        <Legend
                            payload={data.map((entry, index) => ({
                                id: entry.name,
                                type: 'circle',
                                value: entry.name,
                                color: COLORS[index % COLORS.length]
                            }))}
                            verticalAlign="bottom"
                            align="center"
                            layout="horizontal"
                            height={110}
                            iconType="circle"
                            iconSize={largeLegend ? 12 : 8}
                            wrapperStyle={{
                                fontSize: largeLegend ? '14px' : '11px',
                                lineHeight: largeLegend ? '20px' : '16px',
                                paddingTop: '10px'
                            }}
                        />
                    </PieChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}
