@@ -58,7 +58,7 @@ export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ childre
   const fetchUserProfile = async (supabaseUser: SupabaseUser) => {
     try {
       const { data: profile, error } = await supabase
-        .from('profiles')
+        .from('professionals')
         .select('*')
         .eq('id', supabaseUser.id)
         .single();
@@ -71,14 +71,14 @@ export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ childre
       return {
         id: supabaseUser.id,
         email: supabaseUser.email!,
-        name: profile.name,
+        name: profile.full_name,
         phone: profile.phone,
         role: profile.role,
-        serviceName: profile.service_name,
+        serviceName: profile.role,
         bio: profile.bio,
-        location: profile.location,
-        price: profile.price,
-        profileImage: profile.profile_image,
-        bannerImage: profile.banner_image
+        location: profile.city_state,
+        price: profile.hourly_rate?.toString(),
+        profileImage: profile.profile_image
       };
     } catch (error) {
       console.error('Error in fetchUserProfile:', error);