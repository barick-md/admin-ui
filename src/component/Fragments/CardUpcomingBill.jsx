import React from "react";
import Card from "../Elements/Card";
import CircularProgress from "@mui/material/CircularProgress";
import Icon from "../Elements/Icon";

// Mapping nama bill ke icon — sesuaikan dengan data yang datang dari API
const BILL_ICONS = {
  "Figma": <Icon.Figma size={20} />,
  "Figma - Yearly Plan": <Icon.Figma size={20} />,
  "Adobe": <Icon.Adobe size={20} />,
  "Adobe Inc - Yearly Plan": <Icon.Adobe size={20} />,
};

function CardUpcomingBill({ data, loading }) {

  const content = loading ? (
    <div className="flex flex-col justify-center items-center h-full text-primary">
      <CircularProgress color="inherit" size={50} enableTrackSlot />
    </div>
  ) : (
    <div className="flex flex-col justify-around h-full">
      {data.map((item) => {
        // Cari icon berdasarkan nama — fallback ke Bill icon
        const icon = BILL_ICONS[item.name] ?? <Icon.Bill size={20} />;

        // Support key dari data lokal maupun API
        const month = item.month ?? item.due_month ?? "";
        const date = item.date ?? item.due_date ?? "";
        const lastCharge = item.lastCharge ?? item.last_charge ?? "";

        return (
          <div key={item.id} className="flex justify-between pt-3 pb-3">
            <div className="flex items-start">
              {/* Tanggal */}
              <div className="bg-special-bg px-3 py-2 rounded-lg flex flex-col items-center min-w-[48px]">
                <span className="text-xs">{month}</span>
                <span className="text-2xl font-bold leading-none">{date}</span>
              </div>
              {/* Info bill */}
              <div className="ms-4">
                {icon}
                <span className="font-bold block">{item.name}</span>
                <span className="text-xs text-gray-03">Last Charge - {lastCharge}</span>
              </div>
            </div>
            {/* Amount */}
            <div className="flex items-center">
              <span className="py-2 px-4 border border-gray-05 rounded-lg font-bold">
                ${item.amount}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );

  return <Card title="Upcoming Bill" link="/bill" desc={content} />;
}

export default CardUpcomingBill;