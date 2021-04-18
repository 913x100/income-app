import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';

const URL = 'http:localhost:3002';

const AddTransaction = () => {
  const [income, setIncome] = useState({
    incomeText: '',
    incomeAmount: 0,
  });

  const [incomeList, setIncomeList] = useState([]);

  const { incomeText, incomeAmount } = income;

  useEffect(() => {
    getIncomes();
  }, []);

  const addIncome = (newIncome) => {
    axios
      .post(`${URL}/income`, {
        id: newIncome.id,
        text: newIncome.incomeText,
        amount: newIncome.incomeAmount,
      })
      .then((res) => {
        console.log(res.data);
        getIncomes();
      });
  };

  const getIncomes = () => {
    axios
      .get(`${URL}/income`)
      .then((res) => {
        console.log(res.data);
        setIncomeList(res.data);
      })
      .catch((err) => console.error(`error : ${err}`));
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
    <div>
      <form onSubmit={onSubmitIncome}>
        <input
          type='text'
          value={incomeText}
          placeholder='Add Income...'
          onChange={onChangeIncome}
        ></input>
        <input type='submit' value='Submit' />
      </form>

      {incomeList.map((data) => (
        <p>data</p>
      ))}
    </div>
  );
};

export default AddTransaction;
