import React, { useEffect, useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import api from "@/lib/api/apiClient"
import { extractErrorMessages } from "@/util/errorUtil"
import { Loader } from "lucide-react"

const categories = ["Food", "Transport", "Entertainment", "Salary", "Other"]

const TransactionForm = ({ open, onOpenChange, onSubmit, onCancel, task }) => {

  // console.log(" editingTasks", editingTasks)
  // console.log("task",task)
const [formValues, setFormValues] = useState({
  title: "",
  amount: "",
  type: "income", // <-- Default value must match your <SelectItem>
  category: "Other", // <-- Must be string, not undefined
  date: "",
})

    const [validationError, setValidationError] = useState(null)

  useEffect(()=>{
           if (task) {
  setFormValues({
    title: task.title || "",
    amount: task.amount || "",
    type: task.type || "income",
    category: task.category || "Other",
    date: task.date ? new Date(task.date).toISOString().split("T")[0] : "",
  })
} else {
  setFormValues({
    title: "",
    amount: "",
    type: "income", // match Select
    category: "Other", // match Select
    date: "",
  })
}

        setValidationError(null);

    },[task,open])

    const   queryClient= useQueryClient()
  const [error, setError] = useState("")

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormValues((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSelectChange = (name, value) => {
    setFormValues((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

   const createTransactionMutation=useMutation({
        mutationFn: async (taskData) => {
  const response = await api.post("/transactions", taskData); // ➕ await
  return response.data;
},

        onSuccess:(data)=>{
            //  toast.success('Task Created successfully', { description: 'Your task has been Created.' });
            queryClient.invalidateQueries(['Transactions']);
              onOpenChange(false);
      setFormValues({
        title: "",
        amount: "",
        type: "",
        category: "",
        date: "",
      });
            console.log("datatt",data)
          //  console.log("created",data)

        },
        onError:(err)=>{
            console.error("err",err)

        }
    });

     const UpdateTransactionMutation=useMutation({
        mutationFn:async(taskData)=>{
            const response=api.put(`/transactions/${task._id}`,taskData)
            return response.data
        },
        onSuccess: (data) => {

            // toast.success('Task updated successfully', { description: 'Your task has been updated.' });
            queryClient.invalidateQueries(['Transactions']);
            onOpenChange?.(false);
            setFormValues({
        title: "",
        amount: "",
        type: "",
        category: "",
        date: "",
      });
         //   console.log("Task updated successfully:", data);
        }
        ,
        onError: (error) => {
            console.error("Error updating task:", error);
            // toast.error(`Error updating task: ${extractErrorMessages(error)}`, { description: 'Please try again.' });
            setValidationError(extractErrorMessages(error));
        }
    })

const handleSubmit = (e) => {
  e.preventDefault();

  if (!formValues.title.trim() || !formValues.amount || !formValues.type) {
    setError("Please fill in all required fields.");
    return;
  }

  const TransactionData = {
    title: formValues.title,
    amount: Number(formValues.amount),
    type: formValues.type,
    category: formValues.category || "Other",
    date: formValues.date || new Date().toISOString().split("T")[0],
  };

  if(task){

    UpdateTransactionMutation.mutate(TransactionData)
//
  }else{
createTransactionMutation.mutate(TransactionData);
onOpenChange?.(false)
  }
  
};

  const handleCancel = () => {
    setError("")
    setFormValues({
      title: "",
      amount: "",
      type: "",
      category: "",
      date: "",
    })
   onOpenChange(false)
  }

  const isLoading = createTransactionMutation.isPending || UpdateTransactionMutation.isPending;
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>{task ? "Update Transaction" : "Create New Transaction"}</DialogTitle>
          <DialogDescription>
            Fill in the form to create a new transaction record.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <div className="text-red-600 text-sm bg-red-100 p-2 rounded-md">
              {error}
            </div>
          )}

          <div>
            <Label>Title *</Label>
            <Input
              name="title"
              value={formValues.title}
              onChange={handleChange}
              placeholder="Enter title"
              required
            />
          </div>

          <div>
            <Label>Amount *</Label>
            <Input
              name="amount"
              type="number"
              value={formValues.amount}
              onChange={handleChange}
              placeholder="Enter amount"
              required
            />
          </div>

          <div className="w-full">
            <Label>Type *</Label>
            <Select
              value={formValues.type}
              onValueChange={(value) => handleSelectChange("type", value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="income">Income</SelectItem>
                <SelectItem value="expense">Expense</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label>Category</Label>
            <Select
              value={formValues.category}
              onValueChange={(value) => handleSelectChange("category", value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((cat) => (
                  <SelectItem key={cat} value={cat}>
                    {cat}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label>Date</Label>
            <Input
              name="date"
              type="date"
              value={formValues.date}
              onChange={handleChange}
            />
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={handleCancel}>
              Cancel
            </Button>
           <Button type="submit" disabled={isLoading}>
 {isLoading ? (
                                <span className="flex items-center gap-2">
                                   <Loader className="w-4 h-4 animate-spin" />

                                    {task ? 'Updating...' : 'Creating...'}
                                </span>
                            ) : (
                                task ? 'Update Task' : 'Create Task'
                            )}
</Button>


          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default TransactionForm
