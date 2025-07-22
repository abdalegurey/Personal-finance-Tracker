import React from "react";
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "@/components/ui/tabs";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "@/lib/api/apiClient";

const IndexList = ({ Transactions = [], onEdit, onDelete, setEditingTask, editingTask, setShowCreateForm }) => {
  const incomes = Transactions.filter(t => t.type === "income");
  const expenses = Transactions.filter(t => t.type === "expense");


  const queryClient = useQueryClient();

  const deleteMutation = useMutation({
    mutationFn: async (taskId) => {
      const response = await api.delete(`/transactions/${taskId}`);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['Transactions']);
    },
    onError: (error) => {
      console.error("Error deleting task:", error);
    }
  });

  const handleDelete = (id) => {
    if (id) {
      const confirmDelete = window.confirm("Do you want to delete?");
      if (confirmDelete) {
        deleteMutation.mutate(id);
      }
    }
  };

  const handleEdit = (tx) => {
    setEditingTask(tx);
    setShowCreateForm(true);
    console.log("editingTask", editingTask);
  };

  const renderTable = (data) => {
    if (data.length === 0) {
      return (
        <p className="text-center py-4 text-gray-500">No transactions found.</p>
      );
    }

    return (
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Title</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((tx) => (
            <TableRow key={tx._id}>
              <TableCell>{tx.title}</TableCell>
              <TableCell className={tx.type === "expense" ? "text-red-600" : "text-green-600"}>
                {tx.type === "expense" ? "-" : "+"}${tx.amount}
              </TableCell>
              <TableCell className="capitalize">{tx.type}</TableCell>
              <TableCell>{tx.category}</TableCell>
              <TableCell>{new Date(tx.date).toLocaleDateString()}</TableCell>
              <TableCell>
                <button
                  onClick={() => handleEdit(tx)}
                  className="text-blue-600 hover:underline mr-3"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(tx._id)}
                  className="text-red-600 hover:underline"
                >
                  Delete
                </button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    );
  };

  return (
    <Tabs defaultValue="all" className="w-full">
      <TabsList className="grid grid-cols-3 w-full">
        <TabsTrigger value="all">All</TabsTrigger>
        <TabsTrigger value="income">Income</TabsTrigger>
        <TabsTrigger value="expense">Expense</TabsTrigger>
      </TabsList>

      <TabsContent value="all">{renderTable(Transactions)}</TabsContent>
      <TabsContent value="income">{renderTable(incomes)}</TabsContent>
      <TabsContent value="expense">{renderTable(expenses)}</TabsContent>
    </Tabs>
  );
};

export default IndexList;
