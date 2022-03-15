//Inbuilt Modules
const fs = require('fs');

//3rd Party Modules
const { validationResult } = require('express-validator');
const { startSession } = require('mongoose');

//Local Modules
const HttpError = require('../models/http-errors');
const Place = require('../models/place');
const User = require('../models/user');


const getPlacesByUserId = async (req, res, next)=>{
    const {userId} = req.params;

    let userPlaces;
    try{
        userPlaces = await User.findById(userId).populate('places'); 
    }
    catch{
        const error = new HttpError("Couldn't retrieve the places, Something went wrong.",500);
        return next(error);
    } 

    if(!userPlaces || userPlaces.places.length===0)
    {
        const error = new HttpError("No Places found for given User.",404);
        return next(error);
    }
    res.status(200).json({success:true, data:userPlaces.places.map(user => user.toObject({getters:true}))});
};

const getPlaceByPlaceId = async (req, res, next)=>{
    const {placeId} = req.params;

    let place;
    try{
        place = await Place.findById(placeId); 
    }
    catch{
        const error = new HttpError("Couldn't retrieve the place, Something went wrong.",500);
        return next(error);
    } 
    if(!place)
    {
        const error = new HttpError("No Place found for given id.",404);
        return next(error);
    }
    res.status(200).json({success:true, data:place.toObject({getters:true})});
    
}
const postPlaceForLoggedUser = async(req, res, next)=>{
    const errors = validationResult(req);
    console.log(req.body);
    if(!errors.isEmpty()){
        console.log(errors);
        const error =  new HttpError('Invalid Inputs, Please check your Data.',422); 
        return next(error);
    }
    const { 
        title, 
        description, 
        address, 
        // creator,     //This is verified hence no need to extract it from here
        } = req.body;

    const createdPlace = new Place({
            title,
            description,
            address,
            creator: req.userData.userId, 
            location:{
                lat:11.1751448,
                lng:98.0421422
                },
            image: req.file.path
    });

    let user;
    try{
        user = await User.findById(createdPlace.creator);
    }
    catch{        
        console.log(user);
        const error = new HttpError("Couldn't post Place, Please try again.", 500);
        return next(error);   
    }
    if(!user){
        const error = new HttpError("Couldn't find User", 404);
        return next(error);   
    }
    try{        
        const postSession = await startSession();
        postSession.startTransaction();
            await createdPlace.save({session:postSession});
            user.places.push(createdPlace);
            await user.save({session:postSession});
        await postSession.commitTransaction();
    }
    catch{
        const error = new HttpError("Couldn't post Place, Pleaseg try again.", 500); 
        console.log(error);
        return next(error);
    }
    
    res.status(201).json({success:true, data:createdPlace.toObject({getters:true})});
}

const patchUpdatePlaceByPlaceId = async (req, res, next)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        const error =  new HttpError('Invalid Inputs, Please check your Data.',422); 
        next(error);
    }

    const {placeId} = req.params;
    const {title, description} = req.body;

    let place;
    try{
        place = await Place.findById(placeId); 
    }
    catch{
        const error = new HttpError("Couldn't Update the place, Something went wrong.",500);
        return next(error);
    } 
    if(place.creator.toString() !==req.userData.userId)
    {
        const error = new HttpError("User is Not allowed to perform this Request.",401);
        return next(error);
    } 
    place.title = title;
    place.description = description;

    try{
        await place.save();
    }
    catch{
        const error = new HttpError("Couldn't Update the place, Something went wrong.",500);
        return next(error);
    } 
    
    if(!place){
        const error =  new HttpError('No Place Found for Given Place Id',404);  
        return next(error);
    }

    res.json({success:true, data:place.toObject({getters:true})});
   
};
const deletePlaceByPlaceId = async (req, res, next)=>{
    const {placeId} = req.params;

    let place;
    try{
        place = await Place.findById(placeId).populate('creator'); 
    }
    catch{        
        const error = new HttpError("Couldn't Delete the place, Something went wrong.",500);
        return next(error);
    } 

    if(!place){
        const error =  new HttpError('No Place Found for Given Place Id',404);  
        return next(error);
    }

    if(place.creator.id!==req.userData.userId)
    {
        const error = new HttpError("User is Not allowed to perform this Request.",401);
        return next(error);
    } 

    try{
        const deleteSession = await startSession();
            await deleteSession.startTransaction();
            //Deleting Image
            fs.unlink(place.image, (err=>{
                if (err) console.log(err);
                else console.log("Deleted file!");
            }));
            //Removing Place
            await place.remove({session:deleteSession});
            //Pull place from creator array
            place.creator.places.pull(place);
            await place.creator.save({session:deleteSession});
            
        await deleteSession.commitTransaction();
    }
    catch{
        const error = new HttpError("Couldn't Delete the place, Something went wrong.",500);
        return next(error);
    } 
    res.status(200).json({success:true, message:"Place was Deleted Successfully!"});
};

module.exports = {
    getPlacesByUserId,
    getPlaceByPlaceId,
    postPlaceForLoggedUser, 
    patchUpdatePlaceByPlaceId, 
    deletePlaceByPlaceId
}