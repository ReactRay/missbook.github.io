export function AnimalList({ animalInfos }) { 

    const SearchAnimal = (type) => {
        return (
            <a 
                href={`https://www.google.com/search?q=${type}`} 
                target="_blank"   
                rel="noopener noreferrer"
                style={{ color:"blue", textDecoration: 'underline' }}
            >
                Search
            </a>
        );
    };

    return (
        <section className="animal">
            <h2>Animal List</h2>

            <table border="1" style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                <thead>
                    <tr>
                        <th>Type</th>
                        <th>Count</th>
                        <th>Search</th>
                    </tr>
                </thead>

                <tbody>
                    {animalInfos.map((animalInfo, index) => (
                        <tr key={`animal-${index}`}>
                            <td>{animalInfo.type}</td>
                            <td>{animalInfo.count}</td>
                            <td>
                                <SearchAnimal type={animalInfo.type}/>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </section>
    );
};

