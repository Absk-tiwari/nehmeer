const AboutTab = ({ service }) => {
  const about = service?.about || {};

  return (
    <div className="about-tab">
      <p><b>Name:</b> {service?.name}</p>
      <p><b>Role:</b> {service?.role}</p>
      <p><b>Language:</b> {about.language}</p>
      <p><b>Education:</b> {about.education}</p>
      <p><b>Experience:</b> {service?.experience}</p>
      <p><b>Description:</b> {about.description}</p>
      <p><b>Religion:</b> {about.religion}</p>
      <p><b>Status:</b> {about.status}</p>
    </div>
  );
};

export default AboutTab;   // 👈 YE LINE MUST HAI
