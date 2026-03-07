const SalaryTab = ({ service }) => {
  return (
    <div className="salary-tab">

      <div className="salary-card">
        <h4>Part time</h4>
        <p className="price">
          Starting from: {service.salary.partTime.price}
        </p>

        <h5>Availability</h5>
        {service.salary.partTime.slots.map((t) => (
          <p key={t}>{t}</p>
        ))}
      </div>

      <div className="salary-card">
        <h4>Full time</h4>
        <p className="price">
          Starting from: {service.salary.fullTime.price}
        </p>

        <h5>Availability</h5>
        {service.salary.fullTime.slots.map((t) => (
          <p key={t}>{t}</p>
        ))}
      </div>

    </div>
  );
};

export default SalaryTab;
