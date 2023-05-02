import { Console } from "console";
import { FunctionComponent, useState } from "react";
import Reactcalender from 'react-calendar';
import { date } from "zod";

import { add, format } from "date-fns"
import { da } from "date-fns/locale";



interface Datatype {
    justDate: Date | null;
    dateTime: Date | null;
}



interface indexProps {

}

const index: FunctionComponent<indexProps> = () => {

    const [date, setDate] = useState<Datatype>({ justDate: null, dateTime: null })


    const gettime = () => {

        if (!date.justDate) { return }

        const { justDate } = date;

        const beginning = add(justDate, { hours: 12 })

        const end = add(justDate, { hours: 18 })

        const interval = 30;

        const times = [];

        for (let i = beginning; i <= end; i = add(i, { minutes: interval })) {

            times.push(i);
        }

        return times;
    }

    const times = gettime();
    return (
        <div className="flex h-screen flex-col items-center justify-center">
            {date.justDate ? (<div className="flex gap-4">{times?.map((time, i) => (<div key={'time-${i}'} className="rounded-sm bg-gray-100 p-2">
                <button type="button" onClick={() => setDate((prev) => ({ ...prev, dateTime: time }))}> {format(time, 'kk:mm')}</button></div>))}
            </div>) :
                <Reactcalender minDate={new Date()}
                    className='REACT-CALENDAR p-2' view='month' onClickDay={(date) => {
                        return setDate((prev) => ({ ...prev, justDate: date }));
                    }} />
            }</div>);
}

export default index;