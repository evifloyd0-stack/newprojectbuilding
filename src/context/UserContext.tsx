@@ .. @@
   const fetchUserProfile = async (userId: string) => {
     try {
-      const { data, error } = await supabase
+      const { data, error } = await supabase
         .from('profiles')
         .select('*')
         .eq('id', userId)
-        .single();
+        .maybeSingle();
 
       if (error) {
         throw error;
       }
 
-      return data;
+      return data || null;
     } catch (error) {
       console.error('Error fetching profile:', error);
       throw error;
     }
   };