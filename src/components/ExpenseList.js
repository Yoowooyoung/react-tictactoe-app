import React from 'react'
import { MdDelete } from 'react-icons/md';
import ExpenseItem from './ExpenseItem';
import './ExpenseList.css';

const ExpenseList = (/*props*/ {handleDelete, expenses}) => {
// export class ExpenseList extends Component {
//   render() {
    // console.log(this.props.initialExpenses)
    return (
      <>
        <ul className="list">
            {/* Expense Item  */}
            {/* {this.props.initialExpenses.map(expense => { */}
            {expenses.map(expense => {
              return (
                <ExpenseItem
                    expense={expense} 
                    key={expense.id}
                    handleDelete={/*this.props.*/handleDelete}
                />
              )
            })}
        </ul>
        <button className='btn'>
            목록 지우기
            <MdDelete />
        </button>
      </>
    )
}

export default ExpenseList