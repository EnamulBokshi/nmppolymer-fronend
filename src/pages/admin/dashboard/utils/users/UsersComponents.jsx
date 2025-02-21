import React,{useState} from 'react'
import { useNavigate } from 'react-router';

function UsersComponents() {
      const [searchTerm, setSearchTerm] = useState('');
      const [sortField, setSortField] = useState('');
      const [sortOrder, setSortOrder] = useState('asc');
    
      const handleSearch = (e) => {
        setSearchTerm(e.target.value);
      };
    
      const navigate = useNavigate();
    
      const handleSort = (field) => {
        const order = sortField === field && sortOrder === 'asc' ? 'desc' : 'asc';
        setSortField(field);
        setSortOrder(order);
      };
  return (
    <div className="bg-neutral-100 p-5 rounded-lg shadow md:w-1/2 w-full">
          <h1 className="text-center font-bold font-serif text-xl">Users</h1>
          <div className="flex flex-col md:flex-row justify-between items-center mb-4">
            <input
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={handleSearch}
              className="p-2 border rounded mb-2 md:mb-0 md:mr-2 w-full md:w-auto"
            />
            <button onClick={()=> navigate('/admin/registration')} className="px-5 py-2 bg-sky-600 text-white rounded hover:bg-sky-800 w-full md:w-auto">
              Add User
            </button>
          </div>
          <div className="mt-5 overflow-x-auto">
            <table className="w-full shadow-lg rounded-lg overflow-hidden">
              <thead className="bg-gray-800 text-white">
                <tr>
                  <th className="py-3 px-4 cursor-pointer" onClick={() => handleSort('username')}>
                    Username {sortField === 'username' && (sortOrder === 'asc' ? '↑' : '↓')}
                  </th>
                  <th className="py-3 px-4 cursor-pointer" onClick={() => handleSort('email')}>
                    Email {sortField === 'email' && (sortOrder === 'asc' ? '↑' : '↓')}
                  </th>
                  <th className="py-3 px-4 cursor-pointer" onClick={() => handleSort('role')}>
                    Role {sortField === 'role' && (sortOrder === 'asc' ? '↑' : '↓')}
                  </th>
                  <th className="py-3 px-4">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                <tr className="hover:bg-gray-100">
                  <td className="py-3 px-4">John Doe</td>
                  <td className="py-3 px-4">
                    <a
                      href="mailto:enamul@gmail.com"
                      className="text-blue-500 hover:underline"
                    >
                      Enamulbokshi@gmail.com
                    </a>
                  </td>
                  <td className="py-3 px-4">Admin</td>
                  <td className="py-3 px-4 flex items-center justify-evenly">
                    <button className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600">
                      Edit
                    </button>
                    <button className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600">
                      Delete
                    </button>
                  </td>
                </tr>
                <tr className="hover:bg-gray-100">
                  <td className="py-3 px-4">John Doe</td>
                  <td className="py-3 px-4">
                    <a
                      href="mailto:another@gmail.com"
                      className="text-blue-500 hover:underline"
                    >
                      another@gmail.com
                    </a>
                  </td>
                  <td className="py-3 px-4">Admin</td>
                  <td className="py-3 px-4 flex items-center justify-evenly">
                    <button className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600">
                      Edit
                    </button>
                    <button className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600">
                      Delete
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
  )
}

export default UsersComponents