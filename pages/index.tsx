import React from 'react';
import { Navbar } from './components/navbar/Navbar';
import { LineChart } from './components/charts/LineChart';
import { TransactionList } from './components/listing/TransactionList';
import { AddTransaction } from './components/buttons/Buttons';
import { DeleteTransaction_Card } from './components/buttons/DeleteTransaction_Card';

export default function Home() {
    return (
        <div className="bg-white"  >
            {/* <Navbar/>
            <LineChart/>
            <TransactionList/>
            <AddTransaction/> */}
            <DeleteTransaction_Card/>
        </div>
    )
}
