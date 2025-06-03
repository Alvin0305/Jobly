import { createInterestFunction, createLanguageFunction, createQualificationFunction, createSkillFunction, getDomainsFunction, getInterestsOfUserFunction, getLanguagesByUserFunction, getLanguagesFunction, getSkillsOfUserFunction } from "../models/metadata.js";

export const createInterest = async (req, res) => {
  // use the create interst function in the metadata model to create interest

  const {name} = req.body;
  const user_id = req.user?.id;
  console.log("Logged-in user:", req.user);

  if(!name)
    return res.status(400).json({error :"Interest name is required"});

  try{
    const result = await createInterestFunction(user_id,name);
    res.status(201).json({message:"Interest added successfully", interest_id:result.interest_id});
  }catch(err){
    res.status(500).json({ error: "Failed to add interest", details: err.message });
  }
};

export const getDomains = async (req, res) => {
  // use the get domains function in the metadata model to get all domains available

  try{
    const domains = await getDomainsFunction();
    res.status(200).json({domains});
  }catch(err){
    res.status(500).json({error:"Failed to fetch domains",details:err.message});
  }
};

export const getInterestsOfUser = async (req, res) => {
  // use the get interest of user function to get all the interests of the user
  const userId = req.user?.id;

  if(!userId){
    return res.status(401).json({error:"User not authenticated"});
  }

  try{
    const interests = await getInterestsOfUserFunction(userId);
    res.status(200).json({interests});
  }catch(err){
    res.status(500).json({error:"Failed to fetch interests",details:err.message});
  }
};

export const createSkill = async (req, res) => {
  // use the create skill function in the metadata model to create skill
  const {name} = req.body;
  const user_id = req.user?.id;
  console.log("Logged-in user:", req.user);

  if(!name)
    return res.status(400).json({error :"Skill name is required"});

  try{
    const result = await createSkillFunction(user_id,name);
    res.status(201).json({message:"Skill added successfully", skill_id:result.skill_id});
  }catch(err){
    res.status(500).json({ error: "Failed to add skill", details: err.message });
  }
};

export const getSkillsOfUser = async (req, res) => {
  // use the get skill of user function to get all the skills of the user
  const userId = req.user?.id;

  if(!userId){
    return res.status(401).json({error:"User not authenticated"});
  }

  try{
    const skills = await getSkillsOfUserFunction(userId);
    res.status(200).json({skills});
  }catch(err){
    res.status(500).json({error:"Failed to fetch interests",details:err.message});
  }
};

export const createLanguage = async (req, res) => {
  // use the create language function in the metadata model to create language
  const {language} = req.body;
  const user_id = req.user?.id;
  console.log("Logged-in user:", req.user);

  if(!language)
    return res.status(400).json({error :"Language is required"});

  try{
    const result = await createLanguageFunction(user_id,language);
    res.status(201).json({
      message:"Language added successfully", 
      language_id:result.language_id
    });
  }catch(err){
    res.status(500).json({ error: "Failed to add language", details: err.message });
  }
};

export const getLanguages = async (req, res) => {
  // use the get languages function in the metadata model to get all languages available
  try{
    const languages = await getLanguagesFunction();
    res.status(200).json({languages});
  }catch(err){
    res.status(500).json({error:"Failed to fetch languages",details:err.message});
  }
};

export const getLanguagesOfUser = async (req, res) => {
  // use the get language of user function to get all the languages of the user
  const userId = req.user?.id;
  console.log(userId);

  if(!userId){
    return res.status(401).json({error:"User not authenticated"});
  }

  try{
    const languages = await getLanguagesByUserFunction(userId);
    res.status(200).json({languages});
  }catch(err){
    res.status(500).json({error:"Failed to fetch languages",details:err.message});
  }
};

export const createCodingLanguage = async (req, res) => {
  // use the create coding language function in the metadata model to create coding language
};

export const getCodingLanguages = async (req, res) => {
  // use the get coding languages function in the metadata model to get all coding  languages available
};

export const getCodingLanguagesOfUser = async (req, res) => {
  // use the get coding language of user function to get all the coding  languages of the user
};

export const createQualification = async (req, res) => {
  // use this create qualification function in metadata model to create qualification
  const {qualification} = req.body;
  const user_id = req.user?.id;
  console.log("Logged-in user:", req.user);

  if(!qualification)
    return res.status(400).json({error :"Qualification is required"});

  try{
    const result = await createQualificationFunction(user_id,qualification);
    res.status(201).json({
      message:"Qualification added successfully", 
      qualification_id:result.qualification_id
    });
  }catch(err){
    res.status(500).json({ error: "Failed to add qualification", details: err.message });
  }
};

export const getQualifications = async (req, res) => {
  // use the get qualifications function in the metadata model to get all the qualifications available
};

export const getQualificationsOfUser = async (req, res) => {
  // use the get qualifications of user function in the metadata model to get all the qualifications of the user
};
