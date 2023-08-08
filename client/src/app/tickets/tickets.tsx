import { Ticket, User } from '@acme/shared-models';
import styles from './tickets.module.css';
import CustomTemplate from '../templates';
import { Button, Checkbox, Input, Select } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import { Spin } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useMutation } from 'react-query';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export interface TicketsProps {
  tickets: Ticket[];
  users: User[];
  refetch: () => void;
  status: string;
}

const antIcon = (
  <LoadingOutlined style={{ fontSize: 24 }} spin rev={undefined} />
);

export function Tickets(props: TicketsProps) {
  const { tickets, refetch, status, users } = props;

  const Children = () => {
    const navigate = useNavigate();
    const [showAssign, setShowAssign] = useState(false);
    const [showCreate, setShowCreate] = useState(false);
    const [ticketId, setTicketId] = useState(0);
    const [assignId, setAssignId] = useState(0);
    const [ticketValue, setTicketValue] = useState('');

    const selectValue = users.map((item: User) => {
      return {
        label: item.name,
        value: item.id,
      };
    });

    const handleChange = async (t: Ticket) => {
      try {
        if (!t.completed) {
          await fetch(`/api/tickets/${t.id}/complete`, {
            method: 'PUT',
          }).then((res) => {
            // refetch TicketList
            refetch();
          });
        } else {
          await fetch(`/api/tickets/${t.id}/complete`, {
            method: 'DELETE',
          }).then((res) => {
            // refetch TicketList
            refetch();
          });
        }
      } catch (err) {
        console.log(err);
      }
    };

    const createTicket = useMutation({
      mutationFn: ({ description }: { description: string }) => {
        return fetch('/api/tickets/', {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ description: description }),
        });
      },
      onSuccess: () => {
        refetch();
      },
    });

    const assignTicket = useMutation({
      mutationFn: ({
        ticketId,
        userId,
      }: {
        ticketId: number;
        userId: number;
      }) => {
        return fetch(`/api/tickets/${ticketId}/assign/${userId}`, {
          method: 'PUT',
        });
      },
    });

    const handleCreate = async () => {
      if (ticketValue.length) {
        createTicket.mutate({ description: ticketValue });
        setShowCreate(false);

        // refetch tickets list
        refetch();
      }
      return;
    };

    const handleShowAssign = (id: number) => {
      setTicketId(id);
      setShowAssign(true);
    };

    const handleSubmitAssign = ({
      ticketId,
      userId,
    }: {
      ticketId: number;
      userId: number;
    }) => {
      assignTicket.mutate({ ticketId, userId });
      toast('Assigned succeed!');
      setShowAssign(false);
    };

    const handleSelectChange = (id: number) => {
      setAssignId(id);
    };

    const unassignTicket = useMutation({
      mutationFn: (id: number) => {
        return fetch(`/api/tickets/${id}/unassign`, {
          method: 'PUT',
        });
      },
    });

    const handleUnassign = (id: number) => {
      unassignTicket.mutate(id);

      toast('Unassign succeed!');
    };

    return (
      <div className={styles['tickets']}>
        <h2>Tickets</h2>
        {showCreate ? (
          <div style={{ display: 'flex' }}>
            <Input
              value={ticketValue}
              onChange={(e) => setTicketValue(e.target.value)}
              style={{ width: '300px' }}
            />
            <Button
              onClick={() => handleCreate()}
              style={{ marginLeft: '1rem' }}
            >
              Submit
            </Button>
          </div>
        ) : (
          <Button
            onClick={() => setShowCreate(true)}
            style={{ display: 'block', marginBottom: '1rem' }}
          >
            Create
          </Button>
        )}
        {tickets.length ? (
          <ul style={{ paddingInlineStart: 0 }}>
            {tickets.map((t: Ticket) => (
              <>
                <li key={t.id} className={styles['ticket']}>
                  <span onClick={() => navigate(`/tickets/${t.id}`)}>
                    Ticket: {t.id}, {t.description}
                  </span>
                </li>
                {status === 'success' ? (
                  <Checkbox
                    onChange={() => handleChange(t)}
                    checked={t.completed}
                  >
                    {t.completed ? 'Completed' : 'Incompleted'}
                  </Checkbox>
                ) : (
                  <Spin indicator={antIcon} />
                )}
                {showAssign && ticketId === t.id ? (
                  <>
                    <Select
                      style={{ width: 120 }}
                      defaultValue={selectValue[0].value as any}
                      onChange={handleSelectChange}
                      options={selectValue}
                    />
                    <Button
                      onClick={() => {
                        handleSubmitAssign({
                          ticketId: t.id,
                          userId: assignId,
                        });
                      }}
                      style={{ marginLeft: '1rem' }}
                    >
                      Submit
                    </Button>
                  </>
                ) : (
                  <Button onClick={() => handleShowAssign(t.id)}>Assign</Button>
                )}
                <Button
                  onClick={() => handleUnassign(t.id)}
                  danger
                  style={{ marginLeft: '1rem' }}
                >
                  Unassign
                </Button>
              </>
            ))}
          </ul>
        ) : (
          <Spin indicator={antIcon} />
        )}
      </div>
    );
  };

  return (
    <>
      <CustomTemplate children={<Children key={'tickets'} />} />
      <ToastContainer />
    </>
  );
}

export default Tickets;
