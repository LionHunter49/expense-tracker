'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

const AddExpenseForm: React.FC = () => {
  const [form, setForm] = useState({
    date: '',
    amount: 0,
    category: '',
    description: '',
  });

  const router = useRouter(); 

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.date || !form.amount || form.amount <= 0 || !form.category.trim()) {
      alert('Please fill out the date, amount, and category fields correctly.');
      return;
    }


    try {
      const response = await fetch('/api/expenses', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      if (response.ok) {
        const newExpense = await response.json();
        console.log('Expense added:', newExpense);
        alert('Expense added successfully!');

        
        setForm({
          date: '',
          amount: 0,
          category: '',
          description: '',
        });

        
        router.push('/'); 
      } else {
        console.error('Error adding expense:', response.statusText);
        alert('Failed to add expense.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred.');
    }
  };

  
};

export default AddExpenseForm;