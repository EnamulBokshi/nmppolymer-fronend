import React from "react";
import { ImSpinner4 } from "react-icons/im";
import { useCreateCategory } from "../../../../../hooks/useCreateCategory";

function AddCategory({ className = "" }) {
  const [categoryName, setCategoryName] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(null);
  const [success, setSuccess] = React.useState("");
  
  const {mutate: addCategory,isLoading,error:categoryError,isSuccess,isPending} = useCreateCategory();

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    if (categoryName) {
      const formData = new FormData();
      formData.append("name", categoryName);
      try{
        addCategory(formData,{
          onSuccess: () => {
            setError(null);
            setSuccess(`${categoryName}`);
            setCategoryName("");
          },
          onError: (error) => {
            setError(error.response.data.message);
          }
        });
      }
      catch(error){
        console.log(error);
      }
      finally{
        setLoading(false);
      }
      
      setLoading(false);
    }
    else {
      setLoading(false);
      setError("Category name is required");
    } 
  };
  return (
    <div>
      <form onSubmit={handleSubmit} className={`flex gap-2 flex-col ${className}`}>
        <label htmlFor="category" className="sr-only">
          Category Name
        </label>
        <input
          type="text"
          className={`border border-sky-400 bg-gray-300 focus:outline-none rounded shadow p-2 ${error ? "border-red-500" : ""}`}
          name="category"
          value={categoryName}
          placeholder="Category Name"
          onChange={(e) => setCategoryName(e.target.value)}
        />
        {
          error && <p className="text-red-500">{error}</p>
        }
        <button
          type="submit"
          className="bg-red-500 rounded-lg hover:bg-red-600  text-white flex items-center justify-center py-2 px-4"
        >
          {
            isPending && <ImSpinner4 className="animate-spin" />
          }
          {!isPending && "Add"}
        </button>
      </form>
      {
        categoryName.length == 0 ? <p className="text-red-500">{categoryError}</p>:null

      }
      {
        isPending && <p className="text-gray-500">Adding category...</p>
      }

     {
        isSuccess && <p className="text-green-500"><span className="font-bold font-serif">{`${success} `}</span> added successfully!!</p>
     }
    </div>
  );
}

export default AddCategory;
