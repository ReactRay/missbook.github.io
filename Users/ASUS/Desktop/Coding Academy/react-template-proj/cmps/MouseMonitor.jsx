const { useState, useEffect } = React;

export function MouseMonitor() {
    const [mouse, setMouse] = useState({x: 0, y: 0, isOn: true});

    function onToggleMonitor() {
        setMouse((prev) => ({ ...prev, isOn: !prev.isOn }));
    };

    function updatePos(event) {
        setMouse((prev) => ({
            ...prev,
            x: event.clientX,
            y: event.clientY,
        }));
    };

    useEffect(() => {
        if (mouse.isOn) {
            document.addEventListener('mousemove', updatePos);
        }

        return () => {
            document.removeEventListener('mousemove', updatePos);
        };
    }, [mouse.isOn]);

    return (
        <section className="home">
            <h2>Mouse Monitor</h2>

            <p>X: {mouse.x}</p>
            <p>Y: {mouse.y}</p>
            <button onClick={onToggleMonitor}>
                {mouse.isOn ? 'Stop Monitoring' : 'Start Monitoring'}
            </button>
        </section>
    );
};

