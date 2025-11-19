'use client';

import { useState, useEffect } from 'react';
import { BarChart3, TrendingUp, TrendingDown, DollarSign, Calendar, Bell, AlertTriangle, CheckCircle2, XCircle, Clock, Zap, Activity } from 'lucide-react';
import Link from 'next/link';

interface Notification {
  id: string;
  type: 'warning' | 'success' | 'error' | 'info';
  title: string;
  message: string;
  timestamp: Date;
  read: boolean;
}

export default function Dashboard() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [showNotifications, setShowNotifications] = useState(false);

  // Simular dados do mes atual (em producao viria do estado global ou API)
  const monthData = {
    entradas: 15000,
    salidas: 3500,
    gastosFijos: 4000,
    impuestos: 2000,
    entradasTarjeta: 9000,
    entradasEfectivo: 6000,
    cuentasPendientes: 2500,
    cuentasVencidas: 800,
    balance: 3000
  };

  // Dados para graficos (ultimos 7 dias)
  const weekData = [
    { day: 'Lun', entradas: 2000, salidas: 500 },
    { day: 'Mar', entradas: 1800, salidas: 600 },
    { day: 'Mié', entradas: 2200, salidas: 450 },
    { day: 'Jue', entradas: 1900, salidas: 550 },
    { day: 'Vie', entradas: 2500, salidas: 700 },
    { day: 'Sáb', entradas: 2300, salidas: 400 },
    { day: 'Dom', entradas: 2300, salidas: 300 }
  ];

  const maxValue = Math.max(...weekData.map(d => Math.max(d.entradas, d.salidas)));

  // Generar notificaciones automaticas
  useEffect(() => {
    const newNotifications: Notification[] = [];

    // Alerta si balance es negativo
    if (monthData.balance < 0) {
      newNotifications.push({
        id: '1',
        type: 'error',
        title: 'Balance Negativo',
        message: `Tu balance actual es de $${monthData.balance.toFixed(2)}. Revisa tus gastos.`,
        timestamp: new Date(),
        read: false
      });
    }

    // Alerta si balance es positivo
    if (monthData.balance > 0) {
      newNotifications.push({
        id: '2',
        type: 'success',
        title: 'Balance Positivo',
        message: `¡Excelente! Tu balance es de $${monthData.balance.toFixed(2)}.`,
        timestamp: new Date(),
        read: false
      });
    }

    // Alerta si gastos fijos son altos
    if (monthData.gastosFijos > monthData.entradas * 0.3) {
      newNotifications.push({
        id: '3',
        type: 'warning',
        title: 'Gastos Fijos Elevados',
        message: `Tus gastos fijos ($${monthData.gastosFijos}) representan más del 30% de tus entradas.`,
        timestamp: new Date(),
        read: false
      });
    }

    // Alerta si impuestos son altos
    if (monthData.impuestos > monthData.entradas * 0.2) {
      newNotifications.push({
        id: '4',
        type: 'warning',
        title: 'Impuestos Elevados',
        message: `Tus impuestos ($${monthData.impuestos}) representan más del 20% de tus entradas.`,
        timestamp: new Date(),
        read: false
      });
    }

    // Alerta de cuentas vencidas
    if (monthData.cuentasVencidas > 0) {
      newNotifications.push({
        id: '5',
        type: 'error',
        title: 'Cuentas Vencidas',
        message: `Tienes $${monthData.cuentasVencidas.toFixed(2)} en cuentas vencidas. ¡Paga urgente!`,
        timestamp: new Date(),
        read: false
      });
    }

    // Alerta de cuentas pendientes altas
    if (monthData.cuentasPendientes > monthData.entradas * 0.25) {
      newNotifications.push({
        id: '6',
        type: 'warning',
        title: 'Cuentas Pendientes Elevadas',
        message: `Tienes $${monthData.cuentasPendientes.toFixed(2)} en cuentas pendientes (más del 25% de tus entradas).`,
        timestamp: new Date(),
        read: false
      });
    }

    // Recordatorio de fin de mes
    const today = new Date();
    const daysLeft = new Date(today.getFullYear(), today.getMonth() + 1, 0).getDate() - today.getDate();
    
    if (daysLeft <= 5) {
      newNotifications.push({
        id: '7',
        type: 'info',
        title: 'Fin de Mes Próximo',
        message: `Quedan ${daysLeft} días para finalizar el mes. Revisa tus pendientes y cuentas a pagar.`,
        timestamp: new Date(),
        read: false
      });
    }

    setNotifications(newNotifications);
  }, []);

  const markAsRead = (id: string) => {
    setNotifications(prev => 
      prev.map(notif => 
        notif.id === id ? { ...notif, read: true } : notif
      )
    );
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'warning':
        return <AlertTriangle className="w-6 h-6 text-amber-600" />;
      case 'success':
        return <CheckCircle2 className="w-6 h-6 text-emerald-600" />;
      case 'error':
        return <XCircle className="w-6 h-6 text-rose-600" />;
      default:
        return <Bell className="w-6 h-6 text-blue-600" />;
    }
  };

  const getNotificationColor = (type: string) => {
    switch (type) {
      case 'warning':
        return 'bg-amber-50 border-amber-200';
      case 'success':
        return 'bg-emerald-50 border-emerald-200';
      case 'error':
        return 'bg-rose-50 border-rose-200';
      default:
        return 'bg-blue-50 border-blue-200';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50 to-purple-50 p-4 sm:p-8">
      <div className="container mx-auto max-w-7xl">
        {/* Header Mejorado */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <div className="p-3 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-2xl shadow-xl">
                <Activity className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-5xl sm:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600">
                Dashboard
              </h1>
            </div>
            <p className="text-xl text-slate-600 font-medium">
              Análisis completo de tus finanzas
            </p>
          </div>

          {/* Botón de Notificaciones Mejorado */}
          <div className="relative">
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="relative p-4 rounded-2xl bg-white border-2 border-slate-200 hover:border-indigo-500 transition-all duration-300 shadow-xl hover:shadow-2xl hover:scale-110"
            >
              <Bell className="w-7 h-7 text-slate-700" />
              {unreadCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-gradient-to-r from-rose-500 to-rose-600 text-white text-xs font-black rounded-full w-7 h-7 flex items-center justify-center shadow-lg animate-pulse">
                  {unreadCount}
                </span>
              )}
            </button>

            {/* Panel de Notificaciones Mejorado */}
            {showNotifications && (
              <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white rounded-3xl shadow-2xl border-2 border-slate-200 z-50 max-h-96 overflow-y-auto">
                <div className="p-5 border-b-2 border-slate-200 bg-gradient-to-r from-indigo-50 to-purple-50">
                  <h3 className="text-xl font-black text-slate-800">Notificaciones</h3>
                </div>
                <div className="p-3">
                  {notifications.length > 0 ? (
                    notifications.map((notif) => (
                      <div
                        key={notif.id}
                        onClick={() => markAsRead(notif.id)}
                        className={`p-4 rounded-2xl mb-2 border-2 cursor-pointer transition-all duration-300 hover:shadow-lg hover:scale-105 ${
                          notif.read ? 'bg-slate-50 border-slate-200 opacity-60' : getNotificationColor(notif.type)
                        }`}
                      >
                        <div className="flex items-start gap-3">
                          {getNotificationIcon(notif.type)}
                          <div className="flex-1">
                            <h4 className="font-black text-slate-800 mb-1">{notif.title}</h4>
                            <p className="text-sm text-slate-600 font-medium">{notif.message}</p>
                            <p className="text-xs text-slate-400 mt-2 font-semibold">
                              {notif.timestamp.toLocaleTimeString()}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="text-center text-slate-500 py-8 font-medium">No hay notificaciones</p>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Botón Volver al Calendario Mejorado */}
        <div className="mb-6">
          <Link
            href="/"
            className="inline-flex items-center gap-3 px-8 py-4 bg-white rounded-2xl border-2 border-slate-200 hover:border-indigo-500 transition-all duration-300 shadow-xl hover:shadow-2xl font-bold text-slate-700 hover:scale-105"
          >
            <Calendar className="w-6 h-6" />
            Volver al Calendario
          </Link>
        </div>

        {/* Cards de Resumen Mejorados */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
          {/* Total Entradas */}
          <div className="bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-3xl p-6 border-2 border-emerald-300 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 hover:-translate-y-1">
            <div className="flex items-center justify-between mb-4">
              <TrendingUp className="w-10 h-10 text-white" />
              <span className="text-sm font-black text-white bg-white/20 px-3 py-1 rounded-full">+12%</span>
            </div>
            <h3 className="text-white font-bold mb-2 text-sm">Total Entradas</h3>
            <p className="text-4xl font-black text-white mb-3">${monthData.entradas.toFixed(2)}</p>
            <div className="text-sm text-white/90 font-semibold space-y-1">
              <p>💳 Tarjeta: ${monthData.entradasTarjeta.toFixed(2)}</p>
              <p>💵 Efectivo: ${monthData.entradasEfectivo.toFixed(2)}</p>
            </div>
          </div>

          {/* Total Salidas */}
          <div className="bg-gradient-to-br from-rose-400 to-rose-600 rounded-3xl p-6 border-2 border-rose-300 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 hover:-translate-y-1">
            <div className="flex items-center justify-between mb-4">
              <TrendingDown className="w-10 h-10 text-white" />
              <span className="text-sm font-black text-white bg-white/20 px-3 py-1 rounded-full">-5%</span>
            </div>
            <h3 className="text-white font-bold mb-2 text-sm">Salidas Diarias</h3>
            <p className="text-4xl font-black text-white mb-3">${monthData.salidas.toFixed(2)}</p>
            <p className="text-sm text-white/90 font-semibold">Gastos operativos del mes</p>
          </div>

          {/* Gastos Fijos */}
          <div className="bg-gradient-to-br from-purple-400 to-purple-600 rounded-3xl p-6 border-2 border-purple-300 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 hover:-translate-y-1">
            <div className="flex items-center justify-between mb-4">
              <DollarSign className="w-10 h-10 text-white" />
              <span className="text-sm font-black text-white bg-white/20 px-3 py-1 rounded-full">Fijos</span>
            </div>
            <h3 className="text-white font-bold mb-2 text-sm">Gastos Fijos</h3>
            <p className="text-4xl font-black text-white mb-3">${monthData.gastosFijos.toFixed(2)}</p>
            <p className="text-sm text-white/90 font-semibold">
              {((monthData.gastosFijos / monthData.entradas) * 100).toFixed(1)}% de entradas
            </p>
          </div>

          {/* Impuestos */}
          <div className="bg-gradient-to-br from-orange-400 to-orange-600 rounded-3xl p-6 border-2 border-orange-300 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 hover:-translate-y-1">
            <div className="flex items-center justify-between mb-4">
              <DollarSign className="w-10 h-10 text-white" />
              <span className="text-sm font-black text-white bg-white/20 px-3 py-1 rounded-full">Tax</span>
            </div>
            <h3 className="text-white font-bold mb-2 text-sm">Total Impuestos</h3>
            <p className="text-4xl font-black text-white mb-3">${monthData.impuestos.toFixed(2)}</p>
            <p className="text-sm text-white/90 font-semibold">
              {((monthData.impuestos / monthData.entradas) * 100).toFixed(1)}% de entradas
            </p>
          </div>

          {/* Cuentas a Pagar */}
          <div className="bg-gradient-to-br from-amber-400 to-amber-600 rounded-3xl p-6 border-2 border-amber-300 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 hover:-translate-y-1">
            <div className="flex items-center justify-between mb-4">
              <Clock className="w-10 h-10 text-white" />
              <span className="text-sm font-black text-white bg-white/20 px-3 py-1 rounded-full">⏰</span>
            </div>
            <h3 className="text-white font-bold mb-2 text-sm">Cuentas a Pagar</h3>
            <p className="text-4xl font-black text-white mb-3">${monthData.cuentasPendientes.toFixed(2)}</p>
            <div className="text-sm font-semibold space-y-1">
              <p className="text-white/90">Pendientes: ${monthData.cuentasPendientes.toFixed(2)}</p>
              {monthData.cuentasVencidas > 0 && (
                <p className="text-rose-200 font-black">⚠️ Vencidas: ${monthData.cuentasVencidas.toFixed(2)}</p>
              )}
            </div>
          </div>
        </div>

        {/* Gráfico de Barras Mejorado */}
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl p-6 sm:p-8 border-2 border-slate-200 mb-8 hover:shadow-3xl transition-all duration-300">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-3 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-2xl shadow-lg">
              <BarChart3 className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-3xl font-black text-slate-800">Movimientos de la Semana</h2>
          </div>

          <div className="space-y-4">
            {weekData.map((day, index) => (
              <div key={index} className="space-y-2">
                <div className="flex items-center justify-between text-sm font-bold text-slate-700">
                  <span className="text-lg">{day.day}</span>
                  <div className="flex gap-6">
                    <span className="text-emerald-600 flex items-center gap-1">
                      <TrendingUp className="w-4 h-4" />
                      +${day.entradas}
                    </span>
                    <span className="text-rose-600 flex items-center gap-1">
                      <TrendingDown className="w-4 h-4" />
                      -${day.salidas}
                    </span>
                  </div>
                </div>
                <div className="flex gap-2 h-10">
                  {/* Barra de Entradas */}
                  <div className="flex-1 bg-slate-100 rounded-xl overflow-hidden shadow-inner">
                    <div
                      className="h-full bg-gradient-to-r from-emerald-400 to-emerald-600 rounded-xl transition-all duration-500 shadow-lg"
                      style={{ width: `${(day.entradas / maxValue) * 100}%` }}
                    />
                  </div>
                  {/* Barra de Salidas */}
                  <div className="flex-1 bg-slate-100 rounded-xl overflow-hidden shadow-inner">
                    <div
                      className="h-full bg-gradient-to-r from-rose-400 to-rose-600 rounded-xl transition-all duration-500 shadow-lg"
                      style={{ width: `${(day.salidas / maxValue) * 100}%` }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Leyenda Mejorada */}
          <div className="flex justify-center gap-8 mt-6 pt-6 border-t-2 border-slate-200">
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 bg-gradient-to-r from-emerald-400 to-emerald-600 rounded-lg shadow-md"></div>
              <span className="text-sm font-bold text-slate-700">Entradas</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 bg-gradient-to-r from-rose-400 to-rose-600 rounded-lg shadow-md"></div>
              <span className="text-sm font-bold text-slate-700">Salidas</span>
            </div>
          </div>
        </div>

        {/* Balance Final Destacado Mejorado */}
        <div className={`rounded-3xl shadow-2xl p-10 border-2 hover:shadow-3xl transition-all duration-300 ${
          monthData.balance >= 0 
            ? 'bg-gradient-to-br from-indigo-400 to-indigo-600 border-indigo-300' 
            : 'bg-gradient-to-br from-rose-400 to-rose-600 border-rose-300'
        }`}>
          <div className="text-center">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Zap className="w-12 h-12 text-white" />
              <h2 className="text-3xl font-black text-white">Balance Final del Mes</h2>
            </div>
            <p className="text-7xl font-black mb-6 text-white drop-shadow-2xl">
              ${monthData.balance.toFixed(2)}
            </p>
            <p className="text-xl text-white font-bold mb-4 bg-white/20 inline-block px-6 py-3 rounded-2xl">
              {monthData.balance >= 0 
                ? '🎉 ¡Excelente gestión financiera!' 
                : '⚠️ Revisa tus gastos para mejorar el balance'}
            </p>
            {monthData.cuentasPendientes > 0 && (
              <div className="mt-6 p-5 bg-white/90 border-2 border-amber-300 rounded-2xl shadow-xl">
                <p className="text-amber-800 font-black text-lg">
                  ⚠️ Recuerda: Tienes ${monthData.cuentasPendientes.toFixed(2)} en cuentas pendientes de pago
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
