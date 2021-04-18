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
    <div className='bg-white md:max-w-4xl rounded-lg shadow p-6 mx-3'>
      <form onSubmit={onSubmitExpense} className='flex'>
        <input
          type='text'
          name='expenseText'
          value={expenseText}
          placeholder='Add Expense...'
          className='appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mx-1 leading-tight focus:outline-none focus:bg-white'
          onChange={onChangeExpense}
        ></input>
        <input
          type='number'
          name='expenseAmount'
          value={expenseAmount}
          placeholder='Amount'
          className='appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mx-1 leading-tight focus:outline-none focus:bg-white'
          onChange={onChangeExpense}
        />
        <input
          type='submit'
          value='Submit'
          className='bg-blue-500 px-4 py-2 text-xs font-semibold tracking-wider text-white rounded hover:bg-blue-600'
        />
      </form>
      {expenseList.map((data) => (
        <div className='flex justify-between items-center h-16 p-4 my-6  rounded-lg border border-gray-100 shadow-md'>
          {data.text} | {data.amount}
        </div>
      ))}
    </div>
  );
};

export default Expense;
