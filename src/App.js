import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link, Navigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import man from './img/man.png';
import img1 from './img/img1.png';
import img2 from './img/img2.png';
import img3 from './img/img3.png';
import Navbar from './Navbar';
import Footer from './Footer';
import LoginModal from './LoginModal';
import Hero from './Hero';
import AboutUs from './AboutUs';
import Signup from './Signup';

// Constants for JSONBin storage
const JSON_BIN_URL = 'https://api.jsonbin.io/v3/b/66ef727cad19ca34f8aa66fe'; // Replace with your bin URL
const JSON_BIN_API_KEY = '66ef727cad19ca34f8aa66fe'; // Replace with your API key

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLoginForm, setShowLoginForm] = useState(false);
  const [currentAccountBalance, setCurrentAccountBalance] = useState(10000); // Initial balance for Current Account
  const [savingsAccountBalance, setSavingsAccountBalance] = useState(50000); // Initial balance for Savings Account
  const [transactions, setTransactions] = useState([]); // Transaction history

  useEffect(() => {
    // Fetch transaction history from JSONBin when the component mounts
    loadTransactionHistory();
  }, []);

  const handleLoginClick = () => {
    setShowLoginForm(true);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setIsLoggedIn(true);
    setShowLoginForm(false);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  const handleDeposit = (amount) => {
    setCurrentAccountBalance((prevBalance) => prevBalance + amount);
    addTransaction('Deposit', amount, 'current');
  };

  const handleWithdraw = (amount) => {
    if (amount <= currentAccountBalance) {
      setCurrentAccountBalance((prevBalance) => prevBalance - amount);
      addTransaction('Withdraw', amount, 'current');
    } else {
      alert("Insufficient funds");
    }
  };

  const handleTransferSubmit = (e, transferData) => {
    e.preventDefault();
    const amount = parseFloat(transferData.amount);

    if (transferData.accountType === 'current') {
      if (amount > currentAccountBalance) {
        alert('Insufficient balance in Current Account!');
      } else {
        setCurrentAccountBalance(currentAccountBalance - amount);
        addTransaction(`Transfer to ${transferData.recipient}`, amount, 'current');
        alert(`Transferred $${amount} from Current Account`);
      }
    } else if (transferData.accountType === 'savings') {
      if (amount > savingsAccountBalance) {
        alert('Insufficient balance in Savings Account!');
      } else {
        setSavingsAccountBalance(savingsAccountBalance - amount);
        addTransaction(`Transfer to ${transferData.recipient}`, amount, 'savings');
        alert(`Transferred $${amount} from Savings Account`);
      }
    }
  };

  const addTransaction = (type, amount, accountType) => {
    const newTransaction = {
      type,
      amount,
      accountType,
      date: new Date().toLocaleString(),
    };
    setTransactions((prevTransactions) => [...prevTransactions, newTransaction]);
    saveTransactionHistory([...transactions, newTransaction]);
  };

  // Save transaction history to JSONBin
  const saveTransactionHistory = async (newTransactions) => {
    const data = {
      currentAccount: {
        balance: currentAccountBalance,
        transactions: newTransactions.filter(tx => tx.accountType === 'current'),
      },
      savingsAccount: {
        balance: savingsAccountBalance,
        transactions: newTransactions.filter(tx => tx.accountType === 'savings'),
      }
    };

    try {
      await fetch('https://api.jsonbin.io/v3/b/66ef727cad19ca34f8aa66fe', {
        method: 'POST', // Use 'POST' if the bin is new
        headers: {
          'Content-Type': 'application/json',
          'X-Master-Key': '$2a$10$kxYVVA84ybCOb3kfMC3DRe3yLzbpkz3NRQgiys.4SsezG056wBJKO',
        },
        body: JSON.stringify(data),
      });
      console.log('Transaction history saved successfully.');
    } catch (error) {
      console.error('Error saving transaction history:', error);
    }
  };

  // Load transaction history from JSONBin
  const loadTransactionHistory = async () => {
    try {
      const response = await fetch('https://api.jsonbin.io/v3/b/66ef727cad19ca34f8aa66fe', {
        method: 'GET',
        headers: {
          'X-Master-Key': '$2a$10$kxYVVA84ybCOb3kfMC3DRe3yLzbpkz3NRQgiys.4SsezG056wBJKO',
        },
      });
      const json = await response.json();
      const data = json.record;

      // Set the loaded data to the state
      setCurrentAccountBalance(data.currentAccount.balance);
      setSavingsAccountBalance(data.savingsAccount.balance);
      const allTransactions = [
        ...data.currentAccount.transactions.map(tx => ({ ...tx, accountType: 'current' })),
        ...data.savingsAccount.transactions.map(tx => ({ ...tx, accountType: 'savings' })),
      ];
      setTransactions(allTransactions);
    } catch (error) {
      console.error('Error loading transaction history:', error);
    }
  };

  return (
    <Router>
      <div className="App">
        <Navbar isLoggedIn={isLoggedIn} onLoginClick={handleLoginClick} />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/personal" element={<Personal />} />
          <Route path="/business" element={<Business />} />
          <Route path="/wealth-management" element={<WealthManagement />} />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/Signup" element={<Signup />} />
          <Route
            path="/dashboard"
            element={
              isLoggedIn ? (
                <Dashboard
                  currentAccountBalance={currentAccountBalance}
                  savingsAccountBalance={savingsAccountBalance}
                  transactions={transactions}
                  onDeposit={handleDeposit}
                  onWithdraw={handleWithdraw}
                  onTransfer={handleTransferSubmit}
                  onLogout={handleLogout}
                />
              ) : (
                <Navigate to="/" />
              )
            }
          />
        </Routes>

        <LoginModal
          show={showLoginForm && !isLoggedIn}
          onClose={() => setShowLoginForm(false)}
          setIsLoggedIn={setIsLoggedIn}
        />

        <Footer />
      </div>
    </Router>
  );
};

