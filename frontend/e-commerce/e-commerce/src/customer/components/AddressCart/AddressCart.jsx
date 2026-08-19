import React from 'react';

const AddressCart = ({ address }) => {

  if (!address) {
    return (
      <div className="text-ink-100 text-sm">
        No address available
      </div>
    );
  }

  return (
    <div>

      <div className="space-y-3">

        <p className="font-semibold text-white">
          {address.firstName || ""} {address.lastName || ""}
        </p>

        <p className="text-ink-100 text-sm">
          {address.state || ""},
          {address.streetAddress || ""},
          {address.zipCode || ""}
        </p>

        <div className="space-y-1">

          <p className="font-semibold text-volt-400 text-xs font-mono-tech uppercase">
            Phone Number
          </p>

          <p className="text-ink-100 text-sm">
            {address.mobile || ""}
          </p>

        </div>

      </div>

    </div>
  );
};

export default AddressCart;