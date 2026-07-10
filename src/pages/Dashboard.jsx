import React, { useContext, useEffect, useState } from 'react';
import MainLayout from '../component/Layouts/MainLayout';
import Card from '../component/Elements/Card';
import CardBalance from '../component/Fragments/CardBalance';
import CardGoal from '../component/Fragments/CardGoal';
import CardUpcomingBill from '../component/Fragments/CardUpcomingBill';
import CardRecentTransaction from '../component/Fragments/CardRecentTransaction';
import CardStatistic from '../component/Fragments/CardStatistic';
import CardExpensesBreakdown from '../component/Fragments/CardExpensesBreakdown';
import { transactions, expensesBreakdowns, balances, expensesStatistics } from '../data';
import { goalService, billService } from '../services/dataService';
import { AuthContext } from '../context/authContext';

function Dashboard() {
  const [goalsData, setGoalsData] = useState({});
  const [billsData, setBillsData] = useState([]);
  const { logout } = useContext(AuthContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const goal = await goalService();
        setGoalsData(goal);
      } catch (err) {
        console.error("Gagal mengambil data goals:", err);
        if (err.status === 401) logout();
      }

      try {
        const bills = await billService();
        setBillsData(bills);
      } catch (err) {
        console.error("Gagal mengambil data bills:", err);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      <MainLayout>
        <div className="grid sm:grid-cols-12 gap-6">
          <div className="sm:col-span-4">
            <CardBalance data={balances} />
          </div>
          <div className="sm:col-span-4">
            <CardGoal data={goalsData} />
          </div>
          <div className="sm:col-span-4">
            <CardUpcomingBill data={billsData} loading={billsData.length === 0} />
          </div>
          <div className="sm:col-span-4 sm:row-span-2">
            <CardRecentTransaction data={transactions} />
          </div>
          <div className="sm:col-span-8">
            <CardStatistic data={expensesStatistics} />
          </div>
          <div className="sm:col-span-8">
            <CardExpensesBreakdown data={expensesBreakdowns} />
          </div>
        </div>
      </MainLayout>
    </>
  );
}

export default Dashboard;
