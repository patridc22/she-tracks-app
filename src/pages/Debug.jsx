import { useState, useEffect } from 'react';
import { testConnection, supabase, safeQuery } from '@/services/supabase';
import { Button, Card } from '@/components/ui';

export default function DebugPage() {
  const [connectionStatus, setConnectionStatus] = useState({ loading: true });
  const [tableTests, setTableTests] = useState({});

  const tables = [
    'users',
    'user_settings',
    'goals',
    'cycle_logs',
    'mood_logs',
    'journal_entries',
    'habit_definitions',
    'habit_logs',
    'ai_summaries',
    'notifications'
  ];

  useEffect(() => {
    checkConnection();
  }, []);

  async function checkConnection() {
    setConnectionStatus({ loading: true });
    const result = await testConnection();
    setConnectionStatus({ loading: false, ...result });
  }

  async function testTable(tableName) {
    setTableTests((prev) => ({ ...prev, [tableName]: { loading: true } }));

    try {
      const { data, error } = await safeQuery(
        supabase.from(tableName).select('*').limit(1),
        `Test ${tableName} table`
      );

      if (error) {
        setTableTests((prev) => ({
          ...prev,
          [tableName]: {
            loading: false,
            success: false,
            error: error.message,
          },
        }));
      } else {
        setTableTests((prev) => ({
          ...prev,
          [tableName]: {
            loading: false,
            success: true,
            message: `✓ ${tableName} accessible`,
          },
        }));
      }
    } catch (err) {
      setTableTests((prev) => ({
        ...prev,
        [tableName]: {
          loading: false,
          success: false,
          error: err.message,
        },
      }));
    }
  }

  async function testAllTables() {
    for (const table of tables) {
      await testTable(table);
    }
  }

  return (
    <div className="min-h-screen bg-cream p-6">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-serif text-deep mb-2">🔍 Database Debug</h1>
          <p className="text-muted text-sm">
            Verify Supabase connectivity before building features
          </p>
        </div>

        {/* Connection Status */}
        <Card className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-serif text-deep">Connection Status</h2>
            <Button size="sm" onClick={checkConnection}>
              Retest
            </Button>
          </div>

          {connectionStatus.loading ? (
            <div className="text-muted text-sm">Testing connection...</div>
          ) : connectionStatus.success ? (
            <div className="flex items-center gap-2 text-sage">
              <span className="text-2xl">✓</span>
              <span className="font-medium">{connectionStatus.message}</span>
            </div>
          ) : (
            <div className="bg-rose/10 border border-rose/20 rounded-lg p-4">
              <div className="flex items-start gap-2 text-rose mb-2">
                <span className="text-xl">⚠</span>
                <span className="font-medium">{connectionStatus.message}</span>
              </div>
              {connectionStatus.error && (
                <pre className="text-xs bg-deep/5 p-3 rounded mt-2 overflow-auto">
                  {JSON.stringify(connectionStatus.error, null, 2)}
                </pre>
              )}
            </div>
          )}

          <div className="mt-4 pt-4 border-t border-deep/10">
            <div className="text-xs text-muted space-y-1">
              <div>
                <strong>Supabase URL:</strong>{' '}
                {import.meta.env.VITE_SUPABASE_URL || '❌ Not configured'}
              </div>
              <div>
                <strong>Anon Key:</strong>{' '}
                {import.meta.env.VITE_SUPABASE_ANON_KEY
                  ? `✓ Configured (${import.meta.env.VITE_SUPABASE_ANON_KEY.slice(0, 20)}...)`
                  : '❌ Not configured'}
              </div>
            </div>
          </div>
        </Card>

        {/* Table Tests */}
        <Card>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-serif text-deep">Table Accessibility Tests</h2>
            <Button size="sm" onClick={testAllTables}>
              Test All Tables
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {tables.map((table) => {
              const test = tableTests[table];

              return (
                <div
                  key={table}
                  className="flex items-center justify-between p-3 bg-deep/5 rounded-lg"
                >
                  <div className="flex items-center gap-2">
                    {test?.loading ? (
                      <span className="text-muted">⏳</span>
                    ) : test?.success ? (
                      <span className="text-sage">✓</span>
                    ) : test?.error ? (
                      <span className="text-rose">✕</span>
                    ) : (
                      <span className="text-muted">○</span>
                    )}
                    <span className="text-sm font-mono text-deep">{table}</span>
                  </div>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => testTable(table)}
                    disabled={test?.loading}
                  >
                    Test
                  </Button>
                </div>
              );
            })}
          </div>

          {Object.keys(tableTests).length > 0 && (
            <div className="mt-6 pt-4 border-t border-deep/10">
              <h3 className="text-sm font-medium text-deep mb-3">Error Details</h3>
              <div className="space-y-2">
                {Object.entries(tableTests).map(([table, result]) =>
                  result.error ? (
                    <div key={table} className="text-xs bg-rose/10 p-3 rounded">
                      <div className="font-medium text-rose mb-1">{table}</div>
                      <div className="text-muted">{result.error}</div>
                    </div>
                  ) : null
                )}
              </div>
            </div>
          )}
        </Card>

        {/* Setup Instructions */}
        <Card variant="soft" className="mt-6">
          <h3 className="text-lg font-serif text-deep mb-3">🚀 Setup Instructions</h3>
          <ol className="text-sm text-text space-y-2 list-decimal list-inside">
            <li>
              Copy <code className="bg-deep/10 px-2 py-0.5 rounded">.env.example</code> to{' '}
              <code className="bg-deep/10 px-2 py-0.5 rounded">.env</code>
            </li>
            <li>Add your Supabase credentials to the .env file</li>
            <li>
              Run the SQL schema from{' '}
              <code className="bg-deep/10 px-2 py-0.5 rounded">database-schema.sql</code> in
              Supabase SQL Editor
            </li>
            <li>Restart the dev server and refresh this page</li>
          </ol>
        </Card>
      </div>
    </div>
  );
}
