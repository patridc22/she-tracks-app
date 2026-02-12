import { createClient } from '@supabase/supabase-js';
import { readFileSync } from 'fs';

const supabaseUrl = 'https://bhpfxoeiikbsrnzciwic.supabase.co';
const supabaseKey = 'sb_publishable_YMfjjicnwufTpNjVQlx70A__Mv0TEGp';

const supabase = createClient(supabaseUrl, supabaseKey);

const sql = readFileSync('./database-update.sql', 'utf-8');

console.log('Running database migration...');

// Execute the SQL
const { data, error } = await supabase.rpc('exec_sql', { sql_query: sql });

if (error) {
  console.error('❌ Error:', error);
} else {
  console.log('✅ Success! Database updated.');
}
