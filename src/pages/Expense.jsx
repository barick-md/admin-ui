import React, { useEffect, useState, useContext } from 'react';
import MainLayout from '../component/Layouts/MainLayout';
import CircularProgress from '@mui/material/CircularProgress';
import { expenseService } from '../services/dataService';
import { AuthContext } from '../context/authContext';
import Icon from '../component/Elements/Icon';

// Mapping kategori ke icon
const CATEGORY_ICONS = {
  Housing: <Icon.House />,
  Food: <Icon.Food />,
  Transportation: <Icon.Transport />,
  Entertainment: <Icon.Gamepad />,
  Shopping: <Icon.Shopping />,
  Others: <Icon.Other />,
};

function Expense() {
  const [expenses, setExpenses] = useState(null); // null = belum load
  const { logout } = useContext(AuthContext);

  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        const data = await expenseService();
        // Jika API return array langsung atau dalam object, handle keduanya
        setExpenses(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("Gagal fetch expenses:", err);
        setExpenses([]); // set kosong agar tidak loading terus
        if (err.status === 401) logout();
      }
    };
    fetchExpenses();
  }, []);

  if (expenses === null) {
    return (
      <MainLayout>
        <div className="flex flex-col items-center justify-center h-96 text-primary">
          <CircularProgress color="inherit" size={50} />
          <span className="mt-3 text-gray-03">Loading Data</span>
        </div>
      </MainLayout>
    );
  }

  // Kelompokkan berdasarkan kategori
  const grouped = expenses.reduce((acc, item) => {
    const cat = item.category;
    if (!acc[cat]) {
      acc[cat] = {
        items: [],
        total: item.total ?? 0,
        percentage: item.percentage ?? 0,
        trend: item.trend ?? "down",
        icon: CATEGORY_ICONS[cat] ?? <Icon.Other />,
      };
    }
    acc[cat].items.push(item);
    return acc;
  }, {});

  return (
    <MainLayout>
      {/* Judul halaman */}
      <h2 className="text-2xl text-gray-02 mb-4">Expenses Comparison</h2>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {Object.keys(grouped).map((cat) => {
          const { items, total, percentage, trend, icon } = grouped[cat];
          const isUp = trend === "up";

          return (
            <div key={cat} className="bg-white rounded-lg shadow-md overflow-hidden">
              {/* Header kategori — mirip di soal */}
              <div className="flex items-center justify-between px-4 py-3 border-b border-gray-05">
                <div className="flex items-center gap-2">
                  <div className="bg-special-bg p-2 rounded-md text-gray-02">{icon}</div>
                  <div>
                    <div className="text-xs text-gray-03">{cat}</div>
                    <div className="font-bold text-lg">${total}</div>
                  </div>
                </div>
                <div className="text-xs flex items-center gap-1">
                  <span className={isUp ? "text-special-red" : "text-special-green"}>
                    {percentage}%
                  </span>
                  {isUp
                    ? <Icon.ArrowUp size={14} color="#e73d1c" />
                    : <Icon.ArrowDown size={14} color="#4daf6e" />
                  }
                </div>
              </div>
              {/* Sub-items */}
              <div className="px-4">
                {items.map((item) => (
                  <div
                    key={item.id}
                    className="flex justify-between py-3 border-b border-gray-05 last:border-0"
                  >
                    <span className="text-gray-02 text-sm">{item.name}</span>
                    <div className="text-right">
                      <div className="font-semibold text-sm">${item.amount}</div>
                      <div className="text-xs text-gray-03">{item.date}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </MainLayout>
  );
}

export default Expense;