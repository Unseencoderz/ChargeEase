// src/pages/WalletPage.tsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  CreditCard,
  Plus,
  ArrowUpRight,
  ArrowDownLeft,
  DollarSign,
  Calendar,
  Filter,
  Download,
  Eye,
  EyeOff,
  Zap,
  Car,
  Gift,
  TrendingUp,
  Wallet,
  Shield,
  Clock,
  CheckCircle,
  AlertCircle,
  Search
} from 'lucide-react';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';

const WalletPage: React.FC = () => {
  const [showBalance, setShowBalance] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedPeriod, setSelectedPeriod] = useState('30d');

  // Mock data - replace with actual API data
  const walletData = {
    balance: 247.85,
    pendingBalance: 15.50,
    totalSpent: 1847.32,
    totalSaved: 234.67,
    currency: 'USD',
    lastUpdated: new Date(),
  };

  const paymentMethods = [
    {
      id: '1',
      type: 'credit',
      brand: 'Visa',
      last4: '4242',
      expiry: '12/25',
      isDefault: true,
      nickname: 'Personal Card'
    },
    {
      id: '2',
      type: 'credit',
      brand: 'Mastercard',
      last4: '8888',
      expiry: '09/26',
      isDefault: false,
      nickname: 'Business Card'
    },
    {
      id: '3',
      type: 'bank',
      brand: 'Bank Account',
      last4: '1234',
      bankName: 'Chase Bank',
      isDefault: false,
      nickname: 'Checking Account'
    }
  ];

  const transactions = [
    {
      id: '1',
      type: 'charge',
      amount: -25.50,
      description: 'Supercharger - Downtown SF',
      location: 'San Francisco, CA',
      date: new Date('2024-01-15T14:30:00'),
      status: 'completed',
      energy: '45.2 kWh',
      duration: '35 min'
    },
    {
      id: '2',
      type: 'topup',
      amount: 100.00,
      description: 'Wallet Top-up',
      paymentMethod: 'Visa •••• 4242',
      date: new Date('2024-01-14T09:15:00'),
      status: 'completed'
    },
    {
      id: '3',
      type: 'charge',
      amount: -18.75,
      description: 'EVgo Fast Charging',
      location: 'Palo Alto, CA',
      date: new Date('2024-01-13T16:45:00'),
      status: 'completed',
      energy: '32.1 kWh',
      duration: '28 min'
    },
    {
      id: '4',
      type: 'refund',
      amount: 12.25,
      description: 'Refund - Charging session cancelled',
      location: 'San Jose, CA',
      date: new Date('2024-01-12T11:20:00'),
      status: 'completed'
    },
    {
      id: '5',
      type: 'charge',
      amount: -31.80,
      description: 'ChargePoint Network',
      location: 'Mountain View, CA',
      date: new Date('2024-01-11T19:10:00'),
      status: 'pending',
      energy: '52.3 kWh',
      duration: '42 min'
    }
  ];

  const stats = [
    {
      icon: DollarSign,
      label: 'Total Spent',
      value: `$${walletData.totalSpent.toFixed(2)}`,
      change: '+12%',
      color: 'from-red-500 to-pink-500'
    },
    {
      icon: TrendingUp,
      label: 'Money Saved',
      value: `$${walletData.totalSaved.toFixed(2)}`,
      change: '+18%',
      color: 'from-green-500 to-emerald-500'
    },
    {
      icon: Zap,
      label: 'Avg. Cost/kWh',
      value: '$0.32',
      change: '-5%',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      icon: Clock,
      label: 'Avg. Session',
      value: '38 min',
      change: '+3%',
      color: 'from-purple-500 to-pink-500'
    }
  ];

  const getTransactionIcon = (type: string, status: string) => {
    if (status === 'pending') return AlertCircle;
    switch (type) {
      case 'charge': return ArrowDownLeft;
      case 'topup': return ArrowUpRight;
      case 'refund': return ArrowUpRight;
      default: return CheckCircle;
    }
  };

  const getTransactionColor = (type: string, status: string) => {
    if (status === 'pending') return 'text-yellow-400';
    switch (type) {
      case 'charge': return 'text-red-400';
      case 'topup': case 'refund': return 'text-green-400';
      default: return 'text-blue-400';
    }
  };

  const tabs = [
    { id: 'overview', label: 'Overview', icon: Wallet },
    { id: 'transactions', label: 'Transactions', icon: Calendar },
    { id: 'methods', label: 'Payment Methods', icon: CreditCard },
    { id: 'settings', label: 'Settings', icon: Shield },
  ];

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-white mb-2">Wallet</h1>
              <p className="text-gray-400">Manage your charging payments and balance</p>
            </div>
            <Button variant="gradient" leftIcon={<Plus className="w-4 h-4" />}>
              Add Funds
            </Button>
          </div>
        </motion.div>

        {/* Balance Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8"
        >
          {/* Main Balance */}
          <div className="lg:col-span-2">
            <div className="glass-card p-8 h-full">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center">
                    <Wallet className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h2 className="text-lg font-semibold text-white">Available Balance</h2>
                    <p className="text-sm text-gray-400">Ready for charging</p>
                  </div>
                </div>
                <button
                  onClick={() => setShowBalance(!showBalance)}
                  className="p-2 text-gray-400 hover:text-white transition-colors"
                >
                  {showBalance ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              
              <div className="mb-4">
                <div className="text-4xl font-bold text-white mb-2">
                  {showBalance ? `$${walletData.balance.toFixed(2)}` : '••••••'}
                </div>
                {walletData.pendingBalance > 0 && (
                  <div className="text-sm text-yellow-400">
                    +${walletData.pendingBalance.toFixed(2)} pending
                  </div>
                )}
              </div>

              <div className="flex space-x-3">
                <Button variant="gradient" size="sm" leftIcon={<Plus className="w-4 h-4" />}>
                  Add Funds
                </Button>
                <Button variant="ghost" size="sm" leftIcon={<Download className="w-4 h-4" />}>
                  Export
                </Button>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="space-y-4">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full glass-card p-6 text-left"
            >
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg flex items-center justify-center">
                  <Car className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="font-semibold text-white">Auto Top-up</p>
                  <p className="text-sm text-gray-400">When balance < $25</p>
                </div>
              </div>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full glass-card p-6 text-left"
            >
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                  <Gift className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="font-semibold text-white">Referral Bonus</p>
                  <p className="text-sm text-gray-400">Invite friends</p>
                </div>
              </div>
            </motion.button>
          </div>
        </motion.div>

        {/* Stats Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 + index * 0.1 }}
              whileHover={{ scale: 1.02, y: -2 }}
              className="glass-card p-6"
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`w-10 h-10 rounded-lg bg-gradient-to-r ${stat.color} p-2.5`}>
                  <stat.icon className="w-5 h-5 text-white" />
                </div>
                <div className={`flex items-center space-x-1 text-sm ${
                  stat.change.startsWith('+') ? 'text-green-400' : 'text-red-400'
                }`}>
                  <TrendingUp className="w-4 h-4" />
                  <span>{stat.change}</span>
                </div>
              </div>
              <div className="text-xl font-bold text-white mb-1">{stat.value}</div>
              <div className="text-sm text-gray-400">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar Navigation */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="lg:col-span-1"
          >
            <div className="glass-card p-6">
              <nav className="space-y-2">
                {tabs.map((tab) => (
                  <motion.button
                    key={tab.id}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-left transition-all duration-300 ${
                      activeTab === tab.id
                        ? 'bg-gradient-to-r from-blue-500/20 to-purple-500/20 text-white border border-blue-500/30'
                        : 'text-gray-400 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    <tab.icon className="w-5 h-5" />
                    <span className="font-medium">{tab.label}</span>
                  </motion.button>
                ))}
              </nav>
            </div>
          </motion.div>

          {/* Main Content */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="lg:col-span-3"
          >
            <div className="glass-card p-8">
              {activeTab === 'overview' && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h2 className="text-2xl font-bold text-white">Recent Activity</h2>
                    <div className="flex space-x-2">
                      <select 
                        value={selectedPeriod}
                        onChange={(e) => setSelectedPeriod(e.target.value)}
                        className="bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-blue-500"
                      >
                        <option value="7d">Last 7 days</option>
                        <option value="30d">Last 30 days</option>
                        <option value="90d">Last 90 days</option>
                      </select>
                      <Button variant="ghost" size="sm" leftIcon={<Filter className="w-4 h-4" />}>
                        Filter
                      </Button>
                    </div>
                  </div>

                  <div className="space-y-3">
                    {transactions.slice(0, 5).map((transaction) => {
                      const Icon = getTransactionIcon(transaction.type, transaction.status);
                      const colorClass = getTransactionColor(transaction.type, transaction.status);
                      
                      return (
                        <motion.div
                          key={transaction.id}
                          whileHover={{ scale: 1.01 }}
                          className="flex items-center justify-between p-4 bg-white/5 rounded-xl hover:bg-white/10 transition-colors cursor-pointer"
                        >
                          <div className="flex items-center space-x-4">
                            <div className={`w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center ${colorClass}`}>
                              <Icon className="w-5 h-5" />
                            </div>
                            <div>
                              <p className="font-medium text-white">{transaction.description}</p>
                              <div className="flex items-center space-x-2 text-sm text-gray-400">
                                <span>{transaction.date.toLocaleDateString()}</span>
                                {transaction.location && (
                                  <>
                                    <span>•</span>
                                    <span>{transaction.location}</span>
                                  </>
                                )}
                                {transaction.energy && (
                                  <>
                                    <span>•</span>
                                    <span>{transaction.energy}</span>
                                  </>
                                )}
                              </div>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className={`font-semibold ${
                              transaction.amount > 0 ? 'text-green-400' : 'text-white'
                            }`}>
                              {transaction.amount > 0 ? '+' : ''}${Math.abs(transaction.amount).toFixed(2)}
                            </p>
                            <p className={`text-sm capitalize ${
                              transaction.status === 'completed' ? 'text-green-400' :
                              transaction.status === 'pending' ? 'text-yellow-400' : 'text-gray-400'
                            }`}>
                              {transaction.status}
                            </p>
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>

                  <Button variant="ghost" fullWidth>
                    View All Transactions
                  </Button>
                </div>
              )}

              {activeTab === 'transactions' && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h2 className="text-2xl font-bold text-white">Transaction History</h2>
                    <Button variant="ghost" leftIcon={<Download className="w-4 h-4" />}>
                      Export CSV
                    </Button>
                  </div>

                  {/* Search and Filters */}
                  <div className="flex flex-col sm:flex-row gap-4">
                    <div className="relative flex-1">
                      <Input
                        placeholder="Search transactions..."
                        className="pl-12"
                      />
                      <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    </div>
                    <select className="bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500">
                      <option value="">All Types</option>
                      <option value="charge">Charging</option>
                      <option value="topup">Top-ups</option>
                      <option value="refund">Refunds</option>
                    </select>
                    <select className="bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500">
                      <option value="">All Status</option>
                      <option value="completed">Completed</option>
                      <option value="pending">Pending</option>
                      <option value="failed">Failed</option>
                    </select>
                  </div>

                  {/* Transactions List */}
                  <div className="space-y-3">
                    {transactions.map((transaction) => {
                      const Icon = getTransactionIcon(transaction.type, transaction.status);
                      const colorClass = getTransactionColor(transaction.type, transaction.status);
                      
                      return (
                        <motion.div
                          key={transaction.id}
                          whileHover={{ scale: 1.01 }}
                          className="flex items-center justify-between p-4 bg-white/5 rounded-xl hover:bg-white/10 transition-colors cursor-pointer"
                        >
                          <div className="flex items-center space-x-4">
                            <div className={`w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center ${colorClass}`}>
                              <Icon className="w-5 h-5" />
                            </div>
                            <div>
                              <p className="font-medium text-white">{transaction.description}</p>
                              <div className="flex items-center space-x-2 text-sm text-gray-400">
                                <span>{transaction.date.toLocaleDateString()} at {transaction.date.toLocaleTimeString()}</span>
                                {transaction.location && (
                                  <>
                                    <span>•</span>
                                    <span>{transaction.location}</span>
                                  </>
                                )}
                              </div>
                              {(transaction.energy || transaction.duration) && (
                                <div className="flex items-center space-x-2 text-xs text-gray-500 mt-1">
                                  {transaction.energy && <span>{transaction.energy}</span>}
                                  {transaction.duration && (
                                    <>
                                      {transaction.energy && <span>•</span>}
                                      <span>{transaction.duration}</span>
                                    </>
                                  )}
                                </div>
                              )}
                            </div>
                          </div>
                          <div className="text-right">
                            <p className={`font-semibold ${
                              transaction.amount > 0 ? 'text-green-400' : 'text-white'
                            }`}>
                              {transaction.amount > 0 ? '+' : ''}${Math.abs(transaction.amount).toFixed(2)}
                            </p>
                            <p className={`text-sm capitalize ${
                              transaction.status === 'completed' ? 'text-green-400' :
                              transaction.status === 'pending' ? 'text-yellow-400' : 'text-gray-400'
                            }`}>
                              {transaction.status}
                            </p>
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>
                </div>
              )}

              {activeTab === 'methods' && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h2 className="text-2xl font-bold text-white">Payment Methods</h2>
                    <Button variant="gradient" leftIcon={<Plus className="w-4 h-4" />}>
                      Add Payment Method
                    </Button>
                  </div>

                  <div className="space-y-4">
                    {paymentMethods.map((method) => (
                      <motion.div
                        key={method.id}
                        whileHover={{ scale: 1.01 }}
                        className="p-6 bg-white/5 rounded-xl hover:bg-white/10 transition-colors"
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-4">
                            <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl flex items-center justify-center">
                              <CreditCard className="w-6 h-6 text-white" />
                            </div>
                            <div>
                              <div className="flex items-center space-x-2">
                                <p className="font-semibold text-white">
                                  {method.type === 'bank' ? method.bankName : method.brand} •••• {method.last4}
                                </p>
                                {method.isDefault && (
                                  <span className="px-2 py-1 text-xs bg-blue-500/20 text-blue-400 rounded-full">
                                    Default
                                  </span>
                                )}
                              </div>
                              <p className="text-sm text-gray-400">
                                {method.nickname}
                                {method.expiry && ` • Expires ${method.expiry}`}
                              </p>
                            </div>
                          </div>
                          <div className="flex space-x-2">
                            <Button variant="ghost" size="sm">
                              Edit
                            </Button>
                            {!method.isDefault && (
                              <Button variant="ghost" size="sm">
                                Remove
                              </Button>
                            )}
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'settings' && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold text-white">Wallet Settings</h2>
                  
                  <div className="space-y-6">
                    <div className="glass-card p-6">
                      <h3 className="font-semibold text-white mb-4">Auto Top-up</h3>
                      <div className="space-y-4">
                        <label className="flex items-center justify-between">
                          <div>
                            <p className="text-white font-medium">Enable Auto Top-up</p>
                            <p className="text-gray-400 text-sm">Automatically add funds when balance is low</p>
                          </div>
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input type="checkbox" className="sr-only peer" defaultChecked />
                            <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-500"></div>
                          </label>
                        </label>
                        
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">
                              Trigger Amount
                            </label>
                            <Input defaultValue="25.00" />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">
                              Top-up Amount
                            </label>
                            <Input defaultValue="100.00" />
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="glass-card p-6">
                      <h3 className="font-semibold text-white mb-4">Notifications</h3>
                      <div className="space-y-4">
                        {[
                          { label: 'Low balance alerts', description: 'Get notified when balance is low' },
                          { label: 'Transaction confirmations', description: 'Receive confirmation for each transaction' },
                          { label: 'Monthly statements', description: 'Get monthly spending summaries' },
                          { label: 'Promotional offers', description: 'Receive exclusive wallet offers' },
                        ].map((item, index) => (
                          <label key={index} className="flex items-center justify-between">
                            <div>
                              <p className="text-white font-medium">{item.label}</p>
                              <p className="text-gray-400 text-sm">{item.description}</p>
                            </div>
                            <label className="relative inline-flex items-center cursor-pointer">
                              <input type="checkbox" className="sr-only peer" defaultChecked={index < 2} />
                              <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-500"></div>
                            </label>
                          </label>
                        ))}
                      </div>
                    </div>

                    <div className="glass-card p-6">
                      <h3 className="font-semibold text-white mb-4">Security</h3>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-white font-medium">Transaction PIN</p>
                            <p className="text-gray-400 text-sm">Require PIN for transactions above $50</p>
                          </div>
                          <Button variant="ghost" size="sm">
                            Set PIN
                          </Button>
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-white font-medium">Spending Limits</p>
                            <p className="text-gray-400 text-sm">Set daily and monthly spending limits</p>
                          </div>
                          <Button variant="ghost" size="sm">
                            Configure
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default WalletPage;