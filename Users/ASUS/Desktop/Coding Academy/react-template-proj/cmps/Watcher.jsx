const { useState, useEffect } = React;
import { watcherService } from '../services/watcher.service.js';

export function Watcher() {
    const [watchers, setWatchers] = useState([]);
    const [movies, setMovies] = useState([]);
    const [selectedWatcher, setSelectedWatcher] = useState(null);

    async function fetchWatchers() {
        try{
            setWatchers(await watcherService.query());
        }catch(err){
            console.error('error fetch watchers: ', err);
            setWatchers([]);
        }
    };

    async function onAddWatcher() {
        const fullname = prompt("Enter the name of the watcher:");
        if (!fullname) return;

        const moviesInput = prompt("Enter the movies (comma-separated):");
        const movies = moviesInput ? moviesInput.split(',').map(movie => movie.trim()) : [];

        let src = prompt("Enter img (1-3):");
        if (!src || (+src) < 0 || (+src) > 3) return;
        src = `/assets/img/user-imgs/user${+src}.png`;
    
        let newWatcher = { fullname, movies, src };

        try {
            newWatcher = await watcherService.save(newWatcher);
            setWatchers([...watchers, newWatcher]);
        } catch (err) {
            console.error('Error adding watcher:', err);
        }
    };

    async function onRemoveWatcher(watcherId) {
        try{
            await watcherService.remove(watcherId);
            setWatchers(watchers.filter(watcher => watcher.id !== watcherId));     
        }
        catch(err){
            console.error('error remove watcher: ', err);
        }
    };

    async function FetchMoviesToSelectedWatcher(watcherId) {
        try{
            setMovies(await watcherService.get(watcherId).movies);
        }
        catch(err){
            console.error('error fetch watcher: ', err);
            setMovies([]);
        }
    };

    async function onSelectWatcher(watcherId) {
        setSelectedWatcher(watcherId);
        FetchMoviesToSelectedWatcher(watcherId);
    };

    function handleCloseModalMovies() {
        setSelectedWatcher(null);
    };

    useEffect(() => {
        fetchWatchers();
    }, []);
    
    return (
        <section className="watcher">
            <h2>Watcher</h2>

            <article className="watcher-container">
                <button className="btn-add" onClick={onAddWatcher}>Add Watcher</button>

                <div className="watcher-content">
                    {watchers.map(watcher => (
                        <div className={`watcher-card ${selectedWatcher === watcher.id && 'selected'}`} key={watcher.id}>
                            <img src={watcher.src} alt="audu" className="watcher-img"/>
                            <p>{watcher.fullname}</p>
                            <p>--------------</p>
                            <div>
                                <button onClick={() => onRemoveWatcher(watcher.id)}>X</button>
                                <button onClick={() => onSelectWatcher(watcher.id)}>Select</button>
                            </div>
                        </div>
                    ))}
                </div>
                
                {
                    selectedWatcher && (
                    <div className="modal-movies">
                        <ul>
                            {movies.map((movie, index) => (
                                <li key={index}>{movie}</li>
                            ))}
                        </ul>
    
                        <button className='close-modal' onClick={handleCloseModalMovies}>X</button>
                    </div>
                    )
                }
            </article>
        </section>
    );
};

