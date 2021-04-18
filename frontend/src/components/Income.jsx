import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';

const URL = 'http://localhost:3002';

const Income = () => {
  const [income, setIncome] = useState({
    incomeText: '',
    incomeAmount: 0,
  });

  const [incomeList, setIncomeList] = useState([]);

  const { incomeText, incomeAmount } = income;

  const getIncomes = () => {
    axios
      .get(`${URL}/income`)
      .then((res) => {
        if (res.data != null) {
          setIncomeList(res.data);
        }
      })
      .catch((err) => console.error(`error : ${err}`));
  };

  useEffect(() => {
    getIncomes();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const addIncome = (newIncome) => {
    axios
      .post(`${URL}/income`, {
        id: newIncome.id,
        text: newIncome.incomeText,
        amount: newIncome.incomeAmount,
      })
      .then(() => {
        getIncomes();
      });
  };

  const onChangeIncome = (e) => {
    setIncome({ ...income, [e.target.name]: e.target.value });
  };

  const onSubmitIncome = (e) => {
    e.preventDefault();

    if (incomeText !== '') {
      const newIncomeTransaction = {
        id: uuidv4(),
        incomeText,
        incomeAmount: incomeAmount * 1,
      };

      addIncome(newIncomeTransaction);

      setIncome({
        incomeText: '',
        incomeAmount: 0,
      });
    }
  };

  return (
    <div className='bg-white md:max-w-4xl rounded-lg shadow p-6 mx-3'>
      <form onSubmit={onSubmitIncome} className='flex'>
        <input
          type='text'
          name='incomeText'
          value={incomeText}
          placeholder='Add Income...'
          className='p-1 px-2 appearance-none outline-none w-full text-gray-800'
          onChange={onChangeIncome}
        ></input>
        <input
          type='number'
          name='incomeAmount'
          value={incomeAmount}
          placeholder='Amount'
          className='p-1 px-2 appearance-none outline-none w-full text-gray-800'
          onChange={onChangeIncome}
        />
        <input
          type='submit'
          value='Submit'
          className='bg-blue-500 px-4 py-2 text-xs font-semibold tracking-wider text-white rounded hover:bg-blue-600'
        />
      </form>

      <div>
        {incomeList.map((data) => (
          <div className='flex justify-between items-center h-16 p-4 my-6  rounded-lg border border-gray-100 shadow-md'>
            {data.text} | {data.amount}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Income;
