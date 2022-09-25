import React, { useRef, useEffect } from "react";

export default function Paypal() {
  const paypal = useRef();
//sss
  useEffect(() => {
    window.paypal
      .Buttons({
        createOrder: (data, actions, err) => {
          return actions.order.create({
            intent: "CAPTURE",
            purchase_units: [
              {
                description: "Plan Mensual",
                amount: {
                  currency_code: "USD",
                  value: 30.0,
                },
              },
            ],
          });
        },
        onApprove: function (data, actions) {
          return actions.order.capture().then(function (details) {
              window.location.href = "approve.html";
          });
        },

        onCancel: function (data, actions) {
          window.location.replace("cancel.html")
        },
        onError: (err) => {
          return actions.order.capture().then(function (none) {
            window.location.href = "cancel.html";
        });
        },
      })
      .render(paypal.current);
  }, []);

  return (
    <div>
      <div ref={paypal}></div>
    </div>
  );
}