export const getDomainsFunction = async () => {
  // get all domain in domain table
}

export const createInterestFunction = async (user_id, name) => {
  // insert a new domain into the domain table
  // update the user interest table, add this interst to it
};

export const getInterestsOfUserFunction = async (user_id) => {
  // retrive all the interests of the user from the user interests table
};

export const createSkillFunction = async (user_id, name) => {
  // insert a new skill into the skills table
  // update the user skills table, add this skill to it
};

export const getSkillsOfUserFunction = async (user_id) => {
  // retrive all the skills of the user from the user skills table
};

export const createLanguageFunction = async (user_id, language) => {
  // insert a new language into the language table
  // update the user language table, add this language to it
};

export const getLanguagesFunction = async () => {
  // retrive all languages in the language table
};

export const getLanguagesByUserFunction = async () => {
  // retrive all the languages of the user from the user languages table
};

export const createQualificationFunction = async (user_id, qualification) => {
  // insert the qualifiction into qualifications table
  // update the user qualifications table, add this qualification to it
};

export const getQualificationsFunction = () => {
  // get all the qualifications in the qualifications table
};

export const getQualificationsOfUserFunction = async (user_id) => {
  // get all qualifications of the given user
};

export const createCodingLanguageFunction = async (user_id, language) => {
  // insert a new coding language into the coding language table
  // update the user coding languge table, add this coding language to it
};

export const getCodingLanguagesFunction = async () => {
  // retrive all coding languages in the coding language table
};

export const getCodingLanguagesOfUserFunction = async (user_id) => {
  // retrive all the coding languages a user know from the user coding languages table
};
