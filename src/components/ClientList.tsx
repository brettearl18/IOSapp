import React from 'react';

type ClientStatus = 'active' | 'pending' | 'inactive' | 'overdue';

interface Client {
  id: string;
  name: string;
  email: string;
  status: ClientStatus;
  avatar?: string;
  lastCheckIn?: string;
  activeGoals?: number;
  completedGoals?: number;
}

interface ClientListProps {
  clients: Client[];
  onSelectClient: (client: Client) => void;
  selectedClientId?: string;
}

const statusStyles: Record<ClientStatus, { bg: string; text: string; dot: string }> = {
  active: {
    bg: 'bg-green-50',
    text: 'text-green-700',
    dot: 'bg-green-400'
  },
  pending: {
    bg: 'bg-yellow-50',
    text: 'text-yellow-700',
    dot: 'bg-yellow-400'
  },
  inactive: {
    bg: 'bg-gray-50',
    text: 'text-gray-700',
    dot: 'bg-gray-400'
  },
  overdue: {
    bg: 'bg-red-50',
    text: 'text-red-700',
    dot: 'bg-red-400'
  }
};

const getInitials = (name: string) => {
  return name
    .split(' ')
    .map(part => part[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
};

const formatDate = (dateString?: string) => {
  if (!dateString) return 'Never';
  const date = new Date(dateString);
  const now = new Date();
  const diffTime = Math.abs(now.getTime() - date.getTime());
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays === 0) return 'Today';
  if (diffDays === 1) return 'Yesterday';
  if (diffDays < 7) return `${diffDays} days ago`;
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
};

export const ClientList: React.FC<ClientListProps> = ({
  clients,
  onSelectClient,
  selectedClientId
}) => {
  if (!clients || clients.length === 0) {
    return (
      <div className="text-center py-8">
        <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-gray-100">
          <svg
            className="w-6 h-6 text-gray-400"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
          </svg>
        </div>
        <h3 className="mt-2 text-sm font-medium text-gray-900">No clients</h3>
        <p className="mt-1 text-sm text-gray-500">Get started by adding your first client.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium text-gray-900">Your Clients</h3>
        <span className="text-sm text-gray-500">{clients.length} total</span>
      </div>

      <div className="overflow-hidden bg-white rounded-md shadow">
        <ul className="divide-y divide-gray-200">
          {clients.map((client) => {
            const statusStyle = statusStyles[client.status];
            
            return (
              <li
                key={client.id}
                onClick={() => onSelectClient(client)}
                className={`
                  relative p-4 hover:bg-gray-50 transition-colors duration-150 cursor-pointer
                  ${selectedClientId === client.id ? 'bg-indigo-50' : ''}
                `}
              >
                <div className="flex items-center space-x-4">
                  {client.avatar ? (
                    <img
                      src={client.avatar}
                      alt={client.name}
                      className="w-10 h-10 rounded-full"
                    />
                  ) : (
                    <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-100">
                      <span className="text-sm font-medium text-gray-600">
                        {getInitials(client.name)}
                      </span>
                    </div>
                  )}

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-2">
                      <p className="text-sm font-medium text-gray-900 truncate">
                        {client.name}
                      </p>
                      <span className={`inline-flex items-center space-x-1 px-2.5 py-0.5 rounded-full text-xs font-medium ${statusStyle.bg} ${statusStyle.text}`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${statusStyle.dot}`}></span>
                        <span>{client.status.charAt(0).toUpperCase() + client.status.slice(1)}</span>
                      </span>
                    </div>
                    <div className="flex items-center space-x-4 mt-1">
                      <p className="text-sm text-gray-500 truncate">
                        {client.email}
                      </p>
                    </div>
                  </div>

                  <div className="text-right text-sm">
                    <div className="text-gray-900">
                      {client.activeGoals !== undefined && (
                        <span>{client.activeGoals} active goals</span>
                      )}
                    </div>
                    <div className="text-gray-500 text-xs">
                      Last check-in: {formatDate(client.lastCheckIn)}
                    </div>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default ClientList; 