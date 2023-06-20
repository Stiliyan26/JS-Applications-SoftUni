async function getInfo() {
    const busStopInp = document.getElementById('stopId');
    const stopNameElement = document.getElementById('stopName');
    const timeTableElement = document.getElementById('buses');

    const url = `http://localhost:3030/jsonstore/bus/businfo/${busStopInp.value}`;

    try {
        timeTableElement.replaceChildren();
        
        const res = await fetch(url);

        if (res.status != 200){
            throw new Error('Invalid bus id');
        }

        const data = await res.json();

        stopNameElement.textContent = data.name;
        console.log(data);

        Object.entries(data.buses)
            .forEach(bus => {
                const[busID, timeLeft] = bus;
                const liEl = document.createElement('li');
                liEl.textContent = `Bus ${busID} arrives in ${timeLeft} minutes`;

                timeTableElement.appendChild(liEl);
            })
    }
    catch(error){
        stopNameElement.textContent = `Error`;
    }

}