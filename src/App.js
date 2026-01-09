import { useState } from "react";
import "./App.css";
import Alert from "./components/Alert"
import ExpenseForm from './components/ExpenseForm';
import ExpenseList from "./components/ExpenseList";


const App = () => {

    const [charge, setCharge] = useState("");
    const [id, setId] = useState('');
    const [amount, setAmount] = useState(0);
    const [edit, setEdit] = useState(false);
    
    const [alert, setAlert] = useState({show: false});
    
    const [expenses, setExpenses] = useState([
        {id: 1,charge: "렌트비", amount: 2000},
        {id: 2,charge: "교통비", amount: 400},
        {id: 3,charge: "식비", amount: 1200},
        // {id: 4,charge: "헬스비용", amount: 2000}
    ])

// class App extends Component {        // 함수형 컴포넌트로 변경한 이후 필요x

//     constructor(props) {
//     super(props);
//         this.state = {
//             expenses: [
//                 {id: 1,charge: "렌트비", amount: 2000},
//                 {id: 2,charge: "교통비", amount: 400},
//                 {id: 3,charge: "식비", amount: 1200}
//             ]
//         }
//     }
    const clearItems = () => {            // expenses 상태를 초기화하여 모든 지출 내역 삭제
        setExpenses([]);
    }
    
    const handleCharge = (e) => {       // 지출 항목에 이름, 가격 입력
        console.log(e.target.value);
        setCharge(e.target.value)
    }

    const handleAmount = (e) => {       // 지출 항목 입력시 내용 출력 
        // console.log( e.target.valueAsNumber);
        // console.log(typeof e.target.valueAsNumber)
        setAmount(e.target.valueAsNumber)
    }
    

    const handleDelete = (id) => {
        const newExpenses = /*this.state.*/expenses.filter(expense => 
            expense.id !== id)
        console.log(newExpenses);
        setExpenses(newExpenses);
        /*this.setState({expenses: newExpenses});*/         // 함수형 컴포넌트
        handleAlert({ type: 'danger', text: '아이템이 삭제되었습니다.'})
    }

    const handleAlert = ({ type, text }) => {
        setAlert({ show: true, type, text });
        setTimeout(() => {
        setAlert({ show: false });
        }, 7000);
    }

    const handleEdit = id => {
        const expense = expenses.find(item => item.id === id);
        const { charge, amount } = expense;
        setId(id);
        setCharge(charge);
        setAmount(amount);
        setEdit(true);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if(charge !== "" && amount > 0) {
            if (edit) {
            // const newExpense = {id: crypto.randomUUID(), charge, amount}
            const newExpenses = expenses.map(item => {
                return item.id === id ? { ...item, charge, amount } : item
            })
                // const newExpenses = [...expenses, newExpense]
                setExpenses(newExpenses);
                setEdit(false);
                handleAlert({ type: 'success', text: "아이템이 수정되었습니다." })
            } else {
                const newExpense = { id: crypto.randomUUID(), charge, amount }
                // 불변성을 지켜주기 위해서 새로운 expenses를 생성
                const newExpenses = [...expenses, newExpense];
                setExpenses(newExpenses);
                handleAlert({ type: "success", text: "아이템이 생성되었습니다" });
                }
                setCharge("");
                setAmount(0);
                } else {  
                console.log('error');
                handleAlert({
                    type: 'danger',
                    text: 'charge는 빈 값일수 없으며 amount는 0보다 커야 합니다.'
                })
            }
        }

    // render() {
        return (
            // 전체 컨테이너
                <main className="main-container">   
                    {alert.show ? <Alert type={alert.type} text={alert.text}/> : null}
                    <h1> 예산 계산기</h1>
                    
                <div style={{ width: '100%', backgroundColor: 'white', padding: '1rem'}}>
                    {/* Expense Form  */}
                    <ExpenseForm 
                        handleCharge={handleCharge}
                        charge={charge}
                        handleAmount={handleAmount}
                        amount={amount}
                        handleSubmit={handleSubmit}
                        edit={edit}
                    />
                </div >

                <div style={{ width: '100%', backgroundColor: 'white', padding: '1rem'}}>
                    {/* Expense List  */}
                    <ExpenseList 
                    expenses={expenses}
                    handleDelete={/*this.*/handleDelete} // 함수형 컴포넌트
                    // initialExpenses={this.state.expenses}
                    handleEdit={handleEdit}
                    clearItems={clearItems}
                    />
                </div>

                 <div style={{ display: 'flex', justifyContent: 'end', marginTop: '1rem' }}>
                    <p style={{ fontSize: '2rem' }}>
                        총지출:
                        <span>
                        {expenses.reduce((acc, curr) => {       // 입력한 비용의 총합
                            return (acc += curr.amount);
                        }, 0)}
                            원              
                    </span>
                    </p>
                 </div>


                </main>
        )
}
export default App;