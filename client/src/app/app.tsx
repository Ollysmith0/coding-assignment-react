import { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Ticket, User } from '@acme/shared-models';
import { useQuery } from 'react-query';

import styles from './app.module.css';
import Tickets from './tickets/tickets';
import Users from './users/users';
import UserDetail from './user';
import TicketDetail from './ticket';
import Home from './home';

const App = () => {
  const [tickets, setTickets] = useState([] as Ticket[]);
  const [users, setUsers] = useState([] as User[]);

  const fetchTickets = async () => {
    const res = await fetch('/api/tickets');
    return res.json();
  };

  const fetchUsers = async () => {
    const res = await fetch('/api/users');
    return res.json();
  };

  const ticketQuery = useQuery(['tickets'], fetchTickets, {
    refetchIntervalInBackground: true,
  });
  const userQuery = useQuery(['users'], fetchUsers, {
    refetchIntervalInBackground: true,
  });

  useEffect(() => {
    if (ticketQuery.status === 'success' && userQuery.status === 'success') {
      setTickets(ticketQuery.data);
      setUsers(userQuery.data);
    }
  }, [ticketQuery.status, ticketQuery.data, userQuery.status, userQuery.data]);

  return (
    <div className={styles['app']}>
      <h1>Ticketing App</h1>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/users"
          element={
            <Users
              users={users}
              refetch={userQuery.refetch}
              status={userQuery.status}
            />
          }
        />{' '}
        <Route path="/users/:id" element={<UserDetail />} />
        <Route
          path="/tickets"
          element={
            <Tickets
              users={users}
              tickets={tickets}
              refetch={ticketQuery.refetch}
              status={ticketQuery.status}
            />
          }
        />
        <Route path="/tickets/:id" element={<TicketDetail />} />
      </Routes>
    </div>
  );
};

export default App;
