const { useState, useEffect } = React;

export function SeasonClock() { 

    const getCurrentSeason = () => {
        const month = new Date().getMonth();

        if (month >= 2 && month <= 4) return 'Spring';
        if (month >= 5 && month <= 7) return 'Summer';
        if (month >= 8 && month <= 10) return 'Autumn';
        return 'Winter';
    };

    const getCurrentMonthName = () => {
        const months = [
        'January', 'February', 'March', 'April', 'May', 'June', 
        'July', 'August', 'September', 'October', 'November', 'December'
        ];

        return months[new Date().getMonth()];
    };
    
    const getCurrentDayName = () => {
        const days = [
        'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'
        ];
        return days[new Date().getDay()];
    };
    
    const season = getCurrentSeason();
    const monthName = getCurrentMonthName();
    const dayName = getCurrentDayName();

    const [isDark, setIsDark] = useState(false);
    const [clock, setClock] = useState('00:00:00');

    useEffect(() => {
        const updateClock = () => {
            const now = new Date();
            const hours = String(now.getHours()).padStart(2, '0');
            const minutes = String(now.getMinutes()).padStart(2, '0');
            const seconds = String(now.getSeconds()).padStart(2, '0');
            setClock(`${hours}:${minutes}:${seconds}`);
        };

        const intervalId = setInterval(updateClock, 1000);

        return () => {
            clearInterval(intervalId);
        };
    }, []);

    return (
        <section className="seasons">
            <h2>Season Clock</h2>

            <article className={`season-card ${isDark && 'dark'}`} onClick={()=> setIsDark(prev=>!prev)}>
                <p>{monthName}({season})</p>
                <img src={`/assets/img/season-imgs/${season}.png`} className="season-img"/>
                <p>{dayName}</p>
            </article>

            <p>Clock: {clock}</p>
        </section>
    );
};

