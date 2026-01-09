import React from 'react'
import { MdSend } from 'react-icons/md';
import "./ExpenseForm.css";

// export class ExpenseFrom extends Component { class컴포넌트를 함수형 컴포넌트로 변경하고, render() 제거
const ExpenseForm =({ handleCharge, charge, edit, amount, handleAmount, handleSubmit }) => {
    return (
      <form onSubmit={handleSubmit}>
        <div className='form-center'>
            <div className='form-group'>
                <label htmlFor='charge'>지출 항목</label>
                <input 
                    type="text" 
                    className='form-control' 
                    id="charge" 
                    name="charge" 
                    charge={charge}
                    placeholder='예) 렌트비'
                    onChange={handleCharge}
                />
            </div>
            <div className='form-group'>
                <label htmlFor='amount'>비용</label>
                <input 
                    type="number" 
                    className='form-control' 
                    id="amount" 
                    name="amount" 
                    value={amount}
                    placeholder='예) 100'
                    onChange={handleAmount}
                />
            </div>
        </div>
        <button type='submit' className='btn'>
            제출
            <MdSend className='btn-icon'/>
        </button>
    </form>
    )
}

export default ExpenseForm