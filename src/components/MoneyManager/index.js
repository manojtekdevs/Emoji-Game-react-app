import {Component} from 'react'
import {v4 as uuidv4} from 'uuid'
import MoneyDetails from '../MoneyDetails'
import TransactionItem from '../TransactionItem'
import './index.css'

const transactionTypeOptions = [
  {
    optionId: 'INCOME',
    displayText: 'Income',
  },
  {
    optionId: 'EXPENSES',
    displayText: 'Expenses',
  },
]

class MoneyManager extends Component {
  state = {
    transactionsList: [],
    titleInput: '',
    amountInput: '',
    typeInput: transactionTypeOptions[0].displayText,
  }

  onAddTransaction = event => {
    event.preventDefault()
    const {titleInput, amountInput, typeInput} = this.state
    const newTransaction = {
      id: uuidv4(),
      title: titleInput,
      amount: parseInt(amountInput),
      type: typeInput,
    }
    this.setState(prevState => ({
      transactionsList: [...prevState.transactionsList, newTransaction],
      titleInput: '',
      amountInput: '',
      typeInput: transactionTypeOptions[0].displayText,
    }))
  }

  onDeleteTransaction = id => {
    const {transactionsList} = this.state
    const updatedTransactionsList = transactionsList.filter(
      eachTransaction => eachTransaction.id !== id,
    )
    this.setState({transactionsList: updatedTransactionsList})
  }

  getTotalIncomeAndExpenses = () => {
    const {transactionsList} = this.state
    let totalIncome = 0
    let totalExpenses = 0
    if (transactionsList.length > 0) {
      transactionsList.forEach(eachTransaction => {
        if (eachTransaction.type === 'Income') {
          totalIncome += eachTransaction.amount
        } else if (eachTransaction.type === 'Expenses') {
          totalExpenses += eachTransaction.amount
        }
      })
    }
    return {totalIncome, totalExpenses}
  }

  onChangeTitle = event => {
    this.setState({titleInput: event.target.value})
  }

  onChangeAmount = event => {
    this.setState({amountInput: event.target.value})
  }

  onChangeType = event => {
    const enteredValue = event.target.value
    if (enteredValue === transactionTypeOptions[0].optionId) {
      this.setState({typeInput: transactionTypeOptions[0].displayText})
    } else {
      this.setState({typeInput: transactionTypeOptions[1].displayText})
    }
  }

  render() {
    const {transactionsList, titleInput, amountInput, typeInput} = this.state
    const {totalIncome, totalExpenses} = this.getTotalIncomeAndExpenses()
    const totalBalance = totalIncome - totalExpenses
    const moneyDetails = {
      balance: totalBalance,
      income: totalIncome,
      expenses: totalExpenses,
    }

    return (
      <div className="app-bg-container">
        <div className="money-manager-user-details">
          <h1 className="user-name">Hi, Richard</h1>
          <p className="welcome-message">
            Welcome back to your{' '}
            <span className="welcome-message-span">Money Manager</span>
          </p>
        </div>
        <MoneyDetails moneyDetails={moneyDetails} />
        <div className="transaction-form-history">
          <form
            className="money-transaction-form"
            onSubmit={this.onAddTransaction}
          >
            <h1 className="add-transaction">Add Transaction</h1>
            <label className="input-label" htmlFor="titleInput">
              TITLE
            </label>
            <input
              className="input"
              type="text"
              value={titleInput}
              placeholder="TITLE"
              id="titleInput"
              onChange={this.onChangeTitle}
            />
            <label className="input-label" htmlFor="amountInput">
              AMOUNT
            </label>
            <input
              className="input"
              type="text"
              value={amountInput}
              placeholder="AMOUNT"
              id="amountInput"
              onChange={this.onChangeAmount}
            />
            <label className="input-label" htmlFor="titleInput">
              TYPE
            </label>
            <select
              className="input"
              id="typeInput"
              value={typeInput}
              onChange={this.onChangeType}
            >
              {transactionTypeOptions.map(eachType => (
                <option key={eachType.optionId} value={eachType.optionId}>
                  {eachType.displayText}
                </option>
              ))}
            </select>
            <button className="add-button" type="submit">
              Add
            </button>
          </form>
          <div className="transaction-history-container">
            <h1 className="history">History</h1>
            <div className="history-table-headings">
              <p className="title">Title</p>
              <p className="amount">Amount</p>
              <p className="type">Type</p>
            </div>
            <ul className="transactions-list">
              {transactionsList.map(eachTransaction => (
                <TransactionItem
                  key={eachTransaction.id}
                  transactionDetails={eachTransaction}
                  onDeleteTransaction={this.onDeleteTransaction}
                />
              ))}
            </ul>
          </div>
        </div>
      </div>
    )
  }
}
export default MoneyManager
