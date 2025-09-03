
   const [searchTerm, setSearchTerm] = useState('');
   const [selectedCategory, setSelectedCategory] = useState('all');
   const [selectedLocation, setSelectedLocation] = useState('all');
-  const [recentlyBrowsed, setRecentlyBrowsed] = useState();
+  const [recentlyBrowsed, setRecentlyBrowsed] = useState<any[]>([]);
   const [professionals, setProfessionals] = useState<any[]>([]);
   const [loading, setLoading] = useState(true);

           <div className="bg-white rounded-lg shadow-sm p-6">
             <h2 className="text-xl font-semibold text-gray-900 mb-4">Recently Browsed</h2>
-            {recentlyBrowsed.length > 0 ? (
)
}
+            {recentlyBrowsed && recentlyBrowsed.length > 0 ? (
               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                 {recentlyBrowsed.map((professional: any) => (
                   <div key={professional.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                     
             ) : (
               <p className="text-gray-500">No recently browsed professionals</p>
             )}
           </div>
               )
               )
               }
)
}