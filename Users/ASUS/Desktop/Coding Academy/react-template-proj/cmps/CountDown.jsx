const { useState, useEffect, useRef, forwardRef } = React;

function CountDown(props, ref) {
    const now = Date.now();
    const { toTime, startFrom, onDone } = props;
    const [time, setTime] = useState(toTime ? toTime - now : startFrom * 1000);
    const intervalId = useRef();

    function convertTimestampToStrTime(timestamp) {
        let hours = parseInt(timestamp / 3600000) + '';
        timestamp %= 3600000;
        let minutes = parseInt(timestamp / 60000) + '';
        timestamp = timestamp % 60000;
        let seconds = parseInt(timestamp / 1000) + '';
    
        hours = hours.padStart(2, '0');
        minutes = minutes.padStart(2, '0');
        seconds = seconds.padStart(2, '0');
    
        return `${hours}:${minutes}:${seconds}`;
    };

    useEffect(() => {
        intervalId.current = setInterval(() => {
            setTime(prev => prev - 1000);
        }, 1000);

        return () => {
            clearInterval(intervalId.current);
        };
    }, []);

    useEffect(() => {
        if (time < 0) {
            clearInterval(intervalId.current);
            onDone();
            setTime(0);
        }
    }, [time]);

    const Warn = time <= 6000 ? 'warn' : ''; 

    return (
        <section className="count">
            <h2>Count Down</h2>

            <article ref={ref} className={`count-card ${Warn}`}>
                {time > 0 ? convertTimestampToStrTime(time) : '🎉'}          
            </article>
        </section>
    );
};

export default forwardRef(CountDown);


