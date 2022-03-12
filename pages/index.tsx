import React from 'react';
import { Navbar } from './components/navbar/Navbar';
import { LineChart } from './components/charts/LineChart';
import { TransactionList } from './components/listing/TransactionList';
import { AddTransaction } from './components/buttons/Buttons';



import { Line } from 'react-chartjs-2';


export default function Home() {
    return (
        <div className="bg-white"  >
            <Navbar/>
            <LineChart/>
            <TransactionList/>
            <AddTransaction/>
        </div>
    )
}
