import {
  createCodingLanguageFunction,
  createDescriptionFunction,
  createDomainFunction,
  createInterestFunction,
  createJobDetailsFunction,
  createLanguageFunction,
  createQualificationFunction,
  createSkillFunction,
  createWorkExperienceFunction,
  getCodingLanguagesFunction,
  getDescriptionFunction,
  getDomainsFunction,
  getInterestsOfUserFunction,
  getJobDetailsFunction,
  getLanguagesByUserFunction,
  getLanguagesFunction,
  getQualificationsFunction,
  getQualificationsOfUserFunction,
  getSkillsOfUserFunction,
  getWorkExperienceFunction,
} from "../models/metadata.js";

export const createInterest = async (req, res) => {
  // use the create interst function in the metadata model to create interest

  const { name } = req.body;
  const user_id = req.user?.id;
  console.log("Logged-in user:", req.user);

  if (!name)
    return res.status(400).json({ error: "Interest name is required" });

  try {
    const result = await createInterestFunction(user_id, name);
    res
      .status(201)
      .json({
        message: "Interest added successfully",
        interest_id: result.interest_id,
      });
  } catch (err) {
    res
      .status(500)
      .json({ error: "Failed to add interest", details: err.message });
  }
};

export const getDomains = async (req, res) => {
  // use the get domains function in the metadata model to get all domains available

  try {
    const domains = await getDomainsFunction();
    res.status(200).json({ domains });
  } catch (err) {
    res
      .status(500)
      .json({ error: "Failed to fetch domains", details: err.message });
  }
};

export const createDomains = async (req, res) => {
  const { name } = req.body;
  // const user_id = req.user?.id;
  console.log("Logged-in user:", req.user);

  if (!name) return res.status(400).json({ error: "Domain name is required" });

  try {
    const result = await createDomainFunction(name);
    res.status(201).json({ message: "Domain added successfully" });
  } catch (err) {
    res
      .status(500)
      .json({ error: "Failed to add Domain", details: err.message });
  }
};

export const getInterestsOfUser = async (req, res) => {
  // use the get interest of user function to get all the interests of the user
  const userId = req.params.id || req.user?.id;

  if (!userId) {
    return res.status(401).json({ error: "User not authenticated" });
  }

  try {
    const interests = await getInterestsOfUserFunction(userId);
    res.status(200).json({ interests });
  } catch (err) {
    res
      .status(500)
      .json({ error: "Failed to fetch interests", details: err.message });
  }
};

export const createSkill = async (req, res) => {
  // use the create skill function in the metadata model to create skill
  const { name } = req.body;
  const user_id = req.user?.id;
  console.log("Logged-in user:", req.user);

  if (!name) return res.status(400).json({ error: "Skill name is required" });

  try {
    const result = await createSkillFunction(user_id, name);
    res
      .status(201)
      .json({ message: "Skill added successfully", skill_id: result.skill_id });
  } catch (err) {
    res
      .status(500)
      .json({ error: "Failed to add skill", details: err.message });
  }
};

export const getSkillsOfUser = async (req, res) => {
  // use the get skill of user function to get all the skills of the user
  const userId = req.params.id || req.user?.id;

  if (!userId) {
    return res.status(401).json({ error: "User not authenticated" });
  }

  try {
    const skills = await getSkillsOfUserFunction(userId);
    res.status(200).json({ skills });
  } catch (err) {
    res
      .status(500)
      .json({ error: "Failed to fetch interests", details: err.message });
  }
};

export const createLanguage = async (req, res) => {
  // use the create language function in the metadata model to create language
  const { language } = req.body;
  const user_id = req.user?.id;
  console.log("Logged-in user:", req.user);

  if (!language) return res.status(400).json({ error: "Language is required" });

  try {
    const result = await createLanguageFunction(user_id, language);
    res.status(201).json({
      message: "Language added successfully",
      language_id: result.language_id,
    });
  } catch (err) {
    res
      .status(500)
      .json({ error: "Failed to add language", details: err.message });
  }
};

export const getLanguages = async (req, res) => {
  // use the get languages function in the metadata model to get all languages available
  try {
    const languages = await getLanguagesFunction();
    res.status(200).json({ languages });
  } catch (err) {
    res
      .status(500)
      .json({ error: "Failed to fetch languages", details: err.message });
  }
};

export const getLanguagesOfUser = async (req, res) => {
  // use the get language of user function to get all the languages of the user
  const userId = req.params.id || req.user?.id;
  console.log(userId);

  if (!userId) {
    return res.status(401).json({ error: "User not authenticated" });
  }

  try {
    const languages = await getLanguagesByUserFunction(userId);
    res.status(200).json({ languages });
  } catch (err) {
    res
      .status(500)
      .json({ error: "Failed to fetch languages", details: err.message });
  }
};

