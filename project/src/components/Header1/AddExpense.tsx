import React, { useState } from "react";



interface ExpenseData {
  item: string;
  dateOfPurchase: string;
  description: string;
  amount: string;
  paymentMode: string;
  

}

const AddExpense: React.FC = () => {
   
  const [expenseData, setExpenseData] = useState<ExpenseData>({
    item: "",
    dateOfPurchase: "",
    description: "",
    amount: "",
    paymentMode: "",
  });

 


  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setExpenseData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    console.log("Transaction Data Submitted:", expenseData);
    // Add logic to handle form submission (e.g., API call)
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h2 style={{ textAlign: "center", padding: 10, marginBottom: "30px", fontWeight: "bold", fontSize: 18, borderBottom: "1px solid #ccc" }}>Add Expense</h2>
      <form onSubmit={handleSubmit}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "20px",
          }}
        >
          {/* Column 1 */}
          <div>
            <label style={{ display: "block", marginBottom: "5px", fontWeight: "bold", fontSize: 13, color: "#71045f" }}>
              item*
            </label>
            <input
              type="text"
              name="item"
              value={expenseData.item}
              onChange={handleChange}
              placeholder="Item"
              style={inputStyle}
            />
          </div>

          <div>
            <label style={{ display: "block", marginBottom: "5px", fontWeight: "bold", fontSize: 13,color: "#71045f" }}>
              Date of Purchase*
            </label>
            <input
              type="date"
              name="dateOfPurchase"
              value={expenseData.dateOfPurchase}
              onChange={handleChange}
              style={inputStyle}
            />
          </div>

          <div>
            <label style={{ display: "block", marginBottom: "5px", fontWeight: "bold", fontSize: 13, color: "#71045f"}}>
              Description
            </label>
            <input
              type="text"
              name="description"
              value={expenseData.description}
              onChange={handleChange}
              placeholder="Description"
              style={inputStyle}
            />
          </div>

          <div>
            <label style={{ display: "block", marginBottom: "5px", fontWeight: "bold", fontSize: 13, color: "#71045f" }}>
              Amount*
            </label>
            <input
              type="text"
              name="amount"
              value={expenseData.amount}
              onChange={handleChange}
              placeholder="Amount"
              style={inputStyle}
            />
          </div>

          <div>
            <label style={{ display: "block", marginBottom: "5px", fontWeight: "bold", fontSize: 13, color: "#71045f" }}>
              Payment Mode
            </label>
            <select
              name="paymentMode"
              value={expenseData.paymentMode}
              onChange={handleChange}
              style={inputStyle}
            >
              <option value="">-----</option>
              <option value="Cash">Cash</option>
              <option value="Credit">Card</option>
              <option value="POS">POS</option>
              <option value="Google pay">Google pay</option>
              <option value="Paytm">Paytm</option>
              <option value="Amazon pay">Amazon pay</option>
              <option value="Netbanking">Netbanking</option>
            </select>
          </div>
          </div>
          
            
        <div style={{ marginTop: "20px", textAlign: "center" }}>
          <button
            type="submit"
            style={{
              padding: "5px 15px",
              backgroundColor: "#2485bd",
              color: "#fff",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            Add to List
          </button>
        </div>
      </form>
    </div>
  );
};

const inputStyle = {
  width: "100%",
  padding: "8px",
  borderRadius: "4px",
  border: "1px solid #ccc",
};

export default AddExpense;