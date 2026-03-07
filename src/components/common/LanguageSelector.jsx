import React from "react";
import ISO6391 from "iso-639-1";
import ReactCountryFlag from "react-country-flag";

const LanguageSelector = ({ closeModal }) => {

  const languages = ISO6391.getAllCodes();

  const selectLanguage = (code) => {
    localStorage.setItem("language", code);

    // future API
    // i18n.changeLanguage(code)

    closeModal();
  };

  return (
    <div className="language-overlay">

      <div className="language-modal">

        <div className="language-header">
          <h3>Select Language</h3>

          <button
            className="language-close"
            onClick={closeModal}
          >
            ✕
          </button>
        </div>

        <div className="language-list">

          {languages.map((code) => {

            const name = ISO6391.getName(code);

            return (
              <div
                key={code}
                className="language-row"
                onClick={() => selectLanguage(code)}
              >

                <ReactCountryFlag
                  countryCode="US"
                  svg
                  style={{ width: "20px", marginRight: "10px" }}
                />

                <span>{name}</span>

              </div>
            );
          })}

        </div>

      </div>

    </div>
  );
};

export default LanguageSelector;