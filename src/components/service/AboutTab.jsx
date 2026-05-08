const AboutTab = ({ service }) => {
  const about = service?.about || {};

  const hasContent = service?.name || service?.role || service?.experience ||
    about.language || about.education || about.description || about.religion || about.status;

  if (!hasContent) {
    return (
      <div className="about-tab" style={{ textAlign: "center", padding: "40px 20px", color: "#888" }}>
        <p style={{ fontSize: "16px", fontWeight: "500" }}>About content coming soon</p>
        <p style={{ fontSize: "13px", marginTop: "8px" }}>Check back later for more details.</p>
      </div>
    );
  }

  return (
    <div className="about-tab">
      {service?.name && <p><b>Name:</b> {service.name}</p>}
      {service?.role && <p><b>Role:</b> {service.role}</p>}
      {about.language && <p><b>Language:</b> {about.language}</p>}
      {about.education && <p><b>Education:</b> {about.education}</p>}
      {service?.experience && <p><b>Experience:</b> {service.experience}</p>}
      {about.description && <p><b>Description:</b> {about.description}</p>}
      {about.religion && <p><b>Religion:</b> {about.religion}</p>}
      {about.status && <p><b>Status:</b> {about.status}</p>}
    </div>
  );
};

export default AboutTab;   // 👈 YE LINE MUST HAI
