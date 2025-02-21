import React, { useEffect, useState } from "react";
import dataFormat,{masks}  from 'dateformat'
import { AddCategory, DummyChart, StatsCard, useCategory } from "..";
import { FaUsers } from "react-icons/fa";
import { FaUsersViewfinder } from "react-icons/fa6";
import { MdProductionQuantityLimits } from "react-icons/md";
import { useGetContacts } from "../../../../hooks/useContact";
import CategoryComponet from "./category/CategoryComponet";
import UsersComponents from "./users/UsersComponents";
function Home() {
  const {data:contactsData,isLoading:isContactLoading, isError:isContactError,error:contactError} = useGetContacts();

  const [searchTerm, setSearchTerm] = useState('');
  const [sortField, setSortField] = useState('');
  const [sortOrder, setSortOrder] = useState('asc');

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

const handleCategoryDelete = (id) => {
  deleteCategory(id);
};
if(contactError){
  console.log("Contact Error: ",contactError);
}
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
      <div className="flex md:justify-center items-start gap-5 flex-col md:flex-row">
        
        {/* Users */}
        <UsersComponents />

        {/* Categories */}
        <CategoryComponet />
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
