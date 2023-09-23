import dbConnect from "../../../util/mongo"
import Product from "@/models/Product"

export default async function handler(req, res) {
    const {method,cookies} =req;
    const token=cookies.token;
   await dbConnect();
    if(method === 'GET'){
        try{
            const products =await Product.find();
          return  res.status(200).json(products);
        }catch(error){
          return  res.status(500).json(error)
        }
    
    }
    if(method === 'POST'){
        if(!token || token !== process.env.token){
          return  res.status(401).json('Not authanticated')
        }
        try{
            const product = await Product.create(req.body);
          return  res.status(200).json(product)

        }catch(err){
          return  res.status(500).json(err);
        }
    }
  }
  