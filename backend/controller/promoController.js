// controllers/promoController.js
import Promotion from '../models/Promotion.js';

export const getPromotions = async (req, res) => {
  try{
      const promos = await Promotion.find();
      if(!promos){
        res.json({success:false, message:"No Promotions available"})
      }
      res.json({success:true, promos});

  }catch(error){
    res.json({success:false, messahe:error.message})
  }
 
};

export const addPromotion = async (req, res) => {
  try{
        const promo = await Promotion.create(req.body);
        res.json(promo);

  }catch(error){
    res.json({success:false, message:error.message})
  }

};

