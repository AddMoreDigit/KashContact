This file signals that Supabase integration is completely disabled.

This application uses 100% localStorage for all data persistence.

DO NOT attempt to deploy Supabase edge functions.
DO NOT attempt to connect to Supabase project.

All backend functionality is implemented client-side using:
- localStorage for data persistence
- No external database
- No authentication backend
- No edge functions

The files in /supabase/functions/ exist only because they are protected files
that cannot be deleted, but they should NOT be deployed.
