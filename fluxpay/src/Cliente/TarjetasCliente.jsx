import React from 'react';
import Cards from 'react-credit-cards-2';
import 'react-credit-cards-2/dist/es/styles-compiled.css';

const getBrandNumber = (brand) => {
  if (!brand) return "000000000000";

  if (brand === "visa") return "400000000000";
  if (brand === "mastercard") return "500000000000";
  if (brand === "amex") return "300000000000";

  return "000000000000";
};

const TarjetasCliente = ({ number, expiry, name, focused, brand }) => {

  const last4 = number ? number.slice(-4) : "";

  const base = getBrandNumber(brand);
  const fakeNumber = last4 ? base + last4 : "";

  return (
    <div>
      <Cards
        number={fakeNumber}
        expiry={expiry || ""}
        cvc=""
        name={name || ""}
        focused={focused || ""}
        issuer={brand} 
      />
    </div>
  );
};

export default TarjetasCliente;