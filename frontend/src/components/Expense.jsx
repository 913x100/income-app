import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';

const URL = 'http://localhost:3002';

const Expense = () => {
  const [expense, setExpense] = useState({
    expenseText: '',
    expenseAmount: 0,
  });

  const [expenseList, setExpenseList] = useState([]);

  const { expenseText, expenseAmount } = expense;

  const getExpenses = () => {
    axios
      .get(`${URL}/expense`)
      .then((res) => {
        if (res.data != null) {
          setExpenseList(res.data);
        }
      })
      .catch((err) => console.error(`error : ${err}`));
  };

  useEffect(() => {
    getExpenses();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const addExpense = (newExpense) => {
    axios
      .post(`${URL}/expense`, {
        id: newExpense.id,
        text: newExpense.expenseText,
        amount: newExpense.expenseAmount,
      })
      .then(() => {
        getExpenses();
      });
  };

  const onChangeExpense = (e) => {
    setExpense({ ...expense, [e.target.name]: e.target.value });
  };

  const onSubmitExpense = (e) => {
    e.preventDefault();

    if (expenseText !== '') {
      const newExpenseTransaction = {
        id: uuidv4(),
        expenseText,
        expenseAmount: expenseAmount * 1,
      };

      addExpense(newExpenseTransaction);

      setExpense({
        expenseText: '',
        expenseAmount: 0,
      });
    }
  };

  return (
    <div>
      <form onSubmit={onSubmitExpense}>
        <input
          type='text'
          name='expenseText'
          value={expenseText}
          placeholder='Add Expense...'
          onChange={onChangeExpense}
        ></input>
        <input
          type='number'
          name='expenseAmount'
          value={expenseAmount}
          placeholder='Amount'
          onChange={onChangeExpense}
        />
        <input type='submit' value='Submit' />
      </form>
      {expenseList.map((data) => (
        <p>
          {data.text} | {data.amount}
        </p>
      ))}
    </div>
  );
};

export default Expense;
