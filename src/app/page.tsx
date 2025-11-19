'use client';

import { useState } from 'react';

export default function Home() {
  const [balance, setBalance] = useState(0);
  const [amount, setAmount] = useState('');
  const [transactions, setTransactions] = useState<Array<{
    type: string;
    amount: number;
    date: string;
  }>>([]);

  const addIncome = () => {
    const value = parseFloat(amount);
    if (!value || value <= 0) return;
    
    setBalance(balance + value);
    setTransactions([{ type: 'Ingreso', amount: value, date: new Date().toLocaleString('es-ES') }, ...transactions]);
    setAmount('');
  };

  const addExpense = () => {
    const value = parseFloat(amount);
    if (!value || value <= 0) return;
    
    setBalance(balance - value);
    setTransactions([{ type: 'Gasto', amount: value, date: new Date().toLocaleString('es-ES') }, ...transactions]);
    setAmount('');
  };

  return (
    <div style={{ 
      minHeight: '100vh', 
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      padding: '20px',
      fontFamily: 'system-ui, -apple-system, sans-serif'
    }}>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '30px' }}>
          <h1 style={{ 
            fontSize: '48px', 
            fontWeight: 'bold', 
            color: 'white',
            marginBottom: '10px',
            textShadow: '2px 2px 4px rgba(0,0,0,0.3)'
          }}>
            💰 FinanceFlow Pro
          </h1>
          <p style={{ fontSize: '20px', color: 'rgba(255,255,255,0.9)' }}>
            Control Financiero Simple
          </p>
        </div>

        {/* Balance Card */}
        <div style={{ 
          background: 'white', 
          borderRadius: '20px', 
          padding: '40px',
          marginBottom: '30px',
          boxShadow: '0 10px 40px rgba(0,0,0,0.2)'
        }}>
          <p style={{ 
            textAlign: 'center', 
            fontSize: '18px', 
            color: '#666',
            marginBottom: '10px',
            fontWeight: '600'
          }}>
            Balance Total
          </p>
          <p style={{ 
            textAlign: 'center', 
            fontSize: '56px', 
            fontWeight: 'bold',
            color: balance >= 0 ? '#10b981' : '#ef4444',
            margin: '0'
          }}>
            ${balance.toFixed(2)}
          </p>
        </div>

        {/* Input Card */}
        <div style={{ 
          background: 'white', 
          borderRadius: '20px', 
          padding: '30px',
          marginBottom: '30px',
          boxShadow: '0 10px 40px rgba(0,0,0,0.2)'
        }}>
          <h2 style={{ 
            fontSize: '24px', 
            fontWeight: 'bold', 
            marginBottom: '20px',
            color: '#333'
          }}>
            Nueva Transacción
          </h2>
          
          <input
            type="number"
            placeholder="Ingresa el monto"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            style={{
              width: '100%',
              padding: '15px',
              fontSize: '18px',
              borderRadius: '10px',
              border: '2px solid #e5e7eb',
              marginBottom: '15px',
              boxSizing: 'border-box'
            }}
          />

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
            <button
              onClick={addIncome}
              style={{
                padding: '15px',
                fontSize: '18px',
                fontWeight: 'bold',
                color: 'white',
                background: 'linear-gradient(135deg, #10b981, #059669)',
                border: 'none',
                borderRadius: '10px',
                cursor: 'pointer',
                boxShadow: '0 4px 15px rgba(16, 185, 129, 0.4)',
                transition: 'transform 0.2s'
              }}
              onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
              onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
            >
              ➕ Ingreso
            </button>

            <button
              onClick={addExpense}
              style={{
                padding: '15px',
                fontSize: '18px',
                fontWeight: 'bold',
                color: 'white',
                background: 'linear-gradient(135deg, #ef4444, #dc2626)',
                border: 'none',
                borderRadius: '10px',
                cursor: 'pointer',
                boxShadow: '0 4px 15px rgba(239, 68, 68, 0.4)',
                transition: 'transform 0.2s'
              }}
              onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
              onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
            >
              ➖ Gasto
            </button>
          </div>
        </div>

        {/* Transactions List */}
        <div style={{ 
          background: 'white', 
          borderRadius: '20px', 
          padding: '30px',
          boxShadow: '0 10px 40px rgba(0,0,0,0.2)'
        }}>
          <h2 style={{ 
            fontSize: '24px', 
            fontWeight: 'bold', 
            marginBottom: '20px',
            color: '#333'
          }}>
            Historial
          </h2>
          
          {transactions.length > 0 ? (
            <div style={{ maxHeight: '400px', overflowY: 'auto' }}>
              {transactions.map((t, i) => (
                <div
                  key={i}
                  style={{
                    padding: '15px',
                    marginBottom: '10px',
                    borderRadius: '10px',
                    background: t.type === 'Ingreso' ? '#f0fdf4' : '#fef2f2',
                    border: `2px solid ${t.type === 'Ingreso' ? '#10b981' : '#ef4444'}`,
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                  }}
                >
                  <div>
                    <p style={{ fontWeight: 'bold', fontSize: '18px', margin: '0 0 5px 0' }}>
                      {t.type}
                    </p>
                    <p style={{ fontSize: '14px', color: '#666', margin: '0' }}>
                      {t.date}
                    </p>
                  </div>
                  <p style={{ 
                    fontSize: '24px', 
                    fontWeight: 'bold',
                    color: t.type === 'Ingreso' ? '#10b981' : '#ef4444',
                    margin: '0'
                  }}>
                    {t.type === 'Ingreso' ? '+' : '-'}${t.amount.toFixed(2)}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <p style={{ textAlign: 'center', color: '#999', padding: '40px 0' }}>
              No hay transacciones aún
            </p>
          )}
        </div>

        {/* Footer */}
        <div style={{ textAlign: 'center', marginTop: '30px' }}>
          <p style={{ color: 'white', fontSize: '16px' }}>
            ✨ Aplicación funcionando correctamente
          </p>
        </div>
      </div>
    </div>
  );
}
