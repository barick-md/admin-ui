import React, {useContext, useEffect, useState} from 'react';
import MainLayout from '../component/Layouts/MainLayout';
import Card from '../component/Elements/Card';
import CardBalance from '../component/Fragments/CardBalance';
import CardGoal from '../component/Fragments/CardGoal';
import CardUpcomingBill from '../component/Fragments/CardUpcomingBill';
import CardRecentTransaction from '../component/Fragments/CardRecentTransaction';
import CardStatistic from '../component/Fragments/CardStatistic';
import CardExpensesBreakdown from '../component/Fragments/CardExpensesBreakdown';
import { transactions, bills, expensesBreakdowns, balances, goals, expensesStatistics } from '../data';
import { goalService } from '../services/dataService';
import { AuthContext } from '../context/authContext';
import Snackbar from "@mui/material/Snackbar";

function Dashboard() {
	const [goals, setGoals] = useState({});

    const fetchGoals = async () => {
        try {
        const data = await goalService();
        setGoals(data);
        } catch (err) {
        console.error("Gagal mengambil data goals:", err);
        if (err.status === 401) {
            logout();
        }
        }
    };

    useEffect(() => {
        fetchGoals();
    }, []);

    return (
        <>
            <MainLayout>
                <div className="grid sm:grid-cols-12 gap-6">
                    <div className="sm:col-span-4">
                        <CardBalance data={balances}/>
                    </div>
                    <div className="sm:col-span-4">
                        <CardGoal data={goals}/>
                    </div>
                    <div className="sm:col-span-4">
                        <CardUpcomingBill data={bills}/>
                    </div>
                    <div className="sm:col-span-4 sm:row-span-2">
                        <CardRecentTransaction data={transactions}/>
                    </div>
                    <div className="sm:col-span-8">
                        <CardStatistic data={expensesStatistics}/>
                    </div>
                    <div className="sm:col-span-8">
                        <CardExpensesBreakdown data={expensesBreakdowns}/>
                    </div>
                </div>
        </MainLayout>
        </>
    )
}

export default Dashboard