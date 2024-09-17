/*servicesData.forEach(service => {
    // Create a div element for each service
    const serviceDiv = document.createElement('div');
    serviceDiv.classList.add('service');

    // Create heading for service name
    const heading = document.createElement('h2');
    heading.textContent = service.name;

    // Create paragraph for service description
    const description = document.createElement('p');
    description.textContent = service.description;

    // Append heading and description to service div
    serviceDiv.appendChild(heading);
    serviceDiv.appendChild(description);

    // Append service div to container
    container.appendChild(serviceDiv);
}); */
// scripts.js
document.getElementById('vetcare-btn').addEventListener('click', async () => {
    try {
        const response = await fetch('/vetcare');
        const services = await response.json();
        displayServices(services);
    } catch (err) {
        console.error('Error fetching services:', err);
    }
});

function displayServices(services) {
    const container = document.getElementById('container');
    container.innerHTML = ''; // Clear previous content

    services.forEach(service => {
        const serviceDiv = document.createElement('div');
        serviceDiv.classList.add('service');

        const heading = document.createElement('h2');
        heading.textContent = service.title;

        const city=document.createElement('p');
        city.textContent=service.city;

        const state=document.createElement('p');
        state.textContent=service.state;
        
        const description = document.createElement('p');
        description.textContent = service.description;

        const address=document.createElement('h5');
        address.textContent=service.address;

        const charge_per_session=document.createElement('h3');
        charge_per_session.textContent=service.charge_per_session;

        const contact=document.createElement('h3');
        contact.textContent=service.contact;

        serviceDiv.appendChild(heading);
        serviceDiv.appendChild(city);
        serviceDiv.appendChild(state);
        serviceDiv.appendChild(description);
        serviceDiv.appendChild(address);
        serviceDiv.appendChild(charge_per_session);
        serviceDiv.appendChild(contact);


        container.appendChild(serviceDiv);
    });
}