export const createWorkExperience = async (req, res) => {
  const user_id = req.params?.id || req.user?.id;
  const { company_name, designation, start_date, end_date, location } =
    req.body;

  const result = await createWorkExperienceFunction(
    user_id,
    company_name,
    designation,
    start_date,
    end_date,
    location
  );

  if (result.success) res.status(201).json(result);
  else res.status(500).json(result);
};

export const getWorkExperience = async (req, res) => {
  const user_id = req.params?.id || req.user?.id;

  try {
    const exp = await getWorkExperienceFunction(user_id);
    res.status(200).json({ exp });
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch work experience" });
  }
};

export const createJobDetails = async (req, res) => {
  const user_id = req.params?.id || req.user?.id;
  const { company_name, designation, location } = req.body;

  const result = await createJobDetailsFunction(
    user_id,
    company_name,
    designation,
    location
  );

  if (result.success) res.status(201).json(result);
  else res.status(500).json(result);
};

export const getJobDetails = async (req, res) => {
  const user_id = req.params?.id || req.user?.id;

  try {
    const exp = await getJobDetailsFunction(user_id);
    res.status(200).json({ exp });
  } catch (err) {
    console.log(err.stack);
    res.status(500).json({ error: "Failed to fetch job details" });
  }
};

export const createDescription = async (req, res) => {
  const user_id = req.params?.id || req.user?.id;
  const { description } = req.body;

  const result = await createDescriptionFunction(user_id, description);

  if (result.success) res.status(201).json(result);
  else res.status(500).json(result);
};

export const getDescription = async (req, res) => {
  const user_id = req.params?.id || req.user?.id;

  try {
    const exp = await getDescriptionFunction(user_id);
    res.status(200).json({ exp });
  } catch (err) {
    console.log(err.stack);
    res.status(500).json({ error: "Failed to fetch job details" });
  }
};

export const createCodingLanguage = async (req, res) => {
  // use the create coding language function in the metadata model to create coding language
  const { codlang } = req.body;
  const user_id = req.params.id || req.user?.id;
  console.log("Logged-in user:", req.user);

  if (!codlang) return res.status(400).json({ error: "codlang is required" });

  try {
    const result = await createCodingLanguageFunction(user_id, codlang);
    res.status(201).json({
      message: "Language added successfully",
      coding_language_id: result.coding_language_id,
    });
  } catch (err) {
    res
      .status(500)
      .json({ error: "Failed to add language", details: err.message });
  }
};

export const getCodingLanguages = async (req, res) => {
  // use the get coding languages function in the metadata model to get all coding  languages available
  try {
    const languages = await getCodingLanguagesFunction();
    res.status(200).json({ languages });
  } catch (err) {
    res
      .status(500)
      .json({ error: "Failed to fetch languages", details: err.message });
  }
};

export const getCodingLanguagesOfUser = async (req, res) => {
  // use the get coding language of user function to get all the coding  languages of the user
  try {
    const languages = await getLanguagesFunction();
    res.status(200).json({ languages });
  } catch (err) {
    res
      .status(500)
      .json({ error: "Failed to fetch languages", details: err.message });
  }
};

export const createQualification = async (req, res) => {
  // use this create qualification function in metadata model to create qualification
  const { qualification } = req.body;
  const user_id = req.params.id || req.user?.id;
  console.log("Logged-in user:", req.user);

  if (!qualification)
    return res.status(400).json({ error: "Qualification is required" });

  try {
    const result = await createQualificationFunction(user_id, qualification);
    res.status(201).json({
      message: "Qualification added successfully",
      qualification_id: result.qualification_id,
    });
  } catch (err) {
    res
      .status(500)
      .json({ error: "Failed to add qualification", details: err.message });
  }
};

export const getQualifications = async (req, res) => {
  // use the get qualifications function in the metadata model to get all the qualifications available
  try {
    const qualifications = await getQualificationsFunction();
    res.status(200).json({ qualifications });
  } catch (err) {
    res
      .status(500)
      .json({ error: "Failed to fetch qualifications", details: err.message });
  }
};

export const getQualificationsOfUser = async (req, res) => {
  // use the get qualifications of user function in the metadata model to get all the qualifications of the user
  const userId = req.params.id || req.user?.id;

  if (!userId) {
    return res.status(401).json({ error: "User not authenticated" });
  }

  try {
    const qualifications = await getQualificationsOfUserFunction(userId);
    res.status(200).json({ qualifications });
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch qualifications" });
  }
};

export const createDomain = async (req, res) => {
  const { name } = req.body;
  console.log("Logged in user", req.user);
  if (!name) return res.status(400).json({ error: "Domain name is required" });

  try {
    const result = await createDomainFunction(name);
    res.status(201).json({ message: "Domain added successfully" });
  } catch (err) {
    res
      .status(500)
      .json({ error: "Failed to add Domain", details: err.message });
  }
};
