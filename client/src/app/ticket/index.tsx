import { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { useNavigate, useParams } from 'react-router-dom';
import CustomTemplate from '../templates';
import { Button } from 'antd';

const TicketDetail = () => {
  const Children = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [ticket, setTicket] = useState({
      id: 0,
      description: '',
      assigneeId: 0,
      completed: false,
    });
    const fetchTicket = async () => {
      const res = await fetch(`/api/tickets/${id}`);
      return res.json();
    };
    const Ticket = useQuery(['ticket'], fetchTicket);

    useEffect(() => {
      if (Ticket.status === 'success') {
        setTicket(Ticket.data);
      }
    }, [Ticket]);

    return (
      <div>
        Ticket Detail
        <div>Ticket Id: {ticket.id} </div>
        <div>Ticket Description: {ticket.description} </div>
        <div>Ticket Assignee ID: {ticket.assigneeId} </div>
        <div>Ticket completed: {ticket.completed ? 'Done' : 'Not Done'} </div>
        <Button onClick={() => navigate(-1)}>Back</Button>
      </div>
    );
  };

  return <CustomTemplate children={<Children />} />;
};

export default TicketDetail;
