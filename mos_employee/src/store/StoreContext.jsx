import { createContext, useContext, useMemo, useReducer } from 'react';
import {
  initialEmployees,
  initialTables,
  initialOrders,
} from '../data/mockData';
import { makeId, nowLabel } from '../utils/helpers';

const StoreContext = createContext(null);

const initialState = {
  employees: initialEmployees,
  tables: initialTables,
  orders: initialOrders,
};

function reducer(state, action) {
  switch (action.type) {
    // --- 従業員 ---
    case 'ADD_EMPLOYEE':
      return {
        ...state,
        employees: [...state.employees, { ...action.employee, id: makeId('E') }],
      };

    case 'UPDATE_EMPLOYEE':
      return {
        ...state,
        employees: state.employees.map((emp) =>
          emp.id === action.id ? { ...emp, ...action.changes } : emp
        ),
      };

    case 'DELETE_EMPLOYEE':
      return {
        ...state,
        employees: state.employees.filter((emp) => emp.id !== action.id),
        // 削除した従業員の担当座席は解除
        tables: state.tables.map((table) =>
          table.assignedStaffId === action.id
            ? { ...table, assignedStaffId: null }
            : table
        ),
      };

    // --- 座席 ---
    case 'UPDATE_TABLE':
      return {
        ...state,
        tables: state.tables.map((table) =>
          table.id === action.id ? { ...table, ...action.changes } : table
        ),
      };

    case 'SEAT_TABLE':
      return {
        ...state,
        tables: state.tables.map((table) =>
          table.id === action.id
            ? {
                ...table,
                status: 'occupied',
                guests: action.guests,
                assignedStaffId: action.assignedStaffId,
                seatedAt: nowLabel(),
              }
            : table
        ),
      };

    case 'CLEAR_TABLE':
      return {
        ...state,
        tables: state.tables.map((table) =>
          table.id === action.id
            ? {
                ...table,
                status: 'empty',
                guests: 0,
                assignedStaffId: null,
                seatedAt: null,
              }
            : table
        ),
      };

    // --- 注文 ---
    case 'ADD_ORDER':
      return {
        ...state,
        orders: [
          {
            id: makeId('ORD'),
            tableId: action.tableId,
            status: 'received',
            createdAt: nowLabel(),
            items: action.items,
          },
          ...state.orders,
        ],
      };

    case 'SET_ORDER_STATUS':
      return {
        ...state,
        orders: state.orders.map((order) =>
          order.id === action.id ? { ...order, status: action.status } : order
        ),
      };

    case 'DELETE_ORDER':
      return {
        ...state,
        orders: state.orders.filter((order) => order.id !== action.id),
      };

    default:
      return state;
  }
}

export function StoreProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const value = useMemo(() => ({ ...state, dispatch }), [state]);
  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}

export function useStore() {
  const ctx = useContext(StoreContext);
  if (!ctx) {
    throw new Error('useStore は StoreProvider の中で使用してください');
  }
  return ctx;
}
