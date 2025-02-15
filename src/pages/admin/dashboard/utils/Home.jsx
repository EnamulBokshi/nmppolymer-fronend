import React, { useEffect, useState } from "react";
import dataFormat,{masks}  from 'dateformat'
import { AddCategory, DummyChart, StatsCard, useCategory } from "..";
import { FaUsers } from "react-icons/fa";
import { FaUsersViewfinder } from "react-icons/fa6";
import { MdProductionQuantityLimits } from "react-icons/md";
import { Line, Scatter } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";
import { useSelector, useDispatch } from "react-redux";
import { setCategories } from "../../../../components/store/categorySlicer";
import { ACCESS_TOKEN } from "../../../../constant";
import api from "../../../../api";
import { useMutation } from "@tanstack/react-query";
import { useGetContacts } from "../../../../hooks/useContact";
function Home() {
  const categoryQuery = useCategory();
  const {data:contactsData,isLoading:isContactLoading, isError:isContactError,error:contactError} = useGetContacts();
  const data = async () => {
    const res = await api.get("/api/categories/");
    return res.data;
  };

  console.log("categoryQuery", categoryQuery.data);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortField, setSortField] = useState('');
  const [sortOrder, setSortOrder] = useState('asc');
  const [categories, setCategories] = useState(categoryQuery.data);
  console.log("categories: ",categories)
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  

  const handleSort = (field) => {
    const order = sortField === field && sortOrder === 'asc' ? 'desc' : 'asc';
    setSortField(field);
    setSortOrder(order);
  };
  const chartData = {
    labels: ["January", "February", "March"],
    datasets: [
      {
        label: "Visitors",
        data: [10, 20, 30, 40],
        backgroundColor: "rgba(20,100,100, 1)",
      },
      {
        label: "Orders",
        data: [5, 10, 20, 30],
        backgroundColor: "rgba(200,100,100, 1)",
      },
    ],
  };

  const chartOptions = {
    responsive: true,
  };


const handleCategoryEdit = (id) => {
  // const {data,loading,error} = useMutation();
  console.log("Edit Category",id);

};
const {mutate:deleteCategory,isLoading,isError,error} = useMutation(
  {
    mutationKey: ['deleteCategory'],
    mutationFn: async (id) => {
      const response = await api.delete(`/api/category/delete/${id}/`, {
        headers: {  
          Authorization: `Bearer ${localStorage.getItem(ACCESS_TOKEN)}`,
        },
      });
      return response.data;
    },
  }
);

const handleCategoryDelete = (id) => {
  deleteCategory(id);
};
if(contactError){
  console.log("Contact Error: ",contactError);
}

useEffect(() => {
  data().then((res) => {
    setCategories(res);
  });
},[])
  return (
    <section>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 ">
        <StatsCard
          icon={<FaUsers />}
          title={"today's user"}
          value={"12,000"}
          comment={
            <p>
              <span className="text-green-600">+30%</span> more than usual
            </p>
          }
        />
        <StatsCard
          icon={<FaUsersViewfinder />}
          title={"Total views"}
          value={"120,000"}
          comment={
            <p>
              <span className="text-green-600">+10%</span> more than usual
            </p>
          }
        />
        <StatsCard
          icon={<MdProductionQuantityLimits />}
          title={"Today's Orders"}
          value={"50"}
          comment={
            <p>
              <span className="text-green-600">+10%</span> more than usual
            </p>
          }
        />
        <StatsCard
          icon={<FaUsers />}
          title={"today's user"}
          value={"12,000"}
          comment={
            <p>
              <span className="text-green-600">+30%</span> more than usual
            </p>
          }
        />
      </div>
      <div className="py-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <DummyChart />
        <DummyChart />
        <DummyChart />
      </div>
      <div className="py-5 grid grid-cols-1 md:grid-cols-2 gap-5 ">
        <div className="bg-neutral-100 p-5 rounded-lg shadow">
          <h1 className="text-center font-bold font-serif text-xl">Users</h1>
          <div className="flex flex-col md:flex-row justify-between items-center mb-4">
            <input
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={handleSearch}
              className="p-2 border rounded mb-2 md:mb-0 md:mr-2 w-full md:w-auto"
            />
            <button className="px-5 py-2 bg-sky-600 text-white rounded hover:bg-sky-800 w-full md:w-auto">
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
        <div className="bg-neutral-100 p-5 rounded-lg shadow">
          <h1 className="text-center pb-5 text-xl font-sans font-bold">
            Category
          </h1>


          <button className="px-5 py-2 bg-sky-600 text-white rounded hover:bg-sky-800 mb-4 w-full md:w-auto">
            Add Category
          </button>
          <div>
            {
              // AddCategory component
              <AddCategory />
            }

          </div>
          <div className="mt-5 overflow-x-auto">
            <table className="w-full shadow-lg rounded-lg overflow-hidden">
              <thead className="bg-gray-800 text-white">
                <tr>
                  <th className="py-3 px-4 cursor-pointer" onClick={() => handleSort('category')}>
                    Category {sortField === 'category' && (sortOrder === 'asc' ? '↑' : '↓')}
                  </th>
                  <th className="py-3 px-4">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">

                {
                categories?.map((category) => (
                  <tr className="hover:bg-gray-100" key={category.id}>
                  <td className="py-3 px-4">{category.name}</td>
                  <td className="py-3 px-4 flex items-center justify-evenly">
                    <button className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600" onClick={()=>handleCategoryEdit(category.id)}>Edit</button>
                    <button className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600" onClick={()=>handleCategoryDelete(category.id)}>Delete</button>
                  </td>
                </tr>
                ))
}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Contact table */}
    <div className="my-5 py-5 grid-cols-1 md:grid-cols-2 gap-5">
      <div className="bg-neutral-100 p-5 rounded-lg shadow overflow-x-auto">
        <h1 className="text-3xl text-center font-sarif font-bold py-3">Contact</h1>
        <table className="table-auto w-full rounded-lg shadow-lg p-4">
          <thead className="bg-gray-800  text-white">
            <tr className="text-center rounded ">
              <th className="py-3 px-2 ">Name</th>
              <th className="py-3 px-2 ">Email</th>
              <th className="py-3 px-2 ">Message</th>
              <th className="py-3 px-2">Date</th>
              <th className="py-3 px-2 ">Action</th>
             
            </tr>
          </thead>
          <tbody>
            {
              isContactLoading && <tr><td colSpan="5" className="text-center">Loading...</td></tr>
            }
            {
              isContactError && <tr><td colSpan="5" className="text-center">Error...</td></tr>
            }
            {
              contactsData && contactsData.map((contact) => (
                <tr key={contact.id} className="text-center">
                  <td className="py-3 px-2">{contact.firstName + ' ' + contact.lastName}</td>
                  <td className="py-3 px-2">{contact.email}</td>
                  <td className="py-3 px-2">{contact.message.length > 15 ? contact.message.split(0,15)+'...': contact.message}</td>
                  <td className="py-3 px-2">{contact.created_at}</td>
                  <td className="py-3 px-2 space-x-3">
                    <button className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600">Reply</button>
                    <button className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600">Delete</button>
                  </td>
                </tr>
              ))
            }
          </tbody>

        </table>

      </div>
    </div>

    </section>
  );
}

export default Home;
