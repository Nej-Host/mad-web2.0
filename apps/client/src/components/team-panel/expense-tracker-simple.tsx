'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Expense, ExpenseStatus } from '@madzone/shared'
import { DollarSign, Calendar, Receipt } from 'lucide-react'

interface ExpenseTrackerProps {
  expenses: Expense[]
  onExpenseClick: (expense: Expense) => void
}

export function ExpenseTracker({ expenses, onExpenseClick }: ExpenseTrackerProps) {
  const getStatusColor = (status: ExpenseStatus) => {
    switch (status) {
      case ExpenseStatus.APPROVED: return 'bg-green-100 text-green-700'
      case ExpenseStatus.PENDING: return 'bg-yellow-100 text-yellow-700'
      case ExpenseStatus.REJECTED: return 'bg-red-100 text-red-700'
      default: return 'bg-gray-100 text-gray-700'
    }
  }

  const getStatusText = (status: ExpenseStatus) => {
    switch (status) {
      case ExpenseStatus.APPROVED: return 'Schváleno'
      case ExpenseStatus.PENDING: return 'Čeká'
      case ExpenseStatus.REJECTED: return 'Zamítnuto'
      default: return 'Neznámý'
    }
  }

  const totalAmount = expenses.reduce((sum, expense) => sum + expense.amount, 0)

  return (
    <div className="space-y-6">
      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Celkové výdaje</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalAmount.toLocaleString()} CZK</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Počet výdajů</CardTitle>
            <Receipt className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{expenses.length}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Čekající schválení</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {expenses.filter(e => e.status === ExpenseStatus.PENDING).length}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Expense List */}
      <Card>
        <CardHeader>
          <CardTitle>Seznam výdajů</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {expenses.map((expense) => (
              <div
                key={expense.id}
                className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 cursor-pointer transition-colors"
                onClick={() => onExpenseClick(expense)}
              >
                <div className="flex-1">
                  <div className="flex items-center gap-3">
                    <div className="flex-1">
                      <h4 className="font-medium">{expense.title}</h4>
                      {expense.description && (
                        <p className="text-sm text-muted-foreground mt-1">
                          {expense.description}
                        </p>
                      )}
                    </div>
                    <div className="text-right">
                      <div className="font-semibold">
                        {expense.amount.toLocaleString()} {expense.currency}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {expense.date.toLocaleDateString('cs-CZ')}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 mt-2">
                    <Badge className={getStatusColor(expense.status)}>
                      {getStatusText(expense.status)}
                    </Badge>
                    {expense.category && (
                      <Badge variant="outline" style={{ 
                        borderColor: expense.category.color,
                        color: expense.category.color 
                      }}>
                        {expense.category.name}
                      </Badge>
                    )}
                  </div>
                </div>
              </div>
            ))}
            
            {expenses.length === 0 && (
              <div className="text-center py-8 text-muted-foreground">
                <p>Žádné výdaje</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
