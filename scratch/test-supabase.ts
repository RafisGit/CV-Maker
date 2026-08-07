import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://vfazscwpkjbimodscygm.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZmYXpzY3dwa2piaW1vZHNjeWdtIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3ODAwNzkxNywiZXhwIjoyMDkzNTgzOTE3fQ.IpEThLc_7MTsSL1r02s7pmTkJsEbaJhXtDyw3sykJsA'
const supabase = createClient(supabaseUrl, supabaseKey)

async function test() {
  const { data, error } = await supabase.from('cvs').select('*').limit(1)
  if (error) {
    console.error('Error connecting to Supabase (likely tables not created yet):', error.message)
  } else {
    console.log('Successfully connected to Supabase!', data)
  }
}

test()
