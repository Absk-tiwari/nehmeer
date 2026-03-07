import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { serviceData } from "../data/serviceData";
import ServiceCard from "../service/ServiceCard";

const Favourites = () => {

const navigate = useNavigate();

/* Dummy favourite ids (Later API will provide this) */

const [favourites] = useState([1, 3, 5]);

/* Filter favourite services */

const favouriteServices = serviceData.filter(service =>
favourites.includes(service.id)
);

return (

<div className="app-shell">

<div className="service-list">

{/* HEADER */}

<div className="service-header">

<div className="header-top">

<button
className="back-btn"
onClick={() => navigate(-1)}
>
←
</button>

<h2>Favourites</h2>

</div>

</div>

{/* SERVICE LIST */}

{favouriteServices.length > 0 ? (

favouriteServices.map((service) => (

<ServiceCard
key={service.id}
service={service}
onClick={() =>
navigate(`/services/${service.type}/${service.id}`)
}
/>

))

) : (

<div className="no-favourites">
No favourite services yet
</div>

)}

</div>

</div>

);

};

export default Favourites;