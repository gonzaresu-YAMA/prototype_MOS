import { ATTENDANCE, ORDER_STATUS, ROLE, TABLE_STATUS } from '../data/mockData';

const ATTENDANCE_COLOR = { working: 'green', break: 'amber', off: 'gray' };
const TABLE_COLOR = { empty: 'gray', occupied: 'green', reserved: 'blue', checkout: 'amber' };
const ORDER_COLOR = { received: 'blue', cooking: 'amber', served: 'green' };
const ROLE_COLOR = { manager: 'green', hall: 'blue', kitchen: 'amber' };

function Pill({ color, children }) {
  return (
    <span className={`badge ${color}`}>
      <span className="dot" />
      {children}
    </span>
  );
}

export function AttendanceBadge({ value }) {
  return <Pill color={ATTENDANCE_COLOR[value]}>{ATTENDANCE[value]}</Pill>;
}

export function TableBadge({ value }) {
  return <Pill color={TABLE_COLOR[value]}>{TABLE_STATUS[value]}</Pill>;
}

export function OrderBadge({ value }) {
  return <Pill color={ORDER_COLOR[value]}>{ORDER_STATUS[value]}</Pill>;
}

export function RoleBadge({ value }) {
  return <span className={`badge ${ROLE_COLOR[value]}`}>{ROLE[value]}</span>;
}
