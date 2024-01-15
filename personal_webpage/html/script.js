const ipAddressInput = document.getElementById("ipAddress");
let ipAddress = ipAddressInput.value.trim() || "192.168.2.57"; // Default IP address

const services = [
    {
        id: "portainer",
        name: "Portainer",
        logoUrl: "https://cdn.worldvectorlogo.com/logos/portainer.svg",
        link: `https://${ipAddress}:9443`,
        port: "9443"
    },
    {
        id: "hass",
        name: "Home Assistant",
        logoUrl: "https://upload.wikimedia.org/wikipedia/en/4/49/Home_Assistant_logo_%282023%29.svg",
        link: `http://${ipAddress}:8123`,
        port: "8123"
    },
    {
        id: "grafana",
        name: "Grafana",
        logoUrl: "https://cdn.icon-icons.com/icons2/2699/PNG/512/grafana_logo_icon_171048.png",
        link: `http://${ipAddress}:3000`,
        port: "3000"
    },
    {
        id: "prom",
        name: "Prometheus",
        logoUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/38/Prometheus_software_logo.svg/2066px-Prometheus_software_logo.svg.png",
        link: `http://${ipAddress}:9090`,
        port: "9090"
    },
    {
        id: "pihole",
        name: "Pi-Hole",
        logoUrl: "https://upload.wikimedia.org/wikipedia/commons/0/00/Pi-hole_Logo.png",
        link: `http://${ipAddress}/admin`,
        port: "Admin"
    }
];

function openLink(url) {
    window.open(url, '_blank');
}

function createServiceElement(service) {
    const wrapper = document.createElement("div");
    wrapper.classList.add("box");
    wrapper.id = service.id;
    wrapper.onclick = () => openLink(service.link);

    const logoContainer = document.createElement("div");
    logoContainer.classList.add("logo-container");

    const logo = document.createElement("img");
    logo.classList.add("logo");
    logo.src = service.logoUrl;
    logo.alt = `${service.name} Logo`;

    logoContainer.appendChild(logo);

    const nameContainer = document.createElement("div");
    nameContainer.classList.add("name-container");
    nameContainer.textContent = service.name;

    const portContainer = document.createElement("div");
    portContainer.classList.add("port-container");
    portContainer.textContent = service.port;

    wrapper.appendChild(logoContainer);
    wrapper.appendChild(nameContainer);
    wrapper.appendChild(portContainer);

    return wrapper;
}

document.addEventListener("DOMContentLoaded", function () {
    const hubWrapper = document.querySelector(".wrapper");

    services.forEach(service => {
        const serviceElement = createServiceElement(service);
        hubWrapper.appendChild(serviceElement);
    });
});

// Update IP address when the user clicks the "Update" button
function updateIPAddress() {
    const newIPAddress = ipAddressInput.value.trim();
    
    if (newIPAddress !== "") {
        ipAddress = newIPAddress;

        // Update services with the new IP address
        services.forEach(service => {
            // Preserve the existing protocol (http or https) in the link
            const protocol = service.link.startsWith('https') ? 'https' : 'http';
            
            // Only update the IP address part of the link
            const path = service.port === "Admin" ? "/admin" : `:${service.port}`;
            service.link = `${protocol}://${ipAddress}${path}`;
            
            // Update the displayed port text (if needed)
            const portContainer = document.getElementById(service.id);
            if (portContainer) {
                portContainer.querySelector(".port-container").textContent = service.port;
            }
        });
    } else {
        alert("Please enter a valid IP address.");
    }
}

document.getElementById("updateButton").addEventListener("click", updateIPAddress);

function refreshServiceElements() {
    const hubWrapper = document.querySelector(".wrapper");
    hubWrapper.innerHTML = ""; // Clear the existing elements

    services.forEach(service => {
        const serviceElement = createServiceElement(service);
        hubWrapper.appendChild(serviceElement);
    });
}