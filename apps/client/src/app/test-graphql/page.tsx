'use client'

import { useQuery } from '@apollo/client'
import { gql } from '@apollo/client'

const TEST_QUERY = gql`
  query TestConnection {
    columns {
      id
      title
    }
  }
`

export default function TestPage() {
  const { data, loading, error } = useQuery(TEST_QUERY)

  if (loading) return <div className="p-8">Načítá se GraphQL...</div>
  if (error) return <div className="p-8 text-red-500">Chyba: {error.message}</div>

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">GraphQL Test</h1>
      <pre className="bg-gray-100 p-4 rounded">
        {JSON.stringify(data, null, 2)}
      </pre>
    </div>
  )
}
