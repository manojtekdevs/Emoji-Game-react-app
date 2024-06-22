import './index.css'

const MoneyDetails = props => {
  const {moneyDetails} = props
  const {balance, income, expenses} = moneyDetails
  return (
    <div className="money-details-container">
      <div className="money-details-card balance-card">
        <img
          className="money-details-image"
          src="https://assets.ccbp.in/frontend/react-js/money-manager/balance-image.png"
          alt="balance"
        />
        <div className="money-details">
          <p className="money-indicator">Your Balance</p>
          <p className="money-value" data-testid="balanceAmount">
            Rs {balance}
          </p>
        </div>
      </div>
      <div className="money-details-card income-card">
        <img
          className="money-details-image"
          src="https://assets.ccbp.in/frontend/react-js/money-manager/income-image.png"
          alt="income"
        />
        <div className="money-details">
          <p className="money-indicator">Your Income</p>
          <p className="money-value" data-testid="incomeAmount">
            Rs {income}
          </p>
        </div>
      </div>
      <div className="money-details-card expenses-card">
        <img
          className="money-details-image"
          src="https://assets.ccbp.in/frontend/react-js/money-manager/expenses-image.png"
          alt="expenses"
        />
        <div className="money-details">
          <p className="money-indicator">Your Expenses</p>
          <p className="money-value" data-testid="expensesAmount">
            Rs {expenses}
          </p>
        </div>
      </div>
    </div>
  )
}
export default MoneyDetails
