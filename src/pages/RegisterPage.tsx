@@ -78,7 +78,7 @@ const RegisterPage: React.FC = () => {
           
           // Check if profile already exists
           console.log('Creating profile for user:', authData.user.id);
           const { data: existingProfile } = await supabase
-            .from('profiles')
+            .from('professionals')
             .select('id')
             .eq('id', authData.user.id)
             .single();
@@ -86,10 +86,12 @@ const RegisterPage: React.FC = () => {
           // Only create profile if it doesn't exist
           if (!existingProfile) {
             const { error: profileError } = await supabase
-              .from('profiles')
+              .from('professionals')
               .insert({
                 id: authData.user.id,
-                name: formData.name,
+                full_name: formData.name,
+                email: formData.email,
                 phone: formData.phone,
-                role: formData.role
+                role: formData.role,
+                city_state: 'Not specified',
+                experience: 'New',
+                bio: 'Professional service provider',
+                hourly_rate: 0
               });