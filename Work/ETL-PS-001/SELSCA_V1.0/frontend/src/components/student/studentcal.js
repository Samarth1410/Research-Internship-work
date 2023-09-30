import React from 'react';
import { ResponsiveCalendar } from '@nivo/calendar';

const studentcal = () => {
  const data = [
    {
      day: '2015-03-01',
      value: 12
    },
    {
      day: '2015-03-02',
      value: 8
    },
    {
      day: '2015-03-03',
      value: 3
    },
    // Add more data here
  ];

  return (
    <ResponsiveCalendar
      data={data}
      from="2015-03-01"
      to="2015-03-31"
      emptyColor="#eeeeee"
      colors={['#61cdbb', '#97e3d5', '#e8c1a0', '#f47560']}
      margin={{ top: 40, right: 40, bottom: 40, left: 40 }}
      yearSpacing={40}
      monthBorderColor="#ffffff"
      dayBorderWidth={2}
      dayBorderColor="#ffffff"
      legends={[
        {
          anchor: 'bottom-right',
          direction: 'row',
          translateY: 36,
          itemCount: 4,
          itemWidth: 42,
          itemHeight: 36,
          itemsSpacing: 14,
          itemDirection: 'right-to-left'
        }
      ]}
    />
  );
};

export default studentcal;
 