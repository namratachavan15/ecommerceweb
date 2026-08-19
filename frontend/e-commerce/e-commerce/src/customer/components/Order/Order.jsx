import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import OrderCard from "./OrderCard";
import { getAllOrdersForUser } from "../../../state/Order/Action";

// ======================================================
// ORDER STATUS
// ======================================================

const orderStatus = [
  {
    label: "ALL",
    value: "",
  },
  {
    label: "PENDING",
    value: "PENDING",
  },
  {
    label: "PLACED",
    value: "PLACED",
  },
  {
    label: "CONFIRMED",
    value: "CONFIRMED",
  },
  {
    label: "SHIPPED",
    value: "SHIPPED",
  },
  {
    label: "DELIVERED",
    value: "DELIVERED",
  },
  {
    label: "CANCELED",
    value: "CANCELED",
  },
];

const Order = () => {
  const dispatch = useDispatch();

  const {
    orders = [],
    loading,
    error,
  } = useSelector((store) => store.order);

  const [selectedStatus, setSelectedStatus] = useState("");

  // ======================================================
  // LOAD ORDERS
  // ======================================================

  useEffect(() => {
    dispatch(getAllOrdersForUser(selectedStatus));
  }, [dispatch, selectedStatus]);

  // ======================================================
  // STATUS CHANGE
  // ======================================================

  const handleStatusChange = (status) => {
    console.log("Selected status:", status);
    setSelectedStatus(status);
  };

  return (
    <div className="px-5 lg:px-20 mt-10 bg-ink-900 min-h-screen pb-16">

      {/* ==================================================
          MAIN LAYOUT
          LEFT  = FILTER
          RIGHT = ORDERS
      ================================================== */}

      <div className="flex flex-col lg:flex-row gap-6 items-start">

        {/* ==================================================
            LEFT SIDE - FILTER
        ================================================== */}

        <aside className="w-full lg:w-[260px] lg:flex-shrink-0">

          <div
            className="
              w-full
              bg-ink-600
              border
              border-white/10
              rounded-xl
              p-6
              lg:sticky
              lg:top-20
            "
          >

            {/* Filter Title */}

            <h1
              className="
                font-display
                font-bold
                text-lg
                text-white
              "
            >
              Filter
            </h1>

            {/* Order Status */}

            <div className="mt-6">

              <h2
                className="
                  font-mono-tech
                  text-xs
                  uppercase
                  tracking-widest
                  text-volt-400
                  mb-5
                "
              >
                Order Status
              </h2>

              <div className="space-y-4">

                {orderStatus.map((option) => (

                  <div
                    key={option.label}
                    className="flex items-center"
                  >

                    <input
                      type="radio"
                      name="orderStatus"
                      id={`status-${option.label}`}
                      value={option.value}
                      checked={
                        selectedStatus === option.value
                      }
                      onChange={() =>
                        handleStatusChange(option.value)
                      }
                      className="
                        h-4
                        w-4
                        rounded-full
                        border-white/20
                        bg-transparent
                        text-volt-500
                        focus:ring-volt-500
                        cursor-pointer
                      "
                    />

                    <label
                      htmlFor={`status-${option.label}`}
                      className="
                        ml-3
                        text-sm
                        text-ink-100
                        cursor-pointer
                        hover:text-white
                        transition-colors
                      "
                    >
                      {option.label}
                    </label>

                  </div>

                ))}

              </div>

            </div>

          </div>

        </aside>

        {/* ==================================================
            RIGHT SIDE - ORDERS
        ================================================== */}

        <main className="w-full lg:flex-1 min-w-0">

          <div className="space-y-5">

            {/* Header */}

            <div className="flex items-center justify-between">

              <h1
                className="
                  text-xl
                  font-display
                  font-bold
                  text-white
                "
              >
                My Orders
              </h1>

              <p className="text-sm text-ink-200">
                {orders.length}{" "}
                {orders.length === 1
                  ? "Order"
                  : "Orders"}
              </p>

            </div>

            {/* ==================================================
                LOADING
            ================================================== */}

            {loading && (

              <div
                className="
                  bg-ink-600
                  border
                  border-white/10
                  rounded-xl
                  p-8
                  text-center
                "
              >

                <p className="text-ink-200">
                  Loading orders...
                </p>

              </div>

            )}

            {/* ==================================================
                ERROR
            ================================================== */}

            {!loading && error && (

              <div
                className="
                  bg-red-500/10
                  border
                  border-red-500/20
                  rounded-xl
                  p-5
                "
              >

                <p className="text-red-400">
                  {error}
                </p>

              </div>

            )}

            {/* ==================================================
                ORDERS
            ================================================== */}

            {!loading &&
              !error &&
              orders.length > 0 && (

                <div className="space-y-5">

                  {orders.map((order) => (

                    <OrderCard
                      key={order.id}
                      order={order}
                    />

                  ))}

                </div>

              )}

            {/* ==================================================
                NO ORDERS
            ================================================== */}

            {!loading &&
              !error &&
              orders.length === 0 && (

                <div
                  className="
                    bg-ink-600
                    border
                    border-white/10
                    rounded-xl
                    p-8
                    text-center
                  "
                >

                  <p className="text-ink-200">

                    {selectedStatus
                      ? `No ${selectedStatus.toLowerCase()} orders found.`
                      : "No orders found."
                    }

                  </p>

                </div>

              )}

          </div>

        </main>

      </div>

    </div>
  );
};

export default Order;