// Example Home component
const Home = () => (
  <>
    <Hero
      title="Secure Your Future with National Bank"
      subtitle="Whether you’re saving, investing, or planning for the future, we’re here to help."
      backgroundImage={man}
      ctaText="Get Started"
      ctaLink="/personal"
    />

    <div className="container mt-4">
      <div className="row">
        <div className="col-md-4">
          <img src={img1} alt="Banking Icon" />
          <h4>Personal Banking</h4>
          <p>Manage your accounts, credit cards, loans, and more.</p>
        </div>
        <div className="col-md-4">
          <img src={img2} alt="Business Icon" />
          <h4>Business Banking</h4>
          <p>Business solutions to meet your company’s growing needs.</p>
        </div>
        <div className="col-md-4">
          <img src={img3} alt="Wealth Icon" />
          <h4>Wealth Management</h4>
          <p>Planning for your financial future starts today.</p>
        </div>
      </div>
    </div>
  </>
);

const Dashboard = ({ currentAccountBalance, savingsAccountBalance, transactions, onDeposit, onWithdraw, onTransfer, onLogout }) => {
  const [amount, setAmount] = useState(0);
  const [showTransferForm, setShowTransferForm] = useState(false);
  const [transferData, setTransferData] = useState({
    amount: '',
    recipient: '',
    accountType: 'current', // default to current account
  });

  const handleTransferChange = (e) => {
    const { name, value } = e.target;
    setTransferData({ ...transferData, [name]: value });
  };

  const handleDepositSubmit = (e) => {
    e.preventDefault();
    onDeposit(parseFloat(amount));
    setAmount(0); // Reset amount
  };

  const handleWithdrawSubmit = (e) => {
    e.preventDefault();
    onWithdraw(parseFloat(amount));
    setAmount(0); // Reset amount
  };

  const handleTransferSubmit = (e) => {
    e.preventDefault();
    onTransfer(e, transferData); // Call the transfer handler

    // Reset transfer form after submission
    setTransferData({
      amount: '0',
      recipient: '',
      accountType: 'current', // Reset to default account type
    });
  };

  return (
    <div className="container mt-5">
      <div className="d-flex justify-content-end">
        <button className="btn btn-danger" onClick={onLogout}>Logout</button>
      </div>

      <h3>Dashboard</h3>
      <h4>Current Account Balance: ${currentAccountBalance.toFixed(2)}</h4>
      <h4>Savings Account Balance: ${savingsAccountBalance.toFixed(2)}</h4>

      <form className="mt-4">
        <div className="form-group">
          <label htmlFor="amount">Amount</label>
          <input
            type="number"
            id="amount"
            value={amount}
            onChange={(e) => setAmount(parseFloat(e.target.value))}
            className="form-control"
          />
        </div>
        <button className="btn btn-primary mt-2" onClick={handleDepositSubmit}>
          Deposit
        </button>
        <button className="btn btn-secondary mt-2 ml-2" onClick={handleWithdrawSubmit}>
          Withdraw
        </button>
      </form>

      <div className="mt-4">
        <h5>Transaction History</h5>
        <ul className="list-group">
          {transactions.map((tx, index) => (
            <li key={index} className="list-group-item">
              {tx.date}: {tx.type} of ${tx.amount} from {tx.accountType} account
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-4">
        <button
          className="btn btn-info"
          onClick={() => setShowTransferForm(!showTransferForm)}
        >
          {showTransferForm ? 'Cancel Transfer' : 'Interac e-Money Transfer'}
        </button>

        {showTransferForm && (
          <form className="mt-3" onSubmit={handleTransferSubmit}>
            <div className="form-group">
              <label htmlFor="transferAmount">Transfer Amount</label>
              <input
                type="number"
                id="transferAmount"
                name="amount"
                value={transferData.amount}
                onChange={handleTransferChange}
                className="form-control"
              />
            </div>
            <div className="form-group">
              <label htmlFor="recipient">Recipient Email</label>
              <input
                type="email"
                id="recipient"
                name="recipient"
                value={transferData.recipient}
                onChange={handleTransferChange}
                className="form-control"
              />
            </div>
            <div className="form-group">
              <label>Account Type</label>
              <select
                name="accountType"
                value={transferData.accountType}
                onChange={handleTransferChange}
                className="form-control"
              >
                <option value="current">Current Account</option>
                <option value="savings">Savings Account</option>
              </select>
            </div>
            <button className="btn btn-primary mt-2" type="submit">
              Transfer
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
const Personal = () => <h1>Personal Banking Services</h1>;
const Business = () => <h1>Business Banking Services</h1>;
const WealthManagement = () => <h1>Wealth Management Services</h1>;


export default App;
