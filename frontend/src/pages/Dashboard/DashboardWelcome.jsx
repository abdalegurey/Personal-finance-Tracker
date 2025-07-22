import React from 'react'
import { CloudCog, PlusCircle } from 'lucide-react'

const DashboardWelcome = ({      onCreateTask,showCreateForm }) => {


  // console.log("showCreateForm",showCreateForm)
  return (
    <div className="bg-white p-6 rounded-xl shadow flex flex-col md:flex-row md:items-center md:justify-between gap-4">
      {/* Text */}
      <div>
        <h2 className="text-xl font-semibold text-gray-800 mb-2 md:mb-0">Dashboard Overview</h2>
        <p className="text-gray-600">
          Waxaad halkan ka daawan kartaa xogaha muhiimka ah ee ku saabsan system-kaaga.
        </p>
      </div>

      {/* Button */}
      <button
        onClick={     onCreateTask}
        className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-700 transition duration-200"
      >
        <PlusCircle className="w-5 h-5" />
        Create New Financial Tracker
      </button>
    </div>
  )
}

export default DashboardWelcome
