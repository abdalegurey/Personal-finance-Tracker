import React, { useState } from 'react'
import { LogOut, ChevronDown, Camera, Loader } from 'lucide-react'
import useAuthStore from '@/Store/authStore'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import api from '@/lib/api/apiClient'
import { extractErrorMessages } from '@/util/errorUtil'
import DashboardWelcome from './DashboardWelcome'
import IndexList from '@/components/Financce/IndexList'
import TransactionForm from '@/components/Financce/TransactionForm'
import Footer from './Footer'

const DashboardPage = () => {
  const [showMenu, setShowMenu] = useState(false)
  const [imagePreview, setImagePreview] = useState("https://i.pravatar.cc/150?img=32")
  const [selectedImage, setSelectedImage] = useState(null)
  const [error, setError] = useState(null)
  const [Transactions, setTransaction]= useState([])

      const [showCreateForm, setShowCreateForm] = useState(false)
    const [editingTask, setEditingTask] = useState(null)
        
  const { user, clearAuth } = useAuthStore()
  const navigate = useNavigate()
  const queryClient = useQueryClient()

  const handleLogout = () => {
    if (confirm("Are you sure you want to logout?")) {
      clearAuth()
      queryClient.clear()
      navigate("/login", { replace: true })
    }
  }

const handleFileChange = (e) => {
  const file = e.target.files[0];
  if (file) {
    if (file.size > 5 * 1024 * 1024) { // 5MB
      setError("Faylka sawirka wuu weyn yahay. Fadlan dooro sawir ka yar 5MB.");
      return;
    }
    setError(null);
    setSelectedImage(file);
    const reader = new FileReader();
    reader.onloadend = () => setImagePreview(reader.result);
    reader.readAsDataURL(file);
  }
}

const handleEditTask=(task)=>{
      setEditingTask(task)
      setShowCreateForm(true)

    }

  const uploadMutation = useMutation({
    mutationFn: async (uploadFile) => {
      const response = await api.post('/upload/profile-picture', uploadFile, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      return response.data
    },
    onSuccess: (data) => {
      if (data?.fileUrl) {
        setImagePreview(data.fileUrl)
      } else if (selectedImage) {
        const reader = new FileReader()
        reader.onloadend = () => {
          setImagePreview(reader.result)
        }
        reader.readAsDataURL(selectedImage)
      }

      setSelectedImage(null)
      setShowMenu(false)
      alert("Sawirka waa la update gareeyay!")
    },
    onError: (err) => {
      console.log("err",err)
      setError(extractErrorMessages(err))
    },
  })

  const handleUpdateImage = () => {
    if (selectedImage) {
      const formData = new FormData()
      formData.append('file', selectedImage)
      uploadMutation.mutate(formData)
    }
  }

   const TransactionQuery=useQuery({
      queryKey:["Transactions"],
      queryFn:async()=>{
        const response=await api.get("/transactions")
        return response.data
      },
      retry:1
    });

    // console.log("TransactionQuery",TransactionQuery)
   if (TransactionQuery.isLoading) {
        return (
            <div className='flex h-screen items-center justify-center'>
                <Loader className='animate-spin' />
            </div>
        )
      }

       const handleFormClose = () => {
        setShowCreateForm(false)
        setEditingTask(null)
    }
    const handleCreateTaskClick=()=>{
       setShowCreateForm(true)
    }



  
  return (
    <div className="min-h-screen bg-gray-100 p-6">
 
      <div className="flex justify-between items-center bg-white p-4 rounded shadow mb-6">
        <div className="flex items-center gap-4">
       
          <div className="relative">
            <img
              src={user.profile || imagePreview}
              alt="Profile"
              className="w-14 h-14 rounded-full object-cover border-2 border-gray-300"
            />

          
            <button
              onClick={() => setShowMenu(!showMenu)}
              className="absolute -bottom-2 right-0 bg-blue-500 text-white p-1 rounded-full hover:bg-blue-600"
            >
              <ChevronDown className="w-4 h-4" />
            </button>

       
            {showMenu && (
              <div className="absolute top-16 left-0 bg-white rounded shadow w-48 z-10 p-2">
                <label
                  htmlFor="fileInput"
                  className="flex items-center gap-2 px-3 py-2 text-sm hover:bg-gray-100 cursor-pointer rounded"
                >
                  <Camera className="w-4 h-4" />
                  Change Photo
                </label>
                <input
                  id="fileInput"
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="hidden"
                />

                {selectedImage && (
                  <button
                    onClick={handleUpdateImage}
                    className="w-full mt-2 text-center bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 text-sm cursor-pointer"
                  >
                    Update Photo
                  </button>
                )}
              </div>
            )}
          </div>

        
          <div>
            <h1 className="text-xl font-bold text-gray-700">Welcome, {user.name}</h1>
            <p className="text-sm text-gray-500">{user.email}</p>
            {error && <p className="text-sm text-red-500 mt-1">{error}</p>}
          </div>
        </div>

        
        <div className="flex gap-4 items-center">
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 text-sm"
          >
            <LogOut className="inline w-4 h-4 mr-1" />
            Logout
          </button>
        </div>
      </div>

      
     <DashboardWelcome  
     showCreateForm={showCreateForm}
      onOpenChange={handleFormClose}
       onCreateTask={handleCreateTaskClick}
      
      />



<div>

  <IndexList
  Transactions={TransactionQuery.data || []

   
  }
 onEdit={handleEditTask}
 editingTask={editingTask}
 setEditingTask={setEditingTask}
 editingTasks={editingTask}

 setShowCreateForm={setShowCreateForm}
  
  />
</div>



<TransactionForm

task={editingTask}
      open={showCreateForm || !!editingTask}
      onOpenChange={handleFormClose}

    
/>




 <div>
      <Footer/>
    </div>

    </div>

   
  )
}

export default DashboardPage
