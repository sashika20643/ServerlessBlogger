export type Post= {
    title: string;
    body: string;
    image: File | null;
    category:string;
   
  }

  export type Category= {
   name: string;

    image: File | null;

   
  }

  export type CategoryData= {
    name: string;
 id:string;
     image: string;
 
    
   }
  export type PostData= {
    title: string;
    body: string;
    image: string;
    createdAt: string;
    category:CategoryData;
    id:string;
   
  }