import Transaction from "../models/Subscription.js";


// export const CreateTransaction = async (req, res) => {
//     const { title, amount, type, category, date } = req.body;

//     try {
//         // Validate required fields
//         if (!title || !amount || !type || !category || !date) {
//             return res.status(400).json({ message: "All fields are required" });
//         }

//         // Create a new transaction
//         const newTransaction = new Transaction({
//             title,
//             amount,
//             type,
//             category,
//             date: new Date(date) // Ensure date is stored as a Date object
//         });

//         // Save the transaction to the database
//         await newTransaction.save();

//         // Return the created transaction
//         return res.status(201).json(newTransaction);
        
//     } catch (error) {
//         console.error("Error creating transaction:", error);
//         return res.status(500).json({ message: "Internal server error" });
        
//     }
// }


export const CreateTransaction = async (req, res) => {
  const data = req.body;

  try {
    // Haddii uu array yahay
    if (Array.isArray(data)) {
      // Validate all entries
      for (const item of data) {
        console.log("itemmmmmmmm",item)
        const { title, amount, type, category, date } = item;
        if (!title || !amount || !type || !category || !date) {
          return res.status(400).json({ message: "All fields are required in each transaction" });
        }
      }

      // Insert all transactions
      const inserted = await Transaction.insertMany(
        data.map(item => ({
          ...item,
          date: new Date(item.date),
        }))
      );

      return res.status(201).json({ message: "Transactions created", data: inserted });
    }

    // Haddii uu yahay hal object
    const { title, amount, type, category, date } = data;

    if (!title || !amount || !type || !category || !date) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newTransaction = new Transaction({
      title,
      amount,
      type,
      category,
      date: new Date(date),
    });

    await newTransaction.save();

    return res.status(201).json({ message: "Transaction created", data: newTransaction });

  } catch (error) {
    console.error("Error creating transaction:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};


export const TransactionMonthlySummary = async (req, res) => {
  try {
    const now = new Date();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 1);

    const transactions = await Transaction.aggregate([
      {
        $match: {
          date: {
            $gte: startOfMonth,
            $lt: endOfMonth
          }
        }
      },
      {
        $group: {
          _id: { category: "$category", type: "$type" },
          total: { $sum: "$amount" }
        }
      },
      {
        $sort: { "_id.category": 1 }
      }
    ]);

    res.json(transactions);
  } catch (error) {
    console.error("Error fetching monthly summary:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const GetTransactions = async (req, res) => {
    try {
        // Fetch all transactions from the database
        const transactions = await Transaction.find();

        // Return the list of transactions
        return res.status(200).json(transactions);
        
    } catch (error) {
        console.error("Error fetching transactions:", error);
        return res.status(500).json({ message: "Internal server error" });
        
    }
}


export const UpdateTransaction = async (req, res) => {
   // const {id} = req.params;
   try {
    const transaction= await Transaction.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true, }
    );
    
    if (!transaction) {
        return res.status(404).json({ message: "Transaction not found" });
    }

    return res.status(200).json(transaction);
   } catch (error) {
       console.error("Error updating transaction:", error);
       return res.status(500).json({ message: "Internal server error" });
    
   }
}

export const DeleteTransaction = async (req, res) => {
    try {
        const transaction = await Transaction.findByIdAndDelete(req.params.id);
        
        if (!transaction) {
            return res.status(404).json({ message: "Transaction not found" });
        }

        return res.status(200).json({ message: "Transaction deleted successfully" });
        
    } catch (error) {
        console.error("Error deleting transaction:", error);
        return res.status(500).json({ message: "Internal server error" });
        
    }
}